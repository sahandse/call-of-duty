'use client'
import { useState, useEffect, useMemo } from 'react'
import { battlePassItems, currentSeason, seasonEnds } from '../data/battlePassData'
import { Rarity } from '../types'

const RARITY_BORDER: Record<Rarity, string> = {
  'معمولی': 'border-gray-600',
  'نادر': 'border-blue-500',
  'حماسی': 'border-purple-500',
  'افسانه‌ای': 'border-yellow-500',
  'فوق‌العاده': 'border-red-500',
}

const RARITY_GLOW: Record<Rarity, string> = {
  'معمولی': '',
  'نادر': 'shadow-blue-500/20',
  'حماسی': 'shadow-purple-500/30',
  'افسانه‌ای': 'shadow-yellow-500/30',
  'فوق‌العاده': 'shadow-red-500/40',
}

const TYPE_LABEL: Record<string, string> = {
  operator_skin: 'اسکین',
  blueprint: 'بلوپرینت',
  xp_token: 'XP توکن',
  cod_points: 'CP',
  emblem: 'آرم',
  calling_card: 'کارت ویزیت',
  charm: 'چارم',
  sticker: 'استیکر',
  vehicle: 'خودرو',
  camo: 'کامو',
}

function getDaysRemaining() {
  const end = new Date(seasonEnds)
  const now = new Date()
  const diff = Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  return Math.max(0, diff)
}

function getUnlockedTiers(): Set<number> {
  if (typeof window === 'undefined') return new Set()
  try {
    const stored = JSON.parse(localStorage.getItem('cod-battlepass-unlocked') || '[]')
    return new Set(stored)
  } catch {
    return new Set()
  }
}

function saveUnlockedTiers(tiers: Set<number>) {
  if (typeof window === 'undefined') return
  localStorage.setItem('cod-battlepass-unlocked', JSON.stringify(Array.from(tiers)))
}

type FilterType = 'all' | 'free' | 'premium' | 'unlocked'

