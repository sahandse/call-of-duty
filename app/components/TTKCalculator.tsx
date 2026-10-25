'use client'
import { useMemo, useState } from 'react'
import { HP_PRESETS, OfficialStat, calcSTK, calcTTK, officialStats } from '../data/ttkData'
import { GameMode, PatchTag } from '../types'
import SectionHeader from './SectionHeader'
import SourceNote from './SourceNote'

const GAME_TABS: { id: GameMode | 'all'; label: string }[] = [
  { id: 'all', label: 'همه' },
  { id: 'warzone', label: 'وارزون' },
  { id: 'mw3', label: 'MW3' },
  { id: 'both' as GameMode, label: 'هر دو' },
]

const PATCH_TABS: (PatchTag | 'all')[] = ['all', 'S5', 'S5R']

function NumberField({
  label,
  value,
  onChange,
  min,
  max,
  step = 1,
  suffix,
}: {
  label: string
  value: number
  onChange: (v: number) => void
  min: number
  max: number
  step?: number
  suffix?: string
}) {
  return (
    <label className="block">
      <div className="flex items-baseline justify-between mb-1">
        <span className="hud-tag">{label}</span>
        <span className="hud-num text-sm text-white">
          {value}
          {suffix && <span className="text-gray-500 text-[10px]"> {suffix}</span>}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full accent-cod-gold"
        aria-label={label}
      />
    </label>
  )
}

