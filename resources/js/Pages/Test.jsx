import React from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

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

const Test = () => {
    return (
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
    );
};

export default Test;
