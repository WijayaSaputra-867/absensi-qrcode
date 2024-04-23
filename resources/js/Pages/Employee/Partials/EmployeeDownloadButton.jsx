import React, { useRef } from "react";
import { FaDownload } from "react-icons/fa";
// import QRCode from "react-qr-code";
import { toPng } from "html-to-image";
import download from "downloadjs";

export default function EmployeeDownloadButton({ employee, className = "" }) {
    const qrRef = useRef(null); // Reference to the QR code element
    const downloadQrCode = async () => {
        if (!qrRef.current) {
            return; // Handle potential missing QR code reference
        }
        const canvas = await toPng(qrRef.current);
        download(canvas, `-${employee.name}.png`, "image/png");
    };
    return (
        <div>
            {/* <QRCode value={employee.name} ref={qrRef} /> */}
            <button onClick={downloadQrCode} className={className}>
                <FaDownload className="mx-auto w-4 h-4" />
            </button>
        </div>
    );
}
