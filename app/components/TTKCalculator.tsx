'use client'
import { useState, useMemo } from 'react'
import { ttkWeapons, HP_PRESETS, calcSTK, calcTTK } from '../data/ttkData'

const CLASS_FA: Record<string, string> = {
  assault_rifle: 'رایفل اسالت', battle_rifle: 'رایفل نبرد', smg: 'زیرماشین‌تفنگ',
  sniper: 'تک‌تیرانداز', marksman: 'تفنگ نشانه‌گیر', shotgun: 'شاتگان',
  lmg: 'مسلسل سبک', handgun: 'تپانچه',
}

function ttkColor(ms: number) {
  if (ms === 0) return 'text-cod-gold'
  if (ms < 250) return 'text-green-400'
  if (ms < 500) return 'text-yellow-400'
  return 'text-red-400'
}

function TtkBar({ ms, max }: { ms: number; max: number }) {
  const pct = ms === 0 ? 2 : Math.min((ms / max) * 100, 100)
  const color = ms === 0 ? 'bg-cod-gold' : ms < 250 ? 'bg-green-500' : ms < 500 ? 'bg-yellow-500' : 'bg-red-500'
  return (
    <div className="flex-1 h-1.5 bg-gray-700 rounded-full overflow-hidden">
      <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
    </div>
  )
}

export default function TTKCalculator() {
  const [hpIndex, setHpIndex] = useState(0)
  const [classFilter, setClassFilter] = useState('all')
  const [hitZone, setHitZone] = useState<'body' | 'head' | 'limb'>('body')
  const [sortBy, setSortBy] = useState<'ttk' | 'stk' | 'name'>('ttk')

  const hp = HP_PRESETS[hpIndex].value

  const classes = Array.from(new Set(ttkWeapons.map(w => w.class)))

  const rows = useMemo(() => {
    return ttkWeapons
      .filter(w => classFilter === 'all' || w.class === classFilter)
      .map(w => {
        const dmg = hitZone === 'head'
          ? Math.round(w.bodyDamage * w.headMultiplier)
          : hitZone === 'limb'
          ? Math.round(w.bodyDamage * w.limbMultiplier)
          : w.bodyDamage
        const stk = calcSTK(hp, dmg)
        const ttk = calcTTK(hp, dmg, w.rpm)
        return { ...w, dmg, stk, ttk }
      })
      .sort((a, b) =>
        sortBy === 'ttk' ? a.ttk - b.ttk :
        sortBy === 'stk' ? a.stk - b.stk :
        a.name.localeCompare(b.name)
      )
  }, [hp, classFilter, hitZone, sortBy])

  const maxTTK = Math.max(...rows.map(r => r.ttk))

  return (
    <div className="space-y-6">
      <div className="bg-cod-card border border-cod-border rounded-xl p-4">
        <h2 className="text-white font-bold text-lg">⏱️ محاسبه‌گر TTK</h2>
        <p className="text-gray-500 text-xs mt-1">Time-to-Kill — مقایسه سرعت کشتن سلاح‌ها بر اساس HP هدف</p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-3">
        {/* HP preset */}
        <div className="flex gap-1 bg-cod-card border border-cod-border rounded-lg p-1">
          {HP_PRESETS.map((p, i) => (
            <button key={i} onClick={() => setHpIndex(i)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${hpIndex === i ? 'bg-cod-gold text-black' : 'text-gray-400 hover:text-white'}`}>
              {p.value} HP
            </button>
          ))}
        </div>

        {/* Hit zone */}
        <div className="flex gap-1 bg-cod-card border border-cod-border rounded-lg p-1">
          {([['body','بدن'],['head','سر'],['limb','اندام']] as const).map(([z, l]) => (
            <button key={z} onClick={() => setHitZone(z)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${hitZone === z ? 'bg-cod-gold text-black' : 'text-gray-400 hover:text-white'}`}>
              {l}
            </button>
          ))}
        </div>

        {/* Class filter */}
        <select value={classFilter} onChange={e => setClassFilter(e.target.value)}
          className="bg-cod-card border border-cod-border rounded-lg px-3 py-1.5 text-xs text-gray-300 focus:outline-none focus:border-cod-gold/60">
          <option value="all">همه کلاس‌ها</option>
          {classes.map(c => <option key={c} value={c}>{CLASS_FA[c] ?? c}</option>)}
        </select>

        {/* Sort */}
        <div className="flex gap-1 bg-cod-card border border-cod-border rounded-lg p-1">
          {([['ttk','TTK'],['stk','STK'],['name','نام']] as const).map(([s, l]) => (
            <button key={s} onClick={() => setSortBy(s)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${sortBy === s ? 'bg-cod-gold text-black' : 'text-gray-400 hover:text-white'}`}>
              {l}
            </button>
          ))}
        </div>
      </div>

      {/* HP badge */}
      <div className="bg-cod-gold/5 border border-cod-gold/20 rounded-xl p-3 text-xs text-cod-gold">
        💡 {HP_PRESETS[hpIndex].label} — TTK سبز (&lt;250ms) = سریع | زرد (250–500ms) = متوسط | قرمز (&gt;500ms) = کند
      </div>

      {/* Table */}
      <div className="bg-cod-card border border-cod-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-cod-card2 text-gray-500 border-b border-cod-border">
              <tr>
                <th className="px-4 py-2.5 text-right">سلاح</th>
                <th className="px-3 py-2.5 text-center">کلاس</th>
                <th className="px-3 py-2.5 text-center">آسیب</th>
                <th className="px-3 py-2.5 text-center">RPM</th>
                <th className="px-3 py-2.5 text-center">STK</th>
                <th className="px-3 py-2.5 text-center min-w-[160px]">TTK</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cod-border">
              {rows.map((w, i) => (
                <tr key={w.id} className={`hover:bg-cod-card2 transition-colors ${i === 0 ? 'bg-green-900/10' : ''}`}>
                  <td className="px-4 py-2.5">
                    <div className="flex items-center gap-2">
                      {i === 0 && <span className="text-green-400 text-xs">🏆</span>}
                      <span className="text-white font-medium">{w.name}</span>
                    </div>
                  </td>
                  <td className="px-3 py-2.5 text-center text-gray-500">{CLASS_FA[w.class] ?? w.class}</td>
                  <td className="px-3 py-2.5 text-center text-orange-400 font-bold">{w.dmg}</td>
                  <td className="px-3 py-2.5 text-center text-gray-400">{w.rpm}</td>
                  <td className="px-3 py-2.5 text-center">
                    <span className="text-blue-400 font-bold">{w.stk}</span>
                    <span className="text-gray-600"> تیر</span>
                  </td>
                  <td className="px-3 py-2.5">
                    <div className="flex items-center gap-2">
                      <TtkBar ms={w.ttk} max={maxTTK} />
                      <span className={`font-bold w-16 text-left text-xs ${ttkColor(w.ttk)}`}>
                        {w.ttk === 0 ? 'یک تیره!' : `${w.ttk}ms`}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-gray-600 text-xs p-3 border-t border-cod-border">
          STK = تعداد تیر برای کشتن | TTK = زمان کشتن از اولین تیر تا آخرین
        </p>
      </div>
    </div>
  )
}
