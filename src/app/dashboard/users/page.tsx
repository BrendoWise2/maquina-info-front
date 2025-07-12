import { getCookieServer } from '@/lib/cookieServer'
import { ShowUser } from './components/index'
import { api } from '@/services/api';


export default async function Users() {

    const token = await getCookieServer();

    const response = await api.get('/allusers', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    return (
        <ShowUser users={response.data} />
    )

}