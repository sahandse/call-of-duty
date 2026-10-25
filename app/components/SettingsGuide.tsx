'use client'
import { useMemo, useState } from 'react'
import {
  BASIS_FA,
  PLATFORM_FA,
  resolvedCrossRefs,
  settingGroups,
  settingsNotes,
  settingsPatchFacts,
  type SettingBasis,
  type SettingItem,
  type SettingPlatform,
} from '../data/settingsData'
import SectionHeader from './SectionHeader'
import SourceNote from './SourceNote'

const BASIS_STYLE: Record<SettingBasis, string> = {
  official: 'border-cod-gold/50 bg-cod-gold/10 text-cod-gold',
  competitive: 'border-cod-green/40 bg-cod-green/10 text-cod-green',
  preference: 'border-cod-steel/40 bg-cod-steel/10 text-cod-steel',
  community: 'border-cod-sand/40 bg-cod-sand/10 text-cod-sand',
}

type PlatformFilter = 'all' | SettingPlatform

const PLATFORM_FILTERS: PlatformFilter[] = ['all', 'pc', 'console']

const BASIS_FILTERS: ('all' | SettingBasis)[] = [
  'all',
  'official',
  'competitive',
  'preference',
  'community',
]

function BasisTag({ basis }: { basis: SettingBasis }) {
  return (
    <span className={`hud-tag border px-1.5 py-0.5 ${BASIS_STYLE[basis]}`}>{BASIS_FA[basis]}</span>
  )
}

function SettingRow({ item }: { item: SettingItem }) {
  return (
    <article className="notch border-r-2 border-cod-border bg-cod-card px-3.5 py-3 transition-colors hover:border-r-cod-gold">
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1.5">
        <div className="min-w-0">
          <h3 className="text-[13px] font-semibold text-white">{item.nameFa}</h3>
          <p className="hud-num mt-0.5 text-[10.5px] text-gray-600">{item.menu}</p>
        </div>
        <span className="hud-tag shrink-0 border border-cod-gold/30 bg-cod-gold/10 px-2 py-1 text-cod-gold-light">
          {item.recommended}
        </span>
      </div>
      <p className="mt-2 text-[12px] leading-relaxed text-gray-400">{item.reasonFa}</p>
      <div className="mt-2 flex flex-wrap items-center gap-1.5">
        <BasisTag basis={item.basis} />
        {item.platform !== 'all' && (
          <span className="hud-tag border border-cod-border px-1.5 py-0.5 text-gray-500">
            {PLATFORM_FA[item.platform]}
          </span>
        )}
      </div>
    </article>
  )
}

