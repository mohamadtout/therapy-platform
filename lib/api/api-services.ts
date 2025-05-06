import { subscribe } from "diagnostics_channel"
import apiClient from "./axios-config"


//App Services

export const appService = {
  getPackages : async () => {
    return apiClient.get('/packages')
  },
  subscribe: async (email: string) => {
    return await apiClient.post('/subscribe', {email})
  },
  unsubscribe: async (email: string) => {
    return await apiClient.post('/unsubscribe', {email})
  },
  submitContactForm: async (contactData: {
    name: string
    email: string
    phone: string
    subject: string
    message: string
  }) => {
    return apiClient.post("/contact-us", contactData)
  },
}



// Auth Services
export const authService = {
  login: async (email: string, password: string) => {
    return apiClient.post("/auth/login", { email, password })
  },
  signup: async (email: string, phone: string, password: string, nickname: string) => {
    return apiClient.post("/auth/signup", {email, phone, password, nickname})
  },
  signupconfirm: async (url: string, otp: string) => {
    // if(otp.length != 6) {
    //     throw new Error("Invalid code")
    // }
    // if(!url) {
    //     throw new Error("Invalid url")
    // }
    return apiClient.post("/auth/signup/validate", { url, otp })
  },
  resendVerificationCode: async (verifyURL: string) => {
    return apiClient.post("/auth/signup/resend", { verifyURL })
  },

  //NOT DONE
  requestPasswordReset: async (email: string) => {
    return apiClient.post("/auth/request-password-reset", {email})
  },

  resetPassword: async(verifyURL: string, code: string, newPassword: string) => {
    return apiClient.post("/auth/reset-password", {verifyURL, code, newPassword})
  },

  logout: async () => {
    return apiClient.post("/auth/logout")
  },
  forgotPassword: async (email: string) => {
    return apiClient.post("/auth/forgot-password", { email })
  },
  getCurrentUser: async () => {
    return apiClient.get("/auth/me")
  },
}


export const profileService = {
  
  //TODO: MAKE SURE OF CHIDLREN AND APPOINTMENTS
  getProfile: async () => {
    return apiClient.post(`/patient/profile/`)
  },
  //TODO: TEST
  updateProfile: async (nickname: string, phone: string, pfp: string | null, address: string) => {
    return apiClient.post(`/patient/update-profile/`, {nickname, phone, pfp, address})
  },

  changePassword: async (oldPassword: string, password: string) => {
    return apiClient.post(`/patient/reset-password-old`, {oldPassword, password})
  },
  createChild: (name: string, birthDate: string, pfp: string | null, gender: number) => {
    return apiClient.post("/patient/add-child", {name, birthDate, pfp, gender})
  },
  deleteChild: (childId: number) => {
    return apiClient.post("/patient/delete-child", {childId})
  },
  uploadMedicalRecord: async (documentData: {
    documentName: string
    document: string // base64 string
    date: string // YYYY-MM-DD format
    description?: string
  }) => {
    return apiClient.post("/patient/upload-document", documentData)
  },
  deleteDocument: async (documentId: number) => {
    return apiClient.post(`/patient/delete-document/`, {documentId})
  },
  // Add report methods
  uploadReport: async (reportData: {
    sessionId: string | number
    report: string // base64 string
    reportName: string
    description?: string
    date: string // YYYY-MM-DD format
  }) => {
    return apiClient.post("/patient/upload-report", reportData)
  },
  deleteReport: async (reportId: number) => {
    return apiClient.post("/patient/delete-report", { reportId })
  },
  getSessionReports: async (sessionId: string | number) => {
    return apiClient.post("/patient/session-reports", {
      sessionId,
      userId: localStorage.getItem("userId"),
    })
  },

}

