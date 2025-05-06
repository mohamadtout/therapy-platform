"use client"

import { useState, useEffect, useCallback } from "react"

// Generic hook for API calls
export function useApi<T>(apiFunction: () => Promise<any>, initialData: T, immediate = true) {
  const [data, setData] = useState<T>(initialData)
  const [loading, setLoading] = useState<boolean>(immediate)
  const [error, setError] = useState<Error | null>(null)

  const execute = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await apiFunction()
      setData(response.data)
      return response.data
    } catch (err) {
      setError(err as Error)
      throw err
    } finally {
      setLoading(false)
    }
  }, [apiFunction])

  useEffect(() => {
    if (immediate) {
      execute()
    }
  }, [execute, immediate])

  return { data, loading, error, execute, setData }
}