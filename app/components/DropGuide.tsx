'use client'
import { useMemo, useState } from 'react'
import {
  dropMaps,
  dropZones,
  dropGuideNotes,
  ENGAGEMENT_FA,
  TRAFFIC_BASIS_FA,
  TRAFFIC_FA,
  type DropEngagement,
  type DropMapId,
  type DropTraffic,
  type DropZone,
} from '../data/dropGuideData'
import SectionHeader from './SectionHeader'
import SourceNote from './SourceNote'

const TRAFFIC_STYLE: Record<DropTraffic, string> = {
  high: 'border-cod-red/40 bg-cod-red/10 text-cod-red',
  medium: 'border-cod-gold/40 bg-cod-gold/10 text-cod-gold-light',
  low: 'border-cod-green/40 bg-cod-green/10 text-cod-green',
}

const TRAFFIC_FILTERS: { id: 'all' | DropTraffic; label: string }[] = [
  { id: 'all', label: 'همه' },
  { id: 'high', label: TRAFFIC_FA.high },
  { id: 'medium', label: TRAFFIC_FA.medium },
  { id: 'low', label: TRAFFIC_FA.low },
]

const RANGE_FILTERS: { id: 'all' | DropEngagement; label: string }[] = [
  { id: 'all', label: 'همه' },
  { id: 'close', label: ENGAGEMENT_FA.close },
  { id: 'mixed', label: ENGAGEMENT_FA.mixed },
  { id: 'long', label: ENGAGEMENT_FA.long },
]

function TrafficChip({ zone }: { zone: DropZone }) {
  return (
    <span className={`hud-tag border px-1.5 py-0.5 ${TRAFFIC_STYLE[zone.traffic]}`}>
      {TRAFFIC_FA[zone.traffic]}
      <span className="mr-1 text-[9px] text-gray-500">
        {zone.trafficBasis === 'official' ? '· رسمی' : '· تحریری'}
      </span>
    </span>
  )
}

