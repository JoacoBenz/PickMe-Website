import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { payment } from '@/lib/mercadopago';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (body.type === 'payment') {
      const paymentId = body.data?.id;
      if (!paymentId) {
        return NextResponse.json({ error: 'Missing payment ID' }, { status: 400 });
      }

      // Fetch payment details from MercadoPago
      const paymentData = await payment.get({ id: paymentId });

      const externalRef = paymentData.external_reference;
      if (!externalRef) {
        return NextResponse.json({ error: 'No external reference' }, { status: 400 });
      }

      // Map MercadoPago status to our order status
      let orderStatus = 'pending';
      switch (paymentData.status) {
        case 'approved':
          orderStatus = 'paid';
          break;
        case 'rejected':
          orderStatus = 'payment_failed';
          break;
        case 'pending':
        case 'in_process':
          orderStatus = 'payment_pending';
          break;
      }

      // Update order
      await prisma.order.update({
        where: { id: externalRef },
        data: {
          status: orderStatus,
          mpPaymentId: String(paymentId),
          mpStatus: paymentData.status || null,
        },
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
