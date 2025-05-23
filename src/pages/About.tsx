
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Zap, Target, Users, Lightbulb } from "lucide-react"

export default function About() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            About SmartEnergy
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Empowering homes and businesses to make smarter energy decisions through innovative technology and data-driven insights.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="border-0 shadow-lg bg-white/60 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <Target className="h-12 w-12 text-blue-600 mb-4" />
              <CardTitle>Our Mission</CardTitle>
              <CardDescription>
                To revolutionize energy management by providing intuitive tools that help users monitor, understand, and optimize their energy consumption for a sustainable future.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-0 shadow-lg bg-white/60 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <Lightbulb className="h-12 w-12 text-purple-600 mb-4" />
              <CardTitle>Our Vision</CardTitle>
              <CardDescription>
                A world where every home and business has the power to make informed energy decisions, contributing to a cleaner and more efficient energy ecosystem.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        <Card className="border-0 shadow-lg bg-white/60 backdrop-blur-sm mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-6 w-6 text-green-600" />
              <span>Our Story</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed">
              SmartEnergy was founded with the belief that energy management should be accessible, intuitive, and impactful. 
              Our team of energy experts and technology enthusiasts came together to create a platform that bridges the gap 
              between complex energy data and actionable insights. We're committed to helping our users reduce their carbon 
              footprint while saving money on their energy bills.
            </p>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-blue-50 rounded-lg">
            <div className="text-3xl font-bold text-blue-600 mb-2">10K+</div>
            <p className="text-gray-600">Active Users</p>
          </div>
          <div className="text-center p-6 bg-purple-50 rounded-lg">
            <div className="text-3xl font-bold text-purple-600 mb-2">25%</div>
            <p className="text-gray-600">Average Energy Savings</p>
          </div>
          <div className="text-center p-6 bg-green-50 rounded-lg">
            <div className="text-3xl font-bold text-green-600 mb-2">500+</div>
            <p className="text-gray-600">Supported Appliances</p>
          </div>
        </div>
      </div>
    </div>
  )
}
