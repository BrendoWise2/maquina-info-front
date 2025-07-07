"use client"
import 'bootstrap/dist/css/bootstrap.min.css'
import { Header } from './components/header/index'
import { Toaster } from 'sonner'
import { useState, useEffect } from 'react';
import { CSidebar, CSidebarHeader, CSidebarBrand, CSidebarNav, CNavItem, CSidebarToggler } from '@coreui/react';
import "../globals.scss";
import styles from "../page.module.scss";



export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setSidebarOpen] = useState(true); // Controla a visibilidade do sidebar

    // UseEffect para aplicar a classe de expansão do sidebar
    useEffect(() => {
        const sidebar = document.querySelector('.sidebar');
        if (sidebar) {
            if (isSidebarOpen) {
                sidebar.classList.add('sidebar-expanded');
                sidebar.classList.remove('sidebar-collapsed');
            } else {
                sidebar.classList.add('sidebar-collapsed');
                sidebar.classList.remove('sidebar-expanded');
            }
        }
    }, [isSidebarOpen]);

    return (
        <>

            {/* Header */}
            <Header />

            {/* Conteúdo principal */}
            <main className={styles.mainContent}>
                {children}
            </main>
        </>
    );
}