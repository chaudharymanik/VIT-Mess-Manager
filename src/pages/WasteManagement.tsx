import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

interface WasteEntry {
  date: string;
  type: string;
  amount: string;
  reason: string;
}

const WasteManagement = () => {
  const { toast } = useToast();
  const [wasteEntries, setWasteEntries] = useState<WasteEntry[]>([]);
  const [formData, setFormData] = useState<WasteEntry>({
    date: new Date().toISOString().split('T')[0],
    type: "",
    amount: "",
    reason: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setWasteEntries([...wasteEntries, formData]);
    setFormData({
      date: new Date().toISOString().split('T')[0],
      type: "",
      amount: "",
      reason: "",
    });
    toast({
      title: "Waste entry added",
      description: "Your waste entry has been successfully recorded.",
    });
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Food Waste Management</h1>
      
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

              <Button type="submit" className="w-full">Add Entry</Button>
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