export default function BattlePassSection() {
  const [unlocked, setUnlocked] = useState<Set<number>>(new Set())
  const [filter, setFilter] = useState<FilterType>('all')
  const [daysLeft, setDaysLeft] = useState(0)

  useEffect(() => {
    setUnlocked(getUnlockedTiers())
    setDaysLeft(getDaysRemaining())
  }, [])

  const toggleTier = (tier: number) => {
    setUnlocked(prev => {
      const next = new Set(prev)
      if (next.has(tier)) next.delete(tier)
      else next.add(tier)
      saveUnlockedTiers(next)
      return next
    })
  }

  const filtered = useMemo(() => {
    switch (filter) {
      case 'free': return battlePassItems.filter(i => i.free)
      case 'premium': return battlePassItems.filter(i => !i.free)
      case 'unlocked': return battlePassItems.filter(i => unlocked.has(i.tier))
      default: return battlePassItems
    }
  }, [filter, unlocked])

  const stats = useMemo(() => {
    const freeUnlocked = battlePassItems.filter(i => i.free && unlocked.has(i.tier)).length
    const totalFree = battlePassItems.filter(i => i.free).length
    const paidUnlocked = battlePassItems.filter(i => !i.free && unlocked.has(i.tier)).length
    const totalPaid = battlePassItems.filter(i => !i.free).length
    const xpTokens = battlePassItems.filter(i => i.type === 'xp_token' && unlocked.has(i.tier)).length
    const cpEarned = battlePassItems
      .filter(i => i.type === 'cod_points' && unlocked.has(i.tier))
      .reduce((sum, i) => {
        const match = i.rewardFa.match(/(\d[\d,]+)/)
        return sum + (match ? parseInt(match[1].replace(',', '')) : 0)
      }, 0)
    return { freeUnlocked, totalFree, paidUnlocked, totalPaid, xpTokens, cpEarned }
  }, [unlocked])

  const progressPct = Math.round((unlocked.size / battlePassItems.length) * 100)

  return (
    <div className="space-y-6">
      {/* Season Header */}
      <div className="bg-cod-card border border-cod-gold/30 rounded-xl p-5">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">🎫</span>
              <h2 className="text-white font-black text-xl">{currentSeason}</h2>
            </div>
            <div className="flex items-center gap-2">
              {daysLeft > 0 ? (
                <span className="text-green-400 text-sm font-medium">
                  {daysLeft} روز باقیمانده
                </span>
              ) : (
                <span className="text-red-400 text-sm font-medium">سیزن پایان یافته</span>
              )}
              <span className="text-gray-600">•</span>
              <span className="text-gray-400 text-sm">{battlePassItems.length} آیتم</span>
            </div>
          </div>
          <div className="flex gap-3 text-center">
            <div className="bg-cod-card2 border border-cod-border rounded-xl px-4 py-2">
              <div className="text-cod-gold font-black text-xl">{progressPct}٪</div>
              <div className="text-gray-500 text-xs">تکمیل</div>
            </div>
            <div className="bg-cod-card2 border border-cod-border rounded-xl px-4 py-2">
              <div className="text-white font-black text-xl">{unlocked.size}</div>
              <div className="text-gray-500 text-xs">باز شده</div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex justify-between text-xs text-gray-500 mb-1.5">
            <span>پیشرفت کلی</span>
            <span>{unlocked.size}/{battlePassItems.length}</span>
          </div>
          <div className="h-2.5 bg-cod-card2 rounded-full border border-cod-border overflow-hidden">
            <div
              className="h-full bg-gradient-to-l from-cod-gold-light to-cod-gold rounded-full transition-all duration-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-cod-card border border-cod-border rounded-xl p-3 text-center">
          <div className="text-green-400 font-bold text-lg">{stats.freeUnlocked}/{stats.totalFree}</div>
          <div className="text-gray-500 text-xs">رایگان باز شده</div>
        </div>
        <div className="bg-cod-card border border-cod-border rounded-xl p-3 text-center">
          <div className="text-cod-gold font-bold text-lg">{stats.paidUnlocked}/{stats.totalPaid}</div>
          <div className="text-gray-500 text-xs">پریمیوم باز شده</div>
        </div>
        <div className="bg-cod-card border border-cod-border rounded-xl p-3 text-center">
          <div className="text-blue-400 font-bold text-lg">{stats.xpTokens}</div>
          <div className="text-gray-500 text-xs">XP توکن</div>
        </div>
        <div className="bg-cod-card border border-cod-border rounded-xl p-3 text-center">
          <div className="text-yellow-400 font-bold text-lg">{stats.cpEarned.toLocaleString('fa-IR')}</div>
          <div className="text-gray-500 text-xs">CP به دست آمده</div>
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-2 flex-wrap">
        {([
          { id: 'all', label: 'همه' },
          { id: 'free', label: '🆓 رایگان' },
          { id: 'premium', label: '⭐ پریمیوم' },
          { id: 'unlocked', label: '✅ باز شده' },
        ] as { id: FilterType; label: string }[]).map(f => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`px-3 py-1.5 rounded-lg text-xs border transition-all ${
              filter === f.id
                ? 'bg-cod-gold text-black border-cod-gold'
                : 'bg-cod-card border-cod-border text-gray-400 hover:border-cod-gold/40 hover:text-white'
            }`}
          >
            {f.label}
          </button>
        ))}
        <button
          onClick={() => {
            const allTiers = new Set(battlePassItems.map(i => i.tier))
            setUnlocked(allTiers)
            saveUnlockedTiers(allTiers)
          }}
          className="px-3 py-1.5 rounded-lg text-xs border border-green-700/50 text-green-500 hover:border-green-500/70 bg-cod-card transition-all"
        >
          انتخاب همه
        </button>
        <button
          onClick={() => {
            setUnlocked(new Set())
            saveUnlockedTiers(new Set())
          }}
          className="px-3 py-1.5 rounded-lg text-xs border border-red-900/50 text-red-500 hover:border-red-500/70 bg-cod-card transition-all"
        >
          پاک کردن همه
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2">
        {filtered.map(item => {
          const isUnlocked = unlocked.has(item.tier)
          const borderClass = item.rarity ? RARITY_BORDER[item.rarity] : 'border-cod-border'
          const glowClass = item.rarity ? RARITY_GLOW[item.rarity] : ''
          return (
            <button
              key={item.tier}
              onClick={() => toggleTier(item.tier)}
              title={`تیر ${item.tier}: ${item.rewardFa}`}
              className={`relative rounded-xl border p-2 flex flex-col items-center gap-1 transition-all hover:scale-105 ${
                isUnlocked
                  ? `${borderClass} bg-cod-card ${glowClass ? `shadow-lg ${glowClass}` : ''}`
                  : 'border-cod-border bg-cod-card2 opacity-50'
              }`}
            >
              {item.free && (
                <span className="absolute -top-1 -right-1 text-[8px] bg-green-500 text-white px-1 rounded-full font-bold">
                  F
                </span>
              )}
              {isUnlocked && (
                <span className="absolute -top-1 -left-1 text-[10px] bg-cod-gold text-black px-1 rounded-full font-bold">
                  ✓
                </span>
              )}
              <span className="text-xl leading-none">{item.icon}</span>
              <span className="text-gray-500 text-[10px] font-bold">{item.tier}</span>
              <span className="text-gray-600 text-[9px] text-center leading-tight truncate w-full">
                {TYPE_LABEL[item.type] || item.type}
              </span>
            </button>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-gray-500">
          <div className="text-4xl mb-3">🎫</div>
          <p>آیتمی با این فیلتر یافت نشد</p>
        </div>
      )}

      <p className="text-gray-600 text-xs text-center">
        روی هر آیتم کلیک کن تا وضعیت باز شدنش را تغییر دهی • اطلاعات به صورت محلی ذخیره می‌شود
      </p>
    </div>
  )
}
