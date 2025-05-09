import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import SelectPage from "./Partials/SelectPage";
import ScanPage from "./Partials/ScanPage";

export default function Index({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Presence
                </h2>
            }
        >
            <Head title="Presence" />

            <div className="py-6">
                <div className="w-full  mx-auto sm:px-6 lg:px-6 sm:mt-4 md:mt-0">
                    <div className="bg-white shadow-sm rounded-lg">
                        <div className="p-6 text-gray-900">
                            <SelectPage />
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-6">
                <div className="w-full  mx-auto sm:px-6 lg:px-6 sm:mt-4 md:mt-0">
                    <div className="bg-white shadow-sm rounded-lg">
                        <div className="p-6 text-gray-900">
                            <ScanPage />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
