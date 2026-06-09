'use client'
import { useState } from 'react'
import { perksData, metaLoadouts, PerkInfo } from '../data/perksData'

const TIER_STYLE: Record<string, string> = {
  S: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  A: 'bg-green-500/20 text-green-300 border-green-500/30',
  B: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  C: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
}

const GAME_BADGE: Record<string, string> = {
  warzone: 'bg-orange-500/20 text-orange-300',
  mw3: 'bg-blue-500/20 text-blue-300',
  both: 'bg-purple-500/20 text-purple-300',
}
const GAME_FA: Record<string, string> = { warzone: 'وارزون', mw3: 'MW3', both: 'هر دو' }

const DIFF_STYLE: Record<string, string> = {
  'آسان': 'text-green-400', 'متوسط': 'text-yellow-400', 'پیشرفته': 'text-red-400',
}

export default function PerksGuide() {
  const [activeTab, setActiveTab] = useState<'perks' | 'loadouts'>('loadouts')
  const [slotFilter, setSlotFilter] = useState<number | 'all'>('all')
  const [gameFilter, setGameFilter] = useState<'all' | 'warzone' | 'mw3'>('all')

  const filteredPerks = perksData.filter(p => {
    if (slotFilter !== 'all' && p.slot !== slotFilter) return false
    return true
  })

  const filteredLoadouts = metaLoadouts.filter(l => {
    if (gameFilter !== 'all' && l.game !== gameFilter && l.game !== 'both') return false
    return true
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-cod-card border border-cod-border rounded-xl p-4">
        <h2 className="text-white font-bold text-lg flex items-center gap-2">🎖️ راهنمای Perks و متا لودآوت‌ها</h2>
        <p className="text-gray-500 text-xs mt-1">بهترین Perk‌ها و لودآوت‌های آماده برای Warzone و Modern Warfare 3</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-cod-card border border-cod-border rounded-xl p-1 w-fit">
        <button onClick={() => setActiveTab('loadouts')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'loadouts' ? 'bg-cod-gold text-black' : 'text-gray-400 hover:text-white'}`}>
          🔫 متا لودآوت‌ها
        </button>
        <button onClick={() => setActiveTab('perks')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'perks' ? 'bg-cod-gold text-black' : 'text-gray-400 hover:text-white'}`}>
          🎖️ راهنمای Perks
        </button>
      </div>

      {activeTab === 'loadouts' && (
        <div className="space-y-4">
          {/* Game filter */}
          <div className="flex gap-1 bg-cod-card border border-cod-border rounded-lg p-1 w-fit">
            {(['all', 'warzone', 'mw3'] as const).map(g => (
              <button key={g} onClick={() => setGameFilter(g)}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${gameFilter === g ? 'bg-cod-gold text-black' : 'text-gray-400 hover:text-white'}`}>
                {g === 'all' ? 'همه' : g === 'warzone' ? 'وارزون' : 'MW3'}
              </button>
            ))}
          </div>

          {filteredLoadouts.map(loadout => (
            <div key={loadout.id} className="bg-cod-card border border-cod-border rounded-xl overflow-hidden hover:border-cod-gold/20 transition-colors">
              {/* Loadout header */}
              <div className="p-4 border-b border-cod-border flex items-start gap-3">
                <span className="text-3xl">{loadout.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-white font-bold">{loadout.nameFa}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${GAME_BADGE[loadout.game]}`}>{GAME_FA[loadout.game]}</span>
                    <span className={`text-xs font-medium ${DIFF_STYLE[loadout.difficulty]}`}>{loadout.difficulty}</span>
                  </div>
                  <p className="text-gray-400 text-xs mt-1">{loadout.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x divide-cod-border">
                {/* Primary */}
                <div className="p-4">
                  <p className="text-gray-500 text-xs mb-2">🔫 اسلحه اصلی</p>
                  <p className="text-white font-bold text-sm mb-2">{loadout.primary}</p>
                  <ul className="space-y-1">
                    {loadout.primaryAttachments.map((a, i) => (
                      <li key={i} className="text-xs text-gray-400 flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-cod-gold flex-shrink-0" />
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Secondary */}
                <div className="p-4">
                  <p className="text-gray-500 text-xs mb-2">🔧 اسلحه ثانوی</p>
                  <p className="text-white font-bold text-sm mb-2">{loadout.secondary}</p>
                  <ul className="space-y-1">
                    {loadout.secondaryAttachments.map((a, i) => (
                      <li key={i} className="text-xs text-gray-400 flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Perks & Equipment */}
              <div className="p-4 border-t border-cod-border bg-cod-card2">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                  <div>
                    <p className="text-gray-500 mb-1">Perks</p>
                    <div className="flex flex-col gap-1">
                      {loadout.perks.map((p, i) => (
                        <span key={i} className="bg-gray-700 text-gray-300 px-2 py-0.5 rounded text-center">{p}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-1">💥 تجهیزات مرگبار</p>
                    <span className="bg-red-900/30 text-red-300 px-2 py-0.5 rounded">{loadout.lethal}</span>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-1">⚡ تجهیزات تاکتیکی</p>
                    <span className="bg-blue-900/30 text-blue-300 px-2 py-0.5 rounded">{loadout.tactical}</span>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-1">🔋 Field Upgrade</p>
                    <span className="bg-green-900/30 text-green-300 px-2 py-0.5 rounded">{loadout.fieldUpgrade}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'perks' && (
        <div className="space-y-4">
          {/* Slot filter */}
          <div className="flex gap-2 flex-wrap">
            <span className="text-gray-500 text-xs self-center">اسلات:</span>
            {(['all', 1, 2, 3] as const).map(s => (
              <button key={s} onClick={() => setSlotFilter(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                  slotFilter === s
                    ? 'bg-cod-gold text-black border-cod-gold'
                    : 'bg-cod-card border-cod-border text-gray-400 hover:border-cod-gold/40 hover:text-white'
                }`}>
                {s === 'all' ? 'همه' : `اسلات ${s}`}
              </button>
            ))}
          </div>

          {/* Perks grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredPerks.map(perk => (
              <div key={perk.id} className="bg-cod-card border border-cod-border rounded-xl p-4 hover:border-cod-gold/20 transition-colors">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{perk.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <p className="text-white font-bold text-sm">{perk.nameFa}</p>
                      <span className="text-gray-500 text-xs">({perk.name})</span>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded border ${TIER_STYLE[perk.tier]}`}>{perk.tier}</span>
                      <span className="text-xs bg-gray-700 text-gray-400 px-2 py-0.5 rounded">اسلات {perk.slot}</span>
                    </div>
                    <p className="text-gray-400 text-xs mb-2">{perk.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {perk.bestFor.map((b, i) => (
                        <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-cod-gold/10 text-cod-gold border border-cod-gold/20">
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Recommended combos */}
          <div className="bg-cod-card border border-cod-border rounded-xl p-4">
            <h3 className="text-white font-bold text-sm mb-3">🔥 بهترین ترکیب‌های Perk</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { name: 'ست وارزون کلاسیک', perks: ['Infantry Vest', 'Ghost', 'Tempered'], desc: 'بیشترین بازیکنان حرفه‌ای وارزون', color: 'border-orange-500/30' },
                { name: 'ست تهاجمی', perks: ['Double Time', 'Sleight of Hand', 'Resolute'], desc: 'برای بازی aggressive و rush', color: 'border-red-500/30' },
                { name: 'ست Ranked', perks: ['Infantry Vest', 'Ghost', 'Combat Scout'], desc: 'اطلاعات بیشتر برای تیم', color: 'border-blue-500/30' },
                { name: 'ست Heavy Support', perks: ['Gunner Vest', 'Ghost', 'Bird\'s Eye'], desc: 'برای سلاح‌های سنگین و LMG', color: 'border-purple-500/30' },
              ].map(combo => (
                <div key={combo.name} className={`bg-cod-card2 border ${combo.color} rounded-xl p-3`}>
                  <p className="text-white font-medium text-xs mb-1">{combo.name}</p>
                  <p className="text-gray-500 text-xs mb-2">{combo.desc}</p>
                  <div className="flex gap-1 flex-wrap">
                    {combo.perks.map((p, i) => (
                      <span key={i} className="text-xs bg-gray-700 text-gray-300 px-2 py-0.5 rounded">{p}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
