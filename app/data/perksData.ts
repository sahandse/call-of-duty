export type LoadoutSlotId = 'vest' | 'gloves' | 'boots' | 'gear' | 'field_upgrade'

export interface LoadoutOption {
  id: string
  name: string
  nameFa: string
  slot: LoadoutSlotId
  slotsFa: string
  descriptionFa: string
  synergyFa?: string
  changedInS5?: string
}

export const SLOT_ORDER: { id: LoadoutSlotId; label: string; labelFa: string; noteFa: string }[] = [
  {
    id: 'vest',
    label: 'VEST',
    labelFa: 'جلیقه',
    noteFa: 'شش جلیقه، فقط در مولتی‌پلیر. جلیقه تعیین می‌کند چند اسلات تجهیز و Gear داشته باشید.',
  },
  { id: 'gloves', label: 'GLOVES', labelFa: 'دستکش', noteFa: 'شش دستکش — همه روی هندلینگ سلاح و پرتاب تجهیزات اثر می‌گذارند.' },
  { id: 'boots', label: 'BOOTS', labelFa: 'چکمه', noteFa: 'شش چکمه — حرکت، صدا و لغزش. Gunner Vest اسلات چکمه ندارد.' },
  { id: 'gear', label: 'GEAR', labelFa: 'تجهیز', noteFa: 'دوازده Gear — یکی در همهٔ جلیقه‌ها، دو تا در Engineer و CCT Comms.' },
  { id: 'field_upgrade', label: 'FIELD UPGRADE', labelFa: 'ارتقای میدانی', noteFa: 'هیجده ارتقای میدانی؛ Overkill و برخی جلیقه‌ها اسلات آن را حذف می‌کنند.' },
]

