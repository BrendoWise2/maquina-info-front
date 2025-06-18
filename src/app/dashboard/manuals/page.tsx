import { Form } from './components/form'
import { getCookieServer } from '@/lib/cookieServer'
import { api } from '@/services/api'

export default async function Manual() {

    const token = getCookieServer();

    const response = await api.get('/machine', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    return (
        <Form machines={response.data} />
    )

}