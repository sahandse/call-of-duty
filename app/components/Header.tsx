'use client'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

interface HeaderProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export default function Header({ activeTab, onTabChange }: HeaderProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const tabs = [
    { id: 'objectives',  label: 'اهداف',          icon: '🎯' },
    { id: 'shop',        label: 'آیتم شاپ',        icon: '🛒' },
    { id: 'loadout',     label: 'لودآوت‌ساز',      icon: '🔧' },
    { id: 'meta',        label: 'متا',              icon: '📊' },
    { id: 'compare',     label: 'مقایسه سلاح',     icon: '⚖️' },
    { id: 'perks',       label: 'Perks & لودآوت',  icon: '🎖️' },
    { id: 'settings',    label: 'تنظیمات',         icon: '⚙️' },
    { id: 'camo',        label: 'کامو',             icon: '🎨' },
    { id: 'battlepass',  label: 'Battle Pass',      icon: '🎫' },
    { id: 'patchnotes',  label: 'پَچ نوتس',        icon: '📋' },
    { id: 'maps',        label: 'نقشه‌ها',          icon: '🗺️' },
    { id: 'shophistory', label: 'تاریخچه شاپ',     icon: '🕐' },
  ]

  return (
    <header className="sticky top-0 z-50 bg-cod-bg/95 backdrop-blur border-b border-cod-border">
      <div className="max-w-7xl mx-auto px-4">
        {/* Top bar */}
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-cod-gold flex items-center justify-center font-bold text-black text-sm">
              COD
            </div>
            <div>
              <h1 className="text-white font-bold text-lg leading-none">Call of Duty</h1>
              <p className="text-gray-500 text-xs">راهنمای جامع فارسی</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Live badge */}
            <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-green-500/10 border border-green-500/30">
              <span className="live-dot w-2 h-2 rounded-full bg-green-500 inline-block" />
              <span className="text-green-400 text-xs font-medium">آنلاین</span>
            </div>

            {/* Dark mode toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-lg bg-cod-card border border-cod-border hover:border-cod-gold/50 transition-colors"
                title="تغییر تم"
              >
                {theme === 'dark' ? '☀️' : '🌙'}
              </button>
            )}
          </div>
        </div>

        {/* Tabs — scrollable */}
        <div className="overflow-x-auto scrollbar-none">
          <div className="flex gap-1 pb-0 min-w-max">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`flex items-center gap-1.5 px-4 py-3 text-sm font-medium transition-all border-b-2 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'text-cod-gold border-cod-gold'
                    : 'text-gray-400 border-transparent hover:text-white'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}
