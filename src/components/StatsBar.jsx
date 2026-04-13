/**
 * StatsBar.jsx
 * Minimal stats strip — visible on desktop only.
 * On mobile the filter chip bar already shows counts per category.
 */

import { useMemo } from 'react';
import { CATEGORY_COLORS } from '../utils/mountainUtils';
import { useIsMobile } from '../hooks/useIsMobile';

const CATEGORY_META = [
  { id: 'seven-summits-oceania',   label: 'Oceania'   },
  { id: 'seven-summits-australia', label: 'Australia'  },
  { id: '8000m',                   label: '8000m'      },
  { id: 'special',                 label: 'Special'    },
  { id: 'notable',                 label: 'Notable'    },
];

export default function StatsBar({ mountains, selectedMountain }) {
  const isMobile = useIsMobile();

  const stats = useMemo(() => {
    return CATEGORY_META
      .map(meta => ({
        ...meta,
        count: mountains.filter(m => m.categories.includes(meta.id)).length,
        color: CATEGORY_COLORS[meta.id],
      }))
      .filter(s => s.count > 0);
  }, [mountains]);

  // Hidden on mobile (counts shown in MobileFilterBar chips) or when sidebar open
  if (isMobile || selectedMountain) return null;

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
          {i > 0 && <div className="w-px h-3 mx-2.5" style={{ background: 'rgba(255,255,255,0.08)' }} />}
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: s.color }} />
            <span className="text-[11px] text-white/40">{s.label}</span>
            <span className="text-[11px] font-bold" style={{ color: s.color }}>{s.count}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
