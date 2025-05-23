
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, TrendingUp, TrendingDown, Zap } from "lucide-react";

interface BillData {
  appliance: string;
  location: string;
  consumption: number; // kWh
  cost: number;
  efficiency: "excellent" | "good" | "average" | "poor";
}

const sampleBillData: BillData[] = [
  {
    appliance: "Air Conditioner",
    location: "Living Room",
    consumption: 324, // kWh per month
    cost: 38.88,
    efficiency: "poor"
  },
  {
    appliance: "Refrigerator", 
    location: "Kitchen",
    consumption: 104.4,
    cost: 12.53,
    efficiency: "excellent"
  },
  {
    appliance: "Washing Machine",
    location: "Utility Room", 
    consumption: 37.44,
    cost: 4.49,
    efficiency: "average"
  }
];

export default function Bills() {
  const [currentMonth] = useState(new Date().toLocaleString('default', { month: 'long', year: 'numeric' }));
  
  const totalConsumption = sampleBillData.reduce((sum, item) => sum + item.consumption, 0);
  const totalCost = sampleBillData.reduce((sum, item) => sum + item.cost, 0);
  const ratePerKwh = 0.12;
  
  const getEfficiencyColor = (efficiency: string) => {
    switch (efficiency) {
      case "excellent": return "bg-green-500";
      case "good": return "bg-blue-500"; 
      case "average": return "bg-yellow-500";
      case "poor": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const handleExportBill = () => {
    const billContent = `
SMART ENERGY MANAGEMENT SYSTEM
Electricity Bill - ${currentMonth}

Total Consumption: ${totalConsumption.toFixed(2)} kWh
Total Cost: $${totalCost.toFixed(2)}
Rate: $${ratePerKwh}/kWh

APPLIANCE BREAKDOWN:
${sampleBillData.map(item => 
  `${item.appliance} (${item.location}): ${item.consumption} kWh - $${item.cost.toFixed(2)}`
).join('\n')}

Generated on: ${new Date().toLocaleDateString()}
    `;
    
    const blob = new Blob([billContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `energy-bill-${currentMonth.toLowerCase().replace(' ', '-')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Electricity Bill
            </h1>
            <p className="text-gray-600 mt-2">{currentMonth}</p>
          </div>
          
          <Button 
            onClick={handleExportBill}
            className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
          >
            <Download className="h-4 w-4 mr-2" />
            Export Bill
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Zap className="h-5 w-5 mr-2" />
                Total Consumption
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalConsumption.toFixed(1)} kWh</div>
              <p className="text-blue-100 text-sm mt-1">This month</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-0 animate-fade-in" style={{ animationDelay: "100ms" }}>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <FileText className="h-5 w-5 mr-2" />
                Total Cost
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">${totalCost.toFixed(2)}</div>
              <p className="text-green-100 text-sm mt-1">@ ${ratePerKwh}/kWh</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-0 animate-fade-in" style={{ animationDelay: "200ms" }}>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <TrendingUp className="h-5 w-5 mr-2" />
                Avg. Daily
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{(totalConsumption / 30).toFixed(1)} kWh</div>
              <p className="text-purple-100 text-sm mt-1">${(totalCost / 30).toFixed(2)} per day</p>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Breakdown */}
        <Card className="animate-fade-in" style={{ animationDelay: "300ms" }}>
          <CardHeader>
            <CardTitle>Appliance Breakdown</CardTitle>
            <CardDescription>
              Detailed consumption and cost analysis for each appliance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {sampleBillData.map((item, index) => {
                const percentage = (item.consumption / totalConsumption) * 100;
                return (
                  <div key={index} className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">{item.appliance}</h4>
                        <p className="text-sm text-gray-500">{item.location}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">${item.cost.toFixed(2)}</div>
                        <div className="text-sm text-gray-500">{item.consumption} kWh</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Progress value={percentage} className="flex-1" />
                      <Badge className={`${getEfficiencyColor(item.efficiency)} text-white`}>
                        {item.efficiency}
                      </Badge>
                      <span className="text-sm font-medium w-12">
                        {percentage.toFixed(0)}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Previous Bills */}
        <Card className="mt-8 animate-fade-in" style={{ animationDelay: "400ms" }}>
          <CardHeader>
            <CardTitle>Previous Bills</CardTitle>
            <CardDescription>Historical electricity bills</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { month: "October 2024", amount: 52.45, consumption: 437.1, trend: "down" },
                { month: "September 2024", amount: 67.82, consumption: 565.2, trend: "up" },
                { month: "August 2024", amount: 58.93, consumption: 491.1, trend: "down" }
              ].map((bill, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-gray-400" />
                    <div>
                      <div className="font-medium">{bill.month}</div>
                      <div className="text-sm text-gray-500">{bill.consumption} kWh</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold">${bill.amount}</span>
                    {bill.trend === "up" ? (
                      <TrendingUp className="h-4 w-4 text-red-500" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-green-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
