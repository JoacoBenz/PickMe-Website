'use client';

import { useState, FormEvent } from 'react';
import RevealOnScroll from '@/components/RevealOnScroll';

export default function ContactClient() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const nombre = (data.get('nombre') as string)?.trim();
    const email = (data.get('email') as string)?.trim();
    const mensaje = (data.get('mensaje') as string)?.trim();
    const asunto = data.get('asunto') as string;

    const newErrors: Record<string, boolean> = {};
    if (!nombre) newErrors.nombre = true;
    if (!email) newErrors.email = true;
    if (!mensaje) newErrors.mensaje = true;
    if (!asunto) newErrors.asunto = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre,
          apellido: (data.get('apellido') as string)?.trim() || '',
          email,
          telefono: (data.get('telefono') as string)?.trim() || '',
          asunto,
          mensaje,
        }),
      });

      if (res.ok) {
        setSuccess(true);
        setSubmitError(false);
        form.reset();
        setTimeout(() => setSuccess(false), 6000);
      } else {
        setSubmitError(true);
        setTimeout(() => setSubmitError(false), 6000);
      }
    } catch {
      setSubmitError(true);
      setTimeout(() => setSubmitError(false), 6000);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="contact-section" aria-label="Información de contacto y formulario">
      <div className="contact-grid">
        {/* LEFT: Contact Info */}
        <RevealOnScroll className="contact-info">
          <h2 className="contact-info__title">Estamos para vos</h2>
          <p className="contact-info__desc">
            Respondemos consultas de lunes a viernes de 9 a 18 h. Para pedidos urgentes, escribinos por WhatsApp.
          </p>

          <div className="contact-info__items">
            <div className="contact-info__item">
              <div className="contact-info__icon" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div>
                <div className="contact-info__label">Dirección</div>
                <div className="contact-info__value">Av. Corrientes 1234, CABA, Argentina</div>
              </div>
            </div>

            <div className="contact-info__item">
              <div className="contact-info__icon" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div>
                <div className="contact-info__label">Email</div>
                <div className="contact-info__value">
                  <a href="mailto:hola@pickme.art" style={{ color: 'inherit', textDecoration: 'underline', textUnderlineOffset: '3px' }}>hola@pickme.art</a>
                </div>
              </div>
            </div>

            <div className="contact-info__item">
              <div className="contact-info__icon" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.8a16 16 0 0 0 6 6l.86-.86a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div>
                <div className="contact-info__label">Teléfono / WhatsApp</div>
                <div className="contact-info__value">
                  <a href="https://wa.me/5491112345678?text=Hola%20Pick%20Me" style={{ color: 'inherit', textDecoration: 'underline', textUnderlineOffset: '3px' }}>+54 9 11 1234-5678</a>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-info__map" aria-label="Mapa de ubicación (referencia)">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span style={{ fontFamily: "'Playfair Display',serif", fontStyle: 'italic', color: '#6B6B6B', fontSize: '0.9rem' }}>Buenos Aires, Argentina</span>
          </div>
        </RevealOnScroll>

        {/* RIGHT: Contact Form */}
        <RevealOnScroll delay={2} className="contact-form-wrap">
          <h2 className="contact-form-wrap__title">Envianos un mensaje</h2>

          <form onSubmit={handleSubmit} noValidate aria-label="Formulario de contacto">
            <div className="form-grid">
              <div className="form-field form-field--half">
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  placeholder=" "
                  autoComplete="given-name"
                  required
                  style={errors.nombre ? { borderColor: '#e74c3c' } : undefined}
                  onInput={() => setErrors((prev) => ({ ...prev, nombre: false }))}
                />
                <label htmlFor="nombre">Nombre</label>
              </div>

              <div className="form-field form-field--half">
                <input type="text" id="apellido" name="apellido" placeholder=" " autoComplete="family-name" />
                <label htmlFor="apellido">Apellido</label>
              </div>

              <div className="form-field">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder=" "
                  autoComplete="email"
                  required
                  style={errors.email ? { borderColor: '#e74c3c' } : undefined}
                  onInput={() => setErrors((prev) => ({ ...prev, email: false }))}
                />
                <label htmlFor="email">Email</label>
              </div>

              <div className="form-field">
                <input type="tel" id="telefono" name="telefono" placeholder=" " autoComplete="tel" />
                <label htmlFor="telefono">Teléfono (opcional)</label>
              </div>

              <div className="form-field">
                <select
                  id="asunto"
                  name="asunto"
                  required
                  style={errors.asunto ? { borderColor: '#e74c3c' } : undefined}
                  onChange={() => setErrors((prev) => ({ ...prev, asunto: false }))}
                >
                  <option value="" disabled>Seleccioná un asunto</option>
                  <option value="consulta">Consulta general</option>
                  <option value="pedido">Pedido personalizado</option>
                  <option value="envio">Información de envío</option>
                  <option value="otro">Otro</option>
                </select>
              </div>

              <div className="form-field">
                <textarea
                  id="mensaje"
                  name="mensaje"
                  placeholder=" "
                  rows={5}
                  required
                  style={errors.mensaje ? { borderColor: '#e74c3c' } : undefined}
                  onInput={() => setErrors((prev) => ({ ...prev, mensaje: false }))}
                />
                <label htmlFor="mensaje">Mensaje</label>
              </div>
            </div>

            <button type="submit" className={`form-submit${loading ? ' loading' : ''}`} disabled={loading}>
              <span className="btn-text">Enviar mensaje</span>
              <span className="spinner-inline" aria-hidden="true"></span>
            </button>

            {success && (
              <div className="form-success visible" role="alert">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>
                ¡Mensaje enviado! Te respondemos en las próximas 24 horas.
              </div>
            )}
            {submitError && (
              <div className="form-error visible" role="alert">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></svg>
                Hubo un error al enviar tu mensaje. Por favor intenta de nuevo.
              </div>
            )}
          </form>
        </RevealOnScroll>
      </div>
    </main>
  );
}
