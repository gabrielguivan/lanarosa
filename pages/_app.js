import Script from 'next/script'
import '../styles/globals.css'
import { Analytics } from '@vercel/analytics/react';

function MyApp({ Component, pageProps }) {
  return (
  <>
  
    <Script strategy='lazyOnload' src='https://www.googletagmanager.com/ns.html?id=GTM-TRLXSBJ' />
    <Script id='google-analytics' strategy='lazyOnload'>
     {`
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-TRLXSBJ');
    `}
    </Script>
    <Component {...pageProps} />
    <Analytics />
    </>
  )
}

export default MyApp
