import { Machines } from "./components/machines";
import { api } from "@/services/api"
import { getCookieServer } from "@/lib/cookieServer"
import { MachineProps } from "@/lib/machine.type"

async function getMachines(): Promise<MachineProps[] | []> {

    const token = await getCookieServer();

    try {

        const response = await api.get("/machine/detail", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        console.log(response)

        return response.data || []

    } catch (err) {
        console.log(err);
        return [];
    }


}

export default async function Dashboard() {

    const machines = await getMachines();

    console.log(machines)

    return (
        <>
            <Machines machines={machines} />
        </>
    )
}