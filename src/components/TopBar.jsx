/**
 * TopBar.jsx
 *
 * Desktop : logo · full search bar · rotate toggle (single row)
 * Mobile  : logo icon · search icon · rotate toggle (compact)
 *           — tapping the search icon expands a full-width search overlay
 */

import { useState, useMemo, useRef, useEffect } from 'react';
import { mountains as allMountains } from '../data/mountains';
import { getCategoryColor } from '../utils/mountainUtils';
import { useIsMobile } from '../hooks/useIsMobile';

// ── Icons ─────────────────────────────────────────────────────────────────
function SearchIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  );
}

function ClearIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  );
}

function BackIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6"/>
    </svg>
  );
}

function RotateIcon({ active }) {
  return (
    <svg
      width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      style={{ animation: active ? 'spin 3s linear infinite' : 'none', transformOrigin: 'center' }}
    >
      <polyline points="23 4 23 10 17 10"/>
      <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
    </svg>
  );
}

// ── Shared glass panel style ──────────────────────────────────────────────
const glass = {
  background: 'rgba(6,6,10,0.88)',
  backdropFilter: 'blur(28px)',
  WebkitBackdropFilter: 'blur(28px)',
  border: '1px solid rgba(255,255,255,0.08)',
};

// ── Search result row ─────────────────────────────────────────────────────
function SearchResult({ mountain, onSelect }) {
  const color = getCategoryColor(mountain.categories);
  return (
    <button
      onMouseDown={() => onSelect(mountain)}
      onTouchEnd={(e) => { e.preventDefault(); onSelect(mountain); }}
      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 active:bg-white/10 transition-colors text-left group"
      style={{ touchAction: 'manipulation', minHeight: 52 }}
    >
      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: color, boxShadow: `0 0 6px ${color}80` }} />
      <div className="flex-1 min-w-0">
        <div className="text-white text-sm font-medium truncate">{mountain.name}</div>
        <div className="text-white/35 text-xs">{mountain.continent} · {mountain.elevation.toLocaleString()} m</div>
      </div>
      <span className="text-white/25 text-xs flex-shrink-0">→</span>
    </button>
  );
}

