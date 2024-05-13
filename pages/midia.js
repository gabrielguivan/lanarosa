import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Image from 'next/image'
import picture from '../images/IMG_8339.JPG'

export default function midia() {
    return (
        <div className={styles.card}>
            <h1>olá</h1>
            <Link href='/'><p>Olá</p></Link>
            <Image src={picture} width={10} height={20}/>
        </div>
    )
}