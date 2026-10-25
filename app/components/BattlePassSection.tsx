'use client'
import { useEffect, useMemo, useState } from 'react'
import { battlePassMeta, battlePassSectors } from '../data/battlePassData'
import { BattlePassReward } from '../types'
import SectionHeader from './SectionHeader'
import SourceNote from './SourceNote'

const STORAGE_KEY = 'cod-battlepass-unlocked'

const KIND_LABEL: Record<BattlePassReward['kind'], string> = {
  operator_skin: 'OPERATOR',
  blueprint: 'BLUEPRINT',
  weapon: 'NEW WEAPON',
  finishing_move: 'FM',
  cod_points: 'CP',
  boost: 'BOOST',
  other: 'OTHER',
}

interface Collectible {
  key: string
  sectorLabel: string
  reward: BattlePassReward
}

const collectibles: Collectible[] = battlePassSectors.flatMap((sector) => {
  const items: BattlePassReward[] = sector.operator ? [sector.operator, ...sector.rewards] : sector.rewards
  return items.map((reward, i) => ({
    key: `${sector.id}#${i}`,
    sectorLabel: sector.label,
    reward,
  }))
})

function loadUnlocked(): Set<string> {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    return new Set(Array.isArray(stored) ? stored.map(String) : [])
  } catch {
    return new Set()
  }
}

type FilterId = 'all' | 'operator' | 'blueprint' | 'weapon' | 'unlocked'

