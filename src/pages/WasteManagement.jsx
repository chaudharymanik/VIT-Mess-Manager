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
      setWasteEntries(data.slice(0, 4)); // Get only the 4 most recent entries
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
      
      setWasteEntries(prevEntries => [data, ...prevEntries].slice(0, 4));
      
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
      <h1 className="text-3xl font-bold mb-6" style={{paddingTop:'50px', color: 'white'}}>Food Waste Management</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <CardHeader>
            <CardTitle style={{ color: 'white' }}>Add Waste Entry</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="date" style={{ color: 'white' }}>Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type" style={{ color: 'white' }}>Waste Type</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => setFormData({ ...formData, type: value })}
                >
                  <SelectTrigger style={{ 
                    backgroundColor: 'black', 
                    color: 'white',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)'
                    }
                  }}>
                    <SelectValue placeholder="Select waste type" />
                  </SelectTrigger>
                  <SelectContent style={{ 
                    backgroundColor: 'black', 
                    color: 'white',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                  }}>
                    <SelectItem 
                      value="prep"
                      style={{
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.1)'
                        }
                      }}
                    >
                      Preparation Waste
                    </SelectItem>
                    <SelectItem 
                      value="plate"
                      style={{
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.1)'
                        }
                      }}
                    >
                      Plate Waste
                    </SelectItem>
                    <SelectItem 
                      value="storage"
                      style={{
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.1)'
                        }
                      }}
                    >
                      Storage Waste
                    </SelectItem>
                    <SelectItem 
                      value="other"
                      style={{
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.1)'
                        }
                      }}
                    >
                      Other
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount" style={{ color: 'white' }}>Amount (kg)</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.1"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  style={{
                    backgroundColor: 'black',
                    color: 'white',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                  }}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="reason" style={{ color: 'white' }}>Reason</Label>
                <Textarea
                  id="reason"
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  placeholder="Enter reason for waste..."
                  style={{
                    backgroundColor: 'black',
                    color: 'white',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                  }}
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>Add Entry</Button>
            </form>
          </CardContent>
        </Card>

        <Card style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <CardHeader>
            <CardTitle style={{ color: 'white' }}>Waste History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {wasteEntries.length === 0 ? (
                <p className="text-muted-foreground" style={{ color: 'white' }}>No waste entries recorded yet.</p>
              ) : (
                wasteEntries.map((entry, index) => (
                  <div key={index} className="border rounded-lg p-4" style={{ 
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)'
                  }}>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium" style={{ color: 'white' }}>{entry.type}</p>
                        <p className="text-sm text-muted-foreground" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>{entry.date}</p>
                      </div>
                      <p className="font-bold" style={{ color: 'white' }}>{entry.amount} kg</p>
                    </div>
                    <p className="mt-2 text-sm" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>{entry.reason}</p>
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