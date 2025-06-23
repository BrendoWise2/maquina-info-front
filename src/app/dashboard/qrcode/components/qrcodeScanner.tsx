"use client";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useRef } from "react";

interface Props {
    onScanSuccess: (qrcodeId: string) => void;
}

export function QrcodeScanner({ onScanSuccess }: Props) {
    const scannerRef = useRef<Html5QrcodeScanner | null>(null);


    useEffect(() => {
        const scanner = new Html5QrcodeScanner("reader", {
            fps: 10,
            qrbox: { width: 250, height: 250 },
        }, false);

        scannerRef.current = scanner;

        const handleSuccess = (decodedText: string) => {
            onScanSuccess(decodedText);
            scanner.clear().then(() => {
                const el = document.getElementById("reader");
                if (el) el.remove();
            });
        };

        scanner.render(handleSuccess, () => { });

        return () => {
            scanner.clear().catch(err =>
                console.error("Erro ao limpar o scanner", err)
            );
        };
    }, [onScanSuccess]);

    return (
        <div className="container text-center mt-4">
            <div id="reader" style={{ width: "100%" }} />
        </div>
    );
}
