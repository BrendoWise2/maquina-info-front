import { Form } from './components/form/index'
import { api } from '@/services/api'
import { getCookieServer } from '@/lib/cookieServer'


export default async function Fuso() {

    const token = await getCookieServer();

    const response = await api.get("/machine", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    return (
        <Form machines={response.data} />
    )
}