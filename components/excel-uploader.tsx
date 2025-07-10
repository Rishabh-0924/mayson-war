"use client"

import type React from "react"

import { useState } from "react"
import { Upload, FileSpreadsheet, CheckCircle, AlertTriangle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface ExcelUploaderProps {
  title: string
  description: string
  onFileUploaded: (count: number) => void
  expectedColumns: string[]
}

export function ExcelUploader({ title, description, onFileUploaded, expectedColumns }: ExcelUploaderProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.name.endsWith(".xlsx") && !file.name.endsWith(".xls")) {
      setErrorMessage("Please upload an Excel file (.xlsx or .xls)")
      setUploadStatus("error")
      return
    }

    setIsUploading(true)
    setUploadStatus("idle")
    setErrorMessage("")
    setSuccessMessage("")

    try {
      console.log("Excel Uploader: Starting file upload...")

      // Create FormData to send file
      const formData = new FormData()
      formData.append("file", file)

      const token = localStorage.getItem("adminToken")
      console.log("📦 Token sent from client:", token) // 👈 Add this here

      const response = await fetch("/api/admin/upload-orders", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })

      const data = await response.json()

      if (response.ok) {
        setSuccessMessage(`Successfully uploaded ${data.count} customer records`)
        setUploadStatus("success")
        onFileUploaded(data.count)

        // Clear the file input
        event.target.value = ""
      } else {
        throw new Error(data.error || "Failed to upload data")
      }
    } catch (error) {
      console.error("Excel Uploader: Error:", error)
      setErrorMessage(error instanceof Error ? error.message : "Failed to process Excel file")
      setUploadStatus("error")
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <FileSpreadsheet className="h-5 w-5 mr-2" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-600 mb-2">
            {isUploading ? "Processing file..." : "Click to upload Excel file"}
          </p>
          <input
            type="file"
            accept=".xlsx,.xls"
            onChange={handleFileUpload}
            disabled={isUploading}
            className="hidden"
            id="excel-upload"
          />
          <Button
            type="button"
            variant="outline"
            disabled={isUploading}
            onClick={() => document.getElementById("excel-upload")?.click()}
          >
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Choose File
              </>
            )}
          </Button>
        </div>

        {uploadStatus === "success" && (
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>{successMessage}</AlertDescription>
          </Alert>
        )}

        {uploadStatus === "error" && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}

        <div className="text-sm text-gray-600">
          <p className="font-medium mb-2">Expected columns:</p>
          <div className="grid grid-cols-2 gap-1">
            {expectedColumns.map((col) => (
              <span key={col} className="text-xs bg-gray-100 px-2 py-1 rounded">
                {col}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
