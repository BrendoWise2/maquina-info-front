import styles from "./styles.module.scss";
import Image from "next/image";
import equipamentoImg from '/public/imagens/celula02.jpg';
import { RefreshCw, HardDrive, Droplets, BookOpen, CalendarCheck } from "lucide-react";

export function Machines() {
    return (
        <main className={styles.container}>
            <section className={styles.containerHeader}>
                <h1>Equipamentos</h1>
                <button>
                    <RefreshCw size={24} color="#0056b3" />
                </button>
            </section>

            <section className={styles.listMachines}>

                {/* --- Card 1: Status OK --- */}
                <div className={`${styles.machineItem} ${styles.ok}`}>
                    <div className={styles.cardHeader}>
                        <h2>Célula 01</h2>
                    </div>
                    <div className={styles.cardBody}>
                        <div className={styles.imageContainer}>
                            <Image
                                alt="Célula 01"
                                src={equipamentoImg}
                                layout="responsive"
                                width={100}
                                height={100}
                                quality={100}
                            />
                        </div>
                        <div className={styles.infoContainer}>
                            <p><HardDrive size={16} /> <span>5 Motores</span></p>
                            <p><Droplets size={16} /> <span>3 Bombas</span></p>
                            <p><BookOpen size={16} /> <span>2 Manuais</span></p>
                        </div>
                    </div>
                    <div className={styles.cardFooter}>
                        <p><CalendarCheck size={16} /> <span>Última Inspeção: 10/05/2025</span></p>
                    </div>
                </div>

                {/* --- Card 2: Status Alerta --- */}
                <div className={`${styles.machineItem} ${styles.parado}`}>
                    <div className={styles.cardHeader}>
                        <h2>Prensa 01</h2>
                    </div>
                    <div className={styles.cardBody}>
                        <div className={styles.imageContainer}>
                            <Image
                                alt="Prensa 01"
                                src={equipamentoImg}
                                layout="responsive"
                                width={100}
                                height={100}
                                quality={100}
                            />
                        </div>
                        <div className={styles.infoContainer}>
                            <p><HardDrive size={16} /> <span>2 Motores</span></p>
                            <p><Droplets size={16} /> <span>1 Bomba</span></p>
                            <p><BookOpen size={16} /> <span>1 Manual</span></p>
                        </div>
                    </div>
                    <div className={styles.cardFooter}>
                        <p><CalendarCheck size={16} /> <span>Última Inspeção: 01/03/2025</span></p>
                    </div>
                </div>

            </section>
        </main>
    )
}