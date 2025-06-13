"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"

export default function BlogError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <div className="container max-w-md text-center">
        <div className="mb-8 text-red-500">
          <Icons.warning className="h-12 w-12 mx-auto" />
        </div>
        <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
        <p className="text-muted-foreground mb-8">
          We apologize for the inconvenience. Please try again later or contact support if the problem persists.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="outline"
            onClick={() => reset()}
            className="rounded-full"
          >
            Try again
          </Button>
          <Button
            variant="default"
            onClick={() => window.location.href = "/"}
            className="rounded-full"
          >
            Return Home
          </Button>
        </div>
      </div>
    </div>
  )
} 