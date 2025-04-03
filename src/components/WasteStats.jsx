import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8081/api';

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
  const { toast } = useToast();
  const [data, setData] = useState([
    { name: "Preparation", value: 0 },
    { name: "Plate Waste", value: 0 },
    { name: "Storage", value: 0 },
    { name: "Other", value: 0 }
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWasteData();
  }, []);

  const fetchWasteData = async () => {
    try {
      const response = await fetch(`${API_URL}/waste`);
      if (!response.ok) {
        throw new Error('Failed to fetch waste data');
      }
      const wasteEntries = await response.json();
      
      // Process the data to get waste distribution by type
      const wasteByType = {
        prep: 0,
        plate: 0,
        storage: 0,
        other: 0
      };
      
      wasteEntries.forEach(entry => {
        if (wasteByType.hasOwnProperty(entry.type)) {
          wasteByType[entry.type] += entry.amount;
        }
      });
      
      // Convert to chart data format
      const chartData = [
        { name: "Preparation", value: wasteByType.prep },
        { name: "Plate Waste", value: wasteByType.plate },
        { name: "Storage", value: wasteByType.storage },
        { name: "Other", value: wasteByType.other }
      ];
      
      setData(chartData);
    } catch (error) {
      console.error('Error fetching waste data:', error);
      toast({
        title: "Error",
        description: "Failed to fetch waste data. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

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
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <p>Loading waste data...</p>
                </div>
              ) : (
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
              )}
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