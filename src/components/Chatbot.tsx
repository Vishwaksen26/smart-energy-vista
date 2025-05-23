
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const predefinedResponses: Record<string, string> = {
  "how does this system work": "Our Smart Energy Management System monitors your appliances in real-time, tracks consumption patterns, and provides intelligent insights to help you optimize energy usage and reduce costs.",
  "what appliances can i monitor": "You can monitor any electrical appliance including refrigerators, washing machines, air conditioners, televisions, lights, and more. Simply add them to your appliances page.",
  "how accurate are the bills": "Our bill calculations use real consumption data and current utility rates to provide accurate estimates. The demo uses sample data for demonstration purposes.",
  "can i set energy budgets": "Yes! You can set monthly energy budgets in your profile and receive notifications when you're approaching your limits.",
  "how do i add appliances": "Go to the Appliances page, click 'Add Appliance', fill in the details like name, location, and expected consumption, then save it to start monitoring.",
  "what is energy efficiency": "Energy efficiency means using less energy to provide the same level of performance. Our system helps identify inefficient appliances that consume more power than expected.",
  "help": "I can help you with questions about energy monitoring, adding appliances, generating bills, understanding your consumption patterns, and system features. What would you like to know?",
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
    }, 1000);

    setInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend();
    }
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
                  : "bg-gray-200 text-gray-700"
              }`}>
                {message.sender === "user" ? (
                  <User className="h-4 w-4" />
                ) : (
                  <Bot className="h-4 w-4" />
                )}
              </div>
              <div className={`max-w-[80%] p-3 rounded-lg ${
                message.sender === "user"
                  ? "bg-blue-600 text-white ml-auto"
                  : "bg-gray-100 text-gray-900"
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
          <Button onClick={handleSend} size="sm">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
