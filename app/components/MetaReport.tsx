'use client'
import { useState, useMemo } from 'react'
import { metaWeapons } from '../data/metaWeapons'
import { MetaTier, WeaponClass, GameMode } from '../types'

const TIER_COLORS: Record<MetaTier, string> = {
  S: 'bg-yellow-500 text-black',
  A: 'bg-green-500 text-black',
  B: 'bg-blue-500 text-white',
  C: 'bg-orange-500 text-white',
  D: 'bg-red-600 text-white',
}

const TIER_BORDER: Record<MetaTier, string> = {
  S: 'border-yellow-500/50',
  A: 'border-green-500/50',
  B: 'border-blue-500/50',
  C: 'border-orange-500/50',
  D: 'border-red-600/50',
}

const TIER_BG: Record<MetaTier, string> = {
  S: 'bg-yellow-500/5',
  A: 'bg-green-500/5',
  B: 'bg-blue-500/5',
  C: 'bg-orange-500/5',
  D: 'bg-red-600/5',
}

const CLASS_LABELS: Record<WeaponClass, string> = {
  assault_rifle: 'رایفل اسالت',
  smg: 'زیرماشین‌تفنگ',
  lmg: 'مسلسل سبک',
  sniper: 'تک‌تیرانداز',
  marksman: 'تفنگ نشانه‌گیر',
  shotgun: 'شاتگان',
  handgun: 'تپانچه',
}

const TRENDING_ICON: Record<'up' | 'down' | 'stable', string> = {
  up: '📈',
  down: '📉',
  stable: '➡️',
}

const TRENDING_COLOR: Record<'up' | 'down' | 'stable', string> = {
  up: 'text-green-400',
  down: 'text-red-400',
  stable: 'text-gray-400',
}

function StatBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-gray-500 text-xs w-16 flex-shrink-0 text-right">{label}</span>
      <div className="flex-1 bg-cod-card2 rounded-full h-1.5">
        <div
          className="h-1.5 rounded-full bg-cod-gold transition-all"
          style={{ width: `${value * 10}%` }}
        />
      </div>
      <span className="text-gray-500 text-xs w-4">{value}</span>
    </div>
  )
}

