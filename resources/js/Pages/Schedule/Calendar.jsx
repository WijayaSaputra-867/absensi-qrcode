import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import CalendarShow from "./Partials/CalendarShow";

export default function Index({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Schedule
                </h2>
            }
        >
            <Head title="Schedule" />
            <div className="py-6 flex flex-col-reverse md:flex-row">
                <div className="w-full  mx-auto sm:px-6 lg:px-6 sm:mt-4 md:mt-0">
                    <div className="bg-white overflow-hidden shadow-sm rounded-lg">
                        <div className="p-6 text-gray-900">
                            <CalendarShow />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
