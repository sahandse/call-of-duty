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

type Tab =
  | 'objectives'
  | 'shop'
  | 'loadout'
  | 'meta'
  | 'camo'
  | 'battlepass'
  | 'patchnotes'
  | 'maps'
  | 'shophistory'

const HERO_CONTENT: Record<Tab, { title: string; description: string; icon: string }> = {
  objectives: {
    title: '🎯 اهداف و چالش‌های Call of Duty',
    description: 'تمام مأموریت‌های روزانه، هفتگی، فصلی، سلاح، اپراتور، پاس نبرد و رتبه‌بندی — با جستجو و دسته‌بندی کامل',
    icon: '⚔️',
  },
  shop: {
    title: '🛒 آیتم شاپ روزانه',
    description: 'آیتم‌های امروز شاپ با تایمر بروزرسانی خودکار — فیلتر بر اساس دسته‌بندی و کمیابی',
    icon: '💎',
  },
  loadout: {
    title: '🔧 لودآوت‌ساز',
    description: 'لودآوت‌های دلخواه خود را بساز، ذخیره کن و با دوستانت به اشتراک بگذار',
    icon: '🔫',
  },
  meta: {
    title: '📊 تیر لیست متا',
    description: 'بهترین سلاح‌های فعلی Warzone و MW3 با آمار کامل، رتبه‌بندی و بهترین اتچمنت‌ها',
    icon: '📈',
  },
  camo: {
    title: '🎨 تراکر کامو',
    description: 'پیشرفت چالش‌های کامو سلاح‌ها را ردیابی کن — از پایه تا Polyatomic',
    icon: '🏆',
  },
  battlepass: {
    title: '🎫 Battle Pass',
    description: 'تمام ۱۰۰ تیر پاس نبرد سیزن جاری را مشاهده کن و پیشرفتت را ثبت کن',
    icon: '⭐',
  },
  patchnotes: {
    title: '📋 پَچ نوتس',
    description: 'آخرین بروزرسانی‌ها، بالانس سلاح‌ها، محتوای جدید و رفع باگ‌ها',
    icon: '🔔',
  },
  maps: {
    title: '🗺️ نقشه‌ها',
    description: 'اطلاعات، نکات استراتژیک و راهنمای تمام نقشه‌های Warzone و MW3',
    icon: '🌍',
  },
  shophistory: {
    title: '🕐 تاریخچه شاپ',
    description: 'آیتم‌های شاپ ۵ روز گذشته — اگر آیتمی را از دست دادی اینجا ببین',
    icon: '📅',
  },
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>('objectives')

  const hero = HERO_CONTENT[activeTab]

  return (
    <div className="min-h-screen bg-cod-bg">
      <Header activeTab={activeTab} onTabChange={(t) => setActiveTab(t as Tab)} />

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Hero banner */}
        <div className="relative rounded-2xl overflow-hidden mb-8 border border-cod-border">
          <div className="absolute inset-0 bg-gradient-to-l from-cod-gold/10 via-transparent to-transparent" />
          <div className="relative px-6 py-5 flex items-center gap-4">
            <div className="flex flex-col gap-1">
              <h2 className="text-white text-xl font-extrabold tracking-wide">
                {hero.title}
              </h2>
              <p className="text-gray-400 text-sm">
                {hero.description}
              </p>
            </div>
            <div className="mr-auto text-5xl opacity-30 select-none hidden md:block">
              {hero.icon}
            </div>
          </div>
        </div>

        {/* Tab content */}
        <div className="animate-fade-in">
          {activeTab === 'objectives'  && <ObjectivesSection />}
          {activeTab === 'shop'        && <ShopSection />}
          {activeTab === 'loadout'     && <LoadoutBuilder />}
          {activeTab === 'meta'        && <MetaReport />}
          {activeTab === 'camo'        && <CamoTracker />}
          {activeTab === 'battlepass'  && <BattlePassSection />}
          {activeTab === 'patchnotes'  && <PatchNotesSection />}
          {activeTab === 'maps'        && <MapsSection />}
          {activeTab === 'shophistory' && <ShopHistory />}
        </div>

        {/* Footer */}
        <footer className="mt-16 border-t border-cod-border pt-8 pb-6">
          <h3 className="text-gray-300 font-bold mb-4 text-sm">🔗 منابع پیشنهادی</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                name: 'wzstats.gg',
                icon: '📊',
                description: 'آمار سلاح‌ها، متای فعلی، بهترین لودآوت‌ها، آمار بازیکنان',
                features: ['آمار real-time سلاح', 'متا و تیر لیست', 'آمار بازیکن', 'مقایسه سلاح'],
                color: 'border-blue-500/30',
              },
              {
                name: 'tracker.gg/warzone',
                icon: '🏆',
                description: 'ردیابی پروفایل، لیدربورد، تاریخچه مسابقات، آمار دقیق',
                features: ['پروفایل بازیکن', 'لیدربورد جهانی', 'تاریخچه مسابقات', 'آمار K/D'],
                color: 'border-purple-500/30',
              },
              {
                name: 'warzoneloadout.games',
                icon: '🔫',
                description: 'بهترین لودآوت‌های متا، تیر لیست سلاح، راهنمای تنظیمات',
                features: ['لودآوت‌های متا', 'تیر لیست سلاح', 'تنظیمات پیشنهادی', 'راهنمای perks'],
                color: 'border-green-500/30',
              },
            ].map(site => (
              <div key={site.name} className={`bg-cod-card border ${site.color} rounded-xl p-4`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{site.icon}</span>
                  <span className="text-white font-bold text-sm">{site.name}</span>
                </div>
                <p className="text-gray-400 text-xs mb-3">{site.description}</p>
                <div className="flex flex-wrap gap-1">
                  {site.features.map(f => (
                    <span key={f} className="text-xs px-2 py-0.5 rounded-full bg-gray-800 text-gray-400 border border-gray-700">
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-600 text-xs mt-6">
            CoD Objectives FA — اطلاعات بر اساس فصل جاری بروزرسانی می‌شوند
          </p>
        </footer>
      </main>
    </div>
  )
}
