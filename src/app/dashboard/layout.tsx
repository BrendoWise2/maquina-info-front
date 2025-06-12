import { Header } from './components/header/index'


export default function DashboardLayout({ children }: { children: React.ReactNode }) {

    return (
        <>
            <Header />
            {children}
        </>
    )
}