//FUNCTIONS FOR SPECIALIST
export const specialistService = {
  getProfile: async () => {
    return apiClient.post(`/therapist/profile`)
  },
  updateProfile: async (
    profileData: {
      nickname: string
      phone: string
      pfp?: string
      specialties?: string[]
    },
  ) => {
    return apiClient.post("/therapist/update-profile", profileData)
  },
  updateSchedule: async (scheduleData: {
    schedule_add?: Array<{ day: number; start_time: string; end_time: string }>
    schedule_remove?: Array<{ ts_id: string }>
    schedule_edit?: Array<{ id: string; day: number; start_time: string; end_time: string }>
  }) => {
    return apiClient.post("/therapist/update-schedule", scheduleData)
  },
  updateScheduleException: async (
    exceptionData: {
      exception_add?: Array<{ ts_id: string; start_time: string; end_time: string }>
      exception_remove?: Array<{ tse_id: string }>
      exception_edit?: Array<{ tse_id: string; start_time: string; end_time: string }>
    },
  ) => {
    return apiClient.post("/therapist/update-schedule-exceptions", exceptionData)
  },
  getScheduleWithExceptions: async () => {
    return apiClient.post("/therapist/get-schedule-exceptions")
  },
  getAppointments: async() =>{
    return apiClient.get("/therapist/appointments")
  },
  getPendingAppointments: async() =>{
    return apiClient.get("/therapist/appointments/pending")
  },
  approveAppointment: async(tbs_id: string) => {
    return apiClient.post("/therapist/appointments/approve", {tbs_id})
  },
  rejectAppointment: async(tbs_id: string) => {
    return apiClient.post("/therapist/appointments/reject", {tbs_id})
  },
  // Patient management
  getPatients: async () => {
    return apiClient.post("/therapist/patients")
  },
  getPatientDocumentsList: async (patientId: string) => {
    return apiClient.post("/therapist/patient-documents", { patientId })
  },
  getSessionReports: async (sessionId: string | number) => {
    return apiClient.post("/therapist/session-reports", { sessionId })
  },
}

// Appointment Services
export const patientAppointmentService = {
  // getAppointments: async (params?: any) => {
  //   return apiClient.get("/appointments", { params })
  // },
  // getAppointmentById: async (id: string) => {
  //   return apiClient.get(`/appointments/${id}`)
  // },
  // createAppointment: async (appointmentData: any) => {
  //   return apiClient.post("/appointments", appointmentData)
  // },
  // updateAppointment: async (id: string, appointmentData: any) => {
  //   return apiClient.put(`/appointments/${id}`, appointmentData)
  // },
  // deleteAppointment: async (id: string) => {
  //   return apiClient.delete(`/appointments/${id}`)
  // },
  // New methods for booking appointments
  getTherapistsDetails: async () => {
    return apiClient.post("/patient/therapists")
  },
  getConsultationSchedule: async (date: string, therapist_id: string) => {
    return apiClient.post("/patient/booking", { date, therapist_id })
  },
  bookConsultation: async (
    date: string,
    time: { start: string; end: string },
    userId: string,
    therapist_id: string,
    childId: number,
  ) => {
    return apiClient.post("/patient/book", { date, time, userId, therapist_id, childId })
  },
}

//TYPES FOR SPECIALIST
export interface Profile {
  nickname: string
  pfp: string
  email: string
  phone: string
  address: string
  specialties: Specialty[]
  specialties_all: Specialty[]
  pendingRequests: number
}
export interface Specialty {
  specialty_id: string
  specialty_name: string
}

// Add this new section for admin user management at the end of the file
export const adminUsersService = {
  getAllUsers: async (index = 0) => {
    return apiClient.post("/admin/users", { index })
  },
  createUser: async (userData: {
    email: string
    nickname: string
    password: string
    level: string
    authorized: number
  }) => {
    return apiClient.post("/admin/users/create", userData)
  },
  editUser: async (userData: {
    editId: string | number
    email: string
    nickname: string
    level: string
    authorized: number
  }) => {
    return apiClient.post("/admin/users/edit", userData)
  },
  deleteUser: async (deleteId: string | number) => {
    return apiClient.post("/admin/users/delete", { deleteId })
  },
}

export const adminTherapistsService = {
  // Admin therapist management
  getAllTherapists: async (index = 0) => {
    return apiClient.post("/admin/therapists", { index })
  },
  addNewTherapist: async (therapistData: {
    email: string
    nickname: string
    password: string
    phone: string
    address?: string
    schedule: Array<{
      day: number
      start_time: string
      end_time: string
      exceptions?: Array<{
        start_time: string
        end_time: string
      }>
    }>
    first_name: string
    last_name: string
    birth_date?: string
    primary_specialty_id: string
    secondary_specialty_id?: string
    qualifications: string
    career_start: string
    professional_bio: string
    therapeutic_approach: string
    session_duration: number
    buffer_time: number
    pfp?: string
    permission_ids: number[]
  }) => {
    return apiClient.post("/admin/therapists/create", therapistData)
  },
  changeTherapistAuthorization: async (therapistId: string, authorization: number) => {
    return apiClient.post("/admin/therapists/authorization", { therapistId, authorization })
  },
  getTherapistSchedule: async (therapistId: string) => {
    return apiClient.post("/admin/therapists/schedule", { therapistId })
  },
  updateTherapistSchedule: async (
    therapistId: string,
    scheduleData: {
      schedule_add?: Array<{ day: number; start_time: string; end_time: string }>
      schedule_remove?: Array<{ ts_id: string }>
      schedule_edit?: Array<{ id: string; day: number; start_time: string; end_time: string }>
      exception_add?: Array<{ ts_id: string; start_time: string; end_time: string }>
      exception_remove?: Array<{ tse_id: string }>
      exception_edit?: Array<{ tse_id: string; start_time: string; end_time: string }>
    },
  ) => {
    return apiClient.post("/admin/therapists/update-schedule", { ...scheduleData, therapistId })
  },
}