export default function DropGuide() {
  const [activeMap, setActiveMap] = useState<DropMapId>('urzikstan')
  const [traffic, setTraffic] = useState<'all' | DropTraffic>('all')
  const [range, setRange] = useState<'all' | DropEngagement>('all')
  const [query, setQuery] = useState('')
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const zonesOfMap = useMemo(() => dropZones.filter(z => z.map === activeMap), [activeMap])

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return zonesOfMap.filter(z => {
      if (traffic !== 'all' && z.traffic !== traffic) return false
      if (range !== 'all' && z.engagement !== range) return false
      if (q && !`${z.name} ${z.nameFa} ${z.summaryFa}`.toLowerCase().includes(q)) return false
      return true
    })
  }, [zonesOfMap, traffic, range, query])

  const selected = visible.find(z => z.id === selectedId) ?? visible[0] ?? null
  const mapMeta = dropMaps.find(m => m.id === activeMap)!
  const sourcedCount = zonesOfMap.filter(z => z.trafficBasis === 'official').length

  return (
    <div className="space-y-4">
      <SectionHeader
        tab="dropguide"
        title="نقاط فرود Warzone"
        note={dropGuideNotes.methodFa}
        stats={[
          { label: 'نقشه', value: dropMaps.length },
          { label: 'POI', value: dropZones.length },
          { label: 'در این نقشه', value: zonesOfMap.length },
          { label: 'ترافیک مستند', value: `${sourcedCount}/${zonesOfMap.length}` },
        ]}
      >
        {dropMaps.map(m => (
          <button
            key={m.id}
            onClick={() => {
              setActiveMap(m.id)
              setSelectedId(null)
            }}
            className={`notch flex items-center gap-2 px-3 py-1.5 text-[11.5px] transition-colors ${
              activeMap === m.id
                ? 'bg-cod-gold text-black'
                : 'border border-cod-border bg-cod-card text-gray-400 hover:text-white'
            }`}
          >
            <span className="hud-num">{m.code}</span>
            <span>{m.nameFa}</span>
            <span className={activeMap === m.id ? 'text-black/60' : 'text-gray-600'}>{m.zoneCount}</span>
          </button>
        ))}
      </SectionHeader>

      <div className="hud-frame flex flex-wrap items-end gap-x-4 gap-y-3 bg-cod-panel px-3.5 py-3">
        <label className="flex-1 min-w-[180px]">
          <span className="hud-tag mb-1 block">SEARCH</span>
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="نام نقطه یا توضیح"
            className="w-full border border-cod-border bg-cod-card px-2.5 py-1.5 text-xs text-white placeholder:text-gray-600 focus:border-cod-gold/60 focus:outline-none"
          />
        </label>
        <div>
          <span className="hud-tag mb-1 block">TRAFFIC</span>
          <div className="flex gap-1">
            {TRAFFIC_FILTERS.map(f => (
              <button
                key={f.id}
                onClick={() => setTraffic(f.id)}
                className={`px-2 py-1 text-[11px] transition-colors ${
                  traffic === f.id ? 'bg-cod-gold text-black' : 'border border-cod-border text-gray-400 hover:text-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <span className="hud-tag mb-1 block">RANGE</span>
          <div className="flex gap-1">
            {RANGE_FILTERS.map(f => (
              <button
                key={f.id}
                onClick={() => setRange(f.id)}
                className={`px-2 py-1 text-[11px] transition-colors ${
                  range === f.id ? 'bg-cod-gold text-black' : 'border border-cod-border text-gray-400 hover:text-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="space-y-1.5">
          {visible.map(z => (
            <button
              key={z.id}
              onClick={() => setSelectedId(z.id)}
              className={`notch w-full bg-cod-card px-3 py-2.5 text-right transition-colors ${
                selected?.id === z.id
                  ? 'border-r-2 border-cod-gold bg-cod-gold/5'
                  : 'border-r-2 border-transparent hover:bg-cod-card2'
              }`}
            >
              <div className="mb-1 flex items-baseline justify-between gap-2">
                <span className="text-[13px] font-semibold text-white">{z.nameFa}</span>
                <span className="hud-num text-[10px] text-gray-600">{z.name}</span>
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                <TrafficChip zone={z} />
                <span className="hud-tag text-gray-500">{ENGAGEMENT_FA[z.engagement]}</span>
              </div>
            </button>
          ))}
          {visible.length === 0 && (
            <p className="notch bg-cod-card px-3 py-6 text-center text-xs text-gray-500">
              با این فیلترها نقطه‌ای در {mapMeta.nameFa} نیست.
            </p>
          )}
        </div>

        {selected && (
          <div className="hud-frame space-y-4 bg-cod-panel p-4 lg:col-span-2">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="hud-eyebrow mb-1">
                  <span className="hud-num text-cod-gold">{mapMeta.code}</span>
                  <span className="mx-2 text-cod-border-light">|</span>
                  <span className="hud-num">{selected.id.toUpperCase()}</span>
                </p>
                <h3 className="hud-title text-lg font-bold text-white">{selected.nameFa}</h3>
                <p className="mt-0.5 text-xs text-gray-500">
                  {selected.name} — {mapMeta.nameFa} · {mapMeta.modeFa} · {mapMeta.sizeFa}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                <TrafficChip zone={selected} />
                <span className="hud-tag border border-cod-border px-1.5 py-0.5 text-gray-400">
                  {ENGAGEMENT_FA[selected.engagement]}
                </span>
              </div>
            </div>

            {selected.areaFa && (
              <p className="notch border-r-2 border-cod-sand bg-cod-card px-3 py-2 text-[11.5px] text-gray-300">
                <span className="hud-tag mr-2 text-cod-sand">LOCATION</span>
                {selected.areaFa}
              </p>
            )}

            <p className="text-[13px] leading-relaxed text-gray-300">{selected.summaryFa}</p>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <h4 className="hud-tag mb-2 text-cod-steel">MAP INTEL</h4>
                <ul className="space-y-1.5">
                  {selected.featuresFa.map(f => (
                    <li key={f} className="flex gap-2 text-[12px] leading-relaxed text-gray-400">
                      <span className="mt-[7px] h-1 w-1 shrink-0 bg-cod-gold/70" aria-hidden />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="hud-tag mb-2 text-cod-green">DROP NOTES</h4>
                <ul className="space-y-1.5">
                  {selected.tipsFa.map(t => (
                    <li key={t} className="flex gap-2 text-[12px] leading-relaxed text-gray-300">
                      <span className="hud-num mt-px shrink-0 text-cod-green">›</span>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="text-[11px] text-gray-600">
              مبنای ترافیک این نقطه: {TRAFFIC_BASIS_FA[selected.trafficBasis]}
            </p>
          </div>
        )}
      </div>

      <div className="notch border-r-2 border-cod-red/60 bg-cod-card px-3.5 py-2.5 text-[11.5px] leading-relaxed text-gray-400">
        <span className="hud-tag mr-2 text-cod-red">NO LOOT SCORE</span>
        {dropGuideNotes.lootFa}
      </div>

      <SourceNote kind="verified" source={dropGuideNotes.sourceFa}>
        {dropGuideNotes.trafficFa}
      </SourceNote>
    </div>
  )
}
