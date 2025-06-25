"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [fullName, setFullName] = useState("")
  const router = useRouter()

  const handleRegister = (e) => {
    e.preventDefault()
    // Simple registration - in real app, save to database
    if (username && password && email && fullName) {
      localStorage.setItem("isAuthenticated", "true")
      localStorage.setItem("username", username)
      router.push("/dashboard")
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white">
        <CardHeader className="text-center">
          <CardTitle className="text-xl font-semibold text-gray-800">Registration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm text-gray-600">
                Username:
              </Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm text-gray-600">
                Password:
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm text-gray-600">
                Email:
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-sm text-gray-600">
                Full Name:
              </Label>
              <Input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full"
                required
              />
            </div>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              Register
            </Button>
          </form>
          <div className="text-center">
            <Link href="/" className="text-blue-600 hover:underline text-sm">
              Already have an account? Login here
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
