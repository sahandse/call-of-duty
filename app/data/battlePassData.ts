import { BattlePassSector } from '../types'

export const battlePassMeta = {
  season: 'SEASON 05',
  seasonFa: 'سیزن ۵ (۲۰۲۴)',
  liveFrom: '2024-07-24',
  reloadedOn: '2024-08-21',
  lastEventEnds: '2024-09-18',
  premiumPriceCp: 1100,
  maxCpReturn: 1400,
  rewardCount: '100+',
  sectorCount: 20,
  blueprintCount: 20,
  commonRewards: [
    'XP Tokenها و بلوپرینت‌های سلاح (تا ۲۰ بلوپرینت در پاس پریمیوم)',
    'کارت ویزیت، آرم، استیکر، دکال بزرگ و Finishing Move',
    'یک Weapon Charm و مقادیر CoD Point در طول مسیر',
    'آیتم‌های Zombies: Aether Tools، Aetherium Crystal، Ray Gun Weapon Case و Ammo Mod به نام Shatter Blast',
  ],
}

export const battlePassSectors: BattlePassSector[] = [
  {
    id: 'bp-blackcell',
    sector: 'blackcell',
    label: 'BLACKCELL SECTOR',
    labelFa: 'بخش اختصاصی BlackCell',
    operator: {
      name: 'Reckoner',
      nameFa: 'اپراتور Reckoner (KorTac)',
      kind: 'operator_skin',
      detailFa: 'نقاب روح‌مانند که گاه حضور شبح‌وار درونش نمایان می‌شود؛ حالت متحرک با الکتریسیته.',
    },
    rewards: [
      { name: '1,100 COD Points', nameFa: '۱٬۱۰۰ CoD Point', kind: 'cod_points' },
      {
        name: 'Long Live the King',
        nameFa: 'بلوپرینت SMG «Long Live the King»',
        kind: 'blueprint',
        detailFa: ' نیزه، شمشیر و چکش دور لوله با Inquisitor Tracers و دود مرموز.',
      },
      {
        name: 'Malleus',
        nameFa: 'بلوپرینت Sledgehammer «Malleus»',
        kind: 'blueprint',
        detailFa: 'گلیف‌ها روی دسته سرازیر می‌شوند؛ افکت Inquisitor Impact.',
      },
      { name: 'Judge, Jury, and Finisher', nameFa: 'Finishing Move «Judge, Jury, and Finisher»', kind: 'finishing_move' },
    ],
    noteFa:
      'با خرید BlackCell وارد این Sector می‌شوید. ۷ بلوپرینت و ۱۱ اسکین اپراتور BlackCell در طول نقشهٔ پاس پراکنده‌اند و ۲۰ Tier Skip همراه بسته است.',
  },
  {
    id: 'bp-instant',
    sector: 'instant',
    label: 'INSTANT SECTOR',
    labelFa: 'بخش آنی (با خرید پاس)',
    operator: {
      name: 'Valeria — Roving Adventure',
      nameFa: 'اسکین «Roving Adventure» برای Valeria (SpecGru)',
      kind: 'operator_skin',
      blackCell: 'Valeria BlackCell — زره متحرک سیاه‌وزرد با چهرهٔ جمجمه‌ای',
      detailFa: 'بارونس کارتل Las Almas با یادگاری‌های خطرناک روی بدن.',
    },
    rewards: [
      {
        name: 'Mami (Rhea Ripley)',
        nameFa: 'اپراتور Mami — Rhea Ripley (KorTac)',
        kind: 'operator_skin',
        blackCell: 'Mami BlackCell — جلیقهٔ چرمی طرح‌دار روی بادی زرد',
        detailFa: 'مدل آرایش گوتیک، جلیقهٔ چرمی میخ‌دار و بوت‌های بلند.',
      },
      {
        name: 'Prismtrap',
        nameFa: 'بلوپرینت FJX Horus «Prismtrap»',
        kind: 'blueprint',
        detailFa: 'بدنهٔ بنفش‌وزر با پرهای فلزی؛ همراه قطعهٔ JAK Scimitar Kit.',
      },
      { name: 'Riptide', nameFa: 'Finishing Move «Riptide»', kind: 'finishing_move' },
      { name: '10% Battle Pass Boost', nameFa: '۱۰٪ بوست XP پاس نبرد', kind: 'boost' },
    ],
  },
  {
    id: 'bp-s1',
    sector: 1,
    label: 'SECTOR 01',
    labelFa: 'بخش ۱',
    operator: {
      name: 'Bantam — Night’s End',
      nameFa: 'اسکین «Night’s End» برای Bantam',
      kind: 'operator_skin',
      blackCell: 'نسخهٔ BlackCell: ماسک خاموش‌شده با جرقه و دود',
      detailFa: 'ماسک فلزی صیقلی با تزئینات مارپیچ روی بازوهای خالکوبی.',
    },
    rewards: [
      {
        name: 'Flamma (TYR Handgun)',
        nameFa: 'بلوپرینت TYR «Flamma»',
        kind: 'blueprint',
        detailFa: 'تم Red Metal — فلز سرخ با نقش‌ونگار آبی، مشکی و نقره‌ای.',
      },
    ],
  },
  {
    id: 'bp-s2',
    sector: 2,
    label: 'SECTOR 02',
    labelFa: 'بخش ۲',
    rewards: [
      {
        name: 'Laquearius (SVA 545)',
        nameFa: 'بلوپرینت SVA 545 «Laquearius»',
        kind: 'blueprint',
        blackCell: 'نسخهٔ BlackCell با Inquisitor Tracers و Death Effect «Divine Enforcement»',
        detailFa: 'تم SPQR — برنج و نوشتهٔ لاتینی؛ Muzzle Break سنگین، لولهٔ دقتی و آپتیک ۲.۵x.',
      },
    ],
  },
  {
    id: 'bp-s3',
    sector: 3,
    label: 'SECTOR 03',
    labelFa: 'بخش ۳',
    rewards: [
      {
        name: 'Carpophorus (Reclaimer 18)',
        nameFa: 'بلوپرینت Reclaimer 18 «Carpophorus»',
        kind: 'blueprint',
        blackCell: 'نسخهٔ BlackCell با Inquisitor Tracers و «Divine Enforcement»',
        detailFa: 'تم Paintball — لکه‌های رنگ؛ برد آسیب و ADS بهتر، مهمات لولهٔ بیشتر، Reload کندتر، بدون قنداق.',
      },
    ],
  },
  {
    id: 'bp-s4',
    sector: 4,
    label: 'SECTOR 04',
    labelFa: 'بخش ۴',
    operator: {
      name: 'Byline — Luchadora',
      nameFa: 'اسکین «Luchadora» برای Byline',
      kind: 'operator_skin',
      blackCell: 'نسخهٔ BlackCell: ماسک شبح‌دار و تجهیزات مشکی-زرد',
      detailFa: 'ماسک با لهیب قرمز روی لباس قرمز-زرد مسابقهٔ قهرمانی.',
    },
    rewards: [
      { name: 'Crixus (DG-58 LSW)', nameFa: 'بلوپرینت DG-58 LSW «Crixus»', kind: 'blueprint', detailFa: 'تم SPQR.' },
    ],
  },
  {
    id: 'bp-s5',
    sector: 5,
    label: 'SECTOR 05',
    labelFa: 'بخش ۵',
    operator: {
      name: 'Enigma — Trophy King',
      nameFa: 'اسکین «Trophy King» برای Enigma',
      kind: 'operator_skin',
      blackCell: 'نسخهٔ BlackCell: کملافل با جرقه و گلوله‌های رنگی روی نوار مهمات',
      detailFa: 'مهمات اضافی روی یونیفرم استتاب گرمسیری.',
    },
    rewards: [],
  },
  {
    id: 'bp-s6',
    sector: 6,
    label: 'SECTOR 06 · HVT',
    labelFa: 'بخش ۶ — سلاح جدید',
    rewards: [
      {
        name: 'Static-HV',
        nameFa: 'سلاح پایهٔ Static-HV (SMG)',
        kind: 'weapon',
        detailFa: 'کالیبر 5.7x28mm، ماگزین پایهٔ ۵۰ تیر، ۱۸ سطح پیشرفت؛ بلوپرینت پاس آن در Sector 17 است.',
      },
    ],
  },
  {
    id: 'bp-s7',
    sector: 7,
    label: 'SECTOR 07 · HVT',
    labelFa: 'بخش ۷ — سلاح جدید',
    rewards: [
      {
        name: 'STG44',
        nameFa: 'سلاح پایهٔ STG44 (Assault Rifle)',
        kind: 'weapon',
        detailFa: 'تمام‌اتوماتیک با کالیبر 7.92x33mm، ۲۱ سطح پیشرفت، الگوی ریکویل امضا‌دار؛ بلوپرینت پاس در Sector 19.',
      },
    ],
  },
  {
    id: 'bp-s8',
    sector: 8,
    label: 'SECTOR 08',
    labelFa: 'بخش ۸',
    rewards: [
      {
        name: 'Attilius (Soulrender)',
        nameFa: 'بلوپرینت Soulrender «Attilius»',
        kind: 'blueprint',
        blackCell: 'نسخهٔ BlackCell با گلیف‌های متحرک و مه پراکنده',
        detailFa: 'تم SPQR — تیغهٔ آیینی با برش‌های سریع.',
      },
    ],
  },
  {
    id: 'bp-s9',
    sector: 9,
    label: 'SECTOR 09',
    labelFa: 'بخش ۹',
    rewards: [
      {
        name: 'Bestiarius (RAM-7)',
        nameFa: 'بلوپرینت RAM-7 «Bestiarius»',
        kind: 'blueprint',
        detailFa: 'تم Paintball.',
      },
    ],
  },
  {
    id: 'bp-s10',
    sector: 10,
    label: 'SECTOR 10',
    labelFa: 'بخش ۱۰',
    operator: {
      name: 'Price — Homecoming',
      nameFa: 'اسکین «Homecoming» برای Price',
      kind: 'operator_skin',
      blackCell: 'نسخهٔ BlackCell: دستکش‌های متحرک با جرقه',
      detailFa: 'کاپیتان Price با یونیفرم نظامی و پرچم Union Jack روی سینه و پشت.',
    },
    rewards: [
      {
        name: 'Provocator (Bolt-Action MR)',
        nameFa: 'بلوپرینت Bolt-Action Marksman «Provocator»',
        kind: 'blueprint',
        detailFa: 'تم Red Metal.',
      },
    ],
  },
  {
    id: 'bp-s11',
    sector: 11,
    label: 'SECTOR 11',
    labelFa: 'بخش ۱۱',
    operator: {
      name: 'Hammer — Knight’s Resolve',
      nameFa: 'اسکین «Knight’s Resolve» برای Hammer',
      kind: 'operator_skin',
      blackCell: 'نسخهٔ BlackCell: دید در شب سوسوزن و طاقهٔ رنگ‌پریده',
      detailFa: 'عینک دید در شب پیشرفته، کت قرمز ضخیم و تاج پر سبک شوالیه‌ها.',
    },
    rewards: [
      { name: 'Thraex (Renetti)', nameFa: 'بلوپرینت Renetti «Thraex»', kind: 'blueprint', detailFa: 'تم Paintball.' },
    ],
  },
  {
    id: 'bp-s12',
    sector: 12,
    label: 'SECTOR 12',
    labelFa: 'بخش ۱۲',
    rewards: [
      {
        name: 'Parmularius (Lockwood 680)',
        nameFa: 'بلوپرینت Lockwood 680 «Parmularius»',
        kind: 'blueprint',
        detailFa: 'تم Red Metal.',
      },
    ],
  },
  {
    id: 'bp-s13',
    sector: 13,
    label: 'SECTOR 13',
    labelFa: 'بخش ۱۳',
    rewards: [
      {
        name: 'Unyielding Forge (Sledgehammer)',
        nameFa: 'بلوپرینت Sledgehammer «Unyielding Forge»',
        kind: 'blueprint',
        detailFa: 'تم SPQR — ضربهٔ نزدیک سنگین.',
      },
    ],
  },
  {
    id: 'bp-s14',
    sector: 14,
    label: 'SECTOR 14',
    labelFa: 'بخش ۱۴',
    rewards: [
      {
        name: 'Benign Hero (WSP Stinger)',
        nameFa: 'بلوپرینت WSP Stinger «Benign Hero»',
        kind: 'blueprint',
        detailFa: 'تم Paintball.',
      },
      {
        name: 'Gladius Graecus (BAS-B)',
        nameFa: 'بلوپرینت BAS-B «Gladius Graecus»',
        kind: 'blueprint',
        blackCell: 'نسخهٔ BlackCell با Inquisitor Tracers و «Divine Enforcement»',
        detailFa: 'Flash Hider برای پینگ کوتاه‌تر روی رادار، جبران‌کنندهٔ ریکویل و ماگزین ۳۰ تیر.',
      },
    ],
  },
  {
    id: 'bp-s15',
    sector: 15,
    label: 'SECTOR 15',
    labelFa: 'بخش ۱۵',
    rewards: [
      {
        name: 'Castus (KATT-AMR)',
        nameFa: 'بلوپرینت KATT-AMR «Castus»',
        kind: 'blueprint',
        blackCell: 'نسخهٔ BlackCell با Inquisitor Tracers و «Divine Enforcement»',
        detailFa: 'آپتیک متغیر 3.7x و 7.0x، ساپرسور، مهمات پرسرعت و ADS بهبودیافته.',
      },
    ],
  },
  {
    id: 'bp-s16',
    sector: 16,
    label: 'SECTOR 16',
    labelFa: 'بخش ۱۶',
    operator: {
      name: 'Ivan',
      nameFa: 'اسکین Ivan (KorTac)',
      kind: 'operator_skin',
      blackCell: 'نسخهٔ BlackCell «Boss’ Favorite»',
      detailFa: 'لباس زمستانی Konni با لوگوی گروه و ابزار نجات.',
    },
    rewards: [
      {
        name: 'Merciful Downfall (Striker)',
        nameFa: 'بلوپرینت Striker «Merciful Downfall»',
        kind: 'blueprint',
        detailFa: 'تم Red Metal.',
      },
    ],
  },
  {
    id: 'bp-s17',
    sector: 17,
    label: 'SECTOR 17',
    labelFa: 'بخش ۱۷',
    rewards: [
      {
        name: 'Sculpted Aptitude (Static-HV)',
        nameFa: 'بلوپرینت Static-HV «Sculpted Aptitude»',
        kind: 'blueprint',
        blackCell: 'نسخهٔ BlackCell: JAK Glassless Optic، لولهٔ ساپرسور یکپارچه، ADS و Sprint-to-Fire سریع‌تر',
        detailFa: 'تم Paintball — بر پایهٔ سلاح جدید سیزن.',
      },
    ],
  },
  {
    id: 'bp-s18',
    sector: 18,
    label: 'SECTOR 18',
    labelFa: 'بخش ۱۸',
    operator: {
      name: 'Jet — Samurai’s Camo',
      nameFa: 'اسکین «Samurai’s Camo» برای Jet',
      kind: 'operator_skin',
      blackCell: 'نسخهٔ BlackCell: زره سامورایی مشکی با نخ‌های زرد و نقاب طلایی',
      detailFa: 'زرهٔ نقره‌ای و مشکی با لهیر نارنجی و نقاب دندان‌نما.',
    },
    rewards: [
      {
        name: 'Luminous Dread (KV Inhibitor)',
        nameFa: 'بلوپرینت KV Inhibitor «Luminous Dread»',
        kind: 'blueprint',
        detailFa: 'تم Red Metal.',
      },
    ],
  },
  {
    id: 'bp-s19',
    sector: 19,
    label: 'SECTOR 19',
    labelFa: 'بخش ۱۹',
    rewards: [
      {
        name: 'Dimachaerus (STG44)',
        nameFa: 'بلوپرینت STG44 «Dimachaerus»',
        kind: 'blueprint',
        blackCell: 'نسخهٔ BlackCell با Inquisitor Tracers و «Divine Enforcement»',
        detailFa: 'تم SPQR — درامگ ۶۰ تیر، لولهٔ بلند و گریپ سنگین برای آتش پایدار.',
      },
    ],
  },
  {
    id: 'bp-s20',
    sector: 20,
    label: 'SECTOR 20',
    labelFa: 'بخش ۲۰',
    rewards: [
      {
        name: 'Grand Assailant (XRK Stalker)',
        nameFa: 'بلوپرینت XRK Stalker «Grand Assailant»',
        kind: 'blueprint',
        detailFa: 'تم Red Metal — پایانهٔ مسیر ۲۰ بخش.',
      },
    ],
  },
  {
    id: 'bp-completion',
    sector: 'completion',
    label: 'COMPLETION SECTOR',
    labelFa: 'بخش تکمیل (۱۰۰٪ نقشه)',
    operator: {
      name: 'Mami — Eradicator',
      nameFa: 'اسکین «Eradicator» برای Mami',
      kind: 'operator_skin',
      blackCell: 'نسخهٔ BlackCell: حروف RR روی پشت جلیقه',
      detailFa: 'میخ، زنجیر و استادی روی جلیقهٔ گوتیک.',
    },
    rewards: [
      { name: '300 COD Points', nameFa: '۳۰۰ CoD Point', kind: 'cod_points' },
      { name: 'Praetor (MCW)', nameFa: 'بلوپرینت MCW «Praetor»', kind: 'blueprint', detailFa: 'تم SPQR.' },
      { name: 'Powerbomb!', nameFa: 'Finishing Move «Powerbomb!»', kind: 'finishing_move' },
      {
        name: 'Valeria — Death’s Medallion',
        nameFa: 'اسکین «Death’s Medallion» برای Valeria',
        kind: 'operator_skin',
        blackCell: 'نسخهٔ BlackCell: گیتار جرقه‌زن و انیمیشن شبح‌وار',
        detailFa: 'قرمز و مشکی با گل رز روی گوش، چشمان سرخ پشت نقاب جمجمه و گلبرگ‌های در حال ریزش.',
      },
    ],
    noteFa: 'با فتح همهٔ Sectorها و رسیدن به ۱۰۰٪ نقشهٔ پاس آزاد می‌شود.',
  },
]
