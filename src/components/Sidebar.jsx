/**
 * Sidebar.jsx
 * Mountain detail panel.
 *
 * Desktop : slides in from the right (fixed-width column).
 * Mobile  : full-width bottom sheet with drag-to-dismiss handle.
 *           Swipe/drag the handle downward ≥80 px to close.
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { useIsMobile } from '../hooks/useIsMobile';
import {
  getCategoryColor,
  getCategoryLabel,
  getCategoryTags,
  formatCoords,
} from '../utils/mountainUtils';

// ── Icons ─────────────────────────────────────────────────────────────────
function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

function CoordIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  );
}

// ── Detail card ───────────────────────────────────────────────────────────
function DetailCard({ label, value }) {
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
function ElevationBar({ elevation, color }) {
  const pct = Math.round((elevation / 8849) * 100);
  return (
    <div className="mt-2">
      <div className="flex justify-between text-[10px] text-white/30 mb-1">
        <span>0 m</span><span>Everest 8,849 m</span>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${color}88, ${color})` }}
        />
      </div>
      <div className="text-[10px] text-white/25 mt-1">{pct}% of Everest height</div>
    </div>
  );
}

// ── Scrollable content (shared between both layouts) ──────────────────────
function SidebarContent({ mountain, onClose, isMobile }) {
  const [imgError, setImgError] = useState(false);
  const color = getCategoryColor(mountain.categories);
  const tags  = getCategoryTags(mountain.categories);

  return (
    <>
      {/* ── Hero image ──────────────────────────────────────────── */}
      <div
        className="relative flex-shrink-0 overflow-hidden"
        style={{ height: isMobile ? '11rem' : '13rem' }}
      >
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
            style={{ background: `linear-gradient(135deg, #0d0d1a 0%, ${color}28 100%)` }}
          >
            <span style={{ fontSize: '4rem', opacity: 0.2 }}>⛰</span>
          </div>
        )}
        {/* Gradient scrim */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(6,6,10,0.95) 0%, rgba(6,6,10,0.1) 60%, transparent 100%)' }}
        />
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 flex items-center justify-center"
          style={{
            width: isMobile ? '2.5rem' : '2rem',
            height: isMobile ? '2.5rem' : '2rem',
            background: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(8px)',
            borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.12)',
            color: 'rgba(255,255,255,0.6)',
            touchAction: 'manipulation',
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

      {/* ── Scrollable details ──────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto overscroll-contain">
        <div className="px-5 py-5 space-y-5">

          {/* Name + location */}
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight leading-tight" style={{ letterSpacing: '-0.4px' }}>
              {mountain.name}
            </h1>
            <p className="text-white/40 text-xs mt-1 flex items-center gap-1.5">
              <CoordIcon />
              {mountain.continent} · {mountain.country}
            </p>
          </div>

          {/* Primary elevation */}
          <div className="rounded-2xl p-4" style={{ background: `${color}0c`, border: `1px solid ${color}22` }}>
            <div className="text-[10px] font-semibold uppercase tracking-widest mb-1" style={{ color: `${color}80` }}>
              Elevation above sea level
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black tracking-tight" style={{ color, lineHeight: 1 }}>
                {mountain.elevation.toLocaleString()}
              </span>
              <span className="text-white/35 text-sm font-medium">metres</span>
            </div>
            <ElevationBar elevation={mountain.elevation} color={color} />
          </div>

          {/* Mauna Kea total height */}
          {mountain.totalHeight && (
            <div className="rounded-2xl p-4" style={{ background: 'rgba(96,165,250,0.08)', border: '1px solid rgba(96,165,250,0.2)' }}>
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
                Tallest mountain on Earth from its submarine base — surpassing Everest by 1,361 m.
              </p>
            </div>
          )}

          {/* Description */}
          <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.58)' }}>
            {mountain.description}
          </p>

          {/* Detail grid */}
          <div className="grid grid-cols-2 gap-2.5">
            <DetailCard label="First Ascent" value={mountain.firstAscent} />
            <DetailCard label="Coordinates" value={formatCoords(mountain.lat, mountain.lng)} />
          </div>

          {/* Climbers */}
          <div className="rounded-2xl p-3.5" style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.055)' }}>
            <div className="text-[10px] font-semibold uppercase tracking-widest text-white/25 mb-1.5">
              First ascent team
            </div>
            <p className="text-white/65 text-sm leading-relaxed">{mountain.climbers}</p>
          </div>

          {/* Fun fact */}
          {mountain.funFact && (
            <div className="rounded-2xl p-4" style={{ background: `${color}08`, border: `1px solid ${color}18` }}>
              <div className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: `${color}70` }}>
                ✦ Did You Know
              </div>
              <p className="text-white/55 text-sm leading-relaxed">{mountain.funFact}</p>
            </div>
          )}

          {/* Safe-area bottom padding */}
          <div style={{ height: 'env(safe-area-inset-bottom, 8px)' }} />
        </div>
      </div>
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// Main Sidebar — picks Desktop or Mobile layout
// ═══════════════════════════════════════════════════════════════════════════
export default function Sidebar({ mountain, onClose }) {
  const isMobile = useIsMobile();
  const [visible, setVisible]   = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const touchStartY = useRef(0);
  const isDragging  = useRef(false);

  // Animate in when mountain changes
  useEffect(() => {
    setDragOffset(0);
    setVisible(false);
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
    return () => cancelAnimationFrame(id);
  }, [mountain?.id]);

  const handleClose = useCallback(() => {
    setVisible(false);
    setTimeout(onClose, 340);
  }, [onClose]);

  // ── Touch drag-to-dismiss (mobile only) ───────────────────────────────
  const handleTouchStart = useCallback((e) => {
    touchStartY.current = e.touches[0].clientY;
    isDragging.current  = true;
  }, []);

  const handleTouchMove = useCallback((e) => {
    if (!isDragging.current) return;
    const delta = e.touches[0].clientY - touchStartY.current;
    if (delta > 0) setDragOffset(delta); // drag downward only
  }, []);

  const handleTouchEnd = useCallback(() => {
    isDragging.current = false;
    if (dragOffset > 80) {
      handleClose();
    } else {
      setDragOffset(0); // snap back
    }
  }, [dragOffset, handleClose]);

  // ── Desktop layout ────────────────────────────────────────────────────
  if (!isMobile) {
    return (
      <div
        className="absolute right-0 top-0 bottom-0 z-20 flex flex-col"
        style={{
          width: '22rem',
          background: 'rgba(6,6,10,0.92)',
          backdropFilter: 'blur(32px)',
          WebkitBackdropFilter: 'blur(32px)',
          borderLeft: '1px solid rgba(255,255,255,0.07)',
          transform: visible ? 'translateX(0)' : 'translateX(28px)',
          opacity: visible ? 1 : 0,
          transition: 'transform 0.35s cubic-bezier(0.16,1,0.3,1), opacity 0.3s ease',
        }}
      >
        <SidebarContent mountain={mountain} onClose={handleClose} isMobile={false} />
      </div>
    );
  }

  // ── Mobile bottom-sheet layout ────────────────────────────────────────
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 flex flex-col"
      style={{
        height: '88vh',
        maxHeight: 'calc(100dvh - 52px)',
        background: 'rgba(6,6,10,0.97)',
        backdropFilter: 'blur(32px)',
        WebkitBackdropFilter: 'blur(32px)',
        borderRadius: '24px 24px 0 0',
        border: '1px solid rgba(255,255,255,0.09)',
        borderBottom: 'none',
        // Merge animation + drag offset
        transform: visible
          ? `translateY(${dragOffset}px)`
          : 'translateY(100%)',
        transition: isDragging.current
          ? 'none'                                           // instant while dragging
          : 'transform 0.38s cubic-bezier(0.16,1,0.3,1)',  // spring on settle/open
        willChange: 'transform',
        boxShadow: '0 -12px 60px rgba(0,0,0,0.6)',
      }}
    >
      {/* Drag handle strip */}
      <div
        className="flex-shrink-0 flex items-center justify-center pt-3 pb-1 cursor-grab active:cursor-grabbing"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ touchAction: 'none' }}
        aria-label="Drag to close"
      >
        <div
          className="rounded-full"
          style={{ width: 40, height: 4, background: 'rgba(255,255,255,0.22)' }}
        />
      </div>

      {/* Content (hero image + details) */}
      <div className="flex-1 flex flex-col min-h-0">
        <SidebarContent mountain={mountain} onClose={handleClose} isMobile={true} />
      </div>
    </div>
  );
}
