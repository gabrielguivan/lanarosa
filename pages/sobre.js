// pages/sobre.js

import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Home.module.css'; // Importar estilos específicos da página
import profilePic from '../public/foto.jpg'
import { motion } from 'framer-motion';

const pageTransition = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  };

export default function Sobre() {
  return (
    <motion.div
    initial="initial"
    animate="animate"
    exit="exit"
    variants={pageTransition} // As variantes aqui referenciadas pelo objeto pageTransition
    className={styles.container}
    >
    <div className={styles.container}>
      <Head>
        <title>Sobre Mim - Lana Rosa Studio</title>
        <meta name="description" content="Biografia da artesã plástica Lana Rosa" />
      </Head>

      <main className={styles.main}>
        <Image src={profilePic} quality="100" className={styles.image} width={100} height={100} alt="Foto de Perfil" priority="true" placeholder="blur" />
        <div className={styles.textContainer}>
          <h1 className={styles.title}>Sobre Mim</h1>
          <p className={styles.description}>
            Sou uma artista plástica localizada em Canela, Rio Grande do Sul. Meu trabalho envolve
            explorar diferentes formas de expressão artística, especialmente através da manipulação da lã ovina. Estou sempre em busca de inspiração na natureza e na cultura local.
          </p>
        </div>
        <div className={styles.backToHome}>
      <Link href="/">
        <p>← Voltar para a página inicial</p>
      </Link>
        </div>
        <div className={styles.grid}>
          {/* Links... */}
        </div>
      </main>

      <footer className={styles.footer}>
        feito por @gabrielguivan :)
      </footer>
    </div>
    </motion.div>
  );
}
