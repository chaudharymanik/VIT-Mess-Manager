import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { BlurCard } from "@/components/ui/BlurCard";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const MenuSelectionForm = () => {
  const [formData, setFormData] = useState({
    studentId: "",
    mealType: "",
    suggestion: "",
    feasibleForMassProduction: false,
    date: new Date().toISOString().split('T')[0],
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const formRef = useRef(null);
  
  // Mock student data for demo purposes
  const students = [
    { id: "1", name: "John Doe", regNo: "23CS001" },
    { id: "2", name: "Jane Smith", regNo: "23CS002" },
    { id: "3", name: "Robert Johnson", regNo: "23CS003" },
  ];

  const validateForm = () => {
    const newErrors = {};
    if (!formData.studentId) {
      newErrors.studentId = "Please select a student";
    }
    if (!formData.mealType) {
      newErrors.mealType = "Please select a meal type";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user makes a selection
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleTextareaChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked) => {
    setFormData((prev) => ({ ...prev, feasibleForMassProduction: checked }));
  };

  const handleDateChange = (date) => {
    if (date) {
      setFormData((prev) => ({ ...prev, date }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("Menu selection submitted successfully!");
      
      // Reset form with animation
      if (formRef.current) {
        formRef.current.reset();
      }
      
      setFormData({
        studentId: "",
        mealType: "",
        suggestion: "",
        feasibleForMassProduction: false,
        date: new Date().toISOString().split('T')[0],
      });
      setErrors({});
    } catch (error) {
      toast.error("Failed to submit menu selection. Please try again.");
      console.error("Form submission error:", error);
    } finally {
      setLoading(false);
    }
  };

  const mealTypes = ["Breakfast", "Lunch", "Snacks", "Dinner", "Night mess"];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <BlurCard variant="elevated" className="w-full max-w-2xl mx-auto p-4 sm:p-8 bg-card/50">
        <motion.div className="space-y-2 mb-6" variants={itemVariants}>
          <div className="chip animate-in" style={{ color: 'white' }}>Menu Selection</div>
          <h2 className="heading-2" style={{ color: 'white' }}>Meal Preferences</h2>
          <p className="body-text" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Select your meal preferences and suggest food items</p>
        </motion.div>
        <Card style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <motion.div className="space-y-2" variants={itemVariants}>
              <Label htmlFor="studentId" className="text-sm font-medium" style={{ color: 'white' }}>Select Student</Label>
              <Select 
                onValueChange={(value) => handleSelectChange("studentId", value)}
                value={formData.studentId}
              >
                <SelectTrigger style={{ 
                  backgroundColor: 'rgba(0, 0, 0, 0.8)', 
                  color: 'white',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                  }
                }}>
                  <SelectValue placeholder="Select a student" />
                </SelectTrigger>
                <SelectContent style={{ 
                  backgroundColor: 'rgba(0, 0, 0, 0.8)', 
                  color: 'white',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}>
                  {students.map((student) => (
                    <SelectItem 
                      key={student.id} 
                      value={student.id}
                      style={{
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.1)'
                        }
                      }}
                    >
                      {student.name} ({student.regNo})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.studentId && (
                <p className="text-sm text-red-500 mt-1 animate-in">{errors.studentId}</p>
              )}
            </motion.div>
            
            <motion.div className="space-y-2" variants={itemVariants}>
              <Label htmlFor="mealType" className="text-sm font-medium" style={{ color: 'white' }}>Meal Type</Label>
              <Select 
                onValueChange={(value) => handleSelectChange("mealType", value)}
                value={formData.mealType}
              >
                <SelectTrigger style={{ 
                  backgroundColor: 'rgba(0, 0, 0, 0.8)', 
                  color: 'white',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                  }
                }}>
                  <SelectValue placeholder="Select meal type" />
                </SelectTrigger>
                <SelectContent style={{ 
                  backgroundColor: 'rgba(0, 0, 0, 0.8)', 
                  color: 'white',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}>
                  {mealTypes.map((type) => (
                    <SelectItem 
                      key={type} 
                      value={type}
                      style={{
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.1)'
                        }
                      }}
                    >
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.mealType && (
                <p className="text-sm text-red-500 mt-1 animate-in">{errors.mealType}</p>
              )}
            </motion.div>
            <CardContent>
            <motion.div className="space-y-2" variants={itemVariants}>
              <Label htmlFor="date" className="text-sm font-medium" style={{ color: 'white' }}>Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <motion.div 
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <Button
                      variant="outline"
                      style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        color: 'white',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.1)'
                        }
                      }}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.date ? format(formData.date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </motion.div>
                </PopoverTrigger>
                <PopoverContent style={{ 
                  backgroundColor: 'rgba(0, 0, 0, 0.8)', 
                  color: 'white',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}>
                  <Calendar
                    mode="single"
                    selected={formData.date}
                    onSelect={handleDateChange}
                    initialFocus
                    className="p-3"
                  />
                </PopoverContent>
              </Popover>
            </motion.div>
            </CardContent>
            <motion.div className="space-y-2" variants={itemVariants}>
              <Label htmlFor="suggestion" className="text-sm font-medium" style={{ color: 'white' }}>Food Item Suggestion</Label>
              <Textarea
                id="suggestion"
                name="suggestion"
                placeholder="Suggest food items you would like to see on the menu"
                value={formData.suggestion}
                onChange={handleTextareaChange}
                style={{
                  backgroundColor: 'black',
                  color: 'white',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  '&:hover': {
                    borderColor: 'rgba(255, 255, 255, 0.3)'
                  }
                }}
              />
            </motion.div>
            
            <motion.div 
              className="flex items-start space-x-2 p-2 rounded-md hover:bg-primary/5 transition-colors"
              variants={itemVariants}
              whileHover={{ scale: 1.01 }}
            >
              <Checkbox
                id="feasibleForMassProduction"
                checked={formData.feasibleForMassProduction}
                onCheckedChange={handleCheckboxChange}
                className="data-[state=checked]:animate-pulse-soft"
              />
              <div className="space-y-1">
                <Label 
                  htmlFor="feasibleForMassProduction"
                  className="text-sm font-medium cursor-pointer"
                >
                  Feasible for Mass Production
                </Label>
                <p className="text-sm text-muted-foreground">
                  Check this if the suggested food items can be prepared in large quantities
                </p>
              </div>
            </motion.div>
          </div>
          
          <motion.div variants={itemVariants}>
            <Button 
              type="submit" 
              disabled={loading}
              className={cn(
                "w-full md:w-auto bg-primary hover:bg-primary/90 transition-all",
                "focus:ring-2 focus:ring-primary/20 focus:ring-offset-2",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                "animate-in"
              )}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  Submitting...
                </span>
              ) : (
                "Submit Selection"
              )}
            </Button>
          </motion.div>
        </form>
        </Card>
      </BlurCard>
    </motion.div>
  );
};

export default MenuSelectionForm; 