/**
 * FilterPanel.jsx
 *
 * Desktop : bottom-left floating panel with toggle rows + legend.
 * Mobile  : horizontal scrollable chip bar at the bottom of the screen.
 *           Each chip shows the category colour, short label, and visible count.
 *           Tap to toggle a category on/off.
 */

import { useState } from 'react';
import { CATEGORY_COLORS } from '../utils/mountainUtils';
import { mountainsByCategory } from '../data/mountains';
import { useIsMobile } from '../hooks/useIsMobile';

// ── Filter items (shared between both layouts) ────────────────────────────
const FILTER_ITEMS = [
  {
    id: 'seven-summits-oceania',
    label: 'Seven Summits',
    sublabel: 'Oceania / Traditional',
    shortLabel: 'Oceania',
    color: CATEGORY_COLORS['seven-summits-oceania'],
    count: mountainsByCategory['seven-summits-oceania'].length,
    tip: 'Puncak Jaya (Indonesia) as the Oceania summit — the Reinhold Messner / traditional list.',
  },
  {
    id: 'seven-summits-australia',
    label: 'Seven Summits',
    sublabel: 'Australia Continental',
    shortLabel: 'Australia',
    color: CATEGORY_COLORS['seven-summits-australia'],
    count: mountainsByCategory['seven-summits-australia'].length,
    tip: 'Mount Kosciuszko (Australia) as the Oceania summit — the Richard Bass / Pat Morrow list.',
  },
  {
    id: '8000m',
    label: '8000m Peaks',
    sublabel: 'All 14 eight-thousanders',
    shortLabel: '8000m',
    color: CATEGORY_COLORS['8000m'],
    count: mountainsByCategory['8000m'].length,
    tip: 'All 14 mountains exceeding 8,000 m above sea level.',
  },
  {
    id: 'special',
    label: 'Special',
    sublabel: 'Notable highlights',
    shortLabel: 'Special',
    color: CATEGORY_COLORS['special'],
    count: mountainsByCategory['special'].length,
    tip: 'Mauna Kea — tallest mountain on Earth measured from its ocean-floor base.',
  },
  {
    id: 'notable',
    label: 'Notable Peaks',
    sublabel: 'Regional & cultural icons',
    shortLabel: 'Notable',
    color: CATEGORY_COLORS['notable'],
    count: mountainsByCategory['notable'].length,
    tip: 'Mount Fuji (Japan) and Jengish Chokusu / Peak Victory (Kyrgyzstan).',
  },
];

// ── Info icon ─────────────────────────────────────────────────────────────
function InfoIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" y1="16" x2="12" y2="12"/>
      <line x1="12" y1="8" x2="12.01" y2="8"/>
    </svg>
  );
}

