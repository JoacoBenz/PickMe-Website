'use client';

import { useRef, useEffect, useCallback } from 'react';
import { FRAMES, SIZES, renderFrameToCanvas, type FrameId } from '../CreatorWizard';

interface StepFrameProps {
  frame: FrameId;
  image: HTMLImageElement | null;
  sizeIndex: number;
  onSelect: (frame: FrameId) => void;
}

function FramePreview({ frameId, image, sizeIndex, isSelected }: { frameId: FrameId; image: HTMLImageElement | null; sizeIndex: number; isSelected: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !image) return;
    // Render at a small thumbnail size
    const thumbSize = { ...SIZES[sizeIndex], w: 200, h: 200 };
    renderFrameToCanvas(canvas, image, frameId, thumbSize);
  }, [frameId, image, sizeIndex]);

  return (
    <canvas
      ref={canvasRef}
      className={`frame-card__canvas${isSelected ? ' frame-card__canvas--selected' : ''}`}
      width={200}
      height={200}
    />
  );
}

export default function StepFrame({ frame, image, sizeIndex, onSelect }: StepFrameProps) {
  return (
    <div className="step-frame">
      <div className="step-frame__header">
        <h2 className="step-frame__title">Elegi tu marco</h2>
        <p className="step-frame__desc">
          Selecciona el estilo de marco que mejor se ajuste a tu imagen. Cada uno transforma la presentacion de tu obra.
        </p>
      </div>

      <div className="frame-cards">
        {FRAMES.map((f) => (
          <button
            key={f.id}
            type="button"
            className={`frame-card${frame === f.id ? ' frame-card--selected' : ''}`}
            onClick={() => onSelect(f.id)}
            aria-pressed={frame === f.id}
          >
            <div className="frame-card__preview">
              <FramePreview
                frameId={f.id}
                image={image}
                sizeIndex={sizeIndex}
                isSelected={frame === f.id}
              />
            </div>
            <div className="frame-card__info">
              <span className="frame-card__name">{f.label}</span>
              <span className="frame-card__desc">{f.desc}</span>
            </div>
            {frame === f.id && (
              <div className="frame-card__check">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
