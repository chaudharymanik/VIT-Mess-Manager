import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { BlurCard } from "@/components/ui/BlurCard";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

const SuggestionForm = () => {
  const [formData, setFormData] = useState({
    mealType: "",
    suggestion: "",
    feasibleForMassProduction: false,
    priority: "medium",
    allergies: false,
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.mealType) {
      newErrors.mealType = "Please select a meal type";
    }
    if (!formData.suggestion.trim()) {
      newErrors.suggestion = "Please enter your suggestion";
    } else if (formData.suggestion.trim().length < 10) {
      newErrors.suggestion = "Suggestion must be at least 10 characters long";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleTextareaChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSwitchChange = (name, checked) => {
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Suggestion submitted successfully!");
      setFormData({
        mealType: "",
        suggestion: "",
        feasibleForMassProduction: false,
        priority: "medium",
        allergies: false,
      });
      setErrors({});
    } catch (error) {
      toast.error("Failed to submit suggestion. Please try again.");
      console.error("Form submission error:", error);
    } finally {
      setLoading(false);
    }
  };

  const mealTypes = ["Breakfast", "Lunch", "Snacks", "Dinner", "Night mess"];

  return (
    <BlurCard variant="elevated" className="w-full max-w-2xl mx-auto p-8">
      <div className="space-y-2 mb-6">
        <div className="chip">Suggestions</div>
        <h2 className="heading-2">Food Suggestions</h2>
        <p className="body-text">Help us improve the mess menu with your food suggestions</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="mealType">Meal Type</Label>
            <Select 
              onValueChange={(value) => handleSelectChange("mealType", value)}
              value={formData.mealType}
            >
              <SelectTrigger className={cn(
                "w-full",
                errors.mealType && "border-red-500"
              )}>
                <SelectValue placeholder="Select meal type" />
              </SelectTrigger>
              <SelectContent>
                {mealTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.mealType && (
              <p className="text-sm text-red-500 mt-1">{errors.mealType}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="suggestion">Food Item Suggestion</Label>
            <Textarea
              id="suggestion"
              name="suggestion"
              placeholder="Describe your food suggestion in detail"
              value={formData.suggestion}
              onChange={handleTextareaChange}
              className={cn(
                "min-h-32 transition-all duration-200 focus:ring-2 focus:ring-primary/20",
                errors.suggestion && "border-red-500"
              )}
            />
            {errors.suggestion && (
              <p className="text-sm text-red-500 mt-1">{errors.suggestion}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label>Priority Level</Label>
            <RadioGroup 
              onValueChange={(value) => handleSelectChange("priority", value)}
              value={formData.priority}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="low" id="low" />
                <Label htmlFor="low" className="cursor-pointer">Low</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="medium" id="medium" />
                <Label htmlFor="medium" className="cursor-pointer">Medium</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="high" id="high" />
                <Label htmlFor="high" className="cursor-pointer">High</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0">
              <Label htmlFor="feasibleForMassProduction" className="cursor-pointer">
                Feasible for Mass Production
              </Label>
              <p className="text-sm text-muted-foreground">
                Can it be easily prepared for many students?
              </p>
            </div>
            <Switch
              id="feasibleForMassProduction"
              checked={formData.feasibleForMassProduction}
              onCheckedChange={(checked) => handleSwitchChange("feasibleForMassProduction", checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0">
              <Label htmlFor="allergies" className="cursor-pointer">
                Contains Common Allergens
              </Label>
              <p className="text-sm text-muted-foreground">
                Does your suggestion contain nuts, dairy, gluten, etc?
              </p>
            </div>
            <Switch
              id="allergies"
              checked={formData.allergies}
              onCheckedChange={(checked) => handleSwitchChange("allergies", checked)}
            />
          </div>
        </div>
        
        <Button 
          type="submit" 
          disabled={loading}
          className="w-full md:w-auto bg-primary hover:bg-primary/90 transition-all"
        >
          {loading ? "Submitting..." : "Submit Suggestion"}
        </Button>
      </form>
    </BlurCard>
  );
};

export default SuggestionForm; 