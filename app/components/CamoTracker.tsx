'use client'
import { useEffect, useMemo, useState } from 'react'
import { camoWeapons } from '../data/camoData'
import { CamoWeapon } from '../types'
import { CLASS_LABELS, CLASS_ORDER } from '../lib/weaponLabels'
import SectionHeader from './SectionHeader'
import SourceNote from './SourceNote'

type CamoTier = CamoWeapon['challenges'][number]['tier']

const TIERS: { id: CamoTier; label: string; fa: string; chip: string; dot: string }[] = [
  { id: 'base', label: 'BASE', fa: 'پایه', chip: 'text-cod-sand border-cod-sand/40 bg-cod-sand/10', dot: 'bg-cod-sand' },
  { id: 'gilded', label: 'GILDED', fa: 'گیلدِد', chip: 'text-cod-gold border-cod-gold/40 bg-cod-gold/10', dot: 'bg-cod-gold' },
  { id: 'forged', label: 'FORGED', fa: 'فورجِد', chip: 'text-cod-steel border-cod-steel/40 bg-cod-steel/10', dot: 'bg-cod-steel' },
  { id: 'priceless', label: 'PRICELESS', fa: 'پرایس‌لس', chip: 'text-cod-green border-cod-green/40 bg-cod-green/10', dot: 'bg-cod-green' },
  { id: 'interstellar', label: 'INTERSTELLAR', fa: 'اینتراستلار', chip: 'text-purple-300 border-purple-500/40 bg-purple-500/10', dot: 'bg-purple-400' },
]

const TIER_BY_ID = Object.fromEntries(TIERS.map(t => [t.id, t])) as Record<CamoTier, (typeof TIERS)[number]>
const STORAGE_KEY = 'cod-camo-completed'

function loadCompleted(): Set<string> {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    return new Set(Array.isArray(raw) ? raw : [])
  } catch {
    return new Set()
  }
}

