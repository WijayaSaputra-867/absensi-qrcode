import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import { useState } from "react";

export default function EmployeeAddForm({ className = "" }) {
    const {
        data,
        setData,
        post,
        errors,
        processing,
        recentlySuccessful,
        reset,
    } = useForm({
        name: "",
        profile_image: null,
        email: "",
        phone: "",
        address: "",
        gender: "",
    });

    const [selectedOption, setSelectedOption] = useState("");
    const [imagePreview, setImagePreview] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
            setData("profile_image", file);
        }
    };

    const submit = (e) => {
        e.preventDefault();
        post(route("employees.store"));
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
                    {imagePreview && (
                        <img
                            className="w-[180px] h-[180px]"
                            src={imagePreview}
                        />
                    )}
                </div>
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
                    <InputLabel htmlFor="profile_image" value="Profile Image" />
                    <TextInput
                        id="profile_image"
                        type="file"
                        className="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm text-gray-400 file:border-0 file:bg-transparent file:text-gray-600 file:text-sm file:font-medium"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                    <InputError
                        className="mt-2"
                        message={errors.profile_image}
                    />
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
                        <div className="flex space-x-1">
                            <TextInput
                                id="male"
                                type="radio"
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                                value="Male"
                                checked={selectedOption === "Male"}
                                onChange={(e) =>
                                    setData("gender", e.target.value)
                                }
                            />
                            <InputLabel htmlFor="male" value="Male" />
                        </div>
                        <div className="flex space-x-1">
                            <TextInput
                                id="female"
                                type="radio"
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                                value="Femaale"
                                checked={selectedOption === "Female"}
                                onChange={(e) =>
                                    setData("gender", e.target.value)
                                }
                            />
                            <InputLabel htmlFor="female" value="Female" />
                        </div>
                    </div>

                    <InputError
                        className="mt-2"
                        message={errors.password_confirmation}
                    />
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
                    <InputError className="mt-2" message={errors.phone} />
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
