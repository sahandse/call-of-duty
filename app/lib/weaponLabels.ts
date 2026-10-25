import { WeaponClass, MetaTier, PatchTag } from '../types'

export const CLASS_LABELS: Record<WeaponClass, string> = {
  assault_rifle: 'رایفل اسالت',
  battle_rifle: 'رایفل نبرد',
  smg: 'زیرماشین‌تفنگ',
  lmg: 'مسلسل سبک',
  sniper: 'تک‌تیرانداز',
  marksman: 'تفنگ نشانه‌گیر',
  shotgun: 'شاتگان',
  handgun: 'تپانچه',
}

export const CLASS_ORDER: WeaponClass[] = [
  'assault_rifle',
  'battle_rifle',
  'smg',
  'lmg',
  'marksman',
  'sniper',
  'shotgun',
  'handgun',
]

export const TIER_LABEL_FA: Record<MetaTier, string> = {
  S: 'برتر',
  A: 'خیلی خوب',
  B: 'قابل استفاده',
  C: 'پایین‌دست',
  D: 'غیرمتا',
}

export const TIER_STYLE: Record<MetaTier, { chip: string; border: string; bg: string; bar: string }> = {
  S: { chip: 'bg-cod-gold text-black', border: 'border-cod-gold/50', bg: 'bg-cod-gold/5', bar: 'bg-cod-gold' },
  A: { chip: 'bg-cod-green text-black', border: 'border-cod-green/50', bg: 'bg-cod-green/5', bar: 'bg-cod-green' },
  B: { chip: 'bg-cod-steel text-white', border: 'border-cod-steel/50', bg: 'bg-cod-steel/5', bar: 'bg-cod-steel' },
  C: { chip: 'bg-cod-sand text-black', border: 'border-cod-sand/50', bg: 'bg-cod-sand/5', bar: 'bg-cod-sand' },
  D: { chip: 'bg-cod-red text-white', border: 'border-cod-red/50', bg: 'bg-cod-red/5', bar: 'bg-cod-red' },
}

export const PATCH_LABEL: Record<PatchTag, string> = {
  S5: 'S05',
  S5R: 'S05R',
}
