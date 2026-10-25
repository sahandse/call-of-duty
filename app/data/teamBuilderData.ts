import { comboBuilds, loadoutOptions, type ComboBuild, type LoadoutOption } from './perksData'
import { metaWeapons } from './metaWeapons'
import type { MetaWeapon } from '../types'

/**
 * نقش‌های تیم روی داده‌های تأییدشدهٔ خودِ پروژه ساخته می‌شوند:
 * هر نقش یک ComboBuild از perksData و چند سلاح از جدول متای سیزن ۵ است.
 */
export type SquadSlotId = 'overwatch' | 'fragger' | 'anchor' | 'intel'

export interface SquadRole {
  id: SquadSlotId
  code: string
  nameFa: string
  roleFa: string
  briefFa: string
  comboId: string
  weaponIds: string[]
  focusOrderFa: string[]
  tipsFa: string[]
}

export const squadRoles: SquadRole[] = [
  {
    id: 'overwatch',
    code: 'OW',
    nameFa: 'تیرانداز پشتیبانی',
    roleFa: 'قفل کردن خط دید بلند',
    briefFa:
      'بازیکنی که یک نقطهٔ مرتفع می‌گیرد و حرکت تیم‌های مقابل را در مسیرهای باز متوقف می‌کند. در سیزن ۵، اسالت‌های بلندبرد مثل STG44 این نقش را از تک‌تیراندازهای کلاس C بهتر انجام می‌دادند.',
    comboId: 'combo-sniper',
    weaponIds: ['stg44', 'fr-556', 'xrk-stalker', 'mtz-interceptor'],
    focusOrderFa: ['پیش از هر تیر، مسیر فرار خودتان را تعیین کنید', 'موضع را بعد از دو شلیک عوض کنید', 'فاصلهٔ زیر ۱۵ متر را به هم‌تیمی بسپارید'],
    tipsFa: [
      'نشانه‌گیرهای سیزن ۵ در متای این فصل رده‌های پایین دارند؛ پیش‌فرض روی AR بلندبرد بروید و تک‌تیرانداز را فقط برای نقشه‌های باز بردارید.',
      'Marksman Gloves لرزش و flinch را کم می‌کند — همان چیزی که این نقش به آن نیاز دارد.',
      'Covert Sneakers و Ghost T/V در این ترکیب، شما را از UAV و thermal پنهان می‌کنند.',
    ],
  },
  {
    id: 'fragger',
    code: 'FR',
    nameFa: 'نیروی ورودی',
    roleFa: 'شکستن خط و پاک‌سازی اتاق',
    briefFa:
      'کسی که نخستین درگیری را ایجاد می‌کند: ورود به ساختمان، پاک‌سازی گوشه‌ها و باز کردن فضا برای بقیهٔ تیم. سرعت و بازده نزدیک‌برد مهم‌تر از دقت بلندبرد است.',
    comboId: 'combo-rush',
    weaponIds: ['static-hv', 'rival-9', 'lachmann-shroud', 'bas-b'],
    focusOrderFa: ['با Flash یا Decoy وارد شوید، نه با بدن', 'پشت در را به هم‌تیمی بسپارید', 'بعد از کیل، جا را عوض کنید'],
    tipsFa: [
      'Running Sneakers با Infantry Vest هم‌افزایی دارد؛ این ترکیب در داده‌های تأییدشدهٔ همین پروژه به‌عنوان build راش ثبت شده است.',
      'Mag Holster سرعت Reload را زیاد می‌کند — در فاصلهٔ نزدیک، مهم‌ترین آمار شماست.',
      'Static-HV پس از نرَف سیزن ۵ ریلُود چند متر از برد مفیدش را از دست داد؛ هنوز نزدیک‌بردِ درجه یک است.',
    ],
  },
  {
    id: 'anchor',
    code: 'AN',
    nameFa: 'لنگر',
    roleFa: 'نگه داشتن نقطه و دفع حمله',
    briefFa:
      'بازیکنی که نقطهٔ تصاحب یا مسیر عقبی تیم را نگه می‌دارد. LMG با مگ بزرگ، انتخاب طبیعی این نقش است چون هدف، «بستن یک در» است نه حرکت.',
    comboId: 'combo-support',
    weaponIds: ['pulemyot-762', 'taq-eradicator', 'raal-mg', 'holger-556'],
    focusOrderFa: ['یک زاویهٔ ثابت بگیرید، نه کل منطقه را بگردید', 'مهمات تیم را از Munitions Box تأمین کنید', 'برای پرتابه‌های ورودی Trophy را نگه دارید'],
    tipsFa: [
      'Engineer Vest تجهیزات دشمن را از پشت دیوار نشان می‌دهد و در سیزن ۵ اسلات Lethal را هم پس گرفت.',
      'با دو اسلات Gear در این جلیقه، Signal Jammer و Threat Identification را هم‌زمان ببرید.',
      'Trophy System تا سه پرتابه یا تجهیز دشمن را منهدم می‌کند — پاسخ مستقیم به Killstreak است.',
    ],
  },
  {
    id: 'intel',
    code: 'IN',
    nameFa: 'تدارکات و اطلاعات',
    roleFa: 'دید تیم و ادامه دادن زنجیره',
    briefFa:
      'نقشی که در یادداشت‌های رسمی سیزن ۵ هم تغییر کرد: چون Killstreak دیگر برای کیل‌ستریک بعدی امتیاز نمی‌دهد، این بازیکن روی Scorestreak و اطلاعات حرکت می‌کند.',
    comboId: 'combo-killstreak',
    weaponIds: ['mcw', 'sva-545', 'amr9', 'soa-subverter'],
    focusOrderFa: ['Recon Drone را قبل از حرکت تیم بفرستید', 'Portable Radar را در مسیر ورودی بگذارید', 'Loadout Drop را فقط پشت پوشش اینداخت کنید'],
    tipsFa: [
      'Mission Control Commlink هزینهٔ Killstreak را یک کیل و Scorestreak را ۱۲۵ امتیاز کم می‌کند.',
      'Gunner Vest دو اسلات سلاح اصلی دارد اما اسلات چکمه ندارد؛ تحرک را با Quick-Grip Gloves جبران کنید.',
      'Portable Radar پینگ دوره‌ای می‌دهد و جای Counter-UAV را در تیم می‌گیرد.',
    ],
  },
]

