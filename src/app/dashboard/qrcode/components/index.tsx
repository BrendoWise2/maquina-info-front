"use client"
import styles from './styles.module.scss'
import { useState } from 'react'
import { QrcodeScanner } from './qrcodeScanner'
import { MachineProps } from '@/lib/machine.type'
import { api } from '@/services/api'



export function Form() {

    const [showScanner, setShowScanner] = useState(false);
    const [machine, setMachine] = useState<MachineProps | null>(null);  // Definindo o tipo do estado como `null | boolean` para mais clareza

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
                                    className="form-control w-100"
                                />
                                <button type="button" className="btn btn-dark">
                                    Procurar
                                </button>
                            </>

                        ) : (
                            // Exibe o scanner QR Code quando `showScanner` for `true`
                            <QrcodeScanner onScanSuccess={handleScanSuccess} />
                        )
                    ) : (
                        // Exibe as informações da máquina caso o estado de `machine` seja atualizado
                        <div className="card shadow-lg border-0 rounded-4 p-4 text-center" style={{ maxWidth: '400px' }}>
                            <img
                                src={`http://localhost:3333/files/${machine.image}`}
                                alt="Imagem do Equipamento"
                                className="card-img-top rounded-3 mb-3"
                                style={{ maxHeight: '250px', objectFit: 'cover' }}
                            />
                            <div className="card-body">
                                <h4 className="card-title mb-3 text-primary fw-bold">Equipamento: {machine.name}</h4>
                                <p className="card-text"><strong>Setor:</strong> {machine.sector}</p>

                                {/* Você pode adicionar motores aqui depois */}
                                <h6 className="mt-4 mb-2 text-muted">Motores</h6>
                                <ul className="list-group list-group-flush mb-3">
                                    {machine.motors?.length ? (
                                        machine.motors.map((motor, index) => (
                                            <li key={index} className="list-group-item">{motor.name}</li>
                                        ))
                                    ) : (
                                        <li className="list-group-item text-muted">Nenhum motor registrado</li>
                                    )}
                                </ul>

                                <button
                                    className="btn btn-outline-secondary w-100 mt-3"
                                    onClick={() => setMachine(null)}
                                >
                                    Voltar
                                </button>
                            </div>
                        </div>

                    )}

                </div>
            </section>
        </main>
    );
}
