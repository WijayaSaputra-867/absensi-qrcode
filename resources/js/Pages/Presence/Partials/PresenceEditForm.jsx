import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import { usePage, useForm } from "@inertiajs/react";
import { Transition } from "@headlessui/react";

export default function UserEditForm({ className = "" }) {
    const { presences, presence, user } = usePage().props;
    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            date: "",
            month: "",
            year: "",
            description: "",
        });

    const submit = (e) => {
        e.preventDefault();
        patch(route("presences.update", presence));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Presence Edit Form
                </h2>
                <p className="text-base text-gray-600">
                    Change presence description with name
                    <span className="font-bold"> {user.name}</span>
                </p>
            </header>
            <form className="flex flex-col md:flex-row" onSubmit={submit}>
                {/* flex left */}
                <div className="space-y-6 w-full md:w-1/2">
                    {/* date */}
                    <div>
                        <InputLabel htmlFor="date" value="Date" />
                        <select
                            id="date"
                            onChange={(e) => setData("date", e.target.value)}
                            className="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                        >
                            <option selected>Choose a date</option>
                            {presences.map((presence) => (
                                <option
                                    key={presence.id}
                                    value={presence.date}
                                    selected={data.date === presence.date}
                                >
                                    {presence.date}
                                </option>
                            ))}
                        </select>
                        <InputError className="mt-2" message={errors.date} />
                    </div>
                    {/* date */}
                    <div>
                        <InputLabel htmlFor="date" value="Month" />
                        <select
                            id="date"
                            onChange={(e) => setData("month", e.target.value)}
                            className="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                        >
                            <option selected>Choose a Month</option>
                            {presences.map((presence) => (
                                <option
                                    key={presence.id}
                                    value={presence.month}
                                    selected={data.month === presence.month}
                                >
                                    {presence.month}
                                </option>
                            ))}
                        </select>
                        <InputError className="mt-2" message={errors.month} />
                    </div>
                    {/* date */}
                    <div>
                        <InputLabel htmlFor="date" value="Year" />
                        <select
                            id="date"
                            onChange={(e) => setData("year", e.target.value)}
                            className="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                        >
                            <option selected>Choose a Year</option>
                            {presences.map((presence) => (
                                <option
                                    key={presence.id}
                                    value={presence.year}
                                    selected={data.year === presence.year}
                                >
                                    {presence.year}
                                </option>
                            ))}
                        </select>
                        <InputError className="mt-2" message={errors.year} />
                    </div>
                    {/* description */}
                    <div>
                        <InputLabel htmlFor="description" value="Description" />
                        <select
                            id="description"
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                            className="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                        >
                            <option selected>Choose a Description</option>
                            <option
                                value="present"
                                selected={data.description === "present"}
                            >
                                Present
                            </option>
                            <option
                                value="absent"
                                selected={data.description === "absent"}
                            >
                                Absent
                            </option>
                            <option
                                value="permission"
                                selected={data.description === "permission"}
                            >
                                Permission
                            </option>
                            <option
                                value="late"
                                selected={data.description === "late"}
                            >
                                Late
                            </option>
                        </select>
                        <InputError
                            className="mt-2"
                            message={errors.description}
                        />
                    </div>
                    {/* button */}
                    <div className="flex justify-start gap-4">
                        <PrimaryButton disabled={processing}>
                            Update
                        </PrimaryButton>

                        <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <p className="text-sm text-gray-600">Updated.</p>
                        </Transition>
                    </div>
                </div>
                {/* end flex right */}
            </form>
        </section>
    );
}
