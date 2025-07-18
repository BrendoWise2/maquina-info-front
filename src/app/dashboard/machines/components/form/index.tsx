"use client"
import styles from "./styles.module.scss"
import { UploadCloud } from 'lucide-react'
import { Button } from '@/app/dashboard/components/button'
import { ChangeEvent, useState } from "react"
import Image from "next/image"
import { api } from "@/services/api"
import { getCookieClient } from "@/lib/cookieClient"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { machine } from "os"

export function Form() {
    const router = useRouter();
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
            setPreviewImage(URL.createObjectURL(image))

        }
    }

    async function handleRegisterMachine(formData: FormData) {

        const token = await getCookieClient();

        const name = formData.get("name");
        // const qrcode = formData.get("qrcode");
        const sector = formData.get("sector");
        const model = formData.get("model");

        if (!name || !sector || !image || !model) {
            toast.warning("Preencha todos os campos!")
            return;
        }

        const data = new FormData();

        data.append("name", name);
        //data.append("qrcode", qrcode);
        data.append("sector", sector);
        data.append("model", model);
        data.append("file", image);

        await api.post("/machine", data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .catch((err) => {
                console.log(err);
                toast.error("Falha no cadastro !")
                return;
            })

        toast.success("Equipamento cadastrado com sucesso!")
        router.push("/dashboard");
    }

    return (
        <main className={styles.container}>
            <h1>Cadastrar Equipamento</h1>

            <form className={styles.form} action={handleRegisterMachine}>
                <label className={styles.labelImage}>
                    <span>
                        <UploadCloud size={30} color="#000" />
                    </span>
                    <input type="file" accept="image/png, image/jpeg" name="imagem" placeholder="Escolher imagem" required className={styles.input} onChange={handleFile} />

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

                <label> Equipamento:
                    <input type="text" name="name" placeholder="Usinagem..." className={styles.input} />
                </label>

                <label> Setor:
                    <select name="sector" className={styles.input}>
                        <option value="Fundicao">Fundição</option>
                        <option value="Imf">Imf</option>
                        <option value="Usinagem">Usinagem</option>
                    </select>
                </label>

                <label>Modelo:
                    <input type="text" name="model" placeholder="Fanuc-65X" className={styles.input} />
                </label>

                <Button name="Cadastrar" />
            </form>
        </main>
    )
}