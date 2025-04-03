import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from 'sonner';
import { BlurCard } from "@/components/ui/BlurCard";
import { cn } from "@/lib/utils";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8081/api';

const StudentForm = () => {
  const [formData, setFormData] = useState({
    regNo: '',
    name: '',
    block: '',
    roomNumber: '',
    mess: '',
    messType: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.regNo) {
      newErrors.regNo = 'Registration number is required';
    } else if (!/^\d{2}[A-Z]{3}\d{4}$/.test(formData.regNo)) {
      newErrors.regNo = 'Invalid registration number format (e.g., 23CSE0001)';
    }

    if (!formData.name) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters long';
    }

    if (!formData.block) {
      newErrors.block = 'Block is required';
    } else if (!/^[A-Z]$/.test(formData.block)) {
      newErrors.block = 'Block must be a single uppercase letter (A-Z)';
    }

    if (!formData.roomNumber) {
      newErrors.roomNumber = 'Room number is required';
    } else if (!/^\d{3}$/.test(formData.roomNumber)) {
      newErrors.roomNumber = 'Room number must be 3 digits';
    }

    if (!formData.mess) {
      newErrors.mess = 'Mess selection is required';
    }

    if (!formData.messType) {
      newErrors.messType = 'Mess type is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user makes a selection
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/students`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors && Array.isArray(data.errors)) {
          // Handle multiple validation errors
          data.errors.forEach(error => {
            toast.error(error);
          });
          return;
        }
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      toast.success(data.message || 'Student registered successfully!');
      setFormData({
        regNo: '',
        name: '',
        block: '',
        roomNumber: '',
        mess: '',
        messType: ''
      });
    } catch (error) {
      console.error('Registration error:', error);
      toast.error(error.message || 'Failed to register student. Please check if the server is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <BlurCard className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="regNo">Registration Number</Label>
          <Input
            id="regNo"
            name="regNo"
            value={formData.regNo}
            onChange={handleChange}
            placeholder=" 23BCEXXXX"
            maxLength={10}
            className={errors.regNo ? 'border-red-500' : ''}
            style={{
              backgroundColor: 'black',
              color: 'white'
            }}
          />
          {errors.regNo && (
            <p className="text-sm text-red-500">{errors.regNo}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder=" John Doe"
            maxLength={50}
            className={errors.name ? 'border-red-500' : ''}
            style={{
              backgroundColor: 'black',
              color: 'white'
            }}
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="block">Block</Label>
            <Input
              id="block"
              name="block"
              value={formData.block}
              onChange={handleChange}
              placeholder=" A"
              maxLength={1}
              className={errors.block ? 'border-red-500' : ''}
              style={{
                backgroundColor: 'black',
                color: 'white'
              }}
            />
            {errors.block && (
              <p className="text-sm text-red-500">{errors.block}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="roomNumber">Room Number</Label>
            <Input
              id="roomNumber"
              name="roomNumber"
              value={formData.roomNumber}
              onChange={handleChange}
              placeholder=" 101"
              maxLength={4}
              className={errors.roomNumber ? 'border-red-500' : ''}
              style={{
                backgroundColor: 'black',
                color: 'white'
              }}
            />
            {errors.roomNumber && (
              <p className="text-sm text-red-500">{errors.roomNumber}</p>
            )}
          </div>
        </div>

        <div className="space-y-2 relative">
  <Label htmlFor="mess" style={{ color: 'white' }}>Mess</Label>
  <Select
    value={formData.mess}
    onValueChange={(value) => handleSelectChange('mess', value)}
  >
    <SelectTrigger 
      className={errors.mess ? 'border-red-500' : ''}
      style={{
        backgroundColor: '#000', 
        color: '#fff', 
        border: '1px solid #fff',
        borderRadius: '4px',
        padding: '8px',
        width: '100%',
      }}
    >
      <SelectValue placeholder="Select mess" />
    </SelectTrigger>
    <SelectContent
      position="popper"
      style={{
        backgroundColor: '#000',
        color: '#fff',
        borderRadius: '4px',
        zIndex: 999,
        border: '1px solid #fff',
        width: '100%',
        padding: '4px 0',
      }}
    >
      <SelectItem value="Anna Mess" className="hover:bg-gray-700">Anna Mess</SelectItem>
      <SelectItem value="Bharathiar Mess" className="hover:bg-gray-700">Bharathiar Mess</SelectItem>
      <SelectItem value="Tagore Mess" className="hover:bg-gray-700">Tagore Mess</SelectItem>
      <SelectItem value="Gandhi Mess" className="hover:bg-gray-700">Gandhi Mess</SelectItem>
    </SelectContent>
  </Select>
  {errors.mess && (
    <p className="text-sm text-red-500">{errors.mess}</p>
  )}
</div>


        <div className="space-y-2">
          <Label>Mess Type</Label>
          <RadioGroup
            value={formData.messType}
            onValueChange={(value) => handleSelectChange('messType', value)}
            className={errors.messType ? 'border-red-500' : ''}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Veg" id="veg" />
              <Label htmlFor="veg">Veg</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Non-Veg" id="non-veg" />
              <Label htmlFor="non-veg">Non-Veg</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Special" id="special" />
              <Label htmlFor="special">Special</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Night mess" id="night-mess" />
              <Label htmlFor="night-mess">Night mess</Label>
            </div>
          </RadioGroup>
          {errors.messType && (
            <p className="text-sm text-red-500">{errors.messType}</p>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Registering...' : 'Register Student'}
        </Button>
      </form>
    </BlurCard>
  );
};

export default StudentForm; 