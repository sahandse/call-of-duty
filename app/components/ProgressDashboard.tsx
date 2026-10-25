'use client'
import { useEffect, useMemo, useState } from 'react'
import { camoWeapons } from '../data/camoData'
import { battlePassSectors } from '../data/battlePassData'
import { season5Events } from '../data/eventsData'
import { collectionItems } from '../data/collectionData'
import { armoryItems } from '../data/objectives'
import SectionHeader from './SectionHeader'
import SourceNote from './SourceNote'

interface Stats {
  camoCompleted: number
  camoTotal: number
  armoryDone: number
  armoryTotal: number
  bpUnlocked: number
  bpTotal: number
  bpSectors: number
  loadouts: number
  collectionOwned: number
  collectionTotal: number
  eventsDone: number
  eventsTotal: number
}

function readArray(key: string): unknown[] {
  try {
    const raw = JSON.parse(localStorage.getItem(key) || '[]')
    return Array.isArray(raw) ? raw : []
  } catch {
    return []
  }
}

function StatCard({
  label,
  value,
  max,
  bar,
}: {
  label: string
  value: number
  max: number
  bar: string
}) {
  const pct = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0
  return (
    <div className="hud-frame bg-cod-card p-4">
      <p className="hud-eyebrow mb-2">{label}</p>
      <div className="flex items-end gap-1.5 mb-2">
        <span className="hud-num text-2xl font-black text-white">{value}</span>
        <span className="hud-num text-sm text-gray-600 mb-0.5">/ {max}</span>
      </div>
      <div className="h-1 bg-cod-card2 border border-cod-border">
        <div className={`h-full ${bar}`} style={{ width: `${pct}%` }} />
      </div>
      <p className="hud-num text-[10px] text-gray-600 mt-1">{pct}%</p>
    </div>
  )
}

