'use client'
import { useState } from 'react'
import { teamRoles, teamSynergies } from '../data/teamBuilderData'

export default function TeamBuilder() {
  const [selectedRoles, setSelectedRoles] = useState<(string | null)[]>([null, null, null, null])
  const [activeSlot, setActiveSlot] = useState<number>(0)
  const [detailRole, setDetailRole] = useState<string | null>(null)

  function selectRole(roleId: string) {
    const next = [...selectedRoles]
    next[activeSlot] = roleId
    setSelectedRoles(next)
    setDetailRole(roleId)
    if (activeSlot < 3) setActiveSlot(activeSlot + 1)
  }

  function clearSlot(i: number) {
    const next = [...selectedRoles]
    next[i] = null
    setSelectedRoles(next)
    if (detailRole === next[i]) setDetailRole(null)
  }

  const activeRoles = selectedRoles.filter(Boolean) as string[]
  const activeSynergies = teamSynergies.filter(s => s.roles.every(r => activeRoles.includes(r)))
  const detail = teamRoles.find(r => r.id === detailRole)

  return (
    <div className="space-y-6">
      <div className="bg-cod-card border border-cod-border rounded-xl p-4">
        <h2 className="text-white font-bold text-lg">👥 تیم‌ساز</h2>
        <p className="text-gray-500 text-xs mt-1">نقش‌های تیم را انتخاب کنید و لودآوت پیشنهادی هر بازیکن را ببینید</p>
      </div>

      {/* Slots */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {selectedRoles.map((rid, i) => {
          const role = teamRoles.find(r => r.id === rid)
          return (
            <button key={i} onClick={() => { setActiveSlot(i); if (rid) setDetailRole(rid) }}
              className={`relative p-4 rounded-xl border-2 transition-all text-center ${
                activeSlot === i && !rid ? 'border-cod-gold bg-cod-gold/5 animate-pulse' :
                activeSlot === i ? 'border-cod-gold bg-cod-gold/5' :
                rid ? `${role!.borderClass} bg-cod-card` :
                'border-dashed border-cod-border bg-cod-card hover:border-cod-gold/40'
              }`}>
              {rid && role ? (
                <>
                  <button onClick={e => { e.stopPropagation(); clearSlot(i) }}
                    className="absolute top-1.5 left-1.5 w-5 h-5 rounded-full bg-gray-700 text-gray-400 text-xs hover:bg-red-700 hover:text-white flex items-center justify-center">
                    ✕
                  </button>
                  <div className="text-3xl mb-2">{role.icon}</div>
                  <div className={`text-sm font-bold ${role.colorClass}`}>{role.nameFa}</div>
                  <div className="text-gray-500 text-xs mt-1">بازیکن {i + 1}</div>
                </>
              ) : (
                <>
                  <div className="text-3xl mb-2 opacity-30">👤</div>
                  <div className="text-gray-500 text-sm">بازیکن {i + 1}</div>
                  {activeSlot === i && <div className="text-cod-gold text-xs mt-1">انتخاب کنید</div>}
                </>
              )}
            </button>
          )
        })}
      </div>

      {/* Role picker */}
      <div>
        <h3 className="text-gray-400 text-sm mb-3">نقش را برای بازیکن {activeSlot + 1} انتخاب کنید:</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {teamRoles.map(role => (
            <button key={role.id} onClick={() => selectRole(role.id)}
              className={`bg-gradient-to-br ${role.gradient} border ${role.borderClass} rounded-xl p-4 text-center hover:scale-105 transition-all`}>
              <div className="text-3xl mb-2">{role.icon}</div>
              <div className={`font-bold text-sm ${role.colorClass}`}>{role.nameFa}</div>
              <div className="text-gray-500 text-xs mt-1 leading-tight">{role.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Synergies */}
      {activeSynergies.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-white font-semibold text-sm">🔗 سینرژی‌های تیم</h3>
          {activeSynergies.map(s => (
            <div key={s.nameFa} className={`flex items-start gap-3 p-3 rounded-xl border ${
              s.strength === 'excellent' ? 'border-cod-gold/40 bg-cod-gold/5' : 'border-blue-500/30 bg-blue-900/5'
            }`}>
              <span className="text-xl">{s.strength === 'excellent' ? '⭐' : '👍'}</span>
              <div>
                <p className="text-white font-medium text-sm">{s.nameFa}</p>
                <p className="text-gray-400 text-xs">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Detail panel */}
      {detail && (
        <div className={`bg-gradient-to-br ${detail.gradient} border ${detail.borderClass} rounded-xl overflow-hidden`}>
          <div className="p-4 border-b border-cod-border">
            <div className="flex items-center gap-3">
              <span className="text-4xl">{detail.icon}</span>
              <div>
                <h3 className={`font-bold text-lg ${detail.colorClass}`}>{detail.nameFa}</h3>
                <p className="text-gray-400 text-xs">{detail.description}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x divide-cod-border">
            <div className="p-4">
              <p className="text-gray-500 text-xs mb-2">🔫 اسلحه اصلی</p>
              <p className="text-white font-bold text-sm mb-2">{detail.primary}</p>
              <ul className="space-y-1">
                {detail.primaryAttachments.map((a, i) => (
                  <li key={i} className="text-xs text-gray-400 flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-cod-gold flex-shrink-0" />{a}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-4">
              <p className="text-gray-500 text-xs mb-2">🔧 اسلحه ثانوی</p>
              <p className="text-white font-bold text-sm mb-2">{detail.secondary}</p>
              <ul className="space-y-1">
                {detail.secondaryAttachments.map((a, i) => (
                  <li key={i} className="text-xs text-gray-400 flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />{a}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="p-4 border-t border-cod-border bg-cod-card2">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs mb-4">
              <div>
                <p className="text-gray-500 mb-1">Perks</p>
                <div className="flex flex-col gap-1">
                  {detail.perks.map((p, i) => <span key={i} className="bg-gray-700 text-gray-300 px-2 py-0.5 rounded">{p}</span>)}
                </div>
              </div>
              <div>
                <p className="text-gray-500 mb-1">💥 مرگبار</p>
                <span className="bg-red-900/30 text-red-300 px-2 py-0.5 rounded">{detail.lethal}</span>
              </div>
              <div>
                <p className="text-gray-500 mb-1">⚡ تاکتیکی</p>
                <span className="bg-blue-900/30 text-blue-300 px-2 py-0.5 rounded">{detail.tactical}</span>
              </div>
              <div>
                <p className="text-gray-500 mb-1">🔋 Field Upgrade</p>
                <span className="bg-green-900/30 text-green-300 px-2 py-0.5 rounded text-xs">{detail.fieldUpgrade}</span>
              </div>
            </div>
            <div>
              <p className="text-gray-500 text-xs mb-2">💡 نکات بازی</p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
                {detail.tips.map((t, i) => (
                  <li key={i} className="flex items-start gap-1.5 text-xs text-gray-300">
                    <span className={`${detail.colorClass} mt-0.5 flex-shrink-0`}>▸</span>{t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
