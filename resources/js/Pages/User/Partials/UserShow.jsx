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
    const { user, detail } = usePage().props;

    const data = [
        { name: "Hadir", value: 20 },
        { name: "Terlambat", value: 5 },
        { name: "Izin", value: 2 },
        { name: "Tidak Masuk", value: 3 },
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
                        className="mt-3 w-24 h-24 object-cover rounded-circle"
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
                        <p>{detail.phone}</p>
                    </div>
                    <QRCode value={detail.qrcode} className="w-56 h-56" />
                    <div>
                        <p className="leading-relaxed text-sm text-center">
                            {detail.address}
                        </p>
                    </div>
                </div>
            </div>
            {/* presence card */}
            <div className="w-full md:w-2/3 ml-3">
                <div className="bg-white shadow rounded-md p-4">
                    <h3 className="text-lg font-medium mb-2">
                        Kehadiran Bulan Ini
                    </h3>
                    {/* data card */}
                    <div className="flex flex-row space-x-2">
                        <div className="rounded-lg bg-teal-500 md:w-1/4 p-3 text-white hover:opacity-85 w:1/2">
                            <h1 className="text-2xl">Hadir</h1>
                            <div className="flex items-center justify-around">
                                <p className="">
                                    <span className="text-xl"> X </span>
                                    <span className="text-lg">Hari</span>
                                </p>
                                <BiCalendarCheck className="text-5xl text-teal-600" />
                            </div>
                        </div>
                        <div className="rounded-lg bg-sky-500 md:w-1/4 p-4 text-white hover:opacity-85 w:1/2">
                            <h1 className="text-2xl">Telat</h1>
                            <div className="flex items-center justify-around">
                                <p className="">
                                    <span className="text-xl"> X </span>
                                    <span className="text-lg">Hari</span>
                                </p>
                                <BiCalendarMinus className="text-5xl text-sky-600" />
                            </div>
                        </div>
                        <div className="rounded-lg bg-amber-500 md:w-1/4 p-4 text-white hover:opacity-85 w:1/2">
                            <h1 className="text-2xl">Izin</h1>
                            <div className="flex items-center justify-around">
                                <p className="">
                                    <span className="text-xl"> X </span>
                                    <span className="text-lg">amber</span>
                                </p>
                                <BiCalendarExclamation className="text-5xl text-amber-600" />
                            </div>
                        </div>
                        <div className="rounded-lg bg-rose-500 md:w-1/4 p-4 text-white hover:opacity-85 w:1/2">
                            <h1 className="text-2xl">Tidak Hadir</h1>
                            <div className="flex items-center justify-around">
                                <p className="">
                                    <span className="text-xl"> X </span>
                                    <span className="text-lg">Hari</span>
                                </p>
                                <BiCalendarX className="text-5xl text-rose-600" />
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
                                <p className="inline mx-2">Hadir</p>
                            </div>
                            <div className="mt-1">
                                <FaCircle className="text-sky-500 inline" />
                                <p className="inline mx-2">Terlambat</p>
                            </div>
                            <div className="mt-1">
                                <FaCircle className="text-amber-500 inline" />
                                <p className="inline mx-2">Izin</p>
                            </div>
                            <div className="mt-1">
                                <FaCircle className="text-rose-500 inline" />
                                <p className="inline mx-2">Tidak Masuk</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
