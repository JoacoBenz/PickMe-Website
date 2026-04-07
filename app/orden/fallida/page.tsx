import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Pago fallido' };

export default function OrdenFallida() {
  return (
    <section className="order-result">
      <div className="order-result__inner">
        <div className="order-result__icon order-result__icon--error">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></svg>
        </div>
        <h1 className="order-result__title">El pago no pudo procesarse</h1>
        <p className="order-result__text">
          Hubo un problema con tu pago. Podés intentar nuevamente o contactarnos si el problema persiste.
        </p>
        <div className="order-result__actions">
          <Link href="/catalogo" className="btn btn-primary">Intentar de nuevo</Link>
          <Link href="/contacto" className="btn btn-outline">Contactarnos</Link>
        </div>
      </div>
    </section>
  );
}
