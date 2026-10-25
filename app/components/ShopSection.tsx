'use client'
import { useMemo, useState } from 'react'
import { StoreItem } from '../types'
import { storeArchive } from '../data/shopCatalog'
import ShopItemCard from './ShopItemCard'
import SectionHeader from './SectionHeader'
import SourceNote from './SourceNote'

const KIND_FILTERS: { id: 'all' | StoreItem['kind']; label: string }[] = [
  { id: 'all', label: 'همه' },
  { id: 'battle_pass', label: 'BATTLE PASS' },
  { id: 'blackcell', label: 'BLACKCELL' },
  { id: 'bundle', label: 'BUNDLES' },
]

export default function ShopSection() {
  const [kind, setKind] = useState<'all' | StoreItem['kind']>('all')
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return storeArchive.filter((item) => {
      if (kind !== 'all' && item.kind !== kind) return false
      if (!q) return true
      return (
        item.name.toLowerCase().includes(q) ||
        item.nameFa.includes(query.trim()) ||
        item.themeFa.includes(query.trim()) ||
        item.includes.some((line) => line.toLowerCase().includes(q))
      )
    })
  }, [kind, query])

  return (
    <div className="space-y-5">
      <SectionHeader
        tab="shop"
        en="STORE ARCHIVE"
        title="بایگانی فروشگاه سیزن ۵"
        note="فهرست باندل‌ها و بسته‌های رسمی سیزن ۵ و ریلُود آن، با محتوای ذکرشده در مقالات community.callofduty. این صفحه فروشگاه زنده نیست: نه آیتمی می‌خرید، نه قیمت‌ها امروز همان اعدادند و نه روتیشن روزانه‌ای وجود دارد."
        stats={[
          { label: 'ITEMS', value: storeArchive.length },
          { label: 'IN ARCHIVE', value: storeArchive.filter((i) => i.price).length },
          { label: 'SNAPSHOT', value: 'S05' },
        ]}
      />

      <div className="flex flex-wrap items-center gap-2">
        {KIND_FILTERS.map((f) => (
          <button
            key={f.id}
            onClick={() => setKind(f.id)}
            aria-pressed={kind === f.id}
            className={`hud-tag border px-3 py-1.5 transition-colors ${
              kind === f.id
                ? 'border-cod-gold bg-cod-gold text-black'
                : 'border-cod-border bg-cod-card text-gray-400 hover:border-cod-gold/50 hover:text-white'
            }`}
          >
            {f.label}
          </button>
        ))}
        <div className="mr-auto flex items-center gap-2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="جستجوی نام سلاح، بلوپرینت یا Tracer…"
            aria-label="جستجو در بایگانی شاپ"
            className="w-56 border border-cod-border bg-cod-bg px-3 py-1.5 text-xs text-gray-200 outline-none placeholder:text-gray-600 focus:border-cod-gold/60"
          />
          <span className="hud-tag text-gray-500">{filtered.length}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((item) => (
          <ShopItemCard key={item.id} item={item} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="notch bg-cod-card px-4 py-10 text-center">
          <p className="hud-tag text-gray-500">NO ARCHIVE MATCH</p>
          <p className="mt-2 text-xs text-gray-500">نام سلاح، بلوپرینت یا Tracer را امتحان کنید.</p>
        </div>
      )}

      <SourceNote kind="warning">
        تنها دو قیمت در منابع رسمی این سیزن عدد داشت: ۱٬۱۰۰ CoD Point برای پاس نبرد و ۲٬۴۰۰ CoD Point که داخل باندل
        Underboss هدیه می‌شد. برای بقیهٔ باندل‌ها قیمت را «نامشخص» گذاشته‌ایم تا عدد ساختگی به‌نام رسمی منتشر نشود.
      </SourceNote>
    </div>
  )
}
