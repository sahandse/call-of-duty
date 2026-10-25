'use client'
import { useMemo, useState } from 'react'
import { metaWeapons } from '../data/metaWeapons'
import { MetaWeapon, WeaponClass } from '../types'
import { CLASS_LABELS, TIER_STYLE } from '../lib/weaponLabels'
import SectionHeader from './SectionHeader'
import SourceNote from './SourceNote'

const STATS = [
  { key: 'damage', label: 'آسیب', color: 'bg-cod-red' },
  { key: 'range', label: 'برد', color: 'bg-cod-steel' },
  { key: 'fireRate', label: 'نرخ آتش', color: 'bg-cod-gold' },
  { key: 'mobility', label: 'تحرک', color: 'bg-cod-green' },
  { key: 'control', label: 'کنترل', color: 'bg-cod-sand' },
] as const

function StatBar({ value, color }: { value: number; color: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-2 bg-cod-card2 border border-cod-border">
        <div className={`h-full ${color}`} style={{ width: `${value * 10}%` }} />
      </div>
      <span className="hud-num text-xs w-5 text-left">{value}</span>
    </div>
  )
}

function totalScore(w: MetaWeapon) {
  return w.damage + w.range + w.fireRate + w.mobility + w.control
}

export default function WeaponCompare() {
  const [slot, setSlot] = useState<'a' | 'b'>('a')
  const [weaponA, setWeaponA] = useState<string>(metaWeapons[0]?.id ?? '')
  const [weaponB, setWeaponB] = useState<string>(metaWeapons[3]?.id ?? '')
  const [classFilter, setClassFilter] = useState<WeaponClass | 'all'>('all')
  const [gameFilter, setGameFilter] = useState<string>('all')

  const classes = useMemo(
    () => Array.from(new Set(metaWeapons.map(w => w.class))),
    []
  )

  const filtered = useMemo(
    () =>
      metaWeapons.filter(w => {
        if (classFilter !== 'all' && w.class !== classFilter) return false
        if (gameFilter !== 'all' && w.game !== 'both' && w.game !== gameFilter) return false
        return true
      }),
    [classFilter, gameFilter]
  )

  const w1 = metaWeapons.find(w => w.id === weaponA)
  const w2 = metaWeapons.find(w => w.id === weaponB)

  function pick(id: string) {
    if (slot === 'a') {
      setWeaponA(id)
      if (id === weaponB) setWeaponB(weaponA)
    } else {
      setWeaponB(id)
      if (id === weaponA) setWeaponA(weaponB)
    }
    setSlot(s => (s === 'a' ? 'b' : 'a'))
  }

  function chip(active: boolean) {
    return `px-3 py-1.5 text-[11px] tracking-wider uppercase border transition-colors ${
      active
        ? 'bg-cod-gold text-black border-cod-gold'
        : 'bg-cod-card text-gray-400 border-cod-border hover:text-white hover:border-cod-gold/40'
    }`
  }

  const t1 = w1 ? totalScore(w1) : 0
  const t2 = w2 ? totalScore(w2) : 0

  return (
    <div className="space-y-5">
      <SectionHeader
        tab="compare"
        title="مقایسه دو سلاح"
        note="دو سلاح از تیرلیست سیزن ۵ را کنار هم بگذار. امتیازها همان جمع‌بندی تحریری تیرلیست است، نه آمار بازی."
        stats={[
          { label: 'اسلات A', value: w1 ? w1.name : '—' },
          { label: 'اسلات B', value: w2 ? w2.name : '—' },
        ]}
      />

      <div className="hud-frame bg-cod-panel p-4 space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="hud-tag w-12">بازی</span>
          {['all', 'warzone', 'mw3'].map(g => (
            <button key={g} className={chip(gameFilter === g)} onClick={() => setGameFilter(g)}>
              {g === 'all' ? 'همه' : g === 'warzone' ? 'وارزون' : 'MW3'}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="hud-tag w-12">کلاس</span>
          <button className={chip(classFilter === 'all')} onClick={() => setClassFilter('all')}>
            همه
          </button>
          {classes.map(c => (
            <button key={c} className={chip(classFilter === c)} onClick={() => setClassFilter(c)}>
              {CLASS_LABELS[c]}
            </button>
          ))}
        </div>
        <p className="text-gray-500 text-xs">
          اسلات فعال: <span className="text-cod-gold">{slot === 'a' ? 'A' : 'B'}</span> — روی هر ردیف جدول بزن تا
          جای آن عوض شود.
        </p>
      </div>

      {w1 && w2 && (
        <div className="hud-frame bg-cod-card overflow-hidden">
          <div className="grid grid-cols-[1fr_auto_1fr] items-stretch border-b border-cod-border">
            {[w1, w2].map((w, i) => {
              const st = TIER_STYLE[w.tier]
              return (
                <div
                  key={w.id}
                  className={`p-4 ${i === 0 ? 'border-l border-cod-border' : 'order-3 border-r border-cod-border'}`}
                >
                  <p className="hud-eyebrow mb-1">اسلات {i === 0 ? 'A' : 'B'}</p>
                  <h3 className="text-white font-bold text-lg leading-none">{w.name}</h3>
                  <p className="text-gray-500 text-xs mt-1">{CLASS_LABELS[w.class]}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`hud-num text-[10px] font-black px-1.5 ${st.chip}`}>{w.tier}</span>
                    <span className="hud-tag">{w.addedIn}</span>
                    <span className="hud-num text-xs text-cod-gold">{totalScore(w)}/50</span>
                  </div>
                </div>
              )
            })}
            <div className="flex items-center justify-center px-3 order-2">
              <span className="hud-num text-gray-600 font-black">VS</span>
            </div>
          </div>

          <div className="divide-y divide-cod-border">
            {STATS.map(s => {
              const v1 = w1[s.key]
              const v2 = w2[s.key]
              return (
                <div key={s.key} className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 py-2.5">
                  <div className={v1 >= v2 ? 'opacity-100' : 'opacity-50'}>
                    <StatBar value={v1} color={s.color} />
                  </div>
                  <span className="hud-tag w-20 text-center">{s.label}</span>
                  <div className={`${v2 >= v1 ? 'opacity-100' : 'opacity-50'} flex justify-end`}>
                    <div className="w-full">
                      <StatBar value={v2} color={s.color} />
                    </div>
                  </div>
                </div>
              )
            })}
            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 py-3 bg-cod-card2">
              <span className={`hud-num ${t1 >= t2 ? 'text-cod-gold font-black' : 'text-gray-500'}`}>{t1}/50</span>
              <span className="hud-tag w-20 text-center">امتیاز کل</span>
              <span className={`hud-num text-right ${t2 >= t1 ? 'text-cod-gold font-black' : 'text-gray-500'}`}>
                {t2}/50
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 border-t border-cod-border divide-y sm:divide-y-0 sm:divide-x divide-cod-border">
            {[w1, w2].map((w, i) => (
              <div key={w.id} className="p-4 space-y-3">
                <div>
                  <p className="hud-eyebrow mb-1">بهترین برای</p>
                  <p className="text-gray-300 text-sm">{w.bestFor}</p>
                </div>
                <div>
                  <p className="hud-eyebrow mb-1">بیلد پیشنهادی</p>
                  <ul className="space-y-1">
                    {w.topAttachments.map(a => (
                      <li key={a} className="text-xs text-gray-400 flex gap-2">
                        <span className="text-cod-gold">›</span>
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="hud-eyebrow mb-1">تغییرات رسمی</p>
                  {w.changesFa.length === 0 ? (
                    <p className="text-gray-600 text-xs">در پچ‌های سیزن ۵ تغییری نکرد.</p>
                  ) : (
                    <ul className="space-y-1">
                      {w.changesFa.map((c, j) => (
                        <li key={j} className="text-xs text-gray-400 leading-relaxed">
                          <span className="hud-num text-cod-sand">{c.patch}</span> {c.detail}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-cod-border bg-cod-card2">
            <p className="hud-eyebrow mb-1">جمع‌بندی</p>
            {t1 === t2 ? (
              <p className="text-gray-400 text-sm">
                امتیاز این دو برابر است — {w1.name} و {w2.name} را بر اساس سبک بازی انتخاب کن.
              </p>
            ) : (
              <p className="text-gray-300 text-sm">
                <span className="text-cod-gold font-bold">{t1 > t2 ? w1.name : w2.name}</span> در امتیاز کلی جلوتر
                است، اما امتیاز کلی هیچ‌وقت تنها معیار نیست: {t1 > t2 ? w2.name : w1.name} در فیلدهای
                {STATS.filter(s => (t1 > t2 ? w2[s.key] : w1[s.key]) > (t1 > t2 ? w1[s.key] : w2[s.key])).map(s => s.label).join('، ') || '—'}
                برتر است.
              </p>
            )}
          </div>
        </div>
      )}

      <div className="hud-frame bg-cod-card overflow-hidden">
        <div className="px-4 py-3 border-b border-cod-border">
          <p className="hud-eyebrow">جدول امتیازات · {filtered.length} سلاح</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-cod-card2 text-gray-500">
              <tr>
                <th className="px-4 py-2 text-right">سلاح</th>
                <th className="px-3 py-2">تیر</th>
                {STATS.map(s => (
                  <th key={s.key} className="px-3 py-2">{s.label}</th>
                ))}
                <th className="px-3 py-2">جمع</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cod-border">
              {[...filtered]
                .sort((a, b) => totalScore(b) - totalScore(a))
                .map(w => {
                  const st = TIER_STYLE[w.tier]
                  const chosen = weaponA === w.id ? 'A' : weaponB === w.id ? 'B' : null
                  return (
                    <tr
                      key={w.id}
                      onClick={() => pick(w.id)}
                      className={`cursor-pointer hover:bg-cod-card2 ${chosen ? 'bg-cod-gold/5' : ''}`}
                    >
                      <td className="px-4 py-2">
                        <div className="flex items-center gap-2">
                          <span className="text-white">{w.name}</span>
                          {chosen && <span className="hud-num text-[10px] text-cod-gold">{chosen}</span>}
                        </div>
                        <span className="text-gray-600">{CLASS_LABELS[w.class]}</span>
                      </td>
                      <td className="px-3 py-2 text-center">
                        <span className={`hud-num text-[10px] font-black px-1.5 ${st.chip}`}>{w.tier}</span>
                      </td>
                      <td className="px-3 py-2 text-center hud-num">{w.damage}</td>
                      <td className="px-3 py-2 text-center hud-num">{w.range}</td>
                      <td className="px-3 py-2 text-center hud-num">{w.fireRate}</td>
                      <td className="px-3 py-2 text-center hud-num">{w.mobility}</td>
                      <td className="px-3 py-2 text-center hud-num">{w.control}</td>
                      <td className="px-3 py-2 text-center hud-num text-cod-gold font-black">{totalScore(w)}</td>
                    </tr>
                  )
                })}
            </tbody>
          </table>
        </div>
      </div>

      <SourceNote kind="warning">
        امتیازهای این صفحه قضاوت تحریری ما درباره متای سیزن ۵ است. برای دیدن اعداد رسمیِ هر سلاح، تب «پچ‌نوتس» را ببین.
      </SourceNote>
    </div>
  )
}
