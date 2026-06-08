import type { Metadata } from 'next'
import { Vazirmatn } from 'next/font/google'
import './globals.css'
import ThemeProvider from './components/ThemeProvider'

const vazirmatn = Vazirmatn({
  subsets: ['arabic'],
  variable: '--font-vazirmatn',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  title: 'اهداف Call of Duty | CoD Objectives',
  description: 'راهنمای کامل اهداف، مأموریت‌ها، چالش‌های سلاح و آیتم شاپ Call of Duty به زبان فارسی',
  keywords: 'call of duty, warzone, mw3, objectives, challenges, item shop, آیتم شاپ, چالش, وارزون',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body className={`${vazirmatn.variable} font-sans bg-cod-bg text-white min-h-screen`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
