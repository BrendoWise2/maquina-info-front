import { api } from "@/services/api";
import styles from "./page.module.scss";
import mecanimoImg from '/public/imagens/background.jpg'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import path from "path";

export default function Page() {

  async function handleLogin(formData: FormData) {
    "use server"

    const email = formData.get("email");
    const password = formData.get("password");

    if (email === "" || password === "") {
      return;
    }

    try {

      const response = await api.post("/session", {
        email,
        password
      })

      if (!response.data.token) {
        return;
      }

      console.log(response.data);

      const expressTime = 60 * 60 * 24 * 30 * 1000;
      const cookieStore = await cookies();
      cookieStore.set("session", response.data.token, {
        maxAge: expressTime,
        path: "/",
        httpOnly: false,
        secure: process.env.NODE_ENV === "production"
      })

      console.log("Meu token:", cookieStore)

    } catch (err) {
      console.log(err)
      return;
    }

    redirect("/dashboard")

  }

  return (

    <>
      <div className={styles.containerCenter}>


        <section className={styles.login}>
          <h1> Login</h1>
          <form action={handleLogin}>
            <input type="email" required name="email" placeholder="Digite seu email..." className={styles.input} />
            <input type="password" required name="password" placeholder="**********" className={styles.input} />
            <button type="submit">
              Acessar
            </button>

            <Link href="/signup" className={styles.text}>
              Não possui uma conta? Cadastrar-se
            </Link>

          </form>
        </section>
      </div >
    </>

  );
}
