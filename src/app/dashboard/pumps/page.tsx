import { Form } from "./components/form"
import { api } from "@/services/api"
import { getCookieServer } from "@/lib/cookieServer"


export default async function Pump() {

    const token = getCookieServer()

    const response = await api.get("/machine", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    return (
        <Form machines={response.data} />
    )

}