"use client"

import { useState, useEffect } from "react"
import { useAuthContext } from "@/components/auth-provider"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  Settings, 
  Search, 
  Twitter, 
  Instagram, 
  Newspaper, 
  Save, 
  Plus, 
  Trash2,
  LogOut,
  Bell,
  User,
  BarChart3,
  TrendingUp,
  MessageCircle,
  History,
  AlertTriangle
} from "lucide-react"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("settings")
  const { user, isAuthenticated, isLoading, logout } = useAuthContext()
  const router = useRouter()

  // Settings state
  const [keywords, setKeywords] = useState([
    { id: 1, keyword: "gpt5", isActive: true, platforms: ["twitter", "news"] }
  ])
  const [newKeyword, setNewKeyword] = useState("")
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([])

  // Check authentication on mount
  useEffect(() => {
    console.log('Settings: Authentication state:', { isAuthenticated, user, isLoading })
    
    // Don't redirect while still loading
    if (isLoading) {
      console.log('Settings: Still loading auth state, waiting...')
      return
    }
    
    if (!isAuthenticated) {
      console.log('Settings: Not authenticated, redirecting to home')
      router.push('/')
    }
  }, [isAuthenticated, isLoading, router, user])

  // Show loading if checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#B10100] mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    )
  }
  
  // Show loading if not authenticated (but not loading)
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#B10100] mx-auto mb-4"></div>
          <p className="text-gray-600">Redirecting to login...</p>
        </div>
      </div>
    )
  }

  const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3, active: false },
    { id: "spike", label: "Spike Monitor", icon: TrendingUp, active: false },
    { id: "sentiment", label: "Sentiment Trends", icon: MessageCircle, active: false },
    { id: "history", label: "Alert History", icon: History, active: false },
    { id: "reports", label: "Crisis Reports", icon: AlertTriangle, active: false },
    { id: "settings", label: "Settings", icon: Settings, active: true },
  ]

  const platformOptions = [
    { id: "twitter", name: "Twitter", icon: Twitter, color: "#1DA1F2" },
    { id: "instagram", name: "Instagram", icon: Instagram, color: "#E4405F" },
    { id: "news", name: "News", icon: Newspaper, color: "#FF6B35" },
  ]

  const handleAddKeyword = () => {
    if (newKeyword.trim() && selectedPlatforms.length > 0) {
      const newKeywordObj = {
        id: Date.now(),
        keyword: newKeyword.trim(),
        isActive: true,
        platforms: [...selectedPlatforms]
      }
      setKeywords([...keywords, newKeywordObj])
      setNewKeyword("")
      setSelectedPlatforms([])
    }
  }

  const handleRemoveKeyword = (id: number) => {
    setKeywords(keywords.filter(k => k.id !== id))
  }

  const handleToggleKeyword = (id: number) => {
    setKeywords(keywords.map(k => 
      k.id === id ? { ...k, isActive: !k.isActive } : k
    ))
  }

  const handleSaveSettings = () => {
    // Here you would typically save to backend
    console.log('Saving settings:', keywords)
    // Show success message or handle API call
  }

  const getPlatformIcon = (platform: string) => {
    const platformData = platformOptions.find(p => p.id === platform)
    if (platformData) {
      const Icon = platformData.icon
      return <Icon className="h-4 w-4" style={{ color: platformData.color }} />
    }
    return null
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-[#B10100]">
            SENTRA <span className="font-normal text-black">by ROXST</span>
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <button className="relative p-2 rounded-full hover:bg-gray-100">
            <Bell className="h-5 w-5 text-black" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-[#B10100] flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
              <div className="text-left">
                <span className="text-sm font-medium block">
                  {user?.first_name || user?.email || 'Demo User'}
                </span>
                <span className="text-xs text-gray-500 block">Demo Account</span>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={logout}
              className="border-[#B10100] text-[#B10100] hover:bg-[#B10100] hover:text-white"
            >
              <LogOut className="h-4 w-4 mr-1" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 p-4 hidden md:block">
          <nav className="space-y-1">
            {sidebarItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.id === "dashboard") {
                      router.push('/dashboard')
                    } else if (item.id === "settings") {
                      router.push('/settings')
                    }
                  }}
                  className={`w-full flex items-center px-4 py-2 rounded-lg transition-colors ${
                    activeTab === item.id ? "bg-[#B10100] text-white" : "hover:bg-[#FDEBEB] text-black"
                  }`}
                >
                  <Icon className="h-4 w-4 mr-3" />
                  {item.label}
                </button>
              )
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-white text-black">
          <div className="max-w-4xl mx-auto">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-[#B10100] mb-2">Settings</h1>
              <p className="text-gray-600">Configure your monitoring preferences and alert settings</p>
            </div>

            {/* Keyword Monitoring Section */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Search className="h-5 w-5 mr-2" />
                  Keyword Monitoring
                </CardTitle>
                <CardDescription>
                  Add keywords and select platforms to monitor for mentions and sentiment analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Add New Keyword */}
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="keyword">Keyword</Label>
                      <Input
                        id="keyword"
                        placeholder="Enter keyword (e.g., gpt5, bitcoin, tesla)"
                        value={newKeyword}
                        onChange={(e) => setNewKeyword(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label>Platforms</Label>
                      <div className="flex space-x-3 mt-2">
                        {platformOptions.map((platform) => (
                          <div key={platform.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={platform.id}
                              checked={selectedPlatforms.includes(platform.id)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setSelectedPlatforms([...selectedPlatforms, platform.id])
                                } else {
                                  setSelectedPlatforms(selectedPlatforms.filter(p => p !== platform.id))
                                }
                              }}
                            />
                            <Label htmlFor={platform.id} className="text-sm flex items-center">
                              <platform.icon className="h-4 w-4 mr-1" style={{ color: platform.color }} />
                              {platform.name}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <Button 
                    onClick={handleAddKeyword}
                    disabled={!newKeyword.trim() || selectedPlatforms.length === 0}
                    className="bg-[#B10100] hover:bg-[#810100]"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Keyword
                  </Button>
                </div>

                <Separator />

                {/* Current Keywords */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Active Keywords</h3>
                  <div className="space-y-3">
                    {keywords.map((keyword) => (
                      <div key={keyword.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <Checkbox
                            checked={keyword.isActive}
                            onCheckedChange={() => handleToggleKeyword(keyword.id)}
                          />
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="font-medium text-lg">{keyword.keyword}</span>
                              <Badge variant={keyword.isActive ? "default" : "secondary"}>
                                {keyword.isActive ? "Active" : "Inactive"}
                              </Badge>
                            </div>
                            <div className="flex items-center space-x-2 mt-1">
                              {keyword.platforms.map((platform) => (
                                <div key={platform} className="flex items-center space-x-1">
                                  {getPlatformIcon(platform)}
                                  <span className="text-sm text-gray-600">{platform}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRemoveKeyword(keyword.id)}
                          className="text-red-600 border-red-300 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Alert Settings Section */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="h-5 w-5 mr-2" />
                  Alert Settings
                </CardTitle>
                <CardDescription>
                  Configure when and how you receive notifications about mentions and sentiment changes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label>Mention Threshold</Label>
                    <div className="mt-2">
                      <Input
                        type="number"
                        placeholder="10"
                        className="w-32"
                      />
                      <p className="text-sm text-gray-500 mt-1">Minimum mentions to trigger alert</p>
                    </div>
                  </div>
                  <div>
                    <Label>Negative Sentiment Threshold</Label>
                    <div className="mt-2">
                      <Input
                        type="number"
                        placeholder="20"
                        className="w-32"
                      />
                      <p className="text-sm text-gray-500 mt-1">Percentage of negative mentions to trigger alert</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <Label>Notification Channels</Label>
                  <div className="flex space-x-4 mt-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="email" defaultChecked />
                      <Label htmlFor="email">Email</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="browser" defaultChecked />
                      <Label htmlFor="browser">Browser Push</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="slack" />
                      <Label htmlFor="slack">Slack</Label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Save Button */}
            <div className="flex justify-end">
              <Button 
                onClick={handleSaveSettings}
                className="bg-[#B10100] hover:bg-[#810100] px-8"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Settings
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
