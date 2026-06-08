'use client'
import { useState, useEffect, useCallback } from 'react'
import { ShopItem, ShopResponse } from '../types'
import ShopItemCard from './ShopItemCard'
import ShopTimer from './ShopTimer'

const CATEGORY_FILTERS = [
  { id: 'all',             label: 'همه' },
  { id: 'bundle',          label: 'باندل' },
  { id: 'operator',        label: 'اپراتور' },
  { id: 'weapon_blueprint',label: 'بلوپرینت سلاح' },
  { id: 'vehicle',         label: 'اسکین خودرو' },
  { id: 'emblem',          label: 'آرم' },
  { id: 'sticker',         label: 'استیکر' },
  { id: 'calling_card',    label: 'کارت ویزیت' },
]

export default function ShopSection() {
  const [data, setData] = useState<ShopResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [catFilter, setCatFilter] = useState('all')
  const [lastFetched, setLastFetched] = useState<Date | null>(null)
  const [refreshing, setRefreshing] = useState(false)

  const fetchShop = useCallback(async (showRefresh = false) => {
    if (showRefresh) setRefreshing(true)
    try {
      const res = await fetch('/api/shop', { cache: 'no-store' })
      const json = await res.json()
      setData(json)
      setLastFetched(new Date())
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }, [])

  useEffect(() => {
    fetchShop()
    // Auto-refresh every 5 minutes
    const id = setInterval(() => fetchShop(), 5 * 60 * 1000)
    return () => clearInterval(id)
  }, [fetchShop])

  const allItems: ShopItem[] = data ? [...data.featured, ...data.daily] : []
  const filtered = catFilter === 'all'
    ? allItems
    : allItems.filter(i => i.category === catFilter)

  const featured = filtered.filter(i => i.isFeatured)
  const daily = filtered.filter(i => !i.isFeatured)

  return (
    <div className="space-y-8">
      {/* Shop header */}
      <div className="bg-cod-card border border-cod-border rounded-xl p-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
          <div>
            <h2 className="text-white font-bold text-lg flex items-center gap-2">
              🛒 آیتم شاپ امروز
              {refreshing && <span className="text-xs text-gray-500 animate-pulse">در حال بروزرسانی...</span>}
            </h2>
            {lastFetched && (
              <p className="text-gray-500 text-xs mt-0.5">
                آخرین بروزرسانی: {lastFetched.toLocaleTimeString('fa-IR')}
              </p>
            )}
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            {data?.nextReset && <ShopTimer nextReset={data.nextReset} />}
            <button
              onClick={() => fetchShop(true)}
              disabled={refreshing}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cod-card2 border border-cod-border hover:border-cod-gold/50 text-gray-300 hover:text-white text-xs transition-all disabled:opacity-50"
            >
              <span className={refreshing ? 'animate-spin' : ''}>🔄</span>
              بروزرسانی
            </button>
          </div>
        </div>
      </div>

      {/* Category filter */}
      <div className="flex gap-2 flex-wrap">
        {CATEGORY_FILTERS.map(f => (
          <button
            key={f.id}
            onClick={() => setCatFilter(f.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
              catFilter === f.id
                ? 'bg-cod-gold text-black border-cod-gold'
                : 'bg-cod-card border-cod-border text-gray-400 hover:border-cod-gold/40 hover:text-white'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-cod-card border border-cod-border rounded-xl h-64 animate-pulse" />
          ))}
        </div>
      ) : (
        <>
          {/* Featured */}
          {featured.length > 0 && (
            <section>
              <h3 className="text-cod-gold font-bold text-base mb-4 flex items-center gap-2">
                <span>⭐</span> آیتم‌های ویژه
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {featured.map(item => <ShopItemCard key={item.id} item={item} />)}
              </div>
            </section>
          )}

          {/* Daily */}
          {daily.length > 0 && (
            <section>
              <h3 className="text-white font-bold text-base mb-4 flex items-center gap-2">
                <span>🗓️</span> آیتم‌های روزانه
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {daily.map(item => <ShopItemCard key={item.id} item={item} />)}
              </div>
            </section>
          )}

          {filtered.length === 0 && (
            <div className="text-center py-16 text-gray-500">
              <div className="text-4xl mb-3">🛒</div>
              <p>آیتمی در این دسته‌بندی موجود نیست</p>
            </div>
          )}
        </>
      )}

      {/* Info box */}
      <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-4 text-sm text-blue-300">
        <p className="font-bold mb-1">💡 اطلاعات آیتم شاپ</p>
        <p className="text-xs text-gray-400 leading-relaxed">
          آیتم‌های شاپ هر روز ساعت ۰۰:۰۰ UTC بروزرسانی می‌شوند. قیمت‌ها بر حسب CoD Points (CP) است.
          آیتم‌های ویژه معمولاً ۴۸ ساعت در دسترس هستند.
        </p>
      </div>
    </div>
  )
}
