import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import UserAddForm from "./Partials/UserAddForm";

export default function Create({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Add User
                </h2>
            }
        >
            <Head title="Add User" />

            <div className="py-6">
                <div className="w-full  mx-auto sm:px-6 lg:px-6 sm:mt-4 md:mt-0">
                    <div className="bg-white overflow-hidden shadow-sm rounded-lg">
                        <div className="p-6 text-gray-900">
                            <UserAddForm />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
