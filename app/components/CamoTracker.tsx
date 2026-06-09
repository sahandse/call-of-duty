'use client'
import { useState, useEffect, useMemo } from 'react'
import { camoWeapons } from '../data/camoData'

type TierFilter = 'all' | 'base' | 'gold' | 'platinum' | 'polyatomic'

const TIER_LABELS: Record<string, string> = {
  base: '🟤 پایه',
  gold: '🥇 طلایی',
  platinum: '🔵 پلاتینیوم',
  polyatomic: '🌈 پلی‌اتومیک',
}

const TIER_BORDER: Record<string, string> = {
  base: 'border-amber-700/50',
  gold: 'border-yellow-500/50',
  platinum: 'border-blue-500/50',
  polyatomic: 'border-purple-500/50',
}

const CLASS_LABELS: Record<string, string> = {
  assault_rifle: 'رایفل اسالت',
  smg: 'زیرماشین‌تفنگ',
  lmg: 'مسلسل سبک',
  sniper: 'تک‌تیرانداز',
  marksman: 'تفنگ نشانه‌گیر',
  shotgun: 'شاتگان',
  handgun: 'تپانچه',
}

function getCompleted(): Set<string> {
  if (typeof window === 'undefined') return new Set()
  try {
    return new Set(JSON.parse(localStorage.getItem('cod-camo-completed') || '[]'))
  } catch {
    return new Set()
  }
}

function saveCompleted(s: Set<string>) {
  if (typeof window === 'undefined') return
  localStorage.setItem('cod-camo-completed', JSON.stringify(Array.from(s)))
}

