'use client'
import { useState, useMemo } from 'react'
import { metaWeapons } from '../data/metaWeapons'
import { MetaWeapon, WeaponClass } from '../types'

const CLASS_LABELS: Record<WeaponClass, string> = {
  assault_rifle: 'رایفل اسالت', smg: 'زیرماشین‌تفنگ', lmg: 'مسلسل سبک',
  sniper: 'تک‌تیرانداز', marksman: 'تفنگ نشانه‌گیر', shotgun: 'شاتگان', handgun: 'تپانچه',
}

const STATS = [
  { key: 'damage',   label: 'آسیب',     color: 'bg-red-500' },
  { key: 'range',    label: 'رنج',      color: 'bg-blue-500' },
  { key: 'fireRate', label: 'نرخ آتش',  color: 'bg-yellow-500' },
  { key: 'mobility', label: 'تحرک',     color: 'bg-green-500' },
  { key: 'control',  label: 'کنترل',    color: 'bg-purple-500' },
] as const

const TIER_COLOR: Record<string, string> = {
  S: 'bg-yellow-500 text-black', A: 'bg-green-500 text-black',
  B: 'bg-blue-500 text-white',   C: 'bg-orange-500 text-black',
  D: 'bg-red-600 text-white',
}

function StatBar({ value, max = 10, color, compare }: { value: number; max?: number; color: string; compare?: number }) {
  const pct = (value / max) * 100
  const cPct = compare !== undefined ? (compare / max) * 100 : null
  const better = compare !== undefined ? value > compare : null
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-2.5 bg-gray-700 rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all ${color} ${better === true ? 'ring-1 ring-white/50' : ''}`}
          style={{ width: `${pct}%` }} />
      </div>
      <span className={`text-xs font-bold w-5 text-left ${better === true ? 'text-white' : better === false ? 'text-gray-500' : 'text-gray-300'}`}>{value}</span>
    </div>
  )
}

export default function WeaponCompare() {
  const [weapon1Id, setWeapon1Id] = useState<string>(metaWeapons[0]?.id ?? '')
  const [weapon2Id, setWeapon2Id] = useState<string>(metaWeapons[1]?.id ?? '')
  const [classFilter, setClassFilter] = useState<string>('all')
  const [gameFilter, setGameFilter] = useState<string>('all')

  const filtered = useMemo(() => metaWeapons.filter(w => {
    if (classFilter !== 'all' && w.class !== classFilter) return false
    if (gameFilter !== 'all' && w.game !== gameFilter && w.game !== 'both') return false
    return true
  }), [classFilter, gameFilter])

  const w1 = metaWeapons.find(w => w.id === weapon1Id)
  const w2 = metaWeapons.find(w => w.id === weapon2Id)

  const classes = Array.from(new Set(metaWeapons.map(w => w.class)))

  function totalScore(w: MetaWeapon) {
    return w.damage + w.range + w.fireRate + w.mobility + w.control
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-cod-card border border-cod-border rounded-xl p-4">
        <h2 className="text-white font-bold text-lg flex items-center gap-2">⚖️ مقایسه سلاح‌ها</h2>
        <p className="text-gray-500 text-xs mt-1">دو سلاح را انتخاب کنید و آمار آن‌ها را کنار هم مقایسه کنید</p>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        <div className="flex gap-1 bg-cod-card border border-cod-border rounded-lg p-1">
          {['all', 'warzone', 'mw3'].map(g => (
            <button key={g} onClick={() => setGameFilter(g)}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${gameFilter === g ? 'bg-cod-gold text-black' : 'text-gray-400 hover:text-white'}`}>
              {g === 'all' ? 'همه' : g === 'warzone' ? 'وارزون' : 'MW3'}
            </button>
          ))}
        </div>
        <select value={classFilter} onChange={e => setClassFilter(e.target.value)}
          className="bg-cod-card border border-cod-border rounded-lg px-3 py-1.5 text-xs text-gray-300 focus:outline-none focus:border-cod-gold/60">
          <option value="all">همه کلاس‌ها</option>
          {classes.map(c => <option key={c} value={c}>{CLASS_LABELS[c]}</option>)}
        </select>
      </div>

      {/* Weapon Selectors */}
      <div className="grid grid-cols-2 gap-4">
        {[
          { id: weapon1Id, setId: setWeapon1Id, label: 'سلاح اول', color: 'border-blue-500/60 bg-blue-500/5' },
          { id: weapon2Id, setId: setWeapon2Id, label: 'سلاح دوم', color: 'border-orange-500/60 bg-orange-500/5' },
        ].map(({ id, setId, label, color }) => {
          const w = metaWeapons.find(x => x.id === id)
          return (
            <div key={label} className={`bg-cod-card border ${color} rounded-xl p-4`}>
              <p className="text-gray-400 text-xs mb-2">{label}</p>
              <select value={id} onChange={e => setId(e.target.value)}
                className="w-full bg-cod-card2 border border-cod-border rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cod-gold/60 mb-3">
                {filtered.map(w => <option key={w.id} value={w.id}>{w.name}</option>)}
              </select>
              {w && (
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded ${TIER_COLOR[w.tier]}`}>{w.tier}</span>
                  <span className="text-gray-400 text-xs">{w.classFa}</span>
                  <span className="text-xs text-gray-500 mr-auto">امتیاز: {totalScore(w)}/50</span>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Comparison */}
      {w1 && w2 && (
        <div className="bg-cod-card border border-cod-border rounded-xl overflow-hidden">
          {/* Header row */}
          <div className="grid grid-cols-3 text-center border-b border-cod-border">
            <div className="p-4 border-l border-cod-border bg-blue-500/5">
              <p className="text-white font-bold">{w1.name}</p>
              <span className={`text-xs font-bold px-2 py-0.5 rounded ${TIER_COLOR[w1.tier]}`}>{w1.tier} Tier</span>
            </div>
            <div className="p-4 flex items-center justify-center">
              <span className="text-2xl font-black text-gray-600">VS</span>
            </div>
            <div className="p-4 border-r border-cod-border bg-orange-500/5">
              <p className="text-white font-bold">{w2.name}</p>
              <span className={`text-xs font-bold px-2 py-0.5 rounded ${TIER_COLOR[w2.tier]}`}>{w2.tier} Tier</span>
            </div>
          </div>

          {/* Stats */}
          <div className="divide-y divide-cod-border">
            {STATS.map(s => {
              const v1 = w1[s.key as keyof MetaWeapon] as number
              const v2 = w2[s.key as keyof MetaWeapon] as number
              const winner = v1 > v2 ? 'left' : v2 > v1 ? 'right' : 'tie'
              return (
                <div key={s.key} className="grid grid-cols-3 items-center px-4 py-3">
                  <div className={`flex items-center gap-2 ${winner === 'left' ? 'opacity-100' : 'opacity-60'}`}>
                    <StatBar value={v1} color={s.color} compare={v2} />
                    {winner === 'left' && <span className="text-green-400 text-xs">✓</span>}
                  </div>
                  <div className="text-center">
                    <span className="text-gray-400 text-xs font-medium">{s.label}</span>
                  </div>
                  <div className={`flex items-center gap-2 flex-row-reverse ${winner === 'right' ? 'opacity-100' : 'opacity-60'}`}>
                    <StatBar value={v2} color={s.color} compare={v1} />
                    {winner === 'right' && <span className="text-green-400 text-xs">✓</span>}
                  </div>
                </div>
              )
            })}

            {/* Total */}
            <div className="grid grid-cols-3 items-center px-4 py-3 bg-cod-card2">
              <div className={`text-center ${totalScore(w1) > totalScore(w2) ? 'text-cod-gold font-bold' : 'text-gray-500'}`}>
                {totalScore(w1)}/50
              </div>
              <div className="text-center"><span className="text-gray-400 text-xs">امتیاز کل</span></div>
              <div className={`text-center ${totalScore(w2) > totalScore(w1) ? 'text-cod-gold font-bold' : 'text-gray-500'}`}>
                {totalScore(w2)}/50
              </div>
            </div>
          </div>

          {/* Best for */}
          <div className="grid grid-cols-2 border-t border-cod-border">
            <div className="p-4 border-l border-cod-border">
              <p className="text-gray-500 text-xs mb-1">بهترین برای</p>
              <p className="text-gray-300 text-sm">{w1.bestFor}</p>
            </div>
            <div className="p-4">
              <p className="text-gray-500 text-xs mb-1">بهترین برای</p>
              <p className="text-gray-300 text-sm">{w2.bestFor}</p>
            </div>
          </div>

          {/* Attachments */}
          <div className="grid grid-cols-2 border-t border-cod-border">
            <div className="p-4 border-l border-cod-border">
              <p className="text-gray-500 text-xs mb-2">اتچمنت‌های پیشنهادی</p>
              <ul className="space-y-1">
                {w1.topAttachments.map((a, i) => (
                  <li key={i} className="text-xs text-gray-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-4">
              <p className="text-gray-500 text-xs mb-2">اتچمنت‌های پیشنهادی</p>
              <ul className="space-y-1">
                {w2.topAttachments.map((a, i) => (
                  <li key={i} className="text-xs text-gray-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 flex-shrink-0" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Verdict */}
          <div className="p-4 border-t border-cod-border bg-cod-card2">
            <p className="text-gray-500 text-xs mb-1">نتیجه</p>
            {totalScore(w1) > totalScore(w2) ? (
              <p className="text-white text-sm"><span className="text-cod-gold font-bold">{w1.name}</span> امتیاز کلی بالاتری دارد، اما انتخاب نهایی به سبک بازی شما بستگی دارد.</p>
            ) : totalScore(w2) > totalScore(w1) ? (
              <p className="text-white text-sm"><span className="text-cod-gold font-bold">{w2.name}</span> امتیاز کلی بالاتری دارد، اما انتخاب نهایی به سبک بازی شما بستگی دارد.</p>
            ) : (
              <p className="text-gray-400 text-sm">هر دو سلاح امتیاز یکسانی دارند — بر اساس سبک بازی انتخاب کنید.</p>
            )}
          </div>
        </div>
      )}

      {/* All weapons quick table */}
      <div className="bg-cod-card border border-cod-border rounded-xl overflow-hidden">
        <div className="p-4 border-b border-cod-border">
          <h3 className="text-white font-bold text-sm">📊 جدول کامل آمار سلاح‌ها</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-cod-card2 text-gray-500">
              <tr>
                <th className="px-4 py-2 text-right">سلاح</th>
                <th className="px-3 py-2">تیر</th>
                <th className="px-3 py-2">آسیب</th>
                <th className="px-3 py-2">رنج</th>
                <th className="px-3 py-2">نرخ آتش</th>
                <th className="px-3 py-2">تحرک</th>
                <th className="px-3 py-2">کنترل</th>
                <th className="px-3 py-2">امتیاز</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cod-border">
              {[...filtered].sort((a, b) => totalScore(b) - totalScore(a)).map(w => (
                <tr key={w.id} className={`hover:bg-cod-card2 cursor-pointer transition-colors ${(weapon1Id === w.id || weapon2Id === w.id) ? 'bg-cod-gold/5' : ''}`}
                  onClick={() => { if (weapon1Id !== w.id) setWeapon2Id(weapon1Id); setWeapon1Id(w.id) }}>
                  <td className="px-4 py-2">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${TIER_COLOR[w.tier]}`}>{w.tier}</span>
                      <span className="text-white font-medium">{w.name}</span>
                    </div>
                  </td>
                  <td className="px-3 py-2 text-center text-gray-500">{w.classFa}</td>
                  <td className="px-3 py-2 text-center"><span className="text-red-400 font-bold">{w.damage}</span></td>
                  <td className="px-3 py-2 text-center"><span className="text-blue-400 font-bold">{w.range}</span></td>
                  <td className="px-3 py-2 text-center"><span className="text-yellow-400 font-bold">{w.fireRate}</span></td>
                  <td className="px-3 py-2 text-center"><span className="text-green-400 font-bold">{w.mobility}</span></td>
                  <td className="px-3 py-2 text-center"><span className="text-purple-400 font-bold">{w.control}</span></td>
                  <td className="px-3 py-2 text-center">
                    <span className={`font-bold ${totalScore(w) >= 40 ? 'text-cod-gold' : totalScore(w) >= 35 ? 'text-green-400' : 'text-gray-400'}`}>
                      {totalScore(w)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-gray-600 text-xs p-3 border-t border-cod-border">روی هر سلاح کلیک کنید تا برای مقایسه انتخاب شود</p>
      </div>
    </div>
  )
}
