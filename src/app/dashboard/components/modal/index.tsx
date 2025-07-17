"use client"
import { useEffect, useRef } from 'react';
import { Modal as BootstrapModal } from 'bootstrap';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { MachineProps } from '@/lib/machine.type';
import styles from './styles.module.scss'

interface Props {
    machine: MachineProps;
    onRequestClose: () => void;
}

export function ModalMachine({ machine, onRequestClose }: Props) {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (modalRef.current) {
            const modalElement = modalRef.current;
            const modalInstance = new BootstrapModal(modalElement);

            modalInstance.show();

            const handleHidden = () => {
                // espera um tico para React desmontar
                setTimeout(() => onRequestClose(), 10);
            };

            modalElement.addEventListener('hidden.bs.modal', handleHidden);

            return () => {
                modalElement.removeEventListener('hidden.bs.modal', handleHidden);
                // modalInstance.hide();
            };
        }
    }, [onRequestClose]);

    return (
        <div
            className="modal fade"
            tabIndex={-1}
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
            ref={modalRef}
        >
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">
                            {machine.name}
                        </h1>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        <img
                            src={machine.image}
                            alt={machine.name}
                            className="img-fluid mb-3 rounded shadow"
                            style={{ maxHeight: "400px", objectFit: "cover" }}
                        />
                        <p><strong>Sector:</strong> {machine.sector}</p>
                        <p><strong>Modelo:</strong> {machine.model}</p>
                        <p><strong>QRCode:</strong> {machine.qrcode}</p>

                        <div id="carouselExampleCaptions" className="carousel slide">
                            <div className="carousel-indicators">
                                {machine.motors.map((_, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        data-bs-target="#carouselExampleCaptions"
                                        data-bs-slide-to={index}
                                        className={index === 0 ? "active" : ""}
                                        aria-current={index === 0 ? "true" : undefined}
                                        aria-label={`Slide ${index + 1}`}
                                    ></button>
                                ))}
                            </div>
                            <div className="carousel-inner">
                                {machine.motors.map((motor, index) => (
                                    <div
                                        key={motor.id}
                                        className={`carousel-item ${index === 0 ? "active" : ""}`}
                                    >
                                        <img
                                            src={motor.image}
                                            className="d-block w-50 m-auto"
                                            alt={motor.name}
                                            height={"300px"}
                                        />
                                        <div className="carousel-caption d-none d-md-block">
                                            <h5>{motor.name}</h5>
                                            <p>{motor.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button
                                className="carousel-control-prev"
                                type="button"
                                data-bs-target="#carouselExampleCaptions"
                                data-bs-slide="prev"
                            >
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button
                                className="carousel-control-next"
                                type="button"
                                data-bs-target="#carouselExampleCaptions"
                                data-bs-slide="next"
                            >
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>

                    </div>
                </div>
                <div className="modal-footer">
                    <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                    >
                        Fechar
                    </button>
                    <button type="button" className="btn btn-primary">
                        Salvar
                    </button>
                </div>
            </div>
        </div >
    );
}
