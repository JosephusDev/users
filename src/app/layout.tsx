import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import Providers from './Providers'

const montserratSans = Montserrat({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Usuários',
  description: 'App de gestão de usuários',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' className={`${montserratSans.variable}`}>
      <body className='font-[family-name:var(--font-geist-sans)]'>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
