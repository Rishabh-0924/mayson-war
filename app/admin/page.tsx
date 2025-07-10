"use client"

import { useState, useEffect } from "react"
import { AdminLogin } from "@/components/admin-login"
import { ExcelUploader } from "@/components/excel-uploader"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Users, FileText, Download, LogOut } from "lucide-react"

interface AdminStats {
  totalOrders: number
  totalWarranties: number
  totalClaims: number
  activeWarranties: number
}

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState<AdminStats>({
    totalOrders: 0,
    totalWarranties: 0,
    totalClaims: 0,
    activeWarranties: 0,
  })

  useEffect(() => {
    const token = localStorage.getItem("adminToken")
    if (token) {
      setIsLoggedIn(true)
      loadStats()
    }
    setIsLoading(false)
  }, [])

  const loadStats = async () => {
    try {
      const token = localStorage.getItem("adminToken")
      const response = await fetch("/api/admin/stats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    } catch (error) {
      console.error("Failed to load stats:", error)
    }
  }

  const handleLogin = (token: string) => {
    setIsLoggedIn(true)
    loadStats()
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" })
    } catch (error) {
      console.error("Logout error:", error)
    }
    localStorage.removeItem("adminToken")
    setIsLoggedIn(false)
  }

  const handleFileUploaded = (count: number) => {
    setStats((prev) => ({ ...prev, totalOrders: count }))
  }

  const downloadWarranties = async () => {
    try {
      const token = localStorage.getItem("adminToken")
      const response = await fetch("/api/admin/download/warranties", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = "warranties.xlsx"
        a.click()
        window.URL.revokeObjectURL(url)
      }
    } catch (error) {
      console.error("Download error:", error)
    }
  }

  const downloadClaims = async () => {
    try {
      const token = localStorage.getItem("adminToken")
      const response = await fetch("/api/admin/download/claims", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = "claims.xlsx"
        a.click()
        window.URL.revokeObjectURL(url)
      }
    } catch (error) {
      console.error("Download error:", error)
    }
  }

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  if (!isLoggedIn) {
    return <AdminLogin onLogin={handleLogin} />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">MAYSON Admin</h1>
            </div>
            <Button onClick={handleLogout} variant="outline">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalOrders}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Warranties</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalWarranties}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Warranties</CardTitle>
              <Badge variant="secondary">{stats.activeWarranties}</Badge>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.activeWarranties}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Claims</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalClaims}</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Excel Upload */}
          <ExcelUploader
            title="Upload Customer Orders"
            description="Upload an Excel file containing customer order data"
            onFileUploaded={handleFileUploaded}
            expectedColumns={[
              "Order ID",
              "Customer Name",
              "Email",
              "Phone",
              "Address",
              "Product Name",
              "Product Model",
              "Purchase Date",
              "Order Value",
            ]}
          />

          {/* Download Reports */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Download className="h-5 w-5 mr-2" />
                Download Reports
              </CardTitle>
              <CardDescription>Export warranty and claim data as Excel files</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button onClick={downloadWarranties} className="w-full bg-transparent" variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Download Warranties
              </Button>
              <Button onClick={downloadClaims} className="w-full bg-transparent" variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Download Claims
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
