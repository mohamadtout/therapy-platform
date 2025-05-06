"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { specialistService } from "@/lib/api/api-services"
import { useToast } from "@/hooks/use-toast"
import { FileText, FileImage, FileArchive, FileIcon as FilePdf, File, Loader2, ExternalLink } from "lucide-react"
import type { SessionReport } from "@/lib/api/api-services"

interface SessionReportsModalProps {
  isOpen: boolean
  onClose: () => void
  sessionId: string | null
  patientName: string
}

export function SessionReportsModal({ isOpen, onClose, sessionId, patientName }: SessionReportsModalProps) {
  const [reports, setReports] = useState<SessionReport[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    if (isOpen && sessionId) {
      fetchReports()
    }
  }, [isOpen, sessionId])

  const fetchReports = async () => {
    if (!sessionId) return

    setIsLoading(true)
    try {
      const response = await specialistService.getSessionReports(sessionId)
      setReports(response.data.reports || [])
    } catch (error) {
      console.error("Error fetching reports:", error)
      toast({
        title: "Error",
        description: "Failed to load session reports. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split(".").pop()?.toLowerCase() || ""

    switch (extension) {
      case "pdf":
        return <FilePdf className="h-10 w-10 text-red-500" />
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
      case "webp":
        return <FileImage className="h-10 w-10 text-blue-500" />
      case "zip":
      case "rar":
      case "7z":
        return <FileArchive className="h-10 w-10 text-yellow-500" />
      case "doc":
      case "docx":
      case "txt":
        return <FileText className="h-10 w-10 text-blue-700" />
      default:
        return <File className="h-10 w-10 text-gray-500" />
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
  }

  const openReport = (link: string) => {
    window.open(link, "_blank")
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{patientName}'s Session Reports</DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : reports.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <FileText className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p>No reports found for this session.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {reports.map((report) => (
              <div
                key={report.id}
                className="border rounded-lg p-4 flex items-start gap-3 hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => openReport(report.link)}
              >
                <div className="flex-shrink-0">{getFileIcon(report.report_name)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-sm truncate">{report.report_name}</h4>
                    <ExternalLink className="h-4 w-4 text-gray-400 flex-shrink-0 ml-1" />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{formatDate(report.date)}</p>
                  {report.description && (
                    <p className="text-xs text-gray-600 mt-1 line-clamp-2">{report.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
