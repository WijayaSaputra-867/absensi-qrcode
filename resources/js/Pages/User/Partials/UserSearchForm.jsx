import { FaSearch } from "react-icons/fa";
import { useForm } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";

export default function UserSearchForm({ className = "" }) {
    const { data, setData } = useForm({
        name: "",
    });

    const submit = (e) => {
        e.preventDefault();
        Inertia.visit(`/users/search/${data.name}`);
    };

    return (
        <form className={className} onSubmit={submit}>
            <input
                required
                type="text"
                placeholder="Search user by name ......"
                className="px-3 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={data.name}
                onChange={(e) => setData("name", e.target.value)}
            />
            <button
                type="submit"
                className="bg-slate-600 text-white p-2 rounded-r-lg hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
            >
                <FaSearch />
            </button>
        </form>
    );
}
