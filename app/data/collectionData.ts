export type CollectionCategory = 'operator' | 'blueprint' | 'calling_card' | 'emblem' | 'charm' | 'vehicle_skin'
export type CollectionRarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' | 'ultra'

export interface CollectionItem {
  id: string
  nameFa: string
  category: CollectionCategory
  rarity: CollectionRarity
  icon: string
  sourceFa: string
}

export const RARITY_STYLE: Record<CollectionRarity, string> = {
  common:   'text-gray-400   border-gray-600   bg-gray-800/40',
  uncommon: 'text-green-400  border-green-700  bg-green-900/20',
  rare:     'text-blue-400   border-blue-700   bg-blue-900/20',
  epic:     'text-purple-400 border-purple-700 bg-purple-900/20',
  legendary:'text-orange-400 border-orange-700 bg-orange-900/20',
  ultra:    'text-cod-gold   border-cod-gold/50 bg-cod-gold/10',
}

export const RARITY_FA: Record<CollectionRarity, string> = {
  common: 'معمولی', uncommon: 'غیرمعمول', rare: 'نادر',
  epic: 'حماسی', legendary: 'افسانه‌ای', ultra: 'Ultra',
}

export const CATEGORY_FA: Record<CollectionCategory, string> = {
  operator: 'اپراتور', blueprint: 'بلوپرینت', calling_card: 'کارت تماس',
  emblem: 'آرم', charm: 'چارم', vehicle_skin: 'پوسته وسیله نقلیه',
}

export const CATEGORY_ICON: Record<CollectionCategory, string> = {
  operator: '👤', blueprint: '🔫', calling_card: '🃏',
  emblem: '🎖️', charm: '🧸', vehicle_skin: '🚗',
}

