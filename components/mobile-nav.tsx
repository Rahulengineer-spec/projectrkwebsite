"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Icons } from "@/components/icons"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"

export function MobileNav() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  // Listen for custom event to toggle nav
  useEffect(() => {
    const handleToggle = () => setIsOpen(!isOpen)
    document.addEventListener('toggle-mobile-nav', handleToggle)
    return () => document.removeEventListener('toggle-mobile-nav', handleToggle)
  }, [isOpen])

  const toggleItem = (title: string) => {
    setExpandedItems(prev => 
      prev.includes(title) 
        ? prev.filter(item => item !== title)
        : [...prev, title]
    )
  }

  const navigation = [
    {
      title: "Home",
      href: "/",
      icon: Icons.home,
    },
    {
      title: "Courses",
      href: "/courses",
      icon: Icons.graduationCap,
      children: [
        {
          title: "All Courses",
          href: "/courses",
          description: "Browse all available courses"
        },
        {
          title: "My Learning",
          href: "/dashboard/courses",
          description: "Access your enrolled courses"
        },
        {
          title: "Categories",
          href: "/courses/categories",
          description: "Browse courses by category"
        }
      ]
    },
    {
      title: "Instructors",
      href: "/instructor",
      icon: Icons.users,
    },
    {
      title: "Blog",
      href: "/blog",
      icon: Icons.fileText,
    }
  ]

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent 
        side="left" 
        className="w-full max-w-[300px] p-0 bg-background/80 backdrop-blur-xl border-r border-border/40"
      >
        <ScrollArea className="h-full">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="p-4 border-b border-border/40">
              <Link 
                href="/" 
                className="flex items-center space-x-2 active:opacity-70 transition-opacity"
                onClick={() => setIsOpen(false)}
              >
                <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                  RK INSTITUTION
                </span>
              </Link>
            </div>

            {/* Navigation */}
            <div className="flex-1 py-4">
              <div className="space-y-1 px-2">
                {navigation.map((item) => (
                  <div key={item.title}>
                    {item.children ? (
                      <>
                        <button
                          onClick={() => toggleItem(item.title)}
                          className={cn(
                            "w-full flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-all",
                            "hover:bg-accent/50 hover:text-accent-foreground active:scale-[0.98]",
                            "touch-manipulation",
                            pathname.startsWith(item.href) && "bg-accent/50 text-accent-foreground"
                          )}
                        >
                          <div className="flex items-center gap-2">
                            <item.icon className="h-4 w-4" />
                            {item.title}
                          </div>
                          <Icons.chevronDown 
                            className={cn(
                              "h-4 w-4 transition-transform duration-200",
                              expandedItems.includes(item.title) && "transform rotate-180"
                            )} 
                          />
                        </button>
                        {expandedItems.includes(item.title) && (
                          <div className="mt-1 ml-4 space-y-1 animate-in slide-in-from-left-5 duration-200">
                            {item.children.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                onClick={() => setIsOpen(false)}
                                className={cn(
                                  "block rounded-lg px-3 py-2 text-sm font-medium transition-all",
                                  "hover:bg-accent/50 hover:text-accent-foreground active:scale-[0.98]",
                                  "touch-manipulation",
                                  pathname === child.href && "bg-accent/50 text-accent-foreground"
                                )}
                              >
                                <div className="flex items-center gap-2">
                                  <span>{child.title}</span>
                                </div>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {child.description}
                                </p>
                              </Link>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all",
                          "hover:bg-accent/50 hover:text-accent-foreground active:scale-[0.98]",
                          "touch-manipulation",
                          pathname === item.href && "bg-accent/50 text-accent-foreground"
                        )}
                      >
                        <item.icon className="h-4 w-4" />
                        {item.title}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-border/40 space-y-4">
              <div className="flex items-center justify-between">
                <ThemeToggle />
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-lg hover:bg-accent/50 active:scale-[0.98] touch-manipulation"
                  asChild
                >
                  <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                    <Icons.user className="h-5 w-5" />
                    <span className="sr-only">Dashboard</span>
                  </Link>
                </Button>
              </div>
              <div className="space-y-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-sm font-medium active:scale-[0.98] touch-manipulation"
                  asChild
                >
                  <Link href="/dashboard/profile" onClick={() => setIsOpen(false)}>
                    <Icons.settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-sm font-medium active:scale-[0.98] touch-manipulation"
                  asChild
                >
                  <Link href="/help" onClick={() => setIsOpen(false)}>
                    <Icons.help className="mr-2 h-4 w-4" />
                    Help & Support
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
} 