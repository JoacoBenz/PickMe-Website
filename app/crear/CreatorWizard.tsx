'use client';

import { useReducer, useCallback, useRef, useEffect } from 'react';
import StepUpload from './steps/StepUpload';
import StepFrame from './steps/StepFrame';
import StepSize from './steps/StepSize';
import StepReview from './steps/StepReview';

/* ── Types ── */
export type FrameId = 'minimal' | 'dorado' | 'rustico' | 'flotante' | 'sin-marco';

export interface SizeOption {
  label: string;
  dims: string;
  cm: number; // for room mockup scaling
  w: number;
  h: number;
  price: number;
  key: string; // API key e.g. '30x30'
}

export const SIZES: SizeOption[] = [
  { label: 'Pequeño', dims: '30 × 30 cm', cm: 30, w: 400, h: 400, price: 15000, key: '30x30' },
  { label: 'Mediano', dims: '50 × 50 cm', cm: 50, w: 600, h: 600, price: 25000, key: '50x50' },
  { label: 'Grande', dims: '80 × 80 cm', cm: 80, w: 800, h: 800, price: 45000, key: '80x80' },
  { label: 'XL Paisaje', dims: '100 × 70 cm', cm: 100, w: 1000, h: 700, price: 55000, key: '100x70' },
];

export const FRAMES: { id: FrameId; label: string; desc: string }[] = [
  { id: 'minimal', label: 'Moderno Minimal', desc: 'Línea negra fina + mat blanco' },
  { id: 'dorado', label: 'Clásico Dorado', desc: 'Marco dorado con ornamentos' },
  { id: 'rustico', label: 'Rústico Natural', desc: 'Madera natural con textura' },
  { id: 'flotante', label: 'Flotante', desc: 'Efecto suspendido con sombra' },
  { id: 'sin-marco', label: 'Sin Marco', desc: 'Borde a borde, puro' },
];

/* ── State ── */
export type WizardState = {
  step: 1 | 2 | 3 | 4;
  direction: 'forward' | 'back';
  image: HTMLImageElement | null;
  imageDataUrl: string;
  frame: FrameId;
  sizeIndex: number;
  completedSteps: Set<number>;
  orderLoading: boolean;
  orderSuccess: boolean;
  // Order form fields
  orderName: string;
  orderEmail: string;
  orderMessage: string;
};

type Action =
  | { type: 'SET_IMAGE'; image: HTMLImageElement; dataUrl: string }
  | { type: 'REMOVE_IMAGE' }
  | { type: 'SET_FRAME'; frame: FrameId }
  | { type: 'SET_SIZE'; index: number }
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'GO_TO_STEP'; step: 1 | 2 | 3 | 4 }
  | { type: 'SET_ORDER_FIELD'; field: 'orderName' | 'orderEmail' | 'orderMessage'; value: string }
  | { type: 'SET_ORDER_LOADING'; loading: boolean }
  | { type: 'SET_ORDER_SUCCESS'; success: boolean };

const initialState: WizardState = {
  step: 1,
  direction: 'forward',
  image: null,
  imageDataUrl: '',
  frame: 'sin-marco',
  sizeIndex: 1,
  completedSteps: new Set(),
  orderLoading: false,
  orderSuccess: false,
  orderName: '',
  orderEmail: '',
  orderMessage: '',
};

function reducer(state: WizardState, action: Action): WizardState {
  switch (action.type) {
    case 'SET_IMAGE': {
      const completed = new Set(state.completedSteps);
      completed.add(1);
      return { ...state, image: action.image, imageDataUrl: action.dataUrl, completedSteps: completed };
    }
    case 'REMOVE_IMAGE':
      return { ...state, image: null, imageDataUrl: '' };
    case 'SET_FRAME': {
      const completed = new Set(state.completedSteps);
      completed.add(2);
      return { ...state, frame: action.frame, completedSteps: completed };
    }
    case 'SET_SIZE': {
      const completed = new Set(state.completedSteps);
      completed.add(3);
      return { ...state, sizeIndex: action.index, completedSteps: completed };
    }
    case 'NEXT_STEP': {
      const next = Math.min(state.step + 1, 4) as 1 | 2 | 3 | 4;
      return { ...state, step: next, direction: 'forward' };
    }
    case 'PREV_STEP': {
      const prev = Math.max(state.step - 1, 1) as 1 | 2 | 3 | 4;
      return { ...state, step: prev, direction: 'back' };
    }
    case 'GO_TO_STEP':
      return { ...state, step: action.step, direction: action.step > state.step ? 'forward' : 'back' };
    case 'SET_ORDER_FIELD':
      return { ...state, [action.field]: action.value };
    case 'SET_ORDER_LOADING':
      return { ...state, orderLoading: action.loading };
    case 'SET_ORDER_SUCCESS':
      return { ...state, orderSuccess: action.success };
    default:
      return state;
  }
}