export default function BattlePassSection() {
  const [unlocked, setUnlocked] = useState<Set<string>>(new Set())
  const [filter, setFilter] = useState<FilterId>('all')
  const [showBlackCell, setShowBlackCell] = useState(true)

  useEffect(() => setUnlocked(loadUnlocked()), [])

  const toggle = (key: string) => {
    setUnlocked((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(next)))
      return next
    })
  }

  const sectors = useMemo(
    () => battlePassSectors.filter((s) => (showBlackCell ? true : s.sector !== 'blackcell')),
    [showBlackCell],
  )

  const visible = sectors.map((sector) => {
    const items: BattlePassReward[] = sector.operator ? [sector.operator, ...sector.rewards] : sector.rewards
    const filteredItems = items.filter((r) => {
      if (filter === 'all' || filter === 'unlocked') return true
      if (filter === 'operator') return r.kind === 'operator_skin'
      if (filter === 'blueprint') return r.kind === 'blueprint'
      return r.kind === 'weapon'
    })
    return { sector, items: filteredItems, allItems: items }
  }).filter((s) => s.items.length > 0)

  const pct = Math.round((unlocked.size / collectibles.length) * 100)

  return (
    <div className="space-y-5">
      <SectionHeader
        tab="battlepass"
        en="BATTLE PASS ARCHIVE"
        title="پاس نبرد سیزن ۵ — ۲۰ بخش"
        note="ساختار پاس در سیزن ۵ «Sector» بود، نه تیرهای ۱ تا ۱۰۰: بیست بخش، یک بخش آنی با خرید پاس، یک بخش BlackCell و یک بخش تکمیل. فهرست زیر فقط آیتم‌هایی است که در مقالهٔ رسمی سیزن نام برده شده‌اند."
        stats={[
          { label: 'REWARDS', value: battlePassMeta.rewardCount },
          { label: 'SECTORS', value: battlePassMeta.sectorCount },
          { label: 'PRICE', value: `${battlePassMeta.premiumPriceCp} CP` },
          { label: 'CP BACK', value: `تا ${battlePassMeta.maxCpReturn}` },
        ]}
      />

      <div className="notch grid grid-cols-2 gap-px border border-cod-border bg-cod-border sm:grid-cols-4">
        {[
          { k: 'LAUNCH', v: battlePassMeta.liveFrom },
          { k: 'RELOADED', v: battlePassMeta.reloadedOn },
          { k: 'LAST EVENT', v: battlePassMeta.lastEventEnds },
          { k: 'BLUEPRINTS', v: `${battlePassMeta.blueprintCount} در پاس` },
        ].map((cell) => (
          <div key={cell.k} className="bg-cod-card px-3 py-2.5">
            <p className="hud-tag text-gray-500">{cell.k}</p>
            <p className="hud-num mt-0.5 text-sm text-cod-gold-light">{cell.v}</p>
          </div>
        ))}
      </div>

      <div className="relative notch border border-cod-border bg-cod-card p-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="hud-tag text-cod-sand">TRACKER — محلی روی همین مرورگر</span>
          <span className="hud-num text-cod-gold-light">
            {unlocked.size} / {collectibles.length}
          </span>
        </div>
        <div className="h-1.5 w-full bg-cod-card2">
          <div
            className="h-full bg-gradient-to-l from-cod-gold to-cod-gold-light transition-all duration-300"
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {(
            [
              { id: 'all', label: 'همه' },
              { id: 'operator', label: 'OPERATOR' },
              { id: 'blueprint', label: 'BLUEPRINT' },
              { id: 'weapon', label: 'WEAPONS' },
              { id: 'unlocked', label: 'بازشده' },
            ] as { id: FilterId; label: string }[]
          ).map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              aria-pressed={filter === f.id}
              className={`hud-tag border px-2.5 py-1 transition-colors ${
                filter === f.id
                  ? 'border-cod-gold bg-cod-gold text-black'
                  : 'border-cod-border bg-cod-bg text-gray-400 hover:text-white'
              }`}
            >
              {f.label}
            </button>
          ))}
          <button
            onClick={() => setShowBlackCell((v) => !v)}
            aria-pressed={showBlackCell}
            className={`hud-tag border px-2.5 py-1 transition-colors ${
              showBlackCell ? 'border-yellow-500/60 text-yellow-300' : 'border-cod-border text-gray-500'
            }`}
          >
            BLACKCELL
          </button>
          <div className="mr-auto flex gap-2">
            <button
              onClick={() => {
                const all = new Set(collectibles.map((c) => c.key))
                setUnlocked(all)
                localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(all)))
              }}
              className="btn-ghost px-2.5 py-1"
            >
              انتخاب همه
            </button>
            <button
              onClick={() => {
                setUnlocked(new Set())
                localStorage.setItem(STORAGE_KEY, JSON.stringify([]))
              }}
              className="btn-ghost px-2.5 py-1"
            >
              پاک کردن
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {visible.map(({ sector, items, allItems }) => (
          <section key={sector.id} className="notch border border-cod-border bg-cod-card">
            <header className="flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-cod-border px-4 py-3">
              <span
                className={`hud-num text-lg ${
                  sector.sector === 'blackcell' ? 'text-yellow-300' : 'text-cod-gold'
                }`}
              >
                {typeof sector.sector === 'number' ? String(sector.sector).padStart(2, '0') : '★'}
              </span>
              <div className="min-w-0">
                <h3 className="hud-tag text-white">{sector.label}</h3>
                <p className="text-[11px] text-gray-500">{sector.labelFa}</p>
              </div>
              <span className="mr-auto hud-tag text-gray-500">
                {allItems.filter((r) => unlocked.has(`${sector.id}#${allItems.indexOf(r)}`)).length}/{allItems.length}
              </span>
            </header>

            {sector.noteFa && (
              <p className="border-b border-cod-border bg-cod-bg px-4 py-2.5 text-[11.5px] leading-relaxed text-gray-400">
                {sector.noteFa}
              </p>
            )}

            <ul className="divide-y divide-cod-border/60">
              {items.map((reward) => {
                const key = `${sector.id}#${allItems.indexOf(reward)}`
                const isOn = unlocked.has(key)
                return (
                  <li key={key}>
                    <button
                      onClick={() => toggle(key)}
                      aria-pressed={isOn}
                      className="flex w-full items-start gap-3 px-4 py-3 text-right hover:bg-cod-card2"
                    >
                      <span
                        className={`mt-0.5 grid h-4 w-4 shrink-0 place-items-center border text-[10px] ${
                          isOn ? 'border-cod-gold bg-cod-gold text-black' : 'border-cod-border-light text-transparent'
                        }`}
                        aria-hidden
                      >
                        ✓
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex flex-wrap items-baseline gap-x-2">
                          <span className={`text-[13.5px] font-bold ${isOn ? 'text-white' : 'text-gray-300'}`}>
                            {reward.name}
                          </span>
                          <span
                            className={`hud-tag text-[9px] ${
                              reward.kind === 'weapon'
                                ? 'text-cod-red'
                                : reward.kind === 'operator_skin'
                                  ? 'text-cod-sand'
                                  : 'text-cod-steel'
                            }`}
                          >
                            {KIND_LABEL[reward.kind]}
                          </span>
                        </span>
                        <span className="mt-0.5 block text-[12px] text-gray-400">{reward.nameFa}</span>
                        {reward.detailFa && (
                          <span className="mt-1 block text-[11.5px] leading-relaxed text-gray-500">{reward.detailFa}</span>
                        )}
                        {reward.blackCell && (
                          <span className="mt-1.5 block border-r-2 border-yellow-500/50 bg-yellow-500/5 px-2.5 py-1 text-[11px] leading-relaxed text-yellow-200/90">
                            BlackCell: {reward.blackCell}
                          </span>
                        )}
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </section>
        ))}
      </div>

      <section className="notch border border-cod-border bg-cod-panel p-4">
        <h3 className="hud-tag mb-2 text-cod-sand">پاداش‌های متداول در Sectorها</h3>
        <ul className="space-y-1.5">
          {battlePassMeta.commonRewards.map((line) => (
            <li key={line} className="flex gap-2.5 text-[12.5px] leading-relaxed text-gray-300">
              <span className="mt-1.5 h-px w-3 shrink-0 bg-cod-border-light" aria-hidden />
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </section>

      <SourceNote kind="warning" source="منبع: مقالهٔ رسمی «Season 5 BlackCell, Battle Pass, and Bundles» — ژوئیه ۲۰۲۴">
        مقالهٔ رسمی نام آیتم‌های شاخص هر Sector را می‌شمارد، اما فهرست کامل ۱۰۰+ پاداش (مثلاً مقدار دقیق هر XP توکن یا
        جای کارت‌های ویزیت در بخش‌ها) را منتشر نکرده است. پس آنچه می‌بینید فهرست مستندِ آیتم‌های نام‌برده‌شده است، نه
        شبیه‌سازی کامل مسیر پاس. پیشرفت علامت‌زده‌شده فقط در مرورگر شما ذخیره می‌شود.
      </SourceNote>
    </div>
  )
}
