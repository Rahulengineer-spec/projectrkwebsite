'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, UserCog, BookOpen, GraduationCap } from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Courses', href: '/courses' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const roleBasedItems = [
    {
      name: 'Admin Panel',
      href: '/admin/dashboard',
      icon: UserCog,
      description: 'Access admin features'
    },
    {
      name: 'Instructor Portal',
      href: '/instructor/dashboard',
      icon: BookOpen,
      description: 'Manage courses and students'
    },
    {
      name: 'Student Dashboard',
      href: '/dashboard',
      icon: GraduationCap,
      description: 'View your courses and progress'
    }
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed top-0 z-50 w-full backdrop-blur-lg bg-white/95 dark:bg-gray-900/95 border-b border-gray-200/80 dark:border-gray-800 supports-[backdrop-filter]:bg-white/80 dark:supports-[backdrop-filter]:bg-gray-900/80">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              EduTech
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`nav-link ${
                  isActive(item.href)
                    ? 'text-primary dark:text-primary font-semibold'
                    : 'text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <div className="relative group">
              <button className="px-4 py-2 text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary">
                Access Portals
              </button>
              <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 hidden group-hover:block">
                {roleBasedItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <item.icon className="h-5 w-5 mr-2" />
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{item.description}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden rounded-lg p-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block px-3 py-2 rounded-lg text-base font-medium ${
                  isActive(item.href)
                    ? 'bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary'
                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
              <div className="px-3 text-sm font-medium text-gray-500 dark:text-gray-400">
                Access Portals
              </div>
              {roleBasedItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon className="h-5 w-5 mr-2" />
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{item.description}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation; 