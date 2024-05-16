import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm, usePage } from "@inertiajs/react";
import { useState } from "react";
import { Transition } from "@headlessui/react";

export default function DetailAddForm({ className = "" }) {
    const user = usePage().props.user;
    const {
        data,
        setData,
        post,
        errors,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        name: user.name,
        email: user.email,
        password: user.password,
        gender: "",
        phone: user.phone,
        address: user.address,
        division: user.division,
    });

    const [selectedOption, setSelectedOption] = useState("");

    const submit = (e) => {
        e.preventDefault();
        post(route("details.store"));
        reset();
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    User Detail Form
                </h2>
                <p className="text-base text-gray-600">
                    User details must be added or user data will not be added
                </p>
            </header>
            <form onSubmit={submit} className="space-y-6">
                <TextInput type="hidden" value={data.name} name="name" />
                <TextInput type="hidden" value={data.email} name="email" />
                <TextInput
                    type="hidden"
                    value={data.password}
                    name="password"
                />
                <div>
                    <InputLabel
                        htmlFor="gender"
                        value="Gender"
                        className="mb-2"
                    />
                    <div className="flex items-center">
                        <input
                            id="Male"
                            type="radio"
                            value="Male"
                            checked={selectedOption === "Male"}
                            onChange={(e) => setData("gender", e.target.value)}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2 mx-2 focus:bg-blue-500"
                        />
                        <InputLabel
                            htmlFor="Male"
                            className="ms-2 text-sm font-medium text-gray-900"
                            value="Male"
                        />
                    </div>
                    <div className="flex items-center">
                        <input
                            id="Female"
                            type="radio"
                            value="Female"
                            checked={selectedOption === "Female"}
                            onChange={(e) => setData("gender", e.target.value)}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2 mx-2 focus:bg-blue-400"
                        />
                        <InputLabel
                            htmlFor="Female"
                            className="ms-2 text-sm font-medium text-gray-900"
                            value="Female"
                        />
                    </div>
                    <InputError className="mt-2" message={errors.gender} />
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
                    <InputLabel htmlFor="address" value="Address" />
                    <textarea
                        id="address"
                        rows="1"
                        type="tel"
                        className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                        value={data.address}
                        onChange={(e) => setData("address", e.target.value)}
                    ></textarea>
                    <InputError className="mt-2" message={errors.address} />
                </div>
                <div>
                    <InputLabel htmlFor="division" value="Division" />
                    <TextInput
                        id="division"
                        type="text"
                        className="mt-1 block w-full"
                        value={data.division}
                        onChange={(e) => setData("division", e.target.value)}
                    />
                    <InputError className="mt-2" message={errors.division} />
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
