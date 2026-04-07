'use client';

import { useState, useEffect, useCallback, FormEvent } from 'react';
import Image from 'next/image';
import { signos, getRecommendation, type ZodiacResult, type Signo } from '@/lib/zodiaco';

const elementEmojis: Record<string, string> = {
  Fuego: '\uD83D\uDD25',
  Tierra: '\uD83C\uDF3F',
  Aire: '\uD83D\uDCA8',
  Agua: '\uD83C\uDF0A',
};

const ZODIAC_SYMBOLS = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'];
const STAR_CHARS = ['✦', '✧', '⋆', '✶', '✹', '✵', '★', '☆', '✴'];
const MYSTICAL_MESSAGES = [
  'Alineando los astros...',
  'Consultando las estrellas...',
  'Leyendo tu carta astral...',
  'Canalizando energía cósmica...',
  'Revelando tu destino...',
];

function MagicOverlay({ onComplete, luna, ascendente }: { onComplete: () => void; luna: string; ascendente: string }) {
  const [phase, setPhase] = useState(0); // 0: stars gathering, 1: symbols spinning, 2: message, 3: reveal
  const [messageIdx, setMessageIdx] = useState(0);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; symbol: string; delay: number; size: number; duration: number }>>([]);

  const lunaSigno = signos.find(s => s.name === luna);
  const ascSigno = signos.find(s => s.name === ascendente);

  const generateParticles = useCallback(() => {
    const p = [];
    for (let i = 0; i < 40; i++) {
      p.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        symbol: i < 12 ? ZODIAC_SYMBOLS[i] : STAR_CHARS[Math.floor(Math.random() * STAR_CHARS.length)],
        delay: Math.random() * 2,
        size: 0.6 + Math.random() * 1.8,
        duration: 2 + Math.random() * 3,
      });
    }
    return p;
  }, []);

  useEffect(() => {
    setParticles(generateParticles());

    const t1 = setTimeout(() => setPhase(1), 800);
    const t2 = setTimeout(() => setPhase(2), 2200);
    const t3 = setTimeout(() => setMessageIdx(1), 2800);
    const t4 = setTimeout(() => setMessageIdx(2), 3400);
    const t5 = setTimeout(() => setPhase(3), 4200);
    const t6 = setTimeout(() => onComplete(), 5000);

    return () => { [t1, t2, t3, t4, t5, t6].forEach(clearTimeout); };
  }, [onComplete, generateParticles]);

  return (
    <div className={`magic-overlay${phase >= 3 ? ' magic-overlay--fade-out' : ''}`}>
      {/* Background particles */}
      <div className="magic-particles">
        {particles.map((p) => (
          <span
            key={p.id}
            className="magic-particle"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              animationDelay: `${p.delay}s`,
              fontSize: `${p.size}rem`,
              animationDuration: `${p.duration}s`,
            }}
          >
            {p.symbol}
          </span>
        ))}
      </div>

      {/* Central orb */}
      <div className={`magic-center${phase >= 1 ? ' magic-center--active' : ''}`}>
        {/* Spinning ring of zodiac symbols */}
        <div className={`magic-ring${phase >= 1 ? ' magic-ring--spin' : ''}`}>
          {ZODIAC_SYMBOLS.map((s, i) => (
            <span
              key={i}
              className="magic-ring__symbol"
              style={{ transform: `rotate(${i * 30}deg) translateY(-90px)` }}
            >
              {s}
            </span>
          ))}
        </div>

        {/* Center sign display */}
        <div className={`magic-signs${phase >= 1 ? ' magic-signs--visible' : ''}`}>
          <span className="magic-signs__luna">{lunaSigno?.emoji}</span>
          <span className="magic-signs__x">✦</span>
          <span className="magic-signs__asc">{ascSigno?.emoji}</span>
        </div>
      </div>

      {/* Mystical message */}
      <p className={`magic-message${phase >= 2 ? ' magic-message--visible' : ''}`}>
        {MYSTICAL_MESSAGES[messageIdx]}
      </p>
    </div>
  );
}

