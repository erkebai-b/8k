/**
 * Sidebar.jsx
 * Mountain detail panel — slides in from the right when a mountain is clicked.
 * Shows hero image, elevation data, description, first ascent, and fun facts.
 */

import { useState, useEffect } from 'react';
import {
  getCategoryColor,
  getCategoryLabel,
  getCategoryTags,
  formatElevation,
  formatCoords,
} from '../utils/mountainUtils';

// ── Icon components (inline SVG, no dependency) ───────────────────────────
function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  );
}

function CoordIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  );
}

// ── Small detail card ─────────────────────────────────────────────────────
function DetailCard({ label, value, icon }) {
  return (
    <div
      className="rounded-2xl p-3.5"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div className="text-[10px] font-semibold uppercase tracking-widest text-white/30 mb-1.5">
        {label}
      </div>
      <div className="text-sm font-semibold text-white/80 leading-snug">{value}</div>
    </div>
  );
}

// ── Elevation bar ─────────────────────────────────────────────────────────
function ElevationBar({ elevation, maxElevation = 8849, color }) {
  const pct = Math.round((elevation / maxElevation) * 100);
  return (
    <div className="mt-2">
      <div className="flex justify-between text-[10px] text-white/30 mb-1">
        <span>0 m</span>
        <span>Everest 8,849 m</span>
      </div>
      <div className="h-1.5 rounded-full bg-white/06 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: `${pct}%`,
            background: `linear-gradient(90deg, ${color}88, ${color})`,
          }}
        />
      </div>
      <div className="text-[10px] text-white/25 mt-1">{pct}% of Everest</div>
    </div>
  );
}

