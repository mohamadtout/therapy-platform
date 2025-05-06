"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { profileService } from "@/lib/api/api-services"
import type { SessionReport } from "@/lib/api/api-services"
import {
  FileIcon,
  FileTextIcon,
  FileImage,
  FileSpreadsheet,
  Trash2,
  Download,
  Loader2,
  AlertCircle,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface ViewReportsModalProps {
  isOpen: boolean
  onClose: () => void
  appointment: any
  userId: string
  onReportsUpdated?: () => void
}

export function ViewReportsModal({ isOpen, onClose, appointment, userId, onReportsUpdated }: ViewReportsModalProps) {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [reports, setReports] = useState<SessionReport[]>([])
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [reportToDelete, setReportToDelete] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    if (isOpen && appointment) {
      fetchReports()
    }
  }, [isOpen, appointment])

  const fetchReports = async () => {
    if (!appointment) return

    try {
      setIsLoading(true)
      const response = await profileService.getSessionReports(appointment.id)
      setReports(response.data.reports || [])
    } catch (error: any) {
      console.error("Error fetching reports:", error)
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to load reports",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteReport = async () => {
    if (!reportToDelete) return

    try {
      setIsDeleting(true)
      await profileService.deleteReport(Number(reportToDelete))

      // Update the reports list
      setReports(reports.filter((report) => report.id !== reportToDelete))

      toast({
        title: "Report Deleted",
        description: "The report has been successfully deleted.",
      })

      if (onReportsUpdated) {
        onReportsUpdated()
      }
    } catch (error: any) {
      console.error("Error deleting report:", error)
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to delete report",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
      setIsDeleteDialogOpen(false)
      setReportToDelete(null)
    }
  }

  const openDeleteDialog = (reportId: string) => {
    setReportToDelete(reportId)
    setIsDeleteDialogOpen(true)
  }

  const getFileIcon = (link: string) => {
    const extension = link.split(".").pop()?.toLowerCase()

    switch (extension) {
      case "pdf":
        return <FileIcon className="h-8 w-8 text-red-500" />
      case "jpg":
      case "jpeg":
      case "png":
        return <FileImage className="h-8 w-8 text-blue-500" />
      case "doc":
      case "docx":
        return <FileTextIcon className="h-8 w-8 text-blue-700" />
      case "xls":
      case "xlsx":
        return <FileSpreadsheet className="h-8 w-8 text-green-600" />
      default:
        return <FileIcon className="h-8 w-8 text-gray-500" />
    }
  }

  const getFileType = (link: string) => {
    const extension = link.split(".").pop()?.toLowerCase()

    switch (extension) {
      case "pdf":
        return "PDF"
      case "jpg":
      case "jpeg":
      case "png":
        return "Image"
      case "doc":
      case "docx":
        return "Document"
      case "xls":
      case "xlsx":
        return "Spreadsheet"
      default:
        return "File"
    }
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Session Reports</DialogTitle>
          </DialogHeader>

          <div className="py-4">
            {appointment && (
              <div className="bg-gray-50 p-3 rounded-md mb-4">
                <p className="font-medium">{appointment.therapist_name || appointment.specialist}</p>
                <p className="text-sm text-gray-500">
                  Session on {appointment.date} at {appointment.start || appointment.time}
                </p>
              </div>
            )}

            {isLoading ? (
              <div className="flex justify-center items-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : reports.length > 0 ? (
              <div className="space-y-3">
                {reports.map((report) => (
                  <div key={report.id} className="border rounded-lg p-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0">{getFileIcon(report.link)}</div>
                        <div>
                          <h3 className="font-medium">{report.report_name}</h3>
                          <p className="text-xs text-gray-500 mt-1">
                            Uploaded on {format(new Date(report.date), "MMMM d, yyyy")}
                          </p>
                          {report.description && (
                            <p className="text-sm mt-2 bg-gray-50 p-2 rounded">{report.description}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{getFileType(report.link)}</Badge>
                      </div>
                    </div>
                    <div className="mt-3 flex justify-end gap-2">
                      <Button size="sm" variant="outline" asChild>
                        <a href={report.link} target="_blank" rel="noopener noreferrer">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </a>
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => openDeleteDialog(report.id)}>
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <FileIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p>No reports uploaded for this session yet</p>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Report</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this report? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex items-center justify-center py-4">
            <AlertCircle className="h-16 w-16 text-red-500" />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteReport} disabled={isDeleting}>
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
