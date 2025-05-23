
import { useUser, UserButton } from '@clerk/clerk-react'
import { Link, useLocation } from 'react-router-dom'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { 
  Home, 
  Zap, 
  Calculator, 
  FileText, 
  User, 
  Info, 
  MessageCircle,
  LogIn 
} from 'lucide-react'

const menuItems = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Appliances",
    url: "/appliances",
    icon: Zap,
  },
  {
    title: "Generate Bill",
    url: "/bills",
    icon: FileText,
  },
  {
    title: "View Profile",
    url: "/profile",
    icon: User,
  },
  {
    title: "About",
    url: "/about",
    icon: Info,
  },
  {
    title: "Contact Us",
    url: "/contact",
    icon: MessageCircle,
  },
]

export function AppSidebar() {
  const { user } = useUser()
  const location = useLocation()

  const isActive = (path: string) => {
    return location.pathname === path
  }

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-gray-200 p-4">
        <div className="flex items-center space-x-2">
          <Zap className="h-8 w-8 text-blue-600" />
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            SmartEnergy
          </span>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <Link to={item.url} className="flex items-center space-x-2">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="border-t border-gray-200 p-4">
        {user ? (
          <div className="flex items-center space-x-3">
            <UserButton 
              appearance={{
                elements: {
                  avatarBox: "h-8 w-8"
                }
              }}
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user.fullName || user.emailAddresses[0]?.emailAddress}
              </p>
              <p className="text-xs text-gray-500">
                {user.emailAddresses[0]?.emailAddress}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center space-x-2 text-gray-600">
            <LogIn className="h-4 w-4" />
            <span className="text-sm">Not signed in</span>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  )
}