// ── Main Sidebar component ────────────────────────────────────────────────
export default function Sidebar({ mountain, onClose }) {
  const [imgError,  setImgError]  = useState(false);
  const [visible,   setVisible]   = useState(false);

  // Animate in whenever mountain changes
  useEffect(() => {
    setImgError(false);
    setVisible(false);
    const t = requestAnimationFrame(() => {
      requestAnimationFrame(() => setVisible(true));
    });
    return () => cancelAnimationFrame(t);
  }, [mountain?.id]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 320);
  };

  const color = getCategoryColor(mountain.categories);
  const tags  = getCategoryTags(mountain.categories);

  return (
    <div
      className="absolute right-0 top-0 bottom-0 z-20 flex flex-col"
      style={{
        width: '22rem', // 352 px
        background: 'rgba(6, 6, 10, 0.92)',
        backdropFilter: 'blur(32px)',
        WebkitBackdropFilter: 'blur(32px)',
        borderLeft: '1px solid rgba(255,255,255,0.07)',
        transform: visible ? 'translateX(0)' : 'translateX(28px)',
        opacity: visible ? 1 : 0,
        transition: 'transform 0.35s cubic-bezier(0.16,1,0.3,1), opacity 0.3s ease',
      }}
    >
      {/* ── Hero image ─────────────────────────────────────────────── */}
      <div className="relative flex-shrink-0 overflow-hidden" style={{ height: '13rem' }}>
        {!imgError ? (
          <img
            src={mountain.image}
            alt={mountain.name}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover"
            style={{ objectPosition: 'center 40%' }}
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, #0d0d1a 0%, ${color}28 100%)`,
            }}
          >
            <span style={{ fontSize: '5rem', opacity: 0.25 }}>⛰</span>
          </div>
        )}

        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(6,6,10,0.95) 0%, rgba(6,6,10,0.2) 55%, transparent 100%)' }}
        />

        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-3.5 right-3.5 flex items-center justify-center text-white/50 hover:text-white transition-colors"
          style={{
            width: '2rem',
            height: '2rem',
            background: 'rgba(0,0,0,0.55)',
            backdropFilter: 'blur(8px)',
            borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
          aria-label="Close"
        >
          <CloseIcon />
        </button>

        {/* Category tags */}
        <div className="absolute bottom-3 left-4 flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full"
              style={{
                background: `${color}18`,
                color,
                border: `1px solid ${color}35`,
                letterSpacing: '0.3px',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* ── Scrollable content ─────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto overscroll-contain">
        <div className="px-5 py-5 space-y-5">

          {/* Name + location */}
          <div>
            <h1
              className="text-xl font-bold text-white tracking-tight leading-tight"
              style={{ letterSpacing: '-0.4px' }}
            >
              {mountain.name}
            </h1>
            <p className="text-white/40 text-xs mt-1 flex items-center gap-1.5">
              <CoordIcon />
              {mountain.continent} · {mountain.country}
            </p>
          </div>

          {/* ── Primary elevation card ─────────────────────────────── */}
          <div
            className="rounded-2xl p-4"
            style={{
              background: `${color}0c`,
              border: `1px solid ${color}22`,
            }}
          >
            <div className="text-[10px] font-semibold uppercase tracking-widest mb-1" style={{ color: `${color}80` }}>
              Elevation above sea level
            </div>
            <div className="flex items-baseline gap-2">
              <span
                className="text-4xl font-black tracking-tight"
                style={{ color, lineHeight: 1 }}
              >
                {mountain.elevation.toLocaleString()}
              </span>
              <span className="text-white/35 text-sm font-medium">metres</span>
            </div>
            <ElevationBar elevation={mountain.elevation} color={color} />
          </div>

          {/* ── Mauna Kea total-height card ────────────────────────── */}
          {mountain.totalHeight && (
            <div
              className="rounded-2xl p-4"
              style={{
                background: 'rgba(96,165,250,0.08)',
                border: '1px solid rgba(96,165,250,0.2)',
              }}
            >
              <div className="text-[10px] font-semibold uppercase tracking-widest text-blue-400/60 mb-1">
                Total height · ocean floor to summit
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-blue-400 tracking-tight" style={{ lineHeight: 1 }}>
                  {mountain.totalHeight.toLocaleString()}
                </span>
                <span className="text-white/35 text-sm">metres</span>
              </div>
              <p className="text-blue-400/65 text-xs mt-2 leading-relaxed">
                Tallest mountain on Earth when measured from its submarine base — surpassing Everest by 1,361 m.
              </p>
            </div>
          )}

          {/* ── Description ───────────────────────────────────────── */}
          <p className="text-white/58 text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.58)' }}>
            {mountain.description}
          </p>

          {/* ── Detail grid ───────────────────────────────────────── */}
          <div className="grid grid-cols-2 gap-2.5">
            <DetailCard label="First Ascent" value={mountain.firstAscent} />
            <DetailCard
              label="Coordinates"
              value={formatCoords(mountain.lat, mountain.lng)}
            />
          </div>

          {/* ── First ascent team ─────────────────────────────────── */}
          <div
            className="rounded-2xl p-3.5"
            style={{
              background: 'rgba(255,255,255,0.025)',
              border: '1px solid rgba(255,255,255,0.055)',
            }}
          >
            <div className="text-[10px] font-semibold uppercase tracking-widest text-white/25 mb-1.5">
              First ascent team
            </div>
            <p className="text-white/65 text-sm leading-relaxed">{mountain.climbers}</p>
          </div>

          {/* ── Fun fact ──────────────────────────────────────────── */}
          {mountain.funFact && (
            <div
              className="rounded-2xl p-4"
              style={{
                background: `${color}08`,
                border: `1px solid ${color}18`,
              }}
            >
              <div
                className="text-[10px] font-bold uppercase tracking-widest mb-2"
                style={{ color: `${color}70` }}
              >
                ✦ Did You Know
              </div>
              <p className="text-white/55 text-sm leading-relaxed">{mountain.funFact}</p>
            </div>
          )}

          {/* Bottom padding */}
          <div className="h-2" />
        </div>
      </div>
    </div>
  );
}
