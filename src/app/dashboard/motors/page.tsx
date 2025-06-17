import { Form } from './components/form/index'
import { api } from '@/services/api'
import { getCookieServer } from '@/lib/cookieServer'


export default async function Motor() {

    const token = getCookieServer();

    const response = await api.get("/machine", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    return (
        <Form machines={response.data} />
    )
}