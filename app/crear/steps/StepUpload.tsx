'use client';

import { useState, useRef, useCallback } from 'react';

interface StepUploadProps {
  imageDataUrl: string;
  onUpload: (img: HTMLImageElement, dataUrl: string) => void;
  onRemove: () => void;
}

export default function StepUpload({ imageDataUrl, onUpload, onRemove }: StepUploadProps) {
  const [dragOver, setDragOver] = useState(false);
  const [revealing, setRevealing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    if (file.size > 10 * 1024 * 1024) {
      alert('La imagen no puede superar 10 MB');
      return;
    }
    if (!file.type.startsWith('image/')) {
      alert('Solo se permiten archivos de imagen');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      const img = new Image();
      img.onload = () => {
        setRevealing(true);
        // Wait for reveal animation, then notify parent
        setTimeout(() => {
          onUpload(img, dataUrl);
        }, 1200);
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  }, [onUpload]);

  const hasImage = imageDataUrl !== '';

  return (
    <div className="step-upload">
      <div className="step-upload__header">
        <h2 className="step-upload__title">Subi tu imagen</h2>
        <p className="step-upload__desc">
          Arrastra o hace clic para subir la foto que quieras convertir en cuadro.
          Aceptamos JPG, PNG y WEBP hasta 10 MB.
        </p>
      </div>

      {!hasImage ? (
        <div
          className={`upload-zone${dragOver ? ' upload-zone--drag' : ''}`}
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragOver(false);
            const file = e.dataTransfer.files[0];
            if (file) handleFile(file);
          }}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter') inputRef.current?.click(); }}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="upload-zone__input"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
            }}
          />
          <div className="upload-zone__frame">
            <div className="upload-zone__icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
            </div>
            <span className="upload-zone__text">Hace clic o arrastra tu imagen</span>
            <span className="upload-zone__hint">JPG, PNG, WEBP — max 10 MB</span>
          </div>
        </div>
      ) : (
        <div className="step-upload__preview-wrap">
          <div className={`step-upload__reveal${revealing ? ' step-upload__reveal--active' : ''}`}>
            <img
              src={imageDataUrl}
              alt="Tu imagen"
              className="step-upload__preview-img"
            />
          </div>
          <button
            type="button"
            className="step-upload__change"
            onClick={() => {
              setRevealing(false);
              onRemove();
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 1 0 .49-4.08" /></svg>
            Cambiar imagen
          </button>
        </div>
      )}
    </div>
  );
}
