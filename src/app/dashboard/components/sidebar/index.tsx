"use client"
import Link from 'next/link'
import styles from './styles.module.scss'
import Image from 'next/image'
import logoImg from '/public/imagens/mecanico.png'
import { LogOutIcon } from 'lucide-react'
import { deleteCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';

import {
    CSidebar,
    CSidebarHeader,
    CSidebarBrand,
    CSidebarNav,
    CNavItem,
    CNavTitle,
    CNavGroup,
    CSidebarToggler
} from '@coreui/react';


export function SideBar() {

    const router = useRouter();

    const [visible, setVisible] = useState(true);  // Controla se o sidebar está visível

    // Use useEffect para carregar o JS do Bootstrap no cliente
    useEffect(() => {
        // Carrega os JS necessários para o Bootstrap e CoreUI
        Promise.all([
            import('bootstrap/dist/js/bootstrap.bundle.min.js'),
            import('@coreui/coreui/dist/js/coreui.bundle.min.js')
        ]);
    }, []);  // O array vazio garante que o useEffect seja executado apenas uma vez, quando o componente for montado

    async function handleLogout() {
        deleteCookie("session", { path: "/" })
        toast.success("Logout com sucesso!")
        router.replace("/")
    }

    return (
        <>
            {/* Sidebar CoreUI - Menu aberto por padrão */}
            < CSidebar className="sidebar-dark border-end" visible={visible} >
                <CSidebarHeader className="border-bottom">
                    <CSidebarBrand>DASHBOARD</CSidebarBrand>
                    <img src={logoImg.src} width={60} alt="logo dashboard" />
                </CSidebarHeader>

                <CSidebarNav>
                    <CNavTitle>SETORES</CNavTitle>

                    <CNavItem href="#">
                        Fundição <span className="badge bg-primary ms-auto">47</span>
                        <i className="nav-icon cil-speedometer"></i>
                    </CNavItem>
                    <CNavItem href="#">
                        IMF <span className="badge bg-primary ms-auto">13</span>
                        <i className="nav-icon cil-speedometer"></i>
                    </CNavItem>
                    <CNavItem href="#">
                        USINAGEM <span className="badge bg-primary ms-auto">19</span>
                        <i className="nav-icon cil-speedometer"></i>
                    </CNavItem>

                    <CNavGroup toggler="Info">
                        <CNavItem href="#">Nav dropdown item</CNavItem>
                        <CNavItem href="#">Nav dropdown item</CNavItem>
                    </CNavGroup>

                    <CNavItem href="https://coreui.io">Configurações</CNavItem>
                    <CNavItem href="https://coreui.io/pro/">
                        BrendoWise <strong>@</strong>
                    </CNavItem>
                </CSidebarNav>

                <CSidebarToggler onClick={() => setVisible(!visible)} />
            </CSidebar >
        </>
    );

}