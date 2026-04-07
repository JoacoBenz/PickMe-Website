'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCart } from '@/lib/cart-context';
import { formatARS } from '@/lib/utils';
import { pinturas } from '@/lib/pinturas';

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [atTop, setAtTop] = useState(true);
  const [isSpinning, setIsSpinning] = useState(false);
  const [cartHover, setCartHover] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const hideTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cartTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { items, total, itemCount, updateQty, removeItem, clearCart } = useCart();
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const goToRandomPainting = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    const random = pinturas[Math.floor(Math.random() * pinturas.length)];
    setTimeout(() => {
      router.push(`/catalogo/${random.slug}`);
      setIsSpinning(false);
    }, 600);
  };

  const openCart = useCallback(() => {
    if (cartTimeout.current) { clearTimeout(cartTimeout.current); cartTimeout.current = null; }
    setCartHover(true);
  }, []);

  const scheduleCartClose = useCallback(() => {
    if (cartTimeout.current) clearTimeout(cartTimeout.current);
    cartTimeout.current = setTimeout(() => setCartHover(false), 400);
  }, []);

  async function handleCheckout() {
    if (items.length === 0) return;
    setCheckoutLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: items.map((i) => ({ productId: i.productId, qty: i.qty })) }),
      });
      const data = await res.json();
      if (data.init_point) {
        window.location.href = data.init_point;
      } else {
        alert('Error al procesar el pago. Intenta de nuevo.');
      }
    } catch {
      alert('Error de conexión. Verifica tu internet e intenta de nuevo.');
    } finally { setCheckoutLoading(false); }
  }

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    document.body.style.overflow = '';
  }, []);

  const toggleMenu = () => {
    const next = !menuOpen;
    setMenuOpen(next);
    document.body.style.overflow = next ? 'hidden' : '';
  };

  // Show nav
  const showNav = useCallback(() => {
    if (hideTimeout.current) {
      clearTimeout(hideTimeout.current);
      hideTimeout.current = null;
    }
    setVisible(true);
  }, []);

  // Hide nav with delay (only if not at top and no menus open)
  const scheduleHide = useCallback(() => {
    if (hideTimeout.current) clearTimeout(hideTimeout.current);
    hideTimeout.current = setTimeout(() => {
      if (!menuOpen && !cartHover && window.scrollY > 30) {
        setVisible(false);
      }
    }, 400);
  }, [menuOpen, cartHover]);

  // Track scroll position
  useEffect(() => {
    let lastY = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      const isAtTop = y <= 30;
      setAtTop(isAtTop);

      if (isAtTop) {
        // At top: always show
        setVisible(true);
      } else if (y > lastY && y > 100) {
        // Scrolling down past 100px: hide
        setVisible(false);
      }
      // Scrolling up: don't auto-show (only hover reveals)

      lastY = y;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Keep nav visible while menu or cart is open
  useEffect(() => {
    if (menuOpen || cartHover) setVisible(true);
  }, [menuOpen, cartHover]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) closeMenu();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menuOpen, closeMenu]);

  // Close menu on route change
  useEffect(() => { closeMenu(); }, [pathname, closeMenu]);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (hideTimeout.current) clearTimeout(hideTimeout.current);
      if (cartTimeout.current) clearTimeout(cartTimeout.current);
    };
  }, []);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const links = [
    { href: '/', label: 'Inicio' },
    { href: '/catalogo', label: 'Catálogo' },
    { href: '/crear', label: 'Crear' },
    { href: '/contacto', label: 'Contacto' },
  ];

  return (
    <>
      {/* Invisible trigger zone at top — only active when nav is hidden */}
      {!atTop && (
        <div
          className="nav-trigger"
          onMouseEnter={showNav}
          aria-hidden="true"
        />
      )}

      <nav
        className={`nav${visible ? ' nav--visible' : ''}`}
        role="navigation"
        aria-label="Menú principal"
        onMouseEnter={showNav}
        onMouseLeave={atTop ? undefined : scheduleHide}
      >
        <div className="nav__inner">
          <Link href="/" className="nav__logo" aria-label="Pick Me — inicio">
            Pick Me<span className="nav__logo-dot"></span>
          </Link>

          <ul className="nav__links">
            {links.map(l => (
              <li key={l.href}>
                <Link href={l.href} className={`nav__link${isActive(l.href) ? ' active' : ''}`}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right-side fixed group: zodiac + dice + cart */}
          <div className="nav__right-group">
            <Link
              href="/zodiaco"
              className="nav__zodiac-btn"
              title="Descubrí tu cuadro ideal"
            >
              <svg className="nav__zodiac-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a9.96 9.96 0 0 1 4 .8M12 2a9.96 9.96 0 0 0-4 .8" />
                <path d="M12 22a9.96 9.96 0 0 0 4-.8M12 22a9.96 9.96 0 0 1-4-.8" />
                <path d="M2 12a9.96 9.96 0 0 1 .8-4M2 12a9.96 9.96 0 0 0 .8 4" />
                <path d="M22 12a9.96 9.96 0 0 0-.8-4M22 12a9.96 9.96 0 0 1-.8 4" />
                <circle cx="12" cy="12" r="3" fill="currentColor" stroke="none" />
              </svg>
              <span>Tu cuadro ideal</span>
            </Link>

            <button
              className={`nav__dice-btn${isSpinning ? ' spinning' : ''}`}
              onClick={goToRandomPainting}
              aria-label="Ver cuadro al azar"
              title="Sorprendeme"
            >
              <svg className="nav__dice-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="3" />
                <circle cx="8" cy="8" r="1.5" fill="currentColor" stroke="none" />
                <circle cx="16" cy="8" r="1.5" fill="currentColor" stroke="none" />
                <circle cx="8" cy="16" r="1.5" fill="currentColor" stroke="none" />
                <circle cx="16" cy="16" r="1.5" fill="currentColor" stroke="none" />
                <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
              </svg>
              <span>Sorprendeme</span>
            </button>

            <div
              className={`nav__cart-zone${cartHover ? ' open' : ''}`}
              onMouseEnter={openCart}
              onMouseLeave={scheduleCartClose}
            >
              <button className="nav__cart-btn" aria-label={`Carrito (${itemCount} items)`}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                {itemCount > 0 && <span className="nav__cart-badge">{itemCount}</span>}
              </button>

              {/* Hover drawer */}
              <div className="nav__cart-drawer">
                <div className="nav__cart-drawer-header">
                  <h3>Tu carrito</h3>
                </div>
                {items.length === 0 ? (
                  <div className="nav__cart-empty">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
                    <p>Carrito vacío</p>
                  </div>
                ) : (
                  <>
                    <div className="nav__cart-items">
                      {items.map((item) => (
                        <div key={item.productId} className="nav__cart-item">
                          <div
                            className="nav__cart-item-art"
                            style={
                              item.gradient.startsWith('/images/')
                                ? { backgroundImage: `url(${item.gradient})`, backgroundSize: 'cover', backgroundPosition: 'center' }
                                : { background: item.gradient }
                            }
                          />
                          <div className="nav__cart-item-info">
                            <div className="nav__cart-item-name">{item.name}</div>
                            <div className="nav__cart-item-price">{formatARS(item.price)}</div>
                            <div className="nav__cart-item-qty">
                              <button type="button" onClick={() => updateQty(item.productId, item.qty - 1)}>−</button>
                              <span>{item.qty}</span>
                              <button type="button" onClick={() => updateQty(item.productId, item.qty + 1)}>+</button>
                            </div>
                          </div>
                          <button className="nav__cart-item-remove" onClick={() => removeItem(item.productId)}>✕</button>
                        </div>
                      ))}
                    </div>
                    <div className="nav__cart-footer">
                      <div className="nav__cart-total">
                        <span>Total</span>
                        <span>{formatARS(total)}</span>
                      </div>
                      <button className="btn btn-accent nav__cart-checkout" onClick={handleCheckout} disabled={checkoutLoading}>
                        {checkoutLoading ? 'Procesando...' : 'Ir a pagar'}
                      </button>
                      <button className="btn btn-outline nav__cart-clear" onClick={clearCart}>Vaciar carrito</button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <button
            className={`nav__hamburger${menuOpen ? ' open' : ''}`}
            aria-label="Abrir menú"
            aria-expanded={menuOpen}
            onClick={toggleMenu}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      <div className={`nav__mobile${menuOpen ? ' open' : ''}`} role="dialog" aria-label="Menú móvil">
        {links.map(l => (
          <Link
            key={l.href}
            href={l.href}
            className={`nav__mobile-link${isActive(l.href) ? ' active' : ''}`}
            onClick={closeMenu}
          >
            {l.label}
          </Link>
        ))}
        <button
          className={`nav__mobile-cta${isSpinning ? ' spinning' : ''}`}
          onClick={() => { closeMenu(); goToRandomPainting(); }}
        >
          <svg className="nav__dice-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="3" />
            <circle cx="8" cy="8" r="1.5" fill="currentColor" stroke="none" />
            <circle cx="16" cy="8" r="1.5" fill="currentColor" stroke="none" />
            <circle cx="8" cy="16" r="1.5" fill="currentColor" stroke="none" />
            <circle cx="16" cy="16" r="1.5" fill="currentColor" stroke="none" />
            <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
          </svg>
          Sorprendeme →
        </button>
      </div>
    </>
  );
}