export default function MetaReport() {
  const [tierFilter, setTierFilter] = useState<MetaTier | 'all'>('all')
  const [gameFilter, setGameFilter] = useState<GameMode | 'all'>('all')
  const [classFilter, setClassFilter] = useState<WeaponClass | 'all'>('all')

  const filtered = useMemo(() => {
    return metaWeapons.filter(w => {
      if (tierFilter !== 'all' && w.tier !== tierFilter) return false
      if (gameFilter !== 'all' && w.game !== 'both' && w.game !== gameFilter) return false
      if (classFilter !== 'all' && w.class !== classFilter) return false
      return true
    })
  }, [tierFilter, gameFilter, classFilter])

  const tiers: (MetaTier | 'all')[] = ['all', 'S', 'A', 'B', 'C', 'D']
  const classes = ['all', ...Object.keys(CLASS_LABELS)] as (WeaponClass | 'all')[]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-cod-card border border-cod-border rounded-xl p-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
          <div>
            <h2 className="text-white font-bold text-lg flex items-center gap-2">
              📊 تیر لیست متا سلاح‌ها
            </h2>
            <p className="text-gray-500 text-xs mt-0.5">
              {metaWeapons.length} سلاح ارزیابی شده — آپدیت سیزن ۵ ریلود
            </p>
          </div>
          <div className="flex gap-3 flex-wrap text-xs">
            {(['all', 'warzone', 'mw3'] as const).map(g => (
              <button
                key={g}
                onClick={() => setGameFilter(g)}
                className={`px-3 py-1.5 rounded-lg border transition-all ${
                  gameFilter === g
                    ? 'bg-cod-gold text-black border-cod-gold'
                    : 'bg-cod-card border-cod-border text-gray-400 hover:text-white hover:border-cod-gold/40'
                }`}
              >
                {g === 'all' ? 'همه بازی‌ها' : g === 'warzone' ? '🗺️ وارزون' : '🎮 MW3'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tier Filter */}
      <div className="flex gap-2 flex-wrap items-center">
        <span className="text-gray-500 text-xs ml-1">تیر:</span>
        {tiers.map(t => (
          <button
            key={t}
            onClick={() => setTierFilter(t)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
              tierFilter === t
                ? t === 'all'
                  ? 'bg-cod-gold text-black border-cod-gold'
                  : `${TIER_COLORS[t as MetaTier]} border-transparent`
                : 'bg-cod-card border-cod-border text-gray-400 hover:text-white hover:border-cod-gold/40'
            }`}
          >
            {t === 'all' ? 'همه' : `تیر ${t}`}
          </button>
        ))}
      </div>

      {/* Class Filter */}
      <div className="flex gap-2 flex-wrap items-center">
        <span className="text-gray-500 text-xs ml-1">کلاس:</span>
        {classes.map(c => (
          <button
            key={c}
            onClick={() => setClassFilter(c)}
            className={`px-3 py-1.5 rounded-lg text-xs border transition-all ${
              classFilter === c
                ? 'bg-cod-gold text-black border-cod-gold'
                : 'bg-cod-card border-cod-border text-gray-400 hover:text-white hover:border-cod-gold/40'
            }`}
          >
            {c === 'all' ? 'همه کلاس‌ها' : CLASS_LABELS[c]}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="text-gray-500 text-xs">
        {filtered.length} سلاح نمایش داده می‌شود
      </p>

      {/* Tier sections */}
      {(['S', 'A', 'B', 'C', 'D'] as MetaTier[]).map(tier => {
        const tierWeapons = filtered.filter(w => w.tier === tier)
        if (tierWeapons.length === 0) return null
        return (
          <section key={tier}>
            <div className="flex items-center gap-3 mb-4">
              <span className={`text-2xl font-black px-4 py-1 rounded-lg ${TIER_COLORS[tier]}`}>
                {tier}
              </span>
              <div className="flex-1 h-px bg-cod-border" />
              <span className="text-gray-500 text-xs">{tierWeapons.length} سلاح</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {tierWeapons.map(weapon => (
                <div
                  key={weapon.id}
                  className={`border rounded-xl p-4 transition-all hover:scale-[1.01] ${TIER_BORDER[weapon.tier]} ${TIER_BG[weapon.tier]}`}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs font-black px-2 py-0.5 rounded ${TIER_COLORS[weapon.tier]}`}>
                          {weapon.tier}
                        </span>
                        <span className={`text-xs font-medium ${TRENDING_COLOR[weapon.trending]}`}>
                          {TRENDING_ICON[weapon.trending]}
                        </span>
                      </div>
                      <h3 className="text-white font-bold text-base">{weapon.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-gray-500 text-xs">{weapon.classFa}</span>
                        <span className="text-gray-700">•</span>
                        <span className="text-gray-500 text-xs">
                          {weapon.game === 'both' ? 'WZ + MW3' : weapon.game === 'warzone' ? 'وارزون' : 'MW3'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="space-y-1.5 mb-3">
                    <StatBar label="آسیب" value={weapon.damage} />
                    <StatBar label="رنج" value={weapon.range} />
                    <StatBar label="نرخ آتش" value={weapon.fireRate} />
                    <StatBar label="تحرک" value={weapon.mobility} />
                    <StatBar label="کنترل" value={weapon.control} />
                  </div>

                  {/* Best for */}
                  <div className="mb-3 bg-cod-card2 rounded-lg p-2">
                    <p className="text-gray-400 text-xs">
                      <span className="text-cod-gold font-medium">بهترین برای: </span>
                      {weapon.bestFor}
                    </p>
                  </div>

                  {/* Top Attachments */}
                  <div>
                    <p className="text-gray-500 text-xs mb-1.5">بهترین اتچمنت‌ها:</p>
                    <div className="flex flex-wrap gap-1">
                      {weapon.topAttachments.slice(0, 3).map(att => (
                        <span
                          key={att}
                          className="text-xs px-2 py-0.5 rounded-full bg-cod-card2 text-gray-400 border border-cod-border"
                        >
                          {att}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )
      })}

      {filtered.length === 0 && (
        <div className="text-center py-16 text-gray-500">
          <div className="text-4xl mb-3">📊</div>
          <p>سلاحی با این فیلترها یافت نشد</p>
        </div>
      )}
    </div>
  )
}