export default function ZodiacoPage() {
  const [nombre, setNombre] = useState('');
  const [luna, setLuna] = useState('');
  const [ascendente, setAscendente] = useState('');
  const [result, setResult] = useState<ZodiacResult | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pendingResult, setPendingResult] = useState<ZodiacResult | null>(null);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!luna || !ascendente || !nombre.trim()) return;

    const rec = getRecommendation(luna, ascendente);
    setPendingResult(rec);
    setLoading(true);
    setResult(null);
    setShowResult(false);
  }

  const handleMagicComplete = useCallback(() => {
    setLoading(false);
    setResult(pendingResult);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setShowResult(true);
      });
    });
  }, [pendingResult]);

  function handleReset() {
    setResult(null);
    setShowResult(false);
    setPendingResult(null);
  }

  return (
    <>
      {/* ── Hero ── */}
      <section className="zodiaco-hero" aria-label="Encabezado zodiaco">
        <span className="zodiaco-hero__tag">Tu cuadro astral</span>
        <h1 className="zodiaco-hero__title">Queremos conocerte m&aacute;s&hellip;</h1>
        <p className="zodiaco-hero__subtitle">
          Descubr&iacute; qu&eacute; obra de arte resuena con tu energ&iacute;a astral.
          Contanos tu Luna y Ascendente y te recomendamos el cuadro perfecto para vos.
        </p>
      </section>

      {/* ── Magic Loading Overlay ── */}
      {loading && (
        <MagicOverlay onComplete={handleMagicComplete} luna={luna} ascendente={ascendente} />
      )}

      {/* ── Form Section ── */}
      <section className="zodiaco-section">
        {!result && !loading ? (
          <form className="zodiaco-form" onSubmit={handleSubmit}>
            {/* Nombre */}
            <div className="zodiaco-form__field">
              <label className="zodiaco-form__label" htmlFor="zod-nombre">
                Tu nombre
              </label>
              <input
                id="zod-nombre"
                className="zodiaco-form__input"
                type="text"
                placeholder="Ingres&aacute; tu nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>

            {/* Luna */}
            <div className="zodiaco-form__field">
              <label className="zodiaco-form__label" htmlFor="zod-luna">
                Tu Luna
              </label>
              <select
                id="zod-luna"
                className="zodiaco-form__select"
                value={luna}
                onChange={(e) => setLuna(e.target.value)}
                required
              >
                <option value="" disabled>
                  Eleg&iacute; tu signo lunar
                </option>
                {signos.map((s: Signo) => (
                  <option key={s.name} value={s.name}>
                    {s.emoji} {s.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Ascendente */}
            <div className="zodiaco-form__field">
              <label className="zodiaco-form__label" htmlFor="zod-asc">
                Tu Ascendente
              </label>
              <select
                id="zod-asc"
                className="zodiaco-form__select"
                value={ascendente}
                onChange={(e) => setAscendente(e.target.value)}
                required
              >
                <option value="" disabled>
                  Eleg&iacute; tu ascendente
                </option>
                {signos.map((s: Signo) => (
                  <option key={s.name} value={s.name}>
                    {s.emoji} {s.name}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" className="zodiaco-form__submit">
              Descubrir mi cuadro
            </button>
          </form>
        ) : result ? (
          <div className={`zodiaco-result ${showResult ? 'zodiaco-result--visible' : ''}`}>
            <p className="zodiaco-result__greeting">
              Tu cuadro ideal, <strong>{nombre}</strong>
            </p>

            <div className="zodiaco-result__card">
              <div className="zodiaco-result__art-wrapper">
                <Image
                  className="zodiaco-result__art"
                  src={result.imagen}
                  alt={result.nombre}
                  width={600}
                  height={600}
                  priority
                />
              </div>

              <div className="zodiaco-result__info">
                <span className="zodiaco-result__badge">
                  {elementEmojis[result.elementDominante]} {result.elementDominante}
                </span>

                <h2 className="zodiaco-result__name">{result.nombre}</h2>

                <p className="zodiaco-result__signs">
                  Luna en {result.luna} &bull; Ascendente en {result.ascendente}
                </p>

                <p className="zodiaco-result__desc">{result.descripcion}</p>

                <div className="zodiaco-result__actions">
                  <a
                    className="zodiaco-result__cta"
                    href={`https://wa.me/5491100000000?text=${encodeURIComponent(
                      `Hola! Vi el cuadro "${result.nombre}" en la secci\u00f3n zodiacal y me interesa. Mi luna es ${result.luna} y mi ascendente ${result.ascendente}.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Consultar por WhatsApp
                  </a>
                  <button
                    type="button"
                    className="zodiaco-result__retry"
                    onClick={handleReset}
                  >
                    Volver a intentar
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </section>
    </>
  );
}
