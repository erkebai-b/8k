/**
 * Globe.jsx
 * Core 3D interactive globe powered by react-globe.gl (Three.js).
 *
 * Mobile adjustments:
 *   • 2× larger point radius → easier tap targets
 *   • Higher initial + fly-to altitude → more globe visible on small screen
 *   • Tooltip HTML disabled (no hover on touch) — tap opens Sidebar instead
 */

import { useRef, useEffect, useState, useCallback } from 'react';
import GlobeGL from 'react-globe.gl';
import { useIsMobile } from '../hooks/useIsMobile';
import {
  getCategoryColor,
  getPointAltitude,
  getPointRadius,
  buildTooltipHTML,
} from '../utils/mountainUtils';

// ── NASA / three-globe CDN textures ──────────────────────────────────────
const TEXTURES = {
  day:   'https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg',
  bump:  'https://unpkg.com/three-globe/example/img/earth-topology.png',
  stars: 'https://unpkg.com/three-globe/example/img/night-sky.png',
};

export default function Globe({
  mountains,
  selectedMountain,
  onMountainClick,
  autoRotate,
  flyTo,
  onFlyComplete,
}) {
  const isMobile    = useIsMobile();
  const globeRef    = useRef(null);
  const initialised = useRef(false);
  const [size, setSize] = useState({ w: window.innerWidth, h: window.innerHeight });

  // ── Responsive resize ─────────────────────────────────────────────────
  useEffect(() => {
    const onResize = () => setSize({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // ── One-time globe initialisation ─────────────────────────────────────
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!globeRef.current || initialised.current) return;
      initialised.current = true;

      // Start looking at the Himalayan arc; pull back more on mobile
      const startAlt = isMobile ? 3.0 : 2.6;
      globeRef.current.pointOfView({ lat: 22, lng: 82, altitude: startAlt }, 0);

      const ctrl = globeRef.current.controls();
      ctrl.autoRotate      = true;
      ctrl.autoRotateSpeed = 0.45;
      ctrl.enableDamping   = true;
      ctrl.dampingFactor   = 0.08;
      // Restrict zoom range so the globe stays legible
      ctrl.minDistance     = isMobile ? 115 : 110;
      ctrl.maxDistance     = isMobile ? 500 : 450;
    }, 300);
    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once; isMobile is read at mount time from the ref

  // ── Auto-rotation toggle ──────────────────────────────────────────────
  useEffect(() => {
    if (!globeRef.current) return;
    const ctrl = globeRef.current.controls();
    ctrl.autoRotate      = autoRotate;
    ctrl.autoRotateSpeed = 0.45;
  }, [autoRotate]);

  // ── Camera fly-to selected mountain ──────────────────────────────────
  useEffect(() => {
    if (!flyTo || !globeRef.current) return;

    // Pull back slightly more on mobile so the spike is fully in frame
    const targetAlt = isMobile ? 2.0 : 1.6;
    globeRef.current.pointOfView(
      { lat: flyTo.lat, lng: flyTo.lng, altitude: targetAlt },
      2200,
    );

    const timer = setTimeout(() => onFlyComplete?.(), 2300);
    return () => clearTimeout(timer);
  }, [flyTo, onFlyComplete, isMobile]);

  // ── Point colour — white when selected ───────────────────────────────
  const getColor = useCallback(
    (d) => (selectedMountain && d.id === selectedMountain.id ? '#FFFFFF' : getCategoryColor(d.categories)),
    [selectedMountain],
  );

  // ── Point altitude ────────────────────────────────────────────────────
  const getAltitude = useCallback((d) => getPointAltitude(d.elevation), []);

  // ── Point radius — 2× on mobile for touch target size ────────────────
  const getRadius = useCallback(
    (d) => {
      const base = getPointRadius(d.categories);
      const selected = selectedMountain && d.id === selectedMountain.id ? 1.4 : 1.0;
      const mobileMult = isMobile ? 2.2 : 1.0;
      return base * selected * mobileMult;
    },
    [selectedMountain, isMobile],
  );

  // ── Tooltip HTML (hover only — disabled on touch devices) ────────────
  const getLabel = useCallback(
    (d) => (isMobile ? '' : buildTooltipHTML(d)),
    [isMobile],
  );

  return (
    <div className="absolute inset-0 overflow-hidden">
      <GlobeGL
        ref={globeRef}
        width={size.w}
        height={size.h}

        // Earth surface
        globeImageUrl={TEXTURES.day}
        bumpImageUrl={TEXTURES.bump}
        backgroundImageUrl={TEXTURES.stars}

        // Atmospheric glow
        atmosphereColor="hsl(215, 100%, 68%)"
        atmosphereAltitude={0.18}

        // Mountain markers
        pointsData={mountains}
        pointLat="lat"
        pointLng="lng"
        pointAltitude={getAltitude}
        pointRadius={getRadius}
        pointColor={getColor}
        pointLabel={getLabel}
        pointsMerge={false}
        pointResolution={10}
        pointTransitionDuration={600}

        // Pulsing ring on selected mountain
        ringsData={selectedMountain ? [selectedMountain] : []}
        ringLat="lat"
        ringLng="lng"
        ringColor={() => (t) => `rgba(255, 255, 255, ${Math.max(0, 0.9 - t)})`}
        ringMaxRadius={isMobile ? 7 : 5}
        ringPropagationSpeed={2}
        ringRepeatPeriod={900}

        // Events
        onPointClick={(point) => onMountainClick(point)}

        // Renderer
        enablePointerInteraction={true}
        rendererConfig={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      />
    </div>
  );
}
