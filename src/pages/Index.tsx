
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, BarChart3, DollarSign, Settings, MessageCircle, X } from "lucide-react";
import { Chatbot } from "@/components/Chatbot";

const Index = () => {
  const [showChatbot, setShowChatbot] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Zap className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                SmartEnergy
              </span>
            </div>
            <div className="hidden md:flex space-x-6">
              <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">Home</Link>
              <Link to="/appliances" className="text-gray-700 hover:text-blue-600 transition-colors">Appliances</Link>
              <Link to="/bills" className="text-gray-700 hover:text-blue-600 transition-colors">Generate Bill</Link>
              <Link to="/profile" className="text-gray-700 hover:text-blue-600 transition-colors">Profile</Link>
              <Link to="/login" className="text-gray-700 hover:text-blue-600 transition-colors">Login</Link>
            </div>
          </div>
        </div>
      </nav>

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

      {/* Chatbot Widget */}
      <div className="fixed bottom-6 right-6 z-50">
        {!showChatbot && (
          <Button
            onClick={() => setShowChatbot(true)}
            className="rounded-full w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg animate-bounce"
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
        )}
        
        {showChatbot && (
          <Card className="w-80 h-96 shadow-xl animate-scale-in">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Energy Assistant</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowChatbot(false)}
                  className="text-white hover:bg-white/20"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Chatbot />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Index;
