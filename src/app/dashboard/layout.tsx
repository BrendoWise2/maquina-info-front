import 'bootstrap/dist/css/bootstrap.min.css'
import { Header } from './components/header/index'
import { Toaster } from 'sonner'


export default function DashboardLayout({ children }: { children: React.ReactNode }) {

    return (
        <>
            <Header />
            <Toaster position='bottom-right' toastOptions={{
                style: {
                    backgroundColor: "#f1f1f1",
                    color: "#131313",
                    borderColor: " rgba(255, 255, 255, 0.5)"
                }

            }
            } />
            {children}
        </>
    )
}