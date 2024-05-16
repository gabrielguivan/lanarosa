import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import profilePic from '../public/foto.jpg'
import Link from 'next/link'
import { motion } from 'framer-motion';

const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
};



export default function Home() {
  return (
    <motion.div
    initial="initial"
    animate="animate"
    exit="exit"
    variants={pageTransition}
    >
    <div className={styles.container}>
      <Head>
        <title>Lana Rosa Studio</title>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Website da artista plástica Lana Rosa na Serra Gaúcha." />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <main className={styles.main}>
        <Image src={profilePic} quality="100" className={styles.image} width={100} height={100} alt="Foto de Perfil" priority="true" placeholder='blur' />
        <div>
          <h1 className={styles.title}>
            Lana Rosa Studio
          </h1>
          <p className={styles.description}>Artista plástica em Canela na Serra Gaúcha</p>
        </div>

        <div className={styles.grid}>
          <a href="https://www.instagram.com/lanarosastudio/" className={styles.card}>
            <h2>Instagram &rarr;</h2>
            <p>Acompanhe meu dia a dia nos Stories e Reels.</p>
          </a>

          <a href="https://wa.me/5555999453068" className={styles.card}>
            <h2>WhatsApp &rarr;</h2>
            <p>Obtenha uma cotação diretamente comigo.</p>
          </a>

          <a href="mailto:rosahelenat@outlook.com" className={styles.card}>
            <h2>Email &rarr;</h2>
            <p>Endereço para consultas profissionais.</p>
          </a>
          <Link href="/sobre" className={styles.card}>
            <h2>Sobre mim &rarr;</h2>
            <p>Aqui você confere minha biografia.</p>
          </Link>

          {/*<Link href="/video" className={styles.card}>
            <h2>Entrevistas &rarr;</h2>
          </Link>*/}
        </div>
      </main>

      <footer className={styles.footer}>
          feito por @gabrielguivan :)
      </footer>
    </div>
    </motion.div>
  )
}
