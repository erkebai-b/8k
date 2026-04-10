/**
 * Globe.jsx
 * Core 3D interactive globe powered by react-globe.gl (Three.js).
 * Renders mountain markers as vertical spikes scaled by elevation,
 * handles camera fly-to animations, auto-rotation, and hover tooltips.
 */

import { useRef, useEffect, useState, useCallback } from 'react';
import GlobeGL from 'react-globe.gl';
import {
  getCategoryColor,
  getPointAltitude,
  getPointRadius,
  buildTooltipHTML,
} from '../utils/mountainUtils';

// ── NASA / three-globe CDN textures ─────────────────────────────────────
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
  const globeRef  = useRef(null);
  const [size, setSize] = useState({ w: window.innerWidth, h: window.innerHeight });
  const initialised = useRef(false);

  // ── Responsive sizing ─────────────────────────────────────────────────
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

      // Start camera looking at the Himalayan arc
      globeRef.current.pointOfView({ lat: 22, lng: 82, altitude: 2.6 }, 0);

      // Kick off auto-rotation
      const ctrl = globeRef.current.controls();
      ctrl.autoRotate      = true;
      ctrl.autoRotateSpeed = 0.45;
      ctrl.enableDamping   = true;
      ctrl.dampingFactor   = 0.08;
    }, 300);
    return () => clearTimeout(timer);
  }, []);

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

    globeRef.current.pointOfView(
      { lat: flyTo.lat, lng: flyTo.lng, altitude: 1.6 },
      2200, // ms duration
    );

    const timer = setTimeout(() => onFlyComplete?.(), 2300);
    return () => clearTimeout(timer);
  }, [flyTo, onFlyComplete]);

  // ── Point colour — selected mountain turns white ──────────────────────
  const getColor = useCallback(
    (d) => {
      if (selectedMountain && d.id === selectedMountain.id) return '#FFFFFF';
      return getCategoryColor(d.categories);
    },
    [selectedMountain],
  );

  // ── Point altitude — proportional to elevation with sqrt curve ───────
  const getAltitude = useCallback(
    (d) => getPointAltitude(d.elevation),
    [],
  );

  // ── Point radius — Seven Summits are larger ───────────────────────────
  const getRadius = useCallback(
    (d) => {
      if (selectedMountain && d.id === selectedMountain.id) {
        return getPointRadius(d.categories) * 1.4;
      }
      return getPointRadius(d.categories);
    },
    [selectedMountain],
  );

  // ── Tooltip HTML (shown on hover) ─────────────────────────────────────
  const getLabel = useCallback(
    (d) => buildTooltipHTML(d),
    [],
  );

  // ── Ring data — pulsing ring around the selected mountain ─────────────
  const ringData = selectedMountain ? [selectedMountain] : [];

  return (
    <div className="absolute inset-0 overflow-hidden">
      <GlobeGL
        ref={globeRef}
        width={size.w}
        height={size.h}

        // ── Earth surface ──────────────────────────────────────────────
        globeImageUrl={TEXTURES.day}
        bumpImageUrl={TEXTURES.bump}
        backgroundImageUrl={TEXTURES.stars}

        // ── Atmospheric glow ───────────────────────────────────────────
        atmosphereColor="hsl(215, 100%, 68%)"
        atmosphereAltitude={0.18}

        // ── Mountain point markers ─────────────────────────────────────
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

        // ── Pulsing selection ring ─────────────────────────────────────
        ringsData={ringData}
        ringLat="lat"
        ringLng="lng"
        ringColor={() => (t) => `rgba(255, 255, 255, ${Math.max(0, 0.9 - t)})`}
        ringMaxRadius={5}
        ringPropagationSpeed={2}
        ringRepeatPeriod={900}

        // ── Events ────────────────────────────────────────────────────
        onPointClick={(point) => onMountainClick(point)}

        // ── Renderer ──────────────────────────────────────────────────
        enablePointerInteraction={true}
        rendererConfig={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      />
    </div>
  );
}
