export type EventType = 'double_xp' | 'double_weapon_xp' | 'ltm' | 'seasonal' | 'community'

export interface EventChallenge {
  id: string
  nameFa: string
  descFa: string
  rewardFa: string
  xp: number
}

export interface GameEvent {
  id: string
  nameFa: string
  type: EventType
  typeFa: string
  description: string
  startDate: string
  endDate: string
  challenges: EventChallenge[]
  rewards: string[]
  icon: string
  colorClass: string
}

export const currentEvents: GameEvent[] = [
  {
    id: 'season3-operation',
    nameFa: 'عملیات سیزن ۳',
    type: 'seasonal',
    typeFa: 'رویداد فصلی',
    description: 'رویداد اصلی سیزن ۳ — ۱۰ چالش ویژه با جوایز انحصاری',
    startDate: '2026-06-01',
    endDate: '2026-07-15',
    challenges: [
      { id: 's3-1', nameFa: 'کیلر بی‌رحم',   descFa: '۵۰ کیل در Warzone',                  rewardFa: 'کارت تماس انحصاری',    xp: 5000  },
      { id: 's3-2', nameFa: 'بازمانده',        descFa: '۵ بار در Top 10 وارزون',             rewardFa: 'چارم سلاح',             xp: 7500  },
      { id: 's3-3', nameFa: 'تیم‌بازی',        descFa: '۲۰ کیل تیمی در مولتی‌پلیر',         rewardFa: 'آرم‌بند اپراتور',       xp: 5000  },
      { id: 's3-4', nameFa: 'تیرانداز ماهر',   descFa: '۳۰ هدشات در هر مود',                rewardFa: 'اسپری',                 xp: 6000  },
      { id: 's3-5', nameFa: 'استراتژیست',      descFa: '۱۰ بار از تجهیزات تاکتیکی مؤثر',   rewardFa: 'کارت تماس متحرک',       xp: 8000  },
      { id: 's3-6', nameFa: 'پیروز میدان',     descFa: '۳ بار برنده مسابقه شوید',           rewardFa: 'پوشش سلاح نادر',        xp: 10000 },
      { id: 's3-7', nameFa: 'مهارت کامو',      descFa: '۵ چالش کامو را تکمیل کنید',         rewardFa: 'آیکون بازیکن',          xp: 7500  },
      { id: 's3-8', nameFa: 'خرید شاپ',        descFa: '۳ آیتم از فروشگاه بخرید',           rewardFa: '۱۰۰ CoD Point',         xp: 3000  },
      { id: 's3-9', nameFa: 'بازیکن پیوسته',   descFa: '۵ روز متوالی وارد بازی شوید',       rewardFa: 'پوست اپراتور جدید',     xp: 15000 },
      { id: 's3-10',nameFa: 'افسانه',           descFa: 'تمام ۹ چالش بالا را تکمیل کنید',   rewardFa: 'باندل ویژه سیزن ۳',    xp: 20000 },
    ],
    rewards: ['پوست اپراتور انحصاری', 'باندل ویژه سیزن ۳', 'کارت تماس انیمیشن‌دار', 'آرم متالیک'],
    icon: '🌟',
    colorClass: 'border-cod-gold/40 bg-cod-gold/5',
  },
  {
    id: 'double-xp-weekend',
    nameFa: 'آخر هفته XP دوبل',
    type: 'double_xp',
    typeFa: 'XP دوبل',
    description: 'تمام XP بازی و Battle Pass این آخر هفته دو برابر است',
    startDate: '2026-06-27',
    endDate: '2026-06-30',
    challenges: [],
    rewards: ['XP دوبل برای تمام بازی‌ها', 'XP دوبل برای Battle Pass'],
    icon: '⚡',
    colorClass: 'border-yellow-500/40 bg-yellow-500/5',
  },
  {
    id: 'resurgence-royale',
    nameFa: 'Resurgence Royale',
    type: 'ltm',
    typeFa: 'حالت محدود',
    description: 'حالت ویژه با Respawn نامحدود — آخرین تیم برنده است',
    startDate: '2026-06-20',
    endDate: '2026-07-05',
    challenges: [
      { id: 'rr-1', nameFa: 'اولین خون',    descFa: 'اول کیل بگیرید',           rewardFa: 'XP 2500',          xp: 2500  },
      { id: 'rr-2', nameFa: 'بازگشت قهرمان',descFa: '۳ بار Respawn بگیرید',     rewardFa: 'XP 5000',          xp: 5000  },
      { id: 'rr-3', nameFa: 'آخرین ایستاده',descFa: 'یک بار در مود برنده شوید', rewardFa: 'کارت تماس محدود',  xp: 10000 },
    ],
    rewards: ['کارت تماس Resurgence', 'XP ۱۷۵۰۰'],
    icon: '🏆',
    colorClass: 'border-orange-500/40 bg-orange-500/5',
  },
  {
    id: 'weapon-xp-week',
    nameFa: 'هفته XP سلاح',
    type: 'double_weapon_xp',
    typeFa: 'XP سلاح دوبل',
    description: 'تمام XP سلاح دو برابر است — ایده‌آل برای level کردن سلاح‌های جدید',
    startDate: '2026-06-24',
    endDate: '2026-07-01',
    challenges: [],
    rewards: ['XP سلاح دوبل', 'پیشرفت سریع‌تر اتچمنت‌ها'],
    icon: '🔫',
    colorClass: 'border-blue-500/40 bg-blue-500/5',
  },
  {
    id: 'community-challenge',
    nameFa: 'چالش جامعه',
    type: 'community',
    typeFa: 'چالش جامعه',
    description: 'بازیکنان با هم به اهداف مشترک می‌رسند — هر مشارکت اهمیت دارد',
    startDate: '2026-06-15',
    endDate: '2026-07-10',
    challenges: [
      { id: 'cc-1', nameFa: 'کیل جمعی', descFa: 'با هم ۱۰۰۰۰۰۰۰ کیل بگیرید', rewardFa: 'آیتم شاپ رایگان برای همه', xp: 10000 },
    ],
    rewards: ['آیتم انحصاری برای تمام شرکت‌کنندگان', 'XP ۱۰۰۰۰'],
    icon: '🤝',
    colorClass: 'border-green-500/40 bg-green-500/5',
  },
]
