import styles from "./styles.module.scss";
import Image from "next/image";
import equipamentoImg from '/public/imagens/celula02.jpg';
import { RefreshCw, HardDrive, Droplets, BookOpen, CalendarCheck } from "lucide-react";
import { MachineProps } from '@/lib/machine.type'


interface Props {
    machines: MachineProps[];
}

export function Machines({ machines }: Props) {
    return (
        <main className={styles.container}>
            <section className={styles.containerHeader}>
                <h1>Equipamentos</h1>
                <button>
                    <RefreshCw size={24} color="#0056b3" />
                </button>
            </section>

            <section className={styles.listMachines}>
                {machines.map(machine => (
                    <button key={machine.id} className={styles.buttonCard}>
                        <div className={`${styles.machineItem} ${styles.ok}`}>
                            <div className={styles.cardHeader}>
                                <h2>{machine.name}</h2>
                            </div>
                            <div className={styles.cardBody}>
                                <div className={styles.imageContainer}>
                                    <Image
                                        alt={machine.name}
                                        src={equipamentoImg}
                                        layout="responsive"
                                        width={100}
                                        height={100}
                                        quality={100}
                                    />
                                </div>
                                <div className={styles.infoContainer}>
                                    <p><HardDrive size={16} /> <span>{machine.motors.length}</span></p>
                                    <p><Droplets size={16} /> <span>{machine.pumps.length}</span></p>
                                    <p><BookOpen size={16} /> <span>{machine.manuals.length}</span></p>
                                </div>
                            </div>
                            <div className={styles.cardFooter}>
                                <p><CalendarCheck size={16} /> <span>Última Inspeção: 10/05/2025</span></p>
                            </div>
                        </div>
                    </button>
                ))}

            </section>
        </main>
    )
}