export interface TimelineEntry {
  id: string
  date: string
  dateFa: string
  label: string
  titleFa: string
  items: string[]
  confirmed: boolean
}

export const releaseTimeline: TimelineEntry[] = [
  {
    id: 'tl-s5-launch',
    date: '2024-07-24',
    dateFa: '۲ ژوئیه/۲۴ ژوئیه — ۹ صبح PT',
    label: 'SEASON 5 LAUNCH',
    titleFa: 'آغاز سیزن ۵',
    confirmed: true,
    items: [
      'پاس نبرد با بیش از ۱۰۰ پاداش، به‌همراه سلاح‌های جدید STG44 (Sector 7) و Static-HV (Sector 6).',
      'نقشه‌های مولتی‌پلیر Bait، Yard، Celship و Toonoxide؛ حالت‌های Arcade و COD Warrior؛ Tactical جدید EMP Grenade.',
      'وارزون: POI جدید Atlas Superstore در Urzikstan، حالت Superstore Resurgence، Field Upgrade به نام R.D.B. و Public Event به نام Bounty Contest.',
      'Ranked Play مولتی‌پلیر و وارزون با پاداش‌های Skill Division جدید؛ Prestige تا رتبهٔ ۲۱ و سطح ۱٬۰۵۰.',
      'شاپ: باندل‌های WWE (Cody Rhodes و Rey Mysterio)، Toon Force 141، Down From the Skies Ultra، Underboss Pro Pack و Sock Puppets.',
    ],
  },
  {
    id: 'tl-summerslam',
    date: '2024-07-31',
    dateFa: '۹ تا ۱۷ مرداد ۱۴۰۳',
    label: 'EVENT · WWE SUMMERSLAM',
    titleFa: 'رویداد WWE SummerSlam (۳۱ ژوئیه – ۷ آگوست)',
    confirmed: true,
    items: [
      'حالت Slam Deathmatch فقط در همین بازه در دسترس بود — حرکات پایانی تصادفی WWE با امتیازدهی کشتی.',
      'چالش‌های رویداد در همهٔ مودها با پاداش Operator Skin mastery.',
      'هفتهٔ ۲ چالش‌های هفتگی: قطعهٔ JAK Cataclysm برای RPK.',
    ],
  },
  {
    id: 'tl-conquest',
    date: '2024-08-07',
    dateFa: '۱۶ تا ۲۳ مرداد ۱۴۰۳',
    label: 'EVENT · CONQUEST',
    titleFa: 'رویداد Conquest (۷ – ۱۴ آگوست)',
    confirmed: true,
    items: [
      'چالش‌های هدفمند در مودهای خاص مولتی‌پلیر، POIهای وارزون و نقاط Zombies.',
      'هفتهٔ ۳ چالش‌های هفتگی: قطعهٔ JAK Slash (زیرلولهٔ چاقو).',
    ],
  },
  {
    id: 'tl-echo-endo',
    date: '2024-08-14',
    dateFa: '۲۳ مرداد – ۱ شهریور ۱۴۰۳',
    label: 'FIELD REP · ECHO ENDO',
    titleFa: 'Field Rep: Echo Endo Live! (۱۴ – ۲۱ آگوست)',
    confirmed: true,
    items: [
      'بوست XP با تجهیز باندل Echo Endo؛ پاداش‌ها با کسب XP باز می‌شدند.',
      'باندل Tracer Pack: Echo Endo Thunder-Bolt (اسکین Jet «Miryou Echo» و بلوپرینت‌های DG-58 LSW و Striker).',
      'هفتهٔ ۴ چالش‌های هفتگی: قطعهٔ JAK Protean برای RAAL MG.',
    ],
  },
  {
    id: 'tl-reloaded',
    date: '2024-08-21',
    dateFa: '۳۱ مرداد ۱۴۰۳',
    label: 'SEASON 5 RELOADED',
    titleFa: 'سیزن ۵ ریلُود — میانهٔ فصل',
    confirmed: true,
    items: [
      'نقشهٔ Ink House و حالت‌های Fishfection، Paintball، Defuse or Destroy و بازگشت Cyber Attack.',
      'سلاح‌های mid-season: Torque 35 (کمان، چالش هفتهٔ ۵) و Spear (نیزهٔ پرتابی، Sector پاس).',
      'وارزون: Supreme Resurgence روی Rebirth Island، Elite Contracts و Public Event جدید Recon Flyover.',
      'موج بالانس: nerf سنگین STG44 و Static-HV، buff کامل Pulemyot 762 و MCW، اسلات دوم Gear روی Infantry Vest.',
      'باندل‌ها: Wildlife Wanted: CODFish، Black Hole و Obon Festival.',
      'MWZ: مأموریت پایانی Operation Deadbolt و شروع مسیر Dark Aether Rift.',
    ],
  },
  {
    id: 'tl-code-bowl',
    date: '2024-08-28',
    dateFa: '۷ شهریور ۱۴۰۳',
    label: 'ESPORTS · C.O.D.E. BOWL V',
    titleFa: 'C.O.D.E. Bowl V presented by USAA (۲۸ آگوست)',
    confirmed: true,
    items: [
      'پنجمین دورهٔ رویداد خیریهٔ Call of Duty Endowment با حضور تیم‌های آمریکا، بریتانیا و کانادا.',
      'اهدا؛ جایزهٔ دوم Monster Energy MVP در این دوره.',
    ],
  },
  {
    id: 'tl-wildlife',
    date: '2024-08-21',
    dateFa: 'تاریخ دوگانه در منابع رسمی',
    label: 'FIELD REP · WILDLIFE MOST WANTED',
    titleFa: 'Field Rep: Wildlife Most Wanted',
    confirmed: true,
    items: [
      'یادداشت‌های رسمی ریلُود بازهٔ ۲۱–۲۸ آگوست را نوشته‌اند، درحالی‌که مقالهٔ محتوایی سیزن ۵ همین Field Rep را ۴–۱۲ سپتامبر معرفی می‌کند.',
      'بوست XP با تجهیز هر اسکین از بستهٔ Animal Head؛ پاداش‌ها با XP آزاد می‌شد.',
    ],
  },
  {
    id: 'tl-overdrive',
    date: '2024-09-12',
    dateFa: '۲۱ تا ۲۷ شهریور ۱۴۰۳',
    label: 'FIELD REP · EMOTIONAL OVERDRIVE',
    titleFa: 'Field Rep: Emotional Overdrive (۱۲ – ۱۸ سپتامبر)',
    confirmed: true,
    items: [
      'آخرین رویداد سیزن ۵ — XP بوست با تجهیز باندل Emoji و پاداش‌های XP محور.',
      'هفتهٔ ۷ و ۸ چالش‌های هفتگی: JAK Devastators (Reclaimer 18) و یک بلوپرینت ویژه؛ تکمیل هر هشت هفته ⇒ کاموی متحرک Chainbreaker.',
    ],
  },
]

