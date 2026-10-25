import { GameMode, PatchTag } from '../types'

export const HP_PRESETS = [
  { label: 'وارزون — ۱۵۰ پلاک (۱۵۰ HP)', value: 150 },
  { label: 'وارزون — ۷۵ پلاک (۷۵ HP)', value: 75 },
  { label: 'وارزون — بدون زره (۰ HP)', value: 0 },
  { label: 'MW3 مولتی‌پلیر (۱۰۰ HP)', value: 100 },
]

// فرمول ساده‌شده: شات‌های لازم = (HP + پلاک) ÷ آسیب تنه، رو به بالا.
// TTK = (شات‌های لازم − ۱) ÷ (rpm ÷ ۶۰۰۰۰) — شات آخر زمانِ بین‌شات‌ها را مصرف نمی‌کند.
export function calcSTK(hp: number, damage: number) {
  if (damage <= 0) return 0
  return Math.max(1, Math.ceil(hp / damage))
}

export function calcTTK(hp: number, damage: number, rpm: number) {
  const stk = calcSTK(hp, damage)
  if (stk <= 1 || rpm <= 0) return 0
  return Math.round((stk - 1) * (60000 / rpm))
}

export interface OfficialStat {
  id: string
  weapon: string
  game: GameMode
  patch: PatchTag
  metricFa: string
  value: string
  contextFa: string
}

