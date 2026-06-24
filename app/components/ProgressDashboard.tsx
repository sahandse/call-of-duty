'use client'
import { useState, useEffect } from 'react'
import { camoWeapons } from '../data/camoData'
import { battlePassItems } from '../data/battlePassData'
import { currentEvents } from '../data/eventsData'
import { collectionItems } from '../data/collectionData'

interface Stats {
  camoCompleted: number
  camoTotal: number
  bpTier: number
  loadouts: number
  collectionOwned: number
  collectionTotal: number
  eventChallenges: number
  eventTotal: number
}

function StatCard({ icon, label, value, max, color }: {
  icon: string; label: string; value: number; max?: number; color: string
}) {
  const pct = max ? Math.round((value / max) * 100) : null
  return (
    <div className="bg-cod-card border border-cod-border rounded-xl p-4">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xl">{icon}</span>
        <span className="text-gray-400 text-xs">{label}</span>
      </div>
      <div className="flex items-end gap-2 mb-2">
        <span className={`text-2xl font-black ${color}`}>{value}</span>
        {max && <span className="text-gray-500 text-sm mb-0.5">/ {max}</span>}
      </div>
      {pct !== null && (
        <div>
          <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
            <div className={`h-full rounded-full transition-all bg-current ${color}`} style={{ width: `${pct}%` }} />
          </div>
          <p className="text-gray-600 text-xs mt-1">{pct}% تکمیل شده</p>
        </div>
      )}
    </div>
  )
}

