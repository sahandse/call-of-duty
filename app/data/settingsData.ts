import { loadoutOptions, SLOT_ORDER } from './perksData'

export type SettingPlatform = 'all' | 'pc' | 'console'

/**
 * پایهٔ هر توصیه:
 * official  = متن پچ رسمی، چیزی را مستقیم مستند کرده است
 * competitive = توصیهٔ تحریری با انگیزهٔ عملکرد/دقت
 * preference = سلیقه یا ارگونومی — هیچ ادعای درستی ندارد
 * community = باور یا workaround رایج در جامعه، بدون سند رسمی
 */
export type SettingBasis = 'official' | 'competitive' | 'preference' | 'community'

export const BASIS_FA: Record<SettingBasis, string> = {
  official: 'مستند در پچ',
  competitive: 'عملکردی — تحریری',
  preference: 'سلیقه‌ای',
  community: 'گزارش جامعه',
}

export const PLATFORM_FA: Record<SettingPlatform, string> = {
  all: 'همه',
  pc: 'PC',
  console: 'کنسول',
}

export interface SettingItem {
  key: string
  /** همان برچسب گزینه در منوی بازی — برای پیدا کردنش در تنظیمات */
  menu: string
  nameFa: string
  recommended: string
  reasonFa: string
  basis: SettingBasis
  platform: SettingPlatform
}

export interface SettingGroup {
  id: string
  code: string
  nameFa: string
  menuPathFa: string
  noteFa?: string
  items: SettingItem[]
}

