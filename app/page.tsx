import { Button } from "@/components/ui/button";
import { GraduationCap, Users, BookOpen, Award, ArrowRight } from "lucide-react";
import Link from "next/link";
import { CoursesSection } from "./components/CoursesSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 dark:from-background dark:to-background/90">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0 hero-gradient opacity-50 dark:opacity-30"></div>
        <div className="container relative px-4 md:px-6">
          <div className="flex flex-col items-center space-y-8 text-center">
            <div className="space-y-4 max-w-3xl">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient">
                Transform Your Future with EduTech Institute
              </h1>
              <p className="mx-auto max-w-[700px] text-lg text-muted-foreground md:text-xl dark:text-gray-200">
                Discover world-class education that combines innovation, technology, and excellence.
                Start your journey to success today.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="button-gradient text-white shadow-lg hover:shadow-xl transition-shadow">
                <Link href="/auth/register" className="flex items-center gap-2">
                  Get Started <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="bg-white/90 dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow dark:text-gray-200 dark:hover:bg-gray-700"
              >
                <Link href="/courses">Explore Courses</Link>
              </Button>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4 max-w-3xl">
              <div className="glass-card text-center dark:bg-gray-800/80">
                <p className="text-3xl font-bold text-primary dark:text-primary">50+</p>
                <p className="text-sm text-muted-foreground dark:text-gray-300">Expert Instructors</p>
              </div>
              <div className="glass-card text-center dark:bg-gray-800/80">
                <p className="text-3xl font-bold text-primary dark:text-primary">100+</p>
                <p className="text-sm text-muted-foreground dark:text-gray-300">Active Courses</p>
              </div>
              <div className="glass-card text-center dark:bg-gray-800/80">
                <p className="text-3xl font-bold text-primary dark:text-primary">10k+</p>
                <p className="text-sm text-muted-foreground dark:text-gray-300">Happy Students</p>
              </div>
              <div className="glass-card text-center dark:bg-gray-800/80">
                <p className="text-3xl font-bold text-primary dark:text-primary">95%</p>
                <p className="text-sm text-muted-foreground dark:text-gray-300">Success Rate</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50/50 dark:bg-gray-900/80 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-gray-900/5 dark:bg-grid-white/5 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div className="container relative px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Why Choose EduTech?
            </h2>
            <p className="mt-4 text-muted-foreground dark:text-gray-200">
              Experience education reimagined for the digital age
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="feature-card dark:bg-gray-800/80 dark:border dark:border-gray-700">
              <GraduationCap className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2 dark:text-gray-100">Expert Faculty</h3>
              <p className="text-muted-foreground dark:text-gray-300">
                Learn from industry leaders and experienced educators who bring real-world expertise
              </p>
            </div>
            <div className="feature-card dark:bg-gray-800/80 dark:border dark:border-gray-700">
              <Users className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2 dark:text-gray-100">Small Class Sizes</h3>
              <p className="text-muted-foreground dark:text-gray-300">
                Enjoy personalized attention and interactive learning experiences
              </p>
            </div>
            <div className="feature-card dark:bg-gray-800/80 dark:border dark:border-gray-700">
              <BookOpen className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2 dark:text-gray-100">Modern Curriculum</h3>
              <p className="text-muted-foreground dark:text-gray-300">
                Stay ahead with regularly updated, industry-aligned courses
              </p>
            </div>
            <div className="feature-card dark:bg-gray-800/80 dark:border dark:border-gray-700">
              <Award className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2 dark:text-gray-100">Recognized Certification</h3>
              <p className="text-muted-foreground dark:text-gray-300">
                Earn globally recognized certifications to boost your career
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <CoursesSection />

      {/* CTA Section */}
      <section className="relative py-24">
        <div className="container px-4 md:px-6">
          <div className="relative glass-card overflow-hidden dark:bg-gray-800/80 dark:border dark:border-gray-700">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 dark:from-primary/5 dark:to-accent/5"></div>
            <div className="relative flex flex-col items-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Ready to Transform Your Future?
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground dark:text-gray-200">
                Join thousands of successful students who have already taken the first step
                towards their dream career with EduTech Institute.
              </p>
              <Button size="lg" className="button-gradient text-white shadow-lg hover:shadow-xl transition-shadow">
                <Link href="/contact" className="flex items-center gap-2">
                  Get Started Today <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}