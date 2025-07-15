"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Shield, Search, CheckCircle, AlertTriangle, Calendar, User, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"

interface CustomerData {
  orderId: string
  customerName: string
  email: string
  phone: string
  address: string
  product: string
  model: string
  purchaseDate: string
  orderValue: number
}

interface WarrantyData extends CustomerData {
  activationDate: string
  expiryDate: string
  status: string
}

export default function WarrantySetupPage() {
  const [orderId, setOrderId] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [customerData, setCustomerData] = useState<CustomerData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [warrantyActivated, setWarrantyActivated] = useState(false)
  const [error, setError] = useState("")
  const [existingWarranty, setExistingWarranty] = useState<WarrantyData | null>(null)

  const handleSearch = async () => {
    if (!orderId.trim()) {
      setError("Please enter an Order ID")
      return
    }

    setIsLoading(true)
    setError("")
    setCustomerData(null)
    setExistingWarranty(null)

    try {
      const response = await fetch("/api/warranty/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: orderId.trim(),
          email: email.trim(),
          phone: phone.trim(),
        }),
      })

      const data = await response.json()

      if (response.ok) {
        if (data.order) {
          setCustomerData(data.order)
        }
        if (data.warranty) {
          setExistingWarranty(data.warranty)
        }
      } else {
        setError(data.error || "Order not found")
      }
    } catch (error) {
      setError("Network error. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleActivateWarranty = async () => {
    if (!customerData) return

    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/warranty/activate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: customerData.orderId,
          email: email,
          phone: phone,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        console.log("Warranty activated:", data.warranty)
        setWarrantyActivated(true)
      } else {
        setError(data.error || "Failed to activate warranty")
      }
    } catch (error) {
      setError("Network error. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault()
    window.location.href = "/admin"
  }

  const calculateDaysRemaining = (expiryDate: string) => {
    const expiry = new Date(expiryDate)
    const today = new Date()
    const diffTime = expiry.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return Math.max(0, diffDays)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-slate-50 to-blue-50 relative ">
      {/* Enhanced Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {/* Animated gradient orbs - much lighter */}
        {/* <div className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-br from-gray-100 to-indigo-300 rounded-full opacity-8 animate-pulse"></div>
        <div
          className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-br from-gray-200 to-gray-400 rounded-full opacity-6 animate-bounce"
          style={{ animationDuration: "3s" }}
        ></div> */}
        {/* <div
          className="absolute top-80 left-1/3 w-24 h-24 bg-gradient-to-br from-gray-200 to-gray-400 rounded-full opacity-10 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-40 right-10 w-36 h-36 bg-gradient-to-br from-gray-200 to-gray-400 rounded-full opacity-8 animate-bounce"
          style={{ animationDuration: "4s" }}
        ></div> */}
        {/* <div
          className="absolute bottom-80 left-20 w-44 h-44 bg-gradient-to-br from-purple-50 to-pink-100 rounded-full opacity-6 animate-pulse"
          style={{ animationDelay: "1.5s" }}
        ></div>
        <div
          className="absolute top-60 right-1/3 w-20 h-20 bg-gradient-to-br from-purple-50 to-indigo-100 rounded-full opacity-10 animate-bounce"
          style={{ animationDuration: "2.5s" }}
        ></div>
        <div
          className="absolute bottom-60 left-1/2 w-32 h-32 bg-gradient-to-br from-gray-200 to-gray-400 rounded-full opacity-8 animate-pulse"
          style={{ animationDelay: "0.5s" }}
        ></div> */}
        {/* <div
          className="absolute top-1/2 left-10 w-24 h-24 bg-gradient-to-br from-gray-200 to-gray-400 rounded-full opacity-6 animate-bounce"
          style={{ animationDuration: "3.5s" }}
        ></div> */}

        {/* Additional decorative elements - lighter */}
        <div
          className="absolute top-32 right-1/4 w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-full opacity-4 animate-spin"
          style={{ animationDuration: "20s" }}
        ></div>
        <div
          className="absolute bottom-32 left-1/4 w-44 h-44 bg-gradient-to-br from-purple-50 to-pink-100 rounded-full opacity-6 animate-pulse"
          style={{ animationDelay: "1.5s" }}
        ></div>

        {/* Subtle grid pattern overlay - much lighter */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=60 height=60 viewBox=0 0 60 60 xmlns=http://www.w3.org/2000/svg%3E%3Cg fill=none fillRule=evenodd%3E%3Cg fill=%239C92AC fillOpacity=0.01%3E%3Ccircle cx=30 cy=30 r=1.5/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      </div>

      <header className="sticky top-0 z-50 bg-black shadow-lg border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-all duration-300 hover:scale-105 group"
            >
              <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-300" />
              <span className="font-medium">Back to Home</span>
            </Link>

            <div
              className="flex items-center space-x-1 select-none animate-fade-in group"
              // onClick={handleLogoClick}
              // style={{ cursor: "pointer" }}
            >
              <div className="p-2 rounded-xl transition-all duration-300">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">MAYSON</h1>
            </div>

            <nav className="hidden md:flex space-x-8">
              <Link
                href="/products"
                className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-105 font-medium relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-400 after:transition-all after:duration-300 hover:after:w-full"
              >
                Products
              </Link>
              <Link
                href="/warranty-claim"
                className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-105 font-medium relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-400 after:transition-all after:duration-300 hover:after:w-full"
              >
                Claims
              </Link>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-105 font-medium relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-400 after:transition-all after:duration-300 hover:after:w-full"
              >
                Support
              </a>
            </nav>
          </div>
        </div>
      </header>

      <div className="py-20 relative z-10">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-fade-in">
            <div
              className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-2xl animate-bounce"
              style={{ animationDuration: "2s" }}
            >
              <Shield className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-6 leading-tight">
              Setup Your Warranty
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-lg mx-auto">
              Activate your <span className="font-semibold text-blue-600">6-month warranty coverage</span> and protect
              your MAYSON product investment.
            </p>
          </div>

          {!warrantyActivated ? (
            <Card className="shadow-2xl border-0 bg-white/70 backdrop-blur-sm hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] animate-fade-in">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-lg border-b border-blue-100">
                <CardTitle className="text-3xl text-center bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent font-bold">
                  Find Your Order
                </CardTitle>
                <CardDescription className="text-center text-gray-600 text-lg">
                  Enter your Order ID to locate your purchase and activate warranty coverage.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8 p-8">
                <div className="space-y-8">
                  <div className="space-y-3">
                    <Label htmlFor="orderId" className="text-lg font-semibold text-gray-700">
                      Order ID
                    </Label>
                    <div className="relative group">
                      {/* <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-300" /> */}
                      <Input
                        id="orderId"
                        placeholder="Enter your Order ID (e.g., ORD001)"
                        value={orderId}
                        onChange={(e) => setOrderId(e.target.value)}
                        className="pl-4 text-lg py-4 border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 rounded-xl bg-white/80 backdrop-blur-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="email" className="text-lg font-semibold text-gray-700">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-4 text-lg py-4 border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 rounded-xl bg-white/80 backdrop-blur-sm"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="phone" className="text-lg font-semibold text-gray-700">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter your Phone Number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="pl-4 text-lg py-4 border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 rounded-xl bg-white/80 backdrop-blur-sm"
                    />
                  </div>
                </div>

                {error && (
                  <Alert variant="destructive" className="border-red-200 bg-red-50/80 backdrop-blur-sm animate-shake">
                    <AlertTriangle className="h-5 w-5" />
                    <AlertDescription className="text-lg">{error}</AlertDescription>
                  </Alert>
                )}

                <Button
                  onClick={handleSearch}
                  disabled={!orderId || !email || !phone || isLoading}
                  className="w-full py-4 text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed rounded-xl"
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Searching...</span>
                    </div>
                  ) : (
                    "Find My Order"
                  )}
                </Button>

                {/* Existing Warranty Display */}
                {existingWarranty && (
                  <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200 shadow-lg animate-fade-in">
                    <CardHeader>
                      <CardTitle className="text-yellow-800 flex items-center justify-between">
                        <div className="flex items-center">
                          <AlertTriangle className="h-6 w-6 mr-3" />
                          Warranty Already Active
                        </div>
                        <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 text-sm font-semibold shadow-md">
                          Active
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <p className="text-yellow-700 text-lg">
                        This Order ID has already been used to activate warranty coverage.
                      </p>
                      <div className="grid grid-cols-2 gap-6 text-sm">
                        <div className="space-y-1">
                          <span className="font-semibold text-gray-700">Customer:</span>
                          <p className="text-gray-900 font-medium">{existingWarranty.customerName}</p>
                        </div>
                        <div className="space-y-1">
                          <span className="font-semibold text-gray-700">Product:</span>
                          <p className="text-gray-900 font-medium">{existingWarranty.product}</p>
                        </div>
                        <div className="space-y-1">
                          <span className="font-semibold text-gray-700">Activated:</span>
                          <p className="text-gray-900 font-medium">
                            {new Date(existingWarranty.activationDate).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <span className="font-semibold text-gray-700">Expires:</span>
                          <p className="text-gray-900 font-medium">
                            {new Date(existingWarranty.expiryDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border-2 border-blue-200 shadow-inner">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Calendar className="h-6 w-6 text-blue-600 mr-3" />
                            <span className="font-semibold text-blue-800 text-lg">Warranty Status</span>
                          </div>
                          <span className="text-blue-700 font-bold text-lg">
                            {calculateDaysRemaining(existingWarranty.expiryDate)} days remaining
                          </span>
                        </div>
                      </div>
                      <div className="text-center">
                        <Link href="/warranty-claim">
                          <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 px-8 py-3 text-lg font-semibold rounded-xl">
                            File a Warranty Claim
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Customer Data Display */}
                {customerData && !existingWarranty && (
                  <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 shadow-lg animate-fade-in">
                    <CardHeader>
                      <CardTitle className="text-green-800 flex items-center text-xl">
                        <CheckCircle className="h-6 w-6 mr-3" />
                        Order Found!
                      </CardTitle>
                      <CardDescription className="text-green-700 text-lg">
                        Please verify your details below and activate your warranty.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="flex items-start space-x-4 p-4 bg-white/60 rounded-xl border border-green-100">
                            <User className="h-6 w-6 text-gray-500 mt-1 flex-shrink-0" />
                            <div>
                              <p className="font-semibold text-gray-700 text-lg">Customer Details</p>
                              <p className="text-gray-900 font-medium">{customerData.customerName}</p>
                              <p className="text-gray-600">{customerData.phone}</p>
                              <p className="text-gray-600 text-sm">{customerData.address}</p>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div className="flex items-start space-x-4 p-4 bg-white/60 rounded-xl border border-green-100">
                            <Package className="h-6 w-6 text-gray-500 mt-1 flex-shrink-0" />
                            <div>
                              <p className="font-semibold text-gray-700 text-lg">Product Details</p>
                              <p className="text-gray-900 font-medium">{customerData.product}</p>
                              <p className="text-gray-600">Order: {customerData.orderId}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border-2 border-blue-200 shadow-inner">
                        <div className="flex items-center mb-4">
                          <Calendar className="h-6 w-6 text-blue-600 mr-3" />
                          <span className="font-semibold text-blue-800 text-xl">Warranty Coverage</span>
                        </div>
                        <div className="space-y-2 text-blue-700">
                          <p className="font-medium">
                            Purchase Date: {new Date(customerData.purchaseDate).toLocaleDateString()}
                          </p>
                          <p className="font-medium">Coverage: 6 months from activation date (today)</p>
                          <p className="font-bold text-lg">
                            Warranty will expire on:{" "}
                            {new Date(Date.now() + 6 * 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <Button
                        onClick={handleActivateWarranty}
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] rounded-xl"
                      >
                        {isLoading ? (
                          <div className="flex items-center space-x-2">
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Activating warranty...</span>
                          </div>
                        ) : (
                          "Activate Warranty Coverage"
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card className="shadow-2xl border-0 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 animate-fade-in">
              <CardHeader className="text-center bg-gradient-to-r from-green-100 to-emerald-100 rounded-t-lg">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl animate-bounce">
                  <CheckCircle className="h-10 w-10 text-white" />
                </div>
                <CardTitle className="text-3xl bg-gradient-to-r from-green-700 to-emerald-700 bg-clip-text text-transparent font-bold">
                  Warranty Activated Successfully!
                </CardTitle>
                <CardDescription className="text-green-700 text-lg">
                  Your 6-month warranty coverage is now active and ready to protect your investment.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8 p-8">
                <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl border-2 border-green-200 shadow-inner">
                  <h3 className="font-bold text-gray-900 mb-6 text-xl">Warranty Details</h3>
                  <div className="grid grid-cols-2 gap-6 text-sm">
                    <div className="space-y-1">
                      <span className="font-semibold text-gray-700">Customer:</span>
                      <p className="text-gray-900 font-medium">{customerData?.customerName}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="font-semibold text-gray-700">Product:</span>
                      <p className="text-gray-900 font-medium">{customerData?.product}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="font-semibold text-gray-700">Order ID:</span>
                      <p className="text-gray-900 font-medium">{customerData?.orderId}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="font-semibold text-gray-700">Activation Date:</span>
                      <p className="text-gray-900 font-medium">{new Date().toLocaleDateString()}</p>
                    </div>
                    <div className="col-span-2 space-y-1">
                      <span className="font-semibold text-gray-700">Warranty Expires:</span>
                      <p className="text-gray-900 font-bold text-lg">
                        {new Date(Date.now() + 6 * 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
                <Alert className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
                  <Calendar className="h-5 w-5" />
                  <AlertDescription className="text-lg">
                    <strong>Important:</strong> Save your Order ID <strong>{customerData?.orderId}</strong> for future
                    reference. You'll need it to file warranty claims or check your coverage status.
                  </AlertDescription>
                </Alert>
                <div className="text-center space-y-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setWarrantyActivated(false)
                        setCustomerData(null)
                        setOrderId("")
                        setEmail("")
                        setPhone("")
                        setError("")
                      }}
                      className="flex-1 bg-white/80 backdrop-blur-sm border-2 border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 hover:scale-105 py-3 text-lg font-semibold rounded-xl"
                    >
                      Setup Another Warranty
                    </Button>
                    <Link href="/warranty-claim" className="flex-1">
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 py-3 text-lg font-semibold rounded-xl">
                        File a Claim
                      </Button>
                    </Link>
                  </div>
                  <Link href="/">
                    <Button
                      variant="outline"
                      className="w-full bg-white/80 backdrop-blur-sm border-2 border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 hover:scale-105 py-3 text-lg font-semibold rounded-xl"
                    >
                      Return to Home
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Enhanced Footer */}
      <footer className="bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white py-16 relative overflow-hidden">
        {/* Footer background decoration */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=60 height=60 viewBox=0 0 60 60 xmlns=http://www.w3.org/2000/svg%3E%3Cg fill=none fillRule=evenodd%3E%3Cg fill=%23ffffff fillOpacity=0.02%3E%3Ccircle cx=30 cy=30 r=1.5/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-1 mb-6">
                <div className="p-2 rounded-xl transition-all duration-300">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  MAYSON
                </span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Premium home appliances with reliable warranty support and exceptional customer service.
              </p>
            </div>
            <div>
              <h5 className="font-bold mb-6 text-lg text-white">Products</h5>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-all duration-300 hover:translate-x-1">
                    Vacuum Sealer
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-all duration-300 hover:translate-x-1">
                    Lint Remover
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-all duration-300 hover:translate-x-1">
                    Coffee Maker
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-6 text-lg text-white">Support</h5>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-all duration-300 hover:translate-x-1">
                    Warranty Setup
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-all duration-300 hover:translate-x-1">
                    Warranty Claims
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-all duration-300 hover:translate-x-1">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-6 text-lg text-white">Legal</h5>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-all duration-300 hover:translate-x-1">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-all duration-300 hover:translate-x-1">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-all duration-300 hover:translate-x-1">
                    Warranty Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-12 pt-8 text-center">
            <p className="text-gray-400 text-lg">&copy; 2025 MAYSON. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        
        .hover\\:shadow-3xl:hover {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </div>
  )
}