export const settingGroups: SettingGroup[] = [
  {
    id: 'graphics',
    code: 'GRAPHICS',
    nameFa: 'گرافیک و نمایش',
    menuPathFa: 'تنظیمات ← Graphics (PC) یا Console ← Graphics',
    noteFa:
      'در کنسول، بخش گرافیک به یک انتخاب بین Quality و Performance خلاصه می‌شود؛ بقیهٔ این گروه مخصوص PC است.',
    items: [
      {
        key: 'display_mode',
        menu: 'Display Mode',
        nameFa: 'حالت نمایش',
        recommended: 'Fullscreen (Exclusive)',
        reasonFa:
          'حالت تمام‌صفحهٔ انحصاری معمولاً صف فریم کوتاه‌تر و نرخ تصویر پایدارتری می‌دهد. اگر مدام بین بازی و پنجرهٔ دیگر جابه‌جا می‌شوید، Borderless را به‌عنوان معاملهٔ راحتی–تأخیر انتخاب کنید.',
        basis: 'competitive',
        platform: 'pc',
      },
      {
        key: 'vsync',
        menu: 'VSync',
        nameFa: 'همگام‌سازی عمودی',
        recommended: 'خاموش',
        reasonFa:
          'روشن بودنش تأخیر ورودی اضافه می‌کند. اگر پارگی تصویر آزارتان می‌دهد، به‌جای VSync را روی سقف فریم یک پله پایین‌تر از نرخ رفرش مانیتور تنظیم کنید.',
        basis: 'competitive',
        platform: 'pc',
      },
      {
        key: 'reflex',
        menu: 'NVIDIA Reflex Low Latency',
        nameFa: 'کاهش تأخیر انویدیا',
        recommended: 'On + Boost (اگر در منو وجود دارد)',
        reasonFa:
          'صف رندر را کوتاه می‌کند و روی سیستم‌های انویدیا مؤثر است. اگر این گزینه در منوی شما نیست، یعنی کارت گرافیکتان سازگار نیست.',
        basis: 'community',
        platform: 'pc',
      },
      {
        key: 'fps_limit',
        menu: 'Target Frame Rate Limit — MP / WZ',
        nameFa: 'سقف فریم',
        recommended: 'یک پله پایین‌تر از سقف مانیتور',
        reasonFa:
          'بازی بدون سقف، GPU را تا حد اشباع می‌کشاند و نوسان Frametime زیاد می‌شود. سقف گذاشتن، رد شدن فریم‌ها را یکنواخت‌تر می‌کند — چیزی که در هدف‌گیری بیشتر از عدد خام محسوس است.',
        basis: 'competitive',
        platform: 'pc',
      },
      {
        key: 'render_res',
        menu: 'Render Resolution / Upscaling',
        nameFa: 'رزولوشن رندر و آپ‌اسکیلر',
        recommended: '۱۰۰٪؛ در ناچاری DLSS روی Quality',
        reasonFa:
          'هر مقدار زیر ۱۰۰٪، تشخیص سیلوئت دشمن در فاصله را مستقیم کم می‌کند. آپ‌اسکیلر را فقط وقتی بردارید که به فریم هدف نمی‌رسید و ترجیح دهید Quality را به‌جای Balanced یا Performance بگذارید.',
        basis: 'competitive',
        platform: 'pc',
      },
      {
        key: 'texture_res',
        menu: 'Texture Resolution',
        nameFa: 'وضوح تکسچر',
        recommended: 'با VRAM کافی: Normal یا High',
        reasonFa:
          'برخلاف باور رایج، تکسچر پایین مستقیم فریم نمی‌دهد اما دشمن را تار می‌کند. اگر حافظهٔ گرافیک کم است، اول Image Sampling و Clutter را کم کنید، بعد تکسچر را.',
        basis: 'competitive',
        platform: 'pc',
      },
      {
        key: 'shadow_res',
        menu: 'Shadow Quality — Global / Spot / Point',
        nameFa: 'کیفیت سایه',
        recommended: 'یک پله پایین‌تر از حداکثر',
        reasonFa:
          'سایه‌ها در این نسخه راهنمای موقعیت دشمن نیستند و بیشترین هزینهٔ فریم را بین گزینه‌های تصویری دارند. کاهش یک پله معمولاً بدون افت وضوح محسوس انجام می‌شود.',
        basis: 'competitive',
        platform: 'pc',
      },
      {
        key: 'cache_spot_shadows',
        menu: 'Cache Spot Shadows',
        nameFa: 'ذخیرهٔ سایه‌های نقطه‌ای',
        recommended: 'خاموش',
        reasonFa:
          'گزارش‌های جامعه می‌گوید روشن بودنش روی برخی نقشه‌ها لکه‌های روشن و تاریک می‌سازد. هیچ پچ رسمی آن را به‌عنوان رفع این مشکل معرفی نکرده، پس این یک workaround است، نه تنظیم بازی.',
        basis: 'community',
        platform: 'pc',
      },
      {
        key: 'console_refresh',
        menu: 'Display / 120Hz Mode',
        nameFa: 'نرخ رفرش روی کنسول',
        recommended: '۱۲۰Hz اگر تلویزیون و کابل پشتیبانی کنند',
        reasonFa:
          'روی نسل جدید کنسول‌ها، نرخ رفرش بالاتر از هر گزینهٔ تصویری دیگر اثر محسوس‌تری دارد. اگر تلویزیون شما ۱۲۰Hz را نمی‌پذیرد، این گزینه را جستجو نکنید.',
        basis: 'competitive',
        platform: 'console',
      },
      {
        key: 'console_mode',
        menu: 'Console Performance Mode',
        nameFa: 'حالت عملکرد در مقابل کیفیت',
        recommended: 'Performance',
        reasonFa:
          'اولویت فریم بر وضوح. در Warzone تشخیص دشمن در فاصله بیشتر به پایداری تصویر وابسته است تا به جزئیات تکسچر.',
        basis: 'competitive',
        platform: 'console',
      },
    ],
  },
  {
    id: 'view',
    code: 'CAMERA',
    nameFa: 'دوربین و دید',
    menuPathFa: 'تنظیمات ← Camera and View',
    items: [
      {
        key: 'fov',
        menu: 'Field of View',
        nameFa: 'میدان دید',
        recommended: '۱۰۰ تا ۱۱۰ روی PC · سقف مجاز روی کنسول',
        reasonFa:
          'میدان دید بازتر، محیط جانبی را نشان می‌دهد ولی سیلوئت دشمن را کوچک‌تر و تشخیصش را در فاصله سخت‌تر می‌کند. اعداد این بازه در جامعهٔ مسابقه‌ای رایج است و خود بازی آن را توصیه نکرده.',
        basis: 'community',
        platform: 'all',
      },
      {
        key: 'ads_fov',
        menu: 'ADS Field of View',
        nameFa: 'میدان دید هنگام نشانه‌گیری',
        recommended: 'گزینه‌ای که بزرگ‌نمایی را کم می‌کند',
        reasonFa:
          'این گزینه دید محیطی را عوض نمی‌کند، فقط بزرگ‌نمایی نشانه‌گیر را تغییر می‌دهد؛ با میدان دید بالا و بزرگ‌نمایی زیاد، این دو با هم می‌جنگند. قبل از عادت کردن، چند شب با آن تمرین کنید.',
        basis: 'community',
        platform: 'all',
      },
      {
        key: 'motion_blur',
        menu: 'Motion Blur — World / Weapon',
        nameFa: 'محو بودن حرکت',
        recommended: 'خاموش',
        reasonFa:
          'هنگام چرخش دوربین، تصویر را نرم می‌کند و وضوح لحظه‌ای را می‌گیرد. هیچ مزیت رقابتی برای روشن بودنش وجود ندارد.',
        basis: 'competitive',
        platform: 'all',
      },
      {
        key: 'camera_bob',
        menu: 'Camera Bobbing',
        nameFa: 'گه‌گه کردن دوربین',
        recommended: 'خاموش',
        reasonFa:
          'حرکت مصنوعی دوربین هنگام دویدن را حذف می‌کند و نگاه را برای نخستین تیر آماده‌تر می‌گذارد.',
        basis: 'competitive',
        platform: 'all',
      },
      {
        key: 'depth_of_field',
        menu: 'Depth of Field',
        nameFa: 'عمق میدان',
        recommended: 'خاموش',
        reasonFa:
          'پس‌زمینه را محو می‌کند؛ در سینماتیک قشنگ است و در نبرد، بخشی از اطلاعات محیط را حذف می‌کند.',
        basis: 'competitive',
        platform: 'all',
      },
      {
        key: 'brightness',
        menu: 'Brightness / Contrast (in-game calibration)',
        nameFa: 'روشنایی و کنتراست',
        recommended: 'کمی بالاتر از وسط — با کالیبراسیون خود بازی',
        reasonFa:
          'پنل نمایشگر و منوی بازی را با هم تنظیم کنید. فقط بالا بردن روشنایی بازی، سیاه را خاکستری می‌کند و کنتراست لازم برای دیدن دشمن در سایه را از بین می‌برد.',
        basis: 'preference',
        platform: 'all',
      },
      {
        key: 'hdr',
        menu: 'HDR',
        nameFa: 'محدودهٔ دینامیکی بالا',
        recommended: 'فقط پس از کالیبراسیون',
        reasonFa:
          'HDR تنظیم‌نشده می‌تواند دشمن را در روشنایی شدید محو کند. اگر نمایشگر شما HDR واقعی ندارد، خاموشش بگذارید.',
        basis: 'community',
        platform: 'all',
      },
    ],
  },
  {
    id: 'hud',
    code: 'HUD',
    nameFa: 'هدآپ دیسپلی و مینی‌مپ',
    menuPathFa: 'تنظیمات ← Interface ← HUD',
    noteFa:
      'چیدمان HUD کاملاً قابل شخصی‌سازی است؛ هدف این گروه، کم کردن عناصری است که اطلاعات نمی‌دهند و نگه داشتن آن‌ها که می‌دهند.',
    items: [
      {
        key: 'minimap_rotation',
        menu: 'Rotate Minimap When Running',
        nameFa: 'چرخش مینی‌مپ هنگام دویدن',
        recommended: 'خاموش',
        reasonFa:
          'مینی‌مپ ثابت، تطبیق جهت خودتان با نقشه را سریع‌تر می‌کند. حالت چرخان برای بازیکنی که نقشه را حفظ کرده طبیعی‌تر است و برای بقیه گیج‌کننده.',
        basis: 'competitive',
        platform: 'all',
      },
      {
        key: 'minimap_shape',
        menu: 'Minimap Shape',
        nameFa: 'شکل مینی‌مپ',
        recommended: 'مربع',
        reasonFa:
          'دایره گوشه‌ها را می‌بُرد و بخشی از اطلاعات حاشیه را از دست می‌دهد؛ مربع همان اندازهٔ کادر را کامل‌تر استفاده می‌کند.',
        basis: 'competitive',
        platform: 'all',
      },
      {
        key: 'hud_layout',
        menu: 'HUD Layout — Custom',
        nameFa: 'چیدمان دستی HUD',
        recommended: 'مینی‌مپ بزرگ، عناصر کم‌ارزش خاموش',
        reasonFa:
          'در حالت شخصی‌سازی، اندازه و دیده شدن هر عنصر را جداگانه تنظیم می‌کنید. سلامت، مهمات و مینی‌مپ را نگه دارید؛ بقیه را در Warzone که بیشتر چیزها از صدا می‌آید کم کنید.',
        basis: 'preference',
        platform: 'all',
      },
      {
        key: 'nameplates',
        menu: 'Show Nameplates',
        nameFa: 'نمایش نام روی سر',
        recommended: 'خاموش',
        reasonFa:
          'برچسب اسم، بخشی از دید را روی هم‌تیمی نزدیک می‌پوشاند. در بازی رقابتی معمولاً خاموش است، اما برای تازه‌واردها در فهمیدن موقعیت تیم مفید است.',
        basis: 'community',
        platform: 'all',
      },
      {
        key: 'killfeed',
        menu: 'Kill Feed',
        nameFa: 'کیلیفید',
        recommended: 'روشن',
        reasonFa:
          'در Warzone یکی از چند منبع اطلاعاتی باقی‌مانده است: چه کسی کشته، با چه سلاحی و در کدام سمت.',
        basis: 'competitive',
        platform: 'all',
      },
      {
        key: 'damage_feedback',
        menu: 'Damage Feedback / Show Damage Values',
        nameFa: 'بازخورد و عدد آسیب',
        recommended: 'روشن برای تنظیم لودآوت · خاموش برای بازی جدی',
        reasonFa:
          'عدد آسیب برای فهمیدن اینکه کدام بخش بدن و در چه فاصله‌ای چند تیر می‌خواهد بی‌نظیر است، اما در میانهٔ درگیری حواس را پرت می‌کند. برای تنظیم لودآوت روشنش کنید و برای بازی جدی خاموش — نه یک انتخاب ابدی.',
        basis: 'preference',
        platform: 'all',
      },
      {
        key: 'reticle',
        menu: 'Reticle Options',
        nameFa: 'نشانه‌گیر',
        recommended: 'نقطهٔ ساده با رنگ متضاد با نقشه',
        reasonFa:
          'نشانه‌گیر شلوغ روی پس‌زمینهٔ پیچیده هدف را گم می‌کند. رنگ را طوری انتخاب کنید که با رنگ غالب نقشه‌هایی که بیشتر بازی می‌کنید یکی نباشد.',
        basis: 'preference',
        platform: 'all',
      },
      {
        key: 'colorblind',
        menu: 'Colorblind Mode',
        nameFa: 'حالت کم‌بینی رنگ',
        recommended: 'فقط اگر کم‌بینی رنگ دارید',
        reasonFa:
          'این گزینه پالت رنگ‌های تیم و دشمن را عوض می‌کند، نه کنتراست کلی تصویر را. باور رایج دربارهٔ «دید بهتر» بدون نیاز، درست نیست.',
        basis: 'community',
        platform: 'all',
      },
      {
        key: 'ping_wheel',
        menu: 'Ping Wheel / Automatic Ping',
        nameFa: 'چرخ پینگ',
        recommended: 'روشن · Automatic Ping حسب نیاز',
        reasonFa:
          'ارتباط تیمی بدون میکروفون. اگر پینگ خودکار برایتان نویز می‌سازد، فقط چرخ دستی را روشن نگه دارید.',
        basis: 'preference',
        platform: 'all',
      },
      {
        key: 'auto_move',
        menu: 'Auto Move Forward',
        nameFa: 'حرکت خودکار به جلو',
        recommended: 'خاموش',
        reasonFa:
          'یک گزینهٔ دسترسیری است؛ اگر به آن عادت نکنید، در لحظهٔ نیاز به توقف ناگهانی مانع می‌شود.',
        basis: 'preference',
        platform: 'all',
      },
      {
        key: 'weapon_inspect',
        menu: 'Weapon Inspect',
        nameFa: 'بازدید سلاح',
        recommended: 'روی دکمه‌ای که اشتباه فشار نمی‌دهید',
        reasonFa:
          'انیمیشن بازدید، در میانهٔ درگیری چند دهم ثانیه وقت و بخشی از دید را می‌گیرد. کلیدش را به دکمه‌ای بسپارید که زیر فشار اشتباه نمی‌زنید.',
        basis: 'preference',
        platform: 'all',
      },
      {
        key: 'jump_scares',
        menu: 'Jump Scares',
        nameFa: 'غافلگیری‌های بصری',
        recommended: 'خاموش اگر اذیت می‌شوید',
        reasonFa:
          'در منوی بازی یک گزینهٔ واقعی است و یادداشت پچ ۲۴ سپتامبر ۲۰۲۴ — بیرون از پنجرهٔ بایگانی سیزن ۵ — شفاف‌بودن برچسبش را اصلاح کرده است.',
        basis: 'official',
        platform: 'all',
      },
    ],
  },
  {
    id: 'audio',
    code: 'AUDIO',
    nameFa: 'صدا',
    menuPathFa: 'تنظیمات ← Audio',
    noteFa:
      'اسم پیش‌تنظیم‌های صدا بین عنوان‌ها و پچ‌ها عوض شده است. هدف این گروه، تقویت صدای پا و کم کردن نویزهای بی‌فایده است، نه رسیدن به یک عدد خاص.',
    items: [
      {
        key: 'audio_mix',
        menu: 'Audio Mix',
        nameFa: 'پریست صدا',
        recommended: 'یکی از پیش‌تنظیم‌های هدفون / Boost High',
        reasonFa:
          'این گروه پیش‌تنظیم‌ها فرکانس‌های صدای پا را جلو می‌آورند و طنین محیط را کم می‌کنند. فهرست دقیق را در منوی خودتان ببینید و دو حالت را یک هفته‌ای A/B کنید؛ عدد یا اسم خاصی در اسناد رسمی نیامده.',
        basis: 'community',
        platform: 'all',
      },
      {
        key: 'effects_volume',
        menu: 'Effects Volume',
        nameFa: 'ولوم افکت‌ها',
        recommended: 'بالا — نزدیک به ۱۰۰',
        reasonFa:
          'صدای پا، شلیک، تعویض خشاب و باز شدن در همه در همین گروه‌اند. کم کردنش مستقیم مقدار اطلاعات شما را کم می‌کند.',
        basis: 'competitive',
        platform: 'all',
      },
      {
        key: 'music_volume',
        menu: 'Music Volume',
        nameFa: 'ولوم موسیقی',
        recommended: '۰',
        reasonFa:
          'موسیقی هیچ اطلاعات تاکتیکی نمی‌دهد و در منوها و رویدادها روی افکت‌ها ماسک می‌کند. بی‌خطرترین تغییر برای تمرکز صوتی.',
        basis: 'competitive',
        platform: 'all',
      },
      {
        key: 'dialogue_volume',
        menu: 'Dialogue Volume',
        nameFa: 'ولوم دیالوگ',
        recommended: 'متوسط تا پایین — صفر مطلق نه',
        reasonFa:
          'خط‌های شخصیت‌ها در نبرد اطلاعات نیست، اما در Warzone چند صداگذاری موقعیتی (خرید، اینداخت، غافلگیری) در همین گروه‌اند و حذف کاملش آن‌ها را هم می‌بَرَد.',
        basis: 'preference',
        platform: 'all',
      },
      {
        key: 'hitmarker_volume',
        menu: 'Hit Marker Volume',
        nameFa: 'صدای بازخورد اصابت',
        recommended: 'متوسط',
        reasonFa:
          'بازخورد اصابت لازم است، ولی بلندی زیادش روی صدای پا ماسک می‌کند. با یک عدد میانه شروع کنید و بعد از چند شب تنظیم کنید.',
        basis: 'preference',
        platform: 'all',
      },
      {
        key: 'voice_chat',
        menu: 'Voice Chat — Input / Chat Audio',
        nameFa: 'چت صوتی',
        recommended: 'خروجی و ورودی روی Team',
        reasonFa:
          'مکالمه با بازیکنان غریبه در Warzone معمولاً اطلاعاتی نمی‌دهد و صدای تیم را می‌پوشاند. اگر تیم‌چت شما با سرویس‌های خارجی انجام می‌شود، چت داخل بازی را کامل ببندید.',
        basis: 'preference',
        platform: 'all',
      },
      {
        key: 'mic',
        menu: 'Microphone / Voice Chat Input Device',
        nameFa: 'ورودی میکروفون',
        recommended: 'دستگاه جدا، نه خروجی هدفون',
        reasonFa:
          'انتخاب دستگاه اشتباه، یا سکوت شما یا انعکاس صدای بازی را می‌سازد؛ در منوی صدا، هم ورودی و هم خروجی را جداگانه تست کنید.',
        basis: 'competitive',
        platform: 'pc',
      },
    ],
  },
  {
    id: 'controller',
    code: 'CONTROLLER',
    nameFa: 'ورودی آنالوگ',
    menuPathFa: 'تنظیمات ← Controller and Input',
    noteFa:
      'این گروه برای هر ورودی آنالوگ صدق می‌کند — از جمله کنترلر روی PC. گزینه‌ها در منوی هر پلتفرم کمی فرق می‌کنند.',
    items: [
      {
        key: 'aim_assist',
        menu: 'Aim Assist',
        nameFa: 'کمک هدف‌گیری',
        recommended: 'روشن',
        reasonFa:
          'خودِ رفتار این گزینه در میانهٔ چرخهٔ عمر MWIII تغییر کرد؛ یادداشت رسمی سیزن ۴، کمک هدف‌گیری هیپ‌فایر را حذف و شدت ADS را کم کرد و کمک Kar98k را به کلاس تیرانداز هم‌تراز کرد. جزئیات در بخش «متن پچ» همین تب است.',
        basis: 'official',
        platform: 'console',
      },
      {
        key: 'aim_curve',
        menu: 'Aim Response Curve Type',
        nameFa: 'نوع منحنی پاسخ',
        recommended: 'یکی را انتخاب و هفته‌ها روی همان بمانید',
        reasonFa:
          'منحنی، رابطهٔ مقدار فشار روی استیک با چرخش را تعیین می‌کند. مهم‌ترین نکته عدد نیست، ثابت بودن انتخاب است: هر بار عوض کردن، حافظهٔ عضلانی را صفر می‌کند.',
        basis: 'preference',
        platform: 'console',
      },
      {
        key: 'deadzone',
        menu: 'Stick Deadzone Min',
        nameFa: 'ددزون استیک',
        recommended: 'کمترین مقداری که استیک دریفّت نمی‌کند',
        reasonFa:
          'ددزون زیاد، میلی‌ثانیه‌های نخست هر چرخش را می‌خورد. اگر استیک شما دریفّت (drift) ندارد، آن را پایین بگیرید و فقط به‌اندازهٔ ضرورت بالا ببرید.',
        basis: 'competitive',
        platform: 'console',
      },
      {
        key: 'input_smoothing',
        menu: 'Input Smoothing',
        nameFa: 'نرم‌کردن ورودی',
        recommended: 'خاموش یا پایین',
        reasonFa:
          'لغزش استیک را نرم می‌کند و در عوض، پاسخ آنی را می‌گیرد. برای بستن یک خط دید بلند شاید قابل تحمل باشد و برای هدف‌گیری سریع نه.',
        basis: 'community',
        platform: 'console',
      },
      {
        key: 'vibration',
        menu: 'Controller Vibration',
        nameFa: 'لرزش کنترلر',
        recommended: 'خاموش',
        reasonFa:
          'لرزش در لحظهٔ شلیک، کنترل ریز استیک را سخت می‌کند و اطلاعات تازه‌ای نمی‌دهد.',
        basis: 'competitive',
        platform: 'console',
      },
      {
        key: 'trigger_effect',
        menu: 'Trigger Effects (adaptive resistance)',
        nameFa: 'مقاومت تطبیقی تریگر',
        recommended: 'خاموش',
        reasonFa:
          'فقط روی دسته‌های سازگار دیده می‌شود. مقاومت مصنوعی، سرعت فشار دوم را کم می‌کند.',
        basis: 'competitive',
        platform: 'console',
      },
      {
        key: 'tactical_sprint',
        menu: 'Analog Tactical Sprint / Automatic Sprint',
        nameFa: 'اسپرینت تاکتیکی',
        recommended: 'Automatic روشن · Analog حسب عادت',
        reasonFa:
          'اسپرینت خودکار، انگشت شست را برای چرخش آزاد می‌گذارد؛ بعضی بازیکنان حالت آنالوگ را برای توقف سریع‌تر ترجیح می‌دهند.',
        basis: 'preference',
        platform: 'console',
      },
      {
        key: 'stick_layout',
        menu: 'Stick Layout / Button Layout',
        nameFa: 'جابه‌جایی استیک و چیدمان دکمه',
        recommended: 'همان که با آن تمرین کرده‌اید',
        reasonFa:
          'استیک چپ و راست را می‌توان جابه‌جا کرد؛ هیچ اثر عملکردی ثابت‌شده‌ای بین دو حالت وجود ندارد. حالتی که سال‌ها با آن بازی کرده‌اید، همان درست است.',
        basis: 'preference',
        platform: 'console',
      },
    ],
  },
  {
    id: 'mouse',
    code: 'MOUSE · KB',
    nameFa: 'ماوس و کیبورد',
    menuPathFa: 'تنظیمات ← Mouse and Keyboard / Key Bindings',
    noteFa:
      'حساسیت بدون دانستن DPI ماوس هیچ معنایی ندارد؛ همهٔ اعداد این گروه باید به eDPI تبدیل شوند.',
    items: [
      {
        key: 'sensitivity',
        menu: 'Sensitivity — Vertical / Horizontal',
        nameFa: 'حساسیت ماوس',
        recommended: 'بازه‌ای که ۱۸۰ درجه با یک کشش راحت انجام شود',
        reasonFa:
          'عدد را با eDPI بسنجید: DPI ضربدر حساسیت داخل بازی. اعداد شایع در جامعهٔ مسابقه‌ای معمولاً eDPI را بین ۲۰۰ و ۴۰۰ نگه می‌دارند، اما این توصیهٔ رسمی بازی نیست.',
        basis: 'community',
        platform: 'pc',
      },
      {
        key: 'ads_sensitivity',
        menu: 'ADS Sensitivity Multiplier',
        nameFa: 'ضریب حساسیت هنگام نشانه‌گیری',
        recommended: 'Relative با مقدار نزدیک به ۱',
        reasonFa:
          'Relative حساسیت را با بزرگ‌نمایی نشانه‌گیر مقیاس می‌دهد؛ Absolute وقتی خوب است که بخواهید چرخش ADS دقیقاً مثل هیپ‌فایر باشد. تغییر این گزینه یک مهارت جدید می‌طلبد.',
        basis: 'community',
        platform: 'pc',
      },
      {
        key: 'mouse_accel',
        menu: 'Mouse Acceleration / Mouse Filter',
        nameFa: 'شتاب و فیلتر ماوس',
        recommended: 'خاموش',
        reasonFa:
          'هر پردازش غیرخطی روی ورودی ماوس، تکرارپذیری حرکت را از بین می‌برد و حافظهٔ عضلانی را بی‌اعتبار می‌کند.',
        basis: 'competitive',
        platform: 'pc',
      },
      {
        key: 'raw_input',
        menu: 'Raw Input Buffer',
        nameFa: 'ورودی خام',
        recommended: 'روشن',
        reasonFa:
          'گزارش جامعه: مسیر ورودی را مستقیم‌تر و پایدارتر می‌کند. این گزینه در منوی PC وجود دارد، اما هیچ پچ رسمی دربارهٔ اثرش نوشته نشده است.',
        basis: 'community',
        platform: 'pc',
      },
      {
        key: 'aim_behavior',
        menu: 'Aim Down Sight Behavior',
        nameFa: 'رفتار نشانه‌گیری (Hold یا Toggle)',
        recommended: 'Toggle یا Hybrid برای تیرانداز · Hold برای راش',
        reasonFa:
          'Hold شست را درگیر نگه می‌دارد و در درگیری نزدیک هزینه دارد؛ Toggle آزاد می‌کند اما زمان پرش به نشانه را کم‌محاسبه می‌کند. پاسخ واحدی وجود ندارد.',
        basis: 'preference',
        platform: 'pc',
      },
      {
        key: 'key_bindings',
        menu: 'Key Bindings — Interact / Melee / Crouch / Slide',
        nameFa: 'کلیدها',
        recommended: 'دکمه‌هایی که در فشار اشتباه نخورند',
        reasonFa:
          'قرار دادن تعامل روی دکمه‌ای که با اسلاید اشتباه می‌شود، در Warzone هزینهٔ مستقیم دارد. هر بار فقط یک کلید را عوض کنید تا اثرش قابل سنجش بماند.',
        basis: 'preference',
        platform: 'pc',
      },
      {
        key: 'windows_settings',
        menu: '— (خارج از بازی: Enhance Pointer Precision)',
        nameFa: 'شتاب ماوس ویندوز',
        recommended: 'خاموش',
        reasonFa:
          'افزونهٔ «Increase Pointer Precision» ویندوز روی ورودی بازی اثر می‌گذارد. قبل از تنظیم حساسیت داخل بازی، آن را خاموش و DPI را ثابت کنید.',
        basis: 'competitive',
        platform: 'pc',
      },
    ],
  },
  {
    id: 'comfort',
    code: 'ACCESSIBILITY',
    nameFa: 'راحتی و دسترسیری',
    menuPathFa: 'تنظیمات ← Accessibility / Interface',
    items: [
      {
        key: 'flash_effects',
        menu: 'Visual Effects (flash-related)',
        nameFa: 'اثرهای بصری فلش',
        recommended: 'نیازی به دست‌کاری ندارد',
        reasonFa:
          'بخش ACCESSIBILITY یادداشت پچ سیزن ۵ صراحتاً نوشته که بعضی اثرهای بصری، از جمله flash muzzles، برای راحتی بازیکن کاهش یافته‌اند. یعنی پیش‌فرض‌های آن پچ را به‌عنوان مشکل فرض نکنید.',
        basis: 'official',
        platform: 'all',
      },
      {
        key: 'telemetry_off',
        menu: 'HUD Layout — حذف عناصر پرت‌کننده',
        nameFa: 'کاهش محرک‌های بصری',
        recommended: 'هر عنصری که در درگیری به آن نگاه نمی‌کنید خاموش',
        reasonFa:
          'کم کردن عناصر HUD مؤثرتر از هر عدد گرافیکی برای تمرکز است؛ این یک اصل تحریری است، نه تنظیم مشخص بازی.',
        basis: 'preference',
        platform: 'all',
      },
      {
        key: 'subtitles',
        menu: 'Subtitles / Captions',
        nameFa: 'زیرنویس',
        recommended: 'روشن اگر دیالوگ یا هشدار صوتی را از دست می‌دهید',
        reasonFa:
          'برخی هشدارهای موقعیتی با صدا گفته می‌شوند؛ زیرنویس راه دوم برای همان اطلاعات است.',
        basis: 'preference',
        platform: 'all',
      },
    ],
  },
]

