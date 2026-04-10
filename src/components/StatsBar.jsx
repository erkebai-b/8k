/**
 * StatsBar.jsx
 * Minimal floating stats strip — shows active category summary.
 * Appears at the bottom centre of the screen.
 */

import { useMemo } from 'react';
import { CATEGORY_COLORS } from '../utils/mountainUtils';

const CATEGORY_META = [
  { id: 'seven-summits-oceania',   label: 'Oceania',   emoji: '🏔' },
  { id: 'seven-summits-australia', label: 'Australia',  emoji: '🦘' },
  { id: '8000m',                   label: '8000m',      emoji: '🎯' },
  { id: 'special',                 label: 'Special',    emoji: '✦'  },
];

export default function StatsBar({ mountains, selectedMountain, onMountainClose }) {
  const stats = useMemo(() => {
    return CATEGORY_META.map((meta) => ({
      ...meta,
      count: mountains.filter((m) => m.categories.includes(meta.id)).length,
      color: CATEGORY_COLORS[meta.id],
    })).filter((s) => s.count > 0);
  }, [mountains]);

  if (selectedMountain) return null; // hidden when sidebar is open

  return (
    <div
      className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1 px-3 py-2 rounded-2xl"
      style={{
        background: 'rgba(6,6,10,0.88)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        border: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      {stats.map((s, i) => (
        <div key={s.id} className="flex items-center">
          {i > 0 && (
            <div className="w-px h-3 mx-2.5" style={{ background: 'rgba(255,255,255,0.08)' }} />
          )}
          <div className="flex items-center gap-1.5">
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: s.color }}
            />
            <span className="text-[11px] text-white/40">
              {s.label}
            </span>
            <span
              className="text-[11px] font-bold"
              style={{ color: s.color }}
            >
              {s.count}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
