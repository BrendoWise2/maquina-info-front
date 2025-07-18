import styles from "../page.module.scss";
import mecanimoImg from '/public/imagens/background.jpg'
import Image from 'next/image'
import Link from 'next/link'
import { api } from '@/services/api'
import { redirect } from 'next/navigation'

export default function Page() {

    async function handleRegister(formData: FormData) {
        "use server"

        const name = formData.get("name");
        const email = formData.get('email');
        const password = formData.get('password')

        if (name === "" || email === "" || password === "") {
            console.log("Preencha todos os dados")
            return;
        }

        try {
            await api.post("/users", {
                name,
                email,
                password
            })
        } catch (err) {
            console.log("error")
            console.log(err)
        }

        redirect('/')
    }

    return (

        <>
            <div className={styles.containerCenter}>


                <section className={styles.login}>
                    <h1> Registrar</h1>
                    <form action={handleRegister}>
                        <input type="text" required name="name" placeholder="Digite seu nome..." className={styles.input} />
                        <input type="email" required name="email" placeholder="Digite seu email..." className={styles.input} />
                        <input type="password" required name="password" placeholder="**********" className={styles.input} />
                        <button type="submit">
                            Cadastrar
                        </button>

                        <Link href="/" className={styles.text}>
                            Já possui uma conta? Faça login
                        </Link>

                    </form>
                </section>
            </div >
        </>

    );
}
