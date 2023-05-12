import './globals.css'

import { Inter } from 'next/font/google'
import Navbar from '@/components/navbar/Navbar'
import RegisterModal from '@/components/modals/RegisterModal'
import LoginModal from '@/components/modals/LoginModal'
import Footer from '@/components/Footer'
import PublishModal from '@/components/modals/PublishModal'
import ResetPasswordModal from '@/components/modals/ResetPasswordModal'
import Providers from '@/components/providers/Providers'
import { Metadata } from 'next'
import FooterNav from '@/components/FooterNav'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'OLX',
  description: 'Welcome to OLX',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <LoginModal />
          <RegisterModal />
          <ResetPasswordModal />
          <PublishModal />
          <Navbar />
          {children}
          <FooterNav />
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
