'use client'
import { useState, useEffect } from 'react'
import { collectionItems, CollectionCategory, CollectionRarity, RARITY_STYLE, RARITY_FA, CATEGORY_FA, CATEGORY_ICON } from '../data/collectionData'

const CATEGORIES: CollectionCategory[] = ['operator', 'blueprint', 'calling_card', 'emblem', 'charm', 'vehicle_skin']
const RARITIES: CollectionRarity[] = ['ultra', 'legendary', 'epic', 'rare', 'uncommon', 'common']

export default function CollectionTracker() {
  const [owned, setOwned] = useState<Set<string>>(new Set())
  const [activeCategory, setActiveCategory] = useState<CollectionCategory | 'all'>('all')
  const [rarityFilter, setRarityFilter] = useState<CollectionRarity | 'all'>('all')
  const [showOwned, setShowOwned] = useState<'all' | 'owned' | 'missing'>('all')

  useEffect(() => {
    if (typeof window === 'undefined') return
    const stored = JSON.parse(localStorage.getItem('cod-collection') || '[]')
    setOwned(new Set(stored))
  }, [])

  function toggle(id: string) {
    setOwned(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      localStorage.setItem('cod-collection', JSON.stringify(Array.from(next)))
      return next
    })
  }

  const filtered = collectionItems.filter(item => {
    if (activeCategory !== 'all' && item.category !== activeCategory) return false
    if (rarityFilter !== 'all' && item.rarity !== rarityFilter) return false
    if (showOwned === 'owned' && !owned.has(item.id)) return false
    if (showOwned === 'missing' && owned.has(item.id)) return false
    return true
  })

  const total = collectionItems.length
  const totalOwned = collectionItems.filter(i => owned.has(i.id)).length
  const pct = total > 0 ? Math.round((totalOwned / total) * 100) : 0

  return (
    <div className="space-y-6">
      <div className="bg-cod-card border border-cod-border rounded-xl p-4">
        <h2 className="text-white font-bold text-lg">🏆 ردیاب کالکشن</h2>
        <p className="text-gray-500 text-xs mt-1">اپراتورها، بلوپرینت‌ها، کارت تماس، آرم، چارم و پوسته وسیله نقلیه</p>
      </div>

      {/* Overall progress */}
      <div className="bg-cod-card border border-cod-border rounded-xl p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-white font-bold">کالکشن کلی</span>
          <span className="text-cod-gold font-bold">{totalOwned}/{total} ({pct}%)</span>
        </div>
        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-cod-gold to-yellow-400 rounded-full transition-all" style={{ width: `${pct}%` }} />
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mt-4">
          {CATEGORIES.map(cat => {
            const catItems = collectionItems.filter(i => i.category === cat)
            const catOwned = catItems.filter(i => owned.has(i.id)).length
            return (
              <button key={cat} onClick={() => setActiveCategory(activeCategory === cat ? 'all' : cat)}
                className={`text-center p-2 rounded-lg border transition-all ${
                  activeCategory === cat ? 'border-cod-gold bg-cod-gold/10' : 'border-cod-border bg-cod-card2 hover:border-cod-gold/30'
                }`}>
                <div className="text-lg mb-1">{CATEGORY_ICON[cat]}</div>
                <div className="text-xs text-gray-400">{catOwned}/{catItems.length}</div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        <div className="flex gap-1 bg-cod-card border border-cod-border rounded-lg p-1">
          {(['all', 'owned', 'missing'] as const).map(f => (
            <button key={f} onClick={() => setShowOwned(f)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${showOwned === f ? 'bg-cod-gold text-black' : 'text-gray-400 hover:text-white'}`}>
              {f === 'all' ? 'همه' : f === 'owned' ? '✓ دارم' : '✗ ندارم'}
            </button>
          ))}
        </div>
        <select value={rarityFilter} onChange={e => setRarityFilter(e.target.value as CollectionRarity | 'all')}
          className="bg-cod-card border border-cod-border rounded-lg px-3 py-1.5 text-xs text-gray-300 focus:outline-none focus:border-cod-gold/60">
          <option value="all">همه کمیابی‌ها</option>
          {RARITIES.map(r => <option key={r} value={r}>{RARITY_FA[r]}</option>)}
        </select>
      </div>

      {/* Category breadcrumb */}
      {activeCategory !== 'all' && (
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-500">{CATEGORY_ICON[activeCategory]}</span>
          <span className="text-white font-medium">{CATEGORY_FA[activeCategory]}</span>
          <button onClick={() => setActiveCategory('all')} className="text-xs text-cod-gold hover:underline mr-2">مشاهده همه</button>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {filtered.map(item => (
          <button key={item.id} onClick={() => toggle(item.id)}
            className={`relative text-center p-3 rounded-xl border transition-all hover:scale-105 ${
              owned.has(item.id)
                ? `${RARITY_STYLE[item.rarity]} border-opacity-80`
                : 'bg-cod-card2 border-cod-border opacity-50 hover:opacity-70'
            }`}>
            {owned.has(item.id) && (
              <span className="absolute top-1.5 left-1.5 w-4 h-4 rounded-full bg-green-500 flex items-center justify-center">
                <span className="text-white text-xs font-bold">✓</span>
              </span>
            )}
            <div className="text-2xl mb-1.5">{item.icon}</div>
            <div className="text-xs font-medium text-white leading-tight mb-1">{item.nameFa}</div>
            <div className={`text-xs ${RARITY_STYLE[item.rarity]} px-1.5 py-0.5 rounded-full border inline-block`}>
              {RARITY_FA[item.rarity]}
            </div>
            <div className="text-gray-600 text-xs mt-1 truncate">{item.sourceFa}</div>
          </button>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <p className="text-3xl mb-3">🔍</p>
          <p>آیتمی با این فیلتر یافت نشد</p>
        </div>
      )}

      <p className="text-gray-600 text-xs text-center">روی هر آیتم کلیک کنید تا آن را به عنوان «دارم» علامت‌گذاری کنید</p>
    </div>
  )
}
