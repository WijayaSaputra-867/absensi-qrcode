import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm } from "@inertiajs/react";
import { Transition } from "@headlessui/react";

export default function ShiftAddForm() {
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
        work_time: "",
        break_start: "",
        break_end: "",
        home_time: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("shifts.store"));
        reset();
    };

    return (
        <section>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Shift Form
                </h2>
                <p className="text-base text-gray-600">Create a new shift</p>
            </header>
            <form className="flex flex-col md:flex-row" onSubmit={submit}>
                {/* flex left */}
                <div className="space-y-6 w-full md:w-1/2 mr-4">
                    {/* name */}
                    <div>
                        <InputLabel htmlFor="name" value="Shift Name" />
                        <TextInput
                            id="name"
                            type="text"
                            className="mt-1 block w-full"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                        />
                        <InputError className="mt-2" message={errors.name} />
                    </div>
                    {/* work time */}
                    <div>
                        <InputLabel htmlFor="name" value="Work Time" />
                        <TextInput
                            id="name"
                            type="time"
                            className="mt-1 block w-full"
                            value={data.work_time}
                            onChange={(e) =>
                                setData("work_time", e.target.value)
                            }
                        />
                        <InputError
                            className="mt-2"
                            message={errors.work_time}
                        />
                    </div>
                    {/* break start */}
                    <div>
                        <InputLabel htmlFor="name" value="Break Start Time" />
                        <TextInput
                            id="name"
                            type="time"
                            className="mt-1 block w-full"
                            value={data.break_start}
                            onChange={(e) =>
                                setData("break_start", e.target.value)
                            }
                        />
                        <InputError
                            className="mt-2"
                            message={errors.break_start}
                        />
                    </div>
                </div>
                {/* end flex left */}
                {/* flex right */}
                <div className="space-y-6 w-full md:w-1/2">
                    {/* break end */}
                    <div>
                        <InputLabel htmlFor="name" value="Break End Time" />
                        <TextInput
                            id="name"
                            type="time"
                            className="mt-1 block w-full"
                            value={data.break_end}
                            onChange={(e) =>
                                setData("break_end", e.target.value)
                            }
                        />
                        <InputError
                            className="mt-2"
                            message={errors.break_end}
                        />
                    </div>
                    {/* home time */}
                    <div>
                        <InputLabel htmlFor="name" value="Home Time" />
                        <TextInput
                            id="name"
                            type="time"
                            className="mt-1 block w-full"
                            value={data.home_time}
                            onChange={(e) =>
                                setData("home_time", e.target.value)
                            }
                        />
                        <InputError
                            className="mt-2"
                            message={errors.home_time}
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
