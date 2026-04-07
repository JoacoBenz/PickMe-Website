import type { Metadata } from 'next';
import CreatorWizard from './CreatorWizard';

export const metadata: Metadata = {
  title: 'Crear cuadro',
  description: 'Creador de cuadros — Pick Me. Subi tu imagen, elegi el marco y el tamano. Tu obra personalizada lista para colgar.',
};

export default function CrearPage() {
  return (
    <>
      <section className="page-hero" aria-label="Encabezado del creador">
        <span className="page-hero__tag">Crea tu obra</span>
        <h1 className="page-hero__title">Tu imagen, tu cuadro</h1>
        <p className="page-hero__subtitle">
          Subi tu foto favorita, elegi el marco y el tamano perfecto.
          En pocos pasos tenes tu obra lista para colgar.
        </p>
      </section>

      <CreatorWizard />
    </>
  );
}
