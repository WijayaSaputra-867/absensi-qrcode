import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";
import PresenceTable from "./Partials/PresenceTable";

export default function Index({ auth }) {
    const { title } = usePage().props;
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Presence By {title}
                </h2>
            }
        >
            <Head title="Presence" />

            <div className="py-6">
                <div className="w-full  mx-auto sm:px-6 lg:px-6 sm:mt-4 md:mt-0">
                    <div className="bg-white shadow-sm rounded-lg">
                        <div className="p-6 text-gray-900">
                            <PresenceTable className="space-y-6" />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
