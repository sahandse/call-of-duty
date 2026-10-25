'use client'
import { useEffect, useMemo, useState } from 'react'
import {
  armoryItems,
  armoryNotes,
  weeklyRewards,
  SLOT_FA,
  SLOT_ORDER,
  type ArmoryItem,
  type ArmorySlot,
} from '../data/objectives'
import SectionHeader from './SectionHeader'
import SourceNote from './SourceNote'

const STORAGE_KEY = 'cod-armory-unlocked'

type UnlockKind = 'all' | 'default' | 'level' | 'challenges'

const UNLOCK_FILTERS: { id: UnlockKind; label: string }[] = [
  { id: 'all', label: 'همه' },
  { id: 'default', label: 'پیش‌فرض' },
  { id: 'level', label: 'با سطح' },
  { id: 'challenges', label: 'با چالش Armory' },
]

function kindOf(item: ArmoryItem): Exclude<UnlockKind, 'all'> {
  if (item.requires.armoryChallenges) return 'challenges'
  if (item.requires.level) return 'level'
  return 'default'
}

const KIND_CHIP: Record<Exclude<UnlockKind, 'all'>, string> = {
  default: 'border-cod-green/40 bg-cod-green/10 text-cod-green',
  level: 'border-cod-steel/40 bg-cod-steel/10 text-cod-steel',
  challenges: 'border-cod-gold/40 bg-cod-gold/10 text-cod-gold-light',
}

function loadUnlocked(): Set<string> {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    return new Set(Array.isArray(raw) ? raw : [])
  } catch {
    return new Set()
  }
}

