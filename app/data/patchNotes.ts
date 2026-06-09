import { PatchNote } from '../types'

export const patchNotes: PatchNote[] = [
  {
    id: 'patch-s5-reloaded',
    date: '2024-09-18',
    version: 'سیزن ۵ ریلود',
    titleFa: 'آپدیت سیزن ۵ ریلود — بالانس سلاح‌ها و رویداد Haunting',
    summary: 'بالانس گسترده سلاح‌ها، رویداد Haunting، نقشه جدید Meat، و رفع باگ‌های مهم',
    changes: [
      {
        category: 'weapons',
        categoryFa: '🔫 سلاح‌ها',
        items: [
          'MTZ Interceptor: کاهش ۸٪ آسیب در رنج بلند',
          'SVA 545: بهبود کنترل ریکویل ۱۲٪',
          'WSP Swarm: افزایش آسیب تیر اول ۵٪',
          'Holger 556: رفع باگ attachment conflict',
          'Rival-9: کاهش سرعت ADS 15ms',
          'BAS-B: کاهش آسیب سینه ۴٪',
          'Holger 26: بهبود استحکام ریکویل عمودی',
        ],
      },
      {
        category: 'warzone',
        categoryFa: '🗺️ وارزون',
        items: [
          'اضافه شدن رویداد Haunting با نقشه ترسناک Spooky Urzikstan',
          'بهبود سیستم Gulag — ۳ ثانیه زمان اضافه در شروع دوئل',
          'رفع باگ loot خانه‌های شمالی Urzikstan',
          'بهینه‌سازی فریم ریت کنسول‌های نسل قبل',
          'کاهش سرعت حلقه Circle مرحله ۳ و ۴',
        ],
      },
      {
        category: 'multiplayer',
        categoryFa: '🎮 مولتی‌پلیر',
        items: [
          'نقشه جدید: Meat (بازگشت کلاسیک)',
          'رفع باگ spawn در نقشه Rust',
          'بهبود hitbox اپراتورهای زن در حالت prone',
          'رفع فریز تصادفی در حالت Ranked Play',
          'اضافه شدن پلی‌لیست Infected Halloween',
        ],
      },
      {
        category: 'bugs',
        categoryFa: '🐛 رفع باگ',
        items: [
          'رفع crash هنگام لود loadout سفارشی',
          'رفع مشکل نمایش XP در پایان بازی',
          'رفع باگ operator skin در cutscene',
          'رفع مشکل عدم شنیدن صدای footstep در برخی نقشه‌ها',
        ],
      },
    ],
  },
  {
    id: 'patch-s5',
    date: '2024-08-28',
    version: 'سیزن ۵',
    titleFa: 'سیزن ۵: حماسه تاریکی — محتوای جدید و بالانس کلی',
    summary: 'شروع سیزن ۵ با اپراتور جدید، ۲ سلاح جدید، نقشه جدید Al-Mazrah Reborn و بالانس گسترده',
    changes: [
      {
        category: 'weapons',
        categoryFa: '🔫 سلاح‌ها',
        items: [
          'سلاح جدید: TAQ Evolvere — LMG با نرخ آتش بالا',
          'سلاح جدید: JAK Annihilator — تبدیل‌گر میله برای تپانچه‌ها',
          'MCW: بهبود سرعت ADS ۱۰ms',
          'Holger 556: افزایش آسیب تیر اول ۶٪',
          'WSP Swarm: کاهش آسیب در رنج ۱۵+ متری ۸٪',
          'Pulemyot 762: بهبود کنترل ریکویل ۱۵٪',
          'Striker 9: کاهش آسیب عمومی ۵٪',
        ],
      },
      {
        category: 'warzone',
        categoryFa: '🗺️ وارزون',
        items: [
          'اضافه شدن منطقه جدید Black Site در Urzikstan',
          'بهبود سیستم Buy Station — قیمت‌ها متعادل شدند',
          'رفع باگ نادیده گرفتن damage در داخل وسایل نقلیه',
          'اضافه شدن لودآوت‌های از پیش ساخته در پارتی Quick Play',
          'کاهش تعداد سقوط کانتینر هوایی از ۵ به ۳',
        ],
      },
      {
        category: 'multiplayer',
        categoryFa: '🎮 مولتی‌پلیر',
        items: [
          'نقشه جدید: Vista (نقشه کوچک 2v2 Gunfight)',
          'حالت جدید: All or Nothing',
          'بهبود سیستم spawn در نقشه Favela',
          'اضافه شدن Ranked Play فصل ۵',
          'رفع نامتوازن بودن تیم‌ها در لابی‌های باز',
        ],
      },
      {
        category: 'operators',
        categoryFa: '👤 اپراتورها',
        items: [
          'اپراتور جدید: Makarov — اسکین ویژه Dark Oath',
          'اضافه شدن بسته‌ی فصلی اپراتور Ghost با ۳ اسکین',
          'رفع مشکل انیمیشن لگ کشیدن در برخی اسکین‌ها',
        ],
      },
    ],
  },
  {
    id: 'patch-s4-reloaded',
    date: '2024-07-10',
    version: 'سیزن ۴ ریلود',
    titleFa: 'آپدیت سیزن ۴ ریلود — رویداد Ranked و Patch بزرگ سلاح‌ها',
    summary: 'تغییرات بزرگ در متای وارزون، بالانس LMG‌ها، رویداد تابستانی و رفع باگ‌های بحرانی',
    changes: [
      {
        category: 'weapons',
        categoryFa: '🔫 سلاح‌ها',
        items: [
          'TAQ Eradicator: کاهش ۱۰٪ آسیب عمومی (Nerf)',
          'Holger 26: افزایش ظرفیت ماگزین پایه از ۓ۶۰ به ۸۰',
          'SVA 545: رفع باگ ریکویل در مد سه‌تایی',
          'DM56: افزایش سرعت bullet velocity ۱۲٪',
          'Lachmann Sub: افزایش آسیب سینه ۵٪',
          'FR Avancer: بهبود ADS time ۱۵ms',
        ],
      },
      {
        category: 'warzone',
        categoryFa: '🗺️ وارزون',
        items: [
          'اضافه شدن پلی‌لیست Solos Ranked',
          'رفع باگ نادیده گرفتن سپر در برخی موقعیت‌ها',
          'بهبود سیستم loot pool در آخرین دایره‌ها',
          'رفع مشکل نمایش minimap در رزولوشن ۴K',
        ],
      },
      {
        category: 'multiplayer',
        categoryFa: '🎮 مولتی‌پلیر',
        items: [
          'اضافه شدن حالت اختصاصی Ranked Play Season 4',
          'بهبود سیستم Anti-Cheat Ricochet',
          'نقشه‌های Rotation هفتگی اضافه شدند',
          'رفع باگ مرگ ناگهانی در محل‌های spawn نقشه Highrise',
        ],
      },
      {
        category: 'bugs',
        categoryFa: '🐛 رفع باگ',
        items: [
          'رفع crash بحرانی هنگام ورود به لابی در PC',
          'رفع مشکل همگام‌سازی progression اکانت',
          'رفع نمایش غلط تعداد کیل در عملکردنامه',
          'رفع مشکل صدای محیطی نقشه Vondel',
        ],
      },
    ],
  },
  {
    id: 'patch-s4',
    date: '2024-06-26',
    version: 'سیزن ۴',
    titleFa: 'سیزن ۴: بازگشت اسطوره — محتوای کامل سیزن',
    summary: 'شروع سیزن ۴ با نقشه جدید, ۳ سلاح جدید، اپراتور Price و تغییرات اساسی در سیستم Perk',
    changes: [
      {
        category: 'weapons',
        categoryFa: '🔫 سلاح‌ها',
        items: [
          'سلاح جدید: SOA Subverter — Battle Rifle',
          'سلاح جدید: Superi 46 — SMG سبک',
          'سلاح جدید: Torque 35 — Marksman Rifle',
          'SVA 545: buff کنترل ریکویل ۸٪',
          'BAS-B: کاهش آسیب در رنج کوتاه ۶٪',
        ],
      },
      {
        category: 'warzone',
        categoryFa: '🗺️ وارزون',
        items: [
          'نقشه جدید: Vondel Summer Edition با تغییرات فصلی',
          'اضافه شدن Titanium Armor Plate با دوام بیشتر',
          'بهبود سیستم redeploy در Resurgence',
          'رفع باگ ناپدید شدن Gulag در پارتی‌های ۴ نفره',
        ],
      },
      {
        category: 'operators',
        categoryFa: '👤 اپراتورها',
        items: [
          'اپراتور Price بازگشت با پکیج ویژه Reloaded',
          'اضافه شدن Soap با اسکین Wetworks',
          'بهبود کیفیت تکسچر اپراتورهای قدیمی',
        ],
      },
    ],
  },
]
