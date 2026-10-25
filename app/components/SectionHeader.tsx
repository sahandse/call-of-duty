'use client'

import { TAB_BY_ID, TabId } from '../navigation'

interface SectionHeaderProps {
  tab: TabId
  en?: string
  title: string
  note?: string
  stats?: { label: string; value: string | number }[]
  children?: React.ReactNode
}

export default function SectionHeader({ tab, en, title, note, stats, children }: SectionHeaderProps) {
  const def = TAB_BY_ID[tab]
  const code = String(def.index + 1).padStart(2, '0')
  return (
    <header className="hud-frame relative mb-5 overflow-hidden bg-cod-panel px-4 py-4 sm:px-5">
      <div className="hud-grid-lines pointer-events-none absolute inset-0 opacity-40" aria-hidden />
      <div className="relative flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="hud-eyebrow mb-1.5">
            <span className="hud-num text-cod-gold">{code}</span>
            <span className="mx-2 text-cod-border-light">|</span>
            {en || def.en}
          </p>
          <h2 className="hud-title text-xl font-bold text-white sm:text-2xl">{title}</h2>
          {note && <p className="mt-2 max-w-3xl text-xs leading-relaxed text-gray-400">{note}</p>}
        </div>
        {stats && stats.length > 0 && (
          <dl className="flex flex-wrap gap-x-5 gap-y-2 sm:gap-x-6">
            {stats.map((s) => (
              <div key={s.label} className="text-right">
                <dt className="hud-tag">{s.label}</dt>
                <dd className="hud-num mt-0.5 text-lg text-cod-gold-light">{s.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
      {children && <div className="relative mt-4 flex flex-wrap items-center gap-2">{children}</div>}
    </header>
  )
}
