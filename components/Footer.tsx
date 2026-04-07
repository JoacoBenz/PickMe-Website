import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__inner">
        <div className="footer__top">
          <div className="footer__brand">
            <div className="footer__logo">Pick Me<span className="footer__logo-dot"></span></div>
            <p className="footer__desc">
              Arte decorativo único y personalizado para transformar cualquier espacio. Cada cuadro es una historia.
            </p>
            <div className="footer__social" aria-label="Redes sociales">
              <a href="https://www.instagram.com/pickme_retratos" target="_blank" rel="noopener noreferrer" className="footer__social-btn" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a href="#" className="footer__social-btn" aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a href="#" className="footer__social-btn" aria-label="Pinterest">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M8 20l4-9"/>
                  <path d="M10.7 14c.437 1.263 1.43 2 2.55 2 2.071 0 3.75-1.554 3.75-4a5 5 0 1 0-9.999 0c0 .938.132 1.95.408 2.74"/>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <div className="footer__col-title">Secciones</div>
            <ul className="footer__links">
              <li><Link href="/" className="footer__link">Inicio</Link></li>
              <li><Link href="/catalogo" className="footer__link">Catálogo</Link></li>
              <li><Link href="/crear" className="footer__link">Crear cuadro</Link></li>
              <li><Link href="/contacto" className="footer__link">Contacto</Link></li>
            </ul>
          </div>

          <div>
            <div className="footer__col-title">Contacto</div>
            <ul className="footer__links">
              <li><a href="mailto:hola@pickme.art" className="footer__link">hola@pickme.art</a></li>
              <li><a href="https://wa.me/5492944805273?text=Hola%20Pick%20Me" target="_blank" rel="noopener noreferrer" className="footer__link">WhatsApp</a></li>
              <li><a href="https://www.instagram.com/pickme_retratos" target="_blank" rel="noopener noreferrer" className="footer__link">@pickme_retratos</a></li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <span>© 2026 Pick Me. Todos los derechos reservados.</span>
          <span>Hecho con ♥ en Argentina</span>
        </div>
      </div>
    </footer>
  );
}