export interface PatchFact {
  id: string
  windowFa: string
  en: string
  detailFa: string
  affectsFa: string
  inArchiveWindow: boolean
}

/** فقط جملاتی که عیناً در یادداشت‌های پچ منتشرشده پیدا شده‌اند. */
export const settingsPatchFacts: PatchFact[] = [
  {
    id: 's5-accessibility',
    windowFa: 'سیزن ۵ · ۲۰۲۴',
    en: 'Some visual effects, such as flash muzzles, have been reduced to improve player comfort.',
    detailFa:
      'زیر سرفصل ACCESSIBILITY آمده که بعضی اثرهای بصری، از جمله flash muzzles، برای راحتی بازیکن کم شده‌اند.',
    affectsFa: 'گروه «راحتی و دسترسیری» — لازم نیست برای کاهش بار بصری، تنظیم خاصی را دست‌کاری کنید.',
    inArchiveWindow: true,
  },
  {
    id: 's4-controller-aim-assist',
    windowFa: 'سیزن ۴ · پیش از پنجرهٔ بایگانی',
    en: 'Removed hipfire aim assist properties for controller input devices · Decreased strength of ADS aim assist properties · Kar98k aligned with the Sniper Rifle class',
    detailFa:
      'سه تغییر رسمی کنترلر: کمک هدف‌گیری در هیپ‌فایر حذف، شدت کمک در ADS کم، و کمک Kar98k با کلاس تیرانداز هم‌تراز شد.',
    affectsFa:
      'گروه «ورودی آنالوگ» — انتظار کمک هدف‌گیری در شلیک کمری را نداشته باشید و مقایسهٔ اعداد پیش از این پچ را معتبر ندانید.',
    inArchiveWindow: false,
  },
  {
    id: 'sep24-jump-scares',
    windowFa: '۲۴ سپتامبر ۲۰۲۴ · پس از پنجرهٔ بایگانی',
    en: 'Improved clarity of the Jump Scares toggle option label.',
    detailFa: 'برچسب گزینهٔ Jump Scares در منوی تنظیمات شفاف‌تر شد.',
    affectsFa: 'گروه «هدآپ دیسپلی» — وجود این گزینه رسمی است؛ توصیهٔ خاموش کردنش سلیقه‌ای است.',
    inArchiveWindow: false,
  },
]

