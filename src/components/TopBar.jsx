/**
 * TopBar.jsx
 * Top navigation bar containing:
 *   • Logo / title
 *   • Full-text search with live dropdown results
 *   • Auto-rotate toggle button
 */

import { useState, useMemo, useRef, useEffect } from 'react';
import { mountains as allMountains } from '../data/mountains';
import { getCategoryColor } from '../utils/mountainUtils';

// ── Icons ────────────────────────────────────────────────────────────────
function SearchIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  );
}

function ClearIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  );
}

function RotateIcon({ active }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        animation: active ? 'spin 3s linear infinite' : 'none',
        transformOrigin: 'center',
      }}
    >
      <polyline points="23 4 23 10 17 10"/>
      <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
    </svg>
  );
}

// ── Search result row ─────────────────────────────────────────────────────
function SearchResult({ mountain, onSelect }) {
  const color = getCategoryColor(mountain.categories);
  return (
    <button
      onMouseDown={() => onSelect(mountain)} // mousedown fires before blur
      className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-white/5 transition-colors text-left group"
    >
      {/* Colour dot */}
      <div
        className="w-2 h-2 rounded-full flex-shrink-0"
        style={{ background: color, boxShadow: `0 0 6px ${color}80` }}
      />
      {/* Name + meta */}
      <div className="flex-1 min-w-0">
        <div className="text-white text-sm font-medium truncate group-hover:text-white/90">
          {mountain.name}
        </div>
        <div className="text-white/35 text-xs">
          {mountain.continent} · {mountain.elevation.toLocaleString()} m
        </div>
      </div>
      {/* Arrow */}
      <span className="text-white/20 group-hover:text-white/40 text-xs">→</span>
    </button>
  );
}

// ── Main TopBar ───────────────────────────────────────────────────────────
export default function TopBar({
  searchQuery,
  onSearchChange,
  autoRotate,
  onAutoRotateToggle,
  onMountainSelect,
  visibleCount,
}) {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef(null);

  // Live search across name, continent, and country
  const results = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return allMountains
      .filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.continent.toLowerCase().includes(q) ||
          m.country.toLowerCase().includes(q) ||
          m.shortName.toLowerCase().includes(q),
      )
      .slice(0, 7);
  }, [searchQuery]);

  const showDropdown = focused && results.length > 0;

  const handleSelect = (mountain) => {
    onMountainSelect(mountain);
    onSearchChange('');
    inputRef.current?.blur();
  };

  // Keyboard: Escape clears search
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape' && focused) {
        onSearchChange('');
        inputRef.current?.blur();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [focused, onSearchChange]);

  return (
    <div className="absolute top-0 left-0 right-0 z-30 pointer-events-none">
      <div className="flex items-start gap-3 p-4">

        {/* ── Logo ─────────────────────────────────────────────────── */}
        <div
          className="pointer-events-auto flex-shrink-0 px-4 py-3 rounded-2xl"
          style={{
            background: 'rgba(6,6,10,0.88)',
            backdropFilter: 'blur(28px)',
            WebkitBackdropFilter: 'blur(28px)',
            border: '1px solid rgba(255,255,255,0.07)',
          }}
        >
          <div className="flex items-center gap-2">
            <span style={{ fontSize: '1.1rem' }}>⛰</span>
            <div>
              <div className="text-white font-bold text-sm tracking-tight leading-none">
                Mountain Explorer
              </div>
              <div className="text-white/30 text-[10px] mt-0.5 tracking-wide">
                3D PLANET · {visibleCount} PEAKS
              </div>
            </div>
          </div>
        </div>

        {/* ── Search bar ───────────────────────────────────────────── */}
        <div className="pointer-events-auto flex-1 max-w-sm relative">
          <div
            className="rounded-2xl transition-all duration-200"
            style={{
              background: 'rgba(6,6,10,0.88)',
              backdropFilter: 'blur(28px)',
              WebkitBackdropFilter: 'blur(28px)',
              border: `1px solid ${focused ? 'rgba(255,255,255,0.16)' : 'rgba(255,255,255,0.07)'}`,
              boxShadow: focused ? '0 0 0 3px rgba(255,255,255,0.04)' : 'none',
            }}
          >
            {/* Input row */}
            <div className="flex items-center px-4 py-3 gap-2.5">
              <span className="text-white/30 flex-shrink-0">
                <SearchIcon />
              </span>
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder="Search mountains, continents…"
                className="bg-transparent text-white text-sm outline-none flex-1 placeholder-white/25"
                autoComplete="off"
                spellCheck="false"
              />
              {searchQuery && (
                <button
                  onMouseDown={(e) => { e.preventDefault(); onSearchChange(''); }}
                  className="text-white/30 hover:text-white/60 transition-colors flex-shrink-0"
                >
                  <ClearIcon />
                </button>
              )}
            </div>

            {/* Dropdown results */}
            {showDropdown && (
              <div
                className="border-t"
                style={{ borderColor: 'rgba(255,255,255,0.06)', paddingBottom: '6px' }}
              >
                {results.map((m) => (
                  <SearchResult key={m.id} mountain={m} onSelect={handleSelect} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── Auto-rotate toggle ────────────────────────────────────── */}
        <button
          className="pointer-events-auto flex-shrink-0 flex items-center gap-2 px-4 py-3 rounded-2xl transition-all duration-200"
          onClick={onAutoRotateToggle}
          title={autoRotate ? 'Stop rotation' : 'Auto-rotate globe'}
          style={{
            background: autoRotate
              ? 'rgba(255,255,255,0.1)'
              : 'rgba(6,6,10,0.88)',
            backdropFilter: 'blur(28px)',
            WebkitBackdropFilter: 'blur(28px)',
            border: `1px solid ${autoRotate ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.07)'}`,
            color: autoRotate ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.35)',
          }}
        >
          <RotateIcon active={autoRotate} />
          <span className="text-xs font-semibold hidden sm:block">
            {autoRotate ? 'Rotating' : 'Rotate'}
          </span>
        </button>

      </div>
    </div>
  );
}
