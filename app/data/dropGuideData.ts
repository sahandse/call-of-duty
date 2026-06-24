export type DropMap = 'urzikstan' | 'rebirth_island' | 'fortune_keep'
export type DropTraffic = 'low' | 'medium' | 'high'
export type DropStyle = 'aggressive' | 'safe' | 'balanced'

export interface DropZone {
  id: string
  nameFa: string
  map: DropMap
  mapFa: string
  lootRating: 1 | 2 | 3 | 4 | 5
  traffic: DropTraffic
  trafficFa: string
  style: DropStyle
  styleFa: string
  description: string
  tips: string[]
  icon: string
  gradient: string
}

export const dropZones: DropZone[] = [
  {
    id: 'orlov-military',
    nameFa: 'پایگاه نظامی اورلوف',
    map: 'urzikstan', mapFa: 'اورزیکستان',
    lootRating: 5, traffic: 'high', trafficFa: 'پرترافیک',
    style: 'aggressive', styleFa: 'تهاجمی',
    description: 'بهترین لوت اورزیکستان — برای بازیکنان حرفه‌ای که دنبال درگیری هستند.',
    tips: ['از شمال وارد شوید برای دسترسی سریع', 'ساختمان مرکزی بیشترین لوت دارد', 'آماده درگیری با ۳+ تیم باشید', 'وسیله نقلیه بعد از لوت حتماً بگیرید'],
    icon: '🏭', gradient: 'from-red-900/30 to-orange-900/10',
  },
  {
    id: 'zaravan-city',
    nameFa: 'شهر زاراوان',
    map: 'urzikstan', mapFa: 'اورزیکستان',
    lootRating: 4, traffic: 'medium', trafficFa: 'ترافیک متوسط',
    style: 'balanced', styleFa: 'همه‌کاره',
    description: 'شهر بزرگ با لوت خوب و چند مسیر فرار — گزینه ایمن‌تر از پایگاه نظامی.',
    tips: ['طبقات بالایی اول بررسی شود', 'وسیله نقلیه برای فرار سریع پارک کنید', 'مراقب sniper های روی بام باشید'],
    icon: '🏙️', gradient: 'from-blue-900/30 to-indigo-900/10',
  },
  {
    id: 'hadiqa-farms',
    nameFa: 'مزارع هادیقه',
    map: 'urzikstan', mapFa: 'اورزیکستان',
    lootRating: 3, traffic: 'low', trafficFa: 'کم‌ترافیک',
    style: 'safe', styleFa: 'دفاعی',
    description: 'منطقه آرام با لوت کافی — برای بازیکنانی که می‌خواهند آرام شروع کنند.',
    tips: ['انبارها بهترین لوت دارند', 'وسیله نقلیه همیشه موجود است', 'به شهر مرکزی نزدیک است'],
    icon: '🌾', gradient: 'from-green-900/30 to-emerald-900/10',
  },
  {
    id: 'levin-resort',
    nameFa: 'ریزورت لوین',
    map: 'urzikstan', mapFa: 'اورزیکستان',
    lootRating: 4, traffic: 'medium', trafficFa: 'ترافیک متوسط',
    style: 'balanced', styleFa: 'همه‌کاره',
    description: 'هتل و منطقه توریستی — لوت خوب با امکان پنهان‌کاری.',
    tips: ['طبقات بالا برای sniper ایده‌آل است', 'استخر لوت مخفی دارد', 'مراقب روتوری که بالا می‌آید باشید'],
    icon: '🏨', gradient: 'from-purple-900/30 to-violet-900/10',
  },
  {
    id: 'urzik-city',
    nameFa: 'شهر اورزیک',
    map: 'urzikstan', mapFa: 'اورزیکستان',
    lootRating: 5, traffic: 'high', trafficFa: 'پرترافیک',
    style: 'aggressive', styleFa: 'تهاجمی',
    description: 'مرکز شهر با بیشترین POI — هر سیزون یکی از داغ‌ترین نقاط.',
    tips: ['زیرزمین‌ها برای لوت بی‌نظیرند', 'خروجی‌های زیادی دارد', 'اواخر بازی خط میانی دارد'],
    icon: '🌆', gradient: 'from-yellow-900/30 to-amber-900/10',
  },
  {
    id: 'shahin-manor',
    nameFa: 'عمارت شاهین',
    map: 'urzikstan', mapFa: 'اورزیکستان',
    lootRating: 3, traffic: 'low', trafficFa: 'کم‌ترافیک',
    style: 'safe', styleFa: 'دفاعی',
    description: 'عمارت بزرگ با محوطه — آرام اما لوت کافی.',
    tips: ['داخل عمارت اصلی لوت بیشتری است', 'برج‌های اطراف دید خوب می‌دهند', 'مناسب تیم‌های تازه‌کار'],
    icon: '🏰', gradient: 'from-slate-900/30 to-gray-900/10',
  },
  {
    id: 'rebirth-chemical',
    nameFa: 'کارخانه شیمیایی',
    map: 'rebirth_island', mapFa: 'جزیره ری‌برث',
    lootRating: 5, traffic: 'high', trafficFa: 'پرترافیک',
    style: 'aggressive', styleFa: 'تهاجمی',
    description: 'داغ‌ترین نقطه جزیره — بالاترین لوت، بیشترین درگیری.',
    tips: ['همیشه چند تیم اینجا می‌آیند', 'طبقات بالا مزیت دارد', 'SMG برای داخل ساختمان بهتر است'],
    icon: '⚗️', gradient: 'from-green-900/30 to-lime-900/10',
  },
  {
    id: 'rebirth-prison',
    nameFa: 'زندان',
    map: 'rebirth_island', mapFa: 'جزیره ری‌برث',
    lootRating: 4, traffic: 'medium', trafficFa: 'ترافیک متوسط',
    style: 'balanced', styleFa: 'همه‌کاره',
    description: 'بلندترین نقطه جزیره با دید ۳۶۰ درجه.',
    tips: ['پشت‌بام بهترین دید جزیره را دارد', 'راه‌روهای داخلی برای SMG ایده‌آل است', 'بالابر برای فرار سریع'],
    icon: '🏛️', gradient: 'from-gray-900/30 to-zinc-900/10',
  },
  {
    id: 'rebirth-decon',
    nameFa: 'مرکز پاک‌سازی',
    map: 'rebirth_island', mapFa: 'جزیره ری‌برث',
    lootRating: 3, traffic: 'low', trafficFa: 'کم‌ترافیک',
    style: 'safe', styleFa: 'دفاعی',
    description: 'گوشه ساکت جزیره با لوت قابل قبول.',
    tips: ['برای warm-up ابتدای بازی خوب است', 'سریع لوت بگیرید و حرکت کنید', 'مراقب کسانی که از prison فرار می‌کنند باشید'],
    icon: '🔬', gradient: 'from-teal-900/30 to-cyan-900/10',
  },
  {
    id: 'fortune-keep-village',
    nameFa: 'روستا',
    map: 'fortune_keep', mapFa: 'Fortune\'s Keep',
    lootRating: 4, traffic: 'medium', trafficFa: 'ترافیک متوسط',
    style: 'balanced', styleFa: 'همه‌کاره',
    description: 'مرکز نقشه با دسترسی به همه جهات.',
    tips: ['خانه‌های دوطبقه لوت خوبی دارند', 'موضع مرکزی برای کنترل نقشه', 'مراقب تیم‌هایی که از بالا می‌آیند باشید'],
    icon: '🏘️', gradient: 'from-orange-900/30 to-red-900/10',
  },
  {
    id: 'fortune-keep-winery',
    nameFa: 'کارخانه شراب',
    map: 'fortune_keep', mapFa: 'Fortune\'s Keep',
    lootRating: 5, traffic: 'high', trafficFa: 'پرترافیک',
    style: 'aggressive', styleFa: 'تهاجمی',
    description: 'بزرگ‌ترین ساختمان نقشه با بیشترین لوت.',
    tips: ['زیرزمین و طبقه بالا را بررسی کنید', 'اطراف ساختمان باز است — مراقب باشید', 'پس از لوت سریع حرکت کنید'],
    icon: '🍷', gradient: 'from-pink-900/30 to-rose-900/10',
  },
]

export const MAP_LABELS: Record<DropMap, string> = {
  urzikstan: 'اورزیکستان',
  rebirth_island: 'جزیره ری‌برث',
  fortune_keep: 'Fortune\'s Keep',
}
