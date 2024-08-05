import React, { useState } from "react";
import DatePicker from "react-multi-date-picker";
import { useForm, usePage } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import Icon from "react-multi-date-picker/components/icon";
import InputError from "@/Components/InputError";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import { Transition } from "@headlessui/react";
import InputLabel from "@/Components/InputLabel";

export default function ScheduleCard() {
    const { shifts } = usePage().props;
    // for selecting dates
    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        dates: [],
        shifts: [],
        description: "",
    });

    // if the date is clicked it will be selected
    const handleDateChange = (dates) => {
        const formatDate = dates.map((date) => date.format("DD-MMM-YYYY"));
        setData("dates", formatDate);
    };

    const handleCheckboxChange = (e) => {
        const { id, checked } = e.target;
        const shiftsArray = [...data.shifts];
        if (checked) {
            shiftsArray.push(parseInt(id));
        } else {
            shiftsArray = shiftsArray.filter((shift) => shift !== parseInt(id));
        }
        setData("shifts", shiftsArray);
    };

    // if the button is clicked it will send to schedule.store
    const handleSubmit = (e) => {
        e.preventDefault();

        post(route("schedule.store"));
        reset();
    };

    return (
        // section  for schedule card
        <section>
            {/* header for schedule card */}
            <header className="space-y-1">
                <h2 className="text-lg text-gray-900 font-semibold">
                    Set a Schedule
                </h2>
                <p className="text-base text-gray-600 leading-relaxed">
                    click to make the date into a holiday
                </p>
            </header>

            {/* form for selecting dates */}
            <form onSubmit={handleSubmit} className="flex flex-col mt-6">
                <div className="space-y-3 w-full md:w-1/2 mr-4">
                    {/* input dates */}
                    <div className="flex items-center space-x-2">
                        {/* label for dates */}
                        <label
                            className="block tracking-wide text-gray-700 text-base font-bold"
                            htmlFor="dates"
                        >
                            Select Dates :
                        </label>
                        {/* date picker */}
                        <DatePicker
                            multiple
                            value={data.dates}
                            onChange={handleDateChange}
                            className="w-full p-2 pl-10 text-sm text-gray-700"
                            render={<Icon />}
                            plugins={[<DatePanel />]}
                            format="DD-MMM-YYYY"
                            mapDays={({ date }) => {
                                let props = {};
                                let isWeekend = [0, 6].includes(
                                    date.weekDay.index
                                );

                                if (isWeekend)
                                    props.className = "text-rose-600";

                                return props;
                            }}
                        />
                        {/* input error */}
                        <InputError className="mt-2" message={errors.dates} />
                    </div>
                    {/* input shifts */}
                    <div>
                        {/* label for shifts */}
                        <label className="block tracking-wide text-gray-700 text-base font-bold">
                            Chose Shift :
                        </label>
                        {/* mapping shifts */}
                        <div className="flex flex-wrap">
                            {shifts.map((shift) => (
                                // div for wrap checkbox
                                <div
                                    className="flex items-center flex-wrap"
                                    key={shift.id}
                                >
                                    <input
                                        id={shift.id}
                                        type="checkbox"
                                        name="shifts"
                                        value={shift.id}
                                        onChange={handleCheckboxChange}
                                        className="rounded-md m-2"
                                    />
                                    <InputLabel
                                        htmlFor={shift.id}
                                        value={
                                            shift.shift_name +
                                            " (" +
                                            shift.work_time +
                                            "-" +
                                            shift.home_time +
                                            ")"
                                        }
                                    />
                                </div>
                            ))}
                            <InputError
                                className="mt-2"
                                message={errors.shifts}
                            />
                        </div>
                    </div>
                    {/* input description */}
                    <div>
                        {/* label for description */}
                        <label className="block tracking-wide text-gray-700 text-base font-bold">
                            Description
                        </label>
                        <textarea
                            id="description"
                            rows="1"
                            type="tel"
                            className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            value={data.description}
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                        ></textarea>
                        <InputError
                            className="mt-2"
                            message={errors.description}
                        />
                    </div>
                    {/* button */}
                    <div className="flex justify-start gap-4">
                        <PrimaryButton disabled={processing}>Set</PrimaryButton>

                        <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <p className="text-sm text-gray-600">
                                Already Set.
                            </p>
                        </Transition>
                    </div>
                </div>
            </form>
        </section>
    );
}