export const collectionItems: CollectionItem[] = [
  // Operators
  { id: 'op-ghost',    nameFa: 'گوست',        category: 'operator',     rarity: 'legendary', icon: '👻', sourceFa: 'Battle Pass سیزن ۱' },
  { id: 'op-price',    nameFa: 'کپتن پرایس',  category: 'operator',     rarity: 'legendary', icon: '🎖️', sourceFa: 'باندل پریمیوم' },
  { id: 'op-soap',     nameFa: 'Soap',         category: 'operator',     rarity: 'epic',      icon: '🪖', sourceFa: 'Battle Pass سیزن ۲' },
  { id: 'op-konig',    nameFa: 'کونیگ',        category: 'operator',     rarity: 'epic',      icon: '🕶️', sourceFa: 'رویداد محدود' },
  { id: 'op-horangi',  nameFa: 'هورانگی',      category: 'operator',     rarity: 'rare',      icon: '🐯', sourceFa: 'فروشگاه آیتم' },
  { id: 'op-nikto',    nameFa: 'نیکتو',        category: 'operator',     rarity: 'rare',      icon: '😐', sourceFa: 'Battle Pass سیزن ۳' },
  { id: 'op-farah',    nameFa: 'فرح',          category: 'operator',     rarity: 'uncommon',  icon: '👩', sourceFa: 'Battle Pass رایگان' },
  { id: 'op-default',  nameFa: 'پیش‌فرض',      category: 'operator',     rarity: 'common',    icon: '🪖', sourceFa: 'پیش‌فرض بازی' },
  // Blueprints
  { id: 'bp-neon',     nameFa: 'شعله نئون',    category: 'blueprint',    rarity: 'legendary', icon: '✨', sourceFa: 'باندل Neon Blaze' },
  { id: 'bp-obsidian', nameFa: 'ابسیدیان',     category: 'blueprint',    rarity: 'ultra',     icon: '⚫', sourceFa: 'تکمیل تمام کاموها' },
  { id: 'bp-snake',    nameFa: 'مار طلایی',    category: 'blueprint',    rarity: 'epic',      icon: '🐍', sourceFa: 'رویداد Battle Royale' },
  { id: 'bp-crimson',  nameFa: 'کرمزون',       category: 'blueprint',    rarity: 'rare',      icon: '🩸', sourceFa: 'Battle Pass تیر ۴۵' },
  { id: 'bp-arctic',   nameFa: 'قطبی',         category: 'blueprint',    rarity: 'uncommon',  icon: '❄️', sourceFa: 'فروشگاه آیتم' },
  { id: 'bp-default',  nameFa: 'پایه',         category: 'blueprint',    rarity: 'common',    icon: '🔫', sourceFa: 'پیش‌فرض بازی' },
  // Calling Cards
  { id: 'cc-nuclear',  nameFa: 'هسته‌ای',      category: 'calling_card', rarity: 'ultra',     icon: '☢️', sourceFa: 'دریافت نوک‌لیر در مولتی‌پلیر' },
  { id: 'cc-diamond',  nameFa: 'الماس',        category: 'calling_card', rarity: 'legendary', icon: '💎', sourceFa: 'کامو Diamond روی تمام سلاح‌ها' },
  { id: 'cc-poly',     nameFa: 'پلی‌اتومیک',  category: 'calling_card', rarity: 'legendary', icon: '🌈', sourceFa: 'کامو Polyatomic روی تمام سلاح‌ها' },
  { id: 'cc-season3',  nameFa: 'کارت سیزن ۳', category: 'calling_card', rarity: 'epic',      icon: '🌟', sourceFa: 'رویداد سیزن ۳' },
  { id: 'cc-top500',   nameFa: 'Top 500',      category: 'calling_card', rarity: 'epic',      icon: '🏆', sourceFa: 'Ranked Play Top 500' },
  { id: 'cc-grinder',  nameFa: 'گرایندر',      category: 'calling_card', rarity: 'rare',      icon: '⚙️', sourceFa: 'Battle Pass تیر ۲۰' },
  { id: 'cc-default',  nameFa: 'پیش‌فرض',      category: 'calling_card', rarity: 'common',    icon: '📋', sourceFa: 'پیش‌فرض بازی' },
  // Emblems
  { id: 'em-prestige', nameFa: 'Prestige',     category: 'emblem',       rarity: 'legendary', icon: '⭐', sourceFa: 'رسیدن به Prestige 1' },
  { id: 'em-champion', nameFa: 'قهرمان وارزون',category: 'emblem',       rarity: 'epic',      icon: '🏅', sourceFa: '۵۰ برد در وارزون' },
  { id: 'em-gold',     nameFa: 'رنکد گلد',    category: 'emblem',       rarity: 'rare',      icon: '🥇', sourceFa: 'رسیدن به رنک Gold' },
  { id: 'em-mvp',      nameFa: 'MVP',          category: 'emblem',       rarity: 'uncommon',  icon: '🌟', sourceFa: '۵۰ بار بهترین بازیکن' },
  { id: 'em-starter',  nameFa: 'مبتدی',        category: 'emblem',       rarity: 'common',    icon: '🎮', sourceFa: 'پیش‌فرض بازی' },
  // Charms
  { id: 'ch-duck',     nameFa: 'اردک لاستیکی', category: 'charm',        rarity: 'rare',      icon: '🦆', sourceFa: 'Battle Pass تیر ۷۵' },
  { id: 'ch-skull',    nameFa: 'جمجمه',        category: 'charm',        rarity: 'epic',      icon: '💀', sourceFa: 'رویداد هالووین' },
  { id: 'ch-dogtag',   nameFa: 'Dog Tag',      category: 'charm',        rarity: 'uncommon',  icon: '🏷️', sourceFa: 'فروشگاه آیتم' },
  { id: 'ch-coin',     nameFa: 'سکه خوش‌شانسی',category: 'charm',        rarity: 'common',    icon: '🪙', sourceFa: 'Battle Pass تیر ۱۰' },
  // Vehicle Skins
  { id: 'vs-neon',     nameFa: 'مسابقه نئون',  category: 'vehicle_skin', rarity: 'epic',      icon: '🚗', sourceFa: 'باندل Neon Speed' },
  { id: 'vs-military', nameFa: 'نظامی',        category: 'vehicle_skin', rarity: 'common',    icon: '🚙', sourceFa: 'پیش‌فرض بازی' },
  { id: 'vs-chopper',  nameFa: 'هلی‌کوپتر طلایی',category:'vehicle_skin',rarity: 'legendary', icon: '🚁', sourceFa: 'Battle Pass تیر ۱۰۰' },
]
