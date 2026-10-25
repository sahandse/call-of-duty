'use client'
import { useEffect, useMemo, useState } from 'react'
import { camoWeapons } from '../data/camoData'
import { metaWeapons } from '../data/metaWeapons'
import { loadoutOptions, SLOT_ORDER as GEAR_SLOTS, type LoadoutOption, type LoadoutSlotId } from '../data/perksData'
import { armoryItems, SLOT_FA } from '../data/objectives'
import { CLASS_LABELS, CLASS_ORDER, TIER_LABEL_FA } from '../lib/weaponLabels'
import { Loadout } from '../types'
import SectionHeader from './SectionHeader'
import SourceNote from './SourceNote'

const STORAGE_KEY = 'cod-loadouts'

type Draft = Omit<Loadout, 'id' | 'createdAt'>

const EMPTY_DRAFT: Draft = {
  name: '',
  primary: '',
  secondary: '',
  vest: '',
  gloves: '',
  boots: '',
  gear: [],
  tactical: '',
  lethal: '',
  fieldUpgrade: '',
}

const WEAPONS_BY_CLASS = CLASS_ORDER.map(c => ({
  class: c,
  weapons: camoWeapons.filter(w => w.class === c),
})).filter(g => g.weapons.length > 0)

const GEAR_BY_SLOT = GEAR_SLOTS.map(s => ({ ...s, options: loadoutOptions.filter(o => o.slot === s.id) }))

const optionsOf = (id: LoadoutSlotId) => GEAR_BY_SLOT.find(s => s.id === id)?.options ?? []
const labelOf = (id: LoadoutSlotId) => GEAR_BY_SLOT.find(s => s.id === id)?.labelFa ?? ''

const EQUIP_SELECTS: { key: 'gloves' | 'boots' | 'fieldUpgrade'; label: string; options: LoadoutOption[] }[] = (
  ['gloves', 'boots', 'field_upgrade'] as const
).map(id => ({
  key: id === 'field_upgrade' ? 'fieldUpgrade' : id,
  label: labelOf(id),
  options: optionsOf(id),
}))

const TACTICALS = armoryItems.filter(i => i.slot === 'tactical')
const LETHALS = armoryItems.filter(i => i.slot === 'lethal')

const weaponById = new Map(camoWeapons.map(w => [w.id, w]))
const metaById = new Map(metaWeapons.map(w => [w.id, w]))
const gearById = new Map(loadoutOptions.map(o => [o.id, o]))
const armoryById = new Map(armoryItems.map(i => [i.id, i]))

/** برچسب یک اسلات؛ مقدارهای ذخیره‌شدهٔ قدیمی که در دیتا نیستند، همان‌طور نمایش داده می‌شوند. */
function slotLabel(id: string, fa: boolean): string {
  if (!id) return ''
  return (fa ? gearById.get(id)?.nameFa ?? armoryById.get(id)?.nameFa : gearById.get(id)?.name ?? armoryById.get(id)?.name) ?? id
}

function slotDetail(id: string): string {
  return gearById.get(id)?.descriptionFa ?? armoryById.get(id)?.descriptionFa ?? ''
}

function readLoadouts(): Loadout[] {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    if (!Array.isArray(raw)) return []
    return raw
      .filter(l => l && typeof l.id === 'string')
      .map(l => ({
        ...EMPTY_DRAFT,
        ...l,
        gear: Array.isArray(l.gear) ? l.gear : [],
        id: l.id,
        createdAt: typeof l.createdAt === 'string' ? l.createdAt : '',
      }))
  } catch {
    return []
  }
}

const FIELD_CLASS =
  'w-full border border-cod-border bg-cod-card2 px-2.5 py-1.5 text-xs text-white focus:border-cod-gold/60 focus:outline-none'
const LABEL_CLASS = 'hud-tag mb-1 block'

