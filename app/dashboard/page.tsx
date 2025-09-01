"use client"

import { useState, useEffect } from "react"
import {
  Bell,
  User,
  ChevronDown,
  BarChart3,
  TrendingUp,
  MessageCircle,
  History,
  AlertTriangle,
  Settings,
  Download,
  Flag,
  LogOut,
  RefreshCw,
  Twitter,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAuthContext } from "@/components/auth-provider"
import { useRouter } from "next/navigation"
import { useDashboard } from "@/hooks/use-dashboard"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const { user, isAuthenticated, isLoading, logout } = useAuthContext()
  const router = useRouter()
  const { stats, isLoading: statsLoading, error: statsError, refetch } = useDashboard()

  // Check authentication on mount
  useEffect(() => {
    console.log('Dashboard: Authentication state:', { isAuthenticated, user, isLoading })
    
    // Don't redirect while still loading
    if (isLoading) {
      console.log('Dashboard: Still loading auth state, waiting...')
      return
    }
    
    if (!isAuthenticated) {
      console.log('Dashboard: Not authenticated, redirecting to home')
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
    { id: "dashboard", label: "Dashboard", icon: BarChart3, active: true },
    { id: "spike", label: "Spike Monitor", icon: TrendingUp },
    { id: "sentiment", label: "Sentiment Trends", icon: MessageCircle },
    { id: "history", label: "Alert History", icon: History },
    { id: "reports", label: "Crisis Reports", icon: AlertTriangle },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  const crisisFeeds = [
    {
      title: "Delivery Complaints Surge",
      platform: "twitter",
      severity: "High",
      sentiment: "Negative",
      time: "5 min ago",
      severityColor: "bg-red-100 text-red-800",
    },
    {
      title: "Product Quality Issues",
      platform: "instagram",
      severity: "Medium",
      sentiment: "Negative",
      time: "27 min ago",
      severityColor: "bg-yellow-100 text-yellow-800",
    },
    {
      title: "Customer Service Complaints",
      platform: "tiktok",
      severity: "Medium",
      sentiment: "Neutral",
      time: "1 hour ago",
      severityColor: "bg-yellow-100 text-yellow-800",
    },
    {
      title: "Positive Feedback Trend",
      platform: "news",
      severity: "Low",
      sentiment: "Positive",
      time: "2 hours ago",
      severityColor: "bg-green-100 text-green-800",
    },
  ]

  const crisisHistory = [
    {
      title: "Payment System Outage",
      platform: "Twitter",
      severity: "High",
      status: "Resolved",
      date: "Dec 15, 2024",
    },
    {
      title: "App Crash Reports",
      platform: "Instagram",
      severity: "Medium",
      status: "In Progress",
      date: "Dec 14, 2024",
    },
    {
      title: "Shipping Delays",
      platform: "TikTok",
      severity: "Low",
      status: "Resolved",
      date: "Dec 13, 2024",
    },
    {
      title: "Website Downtime",
      platform: "News",
      severity: "High",
      status: "Resolved",
      date: "Dec 12, 2024",
    },
  ]

  // Mock data for Spike Monitor chart
  const spikeMonitorData = {
    labels: [
      "00:00", "04:00", "08:00", "12:00", "16:00", "20:00"
    ],
    datasets: [
      {
        name: "Twitter",
        data: [12, 5, 15, 45, 89, 54],
        color: "#1DA1F2"
      },
      {
        name: "Instagram",
        data: [8, 4, 12, 38, 71, 48],
        color: "#E4405F"
      },
      {
        name: "TikTok",
        data: [5, 2, 8, 32, 58, 38],
        color: "#000000"
      },
      {
        name: "News",
        data: [3, 1, 6, 25, 45, 32],
        color: "#FF6B35"
      }
    ],
    totalMentions: 1248,
    spikeDetected: true,
    spikeTime: "16:00",
    spikePlatform: "Twitter",
    spikePercentage: 89
  }

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "twitter":
        return "𝕏"
      case "instagram":
        return "📷"
      case "tiktok":
        return "🎵"
      case "news":
        return "📰"
      default:
        return "📱"
    }
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
                    if (item.id === "settings") {
                      router.push('/settings')
                    } else {
                      setActiveTab(item.id)
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
          {/* Dashboard Header with Refresh */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-[#B10100]">Dashboard Overview</h1>
            <Button 
              onClick={refetch} 
              disabled={statsLoading}
              variant="outline" 
              className="border-[#B10100] text-[#B10100] hover:bg-[#FDEBEB]"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${statsLoading ? 'animate-spin' : ''}`} />
              {statsLoading ? 'Refreshing...' : 'Refresh Data'}
            </Button>
          </div>

          {/* Error Display */}
          {statsError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center">
                <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
                <span className="text-red-800 font-medium">Error loading dashboard data:</span>
              </div>
              <p className="text-red-700 mt-1">{statsError}</p>
              <Button 
                onClick={refetch} 
                variant="outline" 
                size="sm" 
                className="mt-2 border-red-300 text-red-700 hover:bg-red-100"
              >
                Try Again
              </Button>
            </div>
          )}

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card className="bg-white shadow-md border border-gray-100">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-600 text-sm">Total Mentions</p>
                    <h3 className="text-2xl font-bold mt-1">
                      {statsLoading ? '...' : stats?.total_mentions || 0}
                    </h3>
                    <p className="text-green-500 text-sm mt-2">Real-time</p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-full">
                    <MessageCircle className="h-5 w-5 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-md border border-gray-100">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-600 text-sm">Negative Sentiment</p>
                    <h3 className="text-2xl font-bold mt-1">
                      {statsLoading ? '...' : `${stats?.negative_percentage || 0}%`}
                    </h3>
                    <p className="text-yellow-500 text-sm mt-2">Current</p>
                  </div>
                  <div className="bg-yellow-100 p-3 rounded-full">
                    <span className="text-yellow-600 text-xl">😞</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-md border border-gray-100">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-600 text-sm">Sentiment Distribution</p>
                    <h3 className="text-2xl font-bold mt-1">
                      {statsLoading ? '...' : `${stats?.sentiment_counts?.positive || 0} / ${stats?.sentiment_counts?.neutral || 0} / ${stats?.sentiment_counts?.negative || 0}`}
                    </h3>
                    <p className="text-green-500 text-sm mt-2">Pos/Neu/Neg</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-full">
                    <BarChart3 className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Latest Tweets Section */}
          <Card className="shadow-md mb-6 bg-white border border-gray-100">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Latest Mentions</h2>
                <div className="flex items-center space-x-2">
                  <Twitter className="h-5 w-5 text-blue-500" />
                  <span className="text-sm text-gray-600">Real-time Twitter data</span>
                </div>
              </div>
              
              {statsLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#B10100]"></div>
                  <span className="ml-2 text-gray-600">Loading mentions...</span>
                </div>
              ) : stats?.latest_tweets && stats.latest_tweets.length > 0 ? (
                <div className="space-y-4">
                  {stats.latest_tweets.map((tweet, index) => (
                    <div key={tweet.id} className="border-b border-gray-100 pb-4 last:border-b-0">
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <Twitter className="h-5 w-5 text-blue-600" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-medium text-sm text-black">@{tweet.username}</span>
                            <Badge 
                              variant={
                                tweet.sentiment === 'positive' ? 'default' : 
                                tweet.sentiment === 'negative' ? 'destructive' : 
                                'secondary'
                              }
                              className="text-xs"
                            >
                              {tweet.sentiment}
                            </Badge>
                            <span className="text-xs text-gray-500">
                              {new Date(tweet.date).toLocaleString()}
                            </span>
                          </div>
                          <p className="text-sm text-gray-800 leading-relaxed">{tweet.content}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Twitter className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                  <p>No mentions available</p>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Chart Section */}
            <Card className="lg:col-span-2 bg-white shadow-md border border-gray-100">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h2 className="text-lg font-semibold">Spike Monitor</h2>
                  </div>
                  <div className="flex space-x-4">
                    <select className="bg-gray-100 border-0 rounded-md px-3 py-1 text-sm">
                      <option>All Platforms</option>
                      <option>X</option>
                      <option>Instagram</option>
                      <option>TikTok</option>
                      <option>News</option>
                    </select>
                    <select className="bg-gray-100 border-0 rounded-md px-3 py-1 text-sm">
                      <option>24 Hours</option>
                      <option>1 Hour</option>
                      <option>7 Days</option>
                    </select>
                  </div>
                </div>
                
                {/* Chart Visualization */}
                <div className="h-64 rounded-lg bg-gray-50 border border-gray-200 p-4 flex items-center justify-center">
                  <div className="text-center">
                    <TrendingUp className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg font-medium mb-2">No Data Available</p>
                    <p className="text-sm text-gray-400">Start monitoring keywords to see spike data</p>
                  </div>
                </div>
                
                {/* Summary Stats */}
                <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-200">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-400">--</p>
                    <p className="text-xs text-gray-500">Total Mentions</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-400">--</p>
                    <p className="text-xs text-gray-500">Peak Time</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-400">--</p>
                    <p className="text-xs text-gray-500">Top Platform</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Active Crisis Feed */}
            <Card className="bg-white shadow-md border border-gray-100">
              <CardContent className="p-6">
                <h2 className="text-lg font-semibold mb-4">Active Crisis Feed</h2>
                <div className="space-y-4">
                  {crisisFeeds.map((crisis, index) => (
                    <div
                      key={index}
                      className="border-b pb-4 last:border-b-0 cursor-pointer hover:bg-gray-50 p-2 rounded border border-gray-100"
                    >
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium text-sm">{crisis.title}</h3>
                        <span className={`text-xs px-2 py-1 rounded ${crisis.severityColor}`}>{crisis.severity}</span>
                      </div>
                      <div className="flex items-center mt-2 text-sm text-gray-600">
                        <span className="mr-2">{getPlatformIcon(crisis.platform)}</span>
                        <span>{crisis.sentiment}</span>
                        <span className="mx-2">•</span>
                        <span>{crisis.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* AI Summary Panel */}
          <Card className="shadow-md mt-6 bg-white border border-gray-100">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-4">AI Summary</h2>
              <div className="mb-4">
                <h3 className="font-medium text-[#B10100] mb-2">Crisis Summary</h3>
                <p className="text-black text-sm">
                  Delivery complaints have surged by 45% in the past 2 hours, primarily on Twitter. Customers are
                  reporting late deliveries and damaged packages. The sentiment is overwhelmingly negative with angry
                  emojis prevalent.
                </p>
              </div>
              <div className="mb-4">
                <h3 className="font-medium text-[#B10100] mb-2">Suggested Response</h3>
                <textarea
                  className="w-full border border-gray-300 rounded-md p-3 h-32 focus:outline-none focus:ring-2 focus:ring-[#B10100] focus:border-[#B10100] text-sm bg-white text-black"
                  defaultValue="We sincerely apologize for the delivery issues you've experienced. Our team is actively investigating these reports and working to resolve them immediately. Please DM us your order details so we can assist you personally."
                />
              </div>
              <div className="flex flex-wrap gap-3">
                <Button className="bg-[#B10100] hover:bg-[#810100] text-white">
                  <Download className="h-4 w-4 mr-2" />
                  Download Report
                </Button>
                <Button variant="outline" className="border-[#B10100] text-[#B10100] hover:bg-[#FDEBEB]">
                  Respond with Template
                </Button>
                <Button variant="outline" className="text-black hover:bg-gray-100">
                  <Flag className="h-4 w-4 mr-2" />
                  Flag as Resolved
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Crisis History */}
          <Card className="shadow-md mt-6 bg-white border border-gray-100">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Crisis History</h2>
                <div className="flex space-x-3">
                  <select className="bg-gray-100 border-0 rounded-md px-3 py-1 text-sm">
                    <option>Last 7 Days</option>
                    <option>Today</option>
                    <option>Last 30 Days</option>
                  </select>
                  <Button variant="outline" size="sm" className="text-black">
                    PDF
                  </Button>
                  <Button variant="outline" size="sm" className="text-black">
                    CSV
                  </Button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-sm text-gray-600 border-b">
                      <th className="pb-2">Title</th>
                      <th className="pb-2">Platform</th>
                      <th className="pb-2">Severity</th>
                      <th className="pb-2">Status</th>
                      <th className="pb-2">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {crisisHistory.map((item, index) => (
                      <tr key={index} className="hover:bg-gray-50 border-b border-gray-100">
                        <td className="py-3 text-sm text-black">{item.title}</td>
                        <td className="py-3 text-sm text-black">{item.platform}</td>
                        <td className="py-3">
                          <span
                            className={`text-xs px-2 py-1 rounded ${
                              item.severity === "High"
                                ? "bg-red-100 text-red-800"
                                : item.severity === "Medium"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-green-100 text-green-800"
                            }`}
                          >
                            {item.severity}
                          </span>
                        </td>
                        <td className="py-3">
                          <span
                            className={`text-xs px-2 py-1 rounded ${
                              item.status === "Resolved" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td className="py-3 text-sm text-gray-600">{item.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
