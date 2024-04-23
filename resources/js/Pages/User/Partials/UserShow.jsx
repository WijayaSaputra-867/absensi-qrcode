import { usePage } from "@inertiajs/react";

export default function UserShow({ className = "" }) {
    const user = usePage().props.user;

    return <section className={className}></section>;
}
