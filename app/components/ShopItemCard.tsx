import { ShopItem } from '../types'

const RARITY_CONFIG: Record<string, { label: string; class: string; textClass: string }> = {
  'معمولی':    { label: 'معمولی',    class: 'rarity-common',    textClass: 'text-gray-400' },
  'نادر':       { label: 'نادر',       class: 'rarity-rare',      textClass: 'text-blue-400' },
  'حماسی':     { label: 'حماسی',     class: 'rarity-epic',      textClass: 'text-purple-400' },
  'افسانه‌ای': { label: 'افسانه‌ای', class: 'rarity-legendary', textClass: 'text-orange-400' },
  'فوق‌العاده':{ label: 'فوق‌العاده',class: 'rarity-ultra',     textClass: 'text-yellow-400' },
}

export default function ShopItemCard({ item }: { item: ShopItem }) {
  const rc = RARITY_CONFIG[item.rarity] || RARITY_CONFIG['معمولی']
  const isUltra = item.rarity === 'فوق‌العاده'

  return (
    <div className={`relative group rounded-xl border-2 bg-cod-card overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${rc.class} ${isUltra ? 'ultra-shine' : ''}`}>
      {/* Badges */}
      <div className="absolute top-2 right-2 flex flex-col gap-1 z-10">
        {item.isFeatured && (
          <span className="text-xs px-2 py-0.5 rounded-full bg-cod-gold text-black font-bold">ویژه</span>
        )}
        {item.isNew && (
          <span className="text-xs px-2 py-0.5 rounded-full bg-green-500 text-black font-bold">جدید</span>
        )}
        {item.discount && (
          <span className="text-xs px-2 py-0.5 rounded-full bg-red-500 text-white font-bold">
            -{item.discount}%
          </span>
        )}
      </div>

      {/* Image area */}
      <div
        className="h-40 flex items-center justify-center relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${item.colorScheme[0]}, ${item.colorScheme[1]})`,
        }}
      >
        <span className="text-6xl drop-shadow-2xl">{item.icon}</span>
      </div>

      {/* Info */}
      <div className="p-3">
        <div className="flex items-start justify-between gap-1 mb-1">
          <h3 className="text-white font-bold text-sm leading-tight">{item.nameFa}</h3>
          <span className={`text-xs font-medium shrink-0 ${rc.textClass}`}>{rc.label}</span>
        </div>
        <p className="text-gray-500 text-xs mb-2">{item.categoryFa}</p>

        {/* Includes */}
        {item.includes && item.includes.length > 0 && (
          <div className="mb-2 space-y-0.5">
            {item.includes.slice(0, 3).map((inc, i) => (
              <div key={i} className="text-xs text-gray-400 flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-cod-gold/60 inline-block shrink-0" />
                {inc}
              </div>
            ))}
          </div>
        )}

        {/* Price */}
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-cod-border">
          <div className="flex items-center gap-2">
            {item.originalPrice && (
              <span className="text-gray-600 text-xs line-through">{item.originalPrice.toLocaleString()}</span>
            )}
            <span className="text-cod-gold font-bold text-sm flex items-center gap-1">
              <span className="text-xs">CP</span>
              {item.price.toLocaleString()}
            </span>
          </div>
          <button className="text-xs px-3 py-1 rounded-lg bg-cod-gold/10 border border-cod-gold/40 text-cod-gold hover:bg-cod-gold hover:text-black transition-all font-medium">
            خرید
          </button>
        </div>
      </div>
    </div>
  )
}
