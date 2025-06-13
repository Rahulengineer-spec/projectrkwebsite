'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  BookOpen,
  Video,
  FileText,
  ClipboardList,
  BookMarked,
  Calendar,
  MessageSquare,
  Bell,
  User,
  HelpCircle,
  CreditCard,
  Award,
  Trophy,
  Settings,
  GraduationCap,
  Users,
  FileQuestion,
  BookOpenCheck,
  BookOpenIcon,
  Clock,
  BarChart3,
  MessageCircle,
  FileSpreadsheet,
  BookOpenText,
  BookOpenCheckIcon,
  BookOpenTextIcon,
  BookOpenIcon as BookOpenIcon2,
  BookOpenCheckIcon as BookOpenCheckIcon2,
  BookOpenTextIcon as BookOpenTextIcon2,
} from 'lucide-react';

const navigation = [
  {
    name: 'Overview',
    href: '/student',
    icon: LayoutDashboard,
  },
  {
    name: 'Courses',
    href: '/student/courses',
    icon: BookOpen,
    subItems: [
      { name: 'All Courses', href: '/student/courses' },
      { name: 'My Enrollments', href: '/student/courses/enrolled' },
      { name: 'Course Catalog', href: '/student/courses/catalog' },
    ],
  },
  {
    name: 'Live Classes',
    href: '/student/live-classes',
    icon: Video,
    subItems: [
      { name: 'Upcoming Sessions', href: '/student/live-classes/upcoming' },
      { name: 'Recordings', href: '/student/live-classes/recordings' },
      { name: 'Attendance', href: '/student/live-classes/attendance' },
    ],
  },
  {
    name: 'Assignments',
    href: '/student/assignments',
    icon: FileText,
    subItems: [
      { name: 'All Assignments', href: '/student/assignments' },
      { name: 'Pending', href: '/student/assignments/pending' },
      { name: 'Submitted', href: '/student/assignments/submitted' },
      { name: 'Graded', href: '/student/assignments/graded' },
    ],
  },
  {
    name: 'Exams',
    href: '/student/exams',
    icon: ClipboardList,
    subItems: [
      { name: 'Upcoming Exams', href: '/student/exams/upcoming' },
      { name: 'Past Results', href: '/student/exams/results' },
      { name: 'Practice Tests', href: '/student/exams/practice' },
    ],
  },
  {
    name: 'Study Materials',
    href: '/student/materials',
    icon: BookMarked,
    subItems: [
      { name: 'Notes', href: '/student/materials/notes' },
      { name: 'Videos', href: '/student/materials/videos' },
      { name: 'E-Books', href: '/student/materials/ebooks' },
    ],
  },
  {
    name: 'Progress',
    href: '/student/progress',
    icon: BarChart3,
    subItems: [
      { name: 'Overview', href: '/student/progress' },
      { name: 'Gradebook', href: '/student/progress/gradebook' },
      { name: 'Attendance', href: '/student/progress/attendance' },
      { name: 'Certificates', href: '/student/progress/certificates' },
    ],
  },
  {
    name: 'Calendar',
    href: '/student/calendar',
    icon: Calendar,
  },
  {
    name: 'Discussion',
    href: '/student/discussion',
    icon: MessageSquare,
    subItems: [
      { name: 'Forums', href: '/student/discussion/forums' },
      { name: 'Ask Doubts', href: '/student/discussion/ask' },
      { name: 'Q&A', href: '/student/discussion/qa' },
    ],
  },
  {
    name: 'Messages',
    href: '/student/messages',
    icon: MessageCircle,
  },
  {
    name: 'Notifications',
    href: '/student/notifications',
    icon: Bell,
  },
  {
    name: 'Profile',
    href: '/student/profile',
    icon: User,
  },
  {
    name: 'Help',
    href: '/student/help',
    icon: HelpCircle,
  },
  {
    name: 'Billing',
    href: '/student/billing',
    icon: CreditCard,
  },
  {
    name: 'Certificates',
    href: '/student/certificates',
    icon: Award,
  },
  {
    name: 'Leaderboard',
    href: '/student/leaderboard',
    icon: Trophy,
  },
];

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleItem = (name: string) => {
    setExpandedItems(prev =>
      prev.includes(name)
        ? prev.filter(item => item !== name)
        : [...prev, name]
    );
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
        <div className="p-4">
          <h2 className="text-xl font-bold text-gray-800">Student Portal</h2>
        </div>
        <nav className="mt-4">
          {navigation.map((item) => (
            <div key={item.name}>
              <Link
                href={item.href}
                className={cn(
                  'flex items-center px-4 py-2 text-sm font-medium',
                  pathname === item.href
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                )}
                onClick={() => item.subItems && toggleItem(item.name)}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
                {item.subItems && (
                  <svg
                    className={cn(
                      'ml-auto w-4 h-4 transition-transform',
                      expandedItems.includes(item.name) ? 'rotate-180' : ''
                    )}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                )}
              </Link>
              {item.subItems && expandedItems.includes(item.name) && (
                <div className="pl-12">
                  {item.subItems.map((subItem) => (
                    <Link
                      key={subItem.name}
                      href={subItem.href}
                      className={cn(
                        'block py-2 text-sm',
                        pathname === subItem.href
                          ? 'text-blue-600'
                          : 'text-gray-600 hover:text-gray-900'
                      )}
                    >
                      {subItem.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
} 