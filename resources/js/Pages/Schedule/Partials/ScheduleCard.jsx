import { usePage } from "@inertiajs/react";

export default function ScheduleCard() {
    const { schedule } = usePage().props;

    return (
        <section>
            <header className="space-y-1">
                <h2 className="text-lg text-gray-900 font-semibold">
                    Schedule Card
                </h2>
                <p className="text-base text-gray-600 leading-relaxed">
                    click to make the schedule into a work schedule
                </p>
            </header>
        </section>
    );
}
