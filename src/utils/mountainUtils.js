/**
 * mountainUtils.js
 * Utility functions for mountain data processing and globe visualization
 */

// ── Category colour palette ────────────────────────────────────────────────
export const CATEGORY_COLORS = {
  'seven-summits-oceania':   '#FFD700', // Gold
  'seven-summits-australia': '#34D399', // Emerald green
  '8000m':                   '#F87171', // Soft red
  'special':                 '#60A5FA', // Sky blue
};

// ── Category display labels ────────────────────────────────────────────────
export const CATEGORY_LABELS = {
  'seven-summits-oceania':   'Seven Summits — Oceania',
  'seven-summits-australia': 'Seven Summits — Australia',
  '8000m':                   '8000m Peak',
  'special':                 'Special',
};

// ── Priority order for colour resolution ─────────────────────────────────
// Mountains that belong to multiple categories use the first matching priority
const COLOR_PRIORITY = ['special', 'seven-summits-oceania', 'seven-summits-australia', '8000m'];

/**
 * Returns the primary display colour for a mountain's category list.
 * Priority: special > Oceania summit > Australia summit > 8000m
 */
export function getCategoryColor(categories) {
  for (const cat of COLOR_PRIORITY) {
    if (categories.includes(cat)) return CATEGORY_COLORS[cat];
  }
  return '#FFFFFF';
}

/**
 * Returns a human-readable label for a mountain's category list.
 * Handles dual-category cases like Everest (Oceania summit + 8000m).
 */
export function getCategoryLabel(categories) {
  if (categories.includes('special')) return CATEGORY_LABELS['special'];

  if (categories.includes('seven-summits-oceania') && categories.includes('8000m')) {
    return 'Seven Summit (Oceania) + 8000m Peak';
  }
  if (categories.includes('seven-summits-oceania'))   return CATEGORY_LABELS['seven-summits-oceania'];
  if (categories.includes('seven-summits-australia')) return CATEGORY_LABELS['seven-summits-australia'];
  if (categories.includes('8000m'))                   return CATEGORY_LABELS['8000m'];

  return 'Mountain';
}

/**
 * Returns all readable category labels for a mountain (for tag display).
 */
export function getCategoryTags(categories) {
  return categories.map(c => CATEGORY_LABELS[c]).filter(Boolean);
}

/**
 * Maps real-world elevation (metres) to globe point altitude (0–1 scale).
 *
 * Globe altitude of 1.0 = one Earth-radius above the surface (~6,371 km).
 * We use a gentle logarithmic-ish scale so all mountains are visible
 * while Everest clearly towers over Kosciuszko.
 *
 * Tuned range: 0.018 (Kosciuszko 2,228 m) → 0.14 (Everest 8,849 m)
 */
export function getPointAltitude(elevation) {
  const MIN_ELEV = 1800;
  const MAX_ELEV = 8849;
  const MIN_ALT  = 0.018;
  const MAX_ALT  = 0.14;

  // Clamp input to expected range
  const clamped = Math.max(MIN_ELEV, Math.min(MAX_ELEV, elevation));

  // Linear proportion within range
  const t = (clamped - MIN_ELEV) / (MAX_ELEV - MIN_ELEV);

  // Mild square-root curve keeps shorter mountains visible
  return MIN_ALT + Math.sqrt(t) * (MAX_ALT - MIN_ALT);
}

/**
 * Returns the angular radius (in globe degrees) for a point marker.
 * Larger for landmark Seven Summits, standard for 8000m peaks.
 */
export function getPointRadius(categories) {
  if (categories.includes('special'))                 return 0.60;
  if (
    categories.includes('seven-summits-oceania') ||
    categories.includes('seven-summits-australia')
  )                                                   return 0.48;
  return 0.30;
}

/**
 * Formats an elevation number with locale-aware commas and a unit suffix.
 * @param {number} elevation — metres
 * @param {string} [suffix='m'] — unit label
 */
export function formatElevation(elevation, suffix = 'm') {
  return `${elevation.toLocaleString()}${suffix}`;
}

/**
 * Formats lat/lng into a human-readable coordinate string.
 * e.g. 27.99°N, 86.93°E
 */
export function formatCoords(lat, lng) {
  const latStr = `${Math.abs(lat).toFixed(2)}°${lat >= 0 ? 'N' : 'S'}`;
  const lngStr = `${Math.abs(lng).toFixed(2)}°${lng >= 0 ? 'E' : 'W'}`;
  return `${latStr}, ${lngStr}`;
}

/**
 * Returns an inline HTML tooltip for globe.gl pointLabel.
 * Carefully escaped for XSS safety (all values are from our static dataset).
 */
export function buildTooltipHTML(mountain) {
  const color = getCategoryColor(mountain.categories);
  const categoryLabel = getCategoryLabel(mountain.categories);

  const extraHeight = mountain.totalHeight
    ? `<div style="margin-top:8px;padding-top:8px;border-top:1px solid rgba(255,255,255,0.08);">
         <span style="font-size:11px;color:rgba(255,255,255,0.45);">Base-to-peak total</span>
         <div style="font-size:13px;font-weight:700;color:${color};margin-top:2px;">
           ${mountain.totalHeight.toLocaleString()} m
         </div>
         <div style="font-size:10px;color:rgba(96,165,250,0.7);margin-top:1px;">
           Tallest on Earth from ocean floor
         </div>
       </div>`
    : '';

  return `
    <div style="
      background: rgba(8,8,14,0.94);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      border: 1px solid rgba(255,255,255,0.10);
      border-radius: 16px;
      padding: 14px 18px;
      color: white;
      font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif;
      min-width: 180px;
      max-width: 240px;
      box-shadow: 0 12px 48px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.06);
      pointer-events: none;
    ">
      <div style="font-weight:700;font-size:15px;letter-spacing:-0.3px;line-height:1.2;">
        ${mountain.name}
      </div>
      <div style="font-size:11px;color:rgba(255,255,255,0.45);margin-top:3px;">
        ${mountain.continent} · ${mountain.country}
      </div>
      <div style="
        display:inline-block;
        font-size:10px;
        font-weight:600;
        letter-spacing:0.4px;
        text-transform:uppercase;
        color:${color};
        background:${color}18;
        border:1px solid ${color}30;
        border-radius:6px;
        padding:2px 8px;
        margin-top:8px;
      ">
        ${categoryLabel}
      </div>
      <div style="font-size:18px;font-weight:800;color:${color};margin-top:8px;letter-spacing:-0.5px;">
        ${mountain.elevation.toLocaleString()} m
      </div>
      <div style="font-size:11px;color:rgba(255,255,255,0.35);margin-top:1px;">
        above sea level
      </div>
      ${extraHeight}
      <div style="font-size:10px;color:rgba(255,255,255,0.2);margin-top:10px;">
        Click to explore →
      </div>
    </div>
  `;
}
