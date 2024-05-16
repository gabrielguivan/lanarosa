import Script from 'next/script'
import '../styles/globals.css'
import { Analytics } from '@vercel/analytics/react';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
 
// Font files can be colocated inside of `app`
const myFont = localFont({
  src: '../fonte/GeistVF.woff2',
  display: 'swap',
})

const pt = Inter({
  subsets: ['latin'],
  variable: '--font-pt',
})

function MyApp({ Component, pageProps }) {
  return (
  <>
  <main className={myFont.className}>
    <Component {...pageProps} />
    <Analytics />
   </main>
    </>
    
  )
}

export default MyApp