export const loadoutOptions: LoadoutOption[] = [
  // ── Vests ──
  {
    id: 'vest-infantry',
    name: 'Infantry Vest',
    nameFa: 'جلیقه پیاده‌نظام',
    slot: 'vest',
    slotsFa: 'تجهیز ۳ عدد: Tactical، Lethal، Field Upgrade — Gear ۳ عدد: Gloves، Boots، Gear',
    descriptionFa:
      'جلیقهٔ استاندارد پیاده‌نظام. مدت Tac Sprint را زیاد و زمان ریفرش آن را کم می‌کند؛ اثر تکراری روی هم انباشته نمی‌شود.',
    synergyFa: 'با Running Sneakers، اثر Lightweight Boots را هم می‌گیرید.',
    changedInS5: 'در سیزن ۵ ریلُود یک اسلات Gear دوم گرفت — این تغییر در Ranked Play اعمال نمی‌شود.',
  },
  {
    id: 'vest-engineer',
    name: 'Engineer Vest',
    nameFa: 'جلیقه مهندس',
    slot: 'vest',
    slotsFa: 'تجهیز ۳ عدد: Tactical ×2، Field Upgrade (اسلات Lethal حذف می‌شود) — Gear ۴ عدد',
    descriptionFa:
      'تخصص ضد‌تجهیزات: تجهیزات، Field Upgrade و Killstreak دشمن را از دیوار می‌بیند و هنگام ADS برای کل تیم هایلایت می‌کند؛ ریفرش Field Upgrade سریع‌تر.',
    changedInS5: 'سیزن ۵ یک اسلات Lethal به آن اضافه کرد.',
  },
  {
    id: 'vest-gunner',
    name: 'Gunner Vest',
    nameFa: 'جلیقه تیرانداز',
    slot: 'vest',
    slotsFa: 'تجهیز ۳ عدد: دو سلاح اصلی، Tactical، Lethal، Field Upgrade (اسلات سلاح ثانوی حذف می‌شود) — Gear ۲ عدد: Gloves، Gear',
    descriptionFa: 'با مهمات پر وارد بازی می‌شوید و سرعت Reload بهتر می‌شود؛ اثر تکراری انباشته نمی‌شود.',
    synergyFa: 'با Mag Holster، اثر Mission Control Commlink را هم می‌گیرید.',
    changedInS5: 'سیزن ۵ اسلات Boots را اضافه کرد.',
  },
  {
    id: 'vest-demolition',
    name: 'Demolition Vest',
    nameFa: 'جلیقه انفجار',
    slot: 'vest',
    slotsFa: 'تجهیز ۴ عدد: Tactical، Lethal ×2، Field Upgrade — Gear ۳ عدد',
    descriptionFa: 'استادی لثالن و تاکتیکال: هر ۲۵ ثانیه تجهیزات شما پر می‌شود.',
    changedInS5: 'سیزن ۵ اسلات دوم Gear را اضافه کرد.',
  },
  {
    id: 'vest-cct-comms',
    name: 'CCT Comms Vest',
    nameFa: 'جلیقه CCT Comms',
    slot: 'vest',
    slotsFa: 'تجهیز ۱ عدد: فقط Field Upgrade — Gear ۴ عدد',
    descriptionFa:
      'منبع اطلاعات تیمی: مدت ماندن دشمن روی رادار زیاد می‌شود و رادار شما و یاران نزدیک zoom out می‌شود. دشمنان کشته‌شده Intel Pack می‌اندازند که با برداشتنش پینگ راداری می‌سازد.',
    synergyFa: 'با Data Jacker، اثر Mission Control Commlink را هم می‌گیرید.',
    changedInS5: 'سیزن ۵ یک اسلات Tactical اضافه کرد.',
  },
  {
    id: 'vest-overkill',
    name: 'Overkill Vest',
    nameFa: 'جلیقه اورکِل',
    slot: 'vest',
    slotsFa: 'تجهیز ۲ عدد: Tactical، Lethal (اسلات Field Upgrade حذف می‌شود) — Gear ۳ عدد',
    descriptionFa: 'استادی تحرک سلاح: سرعت تعویض سلاح بالا و Reload در حال Sprint ممکن می‌شود.',
    synergyFa: 'با Quick-Grip یا Commando Gloves، اثر Marksman Gloves را هم می‌گیرید.',
    changedInS5: 'سیزن ۵ اسلات Field Upgrade را برگرداند.',
  },

  // ── Gloves ──
  { id: 'gloves-quick-grip', name: 'Quick-Grip Gloves', nameFa: 'دستکش grip سریع', slot: 'gloves', slotsFa: 'هر جلیقه یک دستکش', descriptionFa: 'سرعت تعویض سلاح را زیاد می‌کند.' },
  { id: 'gloves-ordnance', name: 'Ordnance Gloves', nameFa: 'دستکش مهمات', slot: 'gloves', slotsFa: 'هر جلیقه یک دستکش', descriptionFa: 'تجهیزات را دورتر پرتاب می‌کند و تایمر فیوز نارنجک برگشتی را ریست می‌کند.' },
  { id: 'gloves-commando', name: 'Commando Gloves', nameFa: 'دستکش کماندو', slot: 'gloves', slotsFa: 'هر جلیقه یک دستکش', descriptionFa: 'امکان Reload در حال دویدن (Tactical Sprint).' },
  { id: 'gloves-scavenger', name: 'Scavenger Gloves', nameFa: 'دستکش لاشه‌گردان', slot: 'gloves', slotsFa: 'هر جلیقه یک دستکش', descriptionFa: 'مهمات و چاقوی پرتابی را از اجساد دوباره تأمین می‌کند.' },
  { id: 'gloves-marksman', name: 'Marksman Gloves', nameFa: 'دستکش نشانه‌گیر', slot: 'gloves', slotsFa: 'هر جلیقه یک دستکش', descriptionFa: 'لرزش sway و flinch هنگام ADS را کم می‌کند — انتخاب تیراندازها.' },
  { id: 'gloves-assault', name: 'Assault Gloves', nameFa: 'دستکش اسالت', slot: 'gloves', slotsFa: 'هر جلیقه یک دستکش', descriptionFa: 'دقت و زمان ADS هنگام پریدن بهبود می‌یابد.' },

  // ── Boots ──
  { id: 'boots-lightweight', name: 'Lightweight Boots', nameFa: 'چکمه سبک', slot: 'boots', slotsFa: 'هر جلیقه به‌جز Gunner', descriptionFa: 'سرعت حرکت و شنا را زیاد و صدای شنا را کم می‌کند.' },
  { id: 'boots-climbing', name: 'Climbing Boots', nameFa: 'چکمه صعود', slot: 'boots', slotsFa: 'هر جلیقه به‌جز Gunner', descriptionFa: 'سرعت بالا کشیدن و Manthling زیاد، آسیب سقوط کم.' },
  { id: 'boots-sneakers', name: 'Running Sneakers', nameFa: 'کفش دویدن', slot: 'boots', slotsFa: 'هر جلیقه به‌جز Gunner', descriptionFa: 'مدت Tac Sprint بیشتر و زمان ریفرش کمتر.' },
  { id: 'boots-tactical-pads', name: 'Tactical Pads', nameFa: 'پد تاکتیکی', slot: 'boots', slotsFa: 'هر جلیقه به‌جز Gunner', descriptionFa: 'مسافت Slide بیشتر و امکان ADS وسط اسلاید؛ تعویض استنس و سرعت حرکت چمباتمه بهتر.' },
  { id: 'boots-stalker', name: 'Stalker Boots', nameFa: 'چکمه استاکر', slot: 'boots', slotsFa: 'هر جلیقه به‌جز Gunner', descriptionFa: 'سرعت Strafe و حرکت در حالت ADS زیاد می‌شود.' },
  { id: 'boots-covert', name: 'Covert Sneakers', nameFa: 'کفش پنهان', slot: 'boots', slotsFa: 'هر جلیقه به‌جز Gunner', descriptionFa: 'صدای پا را کامل حذف می‌کند.' },

  // ── Gear ──
  { id: 'gear-tac-mask', name: 'Tac Mask', nameFa: 'ماسک تاکتیکی', slot: 'gear', slotsFa: '۱ عدد (۲ در Engineer و CCT Comms)', descriptionFa: 'اثر فلش، استن و گاز دشمن را کم می‌کند.' },
  { id: 'gear-mission-control', name: 'Mission Control Commlink', nameFa: 'کام‌لینک فرماندهی', slot: 'gear', slotsFa: '۱ عدد (۲ در Engineer و CCT Comms)', descriptionFa: 'هزینهٔ Killstreak یک کیل و Scorestreak ۱۲۵ امتیاز کمتر.', changedInS5: 'سیزن ۵ اسلات Boots به این جلیقه اضافه شد.' },
  { id: 'gear-bone-headset', name: 'Bone Conduction Headset', nameFa: 'هدفون استخوان‌رسان', slot: 'gear', slotsFa: '۱ عدد (۲ در Engineer و CCT Comms)', descriptionFa: 'نویز مبارزه را کم تا صدای پا و شلیک را بهتر تشخیص دهید.' },
  { id: 'gear-mag-holster', name: 'Mag Holster', nameFa: 'غلاف خشاب', slot: 'gear', slotsFa: '۱ عدد (۲ در Engineer و CCT Comms)', descriptionFa: 'سرعت Reload را زیاد می‌کند.' },
  { id: 'gear-blacklight', name: 'Blacklight Flashlight', nameFa: 'چراغ Blacklight', slot: 'gear', slotsFa: '۱ عدد (۲ در Engineer و CCT Comms)', descriptionFa: 'ردپای پای دشمن در لحظات اخیر را نشان می‌دهد.' },
  { id: 'gear-lr-detector', name: 'L/R Detector', nameFa: 'دستگاه هشدار لیزر و تشعشع', slot: 'gear', slotsFa: '۱ عدد (۲ در Engineer و CCT Comms)', descriptionFa: 'هشدار در برابر لیزر دشمن و منابع تشعشع.' },
  { id: 'gear-threat-iff', name: 'Threat Identification System', nameFa: 'سیستم شناسایی تهدید', slot: 'gear', slotsFa: '۱ عدد (۲ در Engineer و CCT Comms)', descriptionFa: 'هنگام ADS، موقعیت دشمن داخل نشانه‌گیر خودکار Ping می‌شود.' },
  { id: 'gear-data-jacker', name: 'Data Jacker', nameFa: 'دیتا جکر', slot: 'gear', slotsFa: '۱ عدد (۲ در Engineer و CCT Comms)', descriptionFa: 'دشمنان کشته‌شده گوشی هوشمند می‌اندازند؛ برداشتن آن پینگ راداری می‌سازد.' },
  { id: 'gear-signal-jammer', name: 'Signal Jammer', nameFa: 'جم‌کنندهٔ سیگنال', slot: 'gear', slotsFa: '۱ عدد (۲ در Engineer و CCT Comms)', descriptionFa: 'Claymore و مین گذاشتهٔ دشمن را از کار می‌اندازد و از تجهیزات نزدیک هشدار می‌دهد.' },
  { id: 'gear-hijacked-iff', name: 'Hijacked IFF Strobe', nameFa: 'استروب IFF دزدیده‌شده', slot: 'gear', slotsFa: '۱ عدد (۲ در Engineer و CCT Comms)', descriptionFa: 'در برابر سیستم‌های هدف‌گیری هوشمند و اپتیک حرارتی نامرئی؛ در دوربین تاکتیکی و Recon Drone دشمن هایلایت نمی‌شوید.' },
  { id: 'gear-ghost-tv', name: 'Ghost T/V Camo', nameFa: 'کاموی Ghost', slot: 'gear', slotsFa: '۱ عدد (۲ در Engineer و CCT Comms)', descriptionFa: 'در حالت حرکت، شما را از UAV، رادار دشمن و Heartbeat Sensor پنهان می‌کند.', changedInS5: 'در ریلُود، Advanced UAV دیگر بازیکنان Ghost T/V یا Assassin Vest را به نقطهٔ minimap تنزل نمی‌دهد.' },
  { id: 'gear-eod', name: 'EOD Padding', nameFa: 'بالشتک خنثی‌سازی', slot: 'gear', slotsFa: '۱ عدد (۲ در Engineer و CCT Comms)', descriptionFa: 'آسیب انفجارهای غیر Killstreak و آتش را کم می‌کند.' },

  // ── Field Upgrades ──
  { id: 'fu-heartbeat', name: 'Heartbeat Sensor', nameFa: 'حسگر ضربان', slot: 'field_upgrade', slotsFa: '۱ عدد', descriptionFa: 'تبلت محدود با اطلاعات تقریبی از دشمنان نزدیک.' },
  { id: 'fu-med-box', name: 'Med Box', nameFa: 'جعبهٔ پزشکی', slot: 'field_upgrade', slotsFa: '۱ عدد', descriptionFa: 'جعبهٔ پزشکی برای شما و هم‌تیمی‌ها؛ زمان بهبود را کم می‌کند.' },
  { id: 'fu-decoy', name: 'Inflatable Decoy', nameFa: 'طعمهٔ بادی', slot: 'field_upgrade', slotsFa: '۱ عدد', descriptionFa: 'مین نزدیکی فریب‌دهنده؛ با دکمهٔ Tactical + Lethal دستی فعال می‌شود.' },
  { id: 'fu-comm-scrambler', name: 'Comm Scrambler', nameFa: 'بِرزنندهٔ ارتباط', slot: 'field_upgrade', slotsFa: '۱ عدد', descriptionFa: 'شلیک Killstreak دشمن داخل شعاع را قطع و ردار/اطلاعات دشمن را از شما کور می‌کند؛ موقعیتش روی مینی‌مپ دشمن می‌بیند.' },
  { id: 'fu-tac-insertion', name: 'Tactical Insertion', nameFa: 'اینجکشن تاکتیکی', slot: 'field_upgrade', slotsFa: '۱ عدد', descriptionFa: 'محل اسپاون بعدی شما را علامت می‌زند؛ در مودهای تک‌جانی مثل S&D اثری ندارد.' },
  { id: 'fu-trophy', name: 'Trophy System', nameFa: 'سیستم تروفی', slot: 'field_upgrade', slotsFa: '۱ عدد', descriptionFa: 'سپر خودکار که تا سه پرتابه یا تجهیز دشمن را منهدم می‌کند؛ اهداف بزرگ‌تر چند شلیک می‌گیرند.' },
  { id: 'fu-munitions', name: 'Munitions Box', nameFa: 'جعبهٔ مهمات', slot: 'field_upgrade', slotsFa: '۱ عدد', descriptionFa: 'مهمات و تجهیزات برای تیم.' },
  { id: 'fu-acs', name: 'A.C.S.', nameFa: 'اسپایک کامپیوتری خودکار', slot: 'field_upgrade', slotsFa: '۱ عدد', descriptionFa: 'نقاط را آرام تصاحب و دستگاه‌های دشمن را موقت هک می‌کند (Domination، Hardpoint، Control، Ground War).' },
  { id: 'fu-tac-camera', name: 'Tactical Camera', nameFa: 'دوربین تاکتیکی', slot: 'field_upgrade', slotsFa: '۱ عدد', descriptionFa: 'پرتاب کن، وصل شو و دشمن را علامت بزن؛ رهاشده صدا هشدار می‌دهد.' },
  { id: 'fu-ddos', name: 'DDoS', nameFa: 'دی‌داس', slot: 'field_upgrade', slotsFa: '۱ عدد', descriptionFa: 'الکترونیک و حسگر دشمن را برای مدت کوتاه از کار می‌اندازد.' },
  { id: 'fu-cover', name: 'Deployable Cover', nameFa: 'سپر قابل‌حمل', slot: 'field_upgrade', slotsFa: '۱ عدد', descriptionFa: 'پوشش بالیستیک سریع‌نصب.' },
  { id: 'fu-recon-drone', name: 'Recon Drone', nameFa: 'پهپاد شناسایی', slot: 'field_upgrade', slotsFa: '۱ عدد', descriptionFa: 'کنترل دستی با علامت‌گذاری خودکار دشمن.' },
  { id: 'fu-dead-silence', name: 'Dead Silence', nameFa: 'سکوت مطلق', slot: 'field_upgrade', slotsFa: '۱ عدد', descriptionFa: 'صدای پا موقتاً حذف؛ کیل با سلاح، میله‌ای یا چاقوی پرتابی مدت را تمدید می‌کند.' },
  { id: 'fu-loadout-drop', name: 'Loadout Drop', nameFa: 'اینداخت لودآوت', slot: 'field_upgrade', slotsFa: '۱ عدد', descriptionFa: 'crate تیمی با محدودیت استفاده — هر بازیکن یک بار.' },
  { id: 'fu-portable-radar', name: 'Portable Radar', nameFa: 'رادار قابل‌حمل', slot: 'field_upgrade', slotsFa: '۱ عدد', descriptionFa: 'پینگ دوره‌ای برای کشف دشمنان نزدیک.' },
  { id: 'fu-smoke', name: 'Smoke Airdrop', nameFa: 'اینداخت دود', slot: 'field_upgrade', slotsFa: '۱ عدد', descriptionFa: 'دیوار دود در نقطهٔ هدف با ناوگان پهپاد.' },
  { id: 'fu-suppression-mine', name: 'Suppression Mine', nameFa: 'مین سرکوب', slot: 'field_upgrade', slotsFa: '۱ عدد', descriptionFa: 'مین تحت‌فشار صوتی که دید را برهم و حرکت دشمن را کند می‌کند.' },
  { id: 'fu-anti-armor', name: 'Anti-Armor Rounds', nameFa: 'مهمات ضدزره', slot: 'field_upgrade', slotsFa: '۱ عدد', descriptionFa: 'آسیب اضافه به اهداف زرهی: خودرو، تجهیزات، بالیستیک و پناهگاه‌های قابل‌نفوذ.' },
]