export default function CamoTracker() {
  const [completed, setCompleted] = useState<Set<string>>(new Set())
  const [selectedWeaponId, setSelectedWeaponId] = useState<string>(camoWeapons[0]?.id || '')
  const [tierFilter, setTierFilter] = useState<TierFilter>('all')
  const [classFilter, setClassFilter] = useState<string>('all')

  useEffect(() => {
    setCompleted(getCompleted())
  }, [])

  const toggleChallenge = (challengeId: string) => {
    setCompleted(prev => {
      const next = new Set(prev)
      if (next.has(challengeId)) next.delete(challengeId)
      else next.add(challengeId)
      saveCompleted(next)
      return next
    })
  }

  const selectedWeapon = camoWeapons.find(w => w.id === selectedWeaponId)

  const filteredChallenges = useMemo(() => {
    if (!selectedWeapon) return []
    return selectedWeapon.challenges.filter(c => tierFilter === 'all' || c.tier === tierFilter)
  }, [selectedWeapon, tierFilter])

  const weaponProgress = (weapon: typeof camoWeapons[0]) => {
    const total = weapon.challenges.length
    const done = weapon.challenges.filter(c => completed.has(c.id)).length
    return { total, done, pct: total ? Math.round((done / total) * 100) : 0 }
  }

  const globalStats = useMemo(() => {
    const allChallenges = camoWeapons.flatMap(w => w.challenges)
    const totalDone = allChallenges.filter(c => completed.has(c.id)).length
    const goldWeapons = camoWeapons.filter(w => {
      const baseChallenges = w.challenges.filter(c => c.tier === 'base')
      return baseChallenges.length > 0 && baseChallenges.every(c => completed.has(c.id))
    }).length
    const platWeapons = camoWeapons.filter(w => {
      const goldC = w.challenges.filter(c => c.tier === 'gold')
      const baseC = w.challenges.filter(c => c.tier === 'base')
      return [...goldC, ...baseC].every(c => completed.has(c.id))
    }).length
    return { totalDone, total: allChallenges.length, goldWeapons, platWeapons }
  }, [completed])

  const classes = ['all', ...Array.from(new Set(camoWeapons.map(w => w.class)))]
  const filteredWeapons = classFilter === 'all'
    ? camoWeapons
    : camoWeapons.filter(w => w.class === classFilter)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-cod-card border border-cod-border rounded-xl p-4">
        <h2 className="text-white font-bold text-lg flex items-center gap-2">
          🎨 تراکر کامو
        </h2>
        <p className="text-gray-500 text-xs mt-0.5">
          پیشرفت چالش‌های کامو سلاح‌ها را ردیابی کنید
        </p>
      </div>

      {/* Global Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-cod-card border border-cod-border rounded-xl p-3 text-center">
          <div className="text-white font-bold text-xl">{globalStats.totalDone}/{globalStats.total}</div>
          <div className="text-gray-500 text-xs">چالش تکمیل شده</div>
        </div>
        <div className="bg-cod-card border border-cod-border rounded-xl p-3 text-center">
          <div className="text-yellow-400 font-bold text-xl">{globalStats.goldWeapons}</div>
          <div className="text-gray-500 text-xs">سلاح طلایی</div>
        </div>
        <div className="bg-cod-card border border-cod-border rounded-xl p-3 text-center">
          <div className="text-blue-400 font-bold text-xl">{globalStats.platWeapons}</div>
          <div className="text-gray-500 text-xs">سلاح پلاتینیوم</div>
        </div>
        <div className="bg-cod-card border border-cod-border rounded-xl p-3 text-center">
          <div className="text-cod-gold font-bold text-xl">
            {globalStats.total ? Math.round((globalStats.totalDone / globalStats.total) * 100) : 0}٪
          </div>
          <div className="text-gray-500 text-xs">پیشرفت کلی</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weapon List */}
        <div className="space-y-3">
          {/* Class Filter */}
          <div className="flex gap-2 flex-wrap">
            {classes.map(c => (
              <button
                key={c}
                onClick={() => setClassFilter(c)}
                className={`px-2 py-1 rounded-lg text-xs border transition-all ${
                  classFilter === c
                    ? 'bg-cod-gold text-black border-cod-gold'
                    : 'bg-cod-card border-cod-border text-gray-400 hover:border-cod-gold/40'
                }`}
              >
                {c === 'all' ? 'همه' : CLASS_LABELS[c] || c}
              </button>
            ))}
          </div>

          {/* Weapon Cards */}
          {filteredWeapons.map(weapon => {
            const prog = weaponProgress(weapon)
            const isSelected = selectedWeaponId === weapon.id
            return (
              <button
                key={weapon.id}
                onClick={() => setSelectedWeaponId(weapon.id)}
                className={`w-full text-right border rounded-xl p-3 transition-all ${
                  isSelected ? 'border-cod-gold bg-cod-card' : 'border-cod-border bg-cod-card hover:border-cod-gold/40'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-white font-medium text-sm">{weapon.name}</p>
                    <p className="text-gray-500 text-xs">{weapon.classFa}</p>
                  </div>
                  <div className="text-left">
                    <span className={`text-sm font-bold ${prog.pct === 100 ? 'text-green-400' : 'text-gray-400'}`}>
                      {prog.done}/{prog.total}
                    </span>
                  </div>
                </div>
                <div className="h-1.5 bg-cod-card2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      prog.pct === 100 ? 'bg-green-500' : 'bg-cod-gold'
                    }`}
                    style={{ width: `${prog.pct}%` }}
                  />
                </div>
                <p className="text-gray-600 text-xs mt-1">{prog.pct}٪</p>
              </button>
            )
          })}
        </div>

        {/* Challenges Panel */}
        <div className="lg:col-span-2 space-y-4">
          {selectedWeapon && (
            <>
              <div className="flex items-center justify-between">
                <h3 className="text-white font-bold text-base">
                  چالش‌های {selectedWeapon.name}
                </h3>
                <div className="flex gap-2">
                  {(['all', 'base', 'gold', 'platinum', 'polyatomic'] as TierFilter[]).map(t => (
                    <button
                      key={t}
                      onClick={() => setTierFilter(t)}
                      className={`px-2 py-1 rounded-lg text-xs border transition-all ${
                        tierFilter === t
                          ? 'bg-cod-gold text-black border-cod-gold'
                          : 'bg-cod-card border-cod-border text-gray-400 hover:border-cod-gold/40'
                      }`}
                    >
                      {t === 'all' ? 'همه' : TIER_LABELS[t]}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                {filteredChallenges.map(challenge => {
                  const isDone = completed.has(challenge.id)
                  const borderClass = TIER_BORDER[challenge.tier] || 'border-cod-border'
                  return (
                    <button
                      key={challenge.id}
                      onClick={() => toggleChallenge(challenge.id)}
                      className={`w-full text-right border rounded-xl p-4 transition-all flex items-center gap-3 ${
                        isDone
                          ? `${borderClass} bg-cod-card`
                          : 'border-cod-border bg-cod-card hover:border-cod-gold/30'
                      } ${isDone ? 'opacity-100' : 'opacity-70 hover:opacity-100'}`}
                    >
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                        isDone ? 'bg-cod-gold border-cod-gold' : 'border-gray-600'
                      }`}>
                        {isDone && <span className="text-black text-xs font-black">✓</span>}
                      </div>

                      <div className="text-xl flex-shrink-0">{challenge.icon}</div>

                      <div className="flex-1 text-right">
                        <div className="flex items-center gap-2 justify-end mb-0.5">
                          <span className={`text-xs px-1.5 py-0.5 rounded border ${
                            challenge.tier === 'gold' ? 'text-yellow-400 border-yellow-700/50 bg-yellow-900/20'
                            : challenge.tier === 'platinum' ? 'text-blue-400 border-blue-700/50 bg-blue-900/20'
                            : challenge.tier === 'polyatomic' ? 'text-purple-400 border-purple-700/50 bg-purple-900/20'
                            : 'text-amber-400 border-amber-700/50 bg-amber-900/20'
                          }`}>
                            {TIER_LABELS[challenge.tier]}
                          </span>
                          <p className={`font-medium text-sm ${isDone ? 'text-white line-through' : 'text-white'}`}>
                            {challenge.nameFa}
                          </p>
                        </div>
                        <p className="text-gray-400 text-xs">{challenge.descFa}</p>
                      </div>
                    </button>
                  )
                })}
              </div>

              {filteredChallenges.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <p>چالشی در این تیر یافت نشد</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
