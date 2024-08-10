import { Link, usePage } from "@inertiajs/react";
import { FaPenToSquare } from "react-icons/fa6";

export default function PresenceScanTable({ className = "" }) {
    const { presences } = usePage().props;

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg text-gray-900 font-semibold">
                    Table Presence Scan
                </h2>
                <p className="text-base text-gray-600">Data user</p>
            </header>

            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Presence
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Absent
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Late
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Permission
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {presences.map((presence) => (
                            <tr
                                className="bg-white border-b text-xs"
                                key={presence.id}
                            >
                                <td className="px-6 py-4">
                                    {presence.user.name}
                                </td>
                                <td className="px-6 py-4">
                                    {presence.total_present}
                                </td>
                                <td className="px-6 py-4">
                                    {presence.total_absent}
                                </td>
                                <td className="px-6 py-4">
                                    {presence.total_permission}
                                </td>
                                <td className="px-6 py-4">
                                    {presence.total_late}
                                </td>
                                <td className="px-6 py-4 flex">
                                    <Link
                                        className="bg-emerald-600 text-white py-2 px-3 rounded-lg hover:opacity-80 transition duration-150 ease-in-out focus:ring-emerald-500 focus:ring-offset-2 mx-2 uppercase"
                                        href={`/presences/${presence.id}/edit`}
                                    >
                                        <FaPenToSquare className="mx-auto w-4 h-4" />
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
