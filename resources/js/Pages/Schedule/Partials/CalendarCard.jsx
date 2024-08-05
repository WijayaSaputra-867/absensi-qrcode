import React, { useState } from "react";
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

    return (
        <div className="w-full">
            <Calendar
                value={dates}
                className="w-full"
                weekStartDayIndex={0} // Monday
                weekDays={daysWeek}
                months={month}
                readOnly
                fullYear
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
    );
}

export default CalendarCard;
