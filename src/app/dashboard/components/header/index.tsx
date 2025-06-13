"use client"
import Link from 'next/link'
import styles from './styles.module.scss'
import Image from 'next/image'
import logoImg from '/public/imagens/logoDash2.png'
import { LogOutIcon } from 'lucide-react'
import { deleteCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'

export function Header() {
    const router = useRouter();

    async function handleLogout() {
        deleteCookie("session", { path: "/" })

        router.replace("/")
    }

    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link href='/dashboard'>
                    <Image
                        alt='logo dashboard'
                        src={logoImg}
                        width={100}
                        height={100}
                        priority={true}
                        quality={100}
                    />
                </Link>

                <nav>
                    <Link href="/dashboard/machines">
                        Maquinas
                    </Link>
                    <Link href="/dashboard/motors">
                        Motores
                    </Link>
                    <Link href="/dashboard/pumps">
                        Bombas
                    </Link>
                    <Link href="/dashboard/manuals">
                        Manuais
                    </Link>
                    <Link href="/dashboard/users">
                        Usuarios
                    </Link>

                    <form action={handleLogout}>
                        <button type='submit'>
                            <LogOutIcon size={24} color='#000' />
                        </button>
                    </form>
                </nav>
            </div>
        </header >
    )

}