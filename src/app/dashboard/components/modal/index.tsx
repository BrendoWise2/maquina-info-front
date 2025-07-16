import { MachineProps } from '@/lib/machine.type'
import styles from './styles.module.scss'

interface Props {
    machines: MachineProps[];
}


export function ModalMachine({ machines }: Props) {

    return (
        <>
            {
                machines.map(machine => (

                    <div className="modal fade" id="modalMachine" tabIndex={-1} role="dialog">
                        <div className="modal-dialog modal-xl" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">{machine.name}</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <div className="text-center mb-3">
                                        <img
                                            src={machine.image}
                                            alt={machine.name}
                                            className="img-fluid rounded shadow"
                                            style={{ maxHeight: '400px', objectFit: 'contain' }}
                                        />
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6">
                                            <p><strong>Setor:</strong> {machine.sector}</p>
                                            <p><strong>Modelo:</strong> {machine.model}</p>
                                            <p><strong>ID:</strong> {machine.id}</p>
                                        </div>
                                        <div className="col-md-6">
                                            <p><strong>Motores:</strong> {machine.motors.length}</p>
                                            <p><strong>Bombas:</strong> {machine.pumps.length}</p>
                                            <p><strong>Manuais:</strong> {machine.manuals.length}</p>
                                            <p><strong>Fusos:</strong> {machine.fusos.length}</p>
                                            <p><strong>Encoders:</strong> {machine.encoders.length}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                                    <button type="button" className="btn btn-primary">Salvar mudanças</button>
                                </div>
                            </div>
                        </div>
                    </div>

                ))
            }

        </>

    )

}