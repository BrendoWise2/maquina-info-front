"use client"
import styles from './styles.module.scss'
import { UploadCloud } from 'lucide-react'
import { Button } from "@/app/dashboard/components/button"
import { ChangeEvent, useState } from 'react'
import { toast } from 'sonner'
import Image from 'next/image'
import { api } from '@/services/api'
import { getCookieClient } from '@/lib/cookieClient'

interface MachineProps {
    id: string;
    name: string;
    qrcode: string
}

interface Props {
    machines: MachineProps[]
}

export function Form({ machines }: Props) {

    const [image, setImage] = useState<File>();
    const [previewImage, setPreviewImage] = useState("");

    function handleFile(e: ChangeEvent<HTMLInputElement>) {

        if (e.target.files && e.target.files[0]) {
            const image = e.target.files[0];

            if (image.type !== "image/jpeg" && image.type !== "image/png") {
                toast.warning("Formato Invalido!");
                return;
            }

            setImage(image);
            setPreviewImage(URL.createObjectURL(image));

        }

    }

    async function handleRegisterEncoder(formData: FormData) {

        const machineIndex = formData.get("machine");
        const name = formData.get("name");
        const local = formData.get("local");
        const codsap = formData.get("codsap");

        if (!machineIndex || !name || !local || !codsap || !image) {
            toast.warning("Preenche todos os campos!")
            return;
        }

        console.log("APARECENDO ID:", machineIndex);

        const data = new FormData();

        data.append("name", name);
        data.append("local", local);
        data.append("codsap", codsap);
        data.append("machineId", machines[Number(machineIndex)].id);
        data.append("file", image);

        const token = await getCookieClient();

        await api.post("/encoder", data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        toast.success("sucesso!!")
    }


    return (
        <main className={styles.container}>

            <h1>Cadastrar Encoder</h1>

            <form className={styles.form} action={handleRegisterEncoder} >

                <label className={styles.labelImage}>
                    <span><UploadCloud size={30} color='#000' /></span>
                    <input type="file" accept='image/png, image/jpeg' name='image' className={styles.input} onChange={handleFile} />

                    {previewImage && (
                        <Image

                            alt="Imagem de preview"
                            src={previewImage}
                            className={styles.preview}
                            fill={true}
                            quality={100}
                            priority={true}
                        />
                    )}

                </label>

                <select name='machine'>
                    {machines.map((machine, index) => (
                        <option key={machine.id} value={index}>
                            {machine.name}
                        </option>
                    ))}
                </select>

                <label>
                    Encoder:
                    <input type="text" name='name' required placeholder='Nome do encoder...' className={styles.input} />
                </label>

                <label>
                    Local:
                    <input type="text" name='local' required placeholder='Eixo XB' className={styles.input} />
                </label>

                <label>
                    Código Sap:
                    <input type="text" name='codsap' required placeholder='3009999' className={styles.input} />
                </label>

                <Button name='Cadastrar Encoder' />

            </form>

        </main>
    )

}