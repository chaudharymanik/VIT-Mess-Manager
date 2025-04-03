import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const WasteAnalytics = ({ data = [] }) => {
  // Default data if none is provided
  const defaultData = [
    { date: "Jan", waste: 65 },
    { date: "Feb", waste: 59 },
    { date: "Mar", waste: 80 },
    { date: "Apr", waste: 81 },
    { date: "May", waste: 56 },
    { date: "Jun", waste: 55 },
  ];

  const chartData = data.length > 0 ? data : defaultData;

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Waste Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="waste" 
                stroke="#8884d8" 
                strokeWidth={2}
                dot={{ fill: "#8884d8", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default WasteAnalytics; 