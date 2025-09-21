import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export default function AssetChart({ data }) {

    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                        dataKey="createdAt" 
                        tickFormatter={(ts) => new Date(ts).toLocaleDateString()} 
                    />
                    <YAxis 
                        domain={["auto", "auto"]}
                        tickFormatter={(value) =>
                            new Intl.NumberFormat("en-US", {
                            maximumFractionDigits: 2,
                            }).format(value)
                        } 
                    />
                    <Tooltip 
                        labelFormatter={(ts) => new Date(ts).toLocaleString()} 
                        formatter={(value) => `$${parseFloat(value).toLocaleString()}`} 
                    />
                <Line type="monotone" dataKey="price" stroke="#10b981" dot={false} />
            </LineChart>
        </ResponsiveContainer>
    );
}
