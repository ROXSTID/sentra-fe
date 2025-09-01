"use client"

import { useState } from "react"
import { useAuthContext } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function RegisterPage() {
  const { register, isLoading, error, clearError } = useAuthContext()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await register({ email, password, first_name: firstName, last_name: lastName })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-black px-4">
      <Card className="w-full max-w-md border border-gray-200">
        <CardHeader>
          <CardTitle>Create account</CardTitle>
          <CardDescription>Join SENTRA and start monitoring</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First name</Label>
                <Input id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last name</Label>
                <Input id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded text-sm text-red-700 flex justify-between items-center">
                <span>{error}</span>
                <button type="button" onClick={clearError} className="text-red-500">✕</button>
              </div>
            )}

            <Button type="submit" disabled={isLoading} className="bg-[#B10100] hover:bg-[#810100] text-white w-full">
              {isLoading ? "Creating account..." : "Create account"}
            </Button>

            <div className="text-center text-sm text-gray-600">
              Already have an account? <a className="text-[#B10100] underline" href="/login">Sign in</a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
