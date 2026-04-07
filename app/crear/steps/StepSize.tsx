'use client';

import { useRef, useEffect, useState } from 'react';
import { SIZES, renderFrameToCanvas, type FrameId } from '../CreatorWizard';
import { formatARS } from '@/lib/utils';

interface StepSizeProps {
  sizeIndex: number;
  image: HTMLImageElement | null;
  frame: FrameId;
  onSelect: (index: number) => void;
  getCanvasDataUrl: () => string;
}

export default function StepSize({ sizeIndex, image, frame, onSelect, getCanvasDataUrl }: StepSizeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');

  // Generate preview when frame/image/size changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !image) return;
    const size = SIZES[sizeIndex];
    renderFrameToCanvas(canvas, image, frame, size);
    setPreviewUrl(canvas.toDataURL('image/png'));
  }, [image, frame, sizeIndex]);

  const currentSize = SIZES[sizeIndex];
  // Scale: wall is ~250cm wide, painting cm maps proportionally
  const wallPx = 600;
  const paintingW = (wallPx / 250) * currentSize.cm;
  // Calculate height based on image aspect ratio
  const imgRatio = image ? image.width / image.height : 1;
  const paintingH = imgRatio >= 1 ? paintingW / imgRatio : paintingW * (1 / imgRatio);

  return (
    <div className="step-size">
      <canvas ref={canvasRef} style={{ display: 'none' }} />

      <div className="step-size__header">
        <h2 className="step-size__title">Elegí el tamaño</h2>
        <p className="step-size__desc">
          Visualiza como queda tu cuadro en una habitacion real. Elegí el tamaño ideal.
        </p>
      </div>

      <div className="step-size__layout">
        {/* Room Mockup */}
        <div className="room-mockup">
          <div className="room-mockup__wall">
            {/* Hanging wire */}
            <div className="room-mockup__wire" style={{ width: Math.min(paintingW * 0.4, 80) }} />

            {/* The painting on the wall */}
            <div
              className="room-mockup__painting"
              style={{
                width: paintingW,
                height: paintingH,
                transition: 'width 0.5s ease, height 0.5s ease',
              }}
            >
              {previewUrl ? (
                <img src={previewUrl} alt="Preview" className="room-mockup__img" />
              ) : (
                <div className="room-mockup__placeholder" />
              )}
            </div>

            {/* Furniture silhouette (couch) */}
            <div className="room-mockup__furniture">
              <svg viewBox="0 0 300 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="room-mockup__couch">
                <rect x="20" y="30" width="260" height="50" rx="8" fill="#D4C9B8" opacity="0.5" />
                <rect x="10" y="20" width="40" height="60" rx="6" fill="#D4C9B8" opacity="0.5" />
                <rect x="250" y="20" width="40" height="60" rx="6" fill="#D4C9B8" opacity="0.5" />
                <rect x="40" y="10" width="60" height="30" rx="5" fill="#D4C9B8" opacity="0.35" />
                <rect x="200" y="10" width="60" height="30" rx="5" fill="#D4C9B8" opacity="0.35" />
                <rect x="25" y="80" width="10" height="12" rx="2" fill="#C4B9A8" opacity="0.5" />
                <rect x="265" y="80" width="10" height="12" rx="2" fill="#C4B9A8" opacity="0.5" />
              </svg>
            </div>
          </div>
          <div className="room-mockup__floor" />
        </div>

        {/* Size Cards */}
        <div className="size-cards">
          {SIZES.map((s, i) => (
            <button
              key={i}
              type="button"
              className={`size-card${sizeIndex === i ? ' size-card--selected' : ''}`}
              onClick={() => onSelect(i)}
              aria-pressed={sizeIndex === i}
            >
              <div className="size-card__top">
                <span className="size-card__name">{s.label}</span>
                <span className="size-card__dims">{s.dims}</span>
              </div>
              <span className="size-card__price">{formatARS(s.price)}</span>
              {sizeIndex === i && (
                <div className="size-card__check">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