export default function ObjectivesSection() {
  const [unlocked, setUnlocked] = useState<Set<string>>(new Set())
  const [slot, setSlot] = useState<'all' | ArmorySlot>('all')
  const [kind, setKind] = useState<UnlockKind>('all')
  const [query, setQuery] = useState('')
  const [hideUnlocked, setHideUnlocked] = useState(false)

  useEffect(() => setUnlocked(loadUnlocked()), [])

  function toggle(id: string) {
    setUnlocked(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(next)))
      return next
    })
  }

  const countBySlot = useMemo(() => {
    const c: Record<ArmorySlot, number> = { tactical: 0, lethal: 0, field_upgrade: 0 }
    armoryItems.forEach(i => (c[i.slot] += 1))
    return c
  }, [])

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return armoryItems.filter(i => {
      if (slot !== 'all' && i.slot !== slot) return false
      if (kind !== 'all' && kindOf(i) !== kind) return false
      if (hideUnlocked && unlocked.has(i.id)) return false
      if (q && !`${i.name} ${i.nameFa} ${i.descriptionFa}`.toLowerCase().includes(q)) return false
      return true
    })
  }, [slot, kind, hideUnlocked, query, unlocked])

  const done = armoryItems.filter(i => unlocked.has(i.id)).length

  return (
    <div className="space-y-4">
      <SectionHeader
        tab="objectives"
        title="آزادسازی تجهیزات و پاداش‌های فصل"
        note={armoryNotes.howItWorksFa}
        stats={[
          { label: 'تجهیزات', value: armoryItems.length },
          { label: 'آزادشده', value: `${done}/${armoryItems.length}` },
          { label: 'پاداش هفتگی', value: weeklyRewards.length },
          { label: 'پیشرفت', value: `${Math.round((done / armoryItems.length) * 100)}%` },
        ]}
      />

      <p className="notch border-r-2 border-cod-sand bg-cod-card px-3.5 py-2.5 text-[11.5px] leading-relaxed text-gray-400">
        <span className="hud-tag mr-2 text-cod-sand">HOW THIS WORKS</span>
        {armoryNotes.dailyNoteFa}
      </p>

      <div className="hud-frame space-y-3 bg-cod-panel p-3">
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setSlot('all')}
            className={`px-2.5 py-1 text-[11px] transition-colors ${
              slot === 'all' ? 'bg-cod-gold text-black' : 'border border-cod-border text-gray-400 hover:text-white'
            }`}
          >
            همهٔ اسلات‌ها
          </button>
          {SLOT_ORDER.map(s => (
            <button
              key={s}
              onClick={() => setSlot(s)}
              className={`px-2.5 py-1 text-[11px] transition-colors ${
                slot === s ? 'bg-cod-gold text-black' : 'border border-cod-border text-gray-400 hover:text-white'
              }`}
            >
              {SLOT_FA[s]}
              <span className="hud-num mr-1.5 text-[10px] opacity-70">{countBySlot[s]}</span>
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex gap-1 border border-cod-border bg-cod-card p-0.5">
            {UNLOCK_FILTERS.map(u => (
              <button
                key={u.id}
                onClick={() => setKind(u.id)}
                className={`px-2.5 py-1 text-[11px] transition-colors ${
                  kind === u.id ? 'bg-cod-gold text-black' : 'text-gray-400 hover:text-white'
                }`}
              >
                {u.label}
              </button>
            ))}
          </div>
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="جستجوی تجهیزات…"
            className="min-w-[10rem] flex-1 border border-cod-border bg-cod-card px-3 py-1.5 text-xs text-white placeholder:text-gray-600 focus:border-cod-gold/60 focus:outline-none"
          />
          <label className="flex cursor-pointer items-center gap-1.5 border border-cod-border bg-cod-card px-2.5 py-1.5 text-[11px] text-gray-400">
            <input
              type="checkbox"
              checked={hideUnlocked}
              onChange={() => setHideUnlocked(v => !v)}
              className="h-3 w-3 accent-cod-gold"
            />
            فقط آزاد نشده
          </label>
          <span className="hud-num text-[11px] text-gray-500">{visible.length} مورد</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3">
        {visible.map(item => {
          const isUnlocked = unlocked.has(item.id)
          const k = kindOf(item)
          return (
            <button
              key={item.id}
              onClick={() => toggle(item.id)}
              className={`notch flex flex-col items-start gap-1.5 border p-3 text-right transition-colors ${
                isUnlocked
                  ? 'border-cod-gold/30 bg-cod-card2'
                  : 'border-cod-border bg-cod-card hover:border-cod-border-light'
              }`}
            >
              <div className="flex w-full items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className={`truncate text-sm font-bold ${isUnlocked ? 'text-gray-400 line-through' : 'text-white'}`}>
                    {item.nameFa}
                  </p>
                  <p className="font-mono text-[10px] text-gray-500" dir="ltr">{item.name}</p>
                </div>
                <span
                  className={`shrink-0 border px-1.5 py-0.5 text-[9px] font-bold tracking-wide ${KIND_CHIP[k]}`}
                >
                  {item.requireFa}
                </span>
              </div>
              <p className="text-[11.5px] leading-relaxed text-gray-400">{item.descriptionFa}</p>
              <div className="mt-auto flex w-full items-center justify-between gap-2 pt-1">
                <span className="hud-tag">{SLOT_FA[item.slot]}</span>
                <span className={`hud-num text-[10px] ${isUnlocked ? 'text-cod-gold' : 'text-gray-600'}`}>
                  {isUnlocked ? 'آزاد شده ✓' : 'برای تیک زدن'}
                </span>
              </div>
            </button>
          )
        })}
        {visible.length === 0 && (
          <p className="col-span-full border border-cod-border bg-cod-card px-4 py-10 text-center text-xs text-gray-500">
            موردی با این فیلترها پیدا نشد.
          </p>
        )}
      </div>

      <section className="space-y-2">
        <div className="flex flex-wrap items-end justify-between gap-2 border-b border-cod-border pb-2">
          <h3 className="hud-title text-base text-white">پاداش‌های هفتگی سیزن ۵</h3>
          <span className="hud-tag">{armoryNotes.archiveNoteFa}</span>
        </div>
        <ol className="space-y-1">
          {weeklyRewards.map(w => (
            <li
              key={w.id}
              className="flex flex-wrap items-center gap-x-3 gap-y-1 border-r-2 border-cod-border bg-cod-card px-3 py-2"
            >
              <span className="hud-num w-12 shrink-0 text-xs text-cod-gold-light">
                {`W${String(w.week).padStart(2, '0')}`}
              </span>
              <span className="hud-tag w-24 shrink-0">{w.dateFa}</span>
              <span className="min-w-0 flex-1">
                <span className="block text-xs font-bold text-white">{w.reward}</span>
                <span className="block text-[11px] text-gray-400">{w.rewardFa}</span>
              </span>
              <span className="font-mono text-[10px] text-gray-500" dir="ltr">{w.weapon}</span>
            </li>
          ))}
        </ol>
      </section>

      <SourceNote kind="community" source={armoryNotes.source}>
        هزینهٔ آزادسازی هر تجهیز از فهرست تجهیزات MW3 خوانده شده و عیناً ترجمه شده است. تیک‌ها فقط در همین مرورگر می‌مانند.
      </SourceNote>
    </div>
  )
}
