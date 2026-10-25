import { weeklyChallengesS5 } from './shopHistory'

// ─────────────────────────────────────────────────────────────
// آبجکتیوها — دو مجموعهٔ ثابت و قابل‌استناد:
//   ۱) هزینهٔ آزادسازی تجهیزات در سیستم Armory Unlock
//   ۲) پاداش‌های هفتگی سیزن ۵ (بایگانی)
// چالش‌های روزانه/هفتگیِ زندهٔ بازی هر بار جابه‌جا می‌شوند و اینجا
// جعل نشده‌اند؛ برای جزئیات به armoryNotes نگاه کنید.
// ─────────────────────────────────────────────────────────────

export type ArmorySlot = 'tactical' | 'lethal' | 'field_upgrade'

export const SLOT_FA: Record<ArmorySlot, string> = {
  tactical: 'تجهیز تاکتیکی',
  lethal: 'تجهیز مرگبار',
  field_upgrade: 'ارتقای میدانی',
}

export const SLOT_ORDER: ArmorySlot[] = ['tactical', 'lethal', 'field_upgrade']

export interface ArmoryItem {
  id: string
  name: string
  nameFa: string
  slot: ArmorySlot
  requires: { level?: number; armoryChallenges?: number }
  requireFa: string
  descriptionFa: string
}

