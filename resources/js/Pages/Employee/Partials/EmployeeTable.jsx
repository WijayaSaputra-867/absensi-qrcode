import { Link, usePage } from "@inertiajs/react";
import EmployeeDeleteForm from "./EmployeeDeleteForm";
import EmployeeDownloadButton from "./EmployeeDownloadButton";
import parse from "html-react-parser";
import { FaPenToSquare } from "react-icons/fa6";
import QRCode from "react-qr-code";

export default function EmployeeTable({ className = "" }) {
    const employees = usePage().props.employees;

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg text-gray-900 font-semibold">
                    Table Data Employee
                </h2>
                <p className="text-base text-gray-600">Data Employee</p>
            </header>

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
                                Phone
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Qr Code
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.data.map((employee) => (
                            <tr
                                className="bg-white border-b text-xs"
                                key={employee.id}
                            >
                                <td className="px-6 py-4">{employee.name}</td>
                                <td className="px-6 py-4">{employee.email}</td>
                                <td className="px-6 py-4">{employee.phone}</td>
                                <td className="px-6 py-4">
                                    <QRCode
                                        value={employee.name}
                                        className="max-h-10 float-left"
                                    />
                                </td>
                                <td className="px-6 py-4 flex">
                                    <Link
                                        className="bg-emerald-600 text-white py-2 px-3 rounded-lg hover:opacity-80 transition duration-150 ease-in-out focus:ring-emerald-500 focus:ring-offset-2 mx-2 uppercase"
                                        href={`/employees/${employee.id}/edit`}
                                    >
                                        <FaPenToSquare className="mx-auto w-4 h-4" />
                                    </Link>
                                    <EmployeeDeleteForm
                                        className="bg-red-600 text-white py-2 px-3 rounded-lg hover:opacity-80 transition duration-150 ease-in-out focus:ring-red-500 focus:ring-offset-2 mx-2 uppercase"
                                        employee={employee}
                                    />
                                    <EmployeeDownloadButton
                                        className="bg-sky-600 text-white py-2 px-3 rounded-lg hover:opacity-80 transition duration-150 ease-in-out focus:ring-sky-500 focus:ring-offset-2 mx-2 uppercase"
                                        employee={employee}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <nav aria-label="Page navigation example">
                    <ul className="inline-flex -space-x-px text-sm mt-2">
                        {employees.links.map((link) => (
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
