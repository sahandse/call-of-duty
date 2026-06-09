'use client'
import { useState } from 'react'
import { shopHistory } from '../data/shopHistory'
import { shopCatalog } from '../data/shopCatalog'

const RARITY_COLORS: Record<string, string> = {
  'معمولی': 'border-gray-600 bg-gray-900/30',
  'نادر': 'border-blue-600 bg-blue-900/20',
  'حماسی': 'border-purple-600 bg-purple-900/20',
  'افسانه‌ای': 'border-yellow-500 bg-yellow-900/20',
  'فوق‌العاده': 'border-red-500 bg-red-900/20',
}

const RARITY_TEXT: Record<string, string> = {
  'معمولی': 'text-gray-400',
  'نادر': 'text-blue-400',
  'حماسی': 'text-purple-400',
  'افسانه‌ای': 'text-yellow-400',
  'فوق‌العاده': 'text-red-400',
}

function getItemById(id: string) {
  return shopCatalog.find(item => item.id === id)
}

export default function ShopHistory() {
  const [selectedDay, setSelectedDay] = useState(0)

  const day = shopHistory[selectedDay]

  const featuredItems = day.featured.map(getItemById).filter(Boolean)
  const dailyItems = day.daily.map(getItemById).filter(Boolean)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-cod-card border border-cod-border rounded-xl p-4">
        <h2 className="text-white font-bold text-lg flex items-center gap-2">
          🕐 تاریخچه شاپ
        </h2>
        <p className="text-gray-500 text-xs mt-0.5">
          آیتم‌های شاپ ۵ روز گذشته را مرور کنید
        </p>
      </div>

      {/* Day Selector */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {shopHistory.map((d, i) => (
          <button
            key={d.date}
            onClick={() => setSelectedDay(i)}
            className={`flex-shrink-0 px-4 py-2 rounded-xl border text-sm transition-all ${
              selectedDay === i
                ? 'bg-cod-gold text-black border-cod-gold font-bold'
                : 'bg-cod-card border-cod-border text-gray-400 hover:border-cod-gold/40 hover:text-white'
            }`}
          >
            <div className="font-medium">{d.dateFa}</div>
            {i === 0 && (
              <div className="text-xs opacity-70">امروز</div>
            )}
          </button>
        ))}
      </div>

      {/* Featured Items */}
      {featuredItems.length > 0 && (
        <section>
          <h3 className="text-cod-gold font-bold text-base mb-4 flex items-center gap-2">
            ⭐ آیتم‌های ویژه
            <span className="text-gray-500 font-normal text-sm">({featuredItems.length} آیتم)</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featuredItems.map(item => {
              if (!item) return null
              const rarityClass = RARITY_COLORS[item.rarity] || RARITY_COLORS['معمولی']
              const textClass = RARITY_TEXT[item.rarity] || RARITY_TEXT['معمولی']
              return (
                <div
                  key={item.id}
                  className={`border rounded-xl p-4 transition-all ${rarityClass}`}
                  style={{
                    background: `linear-gradient(135deg, ${item.colorScheme[0]}40, ${item.colorScheme[1]}40)`,
                  }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-3xl">{item.icon}</span>
                    <div className="flex flex-col items-end gap-1">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${rarityClass.split(' ').join(' ')} ${textClass}`}>
                        {item.rarity}
                      </span>
                      {item.isFeatured && (
                        <span className="text-xs bg-cod-gold/20 text-cod-gold border border-cod-gold/30 px-1.5 py-0.5 rounded">
                          ویژه
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-white font-bold text-sm mb-1">{item.nameFa}</p>
                  <p className="text-gray-400 text-xs mb-3">{item.categoryFa}</p>
                  {item.includes && item.includes.length > 0 && (
                    <div className="mb-3 space-y-1">
                      {item.includes.slice(0, 3).map((inc, i) => (
                        <div key={i} className="text-gray-500 text-xs flex items-center gap-1">
                          <span className="text-cod-gold">•</span> {inc}
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="flex items-center justify-between mt-auto">
                    <div>
                      {item.originalPrice && (
                        <span className="text-gray-600 text-xs line-through mr-1">
                          {item.originalPrice.toLocaleString('fa-IR')}
                        </span>
                      )}
                      <span className="text-cod-gold font-bold text-base">
                        {item.price.toLocaleString('fa-IR')} CP
                      </span>
                    </div>
                    {item.discount && (
                      <span className="text-green-400 text-xs bg-green-900/30 border border-green-700/30 px-1.5 py-0.5 rounded">
                        -{item.discount}٪
                      </span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      )}

      {/* Daily Items */}
      {dailyItems.length > 0 && (
        <section>
          <h3 className="text-white font-bold text-base mb-4 flex items-center gap-2">
            🗓️ آیتم‌های روزانه
            <span className="text-gray-500 font-normal text-sm">({dailyItems.length} آیتم)</span>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {dailyItems.map(item => {
              if (!item) return null
              const rarityClass = RARITY_COLORS[item.rarity] || RARITY_COLORS['معمولی']
              const textClass = RARITY_TEXT[item.rarity] || RARITY_TEXT['معمولی']
              return (
                <div
                  key={item.id}
                  className={`border rounded-xl p-3 ${rarityClass}`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">{item.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium text-xs truncate">{item.nameFa}</p>
                      <p className="text-gray-500 text-xs">{item.categoryFa}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs ${textClass}`}>{item.rarity}</span>
                    <span className="text-cod-gold font-bold text-sm">
                      {item.price.toLocaleString('fa-IR')}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      )}

      <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-4 text-sm text-blue-300">
        <p className="font-bold mb-1">💡 درباره تاریخچه شاپ</p>
        <p className="text-xs text-gray-400 leading-relaxed">
          آیتم‌های شاپ هر روز ساعت ۰۰:۰۰ UTC تغییر می‌کنند. تاریخچه ۵ روز اخیر در اینجا قابل مشاهده است.
          برخی آیتم‌های ویژه ممکن است دوباره در شاپ ظاهر شوند.
        </p>
      </div>
    </div>
  )
}
