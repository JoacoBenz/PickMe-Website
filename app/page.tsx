import Link from 'next/link';
import RevealOnScroll from '@/components/RevealOnScroll';
import CountUp from '@/components/CountUp';

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="hero" aria-label="Sección principal">
        <RevealOnScroll className="hero__content">
          <span className="hero__tag">Arte decorativo</span>
          <h1 className="hero__title">
            Arte que<br />
            <em>habla por vos</em>
          </h1>
          <p className="hero__subtitle">
            Cuadros únicos, personalizados y llenos de vida para transformar cualquier espacio. Cada obra cuenta una historia que es tuya.
          </p>
          <div className="hero__actions">
            <Link href="/catalogo" className="btn btn-primary">
              Ver catálogo
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
            <Link href="/crear" className="btn btn-outline">Diseñar mi cuadro</Link>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={2} className="hero__art-wrapper">
          <div className="hero__art" aria-hidden="true">
            <div className="art-block art-block--terracotta"></div>
            <div className="art-block art-block--sage"></div>
            <div className="art-block art-block--rose"></div>
          </div>
        </RevealOnScroll>
      </section>

      {/* STATS */}
      <section className="stats" aria-label="Estadísticas">
        <div className="stats__inner">
          <RevealOnScroll delay={1} className="stats__item">
            <CountUp target={200} prefix="+" />
            <span className="stats__label">Obras disponibles</span>
          </RevealOnScroll>
          <RevealOnScroll delay={2} className="stats__item">
            <CountUp target={15} />
            <span className="stats__label">Estilos únicos</span>
          </RevealOnScroll>
          <RevealOnScroll delay={3} className="stats__item">
            <CountUp target={100} suffix="%" />
            <span className="stats__label">Personalizable</span>
          </RevealOnScroll>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features" aria-labelledby="features-title">
        <div className="features__inner">
          <header className="features__header">
            <span className="section-tag">Por qué elegirnos</span>
            <h2 className="section-title" id="features-title">El arte que merece tu espacio</h2>
            <p className="section-subtitle">
              Creamos experiencias visuales únicas combinando técnica, pasión y un proceso completamente adaptado a vos.
            </p>
          </header>

          <div className="features__grid">
            <RevealOnScroll delay={1}>
              <article className="feature-card">
                <div className="feature-card__icon" aria-hidden="true">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
                    <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
                    <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
                    <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
                    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
                  </svg>
                </div>
                <h3 className="feature-card__title">Arte Auténtico</h3>
                <p className="feature-card__text">
                  Cada cuadro es una pieza única creada con materiales de primera calidad. No hay dos iguales, como vos.
                </p>
              </article>
            </RevealOnScroll>

            <RevealOnScroll delay={2}>
              <article className="feature-card">
                <div className="feature-card__icon" aria-hidden="true">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                  </svg>
                </div>
                <h3 className="feature-card__title">100% Personalizable</h3>
                <p className="feature-card__text">
                  Elegí colores, tamaño, estilo y mensaje. Nuestro creador online te permite diseñar tu cuadro ideal en minutos.
                </p>
              </article>
            </RevealOnScroll>

            <RevealOnScroll delay={3}>
              <article className="feature-card">
                <div className="feature-card__icon" aria-hidden="true">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1" y="3" width="15" height="13" rx="1" />
                    <path d="M16 8h4l3 3v5h-7V8z" />
                    <circle cx="5.5" cy="18.5" r="2.5" />
                    <circle cx="18.5" cy="18.5" r="2.5" />
                  </svg>
                </div>
                <h3 className="feature-card__title">Envío a todo el país</h3>
                <p className="feature-card__text">
                  Embalaje especial para obras de arte. Recibís tu cuadro en perfectas condiciones, donde estés en Argentina.
                </p>
              </article>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials" aria-labelledby="testimonials-title">
        <div className="testimonials__inner">
          <header className="testimonials__header">
            <RevealOnScroll>
              <span className="section-tag">Testimonios</span>
              <h2 className="section-title" id="testimonials-title">Lo que dicen nuestros clientes</h2>
              <p className="section-subtitle">Miles de personas eligieron Pick Me para transformar sus espacios.</p>
            </RevealOnScroll>
          </header>

          <div className="testimonials__grid">
            {[
              { text: 'Quedé sorprendida con la calidad del cuadro. Los colores son exactamente como en la foto y llegó perfecto. Ya lo colgué en el living y todos me preguntan dónde lo compré.', name: 'Valentina M.', location: 'Buenos Aires', initial: 'V' },
              { text: 'Usé el creador para hacer un cuadro personalizado con una frase para mi mamá. Le encantó. El proceso fue súper fácil y el resultado fue increíble.', name: 'Martín G.', location: 'Córdoba', initial: 'M' },
              { text: 'Compré tres cuadros del catálogo para el nuevo departamento. El equipo de Pick Me me asesoró genial para combinar los estilos. ¡Súper recomendado!', name: 'Luciana P.', location: 'Rosario', initial: 'L' },
            ].map((t, i) => (
              <RevealOnScroll key={i} delay={i + 1}>
                <article className="testimonial-card">
                  <div className="testimonial-card__quote" aria-hidden="true">&ldquo;</div>
                  <p className="testimonial-card__text">&ldquo;{t.text}&rdquo;</p>
                  <div className="testimonial-card__stars" aria-label="5 estrellas">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <span key={j} className="star">★</span>
                    ))}
                  </div>
                  <div className="testimonial-card__author">
                    <div className="testimonial-card__avatar" aria-hidden="true">{t.initial}</div>
                    <div>
                      <div className="testimonial-card__name">{t.name}</div>
                      <div className="testimonial-card__location">{t.location}</div>
                    </div>
                  </div>
                </article>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="cta-banner" aria-labelledby="cta-title">
        <RevealOnScroll className="cta-banner__inner">
          <h2 className="cta-banner__title" id="cta-title">Diseñá el cuadro de tus sueños</h2>
          <p className="cta-banner__subtitle">
            Usá nuestro creador interactivo para personalizar cada detalle. Fondo, texto, colores — todo tuyo.
          </p>
          <Link href="/crear" className="btn btn-accent">
            Comenzar ahora
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </Link>
        </RevealOnScroll>
      </section>
    </>
  );
}
