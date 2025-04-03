import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/layout/Navbar";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8081/api';

const WasteManagement = () => {
  const { toast } = useToast();
  const [wasteEntries, setWasteEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    type: "",
    amount: "",
    reason: "",
  });

  useEffect(() => {
    fetchWasteHistory();
  }, []);

  const fetchWasteHistory = async () => {
    try {
      const response = await fetch(`${API_URL}/waste/history`);
      if (!response.ok) {
        throw new Error('Failed to fetch waste history');
      }
      const data = await response.json();
      setWasteEntries(data.slice(0, 5)); // Get only the 5 most recent entries
    } catch (error) {
      console.error('Error fetching waste history:', error);
      toast({
        title: "Error",
        description: "Failed to fetch waste history. Please try again later.",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form data
    if (!formData.type || !formData.amount || !formData.reason) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Convert amount to number
    const amount = parseFloat(formData.amount);
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid amount greater than 0",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/waste`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          amount: amount // Send as number
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add waste entry');
      }

      const data = await response.json();
      
      // Update the waste entries list with the new entry
      setWasteEntries(prevEntries => [data, ...prevEntries].slice(0, 5));
      
      // Reset form
      setFormData({
        date: new Date().toISOString().split('T')[0],
        type: "",
        amount: "",
        reason: "",
      });

      toast({
        title: "Success",
        description: "Waste entry has been successfully recorded.",
      });
    } catch (error) {
      console.error('Error adding waste entry:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to add waste entry. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <Navbar/>
      <h1 className="text-3xl font-bold mb-6" style={{paddingTop:'50px'}}>Food Waste Management</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Add Waste Entry</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Waste Type</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => setFormData({ ...formData, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select waste type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="prep">Preparation Waste</SelectItem>
                    <SelectItem value="plate">Plate Waste</SelectItem>
                    <SelectItem value="storage">Storage Waste</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Amount (kg)</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.1"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="reason">Reason</Label>
                <Textarea
                  id="reason"
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  placeholder="Enter reason for waste..."
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>Add Entry</Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Waste History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {wasteEntries.length === 0 ? (
                <p className="text-muted-foreground">No waste entries recorded yet.</p>
              ) : (
                wasteEntries.map((entry, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{entry.type}</p>
                        <p className="text-sm text-muted-foreground">{entry.date}</p>
                      </div>
                      <p className="font-bold">{entry.amount} kg</p>
                    </div>
                    <p className="mt-2 text-sm">{entry.reason}</p>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WasteManagement; 