export const weeklyChallengesS5 = [
  { week: 1, date: '2024-07-24', reward: 'JAK Widemouth Barrel', weapon: 'MORS Sniper Rifle', rewardFa: 'لولهٔ مغناطیسی با ساچمه‌های شکافنده — تبدیل MORS به باران ترکش' },
  { week: 2, date: '2024-07-31', reward: 'JAK Cataclysm', weapon: 'RPK LMG', rewardFa: 'کیت تبدیل به .50 Cal با درامگ ظرفیت بالا' },
  { week: 3, date: '2024-08-07', reward: 'JAK Slash', weapon: 'Underbarrel (چند سلاح)', rewardFa: 'گریپ زیرلولهٔ عمودی که ضربهٔ نزدیک را با چاقو جایگزین می‌کند' },
  { week: 4, date: '2024-08-14', reward: 'JAK Protean', weapon: 'RAAL MG LMG', rewardFa: 'لولهٔ تلسکوپی با تعویض Full-Auto / Semi-Auto' },
  { week: 5, date: '2024-08-21', reward: 'Torque 35', weapon: 'Launcher (سلاح پایه)', rewardFa: 'کمان ترکیبی با ۲۰ تیرِ قابل‌بازگرداندن و مهمات ویژه (ترمیت، انفجاری، گاز)' },
  { week: 6, date: '2024-08-28', reward: 'JAK Deathmarch', weapon: 'BAL-27 AR', rewardFa: 'مهمات پرقدرت + لولهٔ پراکنده‌ساز لیزری برای نبرد نزدیک' },
  { week: 7, date: '2024-09-04', reward: 'JAK Devastators', weapon: 'Reclaimer 18 Shotgun', rewardFa: 'دست‌چرخان دوباره (akimbo) با دقت پایین و تخریب بالا' },
  { week: 8, date: '2024-09-11', reward: 'Weapon Blueprint', weapon: 'بلوپرینت ویژه سیزن', rewardFa: 'بلوپرینت سیزن ۵ — پاداش هفتهٔ هشتم' },
]
