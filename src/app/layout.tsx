import '@/styles/globals.css'
import { Header } from '@/components/header'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import Footer from '@/components/footer'
import { cn } from '@/lib/utils'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000/',
  ),
  title: 'Traxi Frontend Challenge',

  description: 'Traxi Frontend Challenge',
  keywords: ['Next.js', 'React', 'Tailwind CSS'],
  authors: [
    {
      name: 'Jorge Assaf',
      url: 'https://github.com/JorgeAssaf',
    },
  ],
  creator: 'Jorge Assaf',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],

  icons: {
    icon: '/favicon.ico',
  },
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='es' suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background antialiased flex flex-col',
          inter.className,
        )}>
        <ThemeProvider
          enableSystem={true}
          attribute='class'
          defaultTheme='system'>
          <Header />
          <div className='flex-1'>{children}</div>
        </ThemeProvider>
        <Footer />
      </body>
    </html>
  )
}
