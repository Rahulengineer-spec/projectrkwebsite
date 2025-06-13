'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BookOpen,
  Clock,
  Users,
  Search,
  Star,
  ChevronRight,
  TrendingUp,
  Award,
} from "lucide-react";

interface CatalogCourse {
  id: string;
  title: string;
  instructor: string;
  rating: number;
  reviews: number;
  price: number;
  duration: string;
  students: number;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  thumbnail: string;
  featured?: boolean;
}

const catalogCourses: CatalogCourse[] = [
  {
    id: '1',
    title: 'Complete Web Development Bootcamp 2024',
    instructor: 'John Doe',
    rating: 4.8,
    reviews: 1250,
    price: 99.99,
    duration: '12 weeks',
    students: 12000,
    category: 'Programming',
    level: 'beginner',
    thumbnail: '/course-thumbnails/web-dev.jpg',
    featured: true,
  },
  {
    id: '2',
    title: 'Data Science & Machine Learning Masterclass',
    instructor: 'Jane Smith',
    rating: 4.9,
    reviews: 850,
    price: 149.99,
    duration: '16 weeks',
    students: 8500,
    category: 'Data Science',
    level: 'intermediate',
    thumbnail: '/course-thumbnails/data-science.jpg',
    featured: true,
  },
  // Add more courses as needed
];

const categories = [
  { id: 'programming', name: 'Programming', icon: '💻' },
  { id: 'data-science', name: 'Data Science', icon: '📊' },
  { id: 'design', name: 'Design', icon: '🎨' },
  { id: 'business', name: 'Business', icon: '💼' },
  { id: 'marketing', name: 'Marketing', icon: '📈' },
  { id: 'language', name: 'Language', icon: '🌍' },
];

export default function CourseCatalogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [levelFilter, setLevelFilter] = useState('all');

  const filteredCourses = catalogCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || course.category === categoryFilter;
    const matchesLevel = levelFilter === 'all' || course.level === levelFilter;
    return matchesSearch && matchesCategory && matchesLevel;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Course Catalog</h1>
        <p className="text-muted-foreground">
          Discover and enroll in new courses to enhance your skills
        </p>
      </div>

      {/* Featured Courses */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Featured Courses</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {catalogCourses.filter(course => course.featured).map((course) => (
            <Card key={course.id} className="overflow-hidden">
              <div className="aspect-video relative">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="object-cover w-full h-full"
                />
                <Badge className="absolute top-2 right-2">
                  Featured
                </Badge>
              </div>
              <CardHeader>
                <CardTitle className="line-clamp-2">{course.title}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Instructor: {course.instructor}
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <span className="ml-1">{course.rating}</span>
                    </div>
                    <span className="text-muted-foreground">
                      ({course.reviews} reviews)
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {course.duration}
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {course.students} students
                      </div>
                    </div>
                    <Badge variant="outline">{course.level}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold">${course.price}</span>
                    <Button>
                      Enroll Now
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Browse by Category</h2>
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
          {categories.map((category) => (
            <Card
              key={category.id}
              className="cursor-pointer hover:bg-accent transition-colors"
            >
              <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                <span className="text-3xl mb-2">{category.icon}</span>
                <h3 className="font-medium">{category.name}</h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* All Courses */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">All Courses</h2>
          <div className="flex gap-4">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={levelFilter} onValueChange={setLevelFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="overflow-hidden">
              <div className="aspect-video relative">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="object-cover w-full h-full"
                />
                <Badge variant="outline" className="absolute top-2 right-2">
                  {course.level}
                </Badge>
              </div>
              <CardHeader>
                <CardTitle className="line-clamp-2">{course.title}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Instructor: {course.instructor}
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <span className="ml-1">{course.rating}</span>
                    </div>
                    <span className="text-muted-foreground">
                      ({course.reviews} reviews)
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {course.duration}
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {course.students} students
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold">${course.price}</span>
                    <Button variant="outline">
                      View Details
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
} 