/* ── Canvas rendering ── */
/**
 * Calculates canvas dimensions that preserve the image's aspect ratio.
 * The longest side uses size.w, the other scales proportionally.
 */
function calcCanvasSize(image: HTMLImageElement, size: SizeOption): { w: number; h: number } {
  const imgRatio = image.width / image.height;
  if (imgRatio >= 1) {
    // Landscape or square
    return { w: size.w, h: Math.round(size.w / imgRatio) };
  }
  // Portrait
  return { w: Math.round(size.h * imgRatio), h: size.h };
}

export function renderFrameToCanvas(
  canvas: HTMLCanvasElement,
  image: HTMLImageElement,
  frame: FrameId,
  size: SizeOption,
) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const { w, h } = calcCanvasSize(image, size);
  canvas.width = w;
  canvas.height = h;

  // Scale factor: all margins/borders are relative to the short side
  const base = Math.min(w, h);
  const s = (px: number) => Math.round((base / 600) * px);

  // Clear
  ctx.clearRect(0, 0, w, h);

  // Draw image to fill area (no crop since aspect matches)
  const drawImage = (x: number, y: number, iw: number, ih: number) => {
    const scale = Math.min(iw / image.width, ih / image.height);
    const sw = image.width * scale;
    const sh = image.height * scale;
    ctx.drawImage(image, x + (iw - sw) / 2, y + (ih - sh) / 2, sw, sh);
  };

  switch (frame) {
    case 'sin-marco': {
      drawImage(0, 0, w, h);
      break;
    }
    case 'minimal': {
      const mat = s(24);
      const border = s(3) || 1;
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, w, h);
      const iw = w - mat * 2;
      const ih = h - mat * 2;
      ctx.save();
      ctx.beginPath();
      ctx.rect(mat, mat, iw, ih);
      ctx.clip();
      drawImage(mat, mat, iw, ih);
      ctx.restore();
      ctx.strokeStyle = '#1A1A2E';
      ctx.lineWidth = border;
      ctx.strokeRect(mat - border / 2, mat - border / 2, iw + border, ih + border);
      break;
    }
    case 'dorado': {
      const margin = s(18);
      const margin2 = s(28);
      drawImage(0, 0, w, h);
      ctx.strokeStyle = 'rgba(255,255,255,0.18)';
      ctx.lineWidth = s(1.5) || 1;
      ctx.strokeRect(margin, margin, w - margin * 2, h - margin * 2);
      ctx.strokeStyle = '#C9A96E';
      ctx.lineWidth = s(1) || 1;
      ctx.strokeRect(margin2, margin2, w - margin2 * 2, h - margin2 * 2);
      ctx.strokeStyle = '#C9A96E';
      ctx.lineWidth = s(2) || 1;
      const cLen = s(18);
      const cm = margin2;
      ctx.beginPath(); ctx.moveTo(cm, cm + cLen); ctx.lineTo(cm, cm); ctx.lineTo(cm + cLen, cm); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(w - cm - cLen, cm); ctx.lineTo(w - cm, cm); ctx.lineTo(w - cm, cm + cLen); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cm, h - cm - cLen); ctx.lineTo(cm, h - cm); ctx.lineTo(cm + cLen, h - cm); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(w - cm - cLen, h - cm); ctx.lineTo(w - cm, h - cm); ctx.lineTo(w - cm, h - cm - cLen); ctx.stroke();
      break;
    }
    case 'rustico': {
      const browns = ['#8B7355', '#A0845C', '#6B5B3E', '#8B7355', '#A0845C', '#6B5B3E', '#8B7355', '#A0845C', '#6B5B3E', '#8B7355'];
      const frameW = s(20);
      ctx.fillStyle = browns[0];
      ctx.fillRect(0, 0, w, h);
      for (let i = 0; i < 10; i++) {
        ctx.strokeStyle = browns[i];
        ctx.lineWidth = s(2) || 1;
        const off = s(2) + i * (s(2) || 1);
        ctx.strokeRect(off, off, w - off * 2, h - off * 2);
      }
      const iw = w - frameW * 2;
      const ih = h - frameW * 2;
      ctx.save();
      ctx.beginPath();
      ctx.rect(frameW, frameW, iw, ih);
      ctx.clip();
      drawImage(frameW, frameW, iw, ih);
      ctx.restore();
      break;
    }
    case 'flotante': {
      const margin = s(30);
      const blur = s(30);
      ctx.fillStyle = '#F5F1EB';
      ctx.fillRect(0, 0, w, h);
      ctx.shadowColor = 'rgba(26,26,46,0.25)';
      ctx.shadowBlur = blur;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = s(8);
      ctx.fillStyle = '#FFF';
      ctx.fillRect(margin, margin, w - margin * 2, h - margin * 2);
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
      ctx.shadowOffsetY = 0;
      const iw = w - margin * 2;
      const ih = h - margin * 2;
      ctx.save();
      ctx.beginPath();
      ctx.rect(margin, margin, iw, ih);
      ctx.clip();
      drawImage(margin, margin, iw, ih);
      ctx.restore();
      break;
    }
  }
}

