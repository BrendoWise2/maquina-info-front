"use client";

import { useEffect, useRef } from 'react';
import { Modal as BootstrapModal } from 'bootstrap';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { MachineProps } from '@/lib/machine.type';
import styles from './styles.module.scss';

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
                const backdrop = document.querySelector('.modal-backdrop');
                if (backdrop) backdrop.remove();

                setTimeout(() => onRequestClose(), 10);
            };

            modalElement.addEventListener('hidden.bs.modal', handleHidden);

            return () => {
                modalElement.removeEventListener('hidden.bs.modal', handleHidden);
                modalInstance.hide();

                const backdrop = document.querySelector('.modal-backdrop');
                if (backdrop) backdrop.remove();
            };
        }
    }, [onRequestClose]);

    const renderCarousel = (
        items: any[],
        id: string,
        labelKey: string = 'name',
        codsapKey: string = 'codsap'
    ) => {
        if (!items || items.length === 0) return null;

        return (
            <div className={styles.carouselWrapper}>
                <h5 className={styles.carouselTitle}>{id}</h5>
                <div id={id} className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                        {items.map((_, index) => (
                            <button
                                key={index}
                                type="button"
                                data-bs-target={`#${id}`}
                                data-bs-slide-to={index}
                                className={index === 0 ? 'active' : ''}
                                aria-current={index === 0 ? 'true' : undefined}
                                aria-label={`Slide ${index + 1}`}
                            ></button>
                        ))}
                    </div>
                    <div className={`carousel-inner ${styles.carouselInner}`}>
                        {items.map((item, index) => (
                            <div key={item.id} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                                <img
                                    src={item.image}
                                    alt={item[labelKey]}
                                    className={`d-block ${styles.carouselImage}`}
                                />
                                <div className={`carousel-caption ${styles.carouselCaption}`}>
                                    <h6>{item[labelKey]}</h6>
                                    <p>Cod: {item[codsapKey]}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target={`#${id}`} data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target={`#${id}`} data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className={`modal fade ${styles.modalOverlay}`} tabIndex={-1} aria-hidden="true" ref={modalRef}>
            <div className={`modal-dialog modal-xl modal-dialog-centered ${styles.modalDialog}`}>
                <div className={`modal-content ${styles.modalContent}`}>
                    <div className={`modal-header ${styles.modalHeader}`}>
                        <h1 className={`modal-title fs-4 ${styles.modalTitle}`}>
                            {machine.name}
                        </h1>
                        <button
                            type="button"
                            className={`btn-close ${styles.btnClose}`}
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className={`modal-body ${styles.modalBody}`}>
                        <div className="text-center mb-4">
                            <img
                                src={machine.image}
                                alt={machine.name}
                                className={`img-fluid rounded shadow ${styles.machineImage}`}
                            />
                        </div>

                        <div className="row text-center mb-4">
                            <div className="col">
                                <strong>Setor:</strong>
                                <p>{machine.sector}</p>
                            </div>
                            <div className="col">
                                <strong>Modelo:</strong>
                                <p>{machine.model}</p>
                            </div>
                            <div className="col">
                                <strong>QR Code:</strong>
                                <p>{machine.qrcode}</p>
                            </div>
                        </div>

                        {renderCarousel(machine.motors, 'motors')}
                        {renderCarousel(machine.pumps, 'pumps')}
                        {renderCarousel(machine.fusos, 'fusos')}
                        {renderCarousel(machine.encoders, 'encoders')}
                    </div>

                    <div className={`modal-footer ${styles.modalFooter}`}>
                        <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">
                            Fechar
                        </button>
                        <button type="button" className="btn btn-primary">
                            Salvar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
