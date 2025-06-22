"use client"
import styles from './styles.module.scss'
import { Html5QrcodeScanner } from 'html5-qrcode'
import { QrcodeScanner } from './qrcodeScanner'
import { useState } from 'react'

export function Form() {

    const [showScanner, setShowScanner] = useState(false);

    return (
        <main className="container-fluid d-flex flex-column justify-content-center align-items-center border p-4">
            <section>
                <h1 className="text-center mb-4">QRCODE</h1>
                <div id='reader' className="d-flex flex-column align-items-center gap-3">

                    {!showScanner ? (
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
                                onClick={() => setShowScanner(true)}
                            >
                                Escanear QR Code
                            </button>
                        </>
                    ) : (
                        <QrcodeScanner />
                    )}


                    <input
                        type='text'
                        placeholder='Id do equipamento'
                        className="form-control w-100"
                    />
                    <button type='button' className='btn btn-dark'>
                        Procurar
                    </button>
                </div>
            </section>
        </main>
    );
}
