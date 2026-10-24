import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'CALL OF DUTY | آرشیو فارسی MWIII و Warzone',
  description: 'آرشیو و راهنمای فارسی محتوای Call of Duty: Modern Warfare III و Warzone — سیزن ۵؛ شامل متا، TTK، لودآوت، کامو، نقشه‌ها، پاس نبرد و رویدادها',
  keywords: 'call of duty, modern warfare 3, warzone, mw3, season 5, loadout, meta, ttk, camo, battle pass, آرشیو, وارزون',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <body className="font-sans bg-cod-bg text-gray-100 min-h-screen antialiased">
        {children}
      </body>
    </html>
  )
}
