import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import profilePic from '../public/FullSizeRender.jpg'
import Link from 'next/link'
import Interzin from '@next/font/local'

const interzin = Interzin({
  src: '../fonte/inter-var-subset-latin-opsz-sep27.woff2',
  variable: '--font-interzin1',
  weight: '700'
})

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Gabriel Guivan</title>
        <meta charset="UTF-8"/>
        <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <meta name="description" content="Gabriel Guivan website" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
        <link rel="manifest" href="/site.webmanifest"/>
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5"/>
        <meta name="msapplication-TileColor" content="#da532c"/>
        <meta name="theme-color" content="#ffffff"/>
      </Head>

      <main className={styles.main}>
        <Image src={profilePic} quality="100" className={styles.image} width={100} height={100} alt="Foto de Perfil" priority="true" placeholder='blur'/>
        <div className={interzin.variable}><h1 className={styles.title}>
          Gabriel Guivan
        </h1></div>
        <p className={styles.description}></p>

        <div className={styles.grid}>
        {/*<a href="https://www.kooapp.com/profile/gabrielguivan" className={styles.card}>
            <h2>Koo &rarr;</h2><b className={styles.boc}>Novo⚡</b>
            <p>
            Nova rede social, entre já no meu Koo. 👀
            </p>
          </a>
        */}
          <a href="https://www.instagram.com/gabrielguivan/" className={styles.card}>
            <h2>Instagram &rarr;</h2>
            <p>Perfil pessoal no Instagram, posto cafés e gatos. 😺</p>
          </a>

          <a href="https://twitter.com/gabrielguivan/" className={styles.card}>
            <h2>Twitter &rarr;</h2>
            <p>Mais para notícias porém às vezes rola pitacos. 🐦</p>
          </a>

          <a
            href="https://open.spotify.com/user/9rmd20u4didzr8u2vhh4grlfl"
            className={styles.card}
          >
            <h2>Spotify &rarr;</h2>
            <p>Diversas playlists das quais ouço o tempo todo. 🎶</p>
          </a>

          <a
            href="https://www.tiktok.com/@gabrielguivan/"
            className={styles.card}
          >
            <h2>TikTok &rarr;</h2>
            <p>
              Vídeos e dancinhas para alegrar o dia. 🤠
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
          Feito por eu mesmo :)
      </footer>
    </div>
  )
}

{/*<Link href='/midia'
            className={styles.card}>
            <h2>Mídia &rarr;</h2>
            <p>
              Galeria de fotos. 📷
            </p>
            </Link>*/}