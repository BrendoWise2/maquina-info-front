import styles from "./styles.module.scss";
import { RefreshCw, HardDrive, Droplets, BookOpen, CalendarCheck, Hammer, SmartphoneNfc } from "lucide-react";
import { MachineProps } from '@/lib/machine.type'


interface Props {
    machines: MachineProps[];
}

export function Machines({ machines }: Props) {
    return (
        <main className={`container-fluid ${styles.mainNoPadding}`}>
            <section className={styles.containerHeader}>
                <h1>Equipamentos</h1>
                <button>
                    <RefreshCw size={24} color="#0056b3" />
                </button>
            </section>

            <section className="row gx-3">
                {machines.map(machine => (
                    <button key={machine.id} className={`col-12 col-sm-6 col-md-5 col-lg-4 mb-4 ${styles.buttonCard}`}>
                        <div className={`${styles.machineItem} ${styles.ok}`}>
                            <div className={styles.cardHeader}>
                                <h2>{machine.name}</h2>
                            </div>
                            <div className={styles.cardBody}>
                                <div className={styles.imageContainer}>
                                    <img
                                        alt={machine.name}
                                        src={machine.image}
                                        className="img-fluid rounded mx-auto d-block shadow w-100" />
                                </div>
                                <div className={styles.infoContainer}>
                                    <p><HardDrive size={16} /> Motores: <span>{machine.motors.length}</span></p>
                                    <p><Droplets size={16} /> Bombas: <span>{machine.pumps.length}</span></p>
                                    <p><BookOpen size={16} /> Manuais: <span>{machine.manuals.length}</span></p>
                                    <p><Hammer size={16} /> Fusos: <span>{machine.fusos.length}</span></p>
                                    <p><SmartphoneNfc size={16} /> Encoders: <span>{machine.encoders.length}</span></p>
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
    );
}
