'use client'
import { releaseTimeline, weeklyChallengesS5 } from '../data/shopHistory'
import SectionHeader from './SectionHeader'
import SourceNote from './SourceNote'

export default function ShopHistory() {
  return (
    <div className="space-y-5">
      <SectionHeader
        tab="shophistory"
        en="SEASON LOG"
        title="تاریخچهٔ انتشار سیزن ۵"
        note="به‌جای «تاریخچهٔ روتیشن روزانه» — که بی‌معناست چون فروشگاه زنده‌ای اینجا نیست — این برگه خط زمانی واقعی انتشار محتوا و باندل‌ها در سیزن ۵ و ریلُود آن را نشان می‌دهد."
        stats={[
          { label: 'ENTRIES', value: releaseTimeline.length },
          { label: 'WINDOW', value: 'Jul–Sep 2024' },
        ]}
      />

      <ol className="relative space-y-4 pr-5">
        <span className="absolute bottom-2 right-0 top-2 w-px bg-cod-border" aria-hidden />
        {releaseTimeline.map((entry, i) => (
          <li key={entry.id} className="relative">
            <span
              className="absolute -right-[1.35rem] top-4 h-2.5 w-2.5 border border-cod-gold bg-cod-bg"
              aria-hidden
            />
            <article className="notch border border-cod-border bg-cod-card">
              <header className="flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-cod-border px-4 py-3">
                <span className="hud-num text-cod-gold">{String(i + 1).padStart(2, '0')}</span>
                <span className="hud-tag text-cod-sand">{entry.label}</span>
                <span className="mr-auto font-mono text-[10.5px] text-gray-500">{entry.date}</span>
              </header>
              <div className="space-y-2.5 px-4 py-3.5">
                <h3 className="text-sm font-bold text-white">{entry.titleFa}</h3>
                <p className="text-[11px] text-gray-500">{entry.dateFa}</p>
                <ul className="space-y-1.5">
                  {entry.items.map((line, j) => (
                    <li key={j} className="flex gap-2.5 text-[12.5px] leading-relaxed text-gray-300">
                      <span className="mt-1.5 h-px w-3 shrink-0 bg-cod-border-light" aria-hidden />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </li>
        ))}
      </ol>

      <section className="notch border border-cod-border bg-cod-panel p-4">
        <h3 className="hud-title mb-1 text-base font-bold text-white">چالش‌های هفتگی سیزن ۵</h3>
        <p className="mb-4 text-xs leading-relaxed text-gray-400">
          پنج چالش یا بیشتر در هر هفته (مولتی‌پلیر، وارزون و Zombies) ⇒ پاداش آن هفته. تکمیل هر هشت هفته ⇒ کاموی
          متحرک Mastery به نام Chainbreaker.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-right text-[12.5px]">
            <thead>
              <tr className="hud-tag border-b border-cod-border text-gray-500">
                <th className="py-2 pl-2 font-normal">WEEK</th>
                <th className="py-2 pl-2 font-normal">تاریخ (تقریبی)</th>
                <th className="py-2 pl-2 font-normal">پاداش</th>
                <th className="py-2 font-normal">سلاح هدف</th>
              </tr>
            </thead>
            <tbody>
              {weeklyChallengesS5.map((w) => (
                <tr key={w.week} className="border-b border-cod-border/60 last:border-0">
                  <td className="hud-num py-2.5 pl-2 text-cod-gold-light">{String(w.week).padStart(2, '0')}</td>
                  <td className="py-2.5 pl-2 font-mono text-[11px] text-gray-500">{w.date}</td>
                  <td className="py-2.5 pl-2">
                    <span className="text-white">{w.reward}</span>
                    <span className="block text-[11.5px] leading-relaxed text-gray-400">{w.rewardFa}</span>
                  </td>
                  <td className="py-2.5 text-gray-300">{w.weapon}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <SourceNote kind="archive" source="منابع: مقالهٔ «Season 5 Content Drop»، یادداشت‌های «Season 5 Reloaded» و مقالهٔ BlackCell/Battle Pass (ژوئیه–آگوست ۲۰۲۴)">
        بازهٔ رویدادها و تاریخ انتشار بزرگ از متن رسمی گرفته شده است. تاریخ شروع هر «هفته چالش» از ریتم چهارشنبه‌های
        سیزن استنتاج شده و بنابراین تقریبی است؛ برای هفته‌های ۶ تا ۸ ممکن است یک روز جابه‌جا باشد.
      </SourceNote>
    </div>
  )
}
