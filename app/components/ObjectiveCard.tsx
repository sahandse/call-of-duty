'use client'
import { Objective } from '../types'
import { typeLabels } from '../data/objectives'

interface Props {
  obj: Objective
  completed: boolean
  onToggle: (id: string) => void
  searchQuery: string
}

function highlight(text: string, query: string) {
  if (!query) return text
  const parts = text.split(new RegExp(`(${query})`, 'gi'))
  return parts.map((p, i) =>
    p.toLowerCase() === query.toLowerCase()
      ? <mark key={i} className="bg-cod-gold/30 text-cod-gold-light rounded px-0.5">{p}</mark>
      : p
  )
}

const xpFormat = (n: number) =>
  n >= 1000 ? `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}K` : `${n}`

export default function ObjectiveCard({ obj, completed, onToggle, searchQuery }: Props) {
  const { icon } = typeLabels[obj.type] || { icon: '🎯' }

  return (
    <div
      className={`relative group rounded-xl border bg-cod-card hover:bg-cod-card2 transition-all duration-200 overflow-hidden cursor-pointer select-none ${
        completed
          ? 'border-green-500/40 opacity-60'
          : 'border-cod-border hover:border-cod-gold/40'
      }`}
      onClick={() => onToggle(obj.id)}
    >
      {/* Completed overlay */}
      {completed && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <span className="text-green-400 text-4xl opacity-20">✓</span>
        </div>
      )}

      {/* Top stripe by type */}
      <div className={`h-0.5 w-full badge-${obj.type}`} />

      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <span className="text-lg">{icon}</span>
            <h3 className="text-white font-bold text-sm leading-snug">
              {highlight(obj.title, searchQuery)}
            </h3>
          </div>
          <div className={`shrink-0 text-xs px-2 py-0.5 rounded-full border badge-${obj.type}`}>
            {obj.typeFa}
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-400 text-xs leading-relaxed mb-3">
          {highlight(obj.description, searchQuery)}
        </p>

        {/* Footer row */}
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            {/* XP */}
            <span className="flex items-center gap-1 text-xs font-bold text-cod-green bg-cod-green/10 px-2 py-0.5 rounded-full border border-cod-green/30">
              ⭐ {xpFormat(obj.xp)} XP
            </span>
            {/* Difficulty */}
            <span className={`text-xs font-medium diff-${obj.difficulty}`}>
              {obj.difficulty === 'آسان' ? '●' : obj.difficulty === 'متوسط' ? '●●' : '●●●'} {obj.difficulty}
            </span>
          </div>
          {/* Game */}
          <span className={`text-xs px-2 py-0.5 rounded border ${
            obj.game === 'warzone'
              ? 'text-green-400 border-green-400/30 bg-green-400/10'
              : obj.game === 'mw3'
              ? 'text-blue-400 border-blue-400/30 bg-blue-400/10'
              : 'text-gray-400 border-gray-400/20 bg-gray-400/5'
          }`}>
            {obj.gameFa}
          </span>
        </div>

        {/* Progress bar (visual only) */}
        <div className="mt-3 h-1 bg-gray-800 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              completed ? 'bg-green-500 w-full' : 'bg-cod-gold/60 w-0 group-hover:w-1/4'
            }`}
          />
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-gray-600 text-xs">{completed ? obj.maxProgress : 0} / {obj.maxProgress}</span>
          {obj.weaponClass && (
            <span className="text-gray-600 text-xs">{obj.weaponClass}</span>
          )}
        </div>
      </div>
    </div>
  )
}
