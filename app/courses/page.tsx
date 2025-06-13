"use client"

import { useState, useMemo, useEffect, useCallback } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"
import { 
  Clock, 
  Users, 
  BookOpen, 
  Star, 
  GraduationCap, 
  Filter, 
  ChevronDown, 
  X, 
  ShoppingCart, 
  Eye, 
  Check, 
  CheckCircle2, 
  LayoutGrid, 
  List, 
  Search 
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import Script from 'next/script'
import { Icons } from "@/components/icons"
import { debounce } from "lodash"

interface Course {
  id: string
  title: string
  description: string
  category: string
  subcategory: string
  duration: string
  level: "Beginner" | "Intermediate" | "Advanced"
  rating: number
  students: number
  instructor: string
  price: number
  originalPrice?: number
  image: string
  syllabus: string[]
  prerequisites: string[]
  language: string
  lastUpdated: string
  lectures: number
  totalHours: number
  certificate: boolean
  bestSeller: boolean
  previewVideo?: string
  whatYouWillLearn: string[]
  requirements: string[]
  targetAudience: string[]
}

// Add metadata for SEO
export const metadata = {
  title: 'Browse Courses | RK Institution',
  description: 'Explore our wide range of courses in development, data science, mathematics, and more.',
};

// Add loading state for course cards
function CourseCardSkeleton() {
  return (
    <Card className="h-full animate-pulse">
      <CardHeader>
        <div className="h-48 bg-gray-200 rounded-md"></div>
        <div className="h-6 w-3/4 bg-gray-200 rounded mt-4"></div>
        <div className="h-4 w-1/2 bg-gray-200 rounded mt-2"></div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="h-10 w-full bg-gray-200 rounded"></div>
      </CardFooter>
    </Card>
  );
}

export default function CoursesPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLevel, setSelectedLevel] = useState("all")
  const [priceRange, setPriceRange] = useState([0, 200])
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState("popular")
  const [cart, setCart] = useState<Course[]>([])
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [showPreview, setShowPreview] = useState(false)
  const [purchaseStep, setPurchaseStep] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const [courses] = useState<Course[]>([
    {
      id: "cs101",
      title: "Complete Python Bootcamp: From Zero to Hero",
      description: "Learn Python like a Professional! Start from the basics and go all the way to creating your own applications and games!",
      category: "Development",
      subcategory: "Programming Languages",
      duration: "12 weeks",
      level: "Beginner",
      rating: 4.8,
      students: 2500,
      instructor: "Dr. Sarah Johnson",
      price: 99.99,
      originalPrice: 199.99,
      image: "/courses/cs101.jpg",
      syllabus: [
        "Python Basics",
        "Object-Oriented Programming",
        "Data Structures",
        "Web Development",
        "Game Development",
        "Data Science"
      ],
      prerequisites: ["Basic Mathematics", "No prior programming experience required"],
      language: "English",
      lastUpdated: "2024-03-15",
      lectures: 45,
      totalHours: 24,
      certificate: true,
      bestSeller: true,
      previewVideo: "https://example.com/preview.mp4",
      whatYouWillLearn: [
        "Master Python programming fundamentals",
        "Build real-world applications",
        "Create games using Python",
        "Work with databases and APIs",
        "Develop web applications"
      ],
      requirements: [
        "Basic computer knowledge",
        "No prior programming experience needed",
        "A computer with internet access"
      ],
      targetAudience: [
        "Beginners who want to learn programming",
        "Students looking to start a career in tech",
        "Professionals wanting to add Python to their skillset"
      ]
    },
    {
      id: "ml101",
      title: "Machine Learning A-Z: Hands-On Python & R In Data Science",
      description: "Learn to create Machine Learning Algorithms in Python and R from two Data Science experts. Code templates included.",
      category: "Data Science",
      subcategory: "Machine Learning",
      duration: "15 weeks",
      level: "Intermediate",
      rating: 4.9,
      students: 3000,
      instructor: "Dr. David Kim",
      price: 149.99,
      originalPrice: 249.99,
      image: "/courses/ml101.jpg",
      syllabus: [
        "Data Preprocessing",
        "Regression",
        "Classification",
        "Clustering",
        "Deep Learning",
        "Natural Language Processing"
      ],
      prerequisites: ["Python Programming", "Linear Algebra", "Probability"],
      language: "English",
      lastUpdated: "2024-02-20",
      lectures: 60,
      totalHours: 40,
      certificate: true,
      bestSeller: true,
      whatYouWillLearn: [
        "Master machine learning algorithms",
        "Build predictive models",
        "Work with real-world datasets",
        "Implement deep learning solutions",
        "Deploy ML models in production"
      ],
      requirements: [
        "Basic Python programming knowledge",
        "Understanding of statistics",
        "Familiarity with linear algebra",
        "A computer with Python installed"
      ],
      targetAudience: [
        "Data scientists",
        "Software engineers",
        "Analysts",
        "Students interested in ML"
      ]
    },
    {
      id: "math101",
      title: "Class 10 Mathematics - Complete Course",
      description: "Master Class 10 Mathematics with comprehensive coverage of all topics including Algebra, Geometry, Trigonometry, and Statistics.",
      category: "Mathematics",
      subcategory: "Class 10",
      duration: "12 weeks",
      level: "Beginner",
      rating: 4.8,
      students: 4500,
      instructor: "Prof. Rajesh Kumar",
      price: 99.99,
      originalPrice: 199.99,
      image: "/courses/math101.jpg",
      syllabus: [
        "Real Numbers",
        "Polynomials",
        "Pair of Linear Equations",
        "Quadratic Equations",
        "Arithmetic Progressions",
        "Triangles",
        "Coordinate Geometry",
        "Trigonometry",
        "Mensuration",
        "Statistics and Probability"
      ],
      prerequisites: ["Class 9 Mathematics"],
      language: "English",
      lastUpdated: "2024-03-01",
      lectures: 50,
      totalHours: 60,
      certificate: true,
      bestSeller: true,
      whatYouWillLearn: [
        "Solve complex mathematical problems",
        "Understand mathematical concepts thoroughly",
        "Apply mathematical knowledge to real-world situations",
        "Develop problem-solving skills",
        "Prepare for board examinations"
      ],
      requirements: [
        "Basic knowledge of Class 9 Mathematics",
        "Scientific calculator",
        "Notebook for practice"
      ],
      targetAudience: [
        "Class 10 students",
        "Students preparing for board exams",
        "Anyone interested in learning mathematics"
      ]
    },
    {
      id: "science101",
      title: "Class 10 Science - Physics, Chemistry & Biology",
      description: "Comprehensive course covering all three branches of Science for Class 10 students with practical demonstrations and experiments.",
      category: "Science",
      subcategory: "Class 10",
      duration: "15 weeks",
      level: "Beginner",
      rating: 4.7,
      students: 3800,
      instructor: "Dr. Priya Sharma",
      price: 129.99,
      originalPrice: 249.99,
      image: "/courses/science101.jpg",
      syllabus: [
        "Chemical Reactions and Equations",
        "Acids, Bases and Salts",
        "Metals and Non-metals",
        "Carbon and its Compounds",
        "Life Processes",
        "Control and Coordination",
        "Light - Reflection and Refraction",
        "Human Eye and Colorful World",
        "Electricity",
        "Magnetic Effects of Electric Current"
      ],
      prerequisites: ["Class 9 Science"],
      language: "English",
      lastUpdated: "2024-02-15",
      lectures: 60,
      totalHours: 75,
      certificate: true,
      bestSeller: true,
      whatYouWillLearn: [
        "Understand scientific concepts through experiments",
        "Learn practical applications of scientific principles",
        "Develop scientific thinking and reasoning",
        "Master problem-solving in Physics, Chemistry, and Biology",
        "Prepare for practical examinations"
      ],
      requirements: [
        "Basic knowledge of Class 9 Science",
        "Access to basic laboratory equipment",
        "Notebook for recording observations"
      ],
      targetAudience: [
        "Class 10 students",
        "Science enthusiasts",
        "Students preparing for competitive exams"
      ]
    },
    {
      id: "english101",
      title: "Class 10 English - Language & Literature",
      description: "Master English language skills and literature analysis for Class 10 with comprehensive grammar, writing, and reading comprehension modules.",
      category: "English",
      subcategory: "Class 10",
      duration: "10 weeks",
      level: "Beginner",
      rating: 4.6,
      students: 3200,
      instructor: "Ms. Ananya Singh",
      price: 89.99,
      originalPrice: 179.99,
      image: "/courses/english101.jpg",
      syllabus: [
        "Reading Comprehension",
        "Writing Skills",
        "Grammar and Vocabulary",
        "Literature Analysis",
        "Speaking and Listening Skills",
        "Creative Writing",
        "Letter and Essay Writing",
        "Story and Poetry Analysis"
      ],
      prerequisites: ["Basic English knowledge"],
      language: "English",
      lastUpdated: "2024-03-10",
      lectures: 40,
      totalHours: 50,
      certificate: true,
      bestSeller: true,
      whatYouWillLearn: [
        "Improve reading and writing skills",
        "Master English grammar",
        "Develop creative writing abilities",
        "Enhance communication skills",
        "Analyze literature effectively"
      ],
      requirements: [
        "Basic understanding of English",
        "Access to study materials",
        "Regular practice time"
      ],
      targetAudience: [
        "Class 10 students",
        "English language learners",
        "Students preparing for language exams"
      ]
    },
    {
      id: "math201",
      title: "Class 12 Mathematics - Advanced Course",
      description: "Advanced mathematics course for Class 12 students covering Calculus, Algebra, and Vectors with detailed problem-solving techniques.",
      category: "Mathematics",
      subcategory: "Class 12",
      duration: "16 weeks",
      level: "Intermediate",
      rating: 4.9,
      students: 2800,
      instructor: "Prof. Amit Verma",
      price: 149.99,
      originalPrice: 299.99,
      image: "/courses/math201.jpg",
      syllabus: [
        "Relations and Functions",
        "Inverse Trigonometric Functions",
        "Matrices",
        "Determinants",
        "Continuity and Differentiability",
        "Applications of Derivatives",
        "Integrals",
        "Applications of Integrals",
        "Differential Equations",
        "Vector Algebra",
        "Three Dimensional Geometry",
        "Probability"
      ],
      prerequisites: ["Class 11 Mathematics"],
      language: "English",
      lastUpdated: "2024-02-20",
      lectures: 65,
      totalHours: 80,
      certificate: true,
      bestSeller: true,
      whatYouWillLearn: [
        "Master advanced mathematical concepts",
        "Solve complex calculus problems",
        "Understand vector algebra applications",
        "Develop analytical thinking",
        "Prepare for competitive exams"
      ],
      requirements: [
        "Strong foundation in Class 11 Mathematics",
        "Scientific calculator",
        "Graph paper and mathematical tools"
      ],
      targetAudience: [
        "Class 12 students",
        "Engineering aspirants",
        "Students preparing for competitive exams"
      ]
    },
    // Add more courses here...
  ])

  const categories = [
    { id: "all", name: "All Categories" },
    { id: "development", name: "Development" },
    { id: "business", name: "Business" },
    { id: "design", name: "Design" },
    { id: "marketing", name: "Marketing" },
    { id: "data-science", name: "Data Science" },
  ]

  const levels = [
    { id: "all", name: "All Levels" },
    { id: "beginner", name: "Beginner" },
    { id: "intermediate", name: "Intermediate" },
    { id: "advanced", name: "Advanced" },
  ]

  const sortOptions = [
    { id: "popular", name: "Most Popular" },
    { id: "newest", name: "Newest" },
    { id: "highest-rated", name: "Highest Rated" },
    { id: "price-low", name: "Price: Low to High" },
    { id: "price-high", name: "Price: High to Low" },
  ]

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Enhanced filtering logic
  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
      const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
      const matchesPrice = course.price >= priceRange[0] && course.price <= priceRange[1];
      const matchesTags = selectedTags.length === 0 || 
                         selectedTags.every(tag => course.syllabus.includes(tag));

      return matchesSearch && matchesCategory && matchesLevel && matchesPrice && matchesTags;
    });
  }, [courses, searchQuery, selectedCategory, selectedLevel, priceRange, selectedTags]);

  // Enhanced sorting logic
  const sortedCourses = useMemo(() => {
    return [...filteredCourses].sort((a, b) => {
      switch (sortBy) {
        case 'popular':
          return b.students - a.students;
        case 'rating':
          return b.rating - a.rating;
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'newest':
          return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
        default:
          return 0;
      }
    });
  }, [filteredCourses, sortBy]);

  // Enhanced search with debounce
  const debouncedSearch = useCallback(
    debounce((value: string) => setSearchQuery(value), 300),
    []
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  // Enhanced filter panel
  const FilterPanel = () => (
    <div className="space-y-6 p-6 bg-card rounded-lg border">
      <div>
        <h3 className="font-semibold mb-4">Categories</h3>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {Array.from(new Set(courses.map(c => c.category))).map(category => (
              <SelectItem key={category} value={category}>{category}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <h3 className="font-semibold mb-4">Level</h3>
        <Select value={selectedLevel} onValueChange={setSelectedLevel}>
          <SelectTrigger>
            <SelectValue placeholder="Select level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Levels</SelectItem>
            <SelectItem value="Beginner">Beginner</SelectItem>
            <SelectItem value="Intermediate">Intermediate</SelectItem>
            <SelectItem value="Advanced">Advanced</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <h3 className="font-semibold mb-4">Price Range</h3>
        <div className="space-y-4">
          <Slider
            value={priceRange}
            min={0}
            max={500}
            step={10}
            onValueChange={setPriceRange}
            className="w-full"
          />
          <div className="flex justify-between text-sm">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-4">Topics</h3>
        <div className="space-y-2">
          {Array.from(new Set(courses.flatMap(c => c.syllabus))).map(topic => (
            <div key={topic} className="flex items-center">
              <Checkbox
                id={topic}
                checked={selectedTags.includes(topic)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedTags([...selectedTags, topic]);
                  } else {
                    setSelectedTags(selectedTags.filter(t => t !== topic));
                  }
                }}
              />
              <label htmlFor={topic} className="ml-2 text-sm">
                {topic}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Enhanced course card with responsive design
  const CourseCard = ({ course }: { course: Course }) => (
    <Card className={cn(
      "h-full transition-all hover:shadow-lg",
      viewMode === 'list' ? 'flex flex-row' : 'flex flex-col'
    )}>
      <div className={cn(
        "relative",
        viewMode === 'list' ? 'w-1/3' : 'w-full'
      )}>
        <img
          src={course.image}
          alt={course.title}
          className="object-cover w-full h-48 rounded-t-lg"
          loading="lazy"
        />
        {course.bestSeller && (
          <Badge className="absolute top-2 right-2 bg-yellow-400 text-yellow-900">
            Bestseller
          </Badge>
        )}
      </div>

      <div className="flex-1">
        <CardHeader>
          <CardTitle className="line-clamp-2">{course.title}</CardTitle>
          <CardDescription className="line-clamp-2">
            {course.description}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm">
              <Star className="w-4 h-4 text-yellow-400" />
              <span>{course.rating.toFixed(1)}</span>
              <span>({course.students} students)</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Clock className="w-4 h-4" />
              <span>{course.duration}</span>
              <GraduationCap className="w-4 h-4 ml-2" />
              <span>{course.level}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold">${course.price}</span>
              {course.originalPrice && (
                <span className="text-sm line-through text-muted-foreground">
                  ${course.originalPrice}
                </span>
              )}
            </div>
          </div>
        </CardContent>

        <CardFooter className="space-x-2">
          <Button
            onClick={() => handleAddToCart(course)}
            disabled={cart.some(c => c.id === course.id)}
            className="flex-1"
          >
            {cart.some(c => c.id === course.id) ? (
              <>
                <CheckCircle2 className="w-4 h-4 mr-2" />
                In Cart
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </>
            )}
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setSelectedCourse(course);
              setShowPreview(true);
            }}
          >
            <Eye className="w-4 h-4" />
          </Button>
        </CardFooter>
      </div>
    </Card>
  );

  const handleAddToCart = (course: Course) => {
    if (!cart.find(item => item.id === course.id)) {
      setCart([...cart, course])
      toast({
        title: "Course added to cart",
        description: `${course.title} has been added to your cart.`,
      })
    } else {
      toast({
        title: "Course already in cart",
        description: `${course.title} is already in your cart.`,
        variant: "destructive",
      })
    }
  }

  const handleRemoveFromCart = (courseId: string) => {
    const course = cart.find(item => item.id === courseId)
    setCart(cart.filter(item => item.id !== courseId))
    if (course) {
      toast({
        title: "Course removed",
        description: `${course.title} has been removed from your cart.`,
      })
    }
  }

  const totalPrice = cart.reduce((sum, course) => sum + course.price, 0)

  const handlePurchase = () => {
    setPurchaseStep(1)
    toast({
      title: "Proceeding to checkout",
      description: "Please enter your payment information to complete the purchase.",
    })
  }

  const handlePaymentComplete = () => {
    setPurchaseStep(2)
    setCart([])
    toast({
      title: "Purchase Complete",
      description: "You have successfully purchased the course. You can now access it in your dashboard.",
      variant: "default",
    })
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": courses.map((course, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Course",
        "name": course.title,
        "description": course.description,
        "provider": {
          "@type": "Organization",
          "name": "EduLearn",
          "sameAs": "https://edulearn.com"
        },
        "offers": {
          "@type": "Offer",
          "price": course.price,
          "priceCurrency": "USD"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": course.rating,
          "ratingCount": course.students
        }
      }
    }))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Script
        id="courses-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-4xl font-bold mb-4 md:mb-0">Browse Courses</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search courses..."
              className="pl-10 w-[300px]"
              onChange={handleSearch}
            />
          </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
            className="md:hidden"
            >
            <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters - Desktop */}
        <div className="hidden md:block w-64 flex-shrink-0">
          <FilterPanel />
                  </div>

        {/* Filters - Mobile */}
        <Dialog open={showFilters} onOpenChange={setShowFilters}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Filter Courses</DialogTitle>
            </DialogHeader>
            <FilterPanel />
          </DialogContent>
        </Dialog>

        {/* Course List */}
        <div className="flex-1">
          {/* Sort and View Controls */}
          <div className="flex justify-between items-center mb-6">
              <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                </SelectContent>
              </Select>

            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('grid')}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

        {/* Course Grid */}
          {isLoading ? (
            <div className={cn(
              "grid gap-6",
              viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'
            )}>
              {Array(6).fill(0).map((_, i) => (
                <CourseCardSkeleton key={i} />
              ))}
              </div>
          ) : (
            <>
              {sortedCourses.length === 0 ? (
                <div className="text-center py-12">
                  <Search className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-semibold">No courses found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search or filter criteria
                  </p>
                </div>
              ) : (
                <div className={cn(
                  "grid gap-6",
                  viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'
                )}>
                  {sortedCourses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                  </div>
              )}
            </>
          )}
                  </div>
                  </div>

      {/* Course Preview Dialog */}
      {selectedCourse && (
        <Dialog open={showPreview} onOpenChange={setShowPreview}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>{selectedCourse.title}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4">
              {selectedCourse.previewVideo && (
                <div className="aspect-video">
                  <iframe
                    src={selectedCourse.previewVideo}
                    className="w-full h-full"
                    allowFullScreen
                  />
                </div>
              )}
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">What you&apos;ll learn</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {selectedCourse.whatYouWillLearn.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Prerequisites</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {selectedCourse.prerequisites.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
                  <Button
                    onClick={() => {
                    handleAddToCart(selectedCourse);
                    setShowPreview(false);
                  }}
                  disabled={cart.some(c => c.id === selectedCourse.id)}
                  className="w-full"
                >
                  {cart.some(c => c.id === selectedCourse.id) ? (
                    'In Cart'
                  ) : (
                    'Add to Cart'
                  )}
                  </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Shopping Cart */}
      <Dialog open={purchaseStep > 0} onOpenChange={() => setPurchaseStep(0)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {purchaseStep === 1 ? 'Your Cart' : 'Complete Purchase'}
            </DialogTitle>
          </DialogHeader>
          {purchaseStep === 1 ? (
            <div className="space-y-4">
              {cart.map((course) => (
                <div key={course.id} className="flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold">{course.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      ${course.price}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveFromCart(course.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <div className="pt-4 border-t">
                <div className="flex justify-between font-semibold">
                  <span>Total:</span>
                  <span>
                    ${cart.reduce((sum, course) => sum + course.price, 0).toFixed(2)}
                  </span>
                </div>
        </div>
              <Button
                onClick={() => setPurchaseStep(2)}
                className="w-full"
                disabled={cart.length === 0}
              >
                Proceed to Checkout
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-center">
                <Icons.spinner className="mx-auto h-8 w-8 animate-spin" />
                <p className="mt-2">Processing your purchase...</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}