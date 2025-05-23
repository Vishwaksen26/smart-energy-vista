
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, DollarSign, Settings } from "lucide-react";

const Index = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-fade-in">
            Smart Energy Management
          </h1>
          <p className="text-xl text-gray-600 mb-8 animate-fade-in">
            Monitor, optimize, and control your home's energy consumption with intelligent insights and real-time analytics.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all">
              <Link to="/appliances">Get Started</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="hover:bg-blue-50 transform hover:scale-105 transition-all">
              <Link to="/bills">View Demo</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="border-0 shadow-lg bg-white/60 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <CardHeader>
              <BarChart3 className="h-12 w-12 text-blue-600 mb-4" />
              <CardTitle>Real-time Monitoring</CardTitle>
              <CardDescription>
                Track your appliances' energy consumption in real-time with detailed analytics and insights.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg bg-white/60 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <CardHeader>
              <DollarSign className="h-12 w-12 text-green-600 mb-4" />
              <CardTitle>Cost Optimization</CardTitle>
              <CardDescription>
                Generate accurate bills and identify opportunities to reduce your energy costs.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg bg-white/60 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <CardHeader>
              <Settings className="h-12 w-12 text-purple-600 mb-4" />
              <CardTitle>Smart Controls</CardTitle>
              <CardDescription>
                Manage all your appliances from one dashboard with intelligent automation features.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Index;
