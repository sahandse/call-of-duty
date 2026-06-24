export interface TeamRole {
  id: string
  nameFa: string
  description: string
  icon: string
  primary: string
  primaryAttachments: string[]
  secondary: string
  secondaryAttachments: string[]
  perks: string[]
  lethal: string
  tactical: string
  fieldUpgrade: string
  tips: string[]
  colorClass: string
  borderClass: string
  gradient: string
}

export const teamRoles: TeamRole[] = [
  {
    id: 'sniper',
    nameFa: 'تک‌تیرانداز',
    description: 'پشتیبانی از دور — کنترل خط میانه و حذف دشمنان از فاصله',
    icon: '🎯',
    primary: 'MTZ Interceptor',
    primaryAttachments: ['Cronen Smooth Barrel', 'VT-7 Spitfire Suppressor', 'MTZ Blackthorn Stock', 'Corio Laz-44 V3', 'MTZ Aggressor Grip'],
    secondary: 'WSP Swarm',
    secondaryAttachments: ['WSP Reckless-90 Barrel', 'ZEHMN35 Flash Hider', 'Slate Reflector', 'WSP Factory Stock'],
    perks: ['Infantry Vest', 'Focus', 'Bird\'s Eye'],
    lethal: 'C4',
    tactical: 'دود',
    fieldUpgrade: 'سپر ضد-گلوله',
    tips: ['روی بلندی‌ها موضع بگیر', 'بعد از شلیک موضع تغییر بده', 'با Callout به تیم اطلاع بده', 'SMG برای فاصله نزدیک داشته باش'],
    colorClass: 'text-blue-400',
    borderClass: 'border-blue-500/40',
    gradient: 'from-blue-900/30 to-blue-800/5',
  },
  {
    id: 'rusher',
    nameFa: 'راشر',
    description: 'تهاجم سریع — فشار روی دشمن و شکستن خط دفاعی',
    icon: '⚡',
    primary: 'WSP Swarm',
    primaryAttachments: ['WSP Reckless-90 Barrel', 'ZEHMN35 Flash Hider', 'Slate Reflector', 'Bruen H9 Stock', 'Demo Cleanshot Grip'],
    secondary: 'Renetti',
    secondaryAttachments: ['XRK IP-V2 Conversion Kit', 'ZEHMN35 Flash Hider', 'Slate Reflector'],
    perks: ['Double Time', 'Sleight of Hand', 'Resolute'],
    lethal: 'C4',
    tactical: 'فلاش',
    fieldUpgrade: 'Dead Silence',
    tips: ['همیشه در حرکت باش', 'قبل از ورود فلاش بزن', 'از cover به cover برو', 'با تیم هماهنگ کن قبل از rush'],
    colorClass: 'text-red-400',
    borderClass: 'border-red-500/40',
    gradient: 'from-red-900/30 to-red-800/5',
  },
  {
    id: 'support',
    nameFa: 'ساپورت',
    description: 'پشتیبانی تیم — اطلاعات، ابزار و نگه داشتن تیم در بازی',
    icon: '🛡️',
    primary: 'Holger 556',
    primaryAttachments: ['Holger Factory Barrel', 'VT-7 Spitfire Suppressor', 'Holger Zulu Pad', 'FTAC Ripper 56', 'Slate Reflector'],
    secondary: 'Rival-9',
    secondaryAttachments: ['Rival-C Long Barrel', 'VT-7 Spitfire Suppressor', 'Demo Cleanshot Grip', 'Slate Reflector'],
    perks: ['Infantry Vest', 'Ghost', 'Combat Scout'],
    lethal: 'نارنجک',
    tactical: 'دود',
    fieldUpgrade: 'ایستگاه تدارکات',
    tips: ['موقعیت دشمن را Callout کن', 'دود برای پوشش تیم بزن', 'تجهیزات تیم را دوباره پر کن', 'آخرین مرگ نباش — تیم را نگه دار'],
    colorClass: 'text-green-400',
    borderClass: 'border-green-500/40',
    gradient: 'from-green-900/30 to-green-800/5',
  },
  {
    id: 'controller',
    nameFa: 'کنترلر',
    description: 'کنترل نقشه — نگه داشتن منطقه و دفع حملات دشمن',
    icon: '🔒',
    primary: 'Pulemyot 762',
    primaryAttachments: ['Jack Annihilator Bullpup Kit', 'VT-7 Spitfire Suppressor', 'FTAC Ripper 56', 'Bruen H9 Stock', 'Slate Reflector'],
    secondary: 'Rival-9',
    secondaryAttachments: ['Rival-C Long Barrel', 'VT-7 Spitfire Suppressor', 'Slate Reflector'],
    perks: ['Gunner Vest', 'Ghost', 'Tempered'],
    lethal: 'مین',
    tactical: 'نارنجک دود',
    fieldUpgrade: 'مین‌ردیاب',
    tips: ['منطقه را با تله‌ها ایمن کن', 'آرمور همیشه کامل داشته باش', 'دسترسی‌های دشمن را ببند', 'LMG برای نگه داشتن cover بهتر است'],
    colorClass: 'text-purple-400',
    borderClass: 'border-purple-500/40',
    gradient: 'from-purple-900/30 to-purple-800/5',
  },
]

export interface TeamSynergy {
  roles: string[]
  nameFa: string
  desc: string
  strength: 'good' | 'excellent'
}

export const teamSynergies: TeamSynergy[] = [
  { roles: ['sniper', 'rusher'],     nameFa: 'دیو و فرشته',   desc: 'تک‌تیرانداز فشار از دور می‌گذارد، راشر دشمن گیج‌شده را حذف می‌کند', strength: 'excellent' },
  { roles: ['support', 'controller'],nameFa: 'قلعه محکم',    desc: 'ساپورت اطلاعات می‌دهد، کنترلر منطقه را قفل می‌کند',               strength: 'excellent' },
  { roles: ['rusher', 'support'],    nameFa: 'ضربه و پشت',   desc: 'راشر حمله می‌کند، ساپورت پوشش و دود می‌دهد',                      strength: 'good'      },
  { roles: ['sniper', 'controller'], nameFa: 'خط آهنین',     desc: 'هر دو کنترل فضا می‌کنند — نیاز به تهاجم از بیرون دارید',           strength: 'good'      },
]