// ── Desktop filter row ────────────────────────────────────────────────────
function FilterRow({ item, isActive, onToggle }) {
  const [showTip, setShowTip] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => onToggle(item.id)}
        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 hover:bg-white/5 text-left"
        style={{ background: isActive ? 'rgba(255,255,255,0.04)' : 'transparent' }}
      >
        <div
          className="w-3 h-3 rounded-sm flex-shrink-0 transition-all duration-200"
          style={{
            background: isActive ? item.color : 'rgba(255,255,255,0.12)',
            boxShadow: isActive ? `0 0 10px ${item.color}55` : 'none',
          }}
        />
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold leading-none transition-colors"
            style={{ color: isActive ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.28)' }}>
            {item.label}
          </div>
          <div className="text-[10px] mt-0.5 transition-colors"
            style={{ color: isActive ? 'rgba(255,255,255,0.38)' : 'rgba(255,255,255,0.18)' }}>
            {item.sublabel}
          </div>
        </div>
        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0 transition-all"
          style={{
            background: isActive ? `${item.color}20` : 'rgba(255,255,255,0.05)',
            color: isActive ? item.color : 'rgba(255,255,255,0.2)',
          }}>
          {item.count}
        </span>
        <button
          onMouseEnter={() => setShowTip(true)}
          onMouseLeave={() => setShowTip(false)}
          onClick={e => { e.stopPropagation(); setShowTip(s => !s); }}
          className="flex-shrink-0 text-white/20 hover:text-white/50 transition-colors"
        >
          <InfoIcon />
        </button>
      </button>
      {showTip && (
        <div
          className="absolute left-full top-0 ml-2 z-50 w-48 p-3 rounded-xl text-xs text-white/60 leading-relaxed pointer-events-none"
          style={{ background: 'rgba(6,6,10,0.96)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(16px)' }}
        >
          {item.tip}
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// Mobile chip bar
// ═══════════════════════════════════════════════════════════════════════════
function MobileFilterBar({ activeFilters, onFilterToggle, visibleCount }) {
  return (
    <div
      className="absolute bottom-0 left-0 right-0 z-10"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 8px)' }}
    >
      {/* Scroll container */}
      <div
        className="overflow-x-auto"
        style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }}
      >
        <div className="flex items-center gap-2 px-4 py-3" style={{ width: 'max-content' }}>
          {/* Visible count pill */}
          <div
            className="flex-shrink-0 px-3 py-1.5 rounded-full text-[11px] font-semibold text-white/30"
            style={{
              background: 'rgba(6,6,10,0.88)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(255,255,255,0.07)',
            }}
          >
            {visibleCount} peaks
          </div>

          {/* Separator */}
          <div className="w-px h-4 flex-shrink-0" style={{ background: 'rgba(255,255,255,0.1)' }} />

          {/* Category chips */}
          {FILTER_ITEMS.map(item => {
            const isActive = activeFilters.has(item.id);
            const visibleForCategory = item.count; // always shows total count
            return (
              <button
                key={item.id}
                onClick={() => onFilterToggle(item.id)}
                className="flex-shrink-0 flex items-center gap-2 rounded-full transition-all duration-200"
                style={{
                  padding: '7px 14px',
                  background: isActive
                    ? `${item.color}20`
                    : 'rgba(6,6,10,0.88)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  border: `1px solid ${isActive ? item.color + '50' : 'rgba(255,255,255,0.08)'}`,
                  boxShadow: isActive ? `0 0 12px ${item.color}30` : 'none',
                  touchAction: 'manipulation',
                  minHeight: 36,
                }}
              >
                {/* Dot */}
                <div
                  className="rounded-full flex-shrink-0 transition-all"
                  style={{
                    width: 7,
                    height: 7,
                    background: isActive ? item.color : 'rgba(255,255,255,0.2)',
                    boxShadow: isActive ? `0 0 8px ${item.color}` : 'none',
                  }}
                />
                {/* Label */}
                <span
                  className="text-xs font-semibold transition-colors whitespace-nowrap"
                  style={{ color: isActive ? item.color : 'rgba(255,255,255,0.35)' }}
                >
                  {item.shortLabel}
                </span>
                {/* Count */}
                <span
                  className="text-[10px] font-bold transition-colors"
                  style={{ color: isActive ? item.color + 'cc' : 'rgba(255,255,255,0.2)' }}
                >
                  {visibleForCategory}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// Desktop panel
// ═══════════════════════════════════════════════════════════════════════════
function DesktopFilterPanel({ activeFilters, onFilterToggle, visibleCount }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className="absolute bottom-5 left-4 z-10 w-60"
      style={{
        background: 'rgba(6,6,10,0.90)',
        backdropFilter: 'blur(28px)',
        WebkitBackdropFilter: 'blur(28px)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: '20px',
      }}
    >
      {/* Header */}
      <button
        onClick={() => setCollapsed(c => !c)}
        className="w-full flex items-center justify-between px-4 pt-4 pb-3"
      >
        <div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-white/30">Display Filters</div>
          <div className="text-[10px] text-white/20 mt-0.5">{visibleCount} mountain{visibleCount !== 1 ? 's' : ''} visible</div>
        </div>
        <span className="text-white/25 transition-transform duration-200"
          style={{ transform: collapsed ? 'rotate(-90deg)' : 'rotate(0deg)' }}>▾</span>
      </button>

      {!collapsed && (
        <>
          <div className="px-2 pb-2 space-y-0.5">
            {FILTER_ITEMS.map(item => (
              <FilterRow key={item.id} item={item} isActive={activeFilters.has(item.id)} onToggle={onFilterToggle} />
            ))}
          </div>
          <div className="mx-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }} />
          <div className="px-4 py-3">
            <div className="text-[10px] font-bold uppercase tracking-widest text-white/20 mb-2.5">Legend</div>
            <div className="space-y-2">
              {FILTER_ITEMS.map(item => (
                <div key={item.id} className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: item.color }} />
                  <span className="text-[11px] text-white/40">{item.sublabel}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
              <p className="text-[10px] text-white/22 leading-relaxed">
                Spike height ∝ elevation. Hover to preview · click to explore.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// Export — picks layout based on breakpoint
// ═══════════════════════════════════════════════════════════════════════════
export default function FilterPanel({ activeFilters, onFilterToggle, visibleCount }) {
  const isMobile = useIsMobile();

  return isMobile
    ? <MobileFilterBar activeFilters={activeFilters} onFilterToggle={onFilterToggle} visibleCount={visibleCount} />
    : <DesktopFilterPanel activeFilters={activeFilters} onFilterToggle={onFilterToggle} visibleCount={visibleCount} />;
}
