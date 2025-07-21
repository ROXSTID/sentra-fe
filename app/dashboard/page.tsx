"use client"

import { useState } from "react"
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
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")

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
            SENTRA <span className="font-normal text-black">by Roxvest</span>
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <button className="relative p-2 rounded-full hover:bg-gray-100">
            <Bell className="h-5 w-5 text-black" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <div className="flex items-center space-x-2 cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
              <User className="h-4 w-4 text-black" />
            </div>
            <span className="text-sm font-medium">Admin</span>
            <ChevronDown className="h-3 w-3 text-gray-500" />
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
                  onClick={() => setActiveTab(item.id)}
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
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card className="bg-white shadow-md border border-gray-100">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-gray-600 text-sm">Total Mentions</p>
                    <h3 className="text-2xl font-bold mt-1">1,248</h3>
                    <p className="text-green-500 text-sm mt-2">Today</p>
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
                    <h3 className="text-2xl font-bold mt-1">23%</h3>
                    <p className="text-yellow-500 text-sm mt-2">+2% from yesterday</p>
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
                    <p className="text-gray-600 text-sm">Active Crisis Alerts</p>
                    <h3 className="text-2xl font-bold mt-1">4</h3>
                    <p className="text-red-500 text-sm mt-2">1 High Priority</p>
                  </div>
                  <div className="bg-red-100 p-3 rounded-full">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Chart Section */}
            <Card className="lg:col-span-2 bg-white shadow-md border border-gray-100">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Spike Monitor</h2>
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
                <div className="h-64 rounded-lg bg-gray-50 border border-gray-200 p-4 flex items-center justify-center">
                  <div className="text-center">
                    <TrendingUp className="h-12 w-12 text-gray-500 mx-auto mb-2" />
                    <p className="text-gray-600">Real-time mentions visualization</p>
                    <p className="text-sm text-gray-500 mt-1">Chart shows spike in mentions over time</p>
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
