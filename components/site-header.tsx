"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"
import { Breadcrumbs } from "@/components/breadcrumbs"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

export function SiteHeader() {
  const pathname = usePathname()
  const { theme } = useTheme()

  const isActive = (path: string) => {
    if (path === "/") return pathname === path
    return pathname?.startsWith(path)
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
    <header className={cn(
      "sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl",
      "transition-all duration-200"
    )}>
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link 
          href="/" 
          className="flex items-center space-x-2 active:opacity-70 transition-opacity touch-manipulation"
        >
          <span className="text-lg md:text-xl font-bold tracking-tight bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
            RK INSTITUTION
          </span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex md:flex-1 md:items-center md:justify-center md:space-x-1">
          <NavigationMenu>
            <NavigationMenuList className="gap-1">
              {navigation.map((item) => 
                item.children ? (
                  <NavigationMenuItem key={item.title}>
                    <NavigationMenuTrigger 
                      className={cn(
                        "h-9 px-4 text-sm font-medium transition-all hover:text-primary",
                        "data-[state=open]:text-primary data-[state=open]:bg-accent/50",
                        "active:scale-[0.98] touch-manipulation",
                        isActive(item.href) && "text-primary"
                      )}
                    >
                      <item.icon className="w-4 h-4 mr-2" />
                      {item.title}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                        {item.children.map((child) => (
                          <li key={child.title}>
                            <NavigationMenuLink asChild>
                              <Link
                                href={child.href}
                                className={cn(
                                  "block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-all",
                                  "hover:bg-accent/50 hover:text-accent-foreground focus:bg-accent/50 focus:text-accent-foreground",
                                  "active:scale-[0.98] touch-manipulation",
                                  isActive(child.href) && "bg-accent/50 text-accent-foreground"
                                )}
                              >
                                <div className="text-sm font-medium leading-none">{child.title}</div>
                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-1">
                                  {child.description}
                                </p>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ) : (
                  <NavigationMenuItem key={item.title}>
                    <Link href={item.href} legacyBehavior passHref>
                      <NavigationMenuLink
                        className={cn(
                          "h-9 px-4 text-sm font-medium transition-all hover:text-primary",
                          "data-[state=open]:text-primary data-[state=open]:bg-accent/50",
                          "active:scale-[0.98] touch-manipulation",
                          isActive(item.href) && "text-primary"
                        )}
                      >
                        <item.icon className="w-4 h-4 mr-2" />
                        {item.title}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                )
              )}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-2">
          <ThemeToggle />
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-9 w-9 rounded-lg hover:bg-accent/50 active:scale-[0.98] touch-manipulation"
            asChild
          >
            <Link href="/dashboard">
              <Icons.user className="h-5 w-5" />
              <span className="sr-only">Dashboard</span>
            </Link>
          </Button>
          <Button
            variant="ghost"
            className="ml-2 px-0 text-base hover:bg-transparent focus:ring-0 md:hidden active:scale-[0.98] touch-manipulation"
            onClick={() => document.dispatchEvent(new CustomEvent('toggle-mobile-nav'))}
          >
            <Icons.menu className="h-6 w-6" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </div>
      </div>

      {/* Breadcrumbs */}
      <div className="container py-2 px-4 md:px-6 text-sm text-muted-foreground">
        <Breadcrumbs />
      </div>
    </header>
  )
}