'use client'
import { useState, useEffect } from 'react'
import { loadoutWeapons, perks, lethals, tacticals, fieldUpgrades } from '../data/loadoutWeapons'
import { metaWeapons } from '../data/metaWeapons'
import { Loadout } from '../types'

const CLASS_FA: Record<string, string> = {
  assault_rifle: 'رایفل اسالت',
  smg: 'زیرماشین‌تفنگ',
  lmg: 'مسلسل سبک',
  sniper: 'تک‌تیرانداز',
  marksman: 'تفنگ نشانه‌گیر',
  shotgun: 'شاتگان',
  handgun: 'تپانچه',
}

const EMPTY_FORM = {
  name: '',
  primary: '',
  secondary: '',
  perks: ['', '', ''] as [string, string, string],
  lethal: '',
  tactical: '',
  fieldUpgrade: '',
}

function generateId() {
  return Math.random().toString(36).slice(2, 10)
}

function getLoadouts(): Loadout[] {
  if (typeof window === 'undefined') return []
  try {
    return JSON.parse(localStorage.getItem('cod-loadouts') || '[]')
  } catch {
    return []
  }
}

function saveLoadouts(ls: Loadout[]) {
  if (typeof window === 'undefined') return
  localStorage.setItem('cod-loadouts', JSON.stringify(ls))
}