// هر عدد اینجا مستقیماً از جدول «Weapon Adjustments» یادداشت‌های رسمی سیزن ۵ و
// سیزن ۵ ریلُود استخراج شده است. Activision هیچ‌وقت جدول کامل آسیب MW3 را
// منتشر نکرد، پس این فهرست «مطلق‌های رسمی» است، نه یک دیتابیس کامل سلاح.
export const officialStats: OfficialStat[] = [
  { id: 'stg44-dmg', weapon: 'STG44', game: 'warzone', patch: 'S5R', metricFa: 'حداکثر آسیب', value: '36 → 32', contextFa: 'تنها عدد مطلقِ آسیبی که برای این سلاح منتشر شد؛ روی همه فاصله‌ها اعمال می‌شود.' },
  { id: 'stg44-dmg-mw3', weapon: 'STG44', game: 'mw3', patch: 'S5R', metricFa: 'حداکثر آسیب', value: 'دست‌نخورده', contextFa: 'در یادداشت‌ها آمده که نرَف فقط به وارزون اعمال شد.' },
  { id: 'shv-mid', weapon: 'Static-HV', game: 'warzone', patch: 'S5R', metricFa: 'آسیب میانی', value: '25 → 24', contextFa: 'همراه با کاهش برد؛ TTK نزدیک‌بردش را از حالت بی‌رقیب خارج کرد.' },
  { id: 'shv-max-range', weapon: 'Static-HV', game: 'warzone', patch: 'S5R', metricFa: 'برد آسیب حداکثر', value: '16.0m → 13.97m', contextFa: 'تقریباً ۲ متر.' },
  { id: 'shv-nearmid-range', weapon: 'Static-HV', game: 'warzone', patch: 'S5R', metricFa: 'برد near-mid', value: '30.48m → 25.4m', contextFa: 'مهم‌ترین نرَف: ۵ متر از برد مفید کم شد.' },
  { id: 'shv-mid-range', weapon: 'Static-HV', game: 'warzone', patch: 'S5R', metricFa: 'برد میانی', value: '40.64m → 35.56m', contextFa: '' },
  { id: 'shv-head', weapon: 'Static-HV', game: 'warzone', patch: 'S5R', metricFa: 'ضریب هدشات', value: '1.4x → 1.2x', contextFa: 'با این ضریب، هدشات دیگر کشنده‌ی آنی نیست.' },
  { id: 'shv-leg', weapon: 'Static-HV', game: 'warzone', patch: 'S5R', metricFa: 'ضریب پا و کفش', value: '1x → 0.95x', contextFa: '' },
  { id: 'pulemyot-rpm', weapon: 'Pulemyot 762', game: 'both', patch: 'S5R', metricFa: 'نرخ آتش', value: '492rpm → 545rpm', contextFa: '+۱۱٪ — بزرگ‌ترین بفر LMG سیزن.' },
  { id: 'pulemyot-ads', weapon: 'Pulemyot 762', game: 'both', patch: 'S5R', metricFa: 'زمان ADS', value: '450ms → 420ms', contextFa: '' },
  { id: 'pulemyot-stf', weapon: 'Pulemyot 762', game: 'both', patch: 'S5R', metricFa: 'Sprint-to-fire', value: '285ms → 262ms', contextFa: '' },
  { id: 'pulemyot-neck', weapon: 'Pulemyot 762', game: 'both', patch: 'S5R', metricFa: 'ضریب گردن', value: '1.1x → 1.2x', contextFa: '' },
  { id: 'mcw68-rpm', weapon: 'MCW 6.8', game: 'both', patch: 'S5R', metricFa: 'نرخ آتش', value: '316rpm → 353rpm', contextFa: '+۱۲٪ به‌همراه ضریب تنه پایین ۱x → ۱.۲x.' },
  { id: 'mcw-range', weapon: 'MCW', game: 'warzone', patch: 'S5R', metricFa: 'برد آسیب حداکثر', value: '30.48m → 36.83m', contextFa: 'near-mid تا ۴۴.۴۵m و میانی تا ۵۳.۳۴m افزایش یافت.' },
  { id: 'mcw-torso', weapon: 'MCW', game: 'mw3', patch: 'S5', metricFa: 'ضریب تنه پایین', value: '1x → 1.1x', contextFa: 'هدف رسمی: هم‌TTK کردن تنه پایین با تنه بالا و بازو.' },
  { id: 'soa-range', weapon: 'SOA Subverter', game: 'warzone', patch: 'S5R', metricFa: 'برد آسیب حداکثر', value: '20.57m → 25.4m', contextFa: '+۲۳٪ — آن را به گزینه بلندبرد بعد از STG44 تبدیل کرد.' },
  { id: 'basb-leg', weapon: 'BAS-B', game: 'mw3', patch: 'S5R', metricFa: 'ضریب پا و کفش', value: '1x → 1.1x', contextFa: 'تیر زیر کمر هم‌آسیب تنه شد.' },
  { id: 'basb-range', weapon: 'BAS-B', game: 'mw3', patch: 'S5', metricFa: 'برد آسیب حداکثر', value: '35.56m → 40.64m', contextFa: '' },
  { id: 'mtz762-range', weapon: 'MTZ-762', game: 'mw3', patch: 'S5R', metricFa: 'برد آسیب حداکثر', value: '29.2m → 33m', contextFa: '+۱۳٪.' },
  { id: 'eradicator-min', weapon: 'TAQ Eradicator', game: 'mw3', patch: 'S5', metricFa: 'حداقل آسیب', value: '24 → 28', contextFa: 'همراه با برد حداکثر ۳۳.۰۲ → ۳۹.۳۷m.' },
  { id: 'holger26-torso', weapon: 'Holger 26', game: 'mw3', patch: 'S5', metricFa: 'ضریب تنه پایین', value: '1.1x → 1x', contextFa: 'نرَفِ آگاهانه: برای TTK هدف باید دقیق‌تر شلیک کنی.' },
  { id: 'holger556-range', weapon: 'Holger 556', game: 'warzone', patch: 'S5R', metricFa: 'برد آسیب حداکثر', value: '36.83m → 41.91m', contextFa: '' },
  { id: 'sva-range', weapon: 'SVA 545', game: 'mw3', patch: 'S5', metricFa: 'برد آسیب حداکثر', value: '31.75m → 36.83m', contextFa: '' },
  { id: 'fr556-range', weapon: 'FR 5.56', game: 'warzone', patch: 'S5R', metricFa: 'برد آسیب حداکثر', value: '38.1m → 43.18m', contextFa: 'بازو و دست هم 1x → 1.1x شد.' },
  { id: 'dg56-torso', weapon: 'DG-56', game: 'mw3', patch: 'S5R', metricFa: 'ضریب تنه پایین', value: '1x → 1.1x', contextFa: '' },
  { id: 'rival9-range', weapon: 'Rival-9', game: 'warzone', patch: 'S5R', metricFa: 'برد آسیب حداکثر', value: '12.7m → 15.24m', contextFa: '' },
  { id: 'striker-range', weapon: 'Striker', game: 'warzone', patch: 'S5R', metricFa: 'برد آسیب حداکثر', value: '12.7m → 14.48m', contextFa: 'near-mid هم 24.13m → 26.67m.' },
  { id: 'fjx-mw3-range', weapon: 'FJX Horus', game: 'mw3', patch: 'S5', metricFa: 'برد آسیب حداکثر', value: '10.16m → 8.63m', contextFa: 'near-mid 20.32 → 17.27m و میانی 30.48 → 25.91m.' },
  { id: 'fjx-wz-range', weapon: 'FJX Horus', game: 'warzone', patch: 'S5', metricFa: 'برد آسیب حداکثر', value: '13.7m → 11.4m', contextFa: '−۱۷٪؛ sprint-to-fire 93ms → 110ms.' },
  { id: 'mtzint-range', weapon: 'MTZ Interceptor', game: 'warzone', patch: 'S5', metricFa: 'برد آسیب حداکثر', value: '30.5m → 22.9m', contextFa: '−۲۵٪ و ضرایب تنه/بازو/دست 1x → 0.9x.' },
  { id: 'reclaimer-rpm', weapon: 'Reclaimer 18', game: 'warzone', patch: 'S5', metricFa: 'نرخ آتش نیم‌اَتوماتیک', value: '182rpm → 200rpm', contextFa: 'در عوض پراکندگی هیپ‌فایر ۱۲٪ زیاد شد.' },
  { id: 'reclaimer-pump', weapon: 'Reclaimer 18', game: 'warzone', patch: 'S5', metricFa: 'حداکثر آسیب هیپ‌فایر (پمپ)', value: '80 → 220', contextFa: '+۱۷۵٪ و برد آن 2m → 3m — یک‌شات شد.' },
  { id: 'cor45-rpm', weapon: 'COR-45', game: 'both', patch: 'S5', metricFa: 'نرخ آتش', value: '375rpm → 240rpm', contextFa: '−۳۶٪؛ تریگر v6 به 264rpm و v21 به 272rpm رسید.' },
  { id: 'wsp9-leg', weapon: 'WSP-9', game: 'mw3', patch: 'S5', metricFa: 'ضریب پاها', value: '1x → 0.9x', contextFa: '' },
  { id: 'amr9-range', weapon: 'AMR9', game: 'mw3', patch: 'S5', metricFa: 'برد آسیب حداکثر', value: '12.7m → 15.24m', contextFa: 'near-mid هم 17.78m → 21.59m.' },
  { id: 'superi-speed', weapon: 'Superi 46', game: 'both', patch: 'S5', metricFa: 'سرعت حرکت', value: '5m/s → 4.9m/s', contextFa: 'چمباتمه 2 → 1.9، ساسو 5.9 → 5.8، ADS 3.6 → 3.4m/s.' },
  { id: 'xrk-stalker', weapon: 'XRK Stalker', game: 'warzone', patch: 'S5', metricFa: 'ضریب پا', value: '1x → 1.1x', contextFa: 'داخل برد حداکثر، یک‌شات در هر نقطه بدن.' },
  { id: 'carrack-range', weapon: 'Carrack .300', game: 'warzone', patch: 'S5', metricFa: 'برد near-mid', value: '30.7m → 66m', contextFa: '+۱۱۵٪ و برد میانی حذف شد.' },
  { id: 'tyr-range', weapon: 'TYR', game: 'warzone', patch: 'S5', metricFa: 'برد آسیب حداکثر', value: '5.6m → 8.9m', contextFa: '+۱۴٪؛ near-mid هم 11.4m → 15.2m.' },
  { id: 'sledge', weapon: 'Sledgehammer (Melee)', game: 'both', patch: 'S5', metricFa: 'سرعت حمل', value: '−22%', contextFa: 'در وارزون برد حداکثر 5.3m → 3.2m شد.' },
]

export const PATCH_LABEL: Record<PatchTag, string> = {
  S5: 'سیزن ۵ · 24 ژوئیه 2024',
  S5R: 'سیزن ۵ ریلُود · 21 اوت 2024',
}
