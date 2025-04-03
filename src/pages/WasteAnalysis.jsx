import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/layout/Navbar";
import WasteAnalytics from "@/components/WasteAnalytics";
import WasteStats from "@/components/WasteStats";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8081/api';

const WasteAnalysis = () => {
  const { toast } = useToast();
  const [wasteData, setWasteData] = useState([]);
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
      const data = await response.json();
      
      // Process data for monthly trends
      const monthlyData = processMonthlyData(data);
      setWasteData(monthlyData);
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

  const processMonthlyData = (data) => {
    // Group waste entries by month
    const monthlyWaste = {};
    
    data.forEach(entry => {
      const date = new Date(entry.date);
      const monthYear = `${date.toLocaleString('default', { month: 'short' })}`;
      
      if (!monthlyWaste[monthYear]) {
        monthlyWaste[monthYear] = 0;
      }
      
      monthlyWaste[monthYear] += entry.amount;
    });
    
    // Convert to array format for chart
    return Object.entries(monthlyWaste).map(([date, waste]) => ({
      date,
      waste
    }));
  };

  return (
    <div className="container mx-auto p-6">
      <Navbar />
      <h1 className="text-3xl font-bold mb-6" style={{paddingTop:'50px'}}>Waste Analysis</h1>
      
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Waste Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center h-[300px]">
                <p>Loading waste data...</p>
              </div>
            ) : (
              <WasteAnalytics data={wasteData} />
            )}
          </CardContent>
        </Card>
        
        <WasteStats />
      </div>
    </div>
  );
};

export default WasteAnalysis; 