'use client'

import { useEffect } from 'react';
import Image from 'next/image';
import logoImagem from '/public/imagens/logoDash2.png';
import { HardDrive, Droplets, BookOpen } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function () {
    // Use useEffect para carregar o JS do Bootstrap no cliente
    useEffect(() => {
        // A importação dinâmica garante que o código só rode no lado do cliente (navegador)
        import('bootstrap/dist/js/bootstrap.bundle.min.js');
    }, []);

    return (
        <div className="card shadow-lg border-0 rounded-4 p-4 text-center" style={{ maxWidth: '400px' }}>
            <Image
                src={logoImagem}
                alt="Imagem do Equipamento"
                className="card-img-top rounded-3 mb-3"
                style={{ maxHeight: '250px', objectFit: 'cover' }}
            />
            <div className="card-body">
                <h4 className="card-title mb-3 text-primary fw-bold">Celula 01</h4>
                <div className="d-flex align-items-center justify-content-center">
                    <p><HardDrive size={16} /> <span></span></p>
                    <p><Droplets size={16} /> <span></span></p>
                    <p><BookOpen size={16} /> <span></span></p>
                </div>

                {/* Accordion para Motores */}
                <div className="accordion" id="accordionMotores">
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingMotores">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseMotores" aria-expanded="false" aria-controls="collapseMotores">
                                <div className="d-flex align-items-center gap-2">
                                    <HardDrive size={16} /> <span>Lista de Motores</span>
                                </div>
                            </button>
                        </h2>
                        <div id="collapseMotores" className="accordion-collapse collapse" aria-labelledby="headingMotores" data-bs-parent="#accordionMotores">
                            <div className="accordion-body text-start">
                                {/* Conteúdo da lista de motores */}
                                <p>Conteúdo de Motores</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Accordion para Bombas */}
                <div className="accordion" id="accordionBombas">
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingBombas">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseBombas" aria-expanded="false" aria-controls="collapseBombas">
                                <div className="d-flex align-items-center gap-2">
                                    <Droplets size={16} /> <span>Lista de Bombas</span>
                                </div>
                            </button>
                        </h2>
                        <div id="collapseBombas" className="accordion-collapse collapse" aria-labelledby="headingBombas" data-bs-parent="#accordionBombas">
                            <div className="accordion-body text-start">
                                {/* Conteúdo da lista de bombas */}
                                <p>Conteúdo de Bombas</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Accordion para Manuais */}
                <div className="accordion" id="accordionManuais">
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingManuais">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseManuais" aria-expanded="false" aria-controls="collapseManuais">
                                <div className="d-flex align-items-center gap-2">
                                    <BookOpen size={16} /> <span>Lista de Manuais</span>
                                </div>
                            </button>
                        </h2>
                        <div id="collapseManuais" className="accordion-collapse collapse" aria-labelledby="headingManuais" data-bs-parent="#accordionManuais">
                            <div className="accordion-body text-start">
                                {/* Conteúdo da lista de manuais */}
                                <p>Conteúdo de Manuais</p>
                            </div>
                        </div>
                    </div>
                </div>

                <button className="btn btn-outline-secondary w-100 mt-3">
                    Voltar
                </button>
            </div>
        </div>
    );
}