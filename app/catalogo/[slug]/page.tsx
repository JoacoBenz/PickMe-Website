import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import AddToCartButton from './AddToCartButton';
import { formatARS } from '@/lib/utils';
import { prisma } from '@/lib/prisma';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await prisma.product.findUnique({ where: { slug } });
  if (!product) return { title: 'Producto no encontrado' };
  return {
    title: product.name,
    description: product.description || '',
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({ where: { slug } });
  if (!product) notFound();

  const related = await prisma.product.findMany({
    where: {
      slug: { not: slug },
      active: true,
      OR: [{ style: product.style }, { color: product.color }],
    },
    take: 3,
  });

  return (
    <>
      <section className="product-detail">
        <Link href="/catalogo" className="product-detail__back">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          Volver al catálogo
        </Link>
        <div className="product-detail__inner">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              className="product-detail__art product-detail__img"
              width={600}
              height={600}
              priority
            />
          ) : (
            <div className="product-detail__art" style={{ background: product.gradient || '' }}></div>
          )}
          <div className="product-detail__info">
            <span className="painting-card__badge">{product.style} · {product.color}</span>
            <h1 className="product-detail__name">{product.name}</h1>
            <p className="product-detail__desc">{product.description}</p>
            <div className="product-detail__price">{formatARS(product.priceARS)}</div>
            <AddToCartButton
              productId={product.id}
              slug={product.slug}
              name={product.name}
              price={product.priceARS}
              gradient={product.imageUrl || product.gradient || ''}
            />
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="related-section">
          <div className="related-section__inner">
            <h2 className="section-title">También te puede gustar</h2>
            <div className="catalog-grid">
              {related.map((p) => (
                <div key={p.id} className="painting-card">
                  <div className="painting-card__art">
                    {p.imageUrl ? (
                      <Image
                        src={p.imageUrl}
                        alt={p.name}
                        className="painting-card__art-inner painting-card__img"
                        width={400}
                        height={400}
                        loading="lazy"
                      />
                    ) : (
                      <div className="painting-card__art-inner" style={{ background: p.gradient || '' }}></div>
                    )}
                    <div className="painting-card__overlay">
                      <Link href={`/catalogo/${p.slug}`} className="painting-card__overlay-btn">Ver detalle</Link>
                    </div>
                  </div>
                  <div className="painting-card__body">
                    <div className="painting-card__meta">
                      <span className="painting-card__badge">{p.style}</span>
                      <span className="painting-card__price">{formatARS(p.priceARS)}</span>
                    </div>
                    <h3 className="painting-card__name">{p.name}</h3>
                    <Link href={`/catalogo/${p.slug}`} className="painting-card__btn">Ver detalle</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