export interface CrossRef {
  optionId: string
  textFa: string
}

/**
 * چیزهایی که بازیکن در تنظیمات جستجو می‌کند اما در این نسخه،
 * گزینهٔ منو نیستند و از داده‌های تأییدشدهٔ خود پروژه می‌آیند.
 */
export const settingsCrossRefs: CrossRef[] = [
  {
    optionId: 'fu-dead-silence',
    textFa:
      'حذف صدای پا در سیزن ۵ یک کلید در تنظیمات نیست؛ یک ارتقای میدانی است که پس از کیل تمدید می‌شود.',
  },
  {
    optionId: 'boots-covert',
    textFa:
      'اگر بی‌صدایی دائمی می‌خواهید، راه آن در چکمه‌هاست، نه منوی صدا.',
  },
  {
    optionId: 'gear-bone-headset',
    textFa:
      'نویز مبارزه را کم می‌کند تا صدای پا و شلیک را بهتر تشخیص دهید — همان کاری که بسیاری دنبال یک اسلایدر در منوی صدا برایش می‌گردند.',
  },
  {
    optionId: 'gear-tac-mask',
    textFa:
      'مقابله با فلش و استن در این نسخه یک تجهیز است، نه یک گزینهٔ تصویری.',
  },
  {
    optionId: 'gear-threat-iff',
    textFa:
      'علامت‌گذاری خودکار دشمن داخل نشانه‌گیر از جلیقه/تجهیز می‌آید، نه از تنظیمات HUD.',
  },
]

