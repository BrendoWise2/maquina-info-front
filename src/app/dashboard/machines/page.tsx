import { Form } from './components/form/index'
import { getCookieServer } from '@/lib/cookieServer'
import { api } from '@/services/api'

export default async function Machines() {

    const token = getCookieServer();

    const response = await api.get("/machine", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    return (
        <Form />
    )

}