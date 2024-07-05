import { Link, usePage } from "@inertiajs/react";
import { FaPenToSquare, FaPlus } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa";

export default function UserTable({ className = "" }) {
    const { shifts } = usePage().props;

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg text-gray-900 font-semibold">
                    Table Data Shift
                </h2>
                <p className="text-base text-gray-600">Data Shift</p>
            </header>

            <div className="flex justify-between">
                <Link
                    className="inline-flex bg-teal-600 text-white py-2 px-3 rounded-lg hover:opacity-80 transition duration-150 ease-in-out focus:ring-teal-500 focus:ring-offset-2 mx-2 capitalize"
                    href={route("shifts.create")}
                >
                    Add Shift <FaPlus className="m-auto" />
                </Link>
            </div>

            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Time
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {shifts.map((shift) => (
                            <tr
                                className="bg-white border-b text-xs"
                                key={shift.id}
                            >
                                <td className="px-6 py-4">
                                    {shift.shift_name}
                                </td>
                                <td className="px-6 py-4">
                                    {shift.work_time} - {shift.home_time}
                                </td>
                                <td className="px-6 py-4 flex">
                                    <Link
                                        className="bg-emerald-600 text-white py-2 px-3 rounded-lg hover:opacity-80 transition duration-150 ease-in-out focus:ring-emerald-500 focus:ring-offset-2 mx-2 uppercase"
                                        href={`/shifts/${shift.id}/edit`}
                                    >
                                        <FaPenToSquare className="mx-auto w-4 h-4" />
                                    </Link>
                                    <Link
                                        className="bg-cyan-600 text-white py-2 px-3 rounded-lg hover:opacity-80 transition duration-150 ease-in-out focus:ring-emerald-500 focus:ring-offset-2 mx-2 uppercase"
                                        href={`/shifts/${shift.id}`}
                                    >
                                        <FaRegEye className="mx-auto w-4 h-4" />
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}
