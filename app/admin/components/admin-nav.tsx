'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  Calendar,
  DollarSign,
  FileText,
  Settings,
  Bell,
  BarChart3,
  ClipboardCheck,
  MessageSquare,
  UserPlus,
  BookMarked,
  Clock,
  Award,
  Building2,
  Library,
  FileSpreadsheet,
  Mail,
  HelpCircle,
} from "lucide-react";

const adminNavItems = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Student Management",
    href: "/admin/students",
    icon: Users,
    subItems: [
      {
        title: "All Students",
        href: "/admin/students",
      },
      {
        title: "Add New Student",
        href: "/admin/students/add",
      },
      {
        title: "Student Documents",
        href: "/admin/students/documents",
      },
      {
        title: "Student Attendance",
        href: "/admin/students/attendance",
      },
    ],
  },
  {
    title: "Instructor Management",
    href: "/admin/instructors",
    icon: GraduationCap,
    subItems: [
      {
        title: "All Instructors",
        href: "/admin/instructors",
      },
      {
        title: "Add New Instructor",
        href: "/admin/instructors/add",
      },
      {
        title: "Instructor Schedule",
        href: "/admin/instructors/schedule",
      },
      {
        title: "Performance Review",
        href: "/admin/instructors/performance",
      },
    ],
  },
  {
    title: "Course Management",
    href: "/admin/courses",
    icon: BookOpen,
    subItems: [
      {
        title: "All Courses",
        href: "/admin/courses",
      },
      {
        title: "Add New Course",
        href: "/admin/courses/add",
      },
      {
        title: "Course Materials",
        href: "/admin/courses/materials",
      },
      {
        title: "Course Schedule",
        href: "/admin/courses/schedule",
      },
    ],
  },
  {
    title: "Batch Management",
    href: "/admin/batches",
    icon: Building2,
    subItems: [
      {
        title: "All Batches",
        href: "/admin/batches",
      },
      {
        title: "Create New Batch",
        href: "/admin/batches/create",
      },
      {
        title: "Batch Schedule",
        href: "/admin/batches/schedule",
      },
      {
        title: "Batch Performance",
        href: "/admin/batches/performance",
      },
    ],
  },
  {
    title: "Fees & Payments",
    href: "/admin/fees",
    icon: DollarSign,
    subItems: [
      {
        title: "Fee Structure",
        href: "/admin/fees/structure",
      },
      {
        title: "Payment Records",
        href: "/admin/fees/payments",
      },
      {
        title: "Due Payments",
        href: "/admin/fees/due",
      },
      {
        title: "Payment Reports",
        href: "/admin/fees/reports",
      },
    ],
  },
  {
    title: "Attendance",
    href: "/admin/attendance",
    icon: ClipboardCheck,
    subItems: [
      {
        title: "Mark Attendance",
        href: "/admin/attendance/mark",
      },
      {
        title: "Attendance Reports",
        href: "/admin/attendance/reports",
      },
      {
        title: "Absent Notifications",
        href: "/admin/attendance/notifications",
      },
    ],
  },
  {
    title: "Examinations",
    href: "/admin/exams",
    icon: FileText,
    subItems: [
      {
        title: "Schedule Exams",
        href: "/admin/exams/schedule",
      },
      {
        title: "Results",
        href: "/admin/exams/results",
      },
      {
        title: "Grade Reports",
        href: "/admin/exams/grades",
      },
    ],
  },
  {
    title: "Reports & Analytics",
    href: "/admin/reports",
    icon: BarChart3,
    subItems: [
      {
        title: "Student Reports",
        href: "/admin/reports/students",
      },
      {
        title: "Financial Reports",
        href: "/admin/reports/financial",
      },
      {
        title: "Performance Analytics",
        href: "/admin/reports/performance",
      },
      {
        title: "Custom Reports",
        href: "/admin/reports/custom",
      },
    ],
  },
  {
    title: "Communications",
    href: "/admin/communications",
    icon: MessageSquare,
    subItems: [
      {
        title: "Announcements",
        href: "/admin/communications/announcements",
      },
      {
        title: "Messages",
        href: "/admin/communications/messages",
      },
      {
        title: "Email Templates",
        href: "/admin/communications/templates",
      },
    ],
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
    subItems: [
      {
        title: "General Settings",
        href: "/admin/settings/general",
      },
      {
        title: "User Roles",
        href: "/admin/settings/roles",
      },
      {
        title: "System Configuration",
        href: "/admin/settings/system",
      },
    ],
  },
];

export function AdminNav() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;
  const isSubItemActive = (path: string) => pathname.startsWith(path);

  return (
    <nav className="w-64 min-h-screen bg-gray-50 dark:bg-gray-900 border-r dark:border-gray-800">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-6 text-gray-800 dark:text-gray-100">
          Admin Portal
        </h2>
        <div className="space-y-1">
          {adminNavItems.map((item) => {
            const Icon = item.icon;
            const isItemActive = isActive(item.href) || isSubItemActive(item.href);

            return (
              <div key={item.href} className="space-y-1">
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                    isItemActive &&
                      "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.title}
                </Link>
                {item.subItems && isItemActive && (
                  <div className="ml-6 space-y-1">
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        className={cn(
                          "flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50",
                          isActive(subItem.href) &&
                            "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
                        )}
                      >
                        {subItem.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </nav>
  );
} 