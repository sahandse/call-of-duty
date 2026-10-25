'use client'
import { useState, useMemo } from 'react'
import { mapsData } from '../data/mapsData'
import SectionHeader from './SectionHeader'
import SourceNote from './SourceNote'

type GameFilter = 'all' | 'warzone' | 'mw3'
type SizeFilter = 'all' | 'کوچک' | 'متوسط' | 'بزرگ' | 'عظیم'

const SIZES: SizeFilter[] = ['all', 'کوچک', 'متوسط', 'بزرگ', 'عظیم']

export default function MapsSection() {
  const [gameFilter, setGameFilter] = useState<GameFilter>('all')
  const [sizeFilter, setSizeFilter] = useState<SizeFilter>('all')
  const [expandedMap, setExpandedMap] = useState<string | null>(null)

  const filtered = useMemo(
    () =>
      mapsData.filter((m) => {
        if (gameFilter !== 'all' && m.game !== gameFilter) return false
        if (sizeFilter !== 'all' && m.size !== sizeFilter) return false
        return true
      }),
    [gameFilter, sizeFilter],
  )

  return (
    <div className="space-y-5">
      <SectionHeader
        tab="maps"
        en="MAP BRIEFINGS"
        title="نقشه‌ها"
        note="فهرست بر پایهٔ نقشه‌های ذکرشده در یادداشت‌های رسمی سیزن ۵ و ریلُود آن (ژوئیه–سپتامبر ۲۰۲۴). برچسب ARCHIVE یعنی نقشه در آن بازه در روتیشن بوده اما جزئیات آن از منابع رسمی این سیزن نیامده است."
        stats={[
          { label: 'MAPS', value: mapsData.length },
          { label: 'WARZONE', value: mapsData.filter((m) => m.game === 'warzone').length },
          { label: 'S05 NEW', value: mapsData.filter((m) => m.addedIn.startsWith('SEASON 05')).length },
        ]}
      />

      <div className="flex flex-wrap items-center gap-2">
        {(
          [
            { id: 'all', label: 'همه' },
            { id: 'warzone', label: 'WARZONE' },
            { id: 'mw3', label: 'MULTIPLAYER' },
          ] as { id: GameFilter; label: string }[]
        ).map((f) => (
          <button
            key={f.id}
            onClick={() => setGameFilter(f.id)}
            aria-pressed={gameFilter === f.id}
            className={`hud-tag border px-3 py-1.5 transition-colors ${
              gameFilter === f.id
                ? 'border-cod-gold bg-cod-gold text-black'
                : 'border-cod-border bg-cod-card text-gray-400 hover:border-cod-gold/50 hover:text-white'
            }`}
          >
            {f.label}
          </button>
        ))}

        <span className="mx-1 h-4 w-px bg-cod-border" aria-hidden />

        <span className="hud-tag text-gray-500">SIZE</span>
        {SIZES.map((s) => (
          <button
            key={s}
            onClick={() => setSizeFilter(s)}
            aria-pressed={sizeFilter === s}
            className={`px-2.5 py-1.5 text-[11.5px] border transition-colors ${
              sizeFilter === s
                ? 'border-cod-gold/60 bg-cod-gold/15 text-cod-gold-light'
                : 'border-cod-border bg-cod-card text-gray-400 hover:text-white'
            }`}
          >
            {s === 'all' ? 'همه' : s}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((map) => {
          const isExpanded = expandedMap === map.id
          return (
            <article
              key={map.id}
              className="notch overflow-hidden border border-cod-border bg-cod-card transition-colors hover:border-cod-gold/40"
            >
              <div className={`border-b border-cod-border bg-gradient-to-bl ${map.accent} p-4`}>
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="hud-tag mb-1 text-cod-gold-light">{map.code}</p>
                    <h3 className="font-display text-lg font-semibold uppercase tracking-wider text-white">
                      {map.name}
                    </h3>
                    <p className="text-xs text-gray-300">{map.nameFa}</p>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-1">
                    <span className="hud-tag border border-cod-border bg-cod-bg/70 px-1.5 py-0.5 text-[9px] text-gray-300">
                      {map.game === 'warzone' ? 'WARZONE' : 'MP'}
                    </span>
                    <span className="hud-tag px-1 text-[9px] text-cod-sand">{map.size}</span>
                    <span className="hud-tag px-1 text-[9px] text-gray-500">{map.addedIn}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 p-4">
                <p className="text-[13px] leading-relaxed text-gray-300">{map.description}</p>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="hud-tag text-gray-500">{map.typeFa}</span>
                  <span
                    className={`hud-tag text-[9px] ${
                      map.provenance === 'official' ? 'text-cod-gold' : 'text-cod-steel'
                    }`}
                  >
                    {map.provenance === 'official' ? 'IN S05 NOTES' : 'ARCHIVE'}
                  </span>
                  <button
                    onClick={() => setExpandedMap(isExpanded ? null : map.id)}
                    aria-expanded={isExpanded}
                    className="mr-auto hud-tag text-cod-gold-light hover:underline"
                  >
                    {isExpanded ? 'پنهان کردن نکات' : `نکات · ${map.tips.length}`}
                  </button>
                </div>

                {isExpanded && (
                  <ul className="space-y-2 border-t border-cod-border pt-3">
                    {map.tips.map((tip, i) => (
                      <li key={i} className="flex gap-2.5 text-[12.5px] leading-relaxed text-gray-300">
                        <span className="hud-num mt-0.5 shrink-0 text-cod-gold/70">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <div className="notch bg-cod-card px-4 py-10 text-center">
          <p className="hud-tag text-gray-500">NO MAPS MATCH THIS FILTER</p>
        </div>
      )}

      <SourceNote kind="archive">
        چیدمان، نام POI و نکته‌های تاکتیکی بازتاب وضعیت بازی در پایان سیزن ۵ (سپتامبر ۲۰۲۴) است. روتیشن نقشه‌ها،
        لوت و ساختار هر نقشه پس از آن عوض شده — این برگه برای یادگیری تاریخچه و سبک بازی است، نه اطلاعات لحظه‌ای.
      </SourceNote>
    </div>
  )
}
