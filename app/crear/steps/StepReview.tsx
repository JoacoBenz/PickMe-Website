'use client';

import { FormEvent, useRef, useEffect } from 'react';
import { SIZES, FRAMES, type WizardState, renderFrameToCanvas } from '../CreatorWizard';
import { formatARS } from '@/lib/utils';

type Action =
  | { type: 'GO_TO_STEP'; step: 1 | 2 | 3 | 4 }
  | { type: 'SET_ORDER_FIELD'; field: 'orderName' | 'orderEmail' | 'orderMessage'; value: string }
  | { type: 'SET_ORDER_LOADING'; loading: boolean }
  | { type: 'SET_ORDER_SUCCESS'; success: boolean };

interface StepReviewProps {
  state: WizardState;
  dispatch: (action: Action) => void;
  getCanvasDataUrl: () => string;
}

export default function StepReview({ state, dispatch, getCanvasDataUrl }: StepReviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const previewUrl = useRef<string>('');

  const size = SIZES[state.sizeIndex];
  const frameInfo = FRAMES.find(f => f.id === state.frame);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !state.image) return;
    renderFrameToCanvas(canvas, state.image, state.frame, size);
    previewUrl.current = canvas.toDataURL('image/png');
  }, [state.image, state.frame, size]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!state.orderName.trim() || !state.orderEmail.trim()) return;

    dispatch({ type: 'SET_ORDER_LOADING', loading: true });

    try {
      const canvasDataUrl = canvasRef.current?.toDataURL('image/png') || '';

      const res = await fetch('/api/checkout/custom', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: state.orderName,
          email: state.orderEmail,
          size: size.key,
          style: state.frame,
          message: state.orderMessage || 'Pedido desde creador de cuadros',
          canvasDataUrl,
        }),
      });

      const result = await res.json();

      if (result.init_point) {
        window.location.href = result.init_point;
      } else {
        alert('Error al crear el pago. Intenta de nuevo.');
      }
    } catch {
      alert('Error de conexión. Verifica tu internet e intenta de nuevo.');
    } finally {
      dispatch({ type: 'SET_ORDER_LOADING', loading: false });
    }
  }

  return (
    <div className="step-review">
      <canvas ref={canvasRef} style={{ display: 'none' }} />

      <div className="step-review__header">
        <h2 className="step-review__title">Revisa tu pedido</h2>
        <p className="step-review__desc">
          Verifica los detalles y completa tus datos para solicitar tu cuadro personalizado.
        </p>
      </div>

      <div className="step-review__layout">
        {/* Left: Preview + Summary */}
        <div className="step-review__preview-col">
          <div className="step-review__art">
            {previewUrl.current ? (
              <img src={previewUrl.current} alt="Preview final" className="step-review__art-img" />
            ) : state.imageDataUrl ? (
              <img src={state.imageDataUrl} alt="Preview" className="step-review__art-img" />
            ) : null}
          </div>

          <div className="step-review__summary">
            <div className="step-review__summary-row">
              <span className="step-review__summary-label">Marco</span>
              <span className="step-review__summary-value">{frameInfo?.label}</span>
              <button type="button" className="step-review__edit" onClick={() => dispatch({ type: 'GO_TO_STEP', step: 2 })}>
                Editar
              </button>
            </div>
            <div className="step-review__summary-row">
              <span className="step-review__summary-label">Tamano</span>
              <span className="step-review__summary-value">{size.dims}</span>
              <button type="button" className="step-review__edit" onClick={() => dispatch({ type: 'GO_TO_STEP', step: 3 })}>
                Editar
              </button>
            </div>
            <div className="step-review__summary-row step-review__summary-row--total">
              <span className="step-review__summary-label">Total</span>
              <span className="step-review__summary-price">{formatARS(size.price)}</span>
            </div>
          </div>
        </div>

        {/* Right: Order form */}
        <div className="step-review__form-col">
          <form className="step-review__form" onSubmit={handleSubmit} noValidate>
            <div className="step-review__field">
              <label htmlFor="rev-name" className="step-review__label">Tu nombre</label>
              <input
                id="rev-name"
                type="text"
                className="step-review__input"
                placeholder="Tu nombre completo"
                value={state.orderName}
                onChange={(e) => dispatch({ type: 'SET_ORDER_FIELD', field: 'orderName', value: e.target.value })}
                required
                autoComplete="name"
              />
            </div>

            <div className="step-review__field">
              <label htmlFor="rev-email" className="step-review__label">Tu email</label>
              <input
                id="rev-email"
                type="email"
                className="step-review__input"
                placeholder="tu@email.com"
                value={state.orderEmail}
                onChange={(e) => dispatch({ type: 'SET_ORDER_FIELD', field: 'orderEmail', value: e.target.value })}
                required
                autoComplete="email"
              />
            </div>

            <div className="step-review__field">
              <label htmlFor="rev-msg" className="step-review__label">Mensaje o detalle especial</label>
              <textarea
                id="rev-msg"
                className="step-review__input step-review__textarea"
                placeholder="Contanos si tenes alguna indicacion especial..."
                rows={4}
                value={state.orderMessage}
                onChange={(e) => dispatch({ type: 'SET_ORDER_FIELD', field: 'orderMessage', value: e.target.value })}
              />
            </div>

            <button
              type="submit"
              className={`step-review__submit${state.orderLoading ? ' step-review__submit--loading' : ''}`}
              disabled={state.orderLoading}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" /></svg>
              {state.orderLoading ? 'Procesando...' : `Pagar ${formatARS(size.price)}`}
            </button>

            {state.orderSuccess && (
              <div className="step-review__success" role="alert">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                <span>Solicitud enviada. Te contactaremos pronto.</span>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