export const armoryItems: ArmoryItem[] = [
  // ── Tactical ──
  {
    id: 'tac-stun', name: 'Stun Grenade', nameFa: 'نارنجک فلج‌کننده', slot: 'tactical',
    requires: {}, requireFa: 'پیش‌فرض باز',
    descriptionFa: 'حرکت و نشانه‌گیری قربانی را کند می‌کند.',
  },
  {
    id: 'tac-battle-rage', name: 'Battle Rage', nameFa: 'بتل ریج', slot: 'tactical',
    requires: { level: 13 }, requireFa: 'سطح ۱۳',
    descriptionFa:
      'محرک آزمایشی آدرنالین: جان سریع باز می‌گردد، در برابر تجهیزات تاکتیکی مقاومت می‌گیرید و تاکتیکال اسپرینت همیشه فعال می‌ماند.',
  },
  {
    id: 'tac-smoke', name: 'Smoke Grenade', nameFa: 'نارنجک دود', slot: 'tactical',
    requires: { level: 16 }, requireFa: 'سطح ۱۶',
    descriptionFa: 'دیوار دودی که دید و سیستم‌های هدف‌گیری خودکار را می‌بندد.',
  },
  {
    id: 'tac-scatter-mine', name: 'Scatter Mine', nameFa: 'مین پراکنده', slot: 'tactical',
    requires: { level: 18 }, requireFa: 'سطح ۱۸',
    descriptionFa: 'میدانی از مین روی ناحیه‌ای گسترده می‌اندازد که با نزدیک شدن دشمن منفجر می‌شود.',
  },
  {
    id: 'tac-decoy', name: 'Decoy Grenade', nameFa: 'نارنجک فریب', slot: 'tactical',
    requires: { level: 42 }, requireFa: 'سطح ۴۲',
    descriptionFa: 'صدای شلیک، حرکت و امضای راداری شبیه‌سازی می‌کند تا دشمن را گیج کند.',
  },
  {
    id: 'tac-flash', name: 'Flash Grenade', nameFa: 'نارنجک چشم‌خواری', slot: 'tactical',
    requires: { armoryChallenges: 3 }, requireFa: '۳ چالش Armory Unlock',
    descriptionFa: 'موقتاً دید و شنوایی هدف را از بین می‌برد.',
  },
  {
    id: 'tac-emd', name: 'EMD Grenade', nameFa: 'نارنجک EMD', slot: 'tactical',
    requires: { armoryChallenges: 3 }, requireFa: '۳ چالش Armory Unlock',
    descriptionFa: 'دستگاه ردیاب به دشمنِ برخوردکرده می‌چسباند و او را روی مینی‌مپ تیم نشان می‌دهد.',
  },
  {
    id: 'tac-shock-stick', name: 'Shock Stick', nameFa: 'چسب برق', slot: 'tactical',
    requires: { armoryChallenges: 3 }, requireFa: '۳ چالش Armory Unlock',
    descriptionFa: 'دستگاه برقی چسبان؛ دشمن را برق‌گرفته می‌کند، تجهیزات را از کار می‌اندازد و خودرو را از کنترل خارج می‌کند.',
  },
  {
    id: 'tac-stim', name: 'Stim', nameFa: 'استیم', slot: 'tactical',
    requires: { armoryChallenges: 3 }, requireFa: '۳ چالش Armory Unlock',
    descriptionFa: 'محرک نظامی که زخم را سریع می‌بندد و تاکتیکال اسپرینت را ریفرش می‌کند.',
  },
  {
    id: 'tac-tear-gas', name: 'Tear Gas', nameFa: 'گاز اشک‌آور', slot: 'tactical',
    requires: { armoryChallenges: 5 }, requireFa: '۵ چالش Armory Unlock',
    descriptionFa: 'با برخورد به زمین می‌ترکد و ابری ماندگار می‌سازد: حرکت کند، دید تار و سرفه.',
  },
  {
    id: 'tac-snapshot', name: 'Snapshot Grenade', nameFa: 'نارنجک اسنپ‌شات', slot: 'tactical',
    requires: { armoryChallenges: 5 }, requireFa: '۵ چالش Armory Unlock',
    descriptionFa: 'برای لحظه‌ای، دشمنان داخل شعاع انفجار را برای تیم یا اسکواد شما علامت می‌زند.',
  },

  // ── Lethal ──
  {
    id: 'leth-frag', name: 'Frag Grenade', nameFa: 'نارنجک ترکشی', slot: 'lethal',
    requires: {}, requireFa: 'پیش‌فرض باز',
    descriptionFa: 'نارنجک ترکشی قابل‌پخت (cookable).',
  },
  {
    id: 'leth-claymore', name: 'Claymore', nameFa: 'کلمور', slot: 'lethal',
    requires: { level: 8 }, requireFa: 'سطح ۸',
    descriptionFa: 'مین فعال‌شونده با نزدیکی دشمن.',
  },
  {
    id: 'leth-throwing-knife', name: 'Throwing Knife', nameFa: 'چاقوی پرتابی', slot: 'lethal',
    requires: { level: 30 }, requireFa: 'سطح ۳۰',
    descriptionFa: 'چاقوی پرتابی قابل‌بازگرداندن؛ در مودهای Core کشندهٔ مستقیم.',
  },
  {
    id: 'leth-thermite', name: 'Thermite', nameFa: 'ترمیت', slot: 'lethal',
    requires: { level: 33 }, requireFa: 'سطح ۳۳',
    descriptionFa: 'دستگاه آتش‌زای چسبان که به همهٔ سطوح می‌چسبد.',
  },
  {
    id: 'leth-thermobaric', name: 'Thermobaric Grenade', nameFa: 'نارنجک ترموباریک', slot: 'lethal',
    requires: { level: 53 }, requireFa: 'سطح ۵۳',
    descriptionFa:
      'قابل‌پخت؛ انفجار بزرگ با فلج موقت و پس‌ماندهٔ آتشین که قدرت انفجارات را برای مدتی زیاد می‌کند.',
  },
  {
    id: 'leth-semtex', name: 'Semtex', nameFa: 'سمتکس', slot: 'lethal',
    requires: { armoryChallenges: 3 }, requireFa: '۳ چالش Armory Unlock',
    descriptionFa: 'نارنجک چسبان با تایمر.',
  },
  {
    id: 'leth-drill-charge', name: 'Drill Charge', nameFa: 'شارژ دریل', slot: 'lethal',
    requires: { armoryChallenges: 3 }, requireFa: '۳ چالش Armory Unlock',
    descriptionFa: 'شارژی با نیزهٔ حرارتی که داخل سطح حفاری می‌کند و بعد منفجر می‌شود.',
  },
  {
    id: 'leth-breacher-drone', name: 'Breacher Drone', nameFa: 'پهپاد نفوذی', slot: 'lethal',
    requires: { armoryChallenges: 3 }, requireFa: '۳ چالش Armory Unlock',
    descriptionFa: 'پهپاد انفجاری که با نزدیکی دشمن یا برخورد منفجر می‌شود.',
  },
  {
    id: 'leth-c4', name: 'C4', nameFa: 'سی۴', slot: 'lethal',
    requires: { armoryChallenges: 5 }, requireFa: '۵ چالش Armory Unlock',
    descriptionFa: 'انفجاری بزرگ و چسبان که پس از نصب، از راه دور قابل منفجرکردن است.',
  },
  {
    id: 'leth-proximity-mine', name: 'Proximity Mine', nameFa: 'مین نزدیکی', slot: 'lethal',
    requires: { armoryChallenges: 5 }, requireFa: '۵ چالش Armory Unlock',
    descriptionFa: 'با نزدیکی دشمن به هوا پرتاب می‌شود و به ناحیهٔ اطراف آسیب سنگین می‌زند.',
  },
  {
    id: 'leth-throwing-star', name: 'Throwing Star', nameFa: 'ستارهٔ پرتابی', slot: 'lethal',
    requires: { level: 55 }, requireFa: 'سطح ۵۵ و ۵۰ کشتن با چاقوی پرتابی',
    descriptionFa: 'ستارهٔ پرتابی سریع و کشنده که روی هدف اثر زخم‌کنندگی می‌گذارد.',
  },

  // ── Field Upgrades ──
  {
    id: 'fu-munitions', name: 'Munitions Box', nameFa: 'جعبهٔ مهمات', slot: 'field_upgrade',
    requires: {}, requireFa: 'پیش‌فرض باز',
    descriptionFa: 'جعبهٔ مهمات و تجهیزات برای شما و هم‌تیمی‌ها.',
  },
  {
    id: 'fu-comm-scrambler', name: 'Comm Scrambler', nameFa: 'بِرزنندهٔ ارتباط', slot: 'field_upgrade',
    requires: { level: 6 }, requireFa: 'سطح ۶',
    descriptionFa:
      'ارتباط دشمن با اطلاعات را داخل شعاع قطع می‌کند؛ دشمن نمی‌تواند کیل‌استریک فعال کند و UAV او شما را نمی‌بیند. موقعیت بِرزَننده روی مینی‌مپ دشمن قابل مشاهده است.',
  },
  {
    id: 'fu-deployable-cover', name: 'Deployable Cover', nameFa: 'سپر قابل‌حمل', slot: 'field_upgrade',
    requires: { level: 22 }, requireFa: 'سطح ۲۲',
    descriptionFa: 'پوشش بالیستیک با نصب سریع.',
  },
  {
    id: 'fu-acs', name: 'A.C.S.', nameFa: 'اسپایک کامپیوتری خودکار', slot: 'field_upgrade',
    requires: { level: 28 }, requireFa: 'سطح ۲۸',
    descriptionFa:
      'نقاط را آرام تصاحب و دستگاه‌های دشمن را موقت هک می‌کند. در Domination، Hardpoint، Control و Ground War اثر دارد.',
  },
  {
    id: 'fu-portable-radar', name: 'Portable Radar', nameFa: 'رادار قابل‌حمل', slot: 'field_upgrade',
    requires: { level: 41 }, requireFa: 'سطح ۴۱',
    descriptionFa: 'پینگ دوره‌ای برای کشف دشمنان نزدیک.',
  },
  {
    id: 'fu-tactical-insertion', name: 'Tactical Insertion', nameFa: 'لنگرگاه تاکتیکی', slot: 'field_upgrade',
    requires: { level: 45 }, requireFa: 'سطح ۴۵',
    descriptionFa: 'محل اسپاون بعدی شما را علامت می‌زند؛ در مودهای تک‌جانی اثری ندارد.',
  },
  {
    id: 'fu-smoke-airdrop', name: 'Smoke Airdrop', nameFa: 'اینداخت دود', slot: 'field_upgrade',
    requires: { level: 51 }, requireFa: 'سطح ۵۱',
    descriptionFa: 'ناوگانی از پهپادها را به پرواز درمی‌آورد تا در نقطهٔ هدف دیوار دود بسازند.',
  },
  {
    id: 'fu-med-box', name: 'Med Box', nameFa: 'جعبهٔ پزشکی', slot: 'field_upgrade',
    requires: { level: 55 }, requireFa: 'سطح ۵۵',
    descriptionFa: 'جعبهٔ تجهیزات پزشکی که زمان بهبود شما و هم‌تیمی‌ها را کم می‌کند.',
  },
  {
    id: 'fu-trophy', name: 'Trophy System', nameFa: 'سیستم تروفی', slot: 'field_upgrade',
    requires: { armoryChallenges: 3 }, requireFa: '۳ چالش Armory Unlock',
    descriptionFa: 'سپر خودکار که تا سه تجهیز یا پرتابهٔ دشمن را منهدم می‌کند؛ اهداف بزرگ‌تر ممکن است چند شلیک بگیرند.',
  },
  {
    id: 'fu-anti-armor', name: 'Anti-Armor Rounds', nameFa: 'مهمات ضدزره', slot: 'field_upgrade',
    requires: { armoryChallenges: 5 }, requireFa: '۵ چالش Armory Unlock',
    descriptionFa:
      'مهمات با آسیب اضافه به اهداف زرهی: خودرو، تجهیزات، بالیستیک و اهداف پشت پوشش‌های قابل‌نفوذ.',
  },
  {
    id: 'fu-suppression-mine', name: 'Suppression Mine', nameFa: 'مین سرکوب', slot: 'field_upgrade',
    requires: { armoryChallenges: 5 }, requireFa: '۵ چالش Armory Unlock',
    descriptionFa: 'مینی که با فعال شدن موج صوتی پیوسته می‌فرستد، دید دشمن را برهم و حرکتش را کند می‌کند.',
  },
  {
    id: 'fu-recon-drone', name: 'Recon Drone', nameFa: 'پهپاد شناسایی', slot: 'field_upgrade',
    requires: { armoryChallenges: 5 }, requireFa: '۵ چالش Armory Unlock',
    descriptionFa: 'پهپاد کنترل‌دستی با قابلیت علامت‌گذاری خودکار دشمن.',
  },
  {
    id: 'fu-ddos', name: 'DDoS', nameFa: 'دی‌داس', slot: 'field_upgrade',
    requires: { armoryChallenges: 5 }, requireFa: '۵ چالش Armory Unlock',
    descriptionFa: 'دستگاهی که الکترونیک و حسگرهای دشمن را در ناحیهٔ اطراف برای مدت کوتاه از کار می‌اندازد.',
  },
  {
    id: 'fu-tac-camera', name: 'Tactical Camera', nameFa: 'دوربین تاکتیکی', slot: 'field_upgrade',
    requires: { armoryChallenges: 5 }, requireFa: '۵ چالش Armory Unlock',
    descriptionFa:
      'یک بار پرتاب کنید، بار دوم وصل شوید و دشمن را علامت بزنید؛ رهاشده، ناحیه را زیر نظر می‌گیرد و با صدا هشدار می‌دهد.',
  },
  {
    id: 'fu-inflatable-decoy', name: 'Inflatable Decoy', nameFa: 'طعمهٔ بادی', slot: 'field_upgrade',
    requires: { armoryChallenges: 5 }, requireFa: '۵ چالش Armory Unlock',
    descriptionFa: 'مین نزدیکی فریب‌دهنده؛ با فعال شدن، هدف پارچه‌ای تقویت‌شده با شدت باز می‌شود تا حواس دشمن را پرت کند.',
  },
  {
    id: 'fu-dead-silence', name: 'Dead Silence', nameFa: 'سکوت مطلق', slot: 'field_upgrade',
    requires: { armoryChallenges: 8 }, requireFa: '۸ چالش Armory Unlock',
    descriptionFa:
      'صدای پا موقتاً حذف و اثر Ghost اعمال می‌شود؛ کیل با سلاح، میله‌ای یا چاقوی پرتابی مدت آن را تمدید می‌کند.',
  },
  {
    id: 'fu-heartbeat', name: 'Heartbeat Sensor', nameFa: 'حسگر ضربان', slot: 'field_upgrade',
    requires: { armoryChallenges: 8 }, requireFa: '۸ چالش Armory Unlock',
    descriptionFa: 'تبلت با تعداد استفادهٔ محدود که اطلاعات تقریبی از دشمنان نزدیک می‌دهد.',
  },
  {
    id: 'fu-loadout-drop', name: 'Loadout Drop', nameFa: 'اینداخت لودآوت', slot: 'field_upgrade',
    requires: { armoryChallenges: 8 }, requireFa: '۸ چالش Armory Unlock',
    descriptionFa: 'کرایت تیمی با تعداد استفادهٔ محدود — هر بازیکن فقط یک بار.',
  },
]

