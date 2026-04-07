import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { preference } from '@/lib/mercadopago';
import { pinturas } from '@/lib/pinturas';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { items } = body as { items: { productId: string; qty: number }[] };

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'Carrito vacío' }, { status: 400 });
    }

    // Validate products against pinturas catalog (source of truth)
    const mpItems = items.map((item) => {
      const product = pinturas.find((p) => String(p.id) === item.productId);
      if (!product) return null;
      return {
        id: String(product.id),
        title: product.nombre,
        unit_price: product.precio,
        quantity: item.qty,
        currency_id: 'ARS' as const,
      };
    });

    if (mpItems.some((i) => i === null)) {
      return NextResponse.json({ error: 'Algunos productos no están disponibles' }, { status: 400 });
    }

    const validItems = mpItems as NonNullable<(typeof mpItems)[number]>[];
    const totalARS = validItems.reduce((sum, i) => sum + i.unit_price * i.quantity, 0);

    // Create order
    const order = await prisma.order.create({
      data: {
        type: 'catalog',
        status: 'pending',
        customerName: '',
        customerEmail: '',
        items: JSON.stringify(items),
        totalARS,
      },
    });

    // Create MercadoPago preference
    const isLocalhost = SITE_URL.includes('localhost');

    const mpPref = await preference.create({
      body: {
        items: validItems,
        ...(!isLocalhost && {
          back_urls: {
            success: `${SITE_URL}/orden/confirmada`,
            failure: `${SITE_URL}/orden/fallida`,
            pending: `${SITE_URL}/orden/pendiente`,
          },
          auto_return: 'approved' as const,
          notification_url: `${SITE_URL}/api/webhooks/mercadopago`,
        }),
        external_reference: order.id,
      },
    });

    // Update order with preference ID
    await prisma.order.update({
      where: { id: order.id },
      data: { mpPreferenceId: mpPref.id },
    });

    return NextResponse.json({ init_point: mpPref.init_point, orderId: order.id });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json({ error: 'Error al crear el pago' }, { status: 500 });
  }
}
