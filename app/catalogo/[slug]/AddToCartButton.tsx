'use client';

import { useState } from 'react';
import { useCart } from '@/lib/cart-context';

interface Props {
  productId: string;
  slug: string;
  name: string;
  price: number;
  gradient: string;
}

export default function AddToCartButton({ productId, slug, name, price, gradient }: Props) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem({ productId, slug, name, price, qty: 1, gradient });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <button
      type="button"
      className="btn btn-accent product-detail__add-btn"
      onClick={handleAdd}
      disabled={added}
    >
      {added ? (
        <>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
          ¡Agregado!
        </>
      ) : (
        <>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" /></svg>
          Agregar al carrito
        </>
      )}
    </button>
  );
}
