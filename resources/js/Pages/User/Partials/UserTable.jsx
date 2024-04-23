import { Link, usePage } from "@inertiajs/react";
import UserDeleteForm from "./UserDeleteForm";
import UserSearchForm from "./UserSearchForm";
import parse from "html-react-parser";
import { FaPenToSquare, FaPlus } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa";

export default function UserTable({ className = "" }) {
    const users = usePage().props.users;

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg text-gray-900 font-semibold">
                    Table Data User
                </h2>
                <p className="text-base text-gray-600">Data user</p>
            </header>

            <div className="flex justify-between">
                <Link
                    className="inline-flex bg-teal-600 text-white py-2 px-3 rounded-lg hover:opacity-80 transition duration-150 ease-in-out focus:ring-teal-500 focus:ring-offset-2 mx-2 capitalize"
                    href={route("users.create")}
                >
                    Add User <FaPlus className="m-auto" />
                </Link>
                <UserSearchForm className="flex" />
            </div>

            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.data.map((user) => (
                            <tr
                                className="bg-white border-b text-xs"
                                key={user.id}
                            >
                                <td className="px-6 py-4">{user.name}</td>
                                <td className="px-6 py-4">{user.email}</td>
                                <td className="px-6 py-4 flex">
                                    <Link
                                        className="bg-emerald-600 text-white py-2 px-3 rounded-lg hover:opacity-80 transition duration-150 ease-in-out focus:ring-emerald-500 focus:ring-offset-2 mx-2 uppercase"
                                        href={`/users/${user.id}/edit`}
                                    >
                                        <FaPenToSquare className="mx-auto w-4 h-4" />
                                    </Link>
                                    <UserDeleteForm
                                        className="bg-red-600 text-white py-2 px-3 rounded-lg hover:opacity-80 transition duration-150 ease-in-out focus:ring-red-500 focus:ring-offset-2 mx-2 uppercase"
                                        user={user}
                                    />
                                    <Link
                                        className="bg-cyan-600 text-white py-2 px-3 rounded-lg hover:opacity-80 transition duration-150 ease-in-out focus:ring-emerald-500 focus:ring-offset-2 mx-2 uppercase"
                                        href={`/users/${user.id}`}
                                    >
                                        <FaRegEye className="mx-auto w-4 h-4" />
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <nav aria-label="Page navigation example">
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
                </nav>
            </div>
        </section>
    );
}
