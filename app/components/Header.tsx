'use client'
import { NAV_GROUPS, TABS } from '../navigation'

interface HeaderProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export default function Header({ activeTab, onTabChange }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-cod-border bg-cod-bg/95 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4">
        {/* Identity + snapshot */}
        <div className="flex h-14 items-center justify-between gap-4 sm:h-16">
          <div className="flex items-center gap-3">
            <div className="notch-sm relative grid h-9 w-9 place-items-center bg-cod-gold">
              <span className="font-display text-[14px] font-semibold leading-none tracking-tight text-cod-bg">
                COD
              </span>
            </div>
            <div className="leading-tight">
              <p className="font-display text-[14px] tracking-[0.18em] text-gray-100 sm:text-[16px]">
                CALL OF DUTY
              </p>
              <p className="mt-0.5 text-[10px] text-gray-500">آرشیو فارسی · MWIII / WARZONE</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden border border-cod-border bg-cod-card/70 px-2.5 py-1 text-left sm:block">
              <p className="hud-eyebrow text-[8px] text-gray-600">SNAPSHOT</p>
              <p className="hud-num mt-1 text-[11px] text-cod-sand">S05 · SEP 2024</p>
            </div>
            <div className="hud-tag text-cod-sand">FA-IR</div>
          </div>
        </div>

        {/* Grouped, scrollable nav */}
        <nav aria-label="بخش‌های سایت" className="scrollbar-none -mx-4 overflow-x-auto px-4">
          <div className="flex min-w-max items-stretch">
            {NAV_GROUPS.map((group, groupIndex) => {
              const tabs = TABS.filter(tab => tab.group === group.id)
              return (
                <div
                  key={group.id}
                  className={`flex items-stretch ${
                    groupIndex > 0 ? 'mr-1 border-r border-cod-border/70 pr-1' : ''
                  }`}
                >
                  <div className="hidden w-14 flex-col justify-center px-2 xl:flex">
                    <span className="font-display text-[9px] uppercase leading-tight tracking-[0.2em] text-gray-600">
                      {group.en}
                    </span>
                    <span className="mt-0.5 text-[9px] text-gray-700">{group.label}</span>
                  </div>
                  {tabs.map(tab => {
                    const active = activeTab === tab.id
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => onTabChange(tab.id)}
                        aria-current={active ? 'page' : undefined}
                        className={`group relative flex flex-col items-start justify-center gap-0.5 border-t-2 px-2.5 py-2 transition-colors sm:px-3 ${
                          active
                            ? 'border-cod-gold bg-gradient-to-b from-cod-gold/10 to-transparent text-gray-50'
                            : 'border-transparent text-gray-400 hover:bg-cod-card/60 hover:text-gray-200'
                        }`}
                      >
                        <span
                          className={`font-display text-[9px] uppercase leading-none tracking-[0.18em] ${
                            active ? 'text-cod-gold' : 'text-gray-600 group-hover:text-gray-500'
                          }`}
                        >
                          {tab.en}
                        </span>
                        <span className="whitespace-nowrap text-[12.5px] font-medium leading-tight">
                          {tab.label}
                        </span>
                        {active && <span className="absolute inset-x-0 bottom-0 h-px bg-cod-gold/40" />}
                      </button>
                    )
                  })}
                </div>
              )
            })}
          </div>
        </nav>
      </div>

      {/* Honest status strip */}
      <div className="border-t border-cod-border/70 bg-cod-panel/70">
        <div className="mx-auto flex max-w-7xl items-center gap-2.5 overflow-hidden px-4 py-1.5">
          <span className="font-display text-[9px] uppercase tracking-[0.22em] text-cod-gold">STATUS</span>
          <span className="h-1 w-1 shrink-0 bg-cod-gold" />
          <p className="truncate text-[10.5px] text-gray-500">
            بایگانی محتوای MWIII / Warzone تا پایان سیزن ۵ — سپتامبر ۲۰۲۴ · پروژه غیررسمی
          </p>
          <span className="mr-auto hidden shrink-0 font-display text-[9px] uppercase tracking-[0.2em] text-gray-700 sm:block">
            FAN ARCHIVE
          </span>
        </div>
      </div>
    </header>
  )
}