// ── Shared search input + results logic ───────────────────────────────────
function SearchPanel({ query, onChange, onSelect, inputRef, onBlur, autoFocus }) {
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return allMountains
      .filter(m =>
        m.name.toLowerCase().includes(q) ||
        m.continent.toLowerCase().includes(q) ||
        m.country.toLowerCase().includes(q) ||
        m.shortName.toLowerCase().includes(q),
      )
      .slice(0, 7);
  }, [query]);

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus, inputRef]);

  return (
    <>
      <div className="flex items-center px-4 py-3 gap-2.5">
        <span className="text-white/30 flex-shrink-0"><SearchIcon /></span>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={e => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder="Search mountains, continents…"
          className="bg-transparent text-white text-sm outline-none flex-1 placeholder-white/25"
          autoComplete="off"
          spellCheck="false"
          style={{ touchAction: 'manipulation' }}
        />
        {query && (
          <button
            onMouseDown={e => { e.preventDefault(); onChange(''); }}
            onTouchEnd={e => { e.preventDefault(); onChange(''); }}
            className="text-white/35 hover:text-white/60 active:text-white/80 transition-colors flex-shrink-0"
            style={{ touchAction: 'manipulation', padding: '4px' }}
          >
            <ClearIcon />
          </button>
        )}
      </div>
      {results.length > 0 && (
        <div className="border-t" style={{ borderColor: 'rgba(255,255,255,0.06)', paddingBottom: 6 }}>
          {results.map(m => (
            <SearchResult key={m.id} mountain={m} onSelect={onSelect} />
          ))}
        </div>
      )}
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// Main TopBar
// ═══════════════════════════════════════════════════════════════════════════
export default function TopBar({
  searchQuery,
  onSearchChange,
  autoRotate,
  onAutoRotateToggle,
  onMountainSelect,
  visibleCount,
}) {
  const isMobile = useIsMobile();
  const [focused, setFocused] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const inputRef = useRef(null);
  const mobileInputRef = useRef(null);

  const handleSelect = (mountain) => {
    onMountainSelect(mountain);
    onSearchChange('');
    setFocused(false);
    setMobileSearchOpen(false);
    inputRef.current?.blur();
    mobileInputRef.current?.blur();
  };

  const openMobileSearch = () => {
    setMobileSearchOpen(true);
    onSearchChange('');
  };

  const closeMobileSearch = () => {
    setMobileSearchOpen(false);
    onSearchChange('');
    mobileInputRef.current?.blur();
  };

  // ── Mobile layout ──────────────────────────────────────────────────────
  if (isMobile) {
    return (
      <div className="absolute top-0 left-0 right-0 z-30 pointer-events-none">
        <div className="flex items-center gap-2 p-3" style={{ paddingTop: 'max(12px, env(safe-area-inset-top))' }}>

          {/* Logo pill */}
          {!mobileSearchOpen && (
            <div
              className="pointer-events-auto flex items-center gap-2 px-3 py-2.5 rounded-2xl flex-shrink-0"
              style={glass}
            >
              <span style={{ fontSize: '1rem' }}>⛰</span>
              <div>
                <div className="text-white font-bold text-xs tracking-tight leading-none">Mountains</div>
                <div className="text-white/30 text-[9px] mt-0.5">{visibleCount} peaks</div>
              </div>
            </div>
          )}

          {/* Mobile search — either icon button or full search bar */}
          {mobileSearchOpen ? (
            // Full-width search bar
            <div
              className="pointer-events-auto flex-1 rounded-2xl overflow-hidden"
              style={{ ...glass, border: '1px solid rgba(255,255,255,0.14)' }}
            >
              <div className="flex items-center gap-1">
                {/* Back button */}
                <button
                  onClick={closeMobileSearch}
                  className="flex items-center justify-center text-white/60 hover:text-white active:text-white/40 transition-colors flex-shrink-0"
                  style={{ width: 44, height: 44, touchAction: 'manipulation' }}
                  aria-label="Close search"
                >
                  <BackIcon />
                </button>
                {/* Input */}
                <div className="flex-1">
                  <SearchPanel
                    query={searchQuery}
                    onChange={onSearchChange}
                    onSelect={handleSelect}
                    inputRef={mobileInputRef}
                    autoFocus={true}
                    onBlur={() => {}} // keep open until back is pressed
                  />
                </div>
              </div>
            </div>
          ) : (
            // Icon search button
            <button
              className="pointer-events-auto flex items-center justify-center rounded-2xl text-white/60 hover:text-white/90 active:text-white transition-colors flex-shrink-0"
              onClick={openMobileSearch}
              style={{ ...glass, width: 44, height: 44, touchAction: 'manipulation' }}
              aria-label="Search mountains"
            >
              <SearchIcon size={17} />
            </button>
          )}

          {/* Rotate toggle */}
          {!mobileSearchOpen && (
            <button
              className="pointer-events-auto flex items-center justify-center rounded-2xl transition-all flex-shrink-0"
              onClick={onAutoRotateToggle}
              style={{
                ...glass,
                width: 44,
                height: 44,
                background: autoRotate ? 'rgba(255,255,255,0.12)' : glass.background,
                border: `1px solid ${autoRotate ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.08)'}`,
                color: autoRotate ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.35)',
                touchAction: 'manipulation',
              }}
              aria-label={autoRotate ? 'Stop rotation' : 'Auto-rotate globe'}
            >
              <RotateIcon active={autoRotate} />
            </button>
          )}
        </div>
      </div>
    );
  }

  // ── Desktop layout ─────────────────────────────────────────────────────
  return (
    <div className="absolute top-0 left-0 right-0 z-30 pointer-events-none">
      <div className="flex items-start gap-3 p-4">

        {/* Logo */}
        <div className="pointer-events-auto flex-shrink-0 px-4 py-3 rounded-2xl" style={glass}>
          <div className="flex items-center gap-2">
            <span style={{ fontSize: '1.1rem' }}>⛰</span>
            <div>
              <div className="text-white font-bold text-sm tracking-tight leading-none">Mountain Explorer</div>
              <div className="text-white/30 text-[10px] mt-0.5 tracking-wide">3D PLANET · {visibleCount} PEAKS</div>
            </div>
          </div>
        </div>

        {/* Search bar */}
        <div className="pointer-events-auto flex-1 max-w-sm relative">
          <div
            className="rounded-2xl transition-all duration-200"
            style={{
              ...glass,
              border: `1px solid ${focused ? 'rgba(255,255,255,0.16)' : 'rgba(255,255,255,0.07)'}`,
              boxShadow: focused ? '0 0 0 3px rgba(255,255,255,0.04)' : 'none',
            }}
          >
            <SearchPanel
              query={searchQuery}
              onChange={onSearchChange}
              onSelect={handleSelect}
              inputRef={inputRef}
              autoFocus={false}
              onBlur={() => setFocused(false)}
            />
            {/* Re-attach focus for the desktop wrapper */}
            {!focused && (
              <div
                className="absolute inset-0 rounded-2xl cursor-text"
                onClick={() => { setFocused(true); inputRef.current?.focus(); }}
              />
            )}
          </div>
        </div>

        {/* Rotate toggle */}
        <button
          className="pointer-events-auto flex-shrink-0 flex items-center gap-2 px-4 py-3 rounded-2xl transition-all duration-200"
          onClick={onAutoRotateToggle}
          style={{
            ...glass,
            background: autoRotate ? 'rgba(255,255,255,0.1)' : glass.background,
            border: `1px solid ${autoRotate ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.07)'}`,
            color: autoRotate ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.35)',
          }}
        >
          <RotateIcon active={autoRotate} />
          <span className="text-xs font-semibold">{autoRotate ? 'Rotating' : 'Rotate'}</span>
        </button>
      </div>
    </div>
  );
}
