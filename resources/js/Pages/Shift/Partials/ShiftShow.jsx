import { usePage } from "@inertiajs/react";
export default function UserTable({ className = "" }) {
    const { users } = usePage().props;

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg text-gray-900 font-semibold">
                    Exiting user in this shift
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
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr
                                className="bg-white border-b text-xs"
                                key={user.id}
                            >
                                <td className="px-6 py-4">{user.name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}