export interface SquadPlan {
  id: string
  nameFa: string
  sizeFa: string
  orderFa: SquadSlotId[]
  whyFa: string
  noteFa: string
}

export const squadPlans: SquadPlan[] = [
  {
    id: 'quad',
    nameFa: 'چهار نفرهٔ متوازن',
    sizeFa: '4 بازیکن',
    orderFa: ['intel', 'anchor', 'overwatch', 'fragger'],
    whyFa:
      'یک نفر اطلاعات و تدارکات، یک نفر نقطه را نگه می‌دارد، یک نفر خط دید بلند را قفل می‌کند و یک نفر وارد می‌شود. هیچ نقشی تکراری نیست و پوشش عمودی و افقی هر دو وجود دارد.',
    noteFa: 'در وارزون این ترتیب با Elite Contracts و Bounty Contest سیزن ۵ هم می‌خواند: یک تیم شکار، سه تیم پشتیبانی.',
  },
  {
    id: 'trio',
    nameFa: 'سه نفرهٔ تهاجمی',
    sizeFa: '3 بازیکن',
    orderFa: ['fragger', 'overwatch', 'anchor'],
    whyFa:
      'نقش اطلاعات حذف می‌شود و هر نفر باید خودش Recon Drone یا Portable Radar را ببرد. سرعت جابه‌جایی بالا می‌رود اما نقطهٔ ثابتی برای دفاع نمی‌ماند.',
    noteFa: 'اگر تیم از قبل نقطه را گرفته، این چیدمان برای فشار ادامه‌دار بهتر است.',
  },
  {
    id: 'duo',
    nameFa: 'دو نفرهٔ کلاسیک',
    sizeFa: '2 بازیکن',
    orderFa: ['fragger', 'overwatch'],
    whyFa:
      'یک ورودی و یک پوشش. ساده‌ترین چیدمانی که در فاصله‌های ترکیبی کار می‌کند؛ به شرطی که تیرانداز پوشش نزدیک داشته باشد.',
    noteFa: 'ترکیب Overkill در سیزن ۵ دوباره اسلات Field Upgrade را گرفت، پس هر نفر می‌تواند هم سلاح دوم و هم ارتقای میدانی داشته باشد.',
  },
]

export interface SquadResolved extends SquadRole {
  combo: ComboBuild
  weapons: MetaWeapon[]
  vestFa: string
  glovesFa: string
  bootsFa: string
  gearFa: string[]
  fieldUpgradeFa: string
}

function optionName(id: string): string {
  return loadoutOptions.find((o: LoadoutOption) => o.id === id)?.name ?? id
}

export function resolveRole(role: SquadRole): SquadResolved {
  const combo = comboBuilds.find(c => c.id === role.comboId)
  if (!combo) throw new Error(`squad role ${role.id}: combo ${role.comboId} not found`)
  const weapons = role.weaponIds
    .map(id => metaWeapons.find(w => w.id === id))
    .filter((w): w is MetaWeapon => Boolean(w))
  return {
    ...role,
    combo,
    weapons,
    vestFa: optionName(combo.vest),
    glovesFa: optionName(combo.gloves),
    bootsFa: optionName(combo.boots),
    gearFa: combo.gear.map(optionName),
    fieldUpgradeFa: optionName(combo.fieldUpgrade),
  }
}

export const resolvedRoles: SquadResolved[] = squadRoles.map(resolveRole)

export const teamBuilderNotes = {
  seasonFa: 'SEASON 05 · MWIII / WARZONE',
  basisFa:
    'نام نقش‌ها و چیدمان‌ها یک چارچوب تحریری است، نه اصطلاح رسمی بازی. اما هر سلاح، جلیقه، تجهیز و ارتقای میدانی که نشان داده می‌شود از جدول متای سیزن ۵ و داده‌های تجهیزاتی تأییدشدهٔ همین پروژه می‌آید.',
  killstreakFa:
    'یادداشت رسمی سیزن ۵: «Streaks Earn Streaks» حذف شد؛ حالا Killstreak برای به‌دست‌آوردن Killstreak بعدی امتیاز نمی‌دهد. نقش «تدارکات و اطلاعات» بر همین اساس بازنویسی شده است.',
  changedFa:
    'سیزن ۵ ریلُود اسلات Gear دوم را به چند جلیقه داد و اسلات Lethal را به Engineer Vest برگرداند؛ این تغییرها در توضیح هر نقش لحاظ شده است.',
  sourceFa: 'یادداشت‌های رسمی سیزن ۵ و سیزن ۵ ریلُود + جدول متای تأییدشدهٔ همین پروژه',
}
