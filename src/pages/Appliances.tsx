
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Plus, Zap, MapPin, TrendingUp, TrendingDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Appliance {
  id: string;
  name: string;
  location: string;
  originalConsumption: number;
  currentConsumption: number;
  image: string;
}

const sampleAppliances: Appliance[] = [
  {
    id: "1",
    name: "Refrigerator",
    location: "Kitchen",
    originalConsumption: 150,
    currentConsumption: 145,
    image: "🧊"
  },
  {
    id: "2",
    name: "Washing Machine",
    location: "Utility Room",
    originalConsumption: 500,
    currentConsumption: 520,
    image: "🧺"
  },
  {
    id: "3",
    name: "Air Conditioner",
    location: "Living Room",
    originalConsumption: 1200,
    currentConsumption: 1350,
    image: "❄️"
  }
];

export default function Appliances() {
  const [appliances, setAppliances] = useState<Appliance[]>(sampleAppliances);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    originalConsumption: "",
    currentConsumption: "",
    image: "⚡"
  });
  const { toast } = useToast();

  const handleAddAppliance = () => {
    if (!formData.name || !formData.location || !formData.originalConsumption) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const newAppliance: Appliance = {
      id: Date.now().toString(),
      name: formData.name,
      location: formData.location,
      originalConsumption: parseInt(formData.originalConsumption),
      currentConsumption: parseInt(formData.currentConsumption) || parseInt(formData.originalConsumption),
      image: formData.image
    };

    setAppliances(prev => [...prev, newAppliance]);
    setFormData({
      name: "",
      location: "",
      originalConsumption: "",
      currentConsumption: "",
      image: "⚡"
    });
    setShowAddForm(false);
    
    toast({
      title: "Success",
      description: "Appliance added successfully!",
    });
  };

  const getEfficiencyStatus = (original: number, current: number) => {
    const difference = ((current - original) / original) * 100;
    if (difference <= -5) return { status: "excellent", color: "bg-green-500", text: "Excellent" };
    if (difference <= 5) return { status: "good", color: "bg-blue-500", text: "Good" };
    if (difference <= 15) return { status: "average", color: "bg-yellow-500", text: "Average" };
    return { status: "poor", color: "bg-red-500", text: "Poor" };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              My Appliances
            </h1>
            <p className="text-gray-600 mt-2">Monitor and manage your home appliances</p>
          </div>
          
          <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Appliance
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Appliance</DialogTitle>
                <DialogDescription>
                  Enter the details of your appliance to start monitoring its energy consumption.
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Appliance Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., Kitchen Refrigerator"
                  />
                </div>
                
                <div>
                  <Label htmlFor="location">Location *</Label>
                  <Select value={formData.location} onValueChange={(value) => setFormData(prev => ({ ...prev, location: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Kitchen">Kitchen</SelectItem>
                      <SelectItem value="Living Room">Living Room</SelectItem>
                      <SelectItem value="Bedroom">Bedroom</SelectItem>
                      <SelectItem value="Bathroom">Bathroom</SelectItem>
                      <SelectItem value="Utility Room">Utility Room</SelectItem>
                      <SelectItem value="Garage">Garage</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="original">Expected Consumption (Watts) *</Label>
                  <Input
                    id="original"
                    type="number"
                    value={formData.originalConsumption}
                    onChange={(e) => setFormData(prev => ({ ...prev, originalConsumption: e.target.value }))}
                    placeholder="e.g., 150"
                  />
                </div>
                
                <div>
                  <Label htmlFor="current">Current Consumption (Watts)</Label>
                  <Input
                    id="current"
                    type="number"
                    value={formData.currentConsumption}
                    onChange={(e) => setFormData(prev => ({ ...prev, currentConsumption: e.target.value }))}
                    placeholder="Leave empty to use expected value"
                  />
                </div>
                
                <div>
                  <Label htmlFor="emoji">Icon</Label>
                  <Select value={formData.image} onValueChange={(value) => setFormData(prev => ({ ...prev, image: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="🧊">🧊 Refrigerator</SelectItem>
                      <SelectItem value="🧺">🧺 Washing Machine</SelectItem>
                      <SelectItem value="❄️">❄️ Air Conditioner</SelectItem>
                      <SelectItem value="📺">📺 Television</SelectItem>
                      <SelectItem value="💡">💡 Light</SelectItem>
                      <SelectItem value="🔥">🔥 Heater</SelectItem>
                      <SelectItem value="⚡">⚡ Generic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button onClick={handleAddAppliance} className="w-full">
                  Add Appliance
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {appliances.map((appliance, index) => {
            const efficiency = getEfficiencyStatus(appliance.originalConsumption, appliance.currentConsumption);
            const consumptionDiff = appliance.currentConsumption - appliance.originalConsumption;
            
            return (
              <Card 
                key={appliance.id} 
                className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-4xl">{appliance.image}</div>
                      <div>
                        <CardTitle className="text-lg">{appliance.name}</CardTitle>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <MapPin className="h-3 w-3 mr-1" />
                          {appliance.location}
                        </div>
                      </div>
                    </div>
                    <Badge className={`${efficiency.color} text-white`}>
                      {efficiency.text}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Expected</span>
                      <span className="font-medium">{appliance.originalConsumption}W</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Current</span>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{appliance.currentConsumption}W</span>
                        {consumptionDiff !== 0 && (
                          <div className={`flex items-center text-xs ${
                            consumptionDiff > 0 ? 'text-red-600' : 'text-green-600'
                          }`}>
                            {consumptionDiff > 0 ? (
                              <TrendingUp className="h-3 w-3 mr-1" />
                            ) : (
                              <TrendingDown className="h-3 w-3 mr-1" />
                            )}
                            {Math.abs(consumptionDiff)}W
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center pt-2 border-t">
                      <span className="text-sm text-gray-600">Daily Cost</span>
                      <span className="font-bold text-green-600">
                        ${((appliance.currentConsumption * 24 * 0.12) / 1000).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {appliances.length === 0 && (
          <div className="text-center py-12">
            <Zap className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No appliances yet</h3>
            <p className="text-gray-500 mb-6">Start monitoring your energy consumption by adding your first appliance.</p>
            <Button onClick={() => setShowAddForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Appliance
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