export default function SettingsGuide() {
  const [group, setGroup] = useState(settingGroups[0].id)
  const [platform, setPlatform] = useState<PlatformFilter>('all')
  const [basis, setBasis] = useState<'all' | SettingBasis>('all')
  const [query, setQuery] = useState('')

  const totalItems = useMemo(
    () => settingGroups.reduce((sum, g) => sum + g.items.length, 0),
    []
  )
  const officialItems = useMemo(
    () => settingGroups.filter(g => g.items.some(i => i.basis === 'official')).length,
    []
  )

  const matches = (item: SettingItem) => {
    if (platform !== 'all' && item.platform !== 'all' && item.platform !== platform) return false
    if (basis !== 'all' && item.basis !== basis) return false
    const q = query.trim().toLowerCase()
    if (q && !`${item.menu} ${item.nameFa} ${item.recommended} ${item.reasonFa}`.toLowerCase().includes(q)) {
      return false
    }
    return true
  }

  const activeGroup = settingGroups.find(g => g.id === group) ?? settingGroups[0]
  const visibleItems = activeGroup.items.filter(matches)
  const groupCount = (g: (typeof settingGroups)[number]) => g.items.filter(matches).length

  return (
    <div className="space-y-4">
      <SectionHeader
        tab="settings"
        title="تنظیمات بازی"
        note={settingsNotes.basisFa}
        stats={[
          { label: 'گروه', value: settingGroups.length },
          { label: 'گزینه', value: totalItems },
          { label: 'گروه مستند', value: `${officialItems}/${settingGroups.length}` },
          { label: 'در این گروه', value: visibleItems.length },
        ]}
      >
        {settingGroups.map(g => {
          const on = g.id === activeGroup.id
          return (
            <button
              key={g.id}
              onClick={() => setGroup(g.id)}
              className={`notch flex items-center gap-2 px-2.5 py-1.5 text-[11.5px] transition-colors ${
                on
                  ? 'bg-cod-gold text-black'
                  : 'border border-cod-border bg-cod-card text-gray-400 hover:text-white'
              }`}
            >
              <span className="hud-num">{g.code}</span>
              <span>{g.nameFa}</span>
              <span className={on ? 'text-black/60' : 'text-gray-600'}>{groupCount(g)}</span>
            </button>
          )
        })}
      </SectionHeader>

      <div className="hud-frame flex flex-wrap items-end gap-x-4 gap-y-3 bg-cod-panel px-3.5 py-3">
        <label className="min-w-[180px] flex-1">
          <span className="hud-tag mb-1 block">SEARCH</span>
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="نام گزینه یا توضیح"
            className="w-full border border-cod-border bg-cod-card px-2.5 py-1.5 text-xs text-white placeholder:text-gray-600 focus:border-cod-gold/60 focus:outline-none"
          />
        </label>
        <div>
          <span className="hud-tag mb-1 block">PLATFORM</span>
          <div className="flex gap-1">
            {PLATFORM_FILTERS.map(id => (
              <button
                key={id}
                onClick={() => setPlatform(id)}
                aria-pressed={platform === id}
                className={`px-2 py-1 text-[11px] transition-colors ${
                  platform === id
                    ? 'bg-cod-gold text-black'
                    : 'border border-cod-border text-gray-400 hover:text-white'
                }`}
              >
                {id === 'all' ? 'همه' : PLATFORM_FA[id]}
              </button>
            ))}
          </div>
        </div>
        <div>
          <span className="hud-tag mb-1 block">BASIS</span>
          <div className="flex flex-wrap gap-1">
            {BASIS_FILTERS.map(id => (
              <button
                key={id}
                onClick={() => setBasis(id)}
                aria-pressed={basis === id}
                className={`px-2 py-1 text-[11px] transition-colors ${
                  basis === id
                    ? 'bg-cod-gold text-black'
                    : 'border border-cod-border text-gray-400 hover:text-white'
                }`}
              >
                {id === 'all' ? 'همه' : BASIS_FA[id]}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="space-y-2">
        <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-cod-border pb-2">
          <h3 className="hud-title text-sm font-bold text-white">{activeGroup.nameFa}</h3>
          <p className="hud-num text-[10.5px] text-gray-600">{activeGroup.menuPathFa}</p>
        </div>
        {activeGroup.noteFa && (
          <p className="text-[11.5px] leading-relaxed text-gray-500">{activeGroup.noteFa}</p>
        )}
        {visibleItems.length === 0 ? (
          <p className="notch bg-cod-card px-3 py-6 text-center text-xs text-gray-500">
            با این فیلترها گزینه‌ای در {activeGroup.nameFa} نمی‌ماند.
          </p>
        ) : (
          <div className="grid gap-2 lg:grid-cols-2">
            {visibleItems.map(item => (
              <SettingRow key={item.key} item={item} />
            ))}
          </div>
        )}
      </section>

      <section className="hud-frame space-y-3 bg-cod-panel p-4">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="hud-tag text-cod-gold">PATCH CONTEXT</h3>
          <p className="text-[10.5px] text-gray-600">{settingsNotes.seasonFa}</p>
        </div>
        {settingsPatchFacts.map(fact => (
          <div
            key={fact.id}
            className="notch border-r-2 border-cod-gold/40 bg-cod-card px-3 py-2.5"
          >
            <div className="mb-1.5 flex flex-wrap items-center gap-2">
              <span className="hud-num text-[11px] text-cod-gold-light">{fact.windowFa}</span>
              {!fact.inArchiveWindow && (
                <span className="hud-tag border border-cod-red/40 px-1.5 py-0.5 text-cod-red">
                  بیرون از پنجرهٔ بایگانی
                </span>
              )}
            </div>
            <p className="font-mono text-[11px] leading-relaxed text-gray-500">“{fact.en}”</p>
            <p className="mt-1.5 text-[12px] leading-relaxed text-gray-300">{fact.detailFa}</p>
            <p className="mt-1 text-[11.5px] leading-relaxed text-gray-500">{fact.affectsFa}</p>
          </div>
        ))}
      </section>

      <section className="space-y-2">
        <h3 className="hud-tag border-b border-cod-border pb-2 text-cod-steel">
          در منوی تنظیمات جستجو نکنید
        </h3>
        <div className="grid gap-2 lg:grid-cols-2">
          {resolvedCrossRefs.map(ref => (
            <div key={ref.optionId} className="notch border-r-2 border-cod-steel/50 bg-cod-card px-3 py-2.5">
              <div className="mb-1 flex flex-wrap items-baseline gap-2">
                <span className="text-[12.5px] font-semibold text-white">{ref.nameFa}</span>
                <span className="hud-num text-[10px] text-gray-600">{ref.name}</span>
                <span className="hud-tag border border-cod-border px-1.5 py-0.5 text-gray-500">
                  {ref.slotFa}
                </span>
              </div>
              <p className="text-[11.5px] leading-relaxed text-gray-400">{ref.descriptionFa}</p>
              <p className="mt-1 text-[11.5px] leading-relaxed text-gray-500">{ref.textFa}</p>
            </div>
          ))}
        </div>
      </section>

      <SourceNote kind="verified" source={settingsNotes.sourceFa}>
        جملات بخش PATCH CONTEXT عیناً از یادداشت‌های پچ منتشرشده برداشته شده‌اند؛ تنها بخشی از همین تب است که سند رسمی دارد.
      </SourceNote>
      <SourceNote kind="community">{settingsNotes.windowFa}</SourceNote>
    </div>
  )
}
