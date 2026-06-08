'use client'
import { useState, useEffect, useMemo } from 'react'
import { Objective, ObjectiveType, GameMode } from '../types'
import { typeLabels, gameLabels } from '../data/objectives'
import ObjectiveCard from './ObjectiveCard'

const TYPE_FILTERS: Array<{ id: string; label: string; icon: string }> = [
  { id: 'all',         label: 'همه',         icon: '📋' },
  { id: 'daily',       label: 'روزانه',       icon: '🌅' },
  { id: 'weekly',      label: 'هفتگی',        icon: '📅' },
  { id: 'seasonal',    label: 'فصلی',         icon: '🏆' },
  { id: 'weapon',      label: 'سلاح',         icon: '🔫' },
  { id: 'operator',    label: 'اپراتور',      icon: '🪖' },
  { id: 'battle_pass', label: 'پاس نبرد',    icon: '🎫' },
  { id: 'ranked',      label: 'رتبه‌بندی',   icon: '🏅' },
]

const GAME_FILTERS = [
  { id: 'all',     label: 'همه بازی‌ها' },
  { id: 'warzone', label: 'وارزون' },
  { id: 'mw3',     label: 'MW3' },
]

const SORT_OPTIONS = [
  { id: 'default', label: 'پیش‌فرض' },
  { id: 'xp_desc', label: 'بیشترین XP' },
  { id: 'xp_asc',  label: 'کمترین XP' },
  { id: 'diff',    label: 'سختی' },
]

export default function ObjectivesSection() {
  const [objectives, setObjectives] = useState<Objective[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [gameFilter, setGameFilter] = useState('all')
  const [sortBy, setSortBy] = useState('default')
  const [completed, setCompleted] = useState<Record<string, boolean>>({})

  useEffect(() => {
    fetch('/api/objectives')
      .then(r => r.json())
      .then(d => { setObjectives(d.objectives); setLoading(false) })

    const stored = localStorage.getItem('cod_completed')
    if (stored) setCompleted(JSON.parse(stored))
  }, [])

  const toggleCompleted = (id: string) => {
    const next = { ...completed, [id]: !completed[id] }
    setCompleted(next)
    localStorage.setItem('cod_completed', JSON.stringify(next))
  }

  const filtered = useMemo(() => {
    let list = objectives

    if (typeFilter !== 'all') list = list.filter(o => o.type === typeFilter)
    if (gameFilter !== 'all') list = list.filter(o => o.game === gameFilter || o.game === 'both')

    const q = search.trim().toLowerCase()
    if (q) {
      list = list.filter(o =>
        o.title.toLowerCase().includes(q) ||
        o.description.toLowerCase().includes(q) ||
        o.tags.some(t => t.toLowerCase().includes(q))
      )
    }

    switch (sortBy) {
      case 'xp_desc': return [...list].sort((a, b) => b.xp - a.xp)
      case 'xp_asc':  return [...list].sort((a, b) => a.xp - b.xp)
      case 'diff': {
        const order = { 'آسان': 0, 'متوسط': 1, 'سخت': 2 }
        return [...list].sort((a, b) => order[a.difficulty] - order[b.difficulty])
      }
      default: return list
    }
  }, [objectives, typeFilter, gameFilter, search, sortBy])

  const completedCount = Object.values(completed).filter(Boolean).length
  const totalXP = objectives
    .filter(o => completed[o.id])
    .reduce((sum, o) => sum + o.xp, 0)

  // Group counts by type for the filter badges
  const countByType = useMemo(() => {
    const counts: Record<string, number> = {}
    objectives.forEach(o => { counts[o.type] = (counts[o.type] || 0) + 1 })
    return counts
  }, [objectives])

  return (
    <div className="space-y-6">
      {/* Stats bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'کل اهداف', value: objectives.length, icon: '📋', color: 'text-white' },
          { label: 'تکمیل شده', value: completedCount, icon: '✅', color: 'text-green-400' },
          { label: 'باقی‌مانده', value: objectives.length - completedCount, icon: '⏳', color: 'text-yellow-400' },
          { label: 'XP کسب‌شده', value: `${(totalXP / 1000).toFixed(0)}K`, icon: '⭐', color: 'text-cod-gold' },
        ].map(s => (
          <div key={s.label} className="bg-cod-card border border-cod-border rounded-xl p-3 flex items-center gap-3">
            <span className="text-2xl">{s.icon}</span>
            <div>
              <div className={`text-lg font-bold ${s.color}`}>{s.value}</div>
              <div className="text-gray-500 text-xs">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
        <input
          type="text"
          placeholder="جستجو در اهداف، سلاح‌ها، تگ‌ها..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full bg-cod-card border border-cod-border rounded-xl pr-10 pl-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cod-gold/60 text-sm"
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
          >
            ✕
          </button>
        )}
      </div>

      {/* Filters row */}
      <div className="flex flex-col gap-3">
        {/* Type filter */}
        <div className="flex gap-2 flex-wrap">
          {TYPE_FILTERS.map(f => (
            <button
              key={f.id}
              onClick={() => setTypeFilter(f.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                typeFilter === f.id
                  ? 'bg-cod-gold text-black border-cod-gold'
                  : 'bg-cod-card border-cod-border text-gray-400 hover:border-cod-gold/40 hover:text-white'
              }`}
            >
              <span>{f.icon}</span>
              <span>{f.label}</span>
              {f.id !== 'all' && countByType[f.id] && (
                <span className={`rounded-full w-4 h-4 flex items-center justify-center text-xs ${
                  typeFilter === f.id ? 'bg-black/20' : 'bg-gray-700'
                }`}>
                  {countByType[f.id]}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Game + Sort */}
        <div className="flex gap-2 flex-wrap items-center">
          <div className="flex gap-1 bg-cod-card border border-cod-border rounded-lg p-1">
            {GAME_FILTERS.map(g => (
              <button
                key={g.id}
                onClick={() => setGameFilter(g.id)}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                  gameFilter === g.id
                    ? 'bg-cod-gold text-black'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {g.label}
              </button>
            ))}
          </div>

          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="bg-cod-card border border-cod-border rounded-lg px-3 py-2 text-xs text-gray-300 focus:outline-none focus:border-cod-gold/60"
          >
            {SORT_OPTIONS.map(s => (
              <option key={s.id} value={s.id}>{s.label}</option>
            ))}
          </select>

          <span className="text-gray-500 text-xs mr-auto">
            {filtered.length} نتیجه
          </span>
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="bg-cod-card border border-cod-border rounded-xl h-40 animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <div className="text-5xl mb-3">🔍</div>
          <p>نتیجه‌ای یافت نشد</p>
          <button
            onClick={() => { setSearch(''); setTypeFilter('all'); setGameFilter('all') }}
            className="mt-3 text-cod-gold text-sm hover:underline"
          >
            پاک کردن فیلترها
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in">
          {filtered.map(obj => (
            <ObjectiveCard
              key={obj.id}
              obj={obj}
              completed={!!completed[obj.id]}
              onToggle={toggleCompleted}
              searchQuery={search}
            />
          ))}
        </div>
      )}
    </div>
  )
}
