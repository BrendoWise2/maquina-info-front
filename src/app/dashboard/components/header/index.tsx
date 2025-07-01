"use client"
import Link from 'next/link'
import styles from './styles.module.scss'
import Image from 'next/image'
import logoImg from '/public/imagens/logoDash2.png'
import { LogOutIcon } from 'lucide-react'
import { deleteCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';


export function Header() {
    const router = useRouter();

    // Use useEffect para carregar o JS do Bootstrap no cliente
    useEffect(() => {
        // A importação dinâmica garante que o código só rode no lado do cliente (navegador)
        import('bootstrap/dist/js/bootstrap.bundle.min.js');
    }, []);

    async function handleLogout() {
        deleteCookie("session", { path: "/" })
        toast.success("Logout com sucesso!")
        router.replace("/")
    }

    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>

                <nav className="navbar navbar-expand-sm navbar-dark bg-primary shadow-sm">
                    <div className="container-fluid d-flex justify-content-between align-items-center">

                        <Link className="navbar-brand d-flex align-items-center" href="/dashboard">
                            <Image
                                alt="logo dashboard"
                                src={logoImg}
                                width={50}
                                height={50}
                                priority={true}
                                quality={100}
                                className="me-2"
                            />
                            <span className="fw-bold text-white">Dashboard</span>
                        </Link>

                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarNav"
                            aria-controls="navbarNav"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                            <ul className="navbar-nav mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link href="/dashboard/machines" className='nav-link text-white fw-semibold px-3 py-2'>Maquinas</Link>
                                </li>
                                <li className="nav-item">
                                    <Link href="/dashboard/motors" className='nav-link text-white fw-semibold px-3 py-2'>Motores</Link>
                                </li>
                                <li className="nav-item">
                                    <Link href="/dashboard/pumps" className='nav-link text-white fw-semibold px-3 py-2'>Bombas</Link>
                                </li>
                                <li className="nav-item">
                                    <Link href="/dashboard/manuals" className='nav-link text-white fw-semibold px-3 py-2'>Manuais</Link>
                                </li>
                                <li className="nav-item">
                                    <Link href="/dashboard/users" className='nav-link text-white fw-semibold px-3 py-2'>Usuarios</Link>
                                </li>
                                <li className="nav-item">
                                    <Link href="/dashboard/qrcode" className='nav-link text-white fw-semibold px-3 py-2'>Qrcode</Link>
                                </li>
                                <li className="nav-item">
                                    <Link href="/dashboard/teste" className='nav-link text-white fw-semibold px-3 py-2'>Teste</Link>
                                </li>
                                <li className="nav-item">
                                    <form action={handleLogout} className='d-inline'>
                                        <button type='submit' className='btn btn-link nav-link text-white px-3 py-2'>
                                            <LogOutIcon size={20} color='white' />
                                        </button>
                                    </form>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>




            </div>
        </header >
    )

}