'use client'
import { useMemo, useState } from 'react'
import {
  resolvedRoles,
  squadPlans,
  teamBuilderNotes,
  type SquadPlan,
  type SquadResolved,
  type SquadSlotId,
} from '../data/teamBuilderData'
import { CLASS_LABELS, TIER_STYLE } from '../lib/weaponLabels'
import SectionHeader from './SectionHeader'
import SourceNote from './SourceNote'

const SLOT_COUNT = 4

const ROLE_BY_ID: Record<SquadSlotId, SquadResolved> = Object.fromEntries(
  resolvedRoles.map(r => [r.id, r]),
) as Record<SquadSlotId, SquadResolved>

function applyPlan(plan: SquadPlan): (SquadSlotId | null)[] {
  const next: (SquadSlotId | null)[] = Array(SLOT_COUNT).fill(null)
  plan.orderFa.forEach((id, i) => {
    if (i < SLOT_COUNT) next[i] = id
  })
  return next
}

export default function TeamBuilder() {
  const [slots, setSlots] = useState<(SquadSlotId | null)[]>(applyPlan(squadPlans[0]))
  const [planId, setPlanId] = useState<string | null>(squadPlans[0].id)
  const [activeSlot, setActiveSlot] = useState(0)
  const [detailId, setDetailId] = useState<SquadSlotId>('overwatch')

  const detail = ROLE_BY_ID[detailId]

  const weaponPool = useMemo(() => new Set(resolvedRoles.flatMap(r => r.weapons.map(w => w.id))).size, [])
  const filled = slots.filter(Boolean).length

  function assign(id: SquadSlotId) {
    setSlots(prev => {
      const next = [...prev]
      next[activeSlot] = id
      return next
    })
    setPlanId(null)
    setDetailId(id)
    setActiveSlot(prev => (prev < SLOT_COUNT - 1 ? prev + 1 : prev))
  }

  function clearSlot(index: number) {
    setSlots(prev => {
      const next = [...prev]
      next[index] = null
      return next
    })
    setPlanId(null)
  }

  return (
    <div className="space-y-4">
      <SectionHeader
        tab="teambuilder"
        title="چیدمان تیم"
        note={teamBuilderNotes.basisFa}
        stats={[
          { label: 'نقش', value: resolvedRoles.length },
          { label: 'چیدمان', value: squadPlans.length },
          { label: 'سلاح مرجع', value: weaponPool },
          { label: 'پر شده', value: `${filled}/${SLOT_COUNT}` },
        ]}
      >
        {squadPlans.map(p => (
          <button
            key={p.id}
            onClick={() => {
              setSlots(applyPlan(p))
              setPlanId(p.id)
              setActiveSlot(0)
              setDetailId(p.orderFa[0])
            }}
            className={`notch px-3 py-1.5 text-[11.5px] transition-colors ${
              planId === p.id
                ? 'bg-cod-gold text-black'
                : 'border border-cod-border bg-cod-card text-gray-400 hover:text-white'
            }`}
          >
            {p.nameFa}
            <span className={planId === p.id ? 'text-black/60' : 'text-gray-600'}> · {p.sizeFa}</span>
          </button>
        ))}
      </SectionHeader>

      <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
        {slots.map((id, i) => {
          const role = id ? ROLE_BY_ID[id] : null
          return (
            <div
              key={i}
              className={`notch relative bg-cod-card px-3 py-3 ${
                activeSlot === i ? 'border-t-2 border-t-cod-gold' : 'border-t-2 border-t-transparent'
              }`}
            >
              <button onClick={() => setActiveSlot(i)} className="w-full text-right">
                <p className="hud-tag mb-1">
                  PLAYER {String(i + 1).padStart(2, '0')}
                </p>
                {role ? (
                  <>
                    <p className="text-[13px] font-semibold text-white">{role.nameFa}</p>
                    <p className="mt-0.5 text-[11px] text-gray-500">{role.roleFa}</p>
                    <p className="hud-num mt-1.5 text-[10px] text-cod-gold-light">{role.code}</p>
                  </>
                ) : (
                  <p className="py-3 text-[12px] text-gray-600">جای خالی — یک نقش انتخاب کنید</p>
                )}
              </button>
              {role && (
                <button
                  onClick={() => clearSlot(i)}
                  className="absolute left-1.5 top-1.5 px-1 text-[11px] text-gray-600 hover:text-cod-red"
                  aria-label={`خالی کردن اسلات ${i + 1}`}
                >
                  ✕
                </button>
              )}
            </div>
          )
        })}
      </div>

      <div className="hud-frame bg-cod-panel p-3">
        <p className="hud-tag mb-2">
          نقش برای PLAYER {String(activeSlot + 1).padStart(2, '0')}
        </p>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {resolvedRoles.map(r => (
            <div key={r.id} className="notch flex flex-col bg-cod-card px-3 py-2.5">
              <button onClick={() => assign(r.id)} className="text-right">
                <p className="mb-0.5 flex items-baseline gap-2">
                  <span className="hud-num text-[10px] text-cod-gold">{r.code}</span>
                  <span className="text-[13px] font-semibold text-white">{r.nameFa}</span>
                </p>
                <p className="text-[11px] leading-relaxed text-gray-500">{r.roleFa}</p>
              </button>
              <button
                onClick={() => setDetailId(r.id)}
                className="mt-2 self-start text-[11px] text-cod-steel hover:text-white"
              >
                جزئیات لودآوت
              </button>
            </div>
          ))}
        </div>
      </div>

      <article className="hud-frame space-y-4 bg-cod-panel p-4">
        <header className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="hud-eyebrow mb-1">
              <span className="hud-num text-cod-gold">{detail.code}</span>
              <span className="mx-2 text-cod-border-light">|</span>
              ROLE PROFILE
            </p>
            <h3 className="hud-title text-lg font-bold text-white">{detail.nameFa}</h3>
            <p className="mt-0.5 text-xs text-gray-500">{detail.roleFa}</p>
          </div>
          <p className="hud-tag text-cod-steel">{detail.combo.styleFa}</p>
        </header>

        <p className="text-[13px] leading-relaxed text-gray-300">{detail.briefFa}</p>

        <div className="grid gap-4 lg:grid-cols-2">
          <section>
            <h4 className="hud-tag mb-2 text-cod-green">WEAPON SHORTLIST</h4>
            <ul className="space-y-1.5">
              {detail.weapons.map(w => (
                <li key={w.id} className="notch flex items-start gap-2 bg-cod-card px-2.5 py-2">
                  <span
                    className={`hud-num shrink-0 border px-1.5 py-0.5 text-[10px] ${TIER_STYLE[w.tier].chip}`}
                  >
                    {w.tier}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[12.5px] font-semibold text-white">{w.name}</span>
                    <span className="block text-[11px] text-gray-500">
                      {CLASS_LABELS[w.class]} — {w.bestFor}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-2 text-[11px] leading-relaxed text-gray-600">
              رده‌ها از جدول متای سیزن ۵ می‌آیند؛ اگر یک سلاح ردهٔ پایین دارد، همان‌طور نشان داده می‌شود.
            </p>
          </section>

          <section className="space-y-3">
            <div>
              <h4 className="hud-tag mb-2 text-cod-steel">BASE BUILD</h4>
              <dl className="notch divide-y divide-cod-border bg-cod-card">
                {[
                  ['VEST', detail.vestFa],
                  ['GLOVES', detail.glovesFa],
                  ['BOOTS', detail.bootsFa],
                  ['GEAR', detail.gearFa.join(' + ') || '—'],
                  ['FIELD UPGRADE', detail.fieldUpgradeFa],
                ].map(([label, value]) => (
                  <div key={label} className="flex items-baseline justify-between gap-3 px-2.5 py-1.5">
                    <dt className="hud-tag shrink-0">{label}</dt>
                    <dd className="text-right text-[12px] text-gray-300">{value}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-2 text-[11px] leading-relaxed text-gray-500">{detail.combo.whyFa}</p>
              {detail.combo.s5NoteFa && (
                <p className="mt-1.5 text-[11px] leading-relaxed text-cod-sand">{detail.combo.s5NoteFa}</p>
              )}
            </div>

            <div>
              <h4 className="hud-tag mb-2 text-cod-gold">PRIORITY</h4>
              <ol className="space-y-1.5">
                {detail.focusOrderFa.map((f, i) => (
                  <li key={f} className="flex gap-2 text-[12px] leading-relaxed text-gray-300">
                    <span className="hud-num shrink-0 text-cod-gold">{String(i + 1).padStart(2, '0')}</span>
                    {f}
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <h4 className="hud-tag mb-2 text-cod-green">DROP NOTES</h4>
              <ul className="space-y-1.5">
                {detail.tipsFa.map(t => (
                  <li key={t} className="flex gap-2 text-[12px] leading-relaxed text-gray-400">
                    <span className="mt-[7px] h-1 w-1 shrink-0 bg-cod-green" aria-hidden />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>
      </article>

      <div className="grid gap-2 md:grid-cols-3">
        {squadPlans.map(p => (
          <div key={p.id} className="notch bg-cod-card px-3 py-2.5">
            <p className="mb-1 flex items-baseline justify-between gap-2">
              <span className="text-[12.5px] font-semibold text-white">{p.nameFa}</span>
              <span className="hud-num text-[10px] text-gray-600">{p.sizeFa}</span>
            </p>
            <p className="hud-num mb-2 text-[10px] text-cod-gold-light">
              {p.orderFa.map(id => ROLE_BY_ID[id].code).join(' → ')}
            </p>
            <p className="text-[11.5px] leading-relaxed text-gray-400">{p.whyFa}</p>
            <p className="mt-1.5 text-[11px] leading-relaxed text-gray-600">{p.noteFa}</p>
          </div>
        ))}
      </div>

      <div className="notch border-r-2 border-cod-sand bg-cod-card px-3.5 py-2.5 text-[11.5px] leading-relaxed text-gray-400">
        <span className="hud-tag mr-2 text-cod-sand">PATCH CONTEXT</span>
        {teamBuilderNotes.killstreakFa} {teamBuilderNotes.changedFa}
      </div>

      <SourceNote kind="verified" source={teamBuilderNotes.sourceFa}>
        هیچ سلاح، جلیقه یا تجهیزی در این تب از خود ساخته نشده است؛ فهرست‌ها ارجاع مستقیم به داده‌های تأییدشدهٔ
        سیزن ۵ هستند و فقط نام نقش‌ها و چیدمان‌ها تحریری است.
      </SourceNote>
    </div>
  )
}
