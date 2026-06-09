import { BattlePassItem } from '../types'

export const currentSeason = 'سیزن ۵: حماسه تاریکی'
export const seasonEnds = '2024-11-06'

export const battlePassItems: BattlePassItem[] = [
  // Tier 1-10
  { tier: 1,  free: true,  rewardFa: 'اسکین اپراتور — Ghost Shadow',      type: 'operator_skin',  icon: '👤', rarity: 'افسانه‌ای' },
  { tier: 2,  free: false, rewardFa: '۵,۰۰۰ XP توکن (یک ساعته)',         type: 'xp_token',       icon: '⭐' },
  { tier: 3,  free: false, rewardFa: 'چارم — Skull Charm',                type: 'charm',          icon: '💀' },
  { tier: 4,  free: false, rewardFa: 'استیکر — شاهین جنگی',               type: 'sticker',        icon: '🦅' },
  { tier: 5,  free: false, rewardFa: 'بلوپرینت — MCW Dark Omen',          type: 'blueprint',      icon: '🔫', rarity: 'افسانه‌ای' },
  { tier: 6,  free: false, rewardFa: '۱۰,۰۰۰ XP توکن (دو ساعته)',        type: 'xp_token',       icon: '⭐' },
  { tier: 7,  free: false, rewardFa: 'آرم — جمجمه بنفش',                  type: 'emblem',         icon: '💜' },
  { tier: 8,  free: false, rewardFa: 'کارت ویزیت — Shadow Ops',           type: 'calling_card',   icon: '🃏', rarity: 'نادر' },
  { tier: 9,  free: false, rewardFa: 'استیکر — آتش و خاکستر',             type: 'sticker',        icon: '🔥' },
  { tier: 10, free: false, rewardFa: 'اسکین کامو — Storm Camo',           type: 'camo',           icon: '🎨', rarity: 'حماسی' },

  // Tier 11-20
  { tier: 11, free: false, rewardFa: '۵,۰۰۰ XP توکن (یک ساعته)',         type: 'xp_token',       icon: '⭐' },
  { tier: 12, free: false, rewardFa: 'بلوپرینت — Rival-9 Ice Storm',      type: 'blueprint',      icon: '🔫', rarity: 'حماسی' },
  { tier: 13, free: false, rewardFa: 'آرم — سرباز طلایی',                  type: 'emblem',         icon: '🏆' },
  { tier: 14, free: false, rewardFa: 'چارم — شمشیر کوچک',                type: 'charm',          icon: '⚔️' },
  { tier: 15, free: false, rewardFa: 'استیکر — برق و بازو',               type: 'sticker',        icon: '💪' },
  { tier: 16, free: false, rewardFa: '۱۰,۰۰۰ XP توکن (دو ساعته)',        type: 'xp_token',       icon: '⭐' },
  { tier: 17, free: false, rewardFa: 'کارت ویزیت انیمیشن — Night Raid',  type: 'calling_card',   icon: '🎬', rarity: 'حماسی' },
  { tier: 18, free: false, rewardFa: 'بلوپرینت — Holger 556 Phantom',    type: 'blueprint',      icon: '🔫', rarity: 'افسانه‌ای' },
  { tier: 19, free: false, rewardFa: 'اسکین خودرو — Tactical Jeep Dark', type: 'vehicle',        icon: '🚙', rarity: 'نادر' },
  { tier: 20, free: true,  rewardFa: '۲۰۰ CoD Points',                    type: 'cod_points',     icon: '💰' },

  // Tier 21-30
  { tier: 21, free: false, rewardFa: 'اسکین اپراتور — Makarov Reborn',   type: 'operator_skin',  icon: '🕵️', rarity: 'حماسی' },
  { tier: 22, free: false, rewardFa: '۵,۰۰۰ XP توکن',                    type: 'xp_token',       icon: '⭐' },
  { tier: 23, free: false, rewardFa: 'استیکر — هیولای صحرا',              type: 'sticker',        icon: '🦂' },
  { tier: 24, free: false, rewardFa: 'چارم — قلب قرمز',                  type: 'charm',          icon: '❤️' },
  { tier: 25, free: false, rewardFa: 'بلوپرینت — SVA 545 Viper',          type: 'blueprint',      icon: '🔫', rarity: 'افسانه‌ای' },
  { tier: 26, free: false, rewardFa: '۱۰,۰۰۰ XP توکن',                   type: 'xp_token',       icon: '⭐' },
  { tier: 27, free: false, rewardFa: 'آرم — ماه خون',                     type: 'emblem',         icon: '🌕' },
  { tier: 28, free: false, rewardFa: 'کارت ویزیت — War Machine',          type: 'calling_card',   icon: '🃏', rarity: 'نادر' },
  { tier: 29, free: false, rewardFa: 'اسکین کامو — Midnight Camo',        type: 'camo',           icon: '🎨', rarity: 'افسانه‌ای' },
  { tier: 30, free: false, rewardFa: 'اسکین خودرو — Armored SUV Midnight',type: 'vehicle',        icon: '🚙', rarity: 'حماسی' },

  // Tier 31-40
  { tier: 31, free: false, rewardFa: '۵,۰۰۰ XP توکن',                    type: 'xp_token',       icon: '⭐' },
  { tier: 32, free: false, rewardFa: 'چارم — انگشتر جمجمه',              type: 'charm',          icon: '💍' },
  { tier: 33, free: false, rewardFa: 'بلوپرینت — KATT AMR Neon',         type: 'blueprint',      icon: '🔫', rarity: 'حماسی' },
  { tier: 34, free: false, rewardFa: 'استیکر — هواپیما انفجاری',          type: 'sticker',        icon: '✈️' },
  { tier: 35, free: false, rewardFa: 'آرم — شیر زرین',                    type: 'emblem',         icon: '🦁' },
  { tier: 36, free: false, rewardFa: '۱۰,۰۰۰ XP توکن',                   type: 'xp_token',       icon: '⭐' },
  { tier: 37, free: false, rewardFa: 'کارت ویزیت انیمیشن — Blood Eagle',  type: 'calling_card',   icon: '🎬', rarity: 'افسانه‌ای' },
  { tier: 38, free: false, rewardFa: 'بلوپرینت — WSP Swarm Inferno',      type: 'blueprint',      icon: '🔫', rarity: 'افسانه‌ای' },
  { tier: 39, free: false, rewardFa: 'اسکین کامو — Inferno Camo',         type: 'camo',           icon: '🎨', rarity: 'حماسی' },
  { tier: 40, free: true,  rewardFa: '۲۰۰ CoD Points',                    type: 'cod_points',     icon: '💰' },

  // Tier 41-50
  { tier: 41, free: false, rewardFa: 'اسکین اپراتور — Price Overlord',    type: 'operator_skin',  icon: '🎖️', rarity: 'افسانه‌ای' },
  { tier: 42, free: false, rewardFa: '۵,۰۰۰ XP توکن',                    type: 'xp_token',       icon: '⭐' },
  { tier: 43, free: false, rewardFa: 'استیکر — عقرب آتشین',               type: 'sticker',        icon: '🦂' },
  { tier: 44, free: false, rewardFa: 'چارم — شمشیر دو دم',               type: 'charm',          icon: '🗡️' },
  { tier: 45, free: false, rewardFa: 'بلوپرینت — BAS-B Shadow Strike',    type: 'blueprint',      icon: '🔫', rarity: 'حماسی' },
  { tier: 46, free: false, rewardFa: '۱۰,۰۰۰ XP توکن',                   type: 'xp_token',       icon: '⭐' },
  { tier: 47, free: false, rewardFa: 'آرم انیمیشن — Dark Ops',            type: 'emblem',         icon: '🌑', rarity: 'افسانه‌ای' },
  { tier: 48, free: false, rewardFa: 'کارت ویزیت — Death Dealer',         type: 'calling_card',   icon: '🃏', rarity: 'حماسی' },
  { tier: 49, free: false, rewardFa: 'اسکین خودرو — Helicopter Stealth', type: 'vehicle',        icon: '🚁', rarity: 'افسانه‌ای' },
  { tier: 50, free: false, rewardFa: 'بلوپرینت ویژه — MTZ Interceptor Wraith', type: 'blueprint', icon: '🔫', rarity: 'فوق‌العاده' },

  // Tier 51-60
  { tier: 51, free: false, rewardFa: '۵,۰۰۰ XP توکن',                    type: 'xp_token',       icon: '⭐' },
  { tier: 52, free: false, rewardFa: 'استیکر — کد امنیتی',                type: 'sticker',        icon: '🔐' },
  { tier: 53, free: false, rewardFa: 'چارم — سنگ آسمانی',                 type: 'charm',          icon: '🌠' },
  { tier: 54, free: false, rewardFa: 'بلوپرینت — Pulemyot Raven',         type: 'blueprint',      icon: '🔫', rarity: 'حماسی' },
  { tier: 55, free: false, rewardFa: 'آرم — راز جنگل',                    type: 'emblem',         icon: '🌲' },
  { tier: 56, free: false, rewardFa: '۱۰,۰۰۰ XP توکن',                   type: 'xp_token',       icon: '⭐' },
  { tier: 57, free: false, rewardFa: 'کارت ویزیت انیمیشن — Orbital Strike', type: 'calling_card',icon: '🎬', rarity: 'افسانه‌ای' },
  { tier: 58, free: false, rewardFa: 'اسکین کامو — Neon Storm',            type: 'camo',           icon: '🎨', rarity: 'افسانه‌ای' },
  { tier: 59, free: false, rewardFa: 'اسکین خودرو — ATV Neon Ghost',      type: 'vehicle',        icon: '🏍️', rarity: 'حماسی' },
  { tier: 60, free: true,  rewardFa: '۲۰۰ CoD Points',                    type: 'cod_points',     icon: '💰' },

  // Tier 61-70
  { tier: 61, free: false, rewardFa: 'اسکین اپراتور — Soap Dark Tide',    type: 'operator_skin',  icon: '🌊', rarity: 'حماسی' },
  { tier: 62, free: false, rewardFa: '۵,۰۰۰ XP توکن',                    type: 'xp_token',       icon: '⭐' },
  { tier: 63, free: false, rewardFa: 'استیکر — تاج خار',                   type: 'sticker',        icon: '👑' },
  { tier: 64, free: false, rewardFa: 'چارم — قطب‌نمای طلایی',             type: 'charm',          icon: '🧭' },
  { tier: 65, free: false, rewardFa: 'بلوپرینت — DM56 Ghostwalker',       type: 'blueprint',      icon: '🔫', rarity: 'افسانه‌ای' },
  { tier: 66, free: false, rewardFa: '۱۰,۰۰۰ XP توکن',                   type: 'xp_token',       icon: '⭐' },
  { tier: 67, free: false, rewardFa: 'آرم — شاهین آهنی',                   type: 'emblem',         icon: '🦅' },
  { tier: 68, free: false, rewardFa: 'کارت ویزیت — Lone Wolf',             type: 'calling_card',   icon: '🐺', rarity: 'نادر' },
  { tier: 69, free: false, rewardFa: 'اسکین کامو — Gold Serpent',          type: 'camo',           icon: '🐍', rarity: 'فوق‌العاده' },
  { tier: 70, free: false, rewardFa: 'بلوپرینت ویژه — Holger 556 Warpath', type: 'blueprint',     icon: '🔫', rarity: 'فوق‌العاده' },

  // Tier 71-80
  { tier: 71, free: false, rewardFa: '۵,۰۰۰ XP توکن',                    type: 'xp_token',       icon: '⭐' },
  { tier: 72, free: false, rewardFa: 'استیکر — ستاره مرگ',                type: 'sticker',        icon: '💫' },
  { tier: 73, free: false, rewardFa: 'چارم — دستبند کارما',               type: 'charm',          icon: '☯️' },
  { tier: 74, free: false, rewardFa: 'بلوپرینت — Lachmann Sub Thunder',   type: 'blueprint',      icon: '🔫', rarity: 'حماسی' },
  { tier: 75, free: false, rewardFa: 'آرم — مرگ‌آور نقره‌ای',              type: 'emblem',         icon: '💀' },
  { tier: 76, free: false, rewardFa: '۱۰,۰۰۰ XP توکن',                   type: 'xp_token',       icon: '⭐' },
  { tier: 77, free: false, rewardFa: 'کارت ویزیت انیمیشن — Dark Horizon', type: 'calling_card',   icon: '🎬', rarity: 'فوق‌العاده' },
  { tier: 78, free: false, rewardFa: 'اسکین خودرو — Warzone Armored',     type: 'vehicle',        icon: '🚗', rarity: 'افسانه‌ای' },
  { tier: 79, free: false, rewardFa: 'اسکین اپراتور — Alex Phantom',      type: 'operator_skin',  icon: '🥷', rarity: 'افسانه‌ای' },
  { tier: 80, free: true,  rewardFa: '۴۰۰ CoD Points',                    type: 'cod_points',     icon: '💰' },

  // Tier 81-90
  { tier: 81, free: false, rewardFa: '۵,۰۰۰ XP توکن',                    type: 'xp_token',       icon: '⭐' },
  { tier: 82, free: false, rewardFa: 'استیکر — اژدهای آتش',               type: 'sticker',        icon: '🐉' },
  { tier: 83, free: false, rewardFa: 'چارم — فانوس آهنین',                type: 'charm',          icon: '🏮' },
  { tier: 84, free: false, rewardFa: 'بلوپرینت — MCPR Oblivion',          type: 'blueprint',      icon: '🔫', rarity: 'افسانه‌ای' },
  { tier: 85, free: false, rewardFa: 'آرم — آتش جاودان',                  type: 'emblem',         icon: '🔥' },
  { tier: 86, free: false, rewardFa: '۱۰,۰۰۰ XP توکن',                   type: 'xp_token',       icon: '⭐' },
  { tier: 87, free: false, rewardFa: 'کارت ویزیت — Blood Contract',       type: 'calling_card',   icon: '🃏', rarity: 'افسانه‌ای' },
  { tier: 88, free: false, rewardFa: 'اسکین کامو — Obsidian Camo',        type: 'camo',           icon: '🎨', rarity: 'فوق‌العاده' },
  { tier: 89, free: false, rewardFa: 'بلوپرینت ویژه — WSP Swarm Eclipse', type: 'blueprint',      icon: '🔫', rarity: 'فوق‌العاده' },
  { tier: 90, free: false, rewardFa: 'اسکین اپراتور — Ghost Reaper',      type: 'operator_skin',  icon: '💀', rarity: 'فوق‌العاده' },

  // Tier 91-100
  { tier: 91, free: false, rewardFa: '۱۰,۰۰۰ XP توکن',                   type: 'xp_token',       icon: '⭐' },
  { tier: 92, free: false, rewardFa: 'استیکر — انفجار هسته‌ای',           type: 'sticker',        icon: '☢️' },
  { tier: 93, free: false, rewardFa: 'چارم — جمجمه الماسی',               type: 'charm',          icon: '💎' },
  { tier: 94, free: false, rewardFa: 'بلوپرینت — TAQ Eradicator Eternity',type: 'blueprint',      icon: '🔫', rarity: 'فوق‌العاده' },
  { tier: 95, free: false, rewardFa: 'آرم انیمیشن — نمادِ اسرار',         type: 'emblem',         icon: '🌀', rarity: 'افسانه‌ای' },
  { tier: 96, free: false, rewardFa: '۲۰,۰۰۰ XP توکن (چهار ساعته)',      type: 'xp_token',       icon: '⭐' },
  { tier: 97, free: false, rewardFa: 'کارت ویزیت انیمیشن — Apocalypse',   type: 'calling_card',   icon: '🎬', rarity: 'فوق‌العاده' },
  { tier: 98, free: false, rewardFa: 'اسکین خودرو — Final Judgment ATV',  type: 'vehicle',        icon: '🏍️', rarity: 'فوق‌العاده' },
  { tier: 99, free: false, rewardFa: 'اسکین کامو — Mastery Ultra',         type: 'camo',           icon: '🎨', rarity: 'فوق‌العاده' },
  { tier: 100,free: true,  rewardFa: 'اسکین اپراتور افسانه‌ای — The Harbinger', type: 'operator_skin', icon: '⚡', rarity: 'فوق‌العاده' },
]
