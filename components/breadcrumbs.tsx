"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { cn } from "@/lib/utils"

export function Breadcrumbs() {
  const pathname = usePathname()
  if (!pathname) return null
  
  const segments = pathname.split("/").filter(Boolean)
  if (segments.length === 0) return null

  const breadcrumbs = segments.map((segment, index) => {
    const href = `/${segments.slice(0, index + 1).join("/")}`
    return {
      href,
      label: segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " "),
    }
  })

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        <li>
          <Link
            href="/"
            className={cn(
              "text-muted-foreground hover:text-foreground transition-colors",
              pathname === "/" && "text-foreground"
            )}
          >
            <Home className="h-4 w-4" />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={breadcrumb.href} className="flex items-center">
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <Link
              href={breadcrumb.href}
              className={cn(
                "ml-2 text-muted-foreground hover:text-foreground transition-colors",
                index === breadcrumbs.length - 1 && "text-foreground font-medium"
              )}
            >
              {breadcrumb.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  )
} 