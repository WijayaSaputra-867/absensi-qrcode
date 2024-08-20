import React, { useState, useEffect } from "react ";
import { Scanner } from "@yudiel/react-qr-scanner";
import { usePage } from "@inertiajs/inertia-react";

const App = () => {
    const { start_time, end_time } = usePage().props;
    const [scanning, setScanning] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            const currentTime = new Date();
            setCurrentTime(currentTime);
            const hours = currentTime.getHours();
            const minutes = currentTime.getMinutes();
            const startTime = start_time.split(":");
            const endTime = end_time.split(":");
            if (
                hours === parseInt(startTime[0]) &&
                minutes >= parseInt(startTime[1])
            ) {
                setScanning(true);
            } else if (
                hours === parseInt(endTime[0]) &&
                minutes < parseInt(endTime[1])
            ) {
                setScanning(true);
            } else {
                setScanning(false);
            }
        }, 1000);
        return () => clearInterval(intervalId);
    }, [start_time, end_time]);

    const handleScan = (detectedCodes) => {
        console.log(detectedCodes);
    };

    return (
        <div>
            {scanning ? (
                <Scanner onScan={handleScan} />
            ) : (
                <p>Scanning is not available at this time.</p>
            )}
        </div>
    );
};

export default App;
