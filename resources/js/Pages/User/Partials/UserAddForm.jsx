import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm } from "@inertiajs/react";
import { Transition } from "@headlessui/react";

export default function UserAddForm() {
    const {
        data,
        setData,
        post,
        errors,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        gender: "",
        phone: "",
        address: "",
        division: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("users.store"));
        reset();
    };

    return (
        <section>
            <header>
                <h2 className="text-lg font-medium text-gray-900">User Form</h2>
                <p className="text-base text-gray-600">Create a new user</p>
            </header>
            <form className="flex flex-col md:flex-row" onSubmit={submit}>
                {/* flex left */}
                <div className="space-y-6 w-full md:w-1/2 mr-4">
                    {/* name */}
                    <div>
                        <InputLabel htmlFor="name" value="Name" />
                        <TextInput
                            id="name"
                            type="text"
                            className="mt-1 block w-full"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                        />
                        <InputError className="mt-2" message={errors.name} />
                    </div>
                    {/* email */}
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
                    {/* password */}
                    <div>
                        <InputLabel htmlFor="password" value="Password" />
                        <TextInput
                            id="password"
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
                    {/* password confirmation */}
                    <div>
                        <InputLabel
                            htmlFor="password_confirmation"
                            value="Confirm Password"
                        />
                        <TextInput
                            id="password_confirmation"
                            type="password"
                            className="mt-1 block w-full"
                            value={data.password_confirmation}
                            onChange={(e) =>
                                setData("password_confirmation", e.target.value)
                            }
                        />
                        <InputError
                            className="mt-2"
                            message={errors.password_confirmation}
                        />
                    </div>
                </div>
                {/* end flex left */}
                {/* flex right */}
                <div className="space-y-6 w-full md:w-1/2">
                    {/* gender */}
                    <div>
                        <InputLabel
                            htmlFor="gender"
                            value="Gender"
                            className="mb-2"
                        />
                        {/* male */}
                        <div className="flex items-center">
                            <input
                                id="Male"
                                type="radio"
                                value="Male"
                                checked={data.gender === "Male"}
                                onChange={(e) =>
                                    setData("gender", e.target.value)
                                }
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2 mx-2 focus:bg-blue-500"
                            />
                            <InputLabel
                                htmlFor="Male"
                                className="ms-2 text-sm font-medium text-gray-900"
                                value="Male"
                            />
                        </div>
                        {/* female */}
                        <div className="flex items-center">
                            <input
                                id="Female"
                                type="radio"
                                value="Female"
                                checked={data.gender === "Female"}
                                onChange={(e) =>
                                    setData("gender", e.target.value)
                                }
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
                    {/* phone */}
                    <div>
                        <InputLabel htmlFor="phone" value="Phone Number" />
                        <TextInput
                            id="phone"
                            type="tel"
                            className="mt-1 block w-full"
                            value={data.phone}
                            onChange={(e) => setData("phone", e.target.value)}
                        />
                        <InputError className="mt-2" message={errors.phone} />
                    </div>
                    {/* address */}
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
                    {/* division */}
                    <div>
                        <InputLabel htmlFor="division" value="Division" />
                        <TextInput
                            id="division"
                            type="text"
                            className="mt-1 block w-full"
                            value={data.division}
                            onChange={(e) =>
                                setData("division", e.target.value)
                            }
                        />
                        <InputError
                            className="mt-2"
                            message={errors.division}
                        />
                    </div>
                    {/* button */}
                    <div className="flex justify-end gap-4">
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
                </div>
                {/* end flex right */}
            </form>
        </section>
    );
}