// Admin appointment management
export const adminAppointmentService = {
  getAllAppointments: async (index = 0) => {
    return apiClient.post("/admin/appointments", { index })
  },
  createAppointment: async (appointmentData: {
    date: string
    time: { start: string; end: string }
    userId: string | number
    therapist_id: string | number
  }) => {
    return apiClient.post("/admin/appointments/create", appointmentData)
  },
  editAppointment: async (appointmentData: {
    editId: string | number
    status: string
  }) => {
    return apiClient.post("/admin/appointments/edit", appointmentData)
  },
  deleteAppointment: async (deleteId: string | number) => {
    return apiClient.post("/admin/appointments/delete", { deleteId })
  },
}

// Types for appointments
export interface AppointmentData {
  id: string
  status: string
  date: string
  start: string
  end: string
  therapist_name: string
  therapist_pfp: string
  patient_name: string
  patient_pfp: string
  specialty: string[]
}

export interface PatientData {
  id: string
  nickname: string
  pfp: string
}

export interface TherapistData {
  id: string
  nickname: string
  pfp: string
}

export interface SpecialtyData {
  id: string
  specialty_name: string
}

export interface SessionReport {
  id: string
  link: string
  report_name: string
  description: string | null
  date: string
}

// Admin Packages
export const adminPackagesService = {
  getPackages : async () => {
    return await apiClient.get("/admin/packages")
  },
  
  createPackage : async (packageData: any) => {
    return await apiClient.post("/admin/packages/create", packageData)
  },
  
  updatePackage : async (packageData: any) => {
    return await apiClient.post(`/admin/packages/edit`, packageData)
  },

  deletePackage : async (id: number) => {
    return await apiClient.post(`/admin/packages/delete`, { pkg_id: id })
  }
}

export interface Package {
  pkg_id: number
  package_category: string
  package_name: string
  short_description: string
  session_count: number
  global_cost: number | null
  regional_cost: number | null
  is_recommended: number
  is_active: number
  features: PackageFeature[] | null
}

export interface PackageFeature {
  pf_id: number
  package_id: number
  feature: string
}


//Blogs

export interface ContentItem {
  id: number
  title: string
  excerpt: string
  content: string
  type: "blog" | "program"
  seo_title: string
  meta_description: string
  category_id: number
  publish_date: string
  status: "draft" | "published"
  table_of_content?: number
  featured_image: string | null
  author_id?: number
  author_name?: string
  author_image?: string
  tags?: ContentTag[]
  category_name?: string
  slug?: string
  created_at?: string
  updated_at?: string
}

export interface ContentTag {
  id: number
  content_id: number
  tag: string
}

export interface ContentCategory {
  id: number
  name: string
  slug: string
  description?: string
  parent_id?: number | null
  type?: string
}

export interface ContentAuthor {
  id?: number
  name: string
  profile_image?: string | null
}


