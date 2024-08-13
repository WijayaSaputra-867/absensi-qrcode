import { usePage } from "@inertiajs/react";
import QRCode from "react-qr-code";
import {
    BiCalendarExclamation,
    BiCalendarCheck,
    BiCalendarMinus,
    BiCalendarX,
} from "react-icons/bi";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { FaCircle } from "react-icons/fa6";

export default function UserShow() {
    const { user, detail, presence } = usePage().props;

    const data = [
        { name: "Present", value: presence.total_present },
        { name: "Late", value: presence.total_late },
        { name: "Permit", value: presence.total_permission },
        { name: "Absent", value: presence.total_absent },
    ];

    const COLORS = ["#14b8a6", "#0ea5e9", "#f59e0b", "#f43f5e"];

    const renderCustomizedLabel = ({
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        percent,
        index,
    }) => {
        const RADIAN = Math.PI / 180;
        const radius = 25 + innerRadius + (outerRadius - innerRadius);
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text
                x={x}
                y={y}
                fill="white"
                textAnchor={x > cx ? "start" : "end"}
                dominantBaseline="central"
            >
                {`${data[index].name} (${(percent * 100).toFixed(0)}%)`}
            </text>
        );
    };
    return (
        <section className="flex flex-col md:flex-row">
            {/* user card */}
            <div className="w-full md:w-1/3 mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-5">
                <div className="flex flex-col items-center space-y-3">
                    <div className="text-center">
                        <div className="font-bold text-2xl">{user.name}</div>
                        <div className="text-lg text-slate-400">
                            {detail.division}
                        </div>
                    </div>

                    <img
                        className="mt-3 w-24 h-24 object-cover rounded-full"
                        src={
                            user.change_profile == false
                                ? user.profile
                                : `/storage/` + user.profile
                        }
                        alt={user.name}
                    />
                    <div className="text-center text-sm">
                        <p>{detail.gender}</p>
                        <p>{user.email}</p>
                        <p>+62 {detail.phone}</p>
                    </div>
                    <QRCode value={user.qrcode} className="w-56 h-56" />
                    <div>
                        <p className="leading-relaxed text-sm text-center">
                            {detail.address}
                        </p>
                    </div>
                </div>
            </div>
            {/* presence card */}
            <div className="w-full md:w-2/3 md:ml-3 md:mt-0 mt-3">
                <div className="bg-white shadow rounded-md p-4">
                    <h3 className="text-lg font-medium mb-2">
                        This month's attendance
                    </h3>
                    {/* data card */}
                    <div className="flex md:flex-row flex-col md:space-x-2 md:space-y-0 space-y-2">
                        <div className="rounded-lg bg-teal-500 md:w-1/4 md:p-4 p-2 text-white hover:opacity-85 w:1/2">
                            <h1 className="md:text-2xl text-xl">Presence</h1>
                            <div className="flex items-center justify-around">
                                <p className="">
                                    <span className="md:text-xl text-lg">
                                        {presence.total_present}{" "}
                                    </span>
                                    <span className="md:text-lg text-base">
                                        Days
                                    </span>
                                </p>
                                <BiCalendarCheck className="md:text-5xl text-3xl text-teal-600" />
                            </div>
                        </div>
                        <div className="rounded-lg bg-sky-500 md:w-1/4 md:p-4 p-2 text-white hover:opacity-85 w:1/2">
                            <h1 className="md:text-2xl text-xl">Late</h1>
                            <div className="flex items-center justify-around">
                                <p className="">
                                    <span className="md:text-xl text-lg">
                                        {presence.total_late}{" "}
                                    </span>
                                    <span className="md:text-lg text-base">
                                        Days
                                    </span>
                                </p>
                                <BiCalendarMinus className="md:text-5xl text-3xl text-sky-600" />
                            </div>
                        </div>
                        <div className="rounded-lg bg-amber-500 md:w-1/4 md:p-4 p-2 text-white hover:opacity-85 w:1/2">
                            <h1 className="md:text-2xl text-xl">Permit</h1>
                            <div className="flex items-center justify-around">
                                <p className="">
                                    <span className="md:text-xl text-lg">
                                        {presence.total_permission}{" "}
                                    </span>
                                    <span className="md:text-lg text-base">
                                        Days
                                    </span>
                                </p>
                                <BiCalendarExclamation className="md:text-5xl text-3xl text-amber-600" />
                            </div>
                        </div>
                        <div className="rounded-lg bg-rose-500 md:w-1/4 md:p-4 p-2 text-white hover:opacity-85 w:1/2">
                            <h1 className="md:text-2xl text-xl">Absent</h1>
                            <div className="flex items-center justify-around">
                                <p className="">
                                    <span className="md:text-xl text-lg">
                                        {presence.total_absent}{" "}
                                    </span>
                                    <span className="md:text-lg text-base">
                                        Days
                                    </span>
                                </p>
                                <BiCalendarX className="md:text-5xl text-3xl text-rose-600" />
                            </div>
                        </div>
                    </div>
                    {/* piechart */}
                    <div className="flex flex-row items-center">
                        <div className="w-1/2 flex items-center">
                            <PieChart width={400} height={400}>
                                <Pie
                                    data={data}
                                    cx={200}
                                    cy={200}
                                    labelLine={false}
                                    label={renderCustomizedLabel}
                                    outerRadius={150}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {data.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={COLORS[index % COLORS.length]}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </div>
                        <div className="w-1/2 h-full text-lg">
                            <div className="mt-1">
                                <FaCircle className="text-teal-500 inline" />
                                <p className="inline mx-2">Present</p>
                            </div>
                            <div className="mt-1">
                                <FaCircle className="text-sky-500 inline" />
                                <p className="inline mx-2">Late</p>
                            </div>
                            <div className="mt-1">
                                <FaCircle className="text-amber-500 inline" />
                                <p className="inline mx-2">Permit</p>
                            </div>
                            <div className="mt-1">
                                <FaCircle className="text-rose-500 inline" />
                                <p className="inline mx-2">Absent</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
