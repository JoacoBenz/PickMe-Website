import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Pago pendiente' };

export default function OrdenPendiente() {
  return (
    <section className="order-result">
      <div className="order-result__inner">
        <div className="order-result__icon order-result__icon--pending">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
        </div>
        <h1 className="order-result__title">Pago pendiente</h1>
        <p className="order-result__text">
          Tu pago está siendo procesado. Si elegiste pagar en efectivo (Rapipago, Pago Fácil),
          tenés hasta 3 días hábiles para completar el pago. Te enviaremos un email cuando se confirme.
        </p>
        <div className="order-result__actions">
          <Link href="/" className="btn btn-primary">Volver al inicio</Link>
          <Link href="/contacto" className="btn btn-outline">Contactarnos</Link>
        </div>
      </div>
    </section>
  );
}
