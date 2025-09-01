"use client"

import { useEffect, useState } from "react"
import { authService, type UserProfile } from "@/lib/auth.service"
import { useAuthContext } from "@/components/auth-provider"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function ProfilePage() {
  const { isAuthenticated, isLoading, user, logout } = useAuthContext()
  const router = useRouter()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loadingProfile, setLoadingProfile] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, isLoading, router])

  useEffect(() => {
    const load = async () => {
      try {
        const data = await authService.getProfile()
        setProfile(data)
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to load profile')
      } finally {
        setLoadingProfile(false)
      }
    }
    load()
  }, [])

  if (isLoading || loadingProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-gray-600">Loading profile...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 mb-3">{error}</div>
          <Button variant="outline" onClick={() => router.push('/login')}>Go to Login</Button>
        </div>
      </div>
    )
  }

  const display = profile || user

  return (
    <div className="min-h-screen px-4 py-8 bg-white text-black">
      <div className="max-w-2xl mx-auto">
        <Card className="border border-gray-200">
          <CardHeader>
            <CardTitle>My Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-gray-600">Email</div>
              <div className="font-medium">{display?.email}</div>

              {display?.username && (<><div className="text-gray-600">Username</div><div className="font-medium">{display.username}</div></>)}

              <div className="text-gray-600">First name</div>
              <div className="font-medium">{display?.first_name || '-'}</div>

              <div className="text-gray-600">Last name</div>
              <div className="font-medium">{display?.last_name || '-'}</div>

              {display?.role && (<><div className="text-gray-600">Role</div><div className="font-medium">{display.role}</div></>)}

              {display?.last_login && (<><div className="text-gray-600">Last login</div><div className="font-medium">{new Date(display.last_login).toLocaleString()}</div></>)}

              {display?.created_at && (<><div className="text-gray-600">Created</div><div className="font-medium">{new Date(display.created_at).toLocaleString()}</div></>)}
            </div>

            <div className="pt-4">
              <Button variant="outline" onClick={logout}>Logout</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
