// QRCodeScanner.js
import React, { useState, useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useForm, usePage } from "@inertiajs/react";
import { isWithinInterval } from "date-fns";

export default function Scanner() {
    const { result } = usePage().props;
    const [currentTime, setCurrentTime] = useState(new Date());
    const [classDisable, setClassDisable] = useState("");
    const [startTime, setStartTime] = useState(""); // set start time from variable
    const [endTime, setEndTime] = useState(""); // set end time from variable
    const [scanner, setScanner] = useState(null);

    const { data, setData, post } = useForm({
        scannedText: "",
    });

    useEffect(() => {
        const scanner = new Html5QrcodeScanner(
            "reader",
            { fps: 5, qrbox: 250 },
            /* verbose= */ false
        );

        // setScanner(scanner);

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
        if (!Object.keys(result).length === 0) {
            setStartTime(result.start);
            setEndTime(result.end);
        }
    }, [setStartTime, setEndTime]);

    const timeRange = () => {
        const start = new Date();
        start.setHours(parseInt(startTime.split(":")[0]));
        start.setMinutes(parseInt(startTime.split(":")[1]));
        const end = new Date();
        end.setHours(parseInt(endTime.split(":")[0]));
        end.setMinutes(parseInt(endTime.split(":")[1]));
        return isWithinInterval(currentTime, { start, end });
    };

    useEffect(() => {
        if (timeRange()) {
            setClassDisable("");
        } else {
            setClassDisable("opacity-50 cursor-not-allowed");
        }
    });

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000); // update every 1 second
        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        if (data.scannedText) {
            post(route("scans.store"));
        }
    }, [data, post]);

    return (
        <div className="flex justify-center mt-10">
            <div
                id="reader"
                style={{ width: "500px" }}
                // className={classDisable}
            ></div>
            <input type="hidden" name="scannedText" value={data.scannedText} />
        </div>
    );
}