export default function CamoTracker() {
  const [completed, setCompleted] = useState<Set<string>>(new Set())
  const [selectedId, setSelectedId] = useState(camoWeapons[0]?.id ?? '')
  const [classFilter, setClassFilter] = useState<'all' | CamoWeapon['class']>('all')
  const [tierFilter, setTierFilter] = useState<'all' | CamoTier>('all')
  const [query, setQuery] = useState('')

  useEffect(() => setCompleted(loadCompleted()), [])

  function toggle(id: string) {
    setCompleted(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(next)))
      return next
    })
  }

  const weapons = useMemo(() => {
    const q = query.trim().toLowerCase()
    return camoWeapons.filter(w => {
      if (classFilter !== 'all' && w.class !== classFilter) return false
      if (q && !w.name.toLowerCase().includes(q)) return false
      return true
    })
  }, [classFilter, query])

  const selected = camoWeapons.find(w => w.id === selectedId) ?? weapons[0]

  const stats = useMemo(() => {
    const all = camoWeapons.flatMap(w => w.challenges)
    const done = all.filter(c => completed.has(c.id)).length
    const interstellar = camoWeapons.filter(w => w.challenges.every(c => completed.has(c.id))).length
    const gilded = camoWeapons.filter(w => {
      const upToGilded = w.challenges.filter(c => c.tier !== 'forged' && c.tier !== 'priceless' && c.tier !== 'interstellar')
      return upToGilded.length > 0 && upToGilded.every(c => completed.has(c.id))
    }).length
    return { done, total: all.length, interstellar, gilded }
  }, [completed])

  if (camoWeapons.length === 0) return null

  return (
    <div className="space-y-4">
      <SectionHeader
        tab="camo"
        title="تراکر کامو"
        note="مسیر هر سلاح: چهار کاموی پایه، سپس Gilded، Forged، Priceless و در پایان Interstellar. پیشرفت فقط در همین مرورگر ذخیره می‌شود."
        stats={[
          { label: 'چالش‌ها', value: `${stats.done}/${stats.total}` },
          { label: 'سلاح‌ها', value: camoWeapons.length },
          { label: 'Gilded', value: stats.gilded },
          { label: 'Interstellar', value: stats.interstellar },
        ]}
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[300px_minmax(0,1fr)]">
        <aside className="space-y-3">
          <div className="space-y-2 bg-cod-card p-3">
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="جستجوی سلاح…"
              className="w-full border border-cod-border bg-cod-card2 px-3 py-1.5 text-xs text-white placeholder:text-gray-600 focus:border-cod-gold/60 focus:outline-none"
            />
            <div className="flex flex-wrap gap-1">
              <button
                onClick={() => setClassFilter('all')}
                className={`px-2 py-0.5 text-[11px] transition-colors ${
                  classFilter === 'all' ? 'bg-cod-gold text-black' : 'border border-cod-border text-gray-400 hover:text-white'
                }`}
              >
                همه
              </button>
              {CLASS_ORDER.map(c => (
                <button
                  key={c}
                  onClick={() => setClassFilter(c)}
                  className={`px-2 py-0.5 text-[11px] transition-colors ${
                    classFilter === c ? 'bg-cod-gold text-black' : 'border border-cod-border text-gray-400 hover:text-white'
                  }`}
                >
                  {CLASS_LABELS[c]}
                </button>
              ))}
            </div>
          </div>

          <div className="max-h-[26rem] space-y-1 overflow-y-auto pl-1 lg:max-h-[calc(100vh-19rem)]">
            {weapons.map(w => {
              const done = w.challenges.filter(c => completed.has(c.id)).length
              const pct = Math.round((done / w.challenges.length) * 100)
              const active = selected?.id === w.id
              return (
                <button
                  key={w.id}
                  onClick={() => setSelectedId(w.id)}
                  className={`w-full px-3 py-2 text-right transition-colors ${
                    active ? 'border-r-2 border-cod-gold bg-cod-card2' : 'border-r-2 border-transparent bg-cod-card hover:bg-cod-card2'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-xs font-medium ${active ? 'text-white' : 'text-gray-300'}`}>{w.name}</span>
                    <span className={`hud-num text-[10px] ${pct === 100 ? 'text-cod-green' : 'text-gray-500'}`}>
                      {done}/{w.challenges.length}
                    </span>
                  </div>
                  <div className="mt-1 h-0.5 bg-cod-border">
                    <div className={`h-full ${pct === 100 ? 'bg-cod-green' : 'bg-cod-gold/70'}`} style={{ width: `${pct}%` }} />
                  </div>
                </button>
              )
            })}
            {weapons.length === 0 && <p className="px-3 py-6 text-center text-xs text-gray-500">سلاحی پیدا نشد.</p>}
          </div>
        </aside>

        {selected && (
          <section className="space-y-3">
            <div className="flex flex-wrap items-end justify-between gap-3 border-b border-cod-border pb-3">
              <div>
                <p className="hud-tag">{selected.classFa}</p>
                <h3 className="hud-title mt-0.5 text-lg text-white">{selected.name}</h3>
              </div>
              <div className="flex flex-wrap gap-1">
                {TIERS.map(t => (
                  <button
                    key={t.id}
                    onClick={() => setTierFilter(tierFilter === t.id ? 'all' : t.id)}
                    className={`px-2 py-0.5 text-[10px] font-bold tracking-wider transition-colors ${
                      tierFilter === t.id ? 'bg-white text-black' : `border ${t.chip}`
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
                {tierFilter !== 'all' && (
                  <button
                    onClick={() => setTierFilter('all')}
                    className="px-2 py-0.5 text-[10px] text-gray-400 hover:text-white"
                  >
                    ✕ همه
                  </button>
                )}
              </div>
            </div>

            <ol className="space-y-1.5">
              {selected.challenges.map((c, i) => {
                const tier = TIER_BY_ID[c.tier]
                const isDone = completed.has(c.id)
                if (tierFilter !== 'all' && c.tier !== tierFilter) return null
                return (
                  <li key={c.id}>
                    <label
                      className={`flex cursor-pointer items-start gap-3 border px-3 py-2.5 transition-colors ${
                        isDone ? 'border-cod-gold/25 bg-cod-card2' : 'border-cod-border bg-cod-card hover:border-cod-border-light'
                      }`}
                    >
                      <input type="checkbox" className="sr-only" checked={isDone} onChange={() => toggle(c.id)} />
                      <span
                        className={`mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center border-2 text-[10px] font-black transition-colors ${
                          isDone ? 'border-cod-gold bg-cod-gold text-black' : 'border-cod-border-light text-transparent'
                        }`}
                      >
                        ✓
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                          <span className={`text-[10px] ${isDone ? 'text-gray-600' : 'text-gray-500'}`}>
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <span className={`text-sm font-bold ${isDone ? 'text-gray-400 line-through' : 'text-white'}`}>
                            {c.camo}
                          </span>
                          <span className={`border px-1.5 text-[10px] font-bold tracking-wide ${tier.chip}`}>{tier.label}</span>
                        </span>
                        <span className="mt-1 block text-xs text-gray-400">{c.descFa}</span>
                        <span className="mt-0.5 block font-mono text-[10px] text-gray-600" dir="ltr">
                          {c.rawEn}
                        </span>
                      </span>
                    </label>
                  </li>
                )
              })}
            </ol>

            <SourceNote kind="archive" source="TheGamer — How To Unlock Every Multiplayer Weapon Camo In Call Of Duty: Modern Warfare 3 (۲۱ سپتامبر ۲۰۲۴)">
              شرایط هر کامو از فهرست بایگانی‌شدهٔ سیزن ۶ نقل شده است؛ تعداد دقیق در بازی ممکن است پس از آن تاریخ تغییر کرده باشد.
            </SourceNote>
          </section>
        )}
      </div>
    </div>
  )
}
