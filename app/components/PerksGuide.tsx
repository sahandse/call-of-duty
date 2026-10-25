'use client'
import { useMemo, useState } from 'react'
import { comboBuilds, loadoutOptions, LoadoutSlotId, SLOT_ORDER } from '../data/perksData'
import SectionHeader from './SectionHeader'
import SourceNote from './SourceNote'

export default function PerksGuide() {
  const [tab, setTab] = useState<'slots' | 'combos'>('combos')
  const [slot, setSlot] = useState<LoadoutSlotId | 'all'>('all')
  const [query, setQuery] = useState('')

  const byId = useMemo(() => new Map(loadoutOptions.map(o => [o.id, o])), [])

  const visible = useMemo(
    () =>
      loadoutOptions.filter(o => {
        if (slot !== 'all' && o.slot !== slot) return false
        if (query && !`${o.name} ${o.nameFa} ${o.descriptionFa}`.toLowerCase().includes(query.toLowerCase()))
          return false
        return true
      }),
    [slot, query]
  )

  const changed = loadoutOptions.filter(o => o.changedInS5)

  function chip(active: boolean) {
    return `px-3 py-1.5 text-[11px] tracking-wider uppercase border transition-colors ${
      active
        ? 'bg-cod-gold text-black border-cod-gold'
        : 'bg-cod-card text-gray-400 border-cod-border hover:text-white hover:border-cod-gold/40'
    }`
  }

  return (
    <div className="space-y-5">
      <SectionHeader
        tab="perks"
        title="پرک‌ها و لودآوت"
        note="سیستم MW3 پنج اسلات است: جلیقه، دستکش، چکمه، Gear و ارتقای میدانی. همه‌ی گزینه‌ها اینجا فهرست شده‌اند."
        stats={[
          { label: 'گزینه', value: loadoutOptions.length },
          { label: 'ترکیب آماده', value: comboBuilds.length },
          { label: 'تغییر سیزن ۵', value: changed.length },
        ]}
      />

      <SourceNote kind="verified" source="Uplix / Game8 + یادداشت‌های رسمی سیزن ۵">
        توضیح اثرها بر اساس فهرست رسمی گزینه‌های لودآوت است. هرجا تغییر سیزن ۵ مستند بوده، همان عدد کنار گزینه
        آمده؛ بقیه گزینه‌ها در پچ‌های این سیزن دست نخورده‌اند.
      </SourceNote>

      <div className="flex flex-wrap gap-2">
        <button className={chip(tab === 'combos')} onClick={() => setTab('combos')}>
          ترکیب‌های آماده
        </button>
        <button className={chip(tab === 'slots')} onClick={() => setTab('slots')}>
          فهرست گزینه‌ها
        </button>
      </div>

      {tab === 'combos' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {comboBuilds.map(build => {
            const vest = byId.get(build.vest)
            const gloves = byId.get(build.gloves)
            const boots = byId.get(build.boots)
            const gear = build.gear.map(id => byId.get(id)).filter(Boolean)
            const fu = byId.get(build.fieldUpgrade)
            return (
              <article key={build.id} className="hud-frame bg-cod-card p-4 space-y-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="hud-tag">{build.styleFa}</span>
                  </div>
                  <h3 className="text-white font-bold text-lg leading-none">{build.nameFa}</h3>
                </div>

                <div className="space-y-1.5">
                  {[
                    { label: 'VEST', value: vest },
                    { label: 'GLOVES', value: gloves },
                    { label: 'BOOTS', value: boots },
                    ...gear.map((g, i) => ({ label: i === 0 ? 'GEAR' : 'GEAR +', value: g })),
                    { label: 'FIELD UP', value: fu },
                  ].map((row, i) =>
                    row.value ? (
                      <div key={i} className="flex items-baseline gap-3 border-b border-cod-border/60 pb-1">
                        <span className="hud-tag w-16 flex-shrink-0">{row.label}</span>
                        <div className="min-w-0">
                          <p className="text-white text-sm leading-tight">{row.value.name}</p>
                          <p className="text-gray-500 text-[11px]">{row.value.nameFa}</p>
                        </div>
                      </div>
                    ) : null
                  )}
                </div>

                <div>
                  <p className="hud-eyebrow mb-1">چرا کار می‌کند</p>
                  <p className="text-gray-300 text-xs leading-relaxed">{build.whyFa}</p>
                </div>

                {build.s5NoteFa && (
                  <div className="border-r-2 border-cod-gold/60 bg-cod-gold/5 px-3 py-2">
                    <p className="hud-eyebrow text-cod-gold mb-0.5">تغییر سیزن ۵</p>
                    <p className="text-gray-400 text-[11px] leading-relaxed">{build.s5NoteFa}</p>
                  </div>
                )}
              </article>
            )
          })}
        </div>
      )}

      {tab === 'slots' && (
        <div className="space-y-4">
          <div className="hud-frame bg-cod-panel p-4 space-y-3">
            <div className="flex flex-wrap gap-2">
              <button className={chip(slot === 'all')} onClick={() => setSlot('all')}>
                همه
              </button>
              {SLOT_ORDER.map(s => (
                <button key={s.id} className={chip(slot === s.id)} onClick={() => setSlot(s.id)}>
                  {s.labelFa}
                </button>
              ))}
            </div>
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="جستجو در گزینه‌ها…"
              className="w-full bg-cod-card border border-cod-border px-3 py-2 text-xs text-white focus:outline-none focus:border-cod-gold/60"
            />
            <p className="text-gray-500 text-xs">{visible.length} گزینه</p>
          </div>

          {SLOT_ORDER.filter(s => slot === 'all' || s.id === slot).map(s => {
            const rows = visible.filter(o => o.slot === s.id)
            if (rows.length === 0) return null
            const changedCount = rows.filter(o => o.changedInS5).length
            return (
              <section key={s.id} className="space-y-2">
                <div className="flex items-center gap-3">
                  <h3 className="hud-title text-sm">
                    {s.label} <span className="text-gray-500 text-xs">· {s.labelFa}</span>
                  </h3>
                  <div className="flex-1 h-px bg-cod-border" />
                  <span className="hud-tag">{rows.length} گزینه</span>
                  {changedCount > 0 && (
                    <span className="hud-num text-[10px] text-cod-gold border border-cod-gold/30 px-1.5">
                      {changedCount} تغییر S5
                    </span>
                  )}
                </div>
                <p className="text-gray-500 text-xs">{s.noteFa}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
                  {rows.map(o => (
                    <div
                      key={o.id}
                      className={`bg-cod-card border p-3 ${
                        o.changedInS5 ? 'border-cod-gold/40' : 'border-cod-border'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="text-white text-sm font-medium leading-tight">{o.name}</p>
                          <p className="text-gray-500 text-[11px]">{o.nameFa}</p>
                        </div>
                        {o.changedInS5 && (
                          <span className="hud-num text-[9px] text-cod-gold border border-cod-gold/40 px-1 flex-shrink-0">
                            S5
                          </span>
                        )}
                      </div>
                      <p className="text-gray-400 text-xs mt-1.5 leading-relaxed">{o.descriptionFa}</p>
                      <p className="text-gray-600 text-[11px] mt-1">{o.slotsFa}</p>
                      {o.synergyFa && (
                        <p className="text-cod-green text-[11px] mt-1.5 leading-relaxed">⌁ {o.synergyFa}</p>
                      )}
                      {o.changedInS5 && (
                        <p className="text-cod-gold text-[11px] mt-1.5 leading-relaxed border-t border-cod-border pt-1.5">
                          {o.changedInS5}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )
          })}

          {visible.length === 0 && (
            <div className="hud-frame bg-cod-card p-8 text-center text-gray-500 text-sm">
              گزینه‌ای با این فیلتر پیدا نشد.
            </div>
          )}
        </div>
      )}
    </div>
  )
}
