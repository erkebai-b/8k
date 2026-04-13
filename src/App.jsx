/**
 * App.jsx
 * Root application component — orchestrates state, filtering, and layout.
 *
 * Desktop layout:
 *   ┌────────────────────────────────────────────────────┐
 *   │  TopBar  (logo · search bar · rotate toggle)       │
 *   │                                                    │
 *   │         3D Globe (full-screen)        │  Sidebar   │
 *   │                                       │  (right)   │
 *   │  FilterPanel (bottom-left)            └────────────│
 *   │                 StatsBar (bottom-centre)           │
 *   └────────────────────────────────────────────────────┘
 *
 * Mobile layout:
 *   ┌────────────────────────────────┐
 *   │ [⛰ Logo] [🔍] [↻]             │  TopBar (compact)
 *   │                                │
 *   │       3D Globe                 │
 *   │                                │
 *   │ [Oceania][Aus][8000m][Spec]...  │  FilterBar (chips)
 *   └────────────────────────────────┘
 *
 *   When a mountain is tapped:
 *   ┌────────────────────────────────┐
 *   │       3D Globe (partial)       │
 *   ├────── drag handle ─────────────┤
 *   │       Sidebar (bottom sheet)   │  ← slides up, drag to dismiss
 *   └────────────────────────────────┘
 */

import { useState, useCallback, useMemo } from 'react';

import Globe       from './components/Globe';
import Sidebar     from './components/Sidebar';
import TopBar      from './components/TopBar';
import FilterPanel from './components/FilterPanel';
import StatsBar    from './components/StatsBar';

import { mountains } from './data/mountains';
import { useIsMobile } from './hooks/useIsMobile';

// All category IDs — default: everything visible
const ALL_FILTERS = new Set([
  'seven-summits-oceania',
  'seven-summits-australia',
  '8000m',
  'special',
  'notable',
]);

export default function App() {
  const isMobile = useIsMobile();

  // ── Core state ────────────────────────────────────────────────────────
  const [selectedMountain, setSelectedMountain] = useState(null);
  const [activeFilters,    setActiveFilters]    = useState(ALL_FILTERS);
  const [searchQuery,      setSearchQuery]      = useState('');
  const [autoRotate,       setAutoRotate]       = useState(true);
  const [flyTo,            setFlyTo]            = useState(null);

  // ── Filtered mountain list ────────────────────────────────────────────
  const filteredMountains = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return mountains.filter((m) => {
      const passesFilter = m.categories.some((c) => activeFilters.has(c));
      const passesSearch =
        !q ||
        m.name.toLowerCase().includes(q) ||
        m.continent.toLowerCase().includes(q) ||
        m.country.toLowerCase().includes(q);
      return passesFilter && passesSearch;
    });
  }, [activeFilters, searchQuery]);

  // ── Handlers ──────────────────────────────────────────────────────────

  const handleMountainClick = useCallback((mountain) => {
    setSelectedMountain(mountain);
    setFlyTo({ lat: mountain.lat, lng: mountain.lng });
    setAutoRotate(false);
  }, []);

  const handleSidebarClose = useCallback(() => {
    setSelectedMountain(null);
  }, []);

  const handleFlyComplete = useCallback(() => {
    setFlyTo(null);
  }, []);

  const handleFilterToggle = useCallback((filterId) => {
    setActiveFilters((prev) => {
      const next = new Set(prev);
      if (next.has(filterId)) {
        if (next.size <= 1) return prev; // keep at least one active
        next.delete(filterId);
      } else {
        next.add(filterId);
      }
      return next;
    });
  }, []);

  const handleAutoRotateToggle = useCallback(() => setAutoRotate((r) => !r), []);

  // ── Render ────────────────────────────────────────────────────────────
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

      {/* Filter controls (desktop: left panel / mobile: chip bar) */}
      {!selectedMountain && (
        <FilterPanel
          activeFilters={activeFilters}
          onFilterToggle={handleFilterToggle}
          visibleCount={filteredMountains.length}
        />
      )}

      {/* Stats strip — desktop only, hidden when sidebar open */}
      <StatsBar
        mountains={filteredMountains}
        selectedMountain={selectedMountain}
      />

      {/* Mobile backdrop — tap to dismiss sidebar */}
      {selectedMountain && isMobile && (
        <div
          className="fixed inset-0 z-30"
          style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(2px)' }}
          onClick={handleSidebarClose}
        />
      )}

      {/* Mountain detail panel (desktop: right slide-in / mobile: bottom sheet) */}
      {selectedMountain && (
        <Sidebar
          mountain={selectedMountain}
          onClose={handleSidebarClose}
        />
      )}

      {/* Ambient decorative gradient */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 50% 100%, rgba(37,99,235,0.06) 0%, transparent 70%)',
        }}
      />
    </div>
  );
}
