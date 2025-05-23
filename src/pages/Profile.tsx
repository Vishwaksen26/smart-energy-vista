
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Phone, MapPin, Home, DollarSign, Calendar, Edit3, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UserProfile {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  homeSize: string;
  monthlyBudget: string;
}

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    fullName: "John Smith",
    email: "john.smith@email.com",
    phone: "(555) 123-4567",
    address: "123 Green Street, Eco City, EC 12345",
    homeSize: "1,200 sq ft",
    monthlyBudget: "80"
  });
  const { toast } = useToast();

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been saved successfully!",
    });
  };

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const billHistory = [
    { date: "Nov 2024", amount: 55.67, status: "current" },
    { date: "Oct 2024", amount: 52.45, status: "paid" },
    { date: "Sep 2024", amount: 67.82, status: "paid" },
    { date: "Aug 2024", amount: 58.93, status: "paid" },
    { date: "Jul 2024", amount: 71.23, status: "paid" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Profile
            </h1>
            <p className="text-gray-600 mt-2">Manage your account and preferences</p>
          </div>
          
          <Button 
            onClick={isEditing ? handleSave : () => setIsEditing(true)}
            variant={isEditing ? "default" : "outline"}
            className={isEditing ? "bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700" : ""}
          >
            {isEditing ? (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </>
            ) : (
              <>
                <Edit3 className="h-4 w-4 mr-2" />
                Edit Profile
              </>
            )}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal details and contact information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-6">
                  <Avatar className="h-20 w-20">
                    <AvatarFallback className="text-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                      {profile.fullName.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-semibold">{profile.fullName}</h3>
                    <p className="text-gray-500">Energy Management User</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName" className="flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      Full Name
                    </Label>
                    <Input
                      id="fullName"
                      value={profile.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      disabled={!isEditing}
                      className={!isEditing ? "bg-gray-50" : ""}
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="flex items-center">
                      <Mail className="h-4 w-4 mr-2" />
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      disabled={!isEditing}
                      className={!isEditing ? "bg-gray-50" : ""}
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="flex items-center">
                      <Phone className="h-4 w-4 mr-2" />
                      Phone
                    </Label>
                    <Input
                      id="phone"
                      value={profile.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      disabled={!isEditing}
                      className={!isEditing ? "bg-gray-50" : ""}
                    />
                  </div>

                  <div>
                    <Label htmlFor="homeSize" className="flex items-center">
                      <Home className="h-4 w-4 mr-2" />
                      Home Size
                    </Label>
                    <Input
                      id="homeSize"
                      value={profile.homeSize}
                      onChange={(e) => handleInputChange('homeSize', e.target.value)}
                      disabled={!isEditing}
                      className={!isEditing ? "bg-gray-50" : ""}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="address" className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    Address
                  </Label>
                  <Input
                    id="address"
                    value={profile.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    disabled={!isEditing}
                    className={!isEditing ? "bg-gray-50" : ""}
                  />
                </div>

                <div>
                  <Label htmlFor="budget" className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-2" />
                    Monthly Budget (USD)
                  </Label>
                  <Input
                    id="budget"
                    type="number"
                    value={profile.monthlyBudget}
                    onChange={(e) => handleInputChange('monthlyBudget', e.target.value)}
                    disabled={!isEditing}
                    className={!isEditing ? "bg-gray-50" : ""}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Current Month Summary */}
            <Card className="animate-fade-in" style={{ animationDelay: "100ms" }}>
              <CardHeader>
                <CardTitle className="text-lg">This Month</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Current Bill</span>
                    <span className="font-bold text-green-600">$55.67</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Budget</span>
                    <span className="font-medium">${profile.monthlyBudget}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Remaining</span>
                    <span className={`font-bold ${
                      parseFloat(profile.monthlyBudget) - 55.67 > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      ${(parseFloat(profile.monthlyBudget) - 55.67).toFixed(2)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Bill History */}
            <Card className="animate-fade-in" style={{ animationDelay: "200ms" }}>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Calendar className="h-5 w-5 mr-2" />
                  Bill History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {billHistory.map((bill, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <div>
                        <span className="font-medium">{bill.date}</span>
                        <Badge 
                          variant={bill.status === "current" ? "default" : "secondary"}
                          className="ml-2 text-xs"
                        >
                          {bill.status}
                        </Badge>
                      </div>
                      <span className="font-bold">${bill.amount}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
