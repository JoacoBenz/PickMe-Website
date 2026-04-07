import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import CatalogClient from './CatalogClient';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Catálogo',
  description: 'Catálogo de cuadros decorativos — Pick Me. Explorá nuestra colección de arte único.',
};

export default async function CatalogoPage() {
  const products = await prisma.product.findMany({
    where: { active: true },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <>
      <section className="page-hero" aria-label="Encabezado del catálogo">
        <span className="page-hero__tag">Colección</span>
        <h1 className="page-hero__title">Nuestro Catálogo</h1>
        <p className="page-hero__subtitle">Explorá nuestra colección de cuadros únicos. Filtrá por estilo, color o precio para encontrar tu pieza ideal.</p>
      </section>

      <CatalogClient products={products} />
    </>
  );
}
