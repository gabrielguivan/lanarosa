import Script from 'next/script'
import '../styles/globals.css'
import { Analytics } from '@vercel/analytics/react';
import { Zilla_Slab } from 'next/font/google'
 
// If loading a variable font, you don't need to specify the font weight
const zilla = Zilla_Slab({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: ['--font-zilla'],
  subsets: ['latin'],
  display: 'swap',
  subsets: ['latin'] })

function MyApp({ Component, pageProps }) {
  return (
  <>
     <main className={zilla.className}></main>
    <Component {...pageProps} />
    <Analytics />
    </>
  )
}

export default MyApp
