// QRCodeScanner.js
import React, { useState, useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useForm, usePage } from "@inertiajs/react";

export default function Scanner() {
    const { result } = usePage().props;
    const [timeNow, setTimeNow] = useState(new Date().getHours());
    const [classDisable, setClassDisable] = useState("");

    const { data, setData, post } = useForm({
        scannedText: "",
    });

    useEffect(() => {
        const scanner = new Html5QrcodeScanner(
            "reader",
            { fps: 10, qrbox: 250 },
            /* verbose= */ false
        );

        const onScanSuccess = (decodedText) => {
            setData("scannedText", decodedText);
        };

        const onScanFailure = (error) => {
            console.warn(`QR code scan error: ${error}`);
        };

        scanner.render(onScanSuccess, onScanFailure);

        // Cleanup on unmount
        return () => {
            scanner.clear();
        };
    }, [setData]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTimeNow(new Date().getHours());
        }, 1000); // update jam setiap 1 detik

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        if (data.scannedText) {
            post(route("scans.store"));
        }
    }, [data, post]);

    useEffect(() => {
        if (result === "") {
            setClassDisable(
                "pointer-events-none cursor-not-allowed opacity-50"
            );
        } else {
            if (result.start >= timeNow && result.end <= timeNow) {
                setClassDisable("");
            } else {
                setClassDisable(
                    "pointer-events-none cursor-not-allowed opacity-50"
                );
            }
        }
    });

    return (
        <div className="flex justify-center mt-10">
            <div
                id="reader"
                style={{ width: "500px" }}
                className={classDisable}
            ></div>
            <input type="hidden" name="scannedText" value={data.scannedText} />
        </div>
    );
}
