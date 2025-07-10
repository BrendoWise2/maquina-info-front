import { getCookieServer } from "@/lib/cookieServer";
import { api } from "@/services/api";
import { Form } from './components/form/index'



export default async function Encoder() {

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