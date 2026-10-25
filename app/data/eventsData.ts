export type EventKind = 'festival' | 'field_rep' | 'conquest' | 'esports'

export interface GameEvent {
  id: string
  name: string
  nameFa: string
  kind: EventKind
  kindFa: string
  startDate: string
  endDate: string
  dateNoteFa?: string
  mechanicFa: string
  rewardsFa: string[]
  boostWith?: string
  modesFa: string[]
  noteFa?: string
}

export const season5Events: GameEvent[] = [
  {
    id: 'summerslam',
    name: 'WWE SummerSlam',
    nameFa: 'رویداد WWE SummerSlam',
    kind: 'festival',
    kindFa: 'فستیوال دو هفته‌ای',
    startDate: '2024-07-31',
    endDate: '2024-08-07',
    mechanicFa:
      'چالش‌ها در همهٔ مودها پخش می‌شدند و با تکمیل آن‌ها آیتم‌های WWE باز می‌شد. تنها رویدادی که یک حالت اختصاصی (Slam Deathmatch) فقط در بازهٔ خودش فعال داشت.',
    rewardsFa: [
      'پاداش Mastery به‌صورت اسکین اپراتور',
      'آیتم‌های کاسمتیک WWE (استیکر، دکال، کارت ویزیت و Finishing Moveهای کشتی)',
    ],
    modesFa: ['Multiplayer', 'Warzone', 'Zombies'],
    noteFa:
      'در Slam Deathmatch همهٔ Finishing Moveها به حرکات تصادفی WWE تبدیل می‌شدند؛ حالت فقط از ۳۱ ژوئیه در دسترس بود.',
  },
  {
    id: 'conquest',
    name: 'Conquest',
    nameFa: 'رویداد Conquest',
    kind: 'conquest',
    kindFa: 'فستیوال چالشی',
    startDate: '2024-08-07',
    endDate: '2024-08-14',
    mechanicFa:
      'چالش‌های هدفمند در مودهای مشخص مولتی‌پلیر، روی POIهای معین وارزون و نقاط معین Modern Warfare Zombies — نه یک حالت جدید، بلکه مجموعه‌ای از وظایف مکان‌محور.',
    rewardsFa: ['پاداش‌های فصلی رویداد (کاسمتیک)'],
    modesFa: ['Multiplayer', 'Warzone', 'MWZ'],
  },
  {
    id: 'echo-endo',
    name: 'Echo Endo Live!',
    nameFa: 'Field Rep: Echo Endo Live!',
    kind: 'field_rep',
    kindFa: 'Field Rep (پاداش XP محور)',
    startDate: '2024-08-14',
    endDate: '2024-08-21',
    mechanicFa:
      'ساختار Field Rep: با بازی کردن XP معمولی جمع می‌شود و پاداش‌ها در مسیر XP باز می‌شوند؛ اگر باندل Echo Endo را تجهیز کنید، بوست XP اضافه می‌گیرید.',
    rewardsFa: ['پاداش‌های مسیر XP رویداد'],
    boostWith: 'Tracer Pack: Echo Endo Thunder-Bolt',
    modesFa: ['Multiplayer', 'Warzone', 'Zombies'],
  },
  {
    id: 'wildlife-most-wanted',
    name: 'Wildlife Most Wanted',
    nameFa: 'Field Rep: Wildlife Most Wanted',
    kind: 'field_rep',
    kindFa: 'Field Rep (میانهٔ فصل)',
    startDate: '2024-09-04',
    endDate: '2024-09-12',
    dateNoteFa:
      'دو تاریخ رسمی برای این رویداد وجود دارد: یادداشت‌های سیزن ۵ ریلُود بازهٔ ۲۱ تا ۲۸ آگوست را نوشته‌اند و مقالهٔ محتوایی سیزن ۵ همان Field Rep را ۴ تا ۱۲ سپتامبر ذکر کرده است.',
    mechanicFa:
      'Field Rep با پاداش XP؛ تجهیز هر اسکین از بستهٔ Animal Head بوست XP اضافهٔ رویداد را فعال می‌کرد.',
    rewardsFa: ['پاداش‌های مسیر XP رویداد'],
    boostWith: 'بستهٔ Animal Head (مثلاً Wildlife Wanted: CODFish)',
    modesFa: ['Multiplayer', 'Warzone', 'Zombies'],
  },
  {
    id: 'emotional-overdrive',
    name: 'Emotional Overdrive',
    nameFa: 'Field Rep: Emotional Overdrive',
    kind: 'field_rep',
    kindFa: 'Field Rep (آخرین رویداد سیزن)',
    startDate: '2024-09-12',
    endDate: '2024-09-18',
    mechanicFa:
      'آخرین رویداد سیزن ۵ — مسیر XP با پاداش‌های Emoji و بوست XP در صورت تجهیز باندل Emoji.',
    rewardsFa: ['پاداش‌های مسیر XP رویداد'],
    boostWith: 'باندل Emoji',
    modesFa: ['Multiplayer', 'Warzone', 'Zombies'],
    noteFa: 'پایان این رویداد (۱۸ سپتامبر ۲۰۲۴) پایان محتوای سیزن ۵ بود؛ بعد از آن سیزن ۶ آغاز شد.',
  },
  {
    id: 'code-bowl',
    name: 'C.O.D.E. Bowl V presented by USAA',
    nameFa: 'C.O.D.E. Bowl V — رویداد خیریهٔ esports',
    kind: 'esports',
    kindFa: 'پخش زنده / خیریه',
    startDate: '2024-08-28',
    endDate: '2024-08-28',
    mechanicFa:
      'پنجمین دورهٔ رویداد Call of Duty Endowment با تیم‌های آمریکا، بریتانیا و کانادا؛ پنجرهٔ Watch XP در بازی همراه آن فعال بود.',
    rewardsFa: ['XP و پاداش‌های تماشای رویداد (Watch Party)'],
    modesFa: ['Esports Broadcast'],
    noteFa: 'در این دوره دومین جایزهٔ Monster Energy MVP اهدا شد.',
  },
]
