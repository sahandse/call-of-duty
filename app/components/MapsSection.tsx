'use client'
import { useState, useMemo } from 'react'
import { mapsData } from '../data/mapsData'

type GameFilter = 'all' | 'warzone' | 'mw3'
type SizeFilter = 'all' | 'کوچک' | 'متوسط' | 'بزرگ' | 'عظیم'

export default function MapsSection() {
  const [gameFilter, setGameFilter] = useState<GameFilter>('all')
  const [sizeFilter, setSizeFilter] = useState<SizeFilter>('all')
  const [expandedMap, setExpandedMap] = useState<string | null>(null)

  const filtered = useMemo(() => {
    return mapsData.filter(m => {
      if (gameFilter !== 'all' && m.game !== gameFilter) return false
      if (sizeFilter !== 'all' && m.size !== sizeFilter) return false
      return true
    })
  }, [gameFilter, sizeFilter])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-cod-card border border-cod-border rounded-xl p-4">
        <h2 className="text-white font-bold text-lg flex items-center gap-2">
          🗺️ نقشه‌ها
        </h2>
        <p className="text-gray-500 text-xs mt-0.5">
          اطلاعات، نکات و راهنمای {mapsData.length} نقشه Warzone و MW3
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="flex gap-2">
          {([
            { id: 'all', label: 'همه بازی‌ها' },
            { id: 'warzone', label: '🗺️ وارزون' },
            { id: 'mw3', label: '🎮 MW3' },
          ] as { id: GameFilter; label: string }[]).map(f => (
            <button
              key={f.id}
              onClick={() => setGameFilter(f.id)}
              className={`px-3 py-1.5 rounded-lg text-xs border transition-all ${
                gameFilter === f.id
                  ? 'bg-cod-gold text-black border-cod-gold'
                  : 'bg-cod-card border-cod-border text-gray-400 hover:border-cod-gold/40 hover:text-white'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="w-px h-5 bg-cod-border hidden sm:block" />

        <div className="flex gap-2 flex-wrap">
          <span className="text-gray-500 text-xs self-center">اندازه:</span>
          {(['all', 'کوچک', 'متوسط', 'بزرگ', 'عظیم'] as SizeFilter[]).map(s => (
            <button
              key={s}
              onClick={() => setSizeFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs border transition-all ${
                sizeFilter === s
                  ? 'bg-cod-gold text-black border-cod-gold'
                  : 'bg-cod-card border-cod-border text-gray-400 hover:border-cod-gold/40 hover:text-white'
              }`}
            >
              {s === 'all' ? 'همه' : s}
            </button>
          ))}
        </div>
      </div>

      <p className="text-gray-500 text-xs">{filtered.length} نقشه نمایش داده می‌شود</p>

      {/* Map Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(map => {
          const isExpanded = expandedMap === map.id
          return (
            <div
              key={map.id}
              className="border border-cod-border rounded-xl overflow-hidden transition-all hover:border-cod-gold/30"
            >
              {/* Card Header / Banner */}
              <div className={`relative bg-gradient-to-bl ${map.gradient} p-5 border-b border-cod-border`}>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-3xl">{map.icon}</span>
                    </div>
                    <h3 className="text-white font-black text-xl">{map.name}</h3>
                    <p className="text-gray-300 text-sm">{map.nameFa}</p>
                  </div>
                  <div className="flex flex-col gap-1.5 items-end">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      map.game === 'warzone'
                        ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30'
                        : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                    }`}>
                      {map.game === 'warzone' ? 'وارزون' : 'MW3'}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-cod-card/60 text-gray-300 border border-cod-border">
                      {map.typeFa}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      map.size === 'عظیم' ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                      : map.size === 'بزرگ' ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30'
                      : map.size === 'متوسط' ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                      : 'bg-green-500/20 text-green-300 border border-green-500/30'
                    }`}>
                      {map.size}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="bg-cod-card p-4 space-y-3">
                <p className="text-gray-300 text-sm leading-relaxed">{map.description}</p>

                <button
                  onClick={() => setExpandedMap(isExpanded ? null : map.id)}
                  className="flex items-center gap-2 text-cod-gold text-xs hover:underline"
                >
                  <span>{isExpanded ? '▲ پنهان کردن' : '▼ نمایش نکات'}</span>
                  <span className="text-gray-500">({map.tips.length} نکته)</span>
                </button>

                {isExpanded && (
                  <div className="space-y-2 pt-1">
                    <p className="text-gray-400 text-xs font-medium">💡 نکات بازی:</p>
                    <ul className="space-y-1.5">
                      {map.tips.map((tip, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                          <span className="text-cod-gold flex-shrink-0">•</span>
                          <span className="leading-relaxed">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-gray-500">
          <div className="text-4xl mb-3">🗺️</div>
          <p>نقشه‌ای با این فیلترها یافت نشد</p>
        </div>
      )}
    </div>
  )
}
