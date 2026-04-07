import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { preference } from '@/lib/mercadopago';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { items } = body as { items: { productId: string; qty: number }[] };

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'Carrito vacío' }, { status: 400 });
    }

    // Fetch products from database to validate prices
    const productIds = items.map((i) => i.productId);
    const products = await prisma.product.findMany({
      where: { id: { in: productIds }, active: true },
    });

    if (products.length !== items.length) {
      return NextResponse.json({ error: 'Algunos productos no están disponibles' }, { status: 400 });
    }

    const mpItems = items.map((item: { productId: string; qty: number }) => {
      const product = products.find((p: { id: string }) => p.id === item.productId)!;
      return {
        id: product.id,
        title: product.name,
        unit_price: product.priceARS,
        quantity: item.qty,
        currency_id: 'ARS' as const,
      };
    });

    const totalARS = mpItems.reduce((sum, i) => sum + i.unit_price * i.quantity, 0);

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
        items: mpItems,
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
