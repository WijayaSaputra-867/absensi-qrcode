import { Head, useForm } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import InputError from "@/Components/InputError";
import GuestLayout from "@/Layouts/GuestLayout";

export default function Create() {
    const { data, setData, errors, post } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.store"));
    };
    return (
        <GuestLayout>
            <Head title="Create Admin" />

            <div className="py-6">
                <div className="w-full bg-slate- mx-auto sm:px-6 lg:px-6 sm:mt-4 md:mt-0">
                    <div className="bg-white overflow-hidden shadow-sm rounded-lg">
                        <div className="p-6 text-gray-900">
                            <header>
                                <h2 className="text-lg text-center font-medium text-gray-900">
                                    Create Admin
                                </h2>
                            </header>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <InputLabel htmlFor="name" value="Name" />
                                    <TextInput
                                        id="name"
                                        className="mt-1 block w-full"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                    />
                                    <InputError
                                        className="mt-2"
                                        message={errors.name}
                                    />
                                </div>
                                <div>
                                    <InputLabel htmlFor="name" value="Email" />
                                    <TextInput
                                        id="name"
                                        type="email"
                                        className="mt-1 block w-full"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                    />
                                    <InputError
                                        className="mt-2"
                                        message={errors.email}
                                    />
                                </div>
                                <div>
                                    <InputLabel
                                        htmlFor="name"
                                        value="Password"
                                    />
                                    <TextInput
                                        id="name"
                                        type="password"
                                        className="mt-1 block w-full"
                                        value={data.password}
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                    />
                                    <InputError
                                        className="mt-2"
                                        message={errors.password}
                                    />
                                </div>
                                <div>
                                    <InputLabel
                                        htmlFor="name"
                                        value="Confirm Password"
                                    />
                                    <TextInput
                                        id="name"
                                        type="password"
                                        className="mt-1 block w-full"
                                        value={data.password_confirmation}
                                        onChange={(e) =>
                                            setData(
                                                "password_confirmation",
                                                e.target.value
                                            )
                                        }
                                    />
                                    <InputError
                                        className="mt-2"
                                        message={errors.password_confirmation}
                                    />
                                </div>
                                <div className="flex items-center justify-end">
                                    <PrimaryButton className="ms-4">
                                        Create
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
