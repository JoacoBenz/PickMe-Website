import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Orden confirmada' };

export default function OrdenConfirmada() {
  return (
    <section className="order-result">
      <div className="order-result__inner">
        <div className="order-result__icon order-result__icon--success">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
        </div>
        <h1 className="order-result__title">¡Pago confirmado!</h1>
        <p className="order-result__text">
          Tu orden fue procesada exitosamente. Recibirás un email con los detalles de tu compra.
        </p>
        <div className="order-result__actions">
          <Link href="/catalogo" className="btn btn-primary">Seguir comprando</Link>
          <Link href="/" className="btn btn-outline">Volver al inicio</Link>
        </div>
      </div>
    </section>
  );
}
