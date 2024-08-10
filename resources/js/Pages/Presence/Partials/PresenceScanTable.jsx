import { Link, usePage } from "@inertiajs/react";
import parse from "html-react-parser";
import { CiCircleRemove } from "react-icons/ci";
import { CiCircleCheck } from "react-icons/ci";
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
                                Time 1
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Time 2
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Time 3
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Time 4
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
                                <td className="px-6 py-4 text-4xl">
                                    {presence.time_1 === 1 ? (
                                        <CiCircleCheck className="text-emerald-600" />
                                    ) : (
                                        <CiCircleRemove className="text-rose-600" />
                                    )}
                                </td>
                                <td className="px-6 py-4 text-4xl">
                                    {presence.time_2 === 1 ? (
                                        <CiCircleCheck className="text-emerald-600" />
                                    ) : (
                                        <CiCircleRemove className="text-rose-600" />
                                    )}
                                </td>
                                <td className="px-6 py-4 text-4xl">
                                    {presence.time_3 === 1 ? (
                                        <CiCircleCheck className="text-emerald-600" />
                                    ) : (
                                        <CiCircleRemove className="text-rose-600" />
                                    )}
                                </td>
                                <td className="px-6 py-4 text-4xl">
                                    {presence.time_4 === 1 ? (
                                        <CiCircleCheck className="text-emerald-600" />
                                    ) : (
                                        <CiCircleRemove className="text-rose-600" />
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {/* <nav aria-label="Page navigation example">
                    <ul className="inline-flex -space-x-px text-sm mt-2">
                        {users.links.map((link) => (
                            <li key={link.label}>
                                <span>
                                    <Link
                                        href={link.url}
                                        className={
                                            "flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700"
                                        }
                                    >
                                        {parse(`${link.label}`)}
                                    </Link>
                                </span>
                            </li>
                        ))}
                    </ul>
                </nav> */}
            </div>
        </section>
    );
}
