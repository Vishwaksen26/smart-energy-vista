
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Zap, MessageCircle, X, Sparkles } from "lucide-react";
import { Chatbot } from "@/components/Chatbot";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const [showChatbot, setShowChatbot] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? "text-blue-600 font-medium" : "text-gray-700 hover:text-blue-600";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-40 animate-fade-in">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Zap className="h-8 w-8 text-blue-600" />
              <Link to="/">
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  SmartEnergy
                </span>
              </Link>
            </div>
            <div className="hidden md:flex space-x-6">
              <Link to="/" className={`transition-colors ${isActive("/")}`}>Home</Link>
              <Link to="/appliances" className={`transition-colors ${isActive("/appliances")}`}>Appliances</Link>
              <Link to="/bills" className={`transition-colors ${isActive("/bills")}`}>Generate Bill</Link>
              <Link to="/profile" className={`transition-colors ${isActive("/profile")}`}>Profile</Link>
              <Link to="/login" className={`transition-colors ${isActive("/login")}`}>Login</Link>
            </div>
            <div className="md:hidden">
              {/* Mobile menu button would go here in a real implementation */}
              <Button variant="ghost" size="sm">
                <span className="sr-only">Open menu</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="4" x2="20" y1="12" y2="12" />
                  <line x1="4" x2="20" y1="6" y2="6" />
                  <line x1="4" x2="20" y1="18" y2="18" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <main className="animate-fade-in">
        {children}
      </main>

      {/* Chatbot Widget */}
      <div className="fixed bottom-6 right-6 z-50">
        {!showChatbot && (
          <Button
            onClick={() => setShowChatbot(true)}
            className="rounded-full w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg group animate-pulse hover:animate-none"
          >
            <Sparkles className="h-6 w-6 group-hover:scale-110 transition-transform" />
          </Button>
        )}
        
        {showChatbot && (
          <Card className="w-80 h-96 shadow-xl animate-scale-in">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg p-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Sparkles className="h-5 w-5 mr-2" />
                  <h3 className="text-lg font-semibold">Energy Assistant</h3>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowChatbot(false)}
                  className="text-white hover:bg-white/20 h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <CardContent className="p-0 h-[calc(100%-48px)]">
              <Chatbot />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};
