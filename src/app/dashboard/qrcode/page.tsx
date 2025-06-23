import { api } from '@/services/api';
import { Form } from './components/index'
import { MachineProps } from '@/lib/machine.type'


async function getMachine(qrcodeId: string): Promise<MachineProps[] | []> {

    try {

        const response = await api.get(`/machine/qrcode?qrcode_id=${qrcodeId}`);
        console.log(response);

        return response.data || [];

    } catch (err) {
        console.log(err);
        return [];
    }

}


export default async function Qrcode() {


    return (
        <>
            <Form />
        </>
    );
}