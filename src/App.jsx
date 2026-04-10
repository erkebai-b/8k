/**
 * App.jsx
 * Root application component — orchestrates state, filtering, and layout.
 *
 * Layout:
 *   ┌──────────────────────────────────────────────┐
 *   │  TopBar  (logo · search · rotate toggle)     │
 *   │                                              │
 *   │         3D Globe (full-screen)         │Sidebar│
 *   │                                              │
 *   │  FilterPanel (bottom-left)  StatsBar (btm)   │
 *   └──────────────────────────────────────────────┘
 */

import { useState, useCallback, useMemo } from 'react';

import Globe       from './components/Globe';
import Sidebar     from './components/Sidebar';
import TopBar      from './components/TopBar';
import FilterPanel from './components/FilterPanel';
import StatsBar    from './components/StatsBar';

import { mountains } from './data/mountains';

// All category IDs — default: everything visible
const ALL_FILTERS = new Set([
  'seven-summits-oceania',
  'seven-summits-australia',
  '8000m',
  'special',
]);

export default function App() {
  // ── Core state ──────────────────────────────────────────────────────────
  const [selectedMountain, setSelectedMountain] = useState(null);
  const [activeFilters,    setActiveFilters]    = useState(ALL_FILTERS);
  const [searchQuery,      setSearchQuery]      = useState('');
  const [autoRotate,       setAutoRotate]       = useState(true);
  const [flyTo,            setFlyTo]            = useState(null);

  // ── Filtered mountain list (drives globe + stats) ──────────────────────
  const filteredMountains = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return mountains.filter((m) => {
      // Must match at least one active filter category
      const passesFilter = m.categories.some((c) => activeFilters.has(c));
      // Must match search query (if any)
      const passesSearch =
        !q ||
        m.name.toLowerCase().includes(q) ||
        m.continent.toLowerCase().includes(q) ||
        m.country.toLowerCase().includes(q);
      return passesFilter && passesSearch;
    });
  }, [activeFilters, searchQuery]);

  // ── Handlers ────────────────────────────────────────────────────────────

  /** Open sidebar + fly camera to a mountain */
  const handleMountainClick = useCallback((mountain) => {
    setSelectedMountain(mountain);
    setFlyTo({ lat: mountain.lat, lng: mountain.lng });
    setAutoRotate(false);
  }, []);

  /** Close sidebar */
  const handleSidebarClose = useCallback(() => {
    setSelectedMountain(null);
  }, []);

  /** Called after the camera fly-to animation completes */
  const handleFlyComplete = useCallback(() => {
    setFlyTo(null);
  }, []);

  /** Toggle a single category filter on/off */
  const handleFilterToggle = useCallback((filterId) => {
    setActiveFilters((prev) => {
      const next = new Set(prev);
      if (next.has(filterId)) {
        // Keep at least one filter active
        if (next.size <= 1) return prev;
        next.delete(filterId);
      } else {
        next.add(filterId);
      }
      return next;
    });
  }, []);

  /** Toggle auto-rotation */
  const handleAutoRotateToggle = useCallback(() => {
    setAutoRotate((r) => !r);
  }, []);

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="relative w-screen h-screen bg-[#030308] overflow-hidden select-none">

      {/* 3D Globe — full-screen base layer */}
      <Globe
        mountains={filteredMountains}
        selectedMountain={selectedMountain}
        onMountainClick={handleMountainClick}
        autoRotate={autoRotate}
        flyTo={flyTo}
        onFlyComplete={handleFlyComplete}
      />

      {/* Top navigation bar */}
      <TopBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        autoRotate={autoRotate}
        onAutoRotateToggle={handleAutoRotateToggle}
        onMountainSelect={handleMountainClick}
        visibleCount={filteredMountains.length}
      />

      {/* Bottom-left filter & legend panel */}
      <FilterPanel
        activeFilters={activeFilters}
        onFilterToggle={handleFilterToggle}
        visibleCount={filteredMountains.length}
      />

      {/* Bottom-center stats strip (hidden when sidebar is open) */}
      <StatsBar
        mountains={filteredMountains}
        selectedMountain={selectedMountain}
      />

      {/* Right-side mountain detail sidebar */}
      {selectedMountain && (
        <Sidebar
          mountain={selectedMountain}
          onClose={handleSidebarClose}
        />
      )}

      {/* ── Ambient decorative gradient ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 100%, rgba(37,99,235,0.06) 0%, transparent 70%)',
        }}
      />
    </div>
  );
}