export interface ComboBuild {
  id: string
  nameFa: string
  styleFa: string
  vest: string
  gloves: string
  boots: string
  gear: string[]
  fieldUpgrade: string
  whyFa: string
  s5NoteFa?: string
}

export const comboBuilds: ComboBuild[] = [
  {
    id: 'combo-rush',
    nameFa: 'راش متحرک',
    styleFa: 'Flank سریع / CQB',
    vest: 'vest-infantry',
    gloves: 'gloves-commando',
    boots: 'boots-sneakers',
    gear: ['gear-mag-holster'],
    fieldUpgrade: 'fu-tac-insertion',
    whyFa:
      'Infantry Vest با Running Sneakers هم‌افزایی دارد و اثر Lightweight Boots را هم می‌دهد؛ Reload در حال Sprint با Commando Gloves یعنی فشار پیوسته.',
    s5NoteFa: 'با اسلات Gear دوم سیزن ۵ ریلُود می‌توانید Mag Holster و یک Gear اطلاعاتی را هم‌زمان ببرید (به‌جز Ranked).',
  },
  {
    id: 'combo-sniper',
    nameFa: 'تک‌تیرانداز ساکت',
    styleFa: 'رنج بلند / پنهان',
    vest: 'vest-overkill',
    gloves: 'gloves-marksman',
    boots: 'boots-covert',
    gear: ['gear-ghost-tv', 'gear-hijacked-iff'],
    fieldUpgrade: 'fu-portable-radar',
    whyFa: 'کاهش sway و flinch، حذف صدای پا و نامرئی بودن برای UAV/ترمال؛ Overkill با سلاح ثانوی برای فاصله‌های نزدیک.',
    s5NoteFa: 'در سیزن ۵ Overkill Vest اسلات Field Upgrade را دوباره گرفت، پیش‌تر این ترکیب ممکن نبود.',
  },
  {
    id: 'combo-support',
    nameFa: 'پشتیبان تیم',
    styleFa: 'ضد‌تجهیز / اطلاعات',
    vest: 'vest-engineer',
    gloves: 'gloves-ordnance',
    boots: 'boots-tactical-pads',
    gear: ['gear-signal-jammer', 'gear-threat-iff'],
    fieldUpgrade: 'fu-trophy',
    whyFa:
      'Engineer Vest تجهیزات دشمن را از دیوار نشان می‌دهد و با دو اسلات Gear، بِرزَننده و Threat ID را هم‌زمان فعال می‌کند؛ Trophy System پاسخ Killstreak است.',
    s5NoteFa: 'سیزن ۵ اسلات Lethal را به جلیقهٔ مهندس برگرداند — قبلاً فقط Tactical داشت.',
  },
  {
    id: 'combo-killstreak',
    nameFa: 'ماشین Killstreak',
    styleFa: 'اسکور سریع',
    vest: 'vest-gunner',
    gloves: 'gloves-quick-grip',
    boots: 'boots-lightweight',
    gear: ['gear-mission-control'],
    fieldUpgrade: 'fu-loadout-drop',
    whyFa: 'Mission Control هزینهٔ Killstreak را یک کیل و Scorestreak را ۱۲۵ کم می‌کند؛ Gunner Vest با دو سلاح اصلی و Reload سریع، کیل را تضمین می‌کند.',
    s5NoteFa:
      'یادداشت رسمی سیزن ۵: Killstreak دیگر برای به‌دست‌آوردن Killstreak بعدی امتیاز می‌دهد (Streaks Earn Streaks حذف شد)؛ پس این ترکیب به Scorestreak-based تغییر جهت داده است.',
  },
]
