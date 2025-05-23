
import { SignIn, SignUp, useUser } from '@clerk/clerk-react'
import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Zap } from 'lucide-react'

export const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false)
  const { isLoaded, isSignedIn } = useUser()

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (isSignedIn) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Zap className="h-10 w-10 text-blue-600" />
            <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              SmartEnergy
            </span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            {isSignUp ? "Join SmartEnergy" : "Welcome Back"}
          </h1>
          <p className="text-gray-600 mt-2">
            {isSignUp 
              ? "Start managing your energy consumption today" 
              : "Sign in to your energy management dashboard"
            }
          </p>
        </div>

        <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm animate-scale-in">
          <CardContent className="p-0">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg p-4 text-center">
              <h2 className="text-xl font-semibold">
                {isSignUp ? "Create Your Account" : "Sign In"}
              </h2>
            </div>
            
            <div className="p-6">
              {isSignUp ? (
                <SignUp 
                  appearance={{
                    elements: {
                      rootBox: "w-full",
                      card: "shadow-none border-0 bg-transparent",
                      headerTitle: "hidden",
                      headerSubtitle: "hidden"
                    }
                  }}
                  routing="virtual"
                  fallbackRedirectUrl="/"
                />
              ) : (
                <SignIn 
                  appearance={{
                    elements: {
                      rootBox: "w-full",
                      card: "shadow-none border-0 bg-transparent",
                      headerTitle: "hidden",
                      headerSubtitle: "hidden"
                    }
                  }}
                  routing="virtual"
                  fallbackRedirectUrl="/"
                />
              )}
              
              <div className="mt-6 text-center border-t border-gray-100 pt-4">
                <p className="text-sm text-gray-600">
                  {isSignUp ? "Already have an account?" : "Don't have an account?"}
                </p>
                <Button
                  variant="link"
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-blue-600 hover:text-blue-800 p-0 h-auto"
                >
                  {isSignUp ? "Sign in here" : "Sign up here"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