const STEP_LABELS = ['Imagen', 'Marco', 'Tamaño', 'Pedido'];

export default function CreatorWizard() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  // Update canvas whenever image/frame/size changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !state.image) return;
    const size = SIZES[state.sizeIndex];
    renderFrameToCanvas(canvas, state.image, state.frame, size);
  }, [state.image, state.frame, state.sizeIndex]);

  // Get canvas data URL for previews
  const getCanvasDataUrl = useCallback((): string => {
    const canvas = canvasRef.current;
    if (!canvas || !state.image) return state.imageDataUrl;
    return canvas.toDataURL('image/png');
  }, [state.image, state.imageDataUrl]);

  const canGoNext = (): boolean => {
    switch (state.step) {
      case 1: return state.image !== null;
      case 2: return true; // frame always has default
      case 3: return true; // size always has default
      case 4: return false; // last step
      default: return false;
    }
  };

  return (
    <div className="wizard">
      {/* Hidden canvas for rendering */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />

      {/* ── Progress Bar ── */}
      <div className="wizard-progress" role="navigation" aria-label="Progreso del creador">
        {STEP_LABELS.map((label, i) => {
          const stepNum = (i + 1) as 1 | 2 | 3 | 4;
          const isCompleted = state.completedSteps.has(stepNum);
          const isCurrent = state.step === stepNum;
          const isClickable = isCompleted || stepNum <= state.step;
          return (
            <button
              key={stepNum}
              type="button"
              className={`wizard-progress__node${isCurrent ? ' wizard-progress__node--active' : ''}${isCompleted && !isCurrent ? ' wizard-progress__node--completed' : ''}`}
              onClick={() => isClickable && dispatch({ type: 'GO_TO_STEP', step: stepNum })}
              disabled={!isClickable}
              aria-current={isCurrent ? 'step' : undefined}
            >
              <span className="wizard-progress__circle">
                {isCompleted && !isCurrent ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                ) : (
                  stepNum
                )}
              </span>
              <span className="wizard-progress__label">{label}</span>
            </button>
          );
        })}
        {/* Connecting line */}
        <div className="wizard-progress__line">
          <div
            className="wizard-progress__line-fill"
            style={{ width: `${((state.step - 1) / 3) * 100}%` }}
          />
        </div>
      </div>

      {/* ── Step Content ── */}
      <div className="wizard-steps" ref={stepsRef}>
        <div
          className={`wizard-step${state.step === 1 ? ' wizard-step--active' : ''} wizard-step--${state.direction}`}
        >
          {state.step === 1 && (
            <StepUpload
              imageDataUrl={state.imageDataUrl}
              onUpload={(img, dataUrl) => {
                dispatch({ type: 'SET_IMAGE', image: img, dataUrl });
                // Auto-advance after reveal
                setTimeout(() => dispatch({ type: 'NEXT_STEP' }), 1400);
              }}
              onRemove={() => dispatch({ type: 'REMOVE_IMAGE' })}
            />
          )}
        </div>

        <div
          className={`wizard-step${state.step === 2 ? ' wizard-step--active' : ''} wizard-step--${state.direction}`}
        >
          {state.step === 2 && (
            <StepFrame
              frame={state.frame}
              image={state.image}
              sizeIndex={state.sizeIndex}
              onSelect={(frame) => dispatch({ type: 'SET_FRAME', frame })}
            />
          )}
        </div>

        <div
          className={`wizard-step${state.step === 3 ? ' wizard-step--active' : ''} wizard-step--${state.direction}`}
        >
          {state.step === 3 && (
            <StepSize
              sizeIndex={state.sizeIndex}
              image={state.image}
              frame={state.frame}
              onSelect={(index) => dispatch({ type: 'SET_SIZE', index })}
              getCanvasDataUrl={getCanvasDataUrl}
            />
          )}
        </div>

        <div
          className={`wizard-step${state.step === 4 ? ' wizard-step--active' : ''} wizard-step--${state.direction}`}
        >
          {state.step === 4 && (
            <StepReview
              state={state}
              dispatch={dispatch}
              getCanvasDataUrl={getCanvasDataUrl}
            />
          )}
        </div>
      </div>

      {/* ── Navigation Buttons ── */}
      {state.step > 1 && (
        <div className="wizard-nav">
          <button
            type="button"
            className="wizard-nav__btn wizard-nav__btn--prev"
            onClick={() => dispatch({ type: 'PREV_STEP' })}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            Anterior
          </button>

          {state.step < 4 && (
            <button
              type="button"
              className="wizard-nav__btn wizard-nav__btn--next"
              onClick={() => dispatch({ type: 'NEXT_STEP' })}
              disabled={!canGoNext()}
            >
              Siguiente
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
