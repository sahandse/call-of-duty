import { LoadoutWeapon } from '../types'

export const loadoutWeapons: LoadoutWeapon[] = [
  // Assault Rifles
  { id: 'mcw',        name: 'MCW',         class: 'assault_rifle', classFa: 'رایفل اسالت', game: 'mw3' },
  { id: 'sva-545',    name: 'SVA 545',     class: 'assault_rifle', classFa: 'رایفل اسالت', game: 'both' },
  { id: 'holger-556', name: 'Holger 556',  class: 'assault_rifle', classFa: 'رایفل اسالت', game: 'warzone' },
  { id: 'bas-b',      name: 'BAS-B',       class: 'assault_rifle', classFa: 'رایفل اسالت', game: 'both' },
  { id: 'fr-avancer', name: 'FR Avancer',  class: 'assault_rifle', classFa: 'رایفل اسالت', game: 'both' },
  { id: 'm13c',       name: 'M13C',        class: 'assault_rifle', classFa: 'رایفل اسالت', game: 'both' },
  { id: 'bp50',       name: 'BP50',        class: 'assault_rifle', classFa: 'رایفل اسالت', game: 'both' },
  { id: 'ram-7',      name: 'RAM-7',       class: 'assault_rifle', classFa: 'رایفل اسالت', game: 'both' },
  // SMGs
  { id: 'wsp-swarm',     name: 'WSP Swarm',     class: 'smg', classFa: 'زیرماشین‌تفنگ', game: 'both' },
  { id: 'rival-9',       name: 'Rival-9',       class: 'smg', classFa: 'زیرماشین‌تفنگ', game: 'both' },
  { id: 'lachmann-sub',  name: 'Lachmann Sub',  class: 'smg', classFa: 'زیرماشین‌تفنگ', game: 'both' },
  { id: 'wsp-9',         name: 'WSP-9',         class: 'smg', classFa: 'زیرماشین‌تفنگ', game: 'mw3' },
  { id: 'striker-9',     name: 'Striker 9',     class: 'smg', classFa: 'زیرماشین‌تفنگ', game: 'mw3' },
  { id: 'ram-9',         name: 'RAM-9',         class: 'smg', classFa: 'زیرماشین‌تفنگ', game: 'both' },
  // LMGs
  { id: 'holger-26',     name: 'Holger 26',     class: 'lmg', classFa: 'مسلسل سبک', game: 'warzone' },
  { id: 'taq-eradicator',name: 'TAQ Eradicator',class: 'lmg', classFa: 'مسلسل سبک', game: 'warzone' },
  { id: 'pulemyot-762',  name: 'Pulemyot 762',  class: 'lmg', classFa: 'مسلسل سبک', game: 'warzone' },
  { id: 'bruen-mk9',     name: 'Bruen MK9',     class: 'lmg', classFa: 'مسلسل سبک', game: 'warzone' },
  // Snipers
  { id: 'katt-amr',      name: 'KATT AMR',      class: 'sniper', classFa: 'تک‌تیرانداز', game: 'warzone' },
  { id: 'mcpr-300',      name: 'MCPR-300',      class: 'sniper', classFa: 'تک‌تیرانداز', game: 'warzone' },
  { id: 'signal-50',     name: 'Signal 50',     class: 'sniper', classFa: 'تک‌تیرانداز', game: 'warzone' },
  // Marksman
  { id: 'mtz-interceptor',name: 'MTZ Interceptor',class: 'marksman', classFa: 'تفنگ نشانه‌گیر', game: 'both' },
  { id: 'dm56',           name: 'DM56',           class: 'marksman', classFa: 'تفنگ نشانه‌گیر', game: 'both' },
  { id: 'svd',            name: 'SVD',            class: 'marksman', classFa: 'تفنگ نشانه‌گیر', game: 'both' },
  // Shotguns
  { id: 'mx-guardian',   name: 'MX Guardian',   class: 'shotgun', classFa: 'شاتگان', game: 'mw3' },
  { id: 'lockwood-680',  name: 'Lockwood 680',  class: 'shotgun', classFa: 'شاتگان', game: 'mw3' },
  { id: 'kv-broadside',  name: 'KV Broadside',  class: 'shotgun', classFa: 'شاتگان', game: 'mw3' },
  // Handguns
  { id: 'renetti',       name: 'Renetti',       class: 'handgun', classFa: 'تپانچه', game: 'both' },
  { id: 'ws-swarm-pistol',name: 'WSP Stinger',  class: 'handgun', classFa: 'تپانچه', game: 'both' },
  { id: 'jak-beholder',  name: 'JAK Beholder',  class: 'handgun', classFa: 'تپانچه', game: 'both' },
]

export const perks = [
  'شتاب',
  'پنهان‌کاری',
  'مقاومت',
  'جرقه',
  'تله‌چین',
  'قوی‌دست',
  'دید آهنی',
  'سریع‌پا',
  'پیش‌گیری',
  'محاصره',
]

export const lethals = [
  'نارنجک',
  'مین',
  'C4',
  'مولوتف',
  'نارنجک خوشه‌ای',
  'ترمیت',
]

export const tacticals = [
  'فلاش',
  'دود',
  'کوش',
  'کوری',
  'ضربه‌گیر',
  'پهپاد پرنده',
]

export const fieldUpgrades = [
  'پزشک میدانی',
  'مین‌ردیاب',
  'سپر ضد-گلوله',
  'منطقه سکوت',
  'ایستگاه تدارکات',
  'اسلحه‌خانه',
]