export const armoryNotes = {
  source: 'Game8 — List of Equipment: Tactical, Lethal, and Field Upgrades (Call of Duty MW3)',
  howItWorksFa:
    'سیستم Armory Unlock از سطح ۲۵ حساب باز می‌شود. بعضی تجهیزات با رسیدن به یک سطح خاص آزاد می‌شوند و بعضی با کامل کردن ۳، ۵ یا ۸ چالش Armory Unlock؛ هر دو مسیر در جدول بالا جدا از هم نگه داشته شده‌اند.',
  dailyNoteFa:
    'چالش‌های روزانه و هفتگیِ خودِ بازی هر بار جابه‌جا می‌شوند، پس این صفحه شمارهٔ XP یا هدف ساختگی برای آن‌ها نمی‌نویسد. آنچه ثابت و قابل‌بازبینی است، همان هزینهٔ آزادسازی تجهیزات و پاداش‌های هفتگی سیزن ۵ است.',
  archiveNoteFa:
    'پاداش‌های هفتگی مربوط به سیزن ۵ (ژوئیه تا سپتامبر ۲۰۲۴) است و به‌عنوان بایگانی نمایش داده می‌شود، نه چالش جاری.',
}

export interface WeeklyReward {
  id: string
  week: number
  date: string
  dateFa: string
  reward: string
  weapon: string
  rewardFa: string
}

const WEEK_DATES_FA = [
  '۲ تا ۸ مرداد',
  '۹ تا ۱۵ مرداد',
  '۱۶ تا ۲۲ مرداد',
  '۲۳ تا ۲۹ مرداد',
  '۳۰ مرداد تا ۵ شهریور',
  '۶ تا ۱۲ شهریور',
  '۱۳ تا ۱۹ شهریور',
  '۲۰ تا ۲۶ شهریور',
]

export const weeklyRewards: WeeklyReward[] = weeklyChallengesS5.map((w, i) => ({
  id: `s5-week-${w.week}`,
  week: w.week,
  date: w.date,
  dateFa: WEEK_DATES_FA[i] ?? '',
  reward: w.reward,
  weapon: w.weapon,
  rewardFa: w.rewardFa,
}))
