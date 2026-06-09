'use client'
import { useState } from 'react'
import { patchNotes } from '../data/patchNotes'

const CATEGORY_COLORS: Record<string, string> = {
  weapons: 'text-red-400 border-red-500/30 bg-red-500/5',
  warzone: 'text-blue-400 border-blue-500/30 bg-blue-500/5',
  multiplayer: 'text-purple-400 border-purple-500/30 bg-purple-500/5',
  operators: 'text-green-400 border-green-500/30 bg-green-500/5',
  bugs: 'text-yellow-400 border-yellow-500/30 bg-yellow-500/5',
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('fa-IR', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default function PatchNotesSection() {
  const [expandedPatch, setExpandedPatch] = useState<string>(patchNotes[0]?.id || '')
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set())

  const toggleCategory = (key: string) => {
    setExpandedCategories(prev => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  const sorted = [...patchNotes].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-cod-card border border-cod-border rounded-xl p-4">
        <h2 className="text-white font-bold text-lg flex items-center gap-2">
          📋 پَچ نوتس
        </h2>
        <p className="text-gray-500 text-xs mt-0.5">
          تاریخچه بروزرسانی‌ها، بالانس سلاح‌ها و محتوای جدید
        </p>
      </div>

      <div className="space-y-4">
        {sorted.map((patch, idx) => {
          const isExpanded = expandedPatch === patch.id
          const isLatest = idx === 0
          return (
            <div
              key={patch.id}
              className={`border rounded-xl overflow-hidden transition-all ${
                isExpanded ? 'border-cod-gold/40' : 'border-cod-border'
              }`}
            >
              {/* Patch Header */}
              <button
                className="w-full bg-cod-card p-5 text-right flex items-start gap-4 hover:bg-cod-card2 transition-colors"
                onClick={() => setExpandedPatch(isExpanded ? '' : patch.id)}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-2">
                    {isLatest && (
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-cod-gold text-black">
                        جدید
                      </span>
                    )}
                    <span className="text-xs px-2 py-0.5 rounded-full bg-cod-card2 border border-cod-border text-cod-gold font-medium">
                      {patch.version}
                    </span>
                    <span className="text-gray-500 text-xs">{formatDate(patch.date)}</span>
                  </div>
                  <h3 className="text-white font-bold text-base text-right">{patch.titleFa}</h3>
                  <p className="text-gray-400 text-xs mt-1 text-right leading-relaxed">{patch.summary}</p>
                  <div className="flex gap-1.5 mt-3 flex-wrap">
                    {patch.changes.map(c => (
                      <span
                        key={c.category}
                        className={`text-xs px-2 py-0.5 rounded-full border ${
                          CATEGORY_COLORS[c.category] || 'text-gray-400 border-gray-700 bg-gray-800'
                        }`}
                      >
                        {c.categoryFa}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex-shrink-0 text-gray-400 text-lg mt-1">
                  {isExpanded ? '▲' : '▼'}
                </div>
              </button>

              {/* Patch Details */}
              {isExpanded && (
                <div className="bg-cod-bg border-t border-cod-border p-5 space-y-3">
                  {patch.changes.map(change => {
                    const catKey = `${patch.id}-${change.category}`
                    const isCatExpanded = expandedCategories.has(catKey)
                    const colorClass = CATEGORY_COLORS[change.category] || 'text-gray-400 border-gray-700 bg-gray-800'
                    return (
                      <div
                        key={change.category}
                        className={`border rounded-xl overflow-hidden ${colorClass.split(' ').filter(c => c.startsWith('border')).join(' ')}`}
                      >
                        <button
                          className={`w-full p-3 text-right flex items-center justify-between ${
                            colorClass.split(' ').filter(c => c.startsWith('bg')).join(' ')
                          }`}
                          onClick={() => toggleCategory(catKey)}
                        >
                          <div className="flex items-center gap-2">
                            <span className={`font-bold text-sm ${colorClass.split(' ').filter(c => c.startsWith('text')).join(' ')}`}>
                              {change.categoryFa}
                            </span>
                            <span className="text-gray-600 text-xs">({change.items.length} تغییر)</span>
                          </div>
                          <span className="text-gray-500 text-sm">{isCatExpanded ? '▲' : '▼'}</span>
                        </button>

                        {isCatExpanded && (
                          <ul className="p-3 space-y-1.5 bg-cod-card">
                            {change.items.map((item, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                                <span className="text-gray-600 flex-shrink-0 mt-0.5">•</span>
                                <span className="leading-relaxed">{item}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )
                  })}

                  <button
                    onClick={() => {
                      const allKeys = patch.changes.map(c => `${patch.id}-${c.category}`)
                      const anyExpanded = allKeys.some(k => expandedCategories.has(k))
                      setExpandedCategories(prev => {
                        const next = new Set(prev)
                        if (anyExpanded) {
                          allKeys.forEach(k => next.delete(k))
                        } else {
                          allKeys.forEach(k => next.add(k))
                        }
                        return next
                      })
                    }}
                    className="text-cod-gold text-xs hover:underline"
                  >
                    {patch.changes.some(c => expandedCategories.has(`${patch.id}-${c.category}`))
                      ? 'بستن همه'
                      : 'باز کردن همه'}
                  </button>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
