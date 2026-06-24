'use client'
import { useState, useEffect } from 'react'
import { currentEvents, EventType } from '../data/eventsData'

const TYPE_STYLE: Record<EventType, string> = {
  double_xp:        'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  double_weapon_xp: 'bg-blue-500/20   text-blue-300   border-blue-500/30',
  ltm:              'bg-orange-500/20  text-orange-300  border-orange-500/30',
  seasonal:         'bg-cod-gold/20   text-cod-gold   border-cod-gold/30',
  community:        'bg-green-500/20  text-green-300  border-green-500/30',
}

function useCountdown(endDate: string) {
  const [label, setLabel] = useState('')
  useEffect(() => {
    function update() {
      const diff = new Date(endDate).getTime() - Date.now()
      if (diff <= 0) { setLabel('پایان یافته'); return }
      const d = Math.floor(diff / 86400000)
      const h = Math.floor((diff % 86400000) / 3600000)
      const m = Math.floor((diff % 3600000) / 60000)
      setLabel(d > 0 ? `${d}ر ${h}س ${m}د` : `${h}س ${m}د`)
    }
    update()
    const id = setInterval(update, 30000)
    return () => clearInterval(id)
  }, [endDate])
  return label
}

function isActive(start: string, end: string) {
  const now = Date.now()
  return new Date(start).getTime() <= now && now <= new Date(end).getTime()
}

function EventCard({ event }: { event: typeof currentEvents[0] }) {
  const [completed, setCompleted] = useState<Set<string>>(new Set())
  const countdown = useCountdown(event.endDate)
  const active = isActive(event.startDate, event.endDate)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const key = `cod-event-${event.id}`
    const stored = JSON.parse(localStorage.getItem(key) || '[]')
    setCompleted(new Set(stored))
  }, [event.id])

  function toggle(id: string) {
    setCompleted(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      localStorage.setItem(`cod-event-${event.id}`, JSON.stringify(Array.from(next)))
      return next
    })
  }

  const totalXP = event.challenges.reduce((s, c) => s + c.xp, 0)
  const earnedXP = event.challenges.filter(c => completed.has(c.id)).reduce((s, c) => s + c.xp, 0)

  return (
    <div className={`bg-cod-card border ${event.colorClass} rounded-xl overflow-hidden`}>
      {/* Header */}
      <div className="p-4 border-b border-cod-border">
        <div className="flex items-start gap-3">
          <span className="text-3xl">{event.icon}</span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h3 className="text-white font-bold">{event.nameFa}</h3>
              <span className={`text-xs px-2 py-0.5 rounded-full border ${TYPE_STYLE[event.type]}`}>{event.typeFa}</span>
              {active
                ? <span className="flex items-center gap-1 text-xs text-green-400"><span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block animate-pulse" />فعال</span>
                : <span className="text-xs text-gray-500">غیرفعال</span>
              }
            </div>
            <p className="text-gray-400 text-xs">{event.description}</p>
          </div>
          {active && (
            <div className="flex-shrink-0 text-left">
              <p className="text-gray-500 text-xs">پایان در</p>
              <p className="text-cod-gold text-xs font-bold">{countdown}</p>
            </div>
          )}
        </div>
      </div>

      {/* Challenges */}
      {event.challenges.length > 0 && (
        <div className="p-4">
          {totalXP > 0 && (
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-400 text-xs">پیشرفت چالش‌ها</span>
              <span className="text-cod-gold text-xs font-bold">{earnedXP.toLocaleString()} / {totalXP.toLocaleString()} XP</span>
            </div>
          )}
          {totalXP > 0 && (
            <div className="h-1.5 bg-gray-700 rounded-full mb-3 overflow-hidden">
              <div className="h-full bg-cod-gold rounded-full transition-all" style={{ width: `${(earnedXP/totalXP)*100}%` }} />
            </div>
          )}
          <div className="space-y-2">
            {event.challenges.map(ch => (
              <label key={ch.id} className={`flex items-start gap-3 p-2.5 rounded-lg cursor-pointer transition-colors ${
                completed.has(ch.id) ? 'bg-green-900/20 border border-green-700/30' : 'bg-cod-card2 border border-transparent hover:border-cod-border'
              }`}>
                <input type="checkbox" className="sr-only" checked={completed.has(ch.id)} onChange={() => toggle(ch.id)} />
                <div className={`w-4 h-4 rounded border-2 flex-shrink-0 flex items-center justify-center mt-0.5 transition-colors ${
                  completed.has(ch.id) ? 'bg-green-500 border-green-500' : 'border-gray-600'
                }`}>
                  {completed.has(ch.id) && <span className="text-white text-xs">✓</span>}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className={`text-xs font-medium ${completed.has(ch.id) ? 'text-gray-400 line-through' : 'text-white'}`}>{ch.nameFa}</p>
                    <span className="text-xs text-cod-gold">{ch.xp.toLocaleString()} XP</span>
                  </div>
                  <p className="text-gray-500 text-xs">{ch.descFa}</p>
                  <p className="text-xs text-gray-600 mt-0.5">جایزه: {ch.rewardFa}</p>
                </div>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Rewards */}
      {event.rewards.length > 0 && (
        <div className="p-4 border-t border-cod-border bg-cod-card2">
          <p className="text-gray-500 text-xs mb-2">🎁 جوایز کلی</p>
          <div className="flex flex-wrap gap-1.5">
            {event.rewards.map((r, i) => (
              <span key={i} className="text-xs bg-cod-card border border-cod-border text-gray-300 px-2 py-0.5 rounded-full">{r}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function ActiveEvents() {
  const active = currentEvents.filter(e => isActive(e.startDate, e.endDate))
  const upcoming = currentEvents.filter(e => new Date(e.startDate).getTime() > Date.now())
  const ended = currentEvents.filter(e => new Date(e.endDate).getTime() < Date.now())

  return (
    <div className="space-y-6">
      <div className="bg-cod-card border border-cod-border rounded-xl p-4">
        <h2 className="text-white font-bold text-lg">🎉 رویدادهای فعال</h2>
        <p className="text-gray-500 text-xs mt-1">رویدادها و چالش‌های جاری سیزن با تایمر بروزرسانی خودکار</p>
      </div>

      {active.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-white font-semibold text-sm flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse inline-block" />
            در حال اجرا ({active.length})
          </h3>
          {active.map(e => <EventCard key={e.id} event={e} />)}
        </div>
      )}

      {upcoming.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-gray-400 font-semibold text-sm">🔜 به زودی ({upcoming.length})</h3>
          {upcoming.map(e => <EventCard key={e.id} event={e} />)}
        </div>
      )}

      {ended.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-gray-600 font-semibold text-sm">⏹️ پایان یافته ({ended.length})</h3>
          {ended.map(e => <EventCard key={e.id} event={e} />)}
        </div>
      )}

      {currentEvents.length === 0 && (
        <div className="text-center py-16 text-gray-500">
          <p className="text-4xl mb-3">🎮</p>
          <p>در حال حاضر رویداد فعالی وجود ندارد</p>
        </div>
      )}
    </div>
  )
}