export interface CrossRefResolved extends CrossRef {
  name: string
  nameFa: string
  slotFa: string
  descriptionFa: string
}

export function resolveCrossRef(ref: CrossRef): CrossRefResolved {
  const option = loadoutOptions.find((o) => o.id === ref.optionId)
  if (!option) throw new Error(`settingsCrossRefs: option ${ref.optionId} missing from perksData`)
  const slot = SLOT_ORDER.find((s) => s.id === option.slot)
  if (!slot) throw new Error(`settingsCrossRefs: slot ${option.slot} missing from SLOT_ORDER`)
  return {
    ...ref,
    name: option.name,
    nameFa: option.nameFa,
    slotFa: slot.labelFa,
    descriptionFa: option.descriptionFa,
  }
}

export const resolvedCrossRefs: CrossRefResolved[] = settingsCrossRefs.map(resolveCrossRef)

export const settingsNotes = {
  seasonFa: 'SEASON 05 · MWIII / WARZONE · ARCHIVE',
  basisFa:
    'هیچ راهنمای رسمی برای منوی تنظیمات در آرشیو ما وجود ندارد: انتشارکننده فقط تغییرات پچ را منتشر می‌کند، نه «بهترین تنظیمات». پس هر توصیه در همین تب برچسب پایه دارد — مستند در پچ، عملکردی، سلیقه‌ای یا گزارش جامعه — و فقط برچسب نخست را می‌توان سند دانست.',
  windowFa:
    'نام و موقعیت گزینه‌ها در نسخهٔ امروز بازی فرق کرده است (تنظیمات یکپارچهٔ بعدی، گزینه‌های جدید ورودی و کمک هدف‌گیری). این تب، منوی همان پنجرهٔ زمانی را توصیف می‌کند؛ اگر گزینه‌ای را در بازی خود نمی‌بینید، یعنی جابه‌جا یا حذف شده است.',
  sourceFa:
    'یادداشت‌های پچ سیزن ۴ و سیزن ۵ و به‌روزرسانی ۲۴ سپتامبر ۲۰۲۴ برای بخش‌های مستند · بقیه توصیهٔ تحریری بر پایهٔ رویهٔ رایج بازیکنان مسابقه‌ای',
}