export default function TTKCalculator() {
  const [hp, setHp] = useState(150)
  const [damage, setDamage] = useState(32)
  const [rpm, setRpm] = useState(700)
  const [zone, setZone] = useState<'body' | 'head' | 'limb'>('body')
  const [headMult, setHeadMult] = useState(1.5)
  const [limbMult, setLimbMult] = useState(0.9)
  const [gameTab, setGameTab] = useState<GameMode | 'all'>('all')
  const [patchTab, setPatchTab] = useState<PatchTag | 'all'>('all')
  const [query, setQuery] = useState('')

  const mult = zone === 'head' ? headMult : zone === 'limb' ? limbMult : 1
  const effective = Math.round(damage * mult)
  const stk = calcSTK(hp, effective)
  const ttk = calcTTK(hp, effective, rpm)

  const rows = useMemo(
    () =>
      officialStats.filter(s => {
        if (gameTab !== 'all' && s.game !== gameTab) return false
        if (patchTab !== 'all' && s.patch !== patchTab) return false
        if (query && !`${s.weapon} ${s.metricFa} ${s.value} ${s.contextFa}`.includes(query)) return false
        return true
      }),
    [gameTab, patchTab, query]
  )

  function chip(active: boolean) {
    return `px-3 py-1.5 text-[11px] tracking-wider uppercase border transition-colors ${
      active
        ? 'bg-cod-gold text-black border-cod-gold'
        : 'bg-cod-card text-gray-400 border-cod-border hover:text-white hover:border-cod-gold/40'
    }`
  }

  return (
    <div className="space-y-5">
      <SectionHeader
        tab="ttk"
        title="محاسبه‌گر زمان کشیدن"
        note="یک ابزار «چه شود اگر» — خودت آسیب و نرخ آتش را بده تا TTK را ببینی. اعداد پایین‌تر، تنها اعدادِ رسمیِ منتشرشده‌اند."
        stats={[
          { label: 'STK', value: stk },
          { label: 'TTK', value: `${ttk}ms` },
        ]}
      />

      <SourceNote kind="warning" source="یادداشت‌های رسمی سیزن ۵ و سیزن ۵ ریلُود">
        Activision هیچ‌وقت جدول کامل آسیب و Rate of Fire سلاح‌های MW3 را منتشر نکرد. به همین‌خاطر این ماشین‌حساب
        پیش‌فرضِ «سلاح آماده» ندارد: آسیب و rpm را خودت وارد می‌کنی — معمولاً از همان اعدادِ جدول
        پایین این صفحه.
      </SourceNote>

      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-4">
        <div className="hud-frame bg-cod-card p-4 space-y-4">
          <p className="hud-eyebrow">ورودی</p>

          <div className="flex flex-wrap gap-2">
            {HP_PRESETS.map(p => (
              <button
                key={p.value}
                onClick={() => setHp(p.value)}
                className={`px-2.5 py-1 text-[11px] border transition-colors ${
                  hp === p.value
                    ? 'bg-cod-gold text-black border-cod-gold'
                    : 'bg-cod-card2 text-gray-400 border-cod-border hover:text-white'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          <NumberField label="جان + زره (HP)" value={hp} onChange={setHp} min={1} max={300} />
          <NumberField label="آسیب هر تیر به تنه" value={damage} onChange={setDamage} min={1} max={120} />
          <NumberField label="نرخ آتش" value={rpm} onChange={setRpm} min={30} max={1200} step={10} suffix="rpm" />

          <div className="flex flex-wrap gap-2">
            {([
              { id: 'body', label: 'تنه' },
              { id: 'head', label: 'سر' },
              { id: 'limb', label: 'دست و پا' },
            ] as const).map(z => (
              <button key={z.id} className={chip(zone === z.id)} onClick={() => setZone(z.id)}>
                {z.label}
              </button>
            ))}
          </div>

          {zone !== 'body' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {zone === 'head' && (
                <NumberField
                  label="ضریب هدشات"
                  value={Math.round(headMult * 100) / 100}
                  onChange={setHeadMult}
                  min={1}
                  max={3}
                  step={0.05}
                  suffix="x"
                />
              )}
              {zone === 'limb' && (
                <NumberField
                  label="ضریب دست و پا"
                  value={Math.round(limbMult * 100) / 100}
                  onChange={setLimbMult}
                  min={0.5}
                  max={1.5}
                  step={0.05}
                  suffix="x"
                />
              )}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="hud-frame bg-cod-panel p-5">
            <p className="hud-eyebrow mb-3">خروجی</p>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="border border-cod-border bg-cod-card p-3">
                <p className="hud-num text-3xl font-black text-cod-gold">{stk}</p>
                <p className="hud-tag mt-1">شات لازم</p>
              </div>
              <div className="border border-cod-border bg-cod-card p-3">
                <p className="hud-num text-3xl font-black text-white">{ttk}</p>
                <p className="hud-tag mt-1">میلی‌ثانیه</p>
              </div>
              <div className="border border-cod-border bg-cod-card p-3">
                <p className="hud-num text-3xl font-black text-cod-sand">{effective}</p>
                <p className="hud-tag mt-1">آسیب مؤثر</p>
              </div>
            </div>
            <div className="mt-4 h-2 bg-cod-card2 border border-cod-border">
              <div
                className="h-full bg-cod-gold transition-all"
                style={{ width: `${Math.min(100, (ttk / 1500) * 100)}%` }}
              />
            </div>
            <p className="text-gray-500 text-[11px] mt-2">
              نوار = TTK نسبت به سقف ۱۵۰۰ms. هرچه کوتاه‌تر، سلاح در این فاصله کشنده‌تر.
            </p>
          </div>

          <div className="hud-frame bg-cod-card p-4">
            <p className="hud-eyebrow mb-2">فرمول</p>
            <div className="space-y-1.5 text-xs text-gray-400 font-mono" dir="ltr">
              <p>effective = damage × {mult.toFixed(2)} = {effective}</p>
              <p>shots = ceil(HP / effective) = {stk}</p>
              <p>interval = 60000 / rpm = {rpm > 0 ? Math.round(60000 / rpm) : 0} ms</p>
              <p className="text-cod-gold">TTK = (shots − 1) × interval = {ttk} ms</p>
            </div>
            <p className="text-gray-600 text-[11px] mt-2 leading-relaxed">
              شات آخر فاصله‌ی بین دو شات را مصرف نمی‌کند؛ به همین‌خاطر «شات منهای یک» حساب می‌شود. این مدل
              ساده‌سازیِ عمدی است: زمان ADS، sprint-to-fire و افت آسیب با فاصله را حساب نمی‌کند.
            </p>
          </div>
        </div>
      </div>

      <section className="space-y-3">
        <div className="flex flex-wrap items-center gap-3 justify-between">
          <p className="hud-eyebrow">اعداد رسمی منتشرشده · {officialStats.length} مورد</p>
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="جستجوی سلاح…"
            className="bg-cod-card border border-cod-border px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cod-gold/60 w-40"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {GAME_TABS.map(g => (
            <button key={g.id} className={chip(gameTab === g.id)} onClick={() => setGameTab(g.id)}>
              {g.label}
            </button>
          ))}
          <span className="w-px h-5 bg-cod-border hidden sm:block self-center" />
          {PATCH_TABS.map(p => (
            <button key={p} className={chip(patchTab === p)} onClick={() => setPatchTab(p)}>
              {p === 'all' ? 'همه پچ‌ها' : p}
            </button>
          ))}
        </div>

        <div className="hud-frame bg-cod-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="bg-cod-card2 text-gray-500">
                <tr>
                  <th className="px-4 py-2 text-right">سلاح</th>
                  <th className="px-3 py-2">پچ</th>
                  <th className="px-3 py-2 text-right">متریک</th>
                  <th className="px-3 py-2 text-right">مقدار</th>
                  <th className="px-4 py-2 text-right">توضیح</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cod-border">
                {rows.map((s: OfficialStat) => (
                  <tr key={s.id} className="hover:bg-cod-card2 align-top">
                    <td className="px-4 py-2 text-white whitespace-nowrap">{s.weapon}</td>
                    <td className="px-3 py-2 text-center">
                      <span className="hud-num text-[10px] font-black px-1.5 bg-cod-card2 text-cod-sand border border-cod-border">
                        {s.patch}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-gray-300 whitespace-nowrap">{s.metricFa}</td>
                    <td className="px-3 py-2 hud-num text-cod-gold whitespace-nowrap" dir="ltr">
                      {s.value}
                    </td>
                    <td className="px-4 py-2 text-gray-500 leading-relaxed">{s.contextFa || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {rows.length === 0 && (
            <div className="p-8 text-center text-gray-500 text-sm">موردی با این فیلترها پیدا نشد.</div>
          )}
        </div>
        <p className="text-gray-600 text-[11px]">
          «پچ» یعنی S5 = سیزن ۵ (24 ژوئیه 2024) و S5R = سیزن ۵ ریلُود (21 اوت 2024). ستون «مقدار» عیناً از
          یادداشت‌های رسمی کپی شده است.
        </p>
      </section>
    </div>
  )
}
