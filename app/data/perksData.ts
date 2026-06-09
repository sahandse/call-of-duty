export interface PerkInfo {
  id: string
  name: string
  nameFa: string
  slot: 1 | 2 | 3
  description: string
  bestFor: string[]
  tier: 'S' | 'A' | 'B' | 'C'
  icon: string
}

export const perksData: PerkInfo[] = [
  // Slot 1
  { id: 'double-time',    name: 'Double Time',    nameFa: 'دوبرابر زمان',   slot: 1, description: 'مدت زمان Tactical Sprint را دو برابر می‌کند و سرعت کرال را افزایش می‌دهد.', bestFor: ['rush', 'تهاجم سریع', 'warzone mobility'], tier: 'S', icon: '⚡' },
  { id: 'scavenger',      name: 'Scavenger',      nameFa: 'لاشخور',         slot: 1, description: 'فشنگ از کشته‌ها و بسته‌های تامین دریافت می‌کنید.', bestFor: ['بقا بلندمدت', 'warzone', 'aggressive play'], tier: 'A', icon: '🎒' },
  { id: 'infantry-vest',  name: 'Infantry Vest',  nameFa: 'جلیقه پیاده‌نظام', slot: 1, description: 'نرخ Tac Sprint را بهبود می‌بخشد. تجهیزات تاکتیکی اضافی می‌گیرید.', bestFor: ['movement', 'flank', 'تهاجمی'], tier: 'S', icon: '🦺' },
  { id: 'gunner-vest',    name: 'Gunner Vest',    nameFa: 'جلیقه گانر',     slot: 1, description: 'سرعت reload را افزایش می‌دهد. اسلحه اصلی سومی می‌گیرید.', bestFor: ['heavy loadout', 'LMG', 'support'], tier: 'A', icon: '🔫' },
  { id: 'assassin-vest',  name: 'Assassin Vest',  nameFa: 'جلیقه قاتل',     slot: 1, description: 'پس از کشتن دشمن سریع‌تر ریکاور می‌شوید. Ghost و Resolute را جایگزین می‌کند.', bestFor: ['aggressive', 'snowball', 'killstreak'], tier: 'A', icon: '🗡️' },
  // Slot 2
  { id: 'sleight-of-hand',name: 'Sleight of Hand',nameFa: 'دست چابک',        slot: 2, description: 'سرعت reload را به شدت افزایش می‌دهد.', bestFor: ['SMG', 'shotgun', 'نزدیک'], tier: 'A', icon: '🤚' },
  { id: 'ghost',          name: 'Ghost',          nameFa: 'روح',             slot: 2, description: 'در حین حرکت از UAV دشمن پنهان می‌شوید.', bestFor: ['پنهانکاری', 'warzone', 'ranked'], tier: 'S', icon: '👻' },
  { id: 'hardline',       name: 'Hardline',       nameFa: 'خط سخت',         slot: 2, description: 'هزینه کمتری برای Killstreak می‌پردازید.', bestFor: ['killstreak', 'مالتی‌پلیر', 'تهاجم'], tier: 'B', icon: '💰' },
  { id: 'focus',          name: 'Focus',          nameFa: 'تمرکز',           slot: 2, description: 'تکان sway هنگام هدف‌گیری کاهش می‌یابد. مدت زمان Aim Down Sights بیشتر است.', bestFor: ['sniper', 'marksman', 'رنج بلند'], tier: 'B', icon: '🎯' },
  // Slot 3
  { id: 'survivor',       name: 'Survivor',       nameFa: 'بازمانده',        slot: 3, description: 'هنگام رفتن به حالت DBNO احیا خودکار را فراخوانی می‌کنید.', bestFor: ['warzone solo', 'بقا'], tier: 'S', icon: '💚' },
  { id: 'tempered',       name: 'Tempered',       nameFa: 'آبدیده',          slot: 3, description: 'Armor Plates کمتری برای پر کردن Armor Bar نیاز دارید.', bestFor: ['warzone', 'resource management', 'aggressive'], tier: 'S', icon: '🛡️' },
  { id: 'combat-scout',   name: 'Combat Scout',   nameFa: 'پیشاهنگ نبرد',   slot: 3, description: 'آسیب رساندن به دشمن، موقعیت او را برای تیم نمایش می‌دهد.', bestFor: ['تیم‌بازی', 'callout', 'support'], tier: 'A', icon: '📡' },
  { id: 'resolute',       name: 'Resolute',       nameFa: 'مصمم',            slot: 3, description: 'هنگام دریافت آسیب سرعت حرکت افزایش می‌یابد.', bestFor: ['movement', 'فرار', 'بقا تهاجمی'], tier: 'B', icon: '🏃' },
  { id: 'birdseye',       name: 'Bird\'s Eye',    nameFa: 'چشم عقاب',        slot: 3, description: 'مینیمپ زوم‌اوت می‌شود. UAV موقعیت و جهت دشمن را نشان می‌دهد.', bestFor: ['warzone', 'map awareness', 'اطلاعات'], tier: 'A', icon: '🦅' },
]

export interface MetaLoadout {
  id: string
  name: string
  nameFa: string
  description: string
  game: 'warzone' | 'mw3' | 'both'
  style: string
  styleFa: string
  primary: string
  primaryAttachments: string[]
  secondary: string
  secondaryAttachments: string[]
  perks: string[]
  lethal: string
  tactical: string
  fieldUpgrade: string
  difficulty: 'آسان' | 'متوسط' | 'پیشرفته'
  icon: string
}

