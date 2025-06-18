"use client"
import styles from './styles.module.scss'
import { UploadCloud } from 'lucide-react'
import { Button } from '@/app/dashboard/components/button'
import { ChangeEvent, useState } from 'react'
import { toast } from 'sonner'
import { getCookieClient } from '@/lib/cookieClient'
import { api } from '@/services/api'


interface MachineProps {
    id: string;
    name: string;
}


interface Prop {
    machines: MachineProps[]
}


export function Form({ machines }: Prop) {

    const [file, setFile] = useState<File>();
    const [previewFile, setPreviewFile] = useState("");


    async function handleRegisterManual(formData: FormData) {

        const title = formData.get("title");
        const description = formData.get("description");
        const machineIndex = formData.get("machine");


        if (!title || !description || !machineIndex || !file) {
            toast.warning("Preencha todos os campos!")
            return;
        }

        const data = new FormData()

        data.append("title", title);
        data.append("description", description);
        data.append("machine_id", machines[Number(machineIndex)].id);
        data.append("file", file);

        const token = getCookieClient()


        api.post("/manual", data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        toast.success("Manual cadastrado com sucesso!")


    }


    function handleFile(e: ChangeEvent<HTMLInputElement>) {

        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];

            const allowedTypes = ["application/pdf"];

            if (!allowedTypes.includes(selectedFile.type)) {
                toast.warning("Arquivo Invalido!")
                return;
            }

            setFile(selectedFile);
            setPreviewFile(URL.createObjectURL(selectedFile));

        }

    }


    return (

        <main className={styles.container}>

            <h1>Cadastrar Manual</h1>

            <form className={styles.form} action={handleRegisterManual} >

                <label className={styles.labelImage}>
                    <span><UploadCloud size={30} color='#000' /></span>
                    <input type="file" accept='application/pdf' name='file' className={styles.input} onChange={handleFile} />

                    {previewFile && (
                        file?.type === "application/pdf" ? (
                            <embed
                                src={previewFile}
                                type='application/pdf'
                                className={styles.preview}
                            />
                        ) : null
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
                    Titulo:
                    <input type="text" name='title' required placeholder='Manual do painel...' className={styles.input} />
                </label>

                <textarea name='description' className={styles.input} placeholder='Digite a descrição do manual'>
                </textarea>

                <Button name='Cadastrar Motor' />

            </form>

        </main>

    )

}