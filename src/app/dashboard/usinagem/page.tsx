import { getCookieServer } from '@/lib/cookieServer';
import { ShowEquipaments } from './components/index'
import { api } from '@/services/api';
import { MachineProps } from '@/lib/machine.type';


async function getMachineUsinagem(): Promise<MachineProps[] | []> {

    const token = await getCookieServer();

    const sectorSelecionado = 'usinagem'

    try {

        const response = await api.get('/machine', {
            params: {
                sector: sectorSelecionado
            }
        })

        return response.data

    } catch (error) {

        console.log(error)
        return [];

    }

}


export default async function Usinagem() {

    const machines = await getMachineUsinagem();

    console.log(machines)

    return (

        <>
            <ShowEquipaments machines={machines} />
        </>

    );
}