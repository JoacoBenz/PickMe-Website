import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import AddToCartButton from './AddToCartButton';
import { formatARS } from '@/lib/utils';
import { pinturas } from '@/lib/pinturas';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = pinturas.find((p) => p.slug === slug);
  if (!product) return { title: 'Producto no encontrado' };
  return {
    title: product.nombre,
    description: product.descripcion,
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = pinturas.find((p) => p.slug === slug);
  if (!product) notFound();

  const related = pinturas
    .filter((p) => p.slug !== slug && (p.estilo === product.estilo || p.color === product.color))
    .slice(0, 3);

  return (
    <>
      <section className="product-detail">
        <Link href="/catalogo" className="product-detail__back">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          Volver al catálogo
        </Link>
        <div className="product-detail__inner">
          {product.imagen ? (
            <img
              src={product.imagen}
              alt={product.nombre}
              className="product-detail__art product-detail__img"
            />
          ) : (
            <div className="product-detail__art" style={{ background: product.gradiente }}></div>
          )}
          <div className="product-detail__info">
            <span className="painting-card__badge">{product.estilo} · {product.color}</span>
            <h1 className="product-detail__name">{product.nombre}</h1>
            <p className="product-detail__desc">{product.descripcion}</p>
            <div className="product-detail__price">{formatARS(product.precio)}</div>
            <AddToCartButton
              productId={String(product.id)}
              slug={product.slug}
              name={product.nombre}
              price={product.precio}
              gradient={product.imagen || product.gradiente}
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
                    {p.imagen ? (
                      <img
                        src={p.imagen}
                        alt={p.nombre}
                        className="painting-card__art-inner painting-card__img"
                        loading="lazy"
                      />
                    ) : (
                      <div className="painting-card__art-inner" style={{ background: p.gradiente }}></div>
                    )}
                    <div className="painting-card__overlay">
                      <Link href={`/catalogo/${p.slug}`} className="painting-card__overlay-btn">Ver detalle</Link>
                    </div>
                  </div>
                  <div className="painting-card__body">
                    <div className="painting-card__meta">
                      <span className="painting-card__badge">{p.estilo}</span>
                      <span className="painting-card__price">{formatARS(p.precio)}</span>
                    </div>
                    <h3 className="painting-card__name">{p.nombre}</h3>
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