export default function ProgressDashboard() {
  const [stats, setStats] = useState<Stats | null>(null)

  const totals = useMemo(() => {
    const camoTotal = camoWeapons.reduce((s, w) => s + w.challenges.length, 0)
    const bpTotal = battlePassSectors.reduce((s, sec) => s + sec.rewards.length, 0)
    return {
      camoTotal,
      bpTotal,
      armoryTotal: armoryItems.length,
      collectionTotal: collectionItems.length,
      eventsTotal: season5Events.length,
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const camoCompleted = readArray('cod-camo-completed').length
    const armoryDone = readArray('cod-armory-unlocked').length
    const bpUnlocked = readArray('cod-battlepass-unlocked').length
    const bpSectors = new Set(
      readArray('cod-battlepass-unlocked').map(k => String(k).split('#')[0])
    ).size
    const loadouts = readArray('cod-loadouts').length
    const collectionOwned = readArray('cod-collection').length
    const eventsDone = season5Events.filter(e => localStorage.getItem(`cod-event-${e.id}`) === 'true').length

    setStats({
      camoCompleted,
      camoTotal: totals.camoTotal,
      armoryDone,
      armoryTotal: totals.armoryTotal,
      bpUnlocked,
      bpTotal: totals.bpTotal,
      bpSectors,
      loadouts,
      collectionOwned,
      collectionTotal: totals.collectionTotal,
      eventsDone,
      eventsTotal: totals.eventsTotal,
    })
  }, [totals])

  const overall = useMemo(() => {
    if (!stats) return 0
    const parts = [
      stats.camoTotal > 0 ? stats.camoCompleted / stats.camoTotal : 0,
      stats.armoryTotal > 0 ? stats.armoryDone / stats.armoryTotal : 0,
      stats.bpTotal > 0 ? stats.bpUnlocked / stats.bpTotal : 0,
      stats.collectionTotal > 0 ? stats.collectionOwned / stats.collectionTotal : 0,
      stats.eventsTotal > 0 ? stats.eventsDone / stats.eventsTotal : 0,
    ]
    return Math.round((parts.reduce((a, b) => a + b, 0) / parts.length) * 100)
  }, [stats])

  const tips = [
    'این داشبورد فقط چیزی را می‌خواند که خودت در همان مرورگر علامت زده‌ای — هیچ حسابی به بازی متصل نیست.',
    'سیزن ۵ در ۲۴ ژوئیه ۲۰۲۴ شروع و در ۱۸ سپتامبر ۲۰۲۴ تمام شد؛ همه‌ی بخش‌های «آرشیو» همین بازه را پوشش می‌دهند.',
    'برای دیدن اعداد رسمی بالانس (آسیب، برد، Rate of Fire) تب «پچ‌نوتس» را باز کن.',
    'پنج تراکر کلید ذخیره‌سازی جدا دارند (کامو، Armory، پاس نبرد، کالکشن، رویدادها)؛ پاک کردن داده‌های مرورگر همه را صفر می‌کند.',
  ]

  return (
    <div className="space-y-5">
      <SectionHeader
        tab="dashboard"
        title="داشبورد پیشرفت"
        note="خلاصه‌ی تراکرهای محلی تو — کامو، آزادسازی Armory، پاس نبرد، کالکشن و رویدادهای ثبت‌شده."
        stats={[
          { label: 'کلی', value: `${overall}%` },
          { label: 'لودآوت', value: stats ? stats.loadouts : 0 },
        ]}
      />

      <div className="hud-frame bg-cod-panel p-5">
        <div className="flex items-end justify-between mb-3">
          <div>
            <p className="hud-eyebrow mb-1">پیشرفت کلی</p>
            <p className="text-gray-500 text-xs">میانگین پنج تراکر</p>
          </div>
          <span className="hud-num text-4xl font-black text-cod-gold">{overall}%</span>
        </div>
        <div className="h-2 bg-cod-card2 border border-cod-border">
          <div
            className="h-full bg-gradient-to-l from-cod-gold to-cod-gold-light transition-all"
            style={{ width: `${overall}%` }}
          />
        </div>
      </div>

      {stats ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <StatCard label="چالش‌های کامو" value={stats.camoCompleted} max={stats.camoTotal} bar="bg-cod-gold" />
          <StatCard label="آزادسازی Armory" value={stats.armoryDone} max={stats.armoryTotal} bar="bg-cod-gold-light" />
          <StatCard label="جوایز پاس نبرد" value={stats.bpUnlocked} max={stats.bpTotal} bar="bg-cod-green" />
          <StatCard label="آیتم کالکشن" value={stats.collectionOwned} max={stats.collectionTotal} bar="bg-cod-sand" />
          <StatCard label="رویدادهای ثبت‌شده" value={stats.eventsDone} max={stats.eventsTotal} bar="bg-cod-steel" />
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="hud-frame bg-cod-card h-28 animate-pulse" />
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="hud-frame bg-cod-card p-4">
          <p className="hud-eyebrow mb-2">لودآوت‌ها</p>
          <p className="hud-num text-2xl font-black text-white">
            {stats ? stats.loadouts : 0}
            <span className="text-gray-600 text-sm"> ذخیره‌شده</span>
          </p>
          <p className="text-gray-500 text-xs mt-1">
            لودآوت‌های ساخته‌شده در تب لودآوت‌ساز، فقط روی همین مرورگر نگه داشته می‌شوند.
          </p>
        </div>
        <div className="hud-frame bg-cod-card p-4">
          <p className="hud-eyebrow mb-2">سکتورهای پاس نبرد</p>
          <p className="hud-num text-2xl font-black text-white">
            {stats ? stats.bpSectors : 0}
            <span className="text-gray-600 text-sm"> / {battlePassSectors.length} سکتور</span>
          </p>
          <p className="text-gray-500 text-xs mt-1">
            دست‌کم یک جایزه از هر سکتور را علامت زده‌ای.
          </p>
        </div>
      </div>

      <div className="hud-frame bg-cod-panel p-4">
        <p className="hud-eyebrow mb-2">نکات</p>
        <ul className="space-y-1.5">
          {tips.map((t, i) => (
            <li key={i} className="text-gray-400 text-xs leading-relaxed flex gap-2">
              <span className="text-cod-gold">›</span>
              {t}
            </li>
          ))}
        </ul>
      </div>

      <SourceNote kind="warning">
        این داشبورد هیچ داده‌ای به بیرون نمی‌فرستد و هیچ عددی را از سرور بازی نمی‌گیرد. آمار واقعی اکانتت را باید
        در خود بازی یا اپ رسمی Call of Duty ببینی.
      </SourceNote>
    </div>
  )
}
