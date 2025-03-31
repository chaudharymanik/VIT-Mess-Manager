import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useState } from "react";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const wasteTips = [
  {
    title: "Smart Portioning",
    description: "Serve smaller portions and allow for seconds. This reduces plate waste significantly.",
    icon: "🍽️"
  },
  {
    title: "Inventory Management",
    description: "Keep track of food inventory to prevent over-ordering and spoilage.",
    icon: "📊"
  },
  {
    title: "Creative Leftovers",
    description: "Transform leftover ingredients into new dishes or soups.",
    icon: "♻️"
  },
  {
    title: "Storage Best Practices",
    description: "Proper storage techniques can extend food shelf life and reduce waste.",
    icon: "📦"
  }
];

const WasteStats = () => {
  // Sample data - in a real app, this would come from your backend
  const [data] = useState([
    { name: "Preparation", value: 35 },
    { name: "Plate Waste", value: 25 },
    { name: "Storage", value: 20 },
    { name: "Other", value: 20 }
  ]);

  return (
    <div className="py-16">
      <div className="text-center mb-12 space-y-3">
        <div className="chip mx-auto">Waste Management</div>
        <h2 className="heading-2">Track & Reduce Food Waste</h2>
        <p className="body-text max-w-xl mx-auto">
          Monitor waste patterns and implement strategies to minimize food waste in your mess.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Waste Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Waste Reduction Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {wasteTips.map((tip, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="text-2xl">{tip.icon}</div>
                  <div>
                    <h3 className="font-medium mb-1">{tip.title}</h3>
                    <p className="text-sm text-muted-foreground">{tip.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WasteStats; 