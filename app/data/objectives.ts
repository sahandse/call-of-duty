import { Objective } from '../types'

export const objectives: Objective[] = [
  // ─────────────────────────────────────────────
  // مأموریت‌های روزانه (Daily)
  // ─────────────────────────────────────────────
  {
    id: 'd01', title: 'کشتار با رایفل حمله',
    description: '۱۰ کشتار با هر رایفل حمله در هر حالت بازی انجام دهید',
    type: 'daily', typeFa: 'روزانه', game: 'both', gameFa: 'هر دو',
    xp: 2500, difficulty: 'آسان', maxProgress: 10, tags: ['رایفل', 'کشتار'],
  },
  {
    id: 'd02', title: 'احیای هم‌تیمی',
    description: 'در وارزون ۵ بار هم‌تیمی خود را از حالت مرگ نجات دهید',
    type: 'daily', typeFa: 'روزانه', game: 'warzone', gameFa: 'وارزون',
    xp: 2000, difficulty: 'آسان', maxProgress: 5, tags: ['احیا', 'تیمی'],
  },
  {
    id: 'd03', title: 'تکمیل قرارداد',
    description: 'در وارزون ۳ قرارداد را با موفقیت تکمیل کنید',
    type: 'daily', typeFa: 'روزانه', game: 'warzone', gameFa: 'وارزون',
    xp: 3000, difficulty: 'متوسط', maxProgress: 3, tags: ['قرارداد', 'وارزون'],
  },
  {
    id: 'd04', title: 'آسیب با اسنایپر',
    description: '۵۰۰ آسیب با هر تفنگ تک‌تیراندaz وارد کنید',
    type: 'daily', typeFa: 'روزانه', game: 'both', gameFa: 'هر دو',
    xp: 3000, difficulty: 'متوسط', maxProgress: 500, tags: ['اسنایپر', 'آسیب'],
  },
  {
    id: 'd05', title: 'کشتار با پیستول',
    description: '۱۰ کشتار با هر پیستول در حالت‌های چندنفره انجام دهید',
    type: 'daily', typeFa: 'روزانه', game: 'both', gameFa: 'هر دو',
    xp: 2000, difficulty: 'آسان', maxProgress: 10, tags: ['پیستول', 'کشتار'],
  },
  {
    id: 'd06', title: 'حرکت پایانی',
    description: 'در هر حالتی ۲ بار Finishing Move انجام دهید',
    type: 'daily', typeFa: 'روزانه', game: 'both', gameFa: 'هر دو',
    xp: 3500, difficulty: 'متوسط', maxProgress: 2, tags: ['finishing move', 'خاص'],
  },
  {
    id: 'd07', title: 'برنده گولاگ',
    description: 'در وارزون ۵ بار از دوئل گولاگ پیروز شوید',
    type: 'daily', typeFa: 'روزانه', game: 'warzone', gameFa: 'وارزون',
    xp: 4000, difficulty: 'سخت', maxProgress: 5, tags: ['گولاگ', 'پیروزی'],
  },
  {
    id: 'd08', title: 'هدف به سر',
    description: 'در بازی ۲۰ بار به سر دشمن شلیک موفق داشته باشید',
    type: 'daily', typeFa: 'روزانه', game: 'both', gameFa: 'هر دو',
    xp: 3500, difficulty: 'متوسط', maxProgress: 20, tags: ['headshot', 'هدف‌گیری'],
  },
  {
    id: 'd09', title: 'آسیب با SMG',
    description: '۱۰۰۰ آسیب با هر مسلسل دست‌کوچک وارد کنید',
    type: 'daily', typeFa: 'روزانه', game: 'both', gameFa: 'هر دو',
    xp: 2500, difficulty: 'آسان', maxProgress: 1000, tags: ['SMG', 'آسیب'],
  },
  {
    id: 'd10', title: 'کشتار سریع',
    description: 'در ۱۰ ثانیه ۳ کشتار متوالی انجام دهید',
    type: 'daily', typeFa: 'روزانه', game: 'both', gameFa: 'هر دو',
    xp: 4500, difficulty: 'سخت', maxProgress: 1, tags: ['کشتار', 'سریع', 'خاص'],
  },
  {
    id: 'd11', title: 'بازی تیمی',
    description: 'در ۳ مسابقه جداگانه با هم‌تیمی خود بازی کنید',
    type: 'daily', typeFa: 'روزانه', game: 'both', gameFa: 'هر دو',
    xp: 2000, difficulty: 'آسان', maxProgress: 3, tags: ['تیمی', 'بازی'],
  },
  {
    id: 'd12', title: 'کشتار با شاتگان',
    description: '۵ کشتار با هر شاتگان در فاصله کوتاه انجام دهید',
    type: 'daily', typeFa: 'روزانه', game: 'both', gameFa: 'هر دو',
    xp: 2500, difficulty: 'آسان', maxProgress: 5, tags: ['شاتگان', 'کشتار'],
  },

  // ─────────────────────────────────────────────
  // مأموریت‌های هفتگی (Weekly)
  // ─────────────────────────────────────────────
  {
    id: 'w01', title: 'کشتار در Battle Royale',
    description: 'در حالت Battle Royale مجموعاً ۵۰ کشتار انجام دهید',
    type: 'weekly', typeFa: 'هفتگی', game: 'warzone', gameFa: 'وارزون',
    xp: 10000, difficulty: 'متوسط', maxProgress: 50, tags: ['battle royale', 'کشتار'],
  },
  {
    id: 'w02', title: 'قرارداد هفتگی',
    description: 'در طول هفته ۱۰ قرارداد در وارزون تکمیل کنید',
    type: 'weekly', typeFa: 'هفتگی', game: 'warzone', gameFa: 'وارزون',
    xp: 8000, difficulty: 'متوسط', maxProgress: 10, tags: ['قرارداد'],
  },
  {
    id: 'w03', title: 'سه برد در وارزون',
    description: 'در حالت‌های مختلف وارزون ۳ بار اول شوید',
    type: 'weekly', typeFa: 'هفتگی', game: 'warzone', gameFa: 'وارزون',
    xp: 15000, difficulty: 'سخت', maxProgress: 3, tags: ['برد', 'اول', 'وارزون'],
  },
  {
    id: 'w04', title: 'کشتار با LMG',
    description: 'با هر مسلسل سنگین ۲۵ کشتار انجام دهید',
    type: 'weekly', typeFa: 'هفتگی', game: 'both', gameFa: 'هر دو',
    xp: 9000, difficulty: 'متوسط', maxProgress: 25, tags: ['LMG', 'کشتار'],
  },
  {
    id: 'w05', title: 'برنده‌های گولاگ',
    description: 'در ۵ مرحله گولاگ مختلف پیروز شوید',
    type: 'weekly', typeFa: 'هفتگی', game: 'warzone', gameFa: 'وارزون',
    xp: 10000, difficulty: 'متوسط', maxProgress: 5, tags: ['گولاگ', 'پیروزی'],
  },
  {
    id: 'w06', title: 'بازی‌های متنوع',
    description: 'در ۱۵ مسابقه مختلف در هر حالتی شرکت کنید',
    type: 'weekly', typeFa: 'هفتگی', game: 'both', gameFa: 'هر دو',
    xp: 5000, difficulty: 'آسان', maxProgress: 15, tags: ['بازی', 'شرکت'],
  },
  {
    id: 'w07', title: 'کشتار با خودرو',
    description: 'با خودرو ۵ دشمن را در وارزون نابود کنید',
    type: 'weekly', typeFa: 'هفتگی', game: 'warzone', gameFa: 'وارزون',
    xp: 8000, difficulty: 'متوسط', maxProgress: 5, tags: ['خودرو', 'کشتار'],
  },
  {
    id: 'w08', title: 'آسیب با شاتگان',
    description: '۱۵۰۰ آسیب با هر شاتگان در طول هفته وارد کنید',
    type: 'weekly', typeFa: 'هفتگی', game: 'both', gameFa: 'هر دو',
    xp: 7000, difficulty: 'متوسط', maxProgress: 1500, tags: ['شاتگان', 'آسیب'],
  },
  {
    id: 'w09', title: 'رسیدن به ۱۰ نفر برتر',
    description: 'در ۵ مسابقه battle royale در ۱۰ نفر برتر باقی بمانید',
    type: 'weekly', typeFa: 'هفتگی', game: 'warzone', gameFa: 'وارزون',
    xp: 9000, difficulty: 'متوسط', maxProgress: 5, tags: ['top 10', 'بقا'],
  },
  {
    id: 'w10', title: 'تأمین مجدد هم‌تیمی',
    description: 'به ۱۰ هم‌تیمی منابع یا مهمات برسانید',
    type: 'weekly', typeFa: 'هفتگی', game: 'warzone', gameFa: 'وارزون',
    xp: 7000, difficulty: 'متوسط', maxProgress: 10, tags: ['تیمی', 'منابع'],
  },
  {
    id: 'w11', title: 'کشتار از راه دور',
    description: 'با مارکسمن رایفل یا اسنایپر ۱۵ کشتار از فاصله دور انجام دهید',
    type: 'weekly', typeFa: 'هفتگی', game: 'both', gameFa: 'هر دو',
    xp: 10000, difficulty: 'سخت', maxProgress: 15, tags: ['اسنایپر', 'مارکسمن', 'از دور'],
  },
  {
    id: 'w12', title: 'بقای ۱۰ دقیقه',
    description: 'در ۳ مسابقه battle royale حداقل ۱۰ دقیقه زنده بمانید',
    type: 'weekly', typeFa: 'هفتگی', game: 'warzone', gameFa: 'وارزون',
    xp: 8000, difficulty: 'متوسط', maxProgress: 3, tags: ['بقا', 'زمان'],
  },

  // ─────────────────────────────────────────────
  // مأموریت‌های فصلی (Seasonal)
  // ─────────────────────────────────────────────
  {
    id: 's01', title: 'قهرمان فصل',
    description: 'در طول فصل ۲۵۰ کشتار کل انجام دهید',
    type: 'seasonal', typeFa: 'فصلی', game: 'both', gameFa: 'هر دو',
    xp: 25000, difficulty: 'متوسط', maxProgress: 250, tags: ['فصلی', 'کشتار'],
  },
  {
    id: 's02', title: 'متخصص قرارداد',
    description: 'در طول فصل ۵۰ قرارداد تکمیل کنید',
    type: 'seasonal', typeFa: 'فصلی', game: 'warzone', gameFa: 'وارزون',
    xp: 20000, difficulty: 'متوسط', maxProgress: 50, tags: ['قرارداد', 'فصلی'],
  },
  {
    id: 's03', title: 'ده برد فصل',
    description: 'در هر حالت وارزون ۱۰ بار اول شوید',
    type: 'seasonal', typeFa: 'فصلی', game: 'warzone', gameFa: 'وارزون',
    xp: 35000, difficulty: 'سخت', maxProgress: 10, tags: ['برد', 'فصلی'],
  },
  {
    id: 's04', title: 'امداد تیمی',
    description: 'در طول فصل ۱۰۰ بار هم‌تیمی را احیا کنید',
    type: 'seasonal', typeFa: 'فصلی', game: 'warzone', gameFa: 'وارزون',
    xp: 25000, difficulty: 'متوسط', maxProgress: 100, tags: ['احیا', 'تیمی'],
  },
  {
    id: 's05', title: 'سرباز تجربه‌دار',
    description: 'در ۵۰ مسابقه مختلف در ۲۵ نفر برتر باقی بمانید',
    type: 'seasonal', typeFa: 'فصلی', game: 'warzone', gameFa: 'وارزون',
    xp: 20000, difficulty: 'متوسط', maxProgress: 50, tags: ['top 25', 'فصلی'],
  },
  {
    id: 's06', title: 'تسلط بر سلاح‌ها',
    description: 'با هر ۶ دسته سلاح اصلی حداقل ۵ کشتار انجام دهید',
    type: 'seasonal', typeFa: 'فصلی', game: 'both', gameFa: 'هر دو',
    xp: 30000, difficulty: 'سخت', maxProgress: 6, tags: ['سلاح', 'متنوع'],
  },
  {
    id: 's07', title: 'خلبان جنگی',
    description: 'در مسابقات وارزون ۵۰۰ آسیب با هلیکوپتر وارد کنید',
    type: 'seasonal', typeFa: 'فصلی', game: 'warzone', gameFa: 'وارزون',
    xp: 25000, difficulty: 'سخت', maxProgress: 500, tags: ['هلیکوپتر', 'خودرو'],
  },
  {
    id: 's08', title: 'ستاره‌های قرارداد',
    description: 'در طول فصل ۱۰۰ ستاره قرارداد کسب کنید',
    type: 'seasonal', typeFa: 'فصلی', game: 'warzone', gameFa: 'وارزون',
    xp: 30000, difficulty: 'متوسط', maxProgress: 100, tags: ['قرارداد', 'ستاره'],
  },
  {
    id: 's09', title: 'رویدادهای ویژه',
    description: 'در ۱۰ رویداد ویژه فصلی شرکت کنید',
    type: 'seasonal', typeFa: 'فصلی', game: 'both', gameFa: 'هر دو',
    xp: 20000, difficulty: 'متوسط', maxProgress: 10, tags: ['رویداد', 'فصلی'],
  },
  {
    id: 's10', title: 'بازی گروهی',
    description: 'در ۲۰ مسابقه با گروه ۳ نفره یا بیشتر بازی کنید',
    type: 'seasonal', typeFa: 'فصلی', game: 'warzone', gameFa: 'وارزون',
    xp: 15000, difficulty: 'آسان', maxProgress: 20, tags: ['تیمی', 'گروهی'],
  },

  // ─────────────────────────────────────────────
  // چالش‌های سلاح (Weapon)
  // ─────────────────────────────────────────────
  {
    id: 'wp01', title: 'تسلط بر M4',
    description: 'با رایفل M4 مجموعاً ۵۰ کشتار در هر حالتی انجام دهید',
    type: 'weapon', typeFa: 'سلاح', game: 'both', gameFa: 'هر دو',
    xp: 10000, difficulty: 'متوسط', maxProgress: 50, tags: ['M4', 'رایفل حمله'], weaponClass: 'رایفل حمله',
  },
  {
    id: 'wp02', title: 'تسلط بر MCW',
    description: 'با رایفل MCW مجموعاً ۵۰ کشتار در هر حالتی انجام دهید',
    type: 'weapon', typeFa: 'سلاح', game: 'both', gameFa: 'هر دو',
    xp: 10000, difficulty: 'متوسط', maxProgress: 50, tags: ['MCW', 'رایفل حمله'], weaponClass: 'رایفل حمله',
  },
  {
    id: 'wp03', title: 'تسلط بر TAQ-56',
    description: 'با رایفل TAQ-56 مجموعاً ۵۰ کشتار انجام دهید',
    type: 'weapon', typeFa: 'سلاح', game: 'both', gameFa: 'هر دو',
    xp: 10000, difficulty: 'متوسط', maxProgress: 50, tags: ['TAQ-56', 'رایفل حمله'], weaponClass: 'رایفل حمله',
  },
  {
    id: 'wp04', title: 'تسلط بر Vaznev-9K',
    description: 'با Vaznev-9K مجموعاً ۵۰ کشتار انجام دهید',
    type: 'weapon', typeFa: 'سلاح', game: 'both', gameFa: 'هر دو',
    xp: 10000, difficulty: 'متوسط', maxProgress: 50, tags: ['Vaznev-9K', 'SMG'], weaponClass: 'SMG',
  },
  {
    id: 'wp05', title: 'تسلط بر Vel 46',
    description: 'با Vel 46 مجموعاً ۵۰ کشتار انجام دهید',
    type: 'weapon', typeFa: 'سلاح', game: 'both', gameFa: 'هر دو',
    xp: 10000, difficulty: 'متوسط', maxProgress: 50, tags: ['Vel 46', 'SMG'], weaponClass: 'SMG',
  },
  {
    id: 'wp06', title: 'تسلط بر MCPR-300',
    description: 'با اسنایپر MCPR-300 مجموعاً ۳۰ کشتار انجام دهید',
    type: 'weapon', typeFa: 'سلاح', game: 'both', gameFa: 'هر دو',
    xp: 10000, difficulty: 'سخت', maxProgress: 30, tags: ['MCPR-300', 'اسنایپر'], weaponClass: 'اسنایپر',
  },
  {
    id: 'wp07', title: 'تسلط بر Signal 50',
    description: 'با اسنایپر Signal 50 مجموعاً ۳۰ کشتار انجام دهید',
    type: 'weapon', typeFa: 'سلاح', game: 'both', gameFa: 'هر دو',
    xp: 10000, difficulty: 'سخت', maxProgress: 30, tags: ['Signal 50', 'اسنایپر'], weaponClass: 'اسنایپر',
  },
  {
    id: 'wp08', title: 'تسلط بر Raal MG',
    description: 'با Raal MG مجموعاً ۵۰ کشتار انجام دهید',
    type: 'weapon', typeFa: 'سلاح', game: 'both', gameFa: 'هر دو',
    xp: 10000, difficulty: 'متوسط', maxProgress: 50, tags: ['Raal MG', 'LMG'], weaponClass: 'LMG',
  },
  {
    id: 'wp09', title: 'تسلط بر HCR 56',
    description: 'با HCR 56 مجموعاً ۵۰ کشتار انجام دهید',
    type: 'weapon', typeFa: 'سلاح', game: 'both', gameFa: 'هر دو',
    xp: 10000, difficulty: 'متوسط', maxProgress: 50, tags: ['HCR 56', 'LMG'], weaponClass: 'LMG',
  },
  {
    id: 'wp10', title: 'تسلط بر Lockwood 680',
    description: 'با Lockwood 680 مجموعاً ۳۰ کشتار انجام دهید',
    type: 'weapon', typeFa: 'سلاح', game: 'both', gameFa: 'هر دو',
    xp: 8000, difficulty: 'آسان', maxProgress: 30, tags: ['Lockwood 680', 'شاتگان'], weaponClass: 'شاتگان',
  },
  {
    id: 'wp11', title: 'تسلط بر X13 Auto',
    description: 'با پیستول X13 Auto مجموعاً ۵۰ کشتار انجام دهید',
    type: 'weapon', typeFa: 'سلاح', game: 'both', gameFa: 'هر دو',
    xp: 8000, difficulty: 'آسان', maxProgress: 50, tags: ['X13 Auto', 'پیستول'], weaponClass: 'پیستول',
  },
  {
    id: 'wp12', title: 'تسلط بر SP-X 80',
    description: 'با مارکسمن رایفل SP-X 80 مجموعاً ۳۰ کشتار انجام دهید',
    type: 'weapon', typeFa: 'سلاح', game: 'both', gameFa: 'هر دو',
    xp: 10000, difficulty: 'سخت', maxProgress: 30, tags: ['SP-X 80', 'مارکسمن'], weaponClass: 'مارکسمن',
  },
  {
    id: 'wp13', title: 'موشک‌انداز',
    description: 'با هر موشک‌انداز ۲۰ کشتار یا تخریب وسیله نقلیه انجام دهید',
    type: 'weapon', typeFa: 'سلاح', game: 'both', gameFa: 'هر دو',
    xp: 8000, difficulty: 'متوسط', maxProgress: 20, tags: ['موشک‌انداز', 'پرتابی'], weaponClass: 'پرتابی',
  },
  {
    id: 'wp14', title: 'استاد نزدیک',
    description: 'با سلاح سرد ۲۰ کشتار از نزدیک انجام دهید',
    type: 'weapon', typeFa: 'سلاح', game: 'both', gameFa: 'هر دو',
    xp: 8000, difficulty: 'سخت', maxProgress: 20, tags: ['سلاح سرد', 'نزدیک'], weaponClass: 'سلاح سرد',
  },
  {
    id: 'wp15', title: 'سلاح جدید فصل',
    description: 'با سلاح جدید فصل ۱۰ کشتار انجام دهید',
    type: 'weapon', typeFa: 'سلاح', game: 'both', gameFa: 'هر دو',
    xp: 12000, difficulty: 'متوسط', maxProgress: 10, tags: ['جدید', 'فصلی', 'سلاح'],
  },

  // ─────────────────────────────────────────────
  // چالش‌های اپراتور (Operator)
  // ─────────────────────────────────────────────
  {
    id: 'op01', title: 'نیکتو در میدان',
    description: 'با اپراتور Nikto در ۱۰ مسابقه مختلف بازی کنید',
    type: 'operator', typeFa: 'اپراتور', game: 'both', gameFa: 'هر دو',
    xp: 8000, difficulty: 'آسان', maxProgress: 10, tags: ['Nikto', 'اپراتور'],
  },
  {
    id: 'op02', title: 'هورانگی پیروز',
    description: 'با اپراتور Horangi در ۵ مسابقه برنده شوید',
    type: 'operator', typeFa: 'اپراتور', game: 'warzone', gameFa: 'وارزون',
    xp: 12000, difficulty: 'سخت', maxProgress: 5, tags: ['Horangi', 'برد'],
  },
  {
    id: 'op03', title: 'کشتارهای اپراتور',
    description: 'با هر اپراتوری که دارید ۵۰ کشتار انجام دهید',
    type: 'operator', typeFa: 'اپراتور', game: 'both', gameFa: 'هر دو',
    xp: 10000, difficulty: 'متوسط', maxProgress: 50, tags: ['اپراتور', 'کشتار'],
  },
  {
    id: 'op04', title: 'اپراتور جدید',
    description: 'با اپراتور جدید فصل در یک مسابقه شرکت کنید',
    type: 'operator', typeFa: 'اپراتور', game: 'both', gameFa: 'هر دو',
    xp: 5000, difficulty: 'آسان', maxProgress: 1, tags: ['جدید', 'فصلی'],
  },
  {
    id: 'op05', title: 'تنوع اپراتور',
    description: 'با ۳ اپراتور مختلف هر کدام ۵ مسابقه بازی کنید',
    type: 'operator', typeFa: 'اپراتور', game: 'both', gameFa: 'هر دو',
    xp: 7000, difficulty: 'آسان', maxProgress: 3, tags: ['اپراتور', 'تنوع'],
  },
  {
    id: 'op06', title: 'کشتارهای ویژه',
    description: 'با اپراتور ویژه فصل ۲۰ کشتار خاص انجام دهید',
    type: 'operator', typeFa: 'اپراتور', game: 'both', gameFa: 'هر دو',
    xp: 15000, difficulty: 'سخت', maxProgress: 20, tags: ['کشتار خاص', 'اپراتور'],
  },
  {
    id: 'op07', title: 'لباس نظامی',
    description: 'با اسکین پیش‌فرض اپراتور در ۱۵ مسابقه بازی کنید',
    type: 'operator', typeFa: 'اپراتور', game: 'both', gameFa: 'هر دو',
    xp: 5000, difficulty: 'آسان', maxProgress: 15, tags: ['پیش‌فرض', 'اپراتور'],
  },
  {
    id: 'op08', title: 'آدریسی فعال',
    description: 'با اپراتور Adrissi در ۸ مسابقه مختلف بازی کنید',
    type: 'operator', typeFa: 'اپراتور', game: 'both', gameFa: 'هر دو',
    xp: 8000, difficulty: 'آسان', maxProgress: 8, tags: ['Adrissi', 'اپراتور'],
  },

  // ─────────────────────────────────────────────
  // پاس نبرد (Battle Pass)
  // ─────────────────────────────────────────────
  {
    id: 'bp01', title: 'ارتقا به سطح ۱۰',
    description: 'پاس نبرد را به سطح ۱۰ ارتقا دهید',
    type: 'battle_pass', typeFa: 'پاس نبرد', game: 'both', gameFa: 'هر دو',
    xp: 5000, difficulty: 'آسان', maxProgress: 10, tags: ['پاس نبرد', 'سطح'],
  },
  {
    id: 'bp02', title: 'ارتقا به سطح ۲۵',
    description: 'پاس نبرد را به سطح ۲۵ ارتقا دهید',
    type: 'battle_pass', typeFa: 'پاس نبرد', game: 'both', gameFa: 'هر دو',
    xp: 8000, difficulty: 'آسان', maxProgress: 25, tags: ['پاس نبرد', 'سطح'],
  },
  {
    id: 'bp03', title: 'ارتقا به سطح ۵۰',
    description: 'پاس نبرد را به سطح ۵۰ ارتقا دهید',
    type: 'battle_pass', typeFa: 'پاس نبرد', game: 'both', gameFa: 'هر دو',
    xp: 10000, difficulty: 'متوسط', maxProgress: 50, tags: ['پاس نبرد', 'سطح'],
  },
  {
    id: 'bp04', title: 'ارتقا به سطح ۷۵',
    description: 'پاس نبرد را به سطح ۷۵ ارتقا دهید',
    type: 'battle_pass', typeFa: 'پاس نبرد', game: 'both', gameFa: 'هر دو',
    xp: 15000, difficulty: 'متوسط', maxProgress: 75, tags: ['پاس نبرد', 'سطح'],
  },
  {
    id: 'bp05', title: 'تکمیل پاس نبرد',
    description: 'پاس نبرد را به سطح ۱۰۰ برسانید و همه جوایز را دریافت کنید',
    type: 'battle_pass', typeFa: 'پاس نبرد', game: 'both', gameFa: 'هر دو',
    xp: 25000, difficulty: 'سخت', maxProgress: 100, tags: ['پاس نبرد', 'تکمیل'],
  },
  {
    id: 'bp06', title: 'توکن‌های تجربه',
    description: 'در طول فصل ۲۵۰ توکن XP مضاعف کسب کنید',
    type: 'battle_pass', typeFa: 'پاس نبرد', game: 'both', gameFa: 'هر دو',
    xp: 5000, difficulty: 'آسان', maxProgress: 250, tags: ['XP', 'توکن'],
  },
  {
    id: 'bp07', title: 'ستاره‌های فصلی',
    description: 'تمام مراحل ستاره فصل را با موفقیت کامل کنید',
    type: 'battle_pass', typeFa: 'پاس نبرد', game: 'both', gameFa: 'هر دو',
    xp: 20000, difficulty: 'سخت', maxProgress: 1, tags: ['ستاره', 'فصلی'],
  },
  {
    id: 'bp08', title: 'باندل ویژه',
    description: 'پاس نبرد را خریداری و باندل ویژه را فعال‌سازی کنید',
    type: 'battle_pass', typeFa: 'پاس نبرد', game: 'both', gameFa: 'هر دو',
    xp: 30000, difficulty: 'سخت', maxProgress: 1, tags: ['باندل', 'ویژه', 'خرید'],
  },

  // ─────────────────────────────────────────────
  // بازی رتبه‌بندی (Ranked)
  // ─────────────────────────────────────────────
  {
    id: 'r01', title: 'شروع رتبه‌بندی',
    description: 'در ۱۰ مسابقه رتبه‌بندی شرکت کنید',
    type: 'ranked', typeFa: 'رتبه‌بندی', game: 'warzone', gameFa: 'وارزون',
    xp: 5000, difficulty: 'آسان', maxProgress: 10, tags: ['ranked', 'رتبه'],
  },
  {
    id: 'r02', title: 'رتبه برنز',
    description: 'در بازی رتبه‌بندی به رتبه برنز دست یابید',
    type: 'ranked', typeFa: 'رتبه‌بندی', game: 'warzone', gameFa: 'وارزون',
    xp: 5000, difficulty: 'آسان', maxProgress: 1, tags: ['برنز', 'رتبه'],
  },
  {
    id: 'r03', title: 'رتبه نقره',
    description: 'در بازی رتبه‌بندی به رتبه نقره دست یابید',
    type: 'ranked', typeFa: 'رتبه‌بندی', game: 'warzone', gameFa: 'وارزون',
    xp: 8000, difficulty: 'متوسط', maxProgress: 1, tags: ['نقره', 'رتبه'],
  },
  {
    id: 'r04', title: 'رتبه طلا',
    description: 'در بازی رتبه‌بندی به رتبه طلا دست یابید',
    type: 'ranked', typeFa: 'رتبه‌بندی', game: 'warzone', gameFa: 'وارزون',
    xp: 12000, difficulty: 'متوسط', maxProgress: 1, tags: ['طلا', 'رتبه'],
  },
  {
    id: 'r05', title: 'رتبه پلاتینیوم',
    description: 'در بازی رتبه‌بندی به رتبه پلاتینیوم دست یابید',
    type: 'ranked', typeFa: 'رتبه‌بندی', game: 'warzone', gameFa: 'وارزون',
    xp: 18000, difficulty: 'سخت', maxProgress: 1, tags: ['پلاتینیوم', 'رتبه'],
  },
  {
    id: 'r06', title: 'رتبه الماس',
    description: 'در بازی رتبه‌بندی به رتبه الماس دست یابید',
    type: 'ranked', typeFa: 'رتبه‌بندی', game: 'warzone', gameFa: 'وارزون',
    xp: 25000, difficulty: 'سخت', maxProgress: 1, tags: ['الماس', 'رتبه'],
  },
  {
    id: 'r07', title: 'کشتار در ranked',
    description: 'در بازی‌های رتبه‌بندی مجموعاً ۵۰ کشتار انجام دهید',
    type: 'ranked', typeFa: 'رتبه‌بندی', game: 'warzone', gameFa: 'وارزون',
    xp: 10000, difficulty: 'متوسط', maxProgress: 50, tags: ['ranked', 'کشتار'],
  },
  {
    id: 'r08', title: 'برد ranked',
    description: 'در بازی‌های رتبه‌بندی ۳ بار اول شوید',
    type: 'ranked', typeFa: 'رتبه‌بندی', game: 'warzone', gameFa: 'وارزون',
    xp: 15000, difficulty: 'سخت', maxProgress: 3, tags: ['ranked', 'برد'],
  },
]

export const typeLabels: Record<string, { fa: string; icon: string }> = {
  daily:       { fa: 'روزانه',      icon: '🌅' },
  weekly:      { fa: 'هفتگی',       icon: '📅' },
  seasonal:    { fa: 'فصلی',        icon: '🏆' },
  weapon:      { fa: 'سلاح',        icon: '🔫' },
  operator:    { fa: 'اپراتور',     icon: '🪖' },
  battle_pass: { fa: 'پاس نبرد',   icon: '🎫' },
  ranked:      { fa: 'رتبه‌بندی',  icon: '🏅' },
}

export const gameLabels: Record<string, { fa: string; color: string }> = {
  warzone: { fa: 'وارزون',  color: 'text-green-400' },
  mw3:     { fa: 'MW3',     color: 'text-blue-400' },
  both:    { fa: 'هر دو',  color: 'text-gray-400' },
}
