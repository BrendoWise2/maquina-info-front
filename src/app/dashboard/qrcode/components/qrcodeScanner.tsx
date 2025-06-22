"use client"
import { Html5QrcodeScanner } from 'html5-qrcode';
import { useState, useEffect } from 'react'

export function QrcodeScanner() {

    const [scannedCode, setScannedCode] = useState<string | null>(null);

    useEffect(() => {
        const scanner = new Html5QrcodeScanner("reader",
            { fps: 10, qrbox: { width: 250, height: 250 } },
            false
        );

        function onSucess(decodedText: string) {
            setScannedCode(decodedText);
            scanner.clear();
        }

        function onFailure(error: any) {
            console.warn(`Erro ao escanear: ${error}`);
        }

        scanner.render(onSucess, onFailure);
    }, []);

    return (
        <div className="container text-center mt-4">
            <h2>Leitor Qrcode</h2>
            <div id="reader" style={{ width: "100%" }}></div>

            {scannedCode && (
                <div className='alert alert-success mt-3'>
                    <strong>QR CODE LIDO:</strong>{scannedCode}
                </div>
            )}
        </div>
    );
}