import axios from "axios"

// Create axios instance with base URL from environment variable
const apiClient = axios.create({
  baseURL: "http://167.86.104.227:3000/",
  // baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds
})

// Add request interceptor to include auth token in requests
apiClient.interceptors.request.use(
  (config) => {
    // Get token from localStorage (only in browser)
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token")
      if (token) {
        config.headers.Authorization = `${token}`
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Add response interceptor to handle common errors
apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // Handle unauthorized errors (401)
    if (error.response && error.response.status === 401) {
      // Clear token and redirect to login if unauthorized
      if (typeof window !== "undefined") {
        localStorage.removeItem("token")
        window.location.href = "/login"
      }
    }
    return Promise.reject(error)
  },
)

export default apiClient

