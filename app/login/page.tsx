"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/icons"
import { useCsrf } from "@/hooks/useCsrf"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

interface LoginFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function LoginForm({ className, ...props }: LoginFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const { csrfToken, loading: csrfLoading, error: csrfError, validateToken } = useCsrf()

  async function handleSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)

    if (!csrfToken) {
      toast.error("CSRF token not available. Please try again.")
      setIsLoading(false)
      return
    }

    try {
      // Validate CSRF token first
      const isValidToken = await validateToken(csrfToken)
      if (!isValidToken) {
        throw new Error("Invalid security token")
      }

      const target = event.target as typeof event.target & {
        email: { value: string }
        password: { value: string }
      }

      const signInResult = await signIn("credentials", {
        email: target.email.value.toLowerCase(),
        password: target.password.value,
        csrfToken,
        redirect: false,
      })

      if (!signInResult?.ok) {
        throw new Error("Your sign in request failed. Please try again.")
      }

      router.push("/dashboard")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  if (csrfError) {
    return (
      <div className={className} {...props}>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Failed to load security token. Please refresh the page and try again.
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className={className} {...props}>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading || csrfLoading}
            />
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              placeholder="Password"
              type="password"
              autoCapitalize="none"
              autoComplete="current-password"
              autoCorrect="off"
              disabled={isLoading || csrfLoading}
            />
          </div>
          <Button disabled={isLoading || csrfLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In
          </Button>
        </div>
      </form>
      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button
        variant="outline"
        type="button"
        disabled={isLoading || csrfLoading}
        onClick={async () => {
          try {
            if (!csrfToken) {
              throw new Error("CSRF token not available")
            }

            const isValidToken = await validateToken(csrfToken)
            if (!isValidToken) {
              throw new Error("Invalid security token")
            }

            await signIn("google", { csrfToken })
          } catch (error) {
            toast.error(error instanceof Error ? error.message : "An error occurred")
          }
        }}
      >
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}{" "}
        Google
      </Button>
    </div>
  )
} 