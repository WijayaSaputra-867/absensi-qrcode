import React, { useState, useEffect } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import { Head, usePage, useForm } from "@inertiajs/react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
    const { result, flash } = usePage().props;
    const [scanning, setScanning] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());
    const { data, setData, post, processing, reset } = useForm({
        qr_code: "",
    });

    useEffect(() => {
        const intervalId = setInterval(() => {
            const currentTime = new Date();
            setCurrentTime(currentTime);
            if (!result) {
                setScanning(false);
            } else {
                const hours = currentTime.getHours();
                const minutes = currentTime.getMinutes();
                const startTime = result.start.split(":");
                const endTime = result.end.split(":");
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
            }
        }, 1000);
        return () => clearInterval(intervalId);
    }, [result.start, result.end]);

    const handleScan = (detectedCodes) => {
        setData("qr_code", detectedCodes[0].rawValue);
        // console.log(detectedCodes[0].rawValue);
    };

    const handleError = (error) => {
        toast.error(error);
    }

    useEffect(() => {
        if (data.qr_code) {
            post(route("scans.store"));
            reset();
        }
    }, [data, post]);

    useEffect(() => {
        if (flash.success) {
          toast.success(flash.success);
          reset();
        } else if (flash.error) {
            toast.error(flash.error);
            reset();
        }
      }, [flash]);


    return (
        <section>
            <Head title="Scanner" />
            <ToastContainer autoClose={3000} />
            <div className="h-screen flex justify-center items-center bg-gray-100">
                {scanning ? (
                    <div className="max-w-lg">
                        <Scanner
                            classNames="mx-auto p-4 bg-white rounded shadow-md"
                            onScan={handleScan}
                            onError={handleError}
                            scanDelay={3000}
                            allowMultiple={true}
                        />
                    </div>
                ) : (
                    <p className="text-lg text-gray-600 text-center">
                        Scanning is not available at this time.
                    </p>
                )}
            </div>
            <input type="hidden" value={data.qr_code} name="qrcode" />
        </section>
    );
};

export default App;
