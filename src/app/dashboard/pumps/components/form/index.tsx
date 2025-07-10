"use client"
import styles from './styles.module.scss'
import { UploadCloud } from 'lucide-react'
import { Button } from '@/app/dashboard/components/button'
import { ChangeEvent } from 'react';
import { toast } from 'sonner'
import { useState } from 'react'
import Image from 'next/image'
import { getCookieClient } from '@/lib/cookieClient'
import { api } from '@/services/api'


interface MachineProps {
    id: string;
    name: string;
}


interface Props {
    machines: MachineProps[];
}


export function Form({ machines }: Props) {

    const [image, setImage] = useState<File>();
    const [previewImage, setPreviewImage] = useState("");


    async function handleRegisterPump(formData: FormData) {

        const name = formData.get("name");
        const type = formData.get("type");
        const description = formData.get("description");
        const manufacturer = formData.get("manufacturer");
        const codsap = formData.get("codsap");
        const machineIndex = formData.get("machine");

        if (!name || !type || !description || !manufacturer || !machineIndex || !codsap || !image) {
            toast.warning("Preencha todos os campos!")
            return;
        }

        const data = new FormData();

        data.append("name", name);
        data.append("type", type);
        data.append("description", description);
        data.append("manufacturer", manufacturer);
        data.append("codsap", codsap);
        data.append("machineId", machines[Number(machineIndex)].id);
        data.append("file", image);

        const token = await getCookieClient()

        api.post("/pump", data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        toast.success("Bomba cadastrado com sucesso!")

    }


    function handleFile(e: ChangeEvent<HTMLInputElement>) {

        if (e.target.files && e.target.files[0]) {
            const image = e.target.files[0];

            if (image.type !== "image/jpeg" && image.type !== "image/png") {
                toast.warning("Formato Invalido")
                return;
            }

            setImage(image);
            setPreviewImage(URL.createObjectURL(image));

        }

    }

    return (

        <main className={styles.container}>

            <h1>Cadastrar Bomba</h1>

            <form className={styles.form} action={handleRegisterPump}>

                <label className={styles.labelImage}>
                    <UploadCloud size={30} color='#000' />
                    <input type='file' accept='imagem/png, imagem/jpeg' name='imagem' className={styles.input} onChange={handleFile} />

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

                <label>Name:
                    <input type='text' name='name' required placeholder='Nome de bomba' className={styles.input} />
                </label>

                <label> Tipo:
                    <input type='text' name='type' required placeholder='Tipo de motor' className={styles.input} />
                </label>

                <label>Fabricante:
                    <input type='text' name='manufacturer' required placeholder='Okuma' className={styles.input} />
                </label>

                <label>
                    Código Sap:
                    <input type="text" name='codsap' required placeholder='3009999' className={styles.input} />
                </label>

                <textarea name='description' placeholder='Digite a descricao da bomba' className={styles.input}>

                </textarea>

                <Button name='Cadastrar Bomba' />

            </form>
        </main>

    );

}