export const metaLoadouts: MetaLoadout[] = [
  {
    id: 'wz-sniper-support',
    name: 'WZ Sniper + SMG',
    nameFa: 'تک‌تیرانداز + SMG',
    description: 'ترکیب کلاسیک وارزون — MTZ Interceptor برای رنج دور و WSP Swarm برای نزدیک',
    game: 'warzone',
    style: 'aggressive',
    styleFa: 'تهاجمی',
    primary: 'MTZ Interceptor',
    primaryAttachments: ['Cronen Smooth Barrel', 'VT-7 Spitfire Suppressor', 'MTZ Blackthorn Stock', 'Corio Laz-44 V3', 'MTZ Aggressor Grip'],
    secondary: 'WSP Swarm',
    secondaryAttachments: ['WSP Reckless-90 Barrel', 'ZEHMN35 Flash Hider', 'Slate Reflector', 'WSP Factory Stock', 'Bruen H9 Stock'],
    perks: ['Infantry Vest', 'Ghost', 'Tempered'],
    lethal: 'C4',
    tactical: 'دود',
    fieldUpgrade: 'مین‌ردیاب',
    difficulty: 'متوسط',
    icon: '🎯',
  },
  {
    id: 'wz-ar-smg',
    name: 'WZ AR + SMG',
    nameFa: 'رایفل + SMG',
    description: 'SVA 545 برای رنج متوسط و Rival-9 برای نزدیک — ست همه‌کاره',
    game: 'warzone',
    style: 'allround',
    styleFa: 'همه‌کاره',
    primary: 'SVA 545',
    primaryAttachments: ['SVA Tyrant Barrel', 'Shadowstrike Suppressor', 'Bruen H9 Stock', 'Demo Cleanshot Grip', 'Slate Reflector'],
    secondary: 'Rival-9',
    secondaryAttachments: ['Rival-C Long Barrel', 'VT-7 Spitfire Suppressor', 'Rival Vice Grip', 'Demo Cleanshot Grip', 'Slate Reflector'],
    perks: ['Double Time', 'Ghost', 'Tempered'],
    lethal: 'نارنجک',
    tactical: 'فلاش',
    fieldUpgrade: 'ایستگاه تدارکات',
    difficulty: 'آسان',
    icon: '⚔️',
  },
  {
    id: 'wz-holger-build',
    name: 'WZ Holger 556 Build',
    nameFa: 'بیلد Holger 556',
    description: 'Holger 556 با بهترین تنظیمات برای رنج بلند وارزون',
    game: 'warzone',
    style: 'defensive',
    styleFa: 'دفاعی',
    primary: 'Holger 556',
    primaryAttachments: ['Holger Factory Barrel', 'VT-7 Spitfire Suppressor', 'Holger Zulu Pad', 'FTAC Ripper 56', 'Slate Reflector'],
    secondary: 'WSP Swarm',
    secondaryAttachments: ['WSP Reckless-90 Barrel', 'ZEHMN35 Flash Hider', 'Slate Reflector', 'WSP Factory Stock', 'Bruen H9 Stock'],
    perks: ['Gunner Vest', 'Ghost', 'Tempered'],
    lethal: 'مین',
    tactical: 'دود',
    fieldUpgrade: 'سپر ضد-گلوله',
    difficulty: 'آسان',
    icon: '🛡️',
  },
  {
    id: 'mw3-rush',
    name: 'MW3 Rush Build',
    nameFa: 'بیلد Rush مولتی‌پلیر',
    description: 'WSP Swarm با maximum mobility — برای rush و سرعت بالا در مولتی‌پلیر',
    game: 'mw3',
    style: 'rush',
    styleFa: 'سرعتی',
    primary: 'WSP Swarm',
    primaryAttachments: ['WSP Reckless-90 Barrel', 'ZEHMN35 Flash Hider', 'Slate Reflector', 'Bruen H9 Stock', 'Demo Cleanshot Grip'],
    secondary: 'Renetti',
    secondaryAttachments: ['XRK IP-V2 Conversion Kit', 'ZEHMN35 Flash Hider', 'Slate Reflector'],
    perks: ['Double Time', 'Sleight of Hand', 'Resolute'],
    lethal: 'C4',
    tactical: 'فلاش',
    fieldUpgrade: 'پزشک میدانی',
    difficulty: 'پیشرفته',
    icon: '⚡',
  },
  {
    id: 'mw3-ranked',
    name: 'MW3 Ranked Build',
    nameFa: 'بیلد Ranked',
    description: 'MCW با تنظیمات استاندارد برای Ranked Play — کنترل‌پذیر و موثر',
    game: 'mw3',
    style: 'ranked',
    styleFa: 'رتبه‌بندی',
    primary: 'MCW',
    primaryAttachments: ['MCW 6.8 Cyclone Barrel', 'Shadowstrike Suppressor', 'MCW Cyclone Grip', 'Bruen H9 Stock', 'Slate Reflector'],
    secondary: 'Rival-9',
    secondaryAttachments: ['Rival-C Long Barrel', 'VT-7 Spitfire Suppressor', 'Demo Cleanshot Grip', 'Slate Reflector', 'Bruen H9 Stock'],
    perks: ['Infantry Vest', 'Ghost', 'Combat Scout'],
    lethal: 'نارنجک',
    tactical: 'دود',
    fieldUpgrade: 'مین‌ردیاب',
    difficulty: 'متوسط',
    icon: '🏅',
  },
]
