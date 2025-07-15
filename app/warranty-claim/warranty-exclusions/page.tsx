"use client"

import Link from "next/link"
import {
  ArrowLeft,
  XCircle,
  AlertTriangle,
  Wrench,
  Droplets,
  Zap,
  Clock,
  Shield,
  Thermometer,
  FileX,
  WashingMachineIcon as CleaningServices,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function WarrantyExclusionsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-slate-100">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/warranty-claim"
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-all duration-300 hover:scale-105 group"
          >
            <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="font-medium">Back to Warranty Claims</span>
          </Link>
        </div>
      </header>

      <div className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <XCircle className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Warranty Exclusions</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The following conditions and circumstances are not covered under your MAYSON product warranty.
            </p>
          </div>

          <div className="space-y-6">
            {/* Physical Damage */}
            <Card className="shadow-lg border-0 bg-white">
              <CardHeader className="bg-red-50 border-b border-red-100">
                <CardTitle className="flex items-center text-red-800">
                  <AlertTriangle className="h-6 w-6 mr-3" />
                  Physical Damage
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Cracks, dents or breaks resulting from drops, impacts or crushing.
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Damage to the housing, buttons, display or charging port.
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Liquid Ingress & Corrosion */}
            <Card className="shadow-lg border-0 bg-white">
              <CardHeader className="bg-blue-50 border-b border-blue-100">
                <CardTitle className="flex items-center text-blue-800">
                  <Droplets className="h-6 w-6 mr-3" />
                  Liquid Ingress & Corrosion
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Water submersion or liquid spills inside the unit.
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Corrosion or rust from exposure to moisture or corrosive substances.
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Unauthorized Modifications & Repairs */}
            <Card className="shadow-lg border-0 bg-white">
              <CardHeader className="bg-orange-50 border-b border-orange-100">
                <CardTitle className="flex items-center text-orange-800">
                  <Wrench className="h-6 w-6 mr-3" />
                  Unauthorized Modifications & Repairs
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Opening or tampering with internal components.
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Use of non‑MAYSON parts or accessories.
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Any repair attempt by un‑authorized service centers.
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Misuse & Improper Operation */}
            <Card className="shadow-lg border-0 bg-white">
              <CardHeader className="bg-purple-50 border-b border-purple-100">
                <CardTitle className="flex items-center text-purple-800">
                  <Shield className="h-6 w-6 mr-3" />
                  Misuse & Improper Operation
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Vacuum‑sealing hot liquids or un‑frozen liquids.
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Forcing the unit into operation (e.g., blocking the air inlet).
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Use outside intended food‑storage applications (e.g., industrial or chemical materials).
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Electrical & Battery Issues */}
            <Card className="shadow-lg border-0 bg-white">
              <CardHeader className="bg-yellow-50 border-b border-yellow-100">
                <CardTitle className="flex items-center text-yellow-800">
                  <Zap className="h-6 w-6 mr-3" />
                  Electrical & Battery Issues
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Damage due to over‑voltage, improper power source or charger.
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Battery depletion or reduced capacity from normal aging.
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Use of non‑MAYSON charging cables or adapters.
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Normal Wear & Tear */}
            <Card className="shadow-lg border-0 bg-white">
              <CardHeader className="bg-gray-50 border-b border-gray-100">
                <CardTitle className="flex items-center text-gray-800">
                  <Clock className="h-6 w-6 mr-3" />
                  Normal Wear & Tear
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-gray-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Consumable parts such as silicone gaskets/seal strips, filters, or bags.
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-gray-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Cosmetic scratches, scuffs and fading of plastics due to regular use.
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Environmental Damage */}
            <Card className="shadow-lg border-0 bg-white">
              <CardHeader className="bg-green-50 border-b border-green-100">
                <CardTitle className="flex items-center text-green-800">
                  <Thermometer className="h-6 w-6 mr-3" />
                  Environmental Damage
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Exposure to extreme temperatures, direct sunlight, or high humidity.
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Damage from insects, rodents or other pests.
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Loss or Defacement of Serial Number/QR Code */}
            <Card className="shadow-lg border-0 bg-white">
              <CardHeader className="bg-indigo-50 border-b border-indigo-100">
                <CardTitle className="flex items-center text-indigo-800">
                  <FileX className="h-6 w-6 mr-3" />
                  Loss or Defacement of Serial Number/QR Code
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-indigo-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Warranty void if the unique product sticker or serial‑ID code is removed, altered or rendered
                    unreadable.
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Failure to Follow Care Instructions */}
            <Card className="shadow-lg border-0 bg-white">
              <CardHeader className="bg-pink-50 border-b border-pink-100">
                <CardTitle className="flex items-center text-pink-800">
                  <CleaningServices className="h-6 w-6 mr-3" />
                  Failure to Follow Care Instructions
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-pink-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Neglecting to clean or maintain the unit as per the user manual.
                  </li>
                  <li className="flex items-start">
                    <span className="w-2 h-2 bg-pink-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    Using abrasive cleaners, immersing the unit in water, or storing in dusty/dirty environments.
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Link href="/warranty-claim">
              <Button className="bg-gray-700 hover:bg-gray-800 text-white px-8 py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                Back to Warranty Claims
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
