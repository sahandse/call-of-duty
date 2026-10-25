export type TabId =
  | 'dashboard'
  | 'objectives'
  | 'events'
  | 'meta'
  | 'compare'
  | 'ttk'
  | 'loadout'
  | 'perks'
  | 'camo'
  | 'maps'
  | 'dropguide'
  | 'teambuilder'
  | 'settings'
  | 'shop'
  | 'shophistory'
  | 'battlepass'
  | 'patchnotes'
  | 'collection'

export type NavGroupId = 'ops' | 'arsenal' | 'field' | 'records'

export interface TabDef {
  id: TabId
  label: string
  en: string
  group: NavGroupId
  title: string
  description: string
}

export const TABS: TabDef[] = [
  {
    id: 'dashboard',
    label: 'داشبورد',
    en: 'OVERVIEW',
    group: 'ops',
    title: 'داشبورد پیشرفت',
    description: 'خلاصه پیشرفت شما در کامو، پاس نبرد، کالکشن و رویدادها — همه داده‌ها محلی روی همین مرورگر ذخیره می‌شوند.',
  },
  {
    id: 'objectives',
    label: 'اهداف',
    en: 'OBJECTIVES',
    group: 'ops',
    title: 'اهداف و چالش‌ها',
    description: 'فهرست اهداف روزانه، هفتگی، فصلی، سلاح، اپراتور و رتبه‌بندی MWIII و Warzone با جستجو، فیلتر و ثبت پیشرفت.',
  },
  {
    id: 'events',
    label: 'رویدادها',
    en: 'EVENTS',
    group: 'ops',
    title: 'رویدادهای سیزن ۵',
    description: 'رویدادهای محدود سیزن ۵ و چالش‌های آن‌ها — یک بایگانی تاریخی، نه تقویم زنده.',
  },
  {
    id: 'meta',
    label: 'متا',
    en: 'META',
    group: 'arsenal',
    title: 'تیرلیست متا',
    description: 'رتبه‌بندی سلاح‌های MWIII و Warzone در پایان سیزن ۵، همراه آمار، روند و اتچمنت‌های پیشنهادی.',
  },
  {
    id: 'compare',
    label: 'مقایسه',
    en: 'COMPARE',
    group: 'arsenal',
    title: 'مقایسه سلاح‌ها',
    description: 'دو سلاح را کنار هم بگذارید: آسیب، رنج، نرخ آتش، تحرک و کنترل — به‌همراه امتیاز کلی و اتچمنت‌ها.',
  },
  {
    id: 'ttk',
    label: 'TTK',
    en: 'TTK',
    group: 'arsenal',
    title: 'محاسبه‌گر TTK',
    description: 'زمان کشتن هر سلاح بر اساس HP هدف، ناحیه اصابت و نرخ آتش — برای مقایسه سریع در وارزون و مولتی‌پلیر.',
  },
  {
    id: 'loadout',
    label: 'لودآوت',
    en: 'LOADOUT',
    group: 'arsenal',
    title: 'لودآوت‌ساز',
    description: 'سلاح اصلی و ثانوی، پرک‌ها، تجهیزات و ارتقای میدانی را انتخاب کنید؛ لودآوت را ذخیره و به اشتراک بگذارید.',
  },
  {
    id: 'perks',
    label: 'پرک‌ها',
    en: 'PERKS',
    group: 'arsenal',
    title: 'پرک‌ها و لودآوت متا',
    description: 'پرک‌های MWIII و ترکیب‌های پیشنهادی برای هر سبک بازی، به‌همراه لودآوت‌های آماده.',
  },
  {
    id: 'camo',
    label: 'کامو',
    en: 'CAMO',
    group: 'arsenal',
    title: 'تراکر کامو',
    description: 'چالش‌های کامو MWIII را ردیابی کنید: Gilded، Forged، Priceless و Interstellar — با ثبت پیشرفت هر سلاح.',
  },
  {
    id: 'maps',
    label: 'نقشه‌ها',
    en: 'MAPS',
    group: 'field',
    title: 'نقشه‌ها',
    description: 'نقشه‌های Warzone و MWIII با ابعاد، سبک نبرد و نکات استراتژیک کلیدی.',
  },
  {
    id: 'dropguide',
    label: 'فرود',
    en: 'DROP',
    group: 'field',
    title: 'راهنمای فرود',
    description: 'بهترین نقاط فرود وارزون بر اساس لوت، ترافیک بازیکن و مسیر چرخش پیشنهادی.',
  },
  {
    id: 'teambuilder',
    label: 'تیم‌ساز',
    en: 'SQUAD',
    group: 'field',
    title: 'تیم‌ساز',
    description: 'نقش‌های تیم را بچینید و لودآوت و وظایف هر نقش را ببینید؛ همراه سینرژی‌های پیشنهادی.',
  },
  {
    id: 'settings',
    label: 'تنظیمات',
    en: 'SETTINGS',
    group: 'field',
    title: 'تنظیمات پیشنهادی',
    description: 'تنظیمات گرافیک، صدا، کنترلر، ماوس و HUD برای دقت و خوانایی بیشتر.',
  },
  {
    id: 'shop',
    label: 'شاپ',
    en: 'STORE',
    group: 'records',
    title: 'بایگانی شاپ',
    description: 'باندل‌ها و آیتم‌های شاخص شاپ MWIII — این یک بایگانی است؛ فروشگاه بازی زنده نیست و قیمت‌ها ممکن است تغییر کرده باشند.',
  },
  {
    id: 'shophistory',
    label: 'تاریخچه شاپ',
    en: 'STORE LOG',
    group: 'records',
    title: 'تاریخچه شاپ',
    description: 'مرور باندل‌های منتشرشده در سیزن ۵ و آیتم‌های همراه آن‌ها — بر اساس تاریخ انتشار، نه چرخش روزانه.',
  },
  {
    id: 'battlepass',
    label: 'پاس نبرد',
    en: 'BATTLE PASS',
    group: 'records',
    title: 'بایگانی پاس نبرد',
    description: 'جوایز پاس نبرد سیزن ۵ در ۱۰۰ تیر؛ تیرهای آزاد، پریمیوم و BlackCell را ببینید و پیشرفت خود را ثبت کنید.',
  },
  {
    id: 'patchnotes',
    label: 'پچ‌نوتس',
    en: 'PATCHES',
    group: 'records',
    title: 'یادداشت‌های پچ',
    description: 'تغییرات بالانس و محتوای سیزن ۵ و سیزن ۵ ریلُود — اعداد رسمی آسیب، برد و Rate of Fire از یادداشت‌های منتشرشده.',
  },
  {
    id: 'collection',
    label: 'کالکشن',
    en: 'COLLECTION',
    group: 'records',
    title: 'ردیاب کالکشن',
    description: 'اپراتورها، بلوپرینت‌ها، کارت‌های تماس، نشان‌ها و چارم‌های شاخص را در فهرست شخصی خود علامت بزنید.',
  },
]

export const NAV_GROUPS: { id: NavGroupId; label: string; en: string }[] = [
  { id: 'ops', label: 'عملیات', en: 'OPS' },
  { id: 'arsenal', label: 'زرادخانه', en: 'ARSENAL' },
  { id: 'field', label: 'میدان', en: 'FIELD' },
  { id: 'records', label: 'آرشیو', en: 'RECORDS' },
]

export const TAB_BY_ID = Object.fromEntries(TABS.map((tab, index) => [tab.id, { ...tab, index }])) as Record<
  TabId,
  TabDef & { index: number }
>