export default function ProgressDashboard() {
  const [stats, setStats] = useState<Stats>({
    camoCompleted: 0, camoTotal: 0,
    bpTier: 0,
    loadouts: 0,
    collectionOwned: 0, collectionTotal: collectionItems.length,
    eventChallenges: 0, eventTotal: 0,
  })

  useEffect(() => {
    if (typeof window === 'undefined') return

    const camoCompleted = JSON.parse(localStorage.getItem('cod-camo-completed') || '[]') as string[]
    const camoTotal = camoWeapons.reduce((s, w) => s + w.challenges.length, 0)

    const bpUnlocked = JSON.parse(localStorage.getItem('cod-battlepass-unlocked') || '[]') as number[]
    const bpTier = bpUnlocked.length > 0 ? Math.max(...bpUnlocked) : 0

    const loadouts = JSON.parse(localStorage.getItem('cod-loadouts') || '[]')

    const collection = JSON.parse(localStorage.getItem('cod-collection') || '[]') as string[]

    const allEventChallenges = currentEvents.flatMap(e => e.challenges)
    const eventTotal = allEventChallenges.length
    let eventChallenges = 0
    currentEvents.forEach(e => {
      const done = JSON.parse(localStorage.getItem(`cod-event-${e.id}`) || '[]') as string[]
      eventChallenges += done.length
    })

    setStats({
      camoCompleted: camoCompleted.length,
      camoTotal,
      bpTier,
      loadouts: loadouts.length,
      collectionOwned: collection.length,
      collectionTotal: collectionItems.length,
      eventChallenges,
      eventTotal,
    })
  }, [])

  const overallPct = (() => {
    const parts = [
      stats.camoTotal > 0 ? stats.camoCompleted / stats.camoTotal : 0,
      stats.bpTier / 100,
      stats.collectionOwned / stats.collectionTotal,
      stats.eventTotal > 0 ? stats.eventChallenges / stats.eventTotal : 0,
    ]
    return Math.round(parts.reduce((a, b) => a + b, 0) / parts.length * 100)
  })()

  const tips = [
    { text: 'این هفته XP سلاح دوبل است — سلاح‌های جدیدت را level کن', icon: '⚡' },
    { text: 'چالش‌های روزانه را فراموش نکن — XP رایگان سریع‌ترین روش است', icon: '🎯' },
    { text: 'Tempered + Ghost + Infantry Vest بهترین ترکیب وارزون است', icon: '🎖️' },
    { text: 'در وارزون با ۲ آرمور بازی کن — Tempered فقط ۲ تا نیاز دارد', icon: '🛡️' },
    { text: 'MTZ Interceptor + WSP Swarm ترکیب کلاسیک وارزون است', icon: '🔫' },
  ]

  return (
    <div className="space-y-6">
      <div className="bg-cod-card border border-cod-border rounded-xl p-4">
        <h2 className="text-white font-bold text-lg">📈 داشبورد پیشرفت</h2>
        <p className="text-gray-500 text-xs mt-1">خلاصه‌ای از تمام پیشرفت‌هایت در یک نگاه</p>
      </div>

      {/* Overall */}
      <div className="bg-gradient-to-r from-cod-gold/10 to-transparent border border-cod-gold/20 rounded-xl p-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-white font-bold">پیشرفت کلی</h3>
            <p className="text-gray-500 text-xs">میانگین تمام بخش‌ها</p>
          </div>
          <span className="text-4xl font-black text-cod-gold">{overallPct}%</span>
        </div>
        <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-cod-gold to-yellow-400 rounded-full transition-all"
            style={{ width: `${overallPct}%` }} />
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon="🎨" label="چالش‌های کامو"   value={stats.camoCompleted} max={stats.camoTotal}       color="text-purple-400" />
        <StatCard icon="🎫" label="تیر Battle Pass"  value={stats.bpTier}        max={100}                   color="text-cod-gold"   />
        <StatCard icon="🏆" label="کالکشن آیتم‌ها"  value={stats.collectionOwned} max={stats.collectionTotal} color="text-orange-400" />
        <StatCard icon="🎉" label="چالش رویدادها"   value={stats.eventChallenges} max={stats.eventTotal || 1} color="text-green-400"  />
      </div>

      {/* Loadouts quick info */}
      <div className="bg-cod-card border border-cod-border rounded-xl p-4 flex items-center gap-4">
        <span className="text-4xl">🔧</span>
        <div className="flex-1">
          <p className="text-white font-bold">{stats.loadouts} لودآوت ذخیره شده</p>
          <p className="text-gray-500 text-xs">لودآوت‌های شخصی‌سازی‌شده در بخش لودآوت‌ساز</p>
        </div>
        {stats.loadouts === 0 && (
          <span className="text-xs text-cod-gold border border-cod-gold/30 px-2 py-1 rounded-lg">
            لودآوت بساز!
          </span>
        )}
      </div>

      {/* Daily tips */}
      <div className="bg-cod-card border border-cod-border rounded-xl p-4">
        <h3 className="text-white font-bold text-sm mb-3">💡 نکات روزانه</h3>
        <div className="space-y-2">
          {tips.map((t, i) => (
            <div key={i} className="flex items-start gap-2 text-sm">
              <span className="mt-0.5 flex-shrink-0">{t.icon}</span>
              <span className="text-gray-300">{t.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {[
          { label: 'ادامه کامو', icon: '🎨', tab: 'camo', desc: `${stats.camoTotal - stats.camoCompleted} چالش باقی‌مانده` },
          { label: 'Battle Pass', icon: '🎫', tab: 'battlepass', desc: `تیر ${stats.bpTier} از ۱۰۰` },
          { label: 'رویدادها', icon: '🎉', tab: 'events', desc: 'چالش‌های فعال' },
          { label: 'کالکشن', icon: '🏆', tab: 'collection', desc: `${stats.collectionTotal - stats.collectionOwned} آیتم باقی‌مانده` },
          { label: 'مقایسه سلاح', icon: '⚖️', tab: 'compare', desc: 'بهترین TTK را پیدا کن' },
          { label: 'تیم‌ساز', icon: '👥', tab: 'teambuilder', desc: 'ترکیب تیم بساز' },
        ].map(link => (
          <div key={link.tab} className="bg-cod-card border border-cod-border rounded-xl p-3 hover:border-cod-gold/30 transition-colors">
            <div className="flex items-center gap-2 mb-1">
              <span>{link.icon}</span>
              <span className="text-white font-medium text-sm">{link.label}</span>
            </div>
            <p className="text-gray-500 text-xs">{link.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
