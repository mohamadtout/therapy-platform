"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Upload, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { profileService } from "@/lib/api/api-services"
import { format } from "date-fns"

interface UploadReportModalProps {
  isOpen: boolean
  onClose: () => void
  appointment: any
  userId: string
}

export function UploadReportModal({ isOpen, onClose, appointment, userId }: UploadReportModalProps) {
  const { toast } = useToast()
  const [isUploading, setIsUploading] = useState(false)
  const [reportData, setReportData] = useState({
    name: "",
    description: "",
    file: null as File | null,
    date: format(new Date(), "yyyy-MM-dd"),
  })

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Check if the file type is supported
    const supportedTypes = [
      "image/jpeg",
      "image/png",
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ]

    if (!supportedTypes.includes(file.type)) {
      toast({
        title: "Unsupported File Type",
        description: "Please upload a JPG, PNG, PDF, DOC, DOCX, XLS, or XLSX file.",
        variant: "destructive",
      })
      return
    }

    setReportData({ ...reportData, file })
  }

  const handleSubmit = async () => {
    if (!reportData.name || !reportData.file || !appointment) {
      toast({
        title: "Missing Information",
        description: "Please provide a name and file for the report.",
        variant: "destructive",
      })
      return
    }

    try {
      setIsUploading(true)

      // Convert file to base64
      const base64Report = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result as string)
        reader.onerror = reject
        reader.readAsDataURL(reportData.file!)
      })

      // Prepare the data for the API
      const data = {
        sessionId: appointment.id, // This is the tbs_id from the backend
        report: base64Report,
        reportName: reportData.name,
        description: reportData.description || undefined,
        date: reportData.date,
      }

      // Call the API to upload the report
      await profileService.uploadReport(data)

      // Show success message
      toast({
        title: "Report Uploaded",
        description: "Your report has been uploaded successfully.",
      })

      // Reset form and close modal
      setReportData({
        name: "",
        description: "",
        file: null,
        date: format(new Date(), "yyyy-MM-dd"),
      })
      onClose()
    } catch (error: any) {
      console.error("Error uploading report:", error)
      toast({
        title: "Upload Failed",
        description: error.response?.data?.message || "Failed to upload report. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Upload Session Report</DialogTitle>
        </DialogHeader>

        {appointment && (
          <div className="bg-gray-50 p-3 rounded-md mb-4">
            <p className="font-medium">{appointment.therapist_name || appointment.specialist}</p>
            <p className="text-sm text-gray-500">
              Session on {appointment.date} at {appointment.start || appointment.time}
            </p>
          </div>
        )}

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="reportName">Report Name</Label>
            <Input
              id="reportName"
              value={reportData.name}
              onChange={(e) => setReportData({ ...reportData, name: e.target.value })}
              placeholder="e.g. Session Notes, Progress Report, etc."
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="reportDate">Date</Label>
            <Input
              id="reportDate"
              type="date"
              value={reportData.date}
              onChange={(e) => setReportData({ ...reportData, date: e.target.value })}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="reportDescription">Description (Optional)</Label>
            <Textarea
              id="reportDescription"
              value={reportData.description}
              onChange={(e) => setReportData({ ...reportData, description: e.target.value })}
              placeholder="Add any details about this report"
              rows={3}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="reportFile">Upload File</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
              <Input id="reportFile" type="file" className="hidden" onChange={handleFileChange} />
              <label htmlFor="reportFile" className="cursor-pointer">
                <div className="flex flex-col items-center">
                  <Upload className="h-10 w-10 text-gray-400 mb-2" />
                  <p className="text-sm font-medium">
                    {reportData.file ? reportData.file.name : "Click to upload or drag and drop"}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">PDF, Word, Excel, or image files accepted</p>
                </div>
              </label>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isUploading}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isUploading || !reportData.name || !reportData.file}>
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              "Upload Report"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
