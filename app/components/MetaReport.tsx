'use client'
import { useMemo, useState } from 'react'
import { metaWeapons } from '../data/metaWeapons'
import { GameMode, MetaTier, WeaponClass } from '../types'
import { CLASS_LABELS, CLASS_ORDER, PATCH_LABEL, TIER_LABEL_FA, TIER_STYLE } from '../lib/weaponLabels'
import SectionHeader from './SectionHeader'
import SourceNote from './SourceNote'

const GAME_FILTERS: { id: GameMode | 'all'; label: string }[] = [
  { id: 'all', label: 'همه' },
  { id: 'warzone', label: 'وارزون' },
  { id: 'mw3', label: 'MW3' },
]

const TIERS: MetaTier[] = ['S', 'A', 'B', 'C', 'D']

function ScoreBar({ label, value, bar }: { label: string; value: number; bar: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="hud-tag w-16 flex-shrink-0 text-right">{label}</span>
      <div className="flex-1 h-1 bg-cod-card2 border border-cod-border">
        <div className={`h-full ${bar}`} style={{ width: `${value * 10}%` }} />
      </div>
      <span className="hud-num text-[11px] w-4">{value}</span>
    </div>
  )
}

export default function MetaReport() {
  const [tierFilter, setTierFilter] = useState<MetaTier | 'all'>('all')
  const [gameFilter, setGameFilter] = useState<GameMode | 'all'>('all')
  const [classFilter, setClassFilter] = useState<WeaponClass | 'all'>('all')
  const [open, setOpen] = useState<string | null>(null)

  const filtered = useMemo(
    () =>
      metaWeapons.filter(w => {
        if (tierFilter !== 'all' && w.tier !== tierFilter) return false
        if (gameFilter !== 'all' && w.game !== 'both' && w.game !== gameFilter) return false
        if (classFilter !== 'all' && w.class !== classFilter) return false
        return true
      }),
    [tierFilter, gameFilter, classFilter]
  )

  const changedCount = metaWeapons.filter(w => w.changesFa.length > 0).length

  function chip(active: boolean) {
    return `px-3 py-1.5 text-[11px] tracking-wider uppercase transition-colors border ${
      active
        ? 'bg-cod-gold text-black border-cod-gold'
        : 'bg-cod-card text-gray-400 border-cod-border hover:text-white hover:border-cod-gold/40'
    }`
  }

  return (
    <div className="space-y-5">
      <SectionHeader
        tab="meta"
        title="تیرلیست متای سیزن ۵"
        note={`حافظه‌ی بایگانیِ متای پایان سیزن ۵ — ${metaWeapons.length} سلاح، ${changedCount} تای آن‌ها در پچ‌های رسمی دست خورده‌اند.`}
        stats={[
          { label: 'سلاح', value: metaWeapons.length },
          { label: 'تغییر در پچ', value: changedCount },
          { label: 'تیر S', value: metaWeapons.filter(w => w.tier === 'S').length },
        ]}
      />

      <SourceNote kind="warning" source="یادداشت‌های رسمی Activision + Charlie INTEL / Dexerto">
        اعداد ۱ تا ۱۰ هر کارت جمع‌بندی تحریری ما از همان متای سیزن ۵ است، نه آمار درون‌بازی.
        تنها ردیف‌های «تغییرات رسمی» از جدول Weapon Adjustments پچ گرفته شده‌اند.
        فهرست بیلد هم فقط برای دو سلاح (STG44 و Static-HV) از مقالهٔ منبع‌دار آمده و در بقیه، تنها اتچمنتی نوشته شده
        که خودِ پچ‌نوت برای همان سلاح نام برده باشد.
      </SourceNote>

      <div className="hud-frame bg-cod-panel p-4 space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="hud-tag w-10">تیر</span>
          <button className={chip(tierFilter === 'all')} onClick={() => setTierFilter('all')}>
            همه
          </button>
          {TIERS.map(t => (
            <button key={t} className={chip(tierFilter === t)} onClick={() => setTierFilter(t)}>
              {t} · {TIER_LABEL_FA[t]}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="hud-tag w-10">بازی</span>
          {GAME_FILTERS.map(g => (
            <button key={g.id} className={chip(gameFilter === g.id)} onClick={() => setGameFilter(g.id)}>
              {g.label}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="hud-tag w-10">کلاس</span>
          <button className={chip(classFilter === 'all')} onClick={() => setClassFilter('all')}>
            همه
          </button>
          {CLASS_ORDER.filter(c => metaWeapons.some(w => w.class === c)).map(c => (
            <button key={c} className={chip(classFilter === c)} onClick={() => setClassFilter(c)}>
              {CLASS_LABELS[c]}
            </button>
          ))}
        </div>
        <p className="text-gray-500 text-xs pt-1">
          {filtered.length} سلاح نمایش داده می‌شود · برای دیدن نکات و تغییرات رسمی روی کارت بزن
        </p>
      </div>

      {TIERS.map(tier => {
        const style = TIER_STYLE[tier]
        const rows = filtered.filter(w => w.tier === tier)
        if (rows.length === 0) return null
        return (
          <section key={tier}>
            <div className="flex items-center gap-3 mb-3">
              <span className={`hud-num text-lg font-black px-3 py-0.5 ${style.chip}`}>{tier}</span>
              <h3 className="hud-eyebrow">{TIER_LABEL_FA[tier]}</h3>
              <div className="flex-1 h-px bg-cod-border" />
              <span className="hud-tag">{rows.length}</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              {rows.map(w => {
                const isOpen = open === w.id
                return (
                  <article key={w.id} className={`hud-frame border ${style.border} ${style.bg}`}>
                    <button
                      onClick={() => setOpen(isOpen ? null : w.id)}
                      className="w-full text-right p-4 flex items-start justify-between gap-3"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`hud-num text-[10px] font-black px-1.5 ${style.chip}`}>{w.tier}</span>
                          <span className="hud-tag">{w.addedIn}</span>
                          <span className="hud-tag">
                            {w.game === 'both' ? 'WZ + MP' : w.game === 'warzone' ? 'WARZONE' : 'MW3'}
                          </span>
                        </div>
                        <h4 className="text-white font-bold text-base leading-none">{w.name}</h4>
                        <p className="text-gray-500 text-xs mt-1">{CLASS_LABELS[w.class]}</p>
                      </div>
                      <span className="text-cod-gold text-xs whitespace-nowrap">
                        {isOpen ? '▲ بستن' : '▼ جزئیات'}
                      </span>
                    </button>

                    <div className="px-4 pb-4 space-y-1.5">
                      <ScoreBar label="آسیب" value={w.damage} bar={style.bar} />
                      <ScoreBar label="برد" value={w.range} bar={style.bar} />
                      <ScoreBar label="نرخ آتش" value={w.fireRate} bar={style.bar} />
                      <ScoreBar label="تحرک" value={w.mobility} bar={style.bar} />
                      <ScoreBar label="کنترل" value={w.control} bar={style.bar} />
                      <p className="text-gray-500 text-[11px] pt-1 leading-relaxed">{w.scoresNoteFa}</p>
                    </div>

                    {isOpen && (
                      <div className="border-t border-cod-border p-4 space-y-4 text-sm">
                        <div>
                          <p className="hud-eyebrow mb-1">بهترین برای</p>
                          <p className="text-gray-300">{w.bestFor}</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="bg-cod-card border border-cod-green/30 p-3">
                            <p className="hud-eyebrow text-cod-green mb-1.5">نقاط قوت</p>
                            <ul className="space-y-1">
                              {w.prosFa.map((p, i) => (
                                <li key={i} className="text-gray-300 text-xs leading-relaxed flex gap-2">
                                  <span className="text-cod-green">+</span>
                                  <span>{p}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="bg-cod-card border border-cod-red/30 p-3">
                            <p className="hud-eyebrow text-cod-red mb-1.5">نقاط ضعف</p>
                            <ul className="space-y-1">
                              {w.consFa.map((p, i) => (
                                <li key={i} className="text-gray-300 text-xs leading-relaxed flex gap-2">
                                  <span className="text-cod-red">−</span>
                                  <span>{p}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div>
                          <p className="hud-eyebrow mb-1.5">تغییرات رسمی پچ</p>
                          {w.changesFa.length === 0 ? (
                            <p className="text-gray-500 text-xs">
                              در یادداشت‌های سیزن ۵ و ریلُود تغییری برای این سلاح ثبت نشده است.
                            </p>
                          ) : (
                            <ul className="space-y-1.5">
                              {w.changesFa.map((c, i) => (
                                <li key={i} className="flex gap-2">
                                  <span className="hud-num text-[10px] font-black px-1.5 bg-cod-card2 text-cod-sand border border-cod-border whitespace-nowrap h-fit">
                                    {PATCH_LABEL[c.patch]}
                                  </span>
                                  <span className="text-gray-300 text-xs leading-relaxed">{c.detail}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>

                        <div>
                          <p className="hud-eyebrow mb-1.5">بیلد مستند</p>
                          {w.topAttachments.length > 0 ? (
                            <>
                              <div className="flex flex-wrap gap-1.5">
                                {w.topAttachments.map(a => (
                                  <span
                                    key={a}
                                    className="text-[11px] px-2 py-0.5 bg-cod-card2 border border-cod-border text-gray-400"
                                  >
                                    {a}
                                  </span>
                                ))}
                              </div>
                              {w.loadoutSource && (
                                <p className="text-gray-600 text-[11px] mt-1.5">
                                  منبع بیلد: {w.loadoutSource}
                                </p>
                              )}
                            </>
                          ) : (
                            <p className="text-gray-600 text-[11px] leading-relaxed">
                              برای این سلاح بیلد مستندی در آرشیو نیست — فهرست اتچمنت فقط آنجایی نوشته می‌شود
                              که خودِ پچ‌نوت یا مقالهٔ منبع‌دار آن را نام برده باشد.
                            </p>
                          )}
                        </div>

                        <p className="text-gray-600 text-[11px] border-t border-cod-border pt-2">
                          منبع تغییرات: {w.verifiedBy}
                        </p>
                      </div>
                    )}
                  </article>
                )
              })}
            </div>
          </section>
        )
      })}

      {filtered.length === 0 && (
        <div className="hud-frame bg-cod-panel p-10 text-center text-gray-500">
          <p className="hud-eyebrow mb-1">NO RESULT</p>
          <p className="text-sm">سلاحی با این فیلترها در بایگانی نیست.</p>
        </div>
      )}
    </div>
  )
}
