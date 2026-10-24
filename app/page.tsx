'use client'
import { useState } from 'react'
import Header from './components/Header'
import ObjectivesSection from './components/ObjectivesSection'
import ShopSection from './components/ShopSection'
import LoadoutBuilder from './components/LoadoutBuilder'
import MetaReport from './components/MetaReport'
import CamoTracker from './components/CamoTracker'
import BattlePassSection from './components/BattlePassSection'
import PatchNotesSection from './components/PatchNotesSection'
import MapsSection from './components/MapsSection'
import ShopHistory from './components/ShopHistory'
import WeaponCompare from './components/WeaponCompare'
import SettingsGuide from './components/SettingsGuide'
import PerksGuide from './components/PerksGuide'
import TTKCalculator from './components/TTKCalculator'
import DropGuide from './components/DropGuide'
import ActiveEvents from './components/ActiveEvents'
import CollectionTracker from './components/CollectionTracker'
import TeamBuilder from './components/TeamBuilder'
import ProgressDashboard from './components/ProgressDashboard'
import { TABS, TabId } from './navigation'

function Crosshair({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      className={className}
      aria-hidden="true"
    >
      <circle cx="24" cy="24" r="14" />
      <circle cx="24" cy="24" r="4" />
      <path d="M24 2v12M24 34v12M2 24h12M34 24h12" />
    </svg>
  )
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabId>('objectives')

  const heroIndex = TABS.findIndex(tab => tab.id === activeTab)
  const hero = TABS[heroIndex] ?? TABS[1]
  const code = String(heroIndex + 1).padStart(2, '0')

  return (
    <div className="min-h-screen">
      <Header activeTab={activeTab} onTabChange={tab => setActiveTab(tab as TabId)} />

      <main className="mx-auto max-w-7xl px-4 py-5 sm:py-6">
        <section className="hud-frame scanlines relative mb-6 overflow-hidden">
          <div className="hud-grid-lines pointer-events-none absolute inset-0 opacity-40" />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                'repeating-linear-gradient(115deg, rgba(201,164,76,0.05) 0px, rgba(201,164,76,0.05) 1px, transparent 1px, transparent 18px)',
            }}
          />
          <div className="absolute inset-y-0 right-0 w-0.5 bg-cod-gold/70" />

          <div className="relative flex flex-col gap-5 px-5 py-5 sm:px-7 sm:py-6 md:flex-row md:items-center">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 bg-cod-gold" />
                <span className="hud-eyebrow text-cod-gold">BRIEFING // {hero.en}</span>
                <span className="hidden h-px flex-1 bg-cod-border sm:block" />
                <span className="hud-num hidden text-[10px] tracking-[0.2em] text-gray-600 sm:block">
                  {code} / {String(TABS.length).padStart(2, '0')}
                </span>
              </div>

              <h2 className="mt-3 text-xl font-black leading-snug text-gray-50 sm:text-2xl">{hero.title}</h2>
              <p className="mt-2 max-w-3xl text-[13px] leading-6 text-gray-400 sm:text-sm">{hero.description}</p>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="hud-tag">MWIII</span>
                <span className="hud-tag">WARZONE</span>
                <span className="hud-tag border-cod-gold/40 text-cod-sand">SNAPSHOT · S05 RELOADED</span>
                <span className="hud-tag">FA-IR</span>
              </div>
            </div>

            <div className="hidden shrink-0 items-center gap-4 border-r border-cod-border pr-5 md:flex">
              <div className="text-left">
                <p className="hud-eyebrow text-[8px] text-gray-600">SECTION</p>
                <p className="hud-num mt-1 text-4xl leading-none text-gray-700">{code}</p>
              </div>
              <Crosshair className="h-10 w-10 text-cod-gold/50" />
            </div>
          </div>
        </section>

        <div key={activeTab} className="animate-fade-in">
          {activeTab === 'dashboard' && <ProgressDashboard />}
          {activeTab === 'objectives' && <ObjectivesSection />}
          {activeTab === 'shop' && <ShopSection />}
          {activeTab === 'loadout' && <LoadoutBuilder />}
          {activeTab === 'meta' && <MetaReport />}
          {activeTab === 'compare' && <WeaponCompare />}
          {activeTab === 'ttk' && <TTKCalculator />}
          {activeTab === 'perks' && <PerksGuide />}
          {activeTab === 'settings' && <SettingsGuide />}
          {activeTab === 'teambuilder' && <TeamBuilder />}
          {activeTab === 'dropguide' && <DropGuide />}
          {activeTab === 'events' && <ActiveEvents />}
          {activeTab === 'collection' && <CollectionTracker />}
          {activeTab === 'camo' && <CamoTracker />}
          {activeTab === 'battlepass' && <BattlePassSection />}
          {activeTab === 'patchnotes' && <PatchNotesSection />}
          {activeTab === 'maps' && <MapsSection />}
          {activeTab === 'shophistory' && <ShopHistory />}
        </div>

        <footer className="mt-14 border-t border-cod-border pt-6 pb-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="max-w-2xl">
              <p className="font-display text-[11px] uppercase tracking-[0.2em] text-gray-400">
                COD ARCHIVE · FA / NOT AFFILIATED WITH ACTIVISION
              </p>
              <p className="mt-2 text-[11px] leading-5 text-gray-600">
                این پروژه یک آرشیو و راهنمای غیررسمی فارسی از محتوای Modern Warfare III و Warzone تا پایان سیزن ۵
                (سپتامبر ۲۰۲۴) است. شمارنده‌ها و پیشرفت‌ها فقط در همین مرورگر ذخیره می‌شوند؛ قیمت‌ها و دسترسی
                آیتم‌های شاپ تاریخی‌اند و ممکن است تغییر کرده باشند.
              </p>
            </div>
            <div className="flex shrink-0 gap-2">
              <span className="hud-tag">S05</span>
              <span className="hud-tag">RELOADED</span>
              <span className="hud-tag">2024</span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}
