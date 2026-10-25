'use client'
import { useEffect, useMemo, useState } from 'react'
import {
  collectionItems,
  collectionMeta,
  CATEGORY_FA,
  CATEGORY_ORDER,
  ORIGIN_FA,
  type CollectionCategory,
  type CollectionOrigin,
} from '../data/collectionData'
import SectionHeader from './SectionHeader'
import SourceNote from './SourceNote'

const STORAGE_KEY = 'cod-collection'

const ORIGINS: CollectionOrigin[] = ['battle_pass', 'blackcell', 'store', 'weekly']

function readOwned(): Set<string> {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    const valid = new Set(collectionItems.map(i => i.id))
    const list = Array.isArray(raw) ? raw.filter((id: string) => valid.has(id)) : []
    return new Set(list)
  } catch {
    return new Set()
  }
}

export default function CollectionTracker() {
  const [owned, setOwned] = useState<Set<string>>(new Set())
  const [category, setCategory] = useState<CollectionCategory | 'all'>('all')
  const [origin, setOrigin] = useState<CollectionOrigin | 'all'>('all')
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<'all' | 'owned' | 'missing'>('all')

  useEffect(() => setOwned(readOwned()), [])

  function toggle(id: string) {
    setOwned(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(next)))
      return next
    })
  }

  const byCategory = useMemo(() => {
    const c = {} as Record<CollectionCategory, { total: number; owned: number }>
    CATEGORY_ORDER.forEach(k => (c[k] = { total: 0, owned: 0 }))
    collectionItems.forEach(i => {
      c[i.category].total += 1
      if (owned.has(i.id)) c[i.category].owned += 1
    })
    return c
  }, [owned])

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return collectionItems.filter(i => {
      if (category !== 'all' && i.category !== category) return false
      if (origin !== 'all' && i.origin !== origin) return false
      if (status === 'owned' && !owned.has(i.id)) return false
      if (status === 'missing' && owned.has(i.id)) return false
      if (q && !`${i.name} ${i.nameFa} ${i.originFa}`.toLowerCase().includes(q)) return false
      return true
    })
  }, [category, origin, status, query, owned])

  const totalOwned = collectionItems.filter(i => owned.has(i.id)).length
  const pct = Math.round((totalOwned / collectionItems.length) * 100)

  return (
    <div className="space-y-4">
      <SectionHeader
        tab="collection"
        title="ردیاب کالکشن سیزن ۵"
        note={collectionMeta.noteFa}
        stats={[
          { label: 'آیتم', value: collectionItems.length },
          { label: 'دارم', value: totalOwned },
          { label: 'کم دارم', value: collectionItems.length - totalOwned },
          { label: 'پیشرفت', value: `${pct}%` },
        ]}
      >
        <div className="w-full">
          <div className="h-1 w-full bg-cod-card2">
            <div className="h-full bg-cod-gold transition-all" style={{ width: `${pct}%` }} />
          </div>
        </div>
      </SectionHeader>

      <div className="hud-frame space-y-3 bg-cod-panel p-3">
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setCategory('all')}
            className={`px-2.5 py-1 text-[11px] transition-colors ${
              category === 'all' ? 'bg-cod-gold text-black' : 'border border-cod-border text-gray-400 hover:text-white'
            }`}
          >
            همهٔ دسته‌ها
          </button>
          {CATEGORY_ORDER.map(c => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-2.5 py-1 text-[11px] transition-colors ${
                category === c ? 'bg-cod-gold text-black' : 'border border-cod-border text-gray-400 hover:text-white'
              }`}
            >
              {CATEGORY_FA[c]}
              <span className="hud-num mr-1.5 text-[10px] opacity-70">
                {byCategory[c].owned}/{byCategory[c].total}
              </span>
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={origin}
            onChange={e => setOrigin(e.target.value as CollectionOrigin | 'all')}
            className="border border-cod-border bg-cod-card2 px-2.5 py-1.5 text-[11px] text-white focus:border-cod-gold/60 focus:outline-none"
          >
            <option value="all">همهٔ منابع</option>
            {ORIGINS.map(o => (
              <option key={o} value={o}>{ORIGIN_FA[o]}</option>
            ))}
          </select>
          <div className="flex gap-1 border border-cod-border bg-cod-card p-0.5">
            {(
              [
                ['all', 'همه'],
                ['owned', 'دارم'],
                ['missing', 'کم دارم'],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                onClick={() => setStatus(id)}
                className={`px-2.5 py-1 text-[11px] transition-colors ${
                  status === id ? 'bg-cod-gold text-black' : 'text-gray-400 hover:text-white'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="جستجو در کالکشن…"
            className="min-w-[10rem] flex-1 border border-cod-border bg-cod-card2 px-3 py-1.5 text-xs text-white placeholder:text-gray-600 focus:border-cod-gold/60 focus:outline-none"
          />
          <span className="hud-num text-[11px] text-gray-500">{visible.length} آیتم</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3">
        {visible.map(item => {
          const has = owned.has(item.id)
          return (
            <button
              key={item.id}
              onClick={() => toggle(item.id)}
              className={`notch flex flex-col items-start gap-1 border p-3 text-right transition-colors ${
                has ? 'border-cod-gold/30 bg-cod-card2' : 'border-cod-border bg-cod-card hover:border-cod-border-light'
              }`}
            >
              <div className="flex w-full items-start justify-between gap-2">
                <p className={`text-[13px] font-bold leading-snug ${has ? 'text-gray-400' : 'text-white'}`}>{item.nameFa}</p>
                <span className={`shrink-0 border px-1.5 text-[9px] font-bold tracking-wide ${has ? 'border-cod-gold/50 text-cod-gold' : 'border-cod-border text-gray-600'}`}>
                  {has ? 'OWNED' : '—'}
                </span>
              </div>
              <p className="font-mono text-[10px] text-gray-500" dir="ltr">{item.name}</p>
              {item.detailFa && <p className="mt-0.5 text-[11px] leading-relaxed text-gray-400">{item.detailFa}</p>}
              <div className="mt-auto flex w-full flex-wrap items-center gap-x-2 gap-y-1 pt-1.5">
                <span className="hud-tag">{CATEGORY_FA[item.category]}</span>
                <span className="hud-tag text-cod-sand">{ORIGIN_FA[item.origin]}</span>
                <span className="mr-auto text-[10px] text-gray-600">{item.originFa}</span>
              </div>
            </button>
          )
        })}
        {visible.length === 0 && (
          <p className="col-span-full border border-cod-border bg-cod-card px-4 py-10 text-center text-xs text-gray-500">
            آیتمی با این فیلترها پیدا نشد.
          </p>
        )}
      </div>

      <SourceNote kind="archive" source="یادداشت‌های سیزن ۵ (Activision) + بایگانی شاپ و پاداش‌های هفتگی">
        هر آیتم از سه فهرست مستند ساخته می‌شود: بخش‌های پاس نبرد، بایگانی شاپ و جوایز چالش‌های هفتگی. اگر آیتمی را در بازی
        باز نکرده‌اید، علامتش را نزنید — این فهرست جای هیچ‌کدام را پر نمی‌کند.
      </SourceNote>
    </div>
  )
}
