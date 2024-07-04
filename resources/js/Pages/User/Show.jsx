import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import UserShow from "@/Pages/User/Partials/UserShow";

export default function Index({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Detail User
                </h2>
            }
        >
            <Head title="Detail User" />

            <div className="py-6">
                <div className="w-full  mx-auto sm:px-6 lg:px-6 sm:mt-4 md:mt-0">
                    <div className="overflow-hidden rounded-lg">
                        <div className="p-6 text-gray-900">
                            <UserShow />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
