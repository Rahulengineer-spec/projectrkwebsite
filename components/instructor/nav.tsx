'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  Users,
  BookOpen,
  Calendar,
  Settings,
  GraduationCap,
  ClipboardCheck,
  MessageSquare
} from "lucide-react";

const instructorNavItems = [
  {
    title: "Overview",
    href: "/instructor/dashboard",
    icon: BarChart3,
  },
  {
    title: "Student Management",
    href: "/instructor/dashboard/students",
    icon: Users,
  },
  {
    title: "Course Analytics",
    href: "/instructor/dashboard/analytics",
    icon: BarChart3,
  },
  {
    title: "Course Content",
    href: "/instructor/dashboard/content",
    icon: BookOpen,
  },
  {
    title: "Grading",
    href: "/instructor/dashboard/grading",
    icon: ClipboardCheck,
  },
  {
    title: "Office Hours",
    href: "/instructor/dashboard/office-hours",
    icon: Calendar,
  },
  {
    title: "Messages",
    href: "/instructor/messages",
    icon: MessageSquare,
  },
];

export function InstructorNav() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="w-64 min-h-screen bg-gray-50 dark:bg-gray-900 border-r dark:border-gray-800">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-6 text-gray-800 dark:text-gray-100">
          Instructor Portal
        </h2>
        <div className="space-y-1">
          {instructorNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                  isActive(item.href) &&
                    "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.title}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
} 