export default function LoadoutBuilder() {
  const [loadouts, setLoadouts] = useState<Loadout[]>([])
  const [form, setForm] = useState(EMPTY_FORM)
  const [editing, setEditing] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [selectedLoadout, setSelectedLoadout] = useState<string | null>(null)

  useEffect(() => {
    setLoadouts(getLoadouts())
  }, [])

  const handleSave = () => {
    if (!form.name.trim() || !form.primary) return
    const newLoadout: Loadout = {
      id: editing || generateId(),
      name: form.name.trim(),
      primary: form.primary,
      secondary: form.secondary,
      perks: form.perks,
      lethal: form.lethal,
      tactical: form.tactical,
      fieldUpgrade: form.fieldUpgrade,
      createdAt: new Date().toISOString(),
    }
    const updated = editing
      ? loadouts.map(l => (l.id === editing ? newLoadout : l))
      : [...loadouts, newLoadout]
    setLoadouts(updated)
    saveLoadouts(updated)
    setForm(EMPTY_FORM)
    setEditing(null)
  }

  const handleEdit = (l: Loadout) => {
    setForm({
      name: l.name,
      primary: l.primary,
      secondary: l.secondary,
      perks: l.perks,
      lethal: l.lethal,
      tactical: l.tactical,
      fieldUpgrade: l.fieldUpgrade,
    })
    setEditing(l.id)
    setSelectedLoadout(null)
  }

  const handleDelete = (id: string) => {
    const updated = loadouts.filter(l => l.id !== id)
    setLoadouts(updated)
    saveLoadouts(updated)
    if (selectedLoadout === id) setSelectedLoadout(null)
  }

  const handleShare = (l: Loadout) => {
    const primary = loadoutWeapons.find(w => w.id === l.primary)
    const secondary = loadoutWeapons.find(w => w.id === l.secondary)
    const text = `لودآوت: ${l.name}
🔫 اصلی: ${primary?.name || '-'}
🔫 ثانوی: ${secondary?.name || '-'}
⚡ پرک‌ها: ${l.perks.filter(Boolean).join(' / ')}
💣 کشنده: ${l.lethal || '-'}
🌀 تاکتیکی: ${l.tactical || '-'}
🛡️ ارتقای میدان: ${l.fieldUpgrade || '-'}`
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const getWeaponMeta = (id: string) => metaWeapons.find(w => w.id === id)

  const weaponsByClass = loadoutWeapons.reduce((acc, w) => {
    if (!acc[w.class]) acc[w.class] = []
    acc[w.class].push(w)
    return acc
  }, {} as Record<string, typeof loadoutWeapons>)

  const viewedLoadout = selectedLoadout ? loadouts.find(l => l.id === selectedLoadout) : null

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-cod-card border border-cod-border rounded-xl p-4">
        <h2 className="text-white font-bold text-lg flex items-center gap-2">
          🔧 لودآوت‌ساز
        </h2>
        <p className="text-gray-500 text-xs mt-0.5">
          لودآوت‌های خود را بسازید، ذخیره کنید و به اشتراک بگذارید
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Saved Loadouts */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="text-white font-bold text-sm flex items-center gap-2">
            💾 لودآوت‌های ذخیره شده
            <span className="bg-cod-card2 text-gray-400 text-xs px-2 py-0.5 rounded-full border border-cod-border">
              {loadouts.length}
            </span>
          </h3>

          {loadouts.length === 0 && (
            <div className="bg-cod-card border border-cod-border rounded-xl p-6 text-center">
              <div className="text-3xl mb-2">🔧</div>
              <p className="text-gray-500 text-sm">هنوز لودآوتی ذخیره نشده</p>
              <p className="text-gray-600 text-xs mt-1">اولین لودآوت خود را بسازید</p>
            </div>
          )}

          <div className="space-y-2">
            {loadouts.map(l => {
              const primary = loadoutWeapons.find(w => w.id === l.primary)
              const isSelected = selectedLoadout === l.id
              return (
                <div
                  key={l.id}
                  className={`bg-cod-card border rounded-xl p-3 cursor-pointer transition-all ${
                    isSelected ? 'border-cod-gold' : 'border-cod-border hover:border-cod-gold/40'
                  }`}
                  onClick={() => setSelectedLoadout(isSelected ? null : l.id)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium text-sm">{l.name}</p>
                      <p className="text-gray-500 text-xs mt-0.5">
                        {primary ? `${primary.name} · ${CLASS_FA[primary.class]}` : 'بدون سلاح اصلی'}
                      </p>
                    </div>
                    <div className="flex gap-1" onClick={e => e.stopPropagation()}>
                      <button
                        onClick={() => handleShare(l)}
                        className="p-1.5 rounded-lg bg-cod-card2 border border-cod-border hover:border-cod-gold/50 text-gray-400 hover:text-white text-xs transition-all"
                        title="اشتراک‌گذاری"
                      >
                        {copied ? '✅' : '📋'}
                      </button>
                      <button
                        onClick={() => handleEdit(l)}
                        className="p-1.5 rounded-lg bg-cod-card2 border border-cod-border hover:border-cod-gold/50 text-gray-400 hover:text-white text-xs transition-all"
                        title="ویرایش"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDelete(l.id)}
                        className="p-1.5 rounded-lg bg-cod-card2 border border-red-900/50 hover:border-red-500/50 text-gray-400 hover:text-red-400 text-xs transition-all"
                        title="حذف"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>

                  {/* Expanded view */}
                  {isSelected && viewedLoadout && (
                    <div className="mt-3 pt-3 border-t border-cod-border space-y-2">
                      {viewedLoadout.secondary && (
                        <div className="text-xs text-gray-400">
                          🔫 ثانوی: <span className="text-white">{loadoutWeapons.find(w => w.id === viewedLoadout.secondary)?.name}</span>
                        </div>
                      )}
                      {viewedLoadout.perks.some(Boolean) && (
                        <div className="text-xs text-gray-400">
                          ⚡ پرک‌ها: <span className="text-white">{viewedLoadout.perks.filter(Boolean).join(' · ')}</span>
                        </div>
                      )}
                      {viewedLoadout.lethal && (
                        <div className="text-xs text-gray-400">
                          💣 کشنده: <span className="text-white">{viewedLoadout.lethal}</span>
                        </div>
                      )}
                      {viewedLoadout.tactical && (
                        <div className="text-xs text-gray-400">
                          🌀 تاکتیکی: <span className="text-white">{viewedLoadout.tactical}</span>
                        </div>
                      )}
                      {viewedLoadout.fieldUpgrade && (
                        <div className="text-xs text-gray-400">
                          🛡️ ارتقای میدان: <span className="text-white">{viewedLoadout.fieldUpgrade}</span>
                        </div>
                      )}
                      {/* Meta stats for primary */}
                      {primary && getWeaponMeta(primary.id) && (
                        <div className="mt-2 bg-cod-card2 rounded-lg p-2">
                          <p className="text-cod-gold text-xs font-medium mb-1">آمار متا:</p>
                          {(() => {
                            const m = getWeaponMeta(primary.id)!
                            return (
                              <div className="grid grid-cols-2 gap-1 text-xs text-gray-400">
                                <span>آسیب: {m.damage}/10</span>
                                <span>رنج: {m.range}/10</span>
                                <span>تحرک: {m.mobility}/10</span>
                                <span>کنترل: {m.control}/10</span>
                              </div>
                            )
                          })()}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Build Form */}
        <div className="lg:col-span-2">
          <div className="bg-cod-card border border-cod-border rounded-xl p-5 space-y-5">
            <h3 className="text-white font-bold text-sm">
              {editing ? '✏️ ویرایش لودآوت' : '➕ لودآوت جدید'}
            </h3>

            {/* Name */}
            <div>
              <label className="text-gray-400 text-xs mb-1.5 block">نام لودآوت *</label>
              <input
                type="text"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                placeholder="مثلاً: لودآوت متا وارزون"
                className="w-full bg-cod-card2 border border-cod-border rounded-lg px-3 py-2 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-cod-gold/60 transition-colors"
              />
            </div>

            {/* Primary Weapon */}
            <div>
              <label className="text-gray-400 text-xs mb-1.5 block">🔫 سلاح اصلی *</label>
              <select
                value={form.primary}
                onChange={e => setForm(f => ({ ...f, primary: e.target.value }))}
                className="w-full bg-cod-card2 border border-cod-border rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-cod-gold/60 transition-colors"
              >
                <option value="">انتخاب سلاح اصلی...</option>
                {Object.entries(weaponsByClass).map(([cls, weapons]) => (
                  <optgroup key={cls} label={CLASS_FA[cls] || cls}>
                    {weapons.map(w => (
                      <option key={w.id} value={w.id}>{w.name}</option>
                    ))}
                  </optgroup>
                ))}
              </select>
              {form.primary && getWeaponMeta(form.primary) && (
                <div className="mt-2 bg-cod-card2 rounded-lg p-2 flex gap-3 text-xs text-gray-400">
                  {(() => {
                    const m = getWeaponMeta(form.primary)!
                    return <>
                      <span>تیر {m.tier}</span>
                      <span>آسیب {m.damage}/10</span>
                      <span>رنج {m.range}/10</span>
                      <span className={m.trending === 'up' ? 'text-green-400' : m.trending === 'down' ? 'text-red-400' : ''}>
                        {m.trending === 'up' ? '📈' : m.trending === 'down' ? '📉' : '➡️'}
                      </span>
                    </>
                  })()}
                </div>
              )}
            </div>

            {/* Secondary Weapon */}
            <div>
              <label className="text-gray-400 text-xs mb-1.5 block">🔫 سلاح ثانوی</label>
              <select
                value={form.secondary}
                onChange={e => setForm(f => ({ ...f, secondary: e.target.value }))}
                className="w-full bg-cod-card2 border border-cod-border rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-cod-gold/60 transition-colors"
              >
                <option value="">انتخاب سلاح ثانوی...</option>
                {Object.entries(weaponsByClass).map(([cls, weapons]) => (
                  <optgroup key={cls} label={CLASS_FA[cls] || cls}>
                    {weapons.map(w => (
                      <option key={w.id} value={w.id}>{w.name}</option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>

            {/* Perks */}
            <div>
              <label className="text-gray-400 text-xs mb-1.5 block">⚡ پرک‌ها (۳ عدد)</label>
              <div className="grid grid-cols-3 gap-2">
                {[0, 1, 2].map(i => (
                  <select
                    key={i}
                    value={form.perks[i]}
                    onChange={e => {
                      const updated = [...form.perks] as [string, string, string]
                      updated[i] = e.target.value
                      setForm(f => ({ ...f, perks: updated }))
                    }}
                    className="w-full bg-cod-card2 border border-cod-border rounded-lg px-2 py-2 text-white text-sm focus:outline-none focus:border-cod-gold/60 transition-colors"
                  >
                    <option value="">پرک {i + 1}...</option>
                    {perks.map(p => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                ))}
              </div>
            </div>

            {/* Lethal & Tactical */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-gray-400 text-xs mb-1.5 block">💣 کشنده</label>
                <select
                  value={form.lethal}
                  onChange={e => setForm(f => ({ ...f, lethal: e.target.value }))}
                  className="w-full bg-cod-card2 border border-cod-border rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-cod-gold/60 transition-colors"
                >
                  <option value="">انتخاب...</option>
                  {lethals.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
              <div>
                <label className="text-gray-400 text-xs mb-1.5 block">🌀 تاکتیکی</label>
                <select
                  value={form.tactical}
                  onChange={e => setForm(f => ({ ...f, tactical: e.target.value }))}
                  className="w-full bg-cod-card2 border border-cod-border rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-cod-gold/60 transition-colors"
                >
                  <option value="">انتخاب...</option>
                  {tacticals.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>

            {/* Field Upgrade */}
            <div>
              <label className="text-gray-400 text-xs mb-1.5 block">🛡️ ارتقای میدانی</label>
              <select
                value={form.fieldUpgrade}
                onChange={e => setForm(f => ({ ...f, fieldUpgrade: e.target.value }))}
                className="w-full bg-cod-card2 border border-cod-border rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-cod-gold/60 transition-colors"
              >
                <option value="">انتخاب...</option>
                {fieldUpgrades.map(fu => <option key={fu} value={fu}>{fu}</option>)}
              </select>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={handleSave}
                disabled={!form.name.trim() || !form.primary}
                className="flex-1 py-2.5 rounded-lg bg-cod-gold text-black font-bold text-sm hover:bg-cod-gold-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {editing ? '💾 ذخیره تغییرات' : '💾 ذخیره لودآوت'}
              </button>
              {editing && (
                <button
                  onClick={() => { setForm(EMPTY_FORM); setEditing(null) }}
                  className="px-4 py-2.5 rounded-lg bg-cod-card2 border border-cod-border text-gray-400 hover:text-white text-sm transition-colors"
                >
                  لغو
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {copied && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-green-500 text-white text-sm px-4 py-2 rounded-full shadow-lg z-50">
          ✅ لودآوت در کلیپ‌بورد کپی شد
        </div>
      )}
    </div>
  )
}
