"use client"
import styles from './styles.module.scss'
import { useState, useEffect } from 'react'
import { QrcodeScanner } from './qrcodeScanner'
import { MachineProps } from '@/lib/machine.type'
import { api } from '@/services/api'
import 'bootstrap/dist/css/bootstrap.min.css';
import { HardDrive, Droplets, BookOpen, Hammer, SmartphoneNfc } from 'lucide-react'
import manualLogo from '/public/imagens/util/manual.png'
import { getCookieClient } from '@/lib/cookieClient'


export function Form() {

    const [showScanner, setShowScanner] = useState(false);
    const [machine, setMachine] = useState<MachineProps | null>(null);  // Definindo o tipo do estado como `null | boolean` para mais clareza

    const [valueId, setValueId] = useState("")

    // Use useEffect para carregar o JS do Bootstrap no cliente
    useEffect(() => {
        // A importação dinâmica garante que o código só rode no lado do cliente (navegador)
        import('bootstrap/dist/js/bootstrap.bundle.min.js');
    }, []);

    // Função a ser chamada quando o QR code for escaneado com sucesso
    async function handleScanSuccess(qrcodeId: string) {
        console.log("QR Code Lido:", qrcodeId);
        try {
            const response = await api.get('/machine/qrcode', {
                params: { qrcode_id: qrcodeId }
            });

            if (response.data) {
                setMachine(response.data);
                setShowScanner(false);
            } else {
                alert("Máquina não encontrada!");
            }
        } catch (err) {
            console.error(err);
            alert("Erro ao buscar a máquina.");
        }
    }


    async function handleFindMachine() {

        const token = await getCookieClient()

        try {

            const response = await api.get('/machine/qrcode', {
                params: {
                    qrcode_id: valueId
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            console.log("sucesso")
            if (response.data) {
                setMachine(response.data)
                setValueId('')
                setShowScanner(false)
                console.log("Máquina encontrada com sucesso!");
            } else {
                alert("Máquina não encontrada com o ID fornecido.");
                console.log("Resposta da API vazia para o ID:", valueId);
            }

        } catch (error) {
            console.log("erro: ");
        }

    }


    return (
        <main className="container-fluid d-flex flex-column justify-content-center align-items-center border p-4">
            <section>
                <h1 className="text-center mb-4">QRCODE</h1>
                <div className="d-flex flex-column align-items-center gap-3">
                    {!machine ? (
                        // Exibe o scanner QR Code se `machine` for `null`
                        !showScanner ? (
                            <>
                                <img
                                    src="/imagens/util/scan-qrcode3.png"
                                    width={250}
                                    height={250}
                                    className="rounded mx-auto d-block border"
                                    alt="Imagem do Equipamento"
                                />
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => setShowScanner(true)} // Ativa o scanner
                                >
                                    Escanear QR Code
                                </button>

                                <input
                                    type="text"
                                    placeholder="Id do equipamento"
                                    className="form-control w-100 " id='bnt-id'
                                    value={valueId}
                                    onChange={(e) => setValueId(e.target.value)}
                                />
                                <button type="button" className="btn btn-dark" onClick={handleFindMachine}>
                                    Procurar
                                </button>
                            </>

                        ) : (
                            // Exibe o scanner QR Code quando `showScanner` for `true`
                            <QrcodeScanner onScanSuccess={handleScanSuccess} />
                        )
                    ) : (
                        <div className="card shadow-lg border-0 rounded-4 p-4 text-center" style={{ maxWidth: '400px' }}>
                            <img
                                src={machine.image}
                                alt="Imagem do Equipamento"
                                className="card-img-top rounded-3 mb-3"
                                style={{ maxHeight: '250px', objectFit: 'cover' }}
                            />
                            <div className="card-body">
                                <h4 className="card-title mb-3 text-primary fw-bold">{machine.name}</h4>
                                <p>{machine.model}</p>
                                <div className="d-flex align-items-center justify-content-space-between gap-3">
                                    <p className={styles.description}><HardDrive size={16} /> Motores: <span>{machine.motors.length}</span></p>
                                    <p className={styles.description}><Droplets size={16} /> Bombas: <span> {machine.pumps.length}</span></p>
                                    <p className={styles.description}><BookOpen size={16} /> Manuais: <span>{machine.manuals.length}</span></p>
                                    <p className={styles.description}><Hammer size={16} /> Fusos: <span>{machine.fusos.length}</span></p>
                                    <p className={styles.description}><SmartphoneNfc size={16} /> Encoders: <span>{machine.encoders.length}</span></p>
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
                                                {machine.motors.map(motor => (
                                                    <div className="card" style={{ width: "18rem" }} key={motor.id}>
                                                        <img src={motor.image} className="card-img-top" alt={motor.name} />
                                                        <div className="card-body">
                                                            <h5 className="card-title text-warning fw-bold">{motor.name}</h5>
                                                            <p className="card-text description"><span>Potência:</span> {motor.power}</p>
                                                            <p className="card-text"><span>Fabricante:</span> {motor.manufacturer}</p>
                                                            <p className="card-text"><span>Código Sap:</span> {motor.codsap}</p>
                                                            <p className="card-text"><span>Descrição:</span> {motor.description}</p>
                                                            <a href="#" className="btn btn-primary">Subir</a>
                                                        </div>
                                                    </div>
                                                ))}

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
                                                {machine.pumps.map(pump => (
                                                    <div className="card" style={{ width: "18rem" }} key={pump.id}>
                                                        <img src={pump.image} className="card-img-top" alt={pump.name} />
                                                        <div className="card-body">
                                                            <h5 className="card-title text-warning fw-bold">{pump.name}</h5>
                                                            <p className="card-text description"><span>Tipo:</span> {pump.type}</p>
                                                            <p className="card-text"><span>Fabricante:</span> {pump.manufacturer}</p>
                                                            <p className="card-text"><span>Código Sap:</span> {pump.codsap}</p>
                                                            <p className="card-text"><span>Descrição:</span> {pump.description}</p>
                                                            <a href="#" className="btn btn-primary">Subir</a>
                                                        </div>
                                                    </div>
                                                ))}

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
                                                    <Hammer size={16} /> <span>Lista de Manuais</span>
                                                </div>
                                            </button>
                                        </h2>
                                        <div id="collapseManuais" className="accordion-collapse collapse" aria-labelledby="headingManuais" data-bs-parent="#accordionManuais">
                                            <div className="accordion-body text-start">

                                                {/* Conteúdo da lista de manuais */}
                                                {machine.manuals.map(manual => (

                                                    <div className="card" style={{ width: "18rem" }} key={manual.id}>
                                                        <img src={manualLogo.src} className="card-img-top mx-auto d-block img-fluid w-75" alt={manual.title} />
                                                        <div className="card-body">
                                                            <h5 className="card-title text-warning fw-bold">{manual.title}</h5>
                                                            <p className="card-text"><span>Descrição:</span> {manual.description}</p>
                                                            <a href={manual.file_url} className="btn btn-primary mx-auto d-block">Visualizar</a>
                                                        </div>
                                                    </div>
                                                ))}

                                                <p>Conteúdo de Manuais</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Accordion para Fusos */}
                                <div className="accordion" id="accordionFusos">
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingFusos">
                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFusos" aria-expanded="false" aria-controls="collapseFusos">
                                                <div className="d-flex align-items-center gap-2">
                                                    <Hammer size={16} /> <span>Lista de Fusos</span>
                                                </div>
                                            </button>
                                        </h2>
                                        <div id="collapseFusos" className="accordion-collapse collapse" aria-labelledby="headingFusos" data-bs-parent="#accordionFusos">
                                            <div className="accordion-body text-start">
                                                {/* Conteúdo da lista de motores */}
                                                {machine.fusos.map(fuso => (
                                                    <div className="card" style={{ width: "18rem" }} key={fuso.id}>
                                                        <img src={fuso.image} className="card-img-top" alt={fuso.name} />
                                                        <div className="card-body">
                                                            <h5 className="card-title text-warning fw-bold">{fuso.name}</h5>
                                                            <p className="card-text description"><span>Potência:</span> {fuso.power}</p>
                                                            <p className="card-text"><span>Fabricante:</span> {fuso.manufacturer}</p>
                                                            <p className="card-text"><span>Código Sap:</span> {fuso.codsap}</p>
                                                            <p className="card-text"><span>Descrição:</span> {fuso.description}</p>
                                                            <a href="#" className="btn btn-primary">Subir</a>
                                                        </div>
                                                    </div>
                                                ))}

                                                <p>Conteúdo de Fusos</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Accordion para Encoders */}
                                <div className="accordion" id="accordionEncoders">
                                    <div className="accordion-item">
                                        <h2 className="accordion-header" id="headingEncoders">
                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseEncoders" aria-expanded="false" aria-controls="collapseEncoders">
                                                <div className="d-flex align-items-center gap-2">
                                                    <SmartphoneNfc size={16} /> <span>Lista de Encoders</span>
                                                </div>
                                            </button>
                                        </h2>
                                        <div id="collapseEncoders" className="accordion-collapse collapse" aria-labelledby="headingEncoders" data-bs-parent="#accordionEncoders">
                                            <div className="accordion-body text-start">
                                                {/* Conteúdo da lista de motores */}
                                                {machine.encoders.map(encoder => (
                                                    <div className="card" style={{ width: "18rem" }} key={encoder.id}>
                                                        <img src={encoder.image} className="card-img-top" alt={encoder.name} />
                                                        <div className="card-body">
                                                            <h5 className="card-title text-warning fw-bold">{encoder.name}</h5>
                                                            <p className="card-text description"><span>Local:</span> {encoder.local}</p>
                                                            <p className="card-text"><span>Código Sap:</span> {encoder.codsap}</p>
                                                            <a href="#" className="btn btn-primary">Subir</a>
                                                        </div>
                                                    </div>
                                                ))}

                                                <p>Conteúdo de Encoders</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <a href='/dashboard/qrcode'>
                                    <button className="btn btn-outline-secondary w-100 mt-3">
                                        Voltar
                                    </button>
                                </a>
                            </div>
                        </div>

                    )}

                </div>
            </section>
        </main>
    );
}
