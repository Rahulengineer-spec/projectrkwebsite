'use client';

import { useState } from 'react';
import { CourseCard } from './Course/CourseCard';
import { LoadingSpinner } from './LoadingSpinner';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const SAMPLE_COURSES = [
  {
    id: '1',
    title: 'Complete Web Development Bootcamp',
    description: 'Learn full-stack web development from scratch. Master HTML, CSS, JavaScript, React, Node.js, and more.',
    instructor: 'Dr. Sarah Johnson',
    duration: '12 weeks',
    students: 15420,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop',
    price: 499.99,
  },
  {
    id: '2',
    title: 'Data Science and Machine Learning',
    description: 'Comprehensive course covering data analysis, visualization, machine learning algorithms, and AI applications.',
    instructor: 'Prof. Michael Chen',
    duration: '16 weeks',
    students: 12350,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
    price: 599.99,
  },
  {
    id: '3',
    title: 'UI/UX Design Masterclass',
    description: 'Master the art of user interface and experience design. Learn industry-standard tools and methodologies.',
    instructor: 'Emily Parker',
    duration: '8 weeks',
    students: 8750,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2064&auto=format&fit=crop',
    price: 399.99,
  },
];

export const CoursesSection = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourses = SAMPLE_COURSES.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="py-16 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-4xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
              Find Your Perfect Course
            </h2>
            <p className="text-lg text-foreground/90">
              Explore our most popular and highly-rated courses
            </p>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:flex-initial">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/70" />
              <Input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-[300px] pl-9 pr-4 py-2 h-11 rounded-full bg-card text-foreground placeholder:text-muted-foreground/70 border-input hover:border-primary/70 focus:border-primary ring-offset-background focus:ring-2 focus:ring-primary/20 focus:ring-offset-2 transition-all"
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              className="h-11 w-11 rounded-full border-input hover:bg-primary/10 hover:text-primary hover:border-primary/50"
            >
              <Filter className="w-5 h-5" />
              <span className="sr-only">Filter courses</span>
            </Button>
          </div>
        </div>

        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <CourseCard 
                key={course.id}
                id={course.id}
                title={course.title}
                description={course.description}
                image={course.image}
                price={course.price}
                slug={course.id.toString()}
              />
            ))}
          </div>
        )}

        {!isLoading && filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-foreground/90">
              No courses found matching your search criteria.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}; 