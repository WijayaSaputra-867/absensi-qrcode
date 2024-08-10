export default function ScanPage() {
    return (
        <section>
            <header>
                <h2 className="text-lg text-gray-900 font-semibold">
                    Check Scan Data
                </h2>
                <p className="text-base text-gray-600">
                    Check Scan Presence user
                </p>
            </header>

            <div className="mt-5">
                <a
                    href={route("scans.index")}
                    className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
                >
                    Check
                </a>
            </div>
        </section>
    );
}
