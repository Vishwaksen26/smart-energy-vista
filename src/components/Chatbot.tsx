
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User, Lightbulb, Sparkles } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const predefinedResponses: Record<string, string> = {
  "hi": "Hello! How can I assist you with energy management today?",
  "hello": "Hi there! How can I help you manage your energy consumption?",
  "how does this system work": "Our Smart Energy Management System monitors your appliances in real-time, tracks consumption patterns, and provides intelligent insights to help you optimize energy usage and reduce costs.",
  "what appliances can i monitor": "You can monitor any electrical appliance including refrigerators, washing machines, air conditioners, televisions, lights, and more. Simply add them to your appliances page.",
  "how accurate are the bills": "Our bill calculations use real consumption data and current utility rates to provide accurate estimates. The demo uses sample data for demonstration purposes.",
  "can i set energy budgets": "Yes! You can set monthly energy budgets in your profile and receive notifications when you're approaching your limits.",
  "how do i add appliances": "Go to the Appliances page, click 'Add Appliance', fill in the details like name, location, and expected consumption, then save it to start monitoring.",
  "what is energy efficiency": "Energy efficiency means using less energy to provide the same level of performance. Our system helps identify inefficient appliances that consume more power than expected.",
  "how can i save money": "You can save money by identifying high-consumption appliances, setting energy usage schedules, replacing inefficient appliances, and following our personalized recommendations.",
  "what is kwh": "kWh (kilowatt-hour) is a unit of energy equal to the energy transferred or expended in one hour by one kilowatt of power. It's how your electricity consumption is measured by utility companies.",
  "what is a smart meter": "A smart meter is a device that records electricity consumption in short intervals and communicates that information back to the utility company for monitoring and billing purposes.",
  "how often is data updated": "In this demo, data is simulated. In a real implementation, data would be updated in real-time as it's received from your smart meters and connected appliances.",
  "what causes high electricity bills": "High electricity bills can be caused by inefficient appliances, leaving devices on standby, poor insulation, extreme weather requiring more heating/cooling, and energy-intensive activities.",
  "what appliances use most energy": "The biggest energy consumers in most homes are heating and cooling systems, water heaters, refrigerators, clothes dryers, and lighting systems.",
  "tips for saving energy": "To save energy: Turn off lights when not in use, unplug devices that aren't being used, use energy-efficient appliances, improve insulation, use programmable thermostats, and wash clothes in cold water.",
  "help": "I can help you with questions about energy monitoring, adding appliances, generating bills, understanding your consumption patterns, and system features. What would you like to know?",
  "how can i save electricity": "You can save electricity by: 1) Upgrading to energy-efficient appliances, 2) Installing LED lighting, 3) Using smart power strips to eliminate phantom energy use, 4) Utilizing natural light when possible, 5) Setting computers and devices to power-saving modes, 6) Properly insulating your home, and 7) Maintaining heating and cooling systems regularly.",
  "give me tips to save electricity": "Here are top electricity-saving tips: 1) Adjust your thermostat (lower in winter, higher in summer), 2) Wash clothes in cold water, 3) Air-dry clothes when possible, 4) Use power strips for electronics and turn them off when not in use, 5) Replace air filters regularly, 6) Use ceiling fans to reduce AC usage, 7) Cook with lids on pots to reduce cooking time, 8) Run dishwashers and washing machines only when full.",
  "best time to use appliances": "To save on electricity costs, try using major appliances during off-peak hours (typically evenings after 7pm, early mornings before 7am, and weekends). Some utility companies offer time-of-use rates that make electricity cheaper during these periods.",
  "energy saving myths": "Common energy myths include: 1) Leaving lights on uses less energy than turning them on/off (false), 2) Screen savers save energy (they don't, sleep mode does), 3) Closing vents saves energy (actually reduces HVAC efficiency), 4) Charging phone overnight damages battery and wastes energy (modern phones prevent overcharging).",
  "smart home energy savings": "Smart home devices can reduce energy usage by: 1) Using smart thermostats to optimize heating/cooling, 2) Installing motion sensors for lights, 3) Using smart plugs to schedule power to devices, 4) Setting up automated routines for energy management, and 5) Monitoring energy usage in real-time with smart meters.",
  "renewable energy options": "You can incorporate renewable energy through: 1) Solar panel installation, 2) Community solar programs, 3) Wind energy for suitable properties, 4) Choosing renewable energy plans from your utility provider, or 5) Installing solar water heaters which are more affordable than full solar systems.",
  "default": "I'm here to help with your energy management questions! Try asking about how the system works, adding appliances, or generating bills."
};

export const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your Energy Assistant. Ask me anything about the Smart Energy Management System!",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [suggestions] = useState([
    "How does this system work?",
    "What appliances use most energy?",
    "Tips for saving energy",
    "How can I save electricity?",
    "Best time to use appliances",
    "Smart home energy savings"
  ]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);

    // Find appropriate response
    const normalizedInput = input.toLowerCase();
    let response = predefinedResponses.default;
    
    for (const [key, value] of Object.entries(predefinedResponses)) {
      if (normalizedInput.includes(key.toLowerCase())) {
        response = value;
        break;
      }
    }

    // Simulate typing delay
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
    }, 800);

    setInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    
    // Add a small delay to make it feel more natural
    setTimeout(() => {
      handleSend();
    }, 100);
  };

  return (
    <div className="h-full flex flex-col">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start gap-3 animate-fade-in ${
                message.sender === "user" ? "flex-row-reverse" : ""
              }`}
            >
              <div className={`rounded-full p-2 ${
                message.sender === "user" 
                  ? "bg-blue-600 text-white" 
                  : "bg-gradient-to-br from-blue-400 to-purple-500 text-white"
              }`}>
                {message.sender === "user" ? (
                  <User className="h-4 w-4" />
                ) : (
                  <Sparkles className="h-4 w-4" />
                )}
              </div>
              <div className={`max-w-[80%] p-3 rounded-lg ${
                message.sender === "user"
                  ? "bg-blue-600 text-white ml-auto"
                  : "bg-white/80 backdrop-blur-sm shadow-md border border-purple-100 text-gray-900"
              }`}>
                <p className="text-sm">{message.text}</p>
                <span className="text-xs opacity-70 mt-1 block">
                  {message.timestamp.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </span>
              </div>
            </div>
          ))}
        </div>
        
        {messages.length === 1 && (
          <div className="mt-4 space-y-2">
            <p className="text-xs text-gray-500 font-medium flex items-center">
              <Lightbulb className="h-3 w-3 mr-1" /> SUGGESTED QUESTIONS
            </p>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="text-xs bg-blue-100 hover:bg-blue-200 text-blue-800 px-2 py-1 rounded-full transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}
      </ScrollArea>
      
      <div className="p-4 border-t border-gray-200">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything..."
            className="flex-1"
          />
          <Button onClick={handleSend} size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