export default function LoadoutBuilder() {
  const [loadouts, setLoadouts] = useState<Loadout[]>([])
  const [draft, setDraft] = useState<Draft>(EMPTY_DRAFT)
  const [editing, setEditing] = useState<string | null>(null)
  const [openId, setOpenId] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => setLoadouts(readLoadouts()), [])

  const set = <K extends keyof Draft>(key: K, value: Draft[K]) => setDraft(d => ({ ...d, [key]: value }))

  function toggleGear(id: string) {
    setDraft(d => {
      const has = d.gear.includes(id)
      if (has) return { ...d, gear: d.gear.filter(g => g !== id) }
      // جلیقه‌ها حداکثر دو اسلات Gear دارند (Engineer و CCT Comms)
      return { ...d, gear: d.gear.length >= 2 ? [...d.gear.slice(1), id] : [...d.gear, id] }
    })
  }

  function save() {
    if (!draft.name.trim() || !draft.primary) return
    const record: Loadout = {
      ...draft,
      name: draft.name.trim(),
      id: editing ?? Math.random().toString(36).slice(2, 10),
      createdAt: new Date().toISOString(),
    }
    const next = editing ? loadouts.map(l => (l.id === editing ? record : l)) : [...loadouts, record]
    setLoadouts(next)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    setDraft(EMPTY_DRAFT)
    setEditing(null)
  }

  function edit(l: Loadout) {
    const { id, createdAt, ...rest } = l
    void createdAt
    setDraft(rest)
    setEditing(id)
    setOpenId(null)
  }

  function remove(id: string) {
    const next = loadouts.filter(l => l.id !== id)
    setLoadouts(next)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    if (editing === id) {
      setEditing(null)
      setDraft(EMPTY_DRAFT)
    }
    if (openId === id) setOpenId(null)
  }

  function share(l: Loadout) {
    const lines = [
      `COD LOADOUT — ${l.name}`,
      `PRIMARY    ${weaponById.get(l.primary)?.name ?? l.primary}`,
      l.secondary ? `SECONDARY  ${weaponById.get(l.secondary)?.name ?? l.secondary}` : '',
      l.vest ? `VEST       ${slotLabel(l.vest, false)}` : '',
      l.gloves ? `GLOVES     ${slotLabel(l.gloves, false)}` : '',
      l.boots ? `BOOTS      ${slotLabel(l.boots, false)}` : '',
      ...l.gear.map(g => `GEAR       ${slotLabel(g, false)}`),
      l.tactical ? `TACTICAL   ${slotLabel(l.tactical, false)}` : '',
      l.lethal ? `LETHAL     ${slotLabel(l.lethal, false)}` : '',
      l.fieldUpgrade ? `FIELD UPG  ${slotLabel(l.fieldUpgrade, false)}` : '',
    ].filter(Boolean)
    navigator.clipboard.writeText(lines.join('\n')).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const previewMeta = useMemo(() => metaById.get(draft.primary), [draft.primary])
  const filledSlots = useMemo(
    () => [draft.vest, draft.gloves, draft.boots, ...draft.gear, draft.tactical, draft.lethal, draft.fieldUpgrade].filter(Boolean).length,
    [draft],
  )

  return (
    <div className="space-y-4">
      <SectionHeader
        tab="loadout"
        title="لودآوت‌ساز"
        note="اسلات‌ها از سیستم Gear سیزن ۵ می‌آیند: جلیقه مشخص می‌کند چند تجهیز و Gear بردارید. لودآوت فقط در همین مرورگر ذخیره می‌شود."
        stats={[
          { label: 'سلاح', value: camoWeapons.length },
          { label: 'جلیقه', value: optionsOf('vest').length },
          { label: 'Gear', value: optionsOf('gear').length },
          { label: 'لودآوت شما', value: loadouts.length },
        ]}
      />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[320px_minmax(0,1fr)]">
        <aside className="space-y-2">
          <p className="hud-tag">لودآوت‌های ذخیره‌شده</p>
          {loadouts.length === 0 && (
            <p className="border border-cod-border bg-cod-card px-3 py-6 text-center text-xs text-gray-500">
              هنوز لودآوتی نساخته‌اید.
            </p>
          )}
          {loadouts.map(l => {
            const weapon = weaponById.get(l.primary)
            const meta = metaById.get(l.primary)
            const open = openId === l.id
            return (
              <div
                key={l.id}
                className={`notch border bg-cod-card p-3 ${open ? 'border-cod-gold/40' : 'border-cod-border'}`}
              >
                <button className="w-full text-right" onClick={() => setOpenId(open ? null : l.id)}>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-bold text-white">{l.name}</span>
                    {meta && (
                      <span className="hud-num border border-cod-gold/40 px-1.5 text-[10px] text-cod-gold-light">
                        TIER {meta.tier}
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 font-mono text-[10px] text-gray-500" dir="ltr">
                    {weapon?.name ?? l.primary}
                    {l.secondary ? ` · ${weaponById.get(l.secondary)?.name ?? l.secondary}` : ''}
                  </p>
                </button>

                {open && (
                  <ul className="mt-2 space-y-1 border-t border-cod-border pt-2">
                    {(
                      [
                        ['جلیقه', l.vest],
                        ['دستکش', l.gloves],
                        ['چکمه', l.boots],
                        ['Gear', l.gear.map(g => slotLabel(g, true)).filter(Boolean).join(' + ')],
                        ['تاکتیکی', slotLabel(l.tactical, true)],
                        ['مرگبار', slotLabel(l.lethal, true)],
                        ['ارتقای میدانی', slotLabel(l.fieldUpgrade, true)],
                      ] as [string, string][]
                    )
                      .filter(([, v]) => v)
                      .map(([k, v]) => (
                        <li key={k} className="flex items-baseline justify-between gap-2 text-[11px]">
                          <span className="hud-tag shrink-0">{k}</span>
                          <span className="text-left text-gray-300">{v}</span>
                        </li>
                      ))}
                    <li className="flex gap-2 pt-2">
                      <button onClick={() => share(l)} className="btn-tac flex-1">کپی</button>
                      <button onClick={() => edit(l)} className="btn-tac flex-1">ویرایش</button>
                      <button
                        onClick={() => remove(l.id)}
                        className="border border-cod-red/40 px-2 py-1 text-[11px] text-cod-red hover:bg-cod-red/10"
                      >
                        حذف
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            )
          })}
        </aside>

        <div className="space-y-4">
          <div className="hud-frame space-y-4 bg-cod-panel p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="hud-title text-base text-white">{editing ? 'ویرایش لودآوت' : 'لودآوت جدید'}</h3>
              <span className="hud-num text-[11px] text-gray-500">{filledSlots}/7 اسلات پر شده</span>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label className={LABEL_CLASS}>نام لودآوت</label>
                <input
                  value={draft.name}
                  onChange={e => set('name', e.target.value)}
                  placeholder="مثلاً راش نزدیک‌برد"
                  className={FIELD_CLASS}
                />
              </div>
              <div>
                <label className={LABEL_CLASS}>سلاح اصلی</label>
                <select value={draft.primary} onChange={e => set('primary', e.target.value)} className={FIELD_CLASS}>
                  <option value="">انتخاب…</option>
                  {WEAPONS_BY_CLASS.map(g => (
                    <optgroup key={g.class} label={CLASS_LABELS[g.class]}>
                      {g.weapons.map(w => (
                        <option key={w.id} value={w.id}>{w.name}</option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>
              <div>
                <label className={LABEL_CLASS}>سلاح ثانوی / melee</label>
                <select value={draft.secondary} onChange={e => set('secondary', e.target.value)} className={FIELD_CLASS}>
                  <option value="">بدون سلاح ثانوی</option>
                  {WEAPONS_BY_CLASS.map(g => (
                    <optgroup key={g.class} label={CLASS_LABELS[g.class]}>
                      {g.weapons.map(w => (
                        <option key={w.id} value={w.id}>{w.name}</option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>
              <div>
                <label className={LABEL_CLASS}>جلیقه (تعیین‌کنندهٔ اسلات‌ها)</label>
                <select value={draft.vest} onChange={e => set('vest', e.target.value)} className={FIELD_CLASS}>
                  <option value="">انتخاب…</option>
                  {optionsOf('vest').map(o => (
                    <option key={o.id} value={o.id}>{o.nameFa}</option>
                  ))}
                </select>
              </div>
            </div>

            {draft.vest && gearById.get(draft.vest)?.slotsFa && (
              <p className="border-r-2 border-cod-gold/50 bg-cod-card px-3 py-1.5 text-[11px] text-gray-400">
                {gearById.get(draft.vest)!.slotsFa}
              </p>
            )}

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {EQUIP_SELECTS.map(({ key, label, options }) => (
                <div key={key}>
                  <label className={LABEL_CLASS}>{label}</label>
                  <select
                    value={draft[key]}
                    onChange={e => set(key, e.target.value)}
                    className={FIELD_CLASS}
                  >
                    <option value="">انتخاب…</option>
                    {options.map(o => (
                      <option key={o.id} value={o.id}>{o.nameFa}</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {([['tactical', TACTICALS], ['lethal', LETHALS]] as const).map(([slot, list]) => (
                <div key={slot}>
                  <label className={LABEL_CLASS}>{SLOT_FA[slot]}</label>
                  <select
                    value={slot === 'tactical' ? draft.tactical : draft.lethal}
                    onChange={e => set(slot, e.target.value)}
                    className={FIELD_CLASS}
                  >
                    <option value="">انتخاب…</option>
                    {list.map(i => (
                      <option key={i.id} value={i.id}>{i.nameFa} — {i.requireFa}</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>

            <div>
              <label className={LABEL_CLASS}>{`${labelOf('gear')} (حداکثر دو عدد)`}</label>
              <div className="flex flex-wrap gap-1.5">
                {optionsOf('gear')
                  .map(o => {
                    const on = draft.gear.includes(o.id)
                    return (
                      <button
                        key={o.id}
                        onClick={() => toggleGear(o.id)}
                        title={o.descriptionFa}
                        className={`px-2 py-1 text-[11px] transition-colors ${
                          on ? 'bg-cod-gold text-black' : 'border border-cod-border text-gray-400 hover:text-white'
                        }`}
                      >
                        {o.nameFa}
                      </button>
                    )
                  })}
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={save}
                disabled={!draft.name.trim() || !draft.primary}
                className="btn-tac flex-1 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {editing ? 'ذخیرهٔ تغییرات' : 'ذخیرهٔ لودآوت'}
              </button>
              {editing && (
                <button
                  onClick={() => {
                    setDraft(EMPTY_DRAFT)
                    setEditing(null)
                  }}
                  className="btn-tac"
                >
                  انصراف
                </button>
              )}
            </div>
          </div>

          {(previewMeta || draft.gear.length > 0 || draft.vest) && (
            <div className="space-y-2">
              <p className="hud-tag">پیش‌نمایش</p>
              {previewMeta && (
                <div className="notch border border-cod-border bg-cod-card p-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="hud-num border border-cod-gold/40 px-1.5 text-[10px] text-cod-gold-light">
                      TIER {previewMeta.tier}
                    </span>
                    <span className="text-sm font-bold text-white">{previewMeta.name}</span>
                    <span className="hud-tag">{TIER_LABEL_FA[previewMeta.tier]}</span>
                  </div>
                  <p className="mt-1 text-[11px] text-gray-400">{previewMeta.bestFor}</p>
                  <p className="mt-1 font-mono text-[10px] text-gray-600">
                    امتیاز تحریری ۱–۱۰ (نه عدد درون‌بازی): damage {previewMeta.damage} · range {previewMeta.range} · fireRate{' '}
                    {previewMeta.fireRate} · mobility {previewMeta.mobility} · control {previewMeta.control}
                  </p>
                </div>
              )}
              <ul className="grid grid-cols-1 gap-1.5 md:grid-cols-2">
                {[
                  draft.vest,
                  draft.gloves,
                  draft.boots,
                  ...draft.gear,
                  draft.tactical,
                  draft.lethal,
                  draft.fieldUpgrade,
                ]
                  .filter(Boolean)
                  .map(id => {
                    const detail = slotDetail(id)
                    if (!detail) return null
                    return (
                      <li key={id} className="border-r-2 border-cod-border bg-cod-card px-3 py-2">
                        <p className="text-[11.5px] font-bold text-white">{slotLabel(id, true)}</p>
                        <p className="mt-0.5 text-[11px] leading-relaxed text-gray-400">{detail}</p>
                      </li>
                    )
                  })}
              </ul>
            </div>
          )}

          <SourceNote kind="verified" source="یادداشت‌های سیزن ۵ ریلُود + فهرست تجهیزات MW3">
            اسلات‌ها و توضیح هر Gear از دادهٔ تأییدشدهٔ سیزن ۵ خوانده شده است؛ جلیقه تعیین می‌کند چند اسلات تجهیز و Gear
            داشته باشید و بعضی جلیقه‌ها اسلات‌ها را حذف یا اضافه می‌کنند.
          </SourceNote>
        </div>
      </div>

      {copied && (
        <p className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 border border-cod-gold bg-cod-panel px-4 py-2 text-xs text-cod-gold">
          لودآوت در کلیپ‌بورد کپی شد
        </p>
      )}
    </div>
  )
}
