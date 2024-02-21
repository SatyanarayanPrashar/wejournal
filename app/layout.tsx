import { Inter } from 'next/font/google'
import type { Metadata } from 'next'
import { EdgeStoreProvider } from "@/lib/edgestore";
import { ModalProvider } from '@/providers/modal-provider';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'WeJournal',
  description: 'Connect Your Stories. Welcome to WeJournal',
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/logo.svg",
        href: "/logo.svg",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/logo-dark.svg",
        href: "/logo-dark.svg",
      }
    ]
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <EdgeStoreProvider>
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            draggable={false}
            closeOnClick
            pauseOnHover
            theme="dark"
          />
          {children}
          <ModalProvider />
        </EdgeStoreProvider>
      </body>
    </html>
  )
}