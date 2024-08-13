import React, { useState, useEffect } from "react";
import { Calendar } from "react-multi-date-picker";
import { usePage } from "@inertiajs/react";

function CalendarCard() {
    const { dates } = usePage().props;

    const daysWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const month = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 768px)");
        mediaQuery.addListener(handleMediaQueryChange);
        handleMediaQueryChange(mediaQuery);
        return () => {
            mediaQuery.removeListener(handleMediaQueryChange);
        };
    }, []);

    const handleMediaQueryChange = (mediaQuery) => {
        if (mediaQuery.matches) {
            setIsMobile(true);
        } else {
            setIsMobile(false);
        }
    };

    return (
        <section>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Calendar Card
                </h2>
                <p className="text-base text-gray-600">
                    To see the work schedule
                </p>
            </header>
            <div className="w-full flex justify-center mt-3">
                <Calendar
                    value={dates}
                    className="w-full"
                    weekStartDayIndex={0} // Monday
                    weekDays={daysWeek}
                    months={month}
                    readOnly
                    {...(isMobile ? {} : { fullYear: true })}
                    format="DD-MM-YYYY"
                    mapDays={({ date }) => {
                        let props = {};
                        let isWeekend = [0, 6].includes(date.weekDay.index);

                        let holidayIndex = dates.findIndex(
                            (d) => d.date == date.format("DD-MM-YYYY")
                        );

                        if (holidayIndex != -1) {
                            props.className = "bg-rose-400 text-white";
                            props.title = dates[holidayIndex].description;
                        }
                        if (isWeekend) props.className = "text-rose-600";

                        return props;
                    }}
                />
            </div>
        </section>
    );
}

export default CalendarCard;
