'use client'
import { useEffect, useState } from 'react'
import { GameEvent, season5Events } from '../data/eventsData'
import SectionHeader from './SectionHeader'
import SourceNote from './SourceNote'

const KIND_STYLE: Record<GameEvent['kind'], { chip: string; bar: string }> = {
  festival: { chip: 'text-cod-gold border-cod-gold/40 bg-cod-gold/10', bar: 'bg-cod-gold' },
  field_rep: { chip: 'text-cod-green border-cod-green/40 bg-cod-green/10', bar: 'bg-cod-green' },
  conquest: { chip: 'text-cod-sand border-cod-sand/40 bg-cod-sand/10', bar: 'bg-cod-sand' },
  esports: { chip: 'text-cod-steel border-cod-steel/40 bg-cod-steel/10', bar: 'bg-cod-steel' },
}

function daysBetween(a: string, b: string) {
  return Math.max(1, Math.round((new Date(b).getTime() - new Date(a).getTime()) / 86400000))
}

function formatFa(date: string) {
  return new Date(date).toLocaleDateString('fa-IR', { day: 'numeric', month: 'long', year: 'numeric' })
}

function EventRow({
  event,
  done,
  onToggle,
}: {
  event: GameEvent
  done: boolean
  onToggle: () => void
}) {
  const [open, setOpen] = useState(false)
  const style = KIND_STYLE[event.kind]
  const single = event.startDate === event.endDate

  return (
    <article className={`hud-frame bg-cod-card transition-colors ${done ? 'border-cod-green/40' : ''}`}>
      <div className="flex items-stretch">
        <div className={`w-1 flex-shrink-0 ${done ? 'bg-cod-green' : style.bar}`} />
        <div className="flex-1 min-w-0">
          <button onClick={() => setOpen(o => !o)} className="w-full text-right p-4">
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className={`text-[10px] tracking-wider uppercase px-1.5 py-0.5 border ${style.chip}`}>
                {event.kindFa}
              </span>
              <span className="hud-tag">
                {single
                  ? formatFa(event.startDate)
                  : `${formatFa(event.startDate)} — ${formatFa(event.endDate)}`}
              </span>
              <span className="hud-num text-[10px] text-gray-600">
                {single ? '۱ روز' : `${daysBetween(event.startDate, event.endDate)} روز`}
              </span>
              {event.dateNoteFa && (
                <span className="hud-num text-[10px] text-cod-red border border-cod-red/30 px-1.5 py-0.5">
                  تاریخ متناقض
                </span>
              )}
            </div>
            <h3 className="text-white font-bold leading-tight">{event.nameFa}</h3>
            <p className="text-gray-500 text-xs mt-0.5">{event.name}</p>
          </button>

          {open && (
            <div className="px-4 pb-4 space-y-3 border-t border-cod-border pt-3">
              <div>
                <p className="hud-eyebrow mb-1">سازوکار</p>
                <p className="text-gray-300 text-sm leading-relaxed">{event.mechanicFa}</p>
              </div>

              {event.dateNoteFa && (
                <div className="border-r-2 border-cod-red/50 bg-cod-red/5 px-3 py-2">
                  <p className="hud-eyebrow text-cod-red mb-1">تناقض در منبع رسمی</p>
                  <p className="text-gray-400 text-xs leading-relaxed">{event.dateNoteFa}</p>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <p className="hud-eyebrow mb-1">پاداش‌ها</p>
                  <ul className="space-y-1">
                    {event.rewardsFa.map((r, i) => (
                      <li key={i} className="text-gray-300 text-xs flex gap-2 leading-relaxed">
                        <span className="text-cod-gold">›</span>
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-2">
                  <div>
                    <p className="hud-eyebrow mb-1">مودها</p>
                    <div className="flex flex-wrap gap-1">
                      {event.modesFa.map(m => (
                        <span key={m} className="text-[11px] px-1.5 py-0.5 bg-cod-card2 border border-cod-border text-gray-400">
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                  {event.boostWith && (
                    <div>
                      <p className="hud-eyebrow mb-1">بوست XP</p>
                      <p className="text-gray-400 text-xs">با تجهیز {event.boostWith}</p>
                    </div>
                  )}
                </div>
              </div>

              {event.noteFa && (
                <p className="text-gray-500 text-xs leading-relaxed border-t border-cod-border pt-2">{event.noteFa}</p>
              )}

              <button
                onClick={onToggle}
                className={`text-[11px] px-3 py-1.5 border transition-colors ${
                  done
                    ? 'bg-cod-green/10 border-cod-green/50 text-cod-green'
                    : 'bg-cod-card2 border-cod-border text-gray-400 hover:text-white hover:border-cod-gold/40'
                }`}
              >
                {done ? '✓ در یادداشت‌های من ثبت شد' : 'ثبت در یادداشت‌های من'}
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  )
}

export default function ActiveEvents() {
  const [done, setDone] = useState<Set<string>>(new Set())

  useEffect(() => {
    if (typeof window === 'undefined') return
    const next = new Set<string>()
    season5Events.forEach(e => {
      const raw = localStorage.getItem(`cod-event-${e.id}`)
      if (raw === 'true') next.add(e.id)
    })
    setDone(next)
  }, [])

  function toggle(id: string) {
    setDone(prev => {
      const next = new Set(prev)
      const value = !next.has(id)
      if (value) next.add(id)
      else next.delete(id)
      localStorage.setItem(`cod-event-${id}`, String(value))
      return next
    })
  }

  return (
    <div className="space-y-5">
      <SectionHeader
        tab="events"
        title="رویدادهای سیزن ۵"
        note="بایگانی رویدادهای محدود سیزن ۵ (۲۴ ژوئیه تا ۱۸ سپتامبر ۲۰۲۴) — این تقویم زنده نیست."
        stats={[
          { label: 'رویداد', value: season5Events.length },
          {
            label: 'بازه',
            value: `${formatFa('2024-07-24')} به بعد`,
          },
          { label: 'ثبت‌شده', value: `${done.size}/${season5Events.length}` },
        ]}
      />

      <SourceNote kind="archive" source="یادداشت‌های رسمی سیزن ۵ و سیزن ۵ ریلُود">
        هیچ‌کدام از این رویدادها امروز اجرا نمی‌شوند. تاریخ‌ها و سازوکارها از یادداشت‌های رسمی همان سیزن
        استخراج شده‌اند؛ جایی که دو سند رسمی با هم نمی‌خواندند، هر دو تاریخ ذکر شده.
      </SourceNote>

      <div className="space-y-3">
        {season5Events.map(e => (
          <EventRow key={e.id} event={e} done={done.has(e.id)} onToggle={() => toggle(e.id)} />
        ))}
      </div>

      <div className="hud-frame bg-cod-panel p-4">
        <p className="hud-eyebrow mb-2">توالی سیزن</p>
        <ol className="space-y-1.5">
          {season5Events.map(e => (
            <li key={e.id} className="flex items-center gap-3 text-xs">
              <span className="hud-num text-gray-600 w-20 flex-shrink-0" dir="ltr">
                {e.startDate.slice(5)}
              </span>
              <span className={`w-1.5 h-1.5 flex-shrink-0 ${KIND_STYLE[e.kind].bar}`} />
              <span className={done.has(e.id) ? 'text-cod-green' : 'text-gray-300'}>{e.name}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
