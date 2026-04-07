import type { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Contacto — Pick Me. Escribinos y te respondemos a la brevedad.',
};

export default function ContactoPage() {
  return (
    <>
      <section className="page-hero" aria-label="Encabezado de contacto">
        <span className="page-hero__tag">Hablemos</span>
        <h1 className="page-hero__title">Contacto</h1>
        <p className="page-hero__subtitle">¿Tenés alguna consulta, pedido especial o simplemente querés decir hola? Estamos para ayudarte.</p>
      </section>

      <ContactClient />
    </>
  );
}
