import Script from 'next/script'
import '../styles/globals.css'
import { Analytics } from '@vercel/analytics/react';
import { Inter } from '@next/font/google';

const pt = Inter({
  subsets: ['latin'],
})

function MyApp({ Component, pageProps }) {
  return (
  <>
  <main className={pt.className}>
    <Component {...pageProps} />
    <Analytics />
   </main>
    </>
    
  )
}

export default MyApp
