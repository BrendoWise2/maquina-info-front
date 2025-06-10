import styles from "./page.module.scss";
import mecanimoImg from '/public/imagens/background.jpg'
import Image from 'next/image'
import Link from 'next/link'

export default function Page() {
  return (

    <>
      <div className={styles.containerCenter}>


        <section className={styles.login}>
          <h1> Login</h1>
          <form>
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
