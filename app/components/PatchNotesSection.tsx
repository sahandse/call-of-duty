'use client'
import { useState } from 'react'
import { patchNotes } from '../data/patchNotes'
import SectionHeader from './SectionHeader'
import SourceNote from './SourceNote'

const CATEGORY_STYLE: Record<string, string> = {
  weapons: 'text-cod-red',
  warzone: 'text-blue-400',
  multiplayer: 'text-cod-olive',
  progression: 'text-cod-gold',
  global: 'text-cod-steel',
  bugs: 'text-gray-400',
  operators: 'text-cod-sand',
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('fa-IR', { year: 'numeric', month: 'long', day: 'numeric' })
}

function totalItems(patch: (typeof patchNotes)[number]) {
  return patch.changes.reduce((sum, c) => sum + c.items.length, 0)
}

export default function PatchNotesSection() {
  const [expandedPatch, setExpandedPatch] = useState<string>(patchNotes[0]?.id || '')
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set())

  const toggleCategory = (key: string) => {
    setExpandedCategories((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  const sorted = [...patchNotes].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <div className="space-y-5">
      <SectionHeader
        tab="patchnotes"
        en="PATCH ARCHIVE"
        title="یادداشت‌های تغییرات"
        note="متن این بخش از یادداشت‌های رسمی عرضهٔ سیزن ۵ و سیزن ۵ ریلُود استخراج شده است. اعداد آسیب، برد و Rate of Fire عیناً از همان جداول آمده‌اند؛ پس از سپتامبر ۲۰۲۴ این اطلاعات تاریخچه محسوب می‌شود، نه وضعیت فعلی بازی."
        stats={[
          { label: 'PATCHES', value: sorted.length },
          { label: 'CHANGES', value: sorted.reduce((s, p) => s + totalItems(p), 0) },
          { label: 'LAST', value: 'S05R' },
        ]}
      />

      <div className="space-y-4">
        {sorted.map((patch, idx) => {
          const isExpanded = expandedPatch === patch.id
          return (
            <article
              key={patch.id}
              className={`notch overflow-hidden border transition-colors ${
                isExpanded ? 'border-cod-gold/40 bg-cod-panel' : 'border-cod-border bg-cod-card'
              }`}
            >
              <button
                className="flex w-full items-start gap-4 p-4 text-right hover:bg-cod-card2 sm:p-5"
                onClick={() => setExpandedPatch(isExpanded ? '' : patch.id)}
                aria-expanded={isExpanded}
              >
                <div className="min-w-0 flex-1">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <span className="hud-num text-cod-gold-light">{String(idx + 1).padStart(2, '0')}</span>
                    <span className="hud-tag border border-cod-border bg-cod-bg px-2 py-0.5 text-cod-gold">
                      {patch.version}
                    </span>
                    <span className="font-mono text-[11px] text-gray-500">{formatDate(patch.date)}</span>
                  </div>
                  <h3 className="text-base font-bold text-white">{patch.titleFa}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-gray-400">{patch.summary}</p>
                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
                    {patch.changes.map((c) => (
                      <button
                        key={c.category}
                        className={`hud-tag text-[10px] hover:underline ${CATEGORY_STYLE[c.category] || 'text-gray-400'}`}
                        onClick={(e) => {
                          e.stopPropagation()
                          setExpandedPatch(patch.id)
                          toggleCategory(`${patch.id}-${c.category}`)
                        }}
                      >
                        {c.categoryFa} · {c.items.length}
                      </button>
                    ))}
                  </div>
                </div>
                <span className="hud-num shrink-0 text-gray-500">{isExpanded ? '−' : '+'}</span>
              </button>

              {isExpanded && (
                <div className="space-y-3 border-t border-cod-border bg-cod-bg p-4 sm:p-5">
                  {patch.source && <SourceNote kind="verified" source={patch.source}>
                    منبع: یادداشت‌های رسمی منتشرشده توسط Infinity Ward /Activision برای همین نسخه.
                  </SourceNote>}
                  {patch.changes.map((change) => {
                    const catKey = `${patch.id}-${change.category}`
                    const isCatExpanded = expandedCategories.has(catKey)
                    const color = CATEGORY_STYLE[change.category] || 'text-gray-400'
                    return (
                      <section key={change.category} className="border border-cod-border bg-cod-card">
                        <button
                          className="flex w-full items-center justify-between px-3.5 py-2.5 text-right"
                          onClick={() => toggleCategory(catKey)}
                          aria-expanded={isCatExpanded}
                        >
                          <span className={`hud-tag ${color}`}>
                            {change.categoryFa}
                            <span className="hud-num mr-2 text-gray-500">{change.items.length}</span>
                          </span>
                          <span className="hud-num text-gray-600">{isCatExpanded ? '−' : '+'}</span>
                        </button>
                        {isCatExpanded && (
                          <ul className="space-y-2 border-t border-cod-border px-3.5 py-3">
                            {change.items.map((item, i) => (
                              <li key={i} className="flex gap-2.5 text-[13px] leading-relaxed text-gray-300">
                                <span className="mt-1.5 h-px w-3 shrink-0 bg-cod-border-light" aria-hidden />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </section>
                    )
                  })}
                  <button
                    onClick={() => {
                      const allKeys = patch.changes.map((c) => `${patch.id}-${c.category}`)
                      const anyExpanded = allKeys.some((k) => expandedCategories.has(k))
                      setExpandedCategories((prev) => {
                        const next = new Set(prev)
                        allKeys.forEach((k) => (anyExpanded ? next.delete(k) : next.add(k)))
                        return next
                      })
                    }}
                    className="btn-ghost px-3 py-1.5"
                  >
                    {patch.changes.some((c) => expandedCategories.has(`${patch.id}-${c.category}`))
                      ? 'بستن همهٔ دسته‌ها'
                      : 'باز کردن همهٔ دسته‌ها'}
                  </button>
                </div>
              )}
            </article>
          )
        })}
      </div>
    </div>
  )
}
