import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import { usePage, useForm } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import { useState } from "react";

export default function EmployeeAddForm({ className = "" }) {
    const employee = usePage().props.employee;
    const {
        data,
        setData,
        post,
        errors,
        processing,
        recentlySuccessful,
        reset,
    } = useForm({
        name: employee.name,
        email: employee.email,
        phone: employee.phone,
        gender: "",
    });

    const [selectedOption, setSelectedOption] = useState(employee.gender);

    const submit = (e) => {
        e.preventDefault();
        post(route("employees.update"));
        reset();
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Add User Form
                </h2>
                <p className="text-base text-gray-600">Add a new user</p>
            </header>
            <form onSubmit={submit} className="space-y-6">
                <div>
                    <InputLabel htmlFor="name" value="Name" />
                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                    />
                    <InputError className="mt-2" message={errors.name} />
                </div>
                <div>
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                    />
                    <InputError className="mt-2" message={errors.email} />
                </div>
                <div>
                    <InputLabel htmlFor="phone" value="Phone" />
                    <TextInput
                        id="phone"
                        type="tel"
                        className="mt-1 block w-full"
                        value={data.phone}
                        onChange={(e) => setData("phone", e.target.value)}
                    />
                    <InputError className="mt-2" message={errors.phone} />
                </div>
                <div>
                    <InputLabel htmlFor="gender" value="Gender" />
                    <div className="flex flex-row space-x-3">
                        <TextInput
                            id="male"
                            type="radio"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                            value="Male"
                            checked={selectedOption === "Male"}
                            onChange={(e) => setData("gender", e.target.value)}
                        />
                        <InputLabel htmlFor="male" value="Male" />

                        <TextInput
                            id="female"
                            type="radio"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                            value="Femaale"
                            checked={selectedOption === "Female"}
                            onChange={(e) => setData("gender", e.target.value)}
                        />
                        <InputLabel htmlFor="female" value="Female" />
                    </div>

                    <InputError
                        className="mt-2"
                        message={errors.password_confirmation}
                    />
                </div>
                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Add</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">Added.</p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
