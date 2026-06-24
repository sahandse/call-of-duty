export interface TTKWeapon {
  id: string
  name: string
  class: string
  classFa: string
  game: 'warzone' | 'mw3' | 'both'
  bodyDamage: number
  headMultiplier: number
  limbMultiplier: number
  rpm: number
  magSize: number
}

export const ttkWeapons: TTKWeapon[] = [
  { id: 'mcw',            name: 'MCW',            class: 'assault_rifle', classFa: 'رایفل اسالت',   game: 'both',    bodyDamage: 34,  headMultiplier: 1.5, limbMultiplier: 0.8, rpm: 677,  magSize: 30 },
  { id: 'sva-545',        name: 'SVA 545',        class: 'assault_rifle', classFa: 'رایفل اسالت',   game: 'both',    bodyDamage: 33,  headMultiplier: 1.5, limbMultiplier: 0.8, rpm: 720,  magSize: 30 },
  { id: 'holger-556',     name: 'Holger 556',     class: 'assault_rifle', classFa: 'رایفل اسالت',   game: 'both',    bodyDamage: 36,  headMultiplier: 1.5, limbMultiplier: 0.8, rpm: 660,  magSize: 30 },
  { id: 'ram-7',          name: 'RAM-7',          class: 'assault_rifle', classFa: 'رایفل اسالت',   game: 'both',    bodyDamage: 31,  headMultiplier: 1.5, limbMultiplier: 0.8, rpm: 780,  magSize: 30 },
  { id: 'bas-b',          name: 'BAS-B',          class: 'battle_rifle',  classFa: 'رایفل نبرد',    game: 'both',    bodyDamage: 51,  headMultiplier: 1.5, limbMultiplier: 0.8, rpm: 400,  magSize: 20 },
  { id: 'wsp-swarm',      name: 'WSP Swarm',      class: 'smg',           classFa: 'زیرماشین‌تفنگ', game: 'both',    bodyDamage: 23,  headMultiplier: 1.5, limbMultiplier: 0.8, rpm: 960,  magSize: 50 },
  { id: 'rival-9',        name: 'Rival-9',        class: 'smg',           classFa: 'زیرماشین‌تفنگ', game: 'both',    bodyDamage: 25,  headMultiplier: 1.5, limbMultiplier: 0.8, rpm: 857,  magSize: 40 },
  { id: 'ram-9',          name: 'RAM-9',          class: 'smg',           classFa: 'زیرماشین‌تفنگ', game: 'both',    bodyDamage: 24,  headMultiplier: 1.5, limbMultiplier: 0.8, rpm: 900,  magSize: 30 },
  { id: 'striker-9',      name: 'Striker 9',      class: 'smg',           classFa: 'زیرماشین‌تفنگ', game: 'both',    bodyDamage: 22,  headMultiplier: 1.5, limbMultiplier: 0.8, rpm: 1000, magSize: 32 },
  { id: 'mtz-interceptor',name: 'MTZ Interceptor',class: 'sniper',        classFa: 'تک‌تیرانداز',   game: 'both',    bodyDamage: 113, headMultiplier: 1.5, limbMultiplier: 0.8, rpm: 43,   magSize: 5  },
  { id: 'kv-inhibitor',   name: 'KV Inhibitor',   class: 'sniper',        classFa: 'تک‌تیرانداز',   game: 'both',    bodyDamage: 105, headMultiplier: 1.5, limbMultiplier: 0.8, rpm: 50,   magSize: 5  },
  { id: 'bruen-mk9',      name: 'Bruen Mk9',      class: 'lmg',           classFa: 'مسلسل سبک',     game: 'both',    bodyDamage: 38,  headMultiplier: 1.5, limbMultiplier: 0.8, rpm: 576,  magSize: 75 },
  { id: 'pulemyot-762',   name: 'Pulemyot 762',   class: 'lmg',           classFa: 'مسلسل سبک',     game: 'both',    bodyDamage: 42,  headMultiplier: 1.5, limbMultiplier: 0.8, rpm: 540,  magSize: 75 },
  { id: 'dg-58-lsw',      name: 'DG-58 LSW',      class: 'marksman',      classFa: 'تفنگ نشانه‌گیر',game: 'both',    bodyDamage: 45,  headMultiplier: 1.5, limbMultiplier: 0.8, rpm: 480,  magSize: 30 },
  { id: 'longbow',        name: 'Longbow',        class: 'marksman',      classFa: 'تفنگ نشانه‌گیر',game: 'both',    bodyDamage: 52,  headMultiplier: 1.5, limbMultiplier: 0.8, rpm: 240,  magSize: 10 },
  { id: 'lockwood-680',   name: 'Lockwood 680',   class: 'shotgun',       classFa: 'شاتگان',         game: 'both',    bodyDamage: 280, headMultiplier: 1.5, limbMultiplier: 0.8, rpm: 55,   magSize: 6  },
  { id: 'renetti',        name: 'Renetti',        class: 'handgun',       classFa: 'تپانچه',         game: 'both',    bodyDamage: 28,  headMultiplier: 1.5, limbMultiplier: 0.8, rpm: 750,  magSize: 15 },
]

export const HP_PRESETS = [
  { label: 'وارزون — ۲ آرمور (۲۵۰ HP)', value: 250, game: 'warzone' },
  { label: 'وارزون — ۱ آرمور (۱۷۵ HP)', value: 175, game: 'warzone' },
  { label: 'وارزون — بدون آرمور (۱۰۰ HP)', value: 100, game: 'warzone' },
  { label: 'MW3 مولتی‌پلیر (۱۰۰ HP)', value: 100, game: 'mw3' },
]

export function calcSTK(hp: number, damage: number) {
  return Math.ceil(hp / damage)
}

export function calcTTK(hp: number, damage: number, rpm: number) {
  const stk = calcSTK(hp, damage)
  if (stk <= 1) return 0
  return Math.round((stk - 1) * (60000 / rpm))
}
