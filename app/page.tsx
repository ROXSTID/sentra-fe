"use client"

import { useState } from "react"
import { Menu, X, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuthContext } from "@/components/auth-provider"

export default function Page() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { loginWithDemo, isLoading, error, clearError, isAuthenticated, user } = useAuthContext()

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const handleTryDemo = async () => {
    console.log('Try Demo clicked - starting authentication...')
    console.log('Current auth state:', { isAuthenticated, user, isLoading, error })
    try {
      await loginWithDemo()
      console.log('Demo login completed successfully')
    } catch (error) {
      console.error('Demo login failed:', error)
      // Don't clear the error here, let the hook handle it
    }
  }

  return (
    <div className="bg-white text-gray-900">
      {/* Navigation Bar */}
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center relative">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold">SENTRA</h1>
          <span className="ml-2 bg-[#510100] text-white rounded-full px-3 py-1 text-sm">by ROXST</span>
        </div>

        <div className={`nav-links ${mobileMenuOpen ? "active" : ""} hidden md:flex space-x-8 items-center`}>
          <a href="#features" className="hover:text-[#B10100] transition-colors">
            Features
          </a>
          <a href="#pricing" className="hover:text-[#B10100] transition-colors">
            Pricing
          </a>
          <a href="#about" className="hover:text-[#B10100] transition-colors">
            About
          </a>
          <a href="#contact" className="hover:text-[#B10100] transition-colors">
            Contact
          </a>
          <a href="/login" className="text-[#B10100] hover:text-[#810100] font-medium transition-colors">
            Login
          </a>
          <a href="/register" className="bg-[#B10100] text-white px-4 py-2 rounded-lg hover:bg-[#810100] font-medium transition-colors">
            Sign Up
          </a>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg z-50 p-6">
            <div className="flex flex-col space-y-4">
              <a href="#features" className="hover:text-[#B10100] transition-colors" onClick={toggleMobileMenu}>
                Features
              </a>
              <a href="#pricing" className="hover:text-[#B10100] transition-colors" onClick={toggleMobileMenu}>
                Pricing
              </a>
              <a href="#about" className="hover:text-[#B10100] transition-colors" onClick={toggleMobileMenu}>
                About
              </a>
              <a href="#contact" className="hover:text-[#B10100] transition-colors" onClick={toggleMobileMenu}>
                Contact
              </a>
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex flex-col space-y-3">
                  <a href="/login" className="text-[#B10100] hover:text-[#810100] font-medium transition-colors" onClick={toggleMobileMenu}>
                    Login
                  </a>
                  <a href="/register" className="bg-[#B10100] text-white px-4 py-2 rounded-lg hover:bg-[#810100] font-medium transition-colors text-center" onClick={toggleMobileMenu}>
                    Sign Up
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        <button className="md:hidden" onClick={toggleMobileMenu}>
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-12 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">Detect Fast. Respond Right.</h1>
            <p className="text-xl text-gray-600 mb-8">
              SENTRA monitors digital conversations in real-time, detects sentiment spikes, and guides your team with
              AI-powered insights.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button
                className="bg-[#B10100] hover:bg-[#810100] text-white font-medium py-3 px-8 rounded-lg"
                onClick={handleTryDemo}
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : 'Try Demo'}
              </Button>
              <Button
                variant="outline"
                className="border-2 border-[#B10100] text-[#B10100] hover:bg-[#F8F8F8] font-medium py-3 px-8 rounded-lg"
              >
                Contact Sales
              </Button>
            </div>

            {/* Error Display */}
            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <p className="text-red-600 text-sm">{error}</p>
                  <button
                    onClick={clearError}
                    className="text-red-400 hover:text-red-600 text-sm font-medium"
                  >
                    ✕
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="md:w-1/2">
            <div className="bg-[#F8F8F8] rounded-xl shadow-lg p-6">
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-[#B10100] text-white p-4 rounded-lg">
                  <p className="text-sm">Alert Level</p>
                  <p className="text-xl font-bold">High</p>
                </div>
                <div className="bg-[#810100] text-white p-4 rounded-lg">
                  <p className="text-sm">Mentions</p>
                  <p className="text-xl font-bold">1,248</p>
                </div>
                <div className="bg-[#510100] text-white p-4 rounded-lg">
                  <p className="text-sm">Sentiment</p>
                  <p className="text-xl font-bold">–42%</p>
                </div>
              </div>
              <div className="h-32 bg-gradient-to-r from-[#F8F8F8] to-[#510100] rounded-lg mb-6"></div>
              <div className="bg-white p-4 rounded-lg border-l-4 border-[#B10100]">
                <p className="text-sm font-medium mb-2">AI Recommendation:</p>
                <p className="text-sm">
                  {
                    '"Negative sentiment spike detected around product launch. Recommend immediate response from PR team with official statement."'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About SENTRA */}
      <section id="about" className="bg-[#F8F8F8] py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">About SENTRA</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="text-[#B10100] text-4xl mb-4">📡</div>
              <h3 className="font-bold mb-2">Real-time monitoring</h3>
              <p className="text-gray-600">Across social media & news platforms</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="text-[#B10100] text-4xl mb-4">🇮🇩</div>
              <h3 className="font-bold mb-2">Local sentiment analysis</h3>
              <p className="text-gray-600">In Bahasa Indonesia with regional dialects</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="text-[#B10100] text-4xl mb-4">🔔</div>
              <h3 className="font-bold mb-2">Instant alerts</h3>
              <p className="text-gray-600">Via WhatsApp & Email notifications</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="text-[#B10100] text-4xl mb-4">🤖</div>
              <h3 className="font-bold mb-2">AI summaries</h3>
              <p className="text-gray-600">Crisis classification and recommendations</p>
            </div>
          </div>
        </div>
      </section>

      {/* Problems Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">The Problems We Solve</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition duration-300">
              <h3 className="font-bold text-xl mb-3">Too late to respond</h3>
              <p className="text-gray-600">
                By the time you notice the crisis, it's already spread across multiple platforms and gained momentum.
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition duration-300">
              <h3 className="font-bold text-xl mb-3">Didn't detect the rising issue</h3>
              <p className="text-gray-600">
                Small complaints can escalate quickly. SENTRA identifies these patterns before they become crises.
              </p>
            </div>
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition duration-300">
              <h3 className="font-bold text-xl mb-3">Miscommunication worsened the impact</h3>
              <p className="text-gray-600">
                Without proper context, your response might make things worse. We provide the full picture.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-[#F8F8F8] py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex items-start">
              <div className="text-[#B10100] text-2xl mr-4">🌐</div>
              <div>
                <h3 className="font-bold mb-2">Multi-platform monitoring</h3>
                <p className="text-gray-600">
                  Track conversations across Twitter, Facebook, Instagram, news sites, and forums.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="text-[#B10100] text-2xl mr-4">📈</div>
              <div>
                <h3 className="font-bold mb-2">Spike detection</h3>
                <p className="text-gray-600">AI identifies unusual activity spikes that indicate emerging issues.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="text-[#B10100] text-2xl mr-4">⚠️</div>
              <div>
                <h3 className="font-bold mb-2">Crisis type detection</h3>
                <p className="text-gray-600">Classifies issues as PR, product, service, or external crises.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="text-[#B10100] text-2xl mr-4">💡</div>
              <div>
                <h3 className="font-bold mb-2">Auto response suggestion</h3>
                <p className="text-gray-600">Context-aware recommendations for your response team.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="text-[#B10100] text-2xl mr-4">📊</div>
              <div>
                <h3 className="font-bold mb-2">Report exports</h3>
                <p className="text-gray-600">Generate PDF/CSV reports for stakeholders and documentation.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="text-[#B10100] text-2xl mr-4">⚙️</div>
              <div>
                <h3 className="font-bold mb-2">Alert threshold settings</h3>
                <p className="text-gray-600">Customize sensitivity levels for different types of alerts.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Target Users */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Who Uses SENTRA</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="text-[#B10100] text-4xl mb-4">🏢</div>
              <h3 className="font-bold mb-2">Consumer Brands</h3>
              <p className="text-gray-600">Protect your brand reputation from emerging crises</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="text-[#B10100] text-4xl mb-4">🏛️</div>
              <h3 className="font-bold mb-2">Government</h3>
              <p className="text-gray-600">Monitor public sentiment and emerging issues</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="text-[#B10100] text-4xl mb-4">🌟</div>
              <h3 className="font-bold mb-2">Public Figures</h3>
              <p className="text-gray-600">Stay ahead of trending conversations about you</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="text-[#B10100] text-4xl mb-4">📢</div>
              <h3 className="font-bold mb-2">PR Consultants</h3>
              <p className="text-gray-600">Provide cutting-edge crisis detection for clients</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 px-4 sm:px-6 lg:px-8 bg-[#F3F4F6]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Plans for Every Scale of Risk</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Lite Plan */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">Lite</h3>
                <p className="text-3xl font-bold mb-6">
                  IDR 1.5M<span className="text-lg font-normal text-gray-500">/month</span>
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <CheckCircle className="text-[#B10100] mr-2 h-5 w-5" />
                    <span>1 keyword group</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-[#B10100] mr-2 h-5 w-5" />
                    <span>1 platform</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-[#B10100] mr-2 h-5 w-5" />
                    <span>Weekly alerts</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-[#B10100] mr-2 h-5 w-5" />
                    <span>Basic summaries</span>
                  </li>
                </ul>
                <Button
                  variant="outline"
                  className="w-full border-[#B10100] text-[#B10100] hover:bg-[#B10100] hover:text-white"
                  onClick={() => (window.location.href = "/dashboard")}
                >
                  Try Demo
                </Button>
              </div>
            </div>

            {/* Pro Plan */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden transform scale-105 z-10">
              <div className="bg-[#B10100] text-white py-2 text-center font-semibold">Most Popular</div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">Pro</h3>
                <p className="text-3xl font-bold mb-6">
                  IDR 5M<span className="text-lg font-normal text-gray-500">/month</span>
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <CheckCircle className="text-[#B10100] mr-2 h-5 w-5" />
                    <span>All platforms</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-[#B10100] mr-2 h-5 w-5" />
                    <span>Real-time WA/Email alerts</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-[#B10100] mr-2 h-5 w-5" />
                    <span>AI summary & suggested replies</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-[#B10100] mr-2 h-5 w-5" />
                    <span>Monthly crisis report</span>
                  </li>
                </ul>
                <Button
                  className="w-full bg-[#B10100] hover:bg-[#810100] text-white"
                  onClick={() => (window.location.href = "/dashboard")}
                >
                  Try Demo
                </Button>
              </div>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
                <p className="text-3xl font-bold mb-6">
                  IDR 10M<span className="text-lg font-normal text-gray-500">/month</span>
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <CheckCircle className="text-[#B10100] mr-2 h-5 w-5" />
                    <span>Unlimited keyword groups</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-[#B10100] mr-2 h-5 w-5" />
                    <span>API + media pipelines</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-[#B10100] mr-2 h-5 w-5" />
                    <span>SLA support</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="text-[#B10100] mr-2 h-5 w-5" />
                    <span>Analyst support</span>
                  </li>
                </ul>
                <Button
                  variant="outline"
                  className="w-full border-[#B10100] text-[#B10100] hover:bg-[#B10100] hover:text-white"
                  onClick={() => (window.location.href = "/dashboard")}
                >
                  Try Demo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="bg-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses using SENTRA to streamline their operations.
          </p>
          <div className="flex justify-center space-x-4">
            <Button
              className="bg-[#B10100] text-white px-6 py-3 hover:bg-[#810100]"
              onClick={() => (window.location.href = "/dashboard")}
            >
              Try Demo
            </Button>
            <Button
              variant="outline"
              className="border border-[#B10100] text-[#B10100] px-6 py-3 hover:bg-gray-50"
              onClick={() => (window.location.href = "/dashboard")}
            >
              Contact Sales
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#510100] text-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center mb-4">
                <h3 className="text-2xl font-bold">SENTRA</h3>
                <span className="ml-2 bg-white text-[#510100] rounded-full px-3 py-1 text-sm">by ROXST</span>
              </div>
              <p className="text-gray-300">AI-powered crisis detection for modern businesses</p>
            </div>
            <div className="flex space-x-8">
              <div>
                <h4 className="font-semibold mb-2">Product</h4>
                <ul className="space-y-1 text-gray-300">
                  <li>
                    <a href="#features" className="hover:text-white transition-colors">
                      Features
                    </a>
                  </li>
                  <li>
                    <a href="#pricing" className="hover:text-white transition-colors">
                      Pricing
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Company</h4>
                <ul className="space-y-1 text-gray-300">
                  <li>
                    <a href="#about" className="hover:text-white transition-colors">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="#contact" className="hover:text-white transition-colors">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-600 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2024 SENTRA by ROXST. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
