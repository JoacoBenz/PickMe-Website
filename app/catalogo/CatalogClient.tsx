'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { formatARS } from '@/lib/utils';
import { useCart } from '@/lib/cart-context';

export interface CatalogProduct {
  id: string;
  name: string;
  slug: string;
  style: string;
  color: string;
  priceARS: number;
  description: string | null;
  imageUrl: string | null;
  gradient: string | null;
}

const PRICE_RANGES: Record<string, [number, number]> = {
  'Todos': [0, Infinity],
  '$0-10k': [0, 10000],
  '$10k-25k': [10000, 25000],
  '$25k+': [25000, Infinity],
};

type FilterKey = 'estilo' | 'color' | 'precio';

const filterGroups: { key: FilterKey; label: string; options: string[] }[] = [
  { key: 'estilo', label: 'Estilo', options: ['Todos', 'Pop Art', 'Deportes', 'Poster Retro', 'Buenos Aires', 'Ilustración', 'Abstracto', 'Paisaje'] },
  { key: 'color', label: 'Color', options: ['Todos', 'Rojo', 'Azul', 'Neutro', 'Multicolor'] },
  { key: 'precio', label: 'Precio', options: ['Todos', '$0-10k', '$10k-25k', '$25k+'] },
];

export default function CatalogClient({ products }: { products: CatalogProduct[] }) {
  const { addItem } = useCart();
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set());

  const [filters, setFilters] = useState<Record<FilterKey, string>>({
    estilo: 'Todos',
    color: 'Todos',
    precio: 'Todos',
  });

  const handleAddToCart = (p: CatalogProduct) => {
    addItem({
      productId: p.id,
      slug: p.slug,
      name: p.name,
      price: p.priceARS,
      qty: 1,
      gradient: p.imageUrl || p.gradient || '',
    });
    setAddedIds((prev) => new Set(prev).add(p.id));
    setTimeout(() => {
      setAddedIds((prev) => {
        const next = new Set(prev);
        next.delete(p.id);
        return next;
      });
    }, 1500);
  };

  const filtered = useMemo(() => {
    const [min, max] = PRICE_RANGES[filters.precio] || [0, Infinity];
    return products.filter((p) => {
      const estiloOk = filters.estilo === 'Todos' || p.style === filters.estilo;
      const colorOk = filters.color === 'Todos' || p.color === filters.color;
      const precioOk = p.priceARS >= min && p.priceARS < max;
      return estiloOk && colorOk && precioOk;
    });
  }, [filters, products]);

  return (
    <section className="catalog-section">
      <div className="catalog-section__inner">
        {/* Filter bar */}
        <div className="filter-bar" role="search" aria-label="Filtros del catálogo">
          {filterGroups.map((group) => (
            <div key={group.key} className="filter-group" data-filter-group={group.key}>
              <span className="filter-group__label">{group.label}</span>
              <div className="filter-pills">
                {group.options.map((option) => (
                  <button
                    key={option}
                    type="button"
                    className={`pill${filters[group.key] === option ? ' active' : ''}`}
                    onClick={() => setFilters((prev) => ({ ...prev, [group.key]: option }))}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Gallery grid */}
        <div className="catalog-grid" id="catalogGrid">
          {filtered.length === 0 ? (
            <div className="no-results visible">
              <p>No se encontraron cuadros con esos filtros.</p>
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => setFilters({ estilo: 'Todos', color: 'Todos', precio: 'Todos' })}
              >
                Limpiar filtros
              </button>
            </div>
          ) : (
            filtered.map((p, i) => (
              <div
                key={p.id}
                className="painting-card"
                style={{ animationDelay: `${i * 0.07}s` }}
              >
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
                    <Link href={`/catalogo/${p.slug}`} className="painting-card__overlay-btn">
                      Ver detalle
                    </Link>
                  </div>
                </div>
                <div className="painting-card__body">
                  <div className="painting-card__meta">
                    <span className="painting-card__badge">{p.style}</span>
                    <span className="painting-card__price">{formatARS(p.priceARS)}</span>
                  </div>
                  <h3 className="painting-card__name">{p.name}</h3>
                  <div className="painting-card__actions">
                    <Link href={`/catalogo/${p.slug}`} className="painting-card__btn painting-card__btn--outline">
                      Ver detalle
                    </Link>
                    <button
                      type="button"
                      className={`painting-card__btn painting-card__btn--cart${addedIds.has(p.id) ? ' added' : ''}`}
                      onClick={() => handleAddToCart(p)}
                      disabled={addedIds.has(p.id)}
                    >
                      {addedIds.has(p.id) ? (
                        <>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                          Agregado
                        </>
                      ) : (
                        <>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
                          Agregar
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
