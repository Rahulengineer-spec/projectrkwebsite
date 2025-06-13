"use client"

import { useState, useEffect } from "react"

interface CsrfState {
  csrfToken: string | null
  csrfLoading: boolean
  csrfError: boolean
}

export function useCsrf(): CsrfState {
  const [state, setState] = useState<CsrfState>({
    csrfToken: null,
    csrfLoading: true,
    csrfError: false,
  })

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await fetch("/api/csrf")
        if (!response.ok) {
          throw new Error("Failed to fetch CSRF token")
        }
        const data = await response.json()
        setState({
          csrfToken: data.csrfToken,
          csrfLoading: false,
          csrfError: false,
        })
      } catch (error) {
        console.error("Error fetching CSRF token:", error)
        setState({
          csrfToken: null,
          csrfLoading: false,
          csrfError: true,
        })
      }
    }

    fetchCsrfToken()
  }, [])

  return state
} 