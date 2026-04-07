import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { preference } from '@/lib/mercadopago';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

const CUSTOM_PRICES: Record<string, number> = {
  '30x30': 15000,
  '50x50': 25000,
  '80x80': 45000,
  '100x70': 55000,
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nombre, email, size, style, message, canvasDataUrl } = body;

    if (!nombre || !email || !size || !style) {
      return NextResponse.json({ error: 'Campos requeridos faltantes' }, { status: 400 });
    }

    const priceARS = CUSTOM_PRICES[size];
    if (!priceARS) {
      return NextResponse.json({ error: 'Tamaño no válido' }, { status: 400 });
    }

    // Create order
    let order;
    try {
      order = await prisma.order.create({
        data: {
          type: 'custom',
          status: 'pending',
          customerName: nombre,
          customerEmail: email,
          items: JSON.stringify([{ size, style, message: message || '' }]),
          totalARS: priceARS,
          notes: message || '',
          canvasDataUrl: canvasDataUrl || null,
        },
      });
      console.log('Order created:', order.id);
    } catch (dbError) {
      console.error('DB error creating order:', dbError);
      return NextResponse.json({ error: 'Error al crear la orden en la base de datos', detail: String(dbError) }, { status: 500 });
    }

    // Create MercadoPago preference
    let mpPref;
    try {
      const isLocalhost = SITE_URL.includes('localhost');

      mpPref = await preference.create({
        body: {
          items: [
            {
              id: order.id,
              title: `Cuadro personalizado ${size} - ${style}`,
              unit_price: priceARS,
              quantity: 1,
              currency_id: 'ARS' as const,
            },
          ],
          payer: {
            name: nombre,
            email,
          },
          ...(!isLocalhost && {
            back_urls: {
              success: `${SITE_URL}/orden/confirmada`,
              failure: `${SITE_URL}/orden/fallida`,
              pending: `${SITE_URL}/orden/pendiente`,
            },
            auto_return: 'approved' as const,
          }),
          external_reference: order.id,
        },
      });
      console.log('MP preference created:', mpPref.id);
    } catch (mpError: unknown) {
      const errMsg = mpError instanceof Error ? mpError.message : JSON.stringify(mpError);
      console.error('MercadoPago error:', errMsg, mpError);
      return NextResponse.json({ error: 'Error al crear preferencia de MercadoPago', detail: errMsg }, { status: 500 });
    }

    await prisma.order.update({
      where: { id: order.id },
      data: { mpPreferenceId: mpPref.id },
    });

    return NextResponse.json({ init_point: mpPref.init_point, orderId: order.id });
  } catch (error) {
    console.error('Custom checkout error:', error);
    return NextResponse.json({ error: 'Error al crear el pago', detail: String(error) }, { status: 500 });
  }
}
