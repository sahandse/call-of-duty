'use client'
import { useState } from 'react'
import { settingsCategories } from '../data/settingsData'

export default function SettingsGuide() {
  const [activeCategory, setActiveCategory] = useState('display')
  const [platformFilter, setPlatformFilter] = useState<'all' | 'pc' | 'console'>('all')

  const currentCategory = settingsCategories.find(c => c.id === activeCategory)
  const filteredSettings = currentCategory?.settings.filter(s =>
    !s.platform || s.platform === 'all' || platformFilter === 'all' || s.platform === platformFilter
  ) ?? []

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-cod-card border border-cod-border rounded-xl p-4">
        <h2 className="text-white font-bold text-lg flex items-center gap-2">⚙️ تنظیمات پیشنهادی</h2>
        <p className="text-gray-500 text-xs mt-1">بهترین تنظیمات برای عملکرد بهتر در Warzone و Modern Warfare 3</p>
      </div>

      {/* Platform filter */}
      <div className="flex gap-2 items-center">
        <span className="text-gray-500 text-xs">پلتفرم:</span>
        <div className="flex gap-1 bg-cod-card border border-cod-border rounded-lg p-1">
          {([['all', 'همه'], ['pc', '🖥️ PC'], ['console', '🎮 کنسول']] as const).map(([id, label]) => (
            <button key={id} onClick={() => setPlatformFilter(id)}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${platformFilter === id ? 'bg-cod-gold text-black' : 'text-gray-400 hover:text-white'}`}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Tip banner */}
      <div className="bg-cod-gold/5 border border-cod-gold/20 rounded-xl p-3 text-xs text-cod-gold">
        💡 این تنظیمات بر اساس توصیه بازیکنان حرفه‌ای و content creatorهای CoD است. بعضی از تنظیمات سلیقه‌ای است.
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Category sidebar */}
        <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
          {settingsCategories
            .filter(c => !('platform' in c) || platformFilter === 'all' || c.id !== 'mouse_keyboard' || platformFilter === 'pc')
            .map(cat => (
              <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap border ${
                  activeCategory === cat.id
                    ? 'bg-cod-gold text-black border-cod-gold'
                    : 'bg-cod-card border-cod-border text-gray-400 hover:text-white hover:border-cod-gold/30'
                }`}>
                <span>{cat.icon}</span>
                <span>{cat.nameFa}</span>
              </button>
            ))}
        </div>

        {/* Settings list */}
        <div className="lg:col-span-3 space-y-3">
          {filteredSettings.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p>برای این پلتفرم تنظیماتی در این دسته وجود ندارد</p>
            </div>
          ) : filteredSettings.map(s => (
            <div key={s.key} className="bg-cod-card border border-cod-border rounded-xl p-4 flex items-start gap-4 hover:border-cod-gold/20 transition-colors">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-white font-medium text-sm">{s.nameFa}</p>
                  {s.platform && s.platform !== 'all' && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-gray-700 text-gray-400">
                      {s.platform === 'pc' ? '🖥️ PC' : '🎮 کنسول'}
                    </span>
                  )}
                </div>
                <p className="text-gray-500 text-xs">{s.reason}</p>
              </div>
              <div className="flex-shrink-0 text-left">
                <span className="bg-cod-gold/15 text-cod-gold text-xs font-bold px-3 py-1.5 rounded-lg border border-cod-gold/30">
                  {s.recommended}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
