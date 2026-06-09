export interface SettingItem {
  key: string
  nameFa: string
  recommended: string
  reason: string
  platform?: 'all' | 'pc' | 'console'
}

export interface SettingCategory {
  id: string
  nameFa: string
  icon: string
  color: string
  platform?: 'pc' | 'console'
  settings: SettingItem[]
}

export const settingsCategories: SettingCategory[] = [
  {
    id: 'display',
    nameFa: 'نمایش و گرافیک',
    icon: '🖥️',
    color: 'text-blue-400',
    settings: [
      { key: 'display_mode', nameFa: 'حالت نمایش', recommended: 'Fullscreen Exclusive', reason: 'کمترین input lag را دارد', platform: 'pc' },
      { key: 'render_res', nameFa: 'رزولوشن رندر', recommended: '100%', reason: 'وضوح کامل — DLSS را فعال کنید اگر GPU قوی ندارید', platform: 'pc' },
      { key: 'fov', nameFa: 'میدان دید (FOV)', recommended: '100–110', reason: 'دید بیشتر، مزیت تاکتیکی بالاتر', platform: 'pc' },
      { key: 'fov_console', nameFa: 'میدان دید (FOV)', recommended: '100–105', reason: 'حداکثر مجاز در کنسول', platform: 'console' },
      { key: 'brightness', nameFa: 'روشنایی', recommended: '55–60', reason: 'سایه‌های روشن‌تر — دشمنان در تاریکی بهتر دیده می‌شوند' },
      { key: 'texture_quality', nameFa: 'کیفیت تکسچر', recommended: 'Medium یا Low', reason: 'فریم بیشتر از کیفیت تصویر مهم‌تر است', platform: 'pc' },
      { key: 'shadow_quality', nameFa: 'کیفیت سایه', recommended: 'Low', reason: 'سایه کمتر = دشمنان واضح‌تر + فریم بیشتر' },
      { key: 'cache_spot_shadows', nameFa: 'Cache Spot Shadows', recommended: 'خاموش', reason: 'رفع لکه‌های تاریک در برخی نقشه‌ها' },
    ],
  },
  {
    id: 'gameplay',
    nameFa: 'گیم‌پلی',
    icon: '🎮',
    color: 'text-green-400',
    settings: [
      { key: 'minimap_rotation', nameFa: 'چرخش مینیمپ', recommended: 'خاموش', reason: 'مینیمپ ثابت — خواندن نقشه ساده‌تر است' },
      { key: 'minimap_shape', nameFa: 'شکل مینیمپ', recommended: 'مربع', reason: 'اطلاعات بیشتری نمایش می‌دهد' },
      { key: 'dead_silence', nameFa: 'Dead Silence', recommended: 'فعال', reason: 'صدای قدم‌های خودتان را حذف می‌کند' },
      { key: 'ping_wheel', nameFa: 'Ping Wheel', recommended: 'فعال', reason: 'ارتباط سریع با تیم بدون میکروفون' },
      { key: 'auto_move', nameFa: 'Auto Move Forward', recommended: 'خاموش', reason: 'جلوگیری از حرکت ناخواسته' },
      { key: 'weapon_inspect', nameFa: 'Weapon Inspect', recommended: 'یک دکمه', reason: 'مصرف وقت می‌کند؛ ربایند کنید که اشتباه نزنید' },
    ],
  },
  {
    id: 'audio',
    nameFa: 'صدا',
    icon: '🔊',
    color: 'text-yellow-400',
    settings: [
      { key: 'audio_preset', nameFa: 'پریست صدا', recommended: 'Headphone Bass Boost یا Boost High', reason: 'صدای قدم‌های دشمن واضح‌تر می‌شود' },
      { key: 'master_volume', nameFa: 'ولوم کلی', recommended: '70–80', reason: 'جلوگیری از آسیب شنوایی + کنترل بهتر' },
      { key: 'music_volume', nameFa: 'ولوم موسیقی', recommended: '0–10', reason: 'موسیقی در gameplay مانع شنیدن دشمن است' },
      { key: 'voice_chat', nameFa: 'Voice Chat', recommended: 'تیم‌سرویس', reason: 'ارتباط تیمی بهتر — مکالمه با غریبه‌ها را خاموش کنید' },
      { key: 'hit_marker_sound', nameFa: 'صدای Hit Marker', recommended: 'Modern Warfare', reason: 'feedback لمسی بهتر هنگام خوردن تیر' },
    ],
  },
  {
    id: 'mouse_keyboard',
    nameFa: 'ماوس و کیبورد',
    icon: '🖱️',
    color: 'text-purple-400',
    platform: 'pc',
    settings: [
      { key: 'mouse_sensitivity', nameFa: 'حساسیت ماوس', recommended: '3.5–6.0', reason: 'بستگی به DPI ماوس دارد — با eDPI 200-400 تمرین کنید', platform: 'pc' },
      { key: 'ads_sensitivity', nameFa: 'حساسیت ADS', recommended: 'Relative 90%', reason: 'بهترین حالت برای هماهنگی هیپ فایر و ADS', platform: 'pc' },
      { key: 'raw_input', nameFa: 'Raw Input Buffer', recommended: 'فعال', reason: 'جلوگیری از پردازش اضافی ویندوز', platform: 'pc' },
      { key: 'mouse_accel', nameFa: 'Mouse Acceleration', recommended: 'خاموش', reason: 'حرکات قابل پیش‌بینی‌تر و دقیق‌تر', platform: 'pc' },
    ],
  },
  {
    id: 'controller',
    nameFa: 'کنترلر',
    icon: '🕹️',
    color: 'text-orange-400',
    settings: [
      { key: 'controller_vibration', nameFa: 'لرزش کنترلر', recommended: 'خاموش', reason: 'تمرکز بهتر — لرزش می‌تواند هدف‌گیری را مختل کند', platform: 'console' },
      { key: 'aim_assist', nameFa: 'Aim Assist', recommended: 'Black Ops', reason: 'قوی‌ترین نوع aim assist در بازی', platform: 'console' },
      { key: 'aim_assist_type', nameFa: 'نوع Aim Assist', recommended: 'Black Ops', reason: 'چسبندگی بیشتر به هدف', platform: 'console' },
      { key: 'left_stick_max', nameFa: 'حداکثر حساسیت استیک چپ', recommended: '70–75', reason: 'سرعت تبدیل کافی با کنترل بهتر', platform: 'console' },
      { key: 'right_stick_max', nameFa: 'حداکثر حساسیت استیک راست', recommended: '75–80', reason: 'تعادل بین سرعت چرخش و دقت', platform: 'console' },
      { key: 'trigger_effect', nameFa: 'جلوه‌های تریگر DualSense', recommended: 'خاموش', reason: 'مقاومت تریگر کاهش می‌دهد — ضغط سریع‌تر', platform: 'console' },
    ],
  },
  {
    id: 'interface',
    nameFa: 'رابط کاربری',
    icon: '📊',
    color: 'text-cyan-400',
    settings: [
      { key: 'damage_numbers', nameFa: 'اعداد آسیب', recommended: 'فعال', reason: 'feedback فوری از میزان آسیب رساندن' },
      { key: 'reticle', nameFa: 'نوع نشانه‌گیر', recommended: 'Circle Dot یا Dot', reason: 'ساده‌تر — هدف‌گیری دقیق‌تر' },
      { key: 'hud_layout', nameFa: 'چیدمان HUD', recommended: 'سفارشی', reason: 'minimap را بزرگ‌تر کنید — اطلاعات مهم در مرکز' },
      { key: 'killfeed', nameFa: 'Kill Feed', recommended: 'فعال', reason: 'اطلاعات مهم درباره وضعیت تیم و دشمنان' },
      { key: 'colorblind', nameFa: 'رنگ‌بندی مناسب', recommended: 'Deuteranopia', reason: 'حتی بدون مشکل رنگ‌بینی، contrast بهتری دارد' },
    ],
  },
]