export const contentService = {
  // Get all content items (blogs or programs) with filtering
  getAllContent: async (type: "blog" | "program", filters: any = {}) => {
    return await apiClient.post("/content/list", {
      type,
      page: filters.page || 1,
      limit: filters.limit || 10,
      category: filters.category || null,
      tag: filters.tag || null,
      search: filters.search || null,
      sort_by: filters.sort_by || "publish_date",
      sort_order: filters.sort || "desc"
    })
  },

  getAllContentAdmin: async (type: "blog" | "program", filters: any = {}) => {
    return await apiClient.post("/content/admin/list", {
      type,
      page: filters.page || 1,
      limit: filters.limit || 10,
      category: filters.category || null,
      tag: filters.tag || null,
      search: filters.search || null,
      sort_by: filters.sort_by || "publish_date",
      sort_order: filters.sort || "desc"
    })
  },
  // Get content by slug
  getContentBySlug: async (slug: string) => {
    return await apiClient.post("/content/detail", { slug })
  },
  // Get admin content by slug
  getContentBySlugAdmin: async (slug: string) => {
    return await apiClient.post("/content/admin/detail", { slug })
  },


  // Get all requirements for content creation/editing in admin
  getContentRequirements: async (type: "blog" | "program") => {
    return await apiClient.post("/content/admin/requirements", { type })
  },

  // Create or update content
  saveContent: async (contentData: Partial<ContentItem>, tags?: string[]) => {
    const formData = new FormData();

    let body = contentData
    // body.tags = tags
    // Add all content fields
    
    // (Object.keys(contentData) as (keyof ContentItem)[]).forEach((key) => {
    //   const value = contentData[key];
    //   if (value !== undefined && value !== null) {
    //     formData.append(key, value.toString());
    //   }
    // });
    

    // Add tags as JSON string
    // if (tags && tags.length > 0) {
    //   formData.append("tags", JSON.stringify(tags))
    // }

    // // If there's a featured image as File object, append it
    // if (contentData.featured_image) {
    //   formData.append("featuredImage", contentData.featured_image)
    // }

    return await apiClient.post("/content/admin/save", {...body, tags}
    // , {
      // headers: {
      //   "Content-Type": "multipart/form-data",
      // },
    // }
  )
  },

  // Delete content
  deleteContent: async (id: number) => {
    return await apiClient.post("/content/admin/delete", { id })
  },

  getCategoriesAdmin: async() => {
    return await apiClient.post("/content/admin/categories")
  },
  // Manage categories
  manageCategory: async (action: "create" | "update" | "delete", categoryData: Partial<ContentCategory>) => {
    return await apiClient.post("/content/admin/category", {
      action,
      ...categoryData,
    })
  },
  manageTags: async( action: "create" | "delete", tagData: Partial<ContentTag>) => {
    return await apiClient.post("/content/admin/tag",{
      action,
      ...tagData
    })
  }
}

// Messaging Services
export const messagingService = {
  // Get all messaging data
  getMessagingData: async () => {
    return apiClient.get("/admin/messaging/data")
  },

  // Mark contact message as read
  markAsRead: async (contactId: number) => {
    // console.log(contactId)
    return apiClient.post("/admin/messaging/mark-read", { contactId })
  },

  // Delete contact message
  deleteContact: async (contactId: number) => {
    return apiClient.post("/admin/messaging/delete-contact", { contactId })
  },

  // Blacklist email
  blacklistEmail: async (email: string) => {
    return apiClient.post("/admin/messaging/blacklist", { email })
  },

  // Send email response
  sendEmailResponse: async (data: {
    emails: string[]
    subject: string
    body: string
  }) => {
    return apiClient.post("/admin/messaging/send", data)
  },
}

// Messaging Types
export interface ContactMessage {
  cu_id: number
  name: string
  email: string
  phone: string
  subject: string
  body: string
  date: string
  is_read: number
}

export interface EmailTemplate {
  template_name: string
  subject: string
  message: string
}

export interface SentEmail {
  batch: number
  subject: string
  message: string
  total_recipients: number
  email_details: Array<{
    email: string
    error: string | null
  }>
}

export interface MessagingData {
  users: Array<{ email: string }>
  templates: EmailTemplate[]
  sentEmails: SentEmail[]
  blacklist: Array<{ email: string }>
  contactUs: ContactMessage[]
}

// Settings Services
export const settingsService = {
  // Get all settings
  getSettings: async () => {
    return apiClient.get("/admin/settings")
  },

  // Update settings
  updateSettings: async (settings: SystemSettings) => {
    return apiClient.post("/admin/settings/update", settings)
  },
}

export interface SystemSettings {
  s_id?: number
  site_name: string
  contact_email: string
  site_description: string
  support_phone: string
  maintenance_mode: number
  smtp_server: "Gmail" | "Mailgun" | "SendGrid" | "Amazon SES"
  smtp_host: string
  smtp_port: number
  smtp_username: string
  smtp_password: string
  smtp_sender_name: string
  smtp_sender_email: string
  email_notifications: number
  reminder_time: "1 hour" | "2 hours" | "6 hours" | "12 hours" | "24 hours" | "48 hours"
  password_complexity:
    | "Basic (8+ chars)"
    | "Medium (8+ chars, upper/lowercase, numbers)"
    | "Standard (8+ chars, upper/lowercase, numbers, symbols)"
    | "High (12+ chars, upper/lowercase, numbers, symbols)"
  max_failed_attemps: number
  permissions?: number
}

