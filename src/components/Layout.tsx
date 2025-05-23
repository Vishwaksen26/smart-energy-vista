
import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Chatbot } from "@/components/Chatbot";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, X } from "lucide-react";
import { AuthPage } from "@/components/AuthPage";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const [showChatbot, setShowChatbot] = useState(false);
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isSignedIn) {
    return <AuthPage />;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-white/80 backdrop-blur-md px-4">
            <SidebarTrigger className="-ml-1" />
            <div className="flex-1" />
          </header>
          
          <main className="flex-1 p-4 animate-fade-in">
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
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};
