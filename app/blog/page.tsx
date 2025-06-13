"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Icons } from "@/components/icons"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

// Move metadata to separate file since we can't use metadata in client components

// Mock data - Replace with actual data from your CMS or API
const featuredPost = {
    id: 1,
  title: "The Future of Online Learning: AI and Personalized Education",
  excerpt: "Discover how artificial intelligence is revolutionizing online education and creating personalized learning experiences for students worldwide.",
  coverImage: "/images/blog/featured-post.jpg",
  date: "2024-03-20",
  author: {
    name: "Dr. Sarah Johnson",
    avatar: "/images/authors/sarah-johnson.jpg",
    role: "Education Technology Expert"
  },
  category: "Education Technology",
  readTime: "8 min read"
}

const recentPosts = [
  {
    id: 2,
    title: "10 Essential Study Techniques for Online Learning Success",
    excerpt: "Master these proven study techniques to excel in your online courses and achieve better academic results.",
    coverImage: "/images/blog/study-techniques.jpg",
    date: "2024-03-18",
    category: "Study Tips",
    readTime: "6 min read"
  },
  {
    id: 3,
    title: "The Impact of AI in Modern Education",
    excerpt: "Explore how artificial intelligence is transforming the educational landscape and enhancing learning experiences.",
    coverImage: "/images/blog/ai-education.jpg",
    date: "2024-03-15",
    category: "Education Technology",
    readTime: "7 min read"
  },
  {
    id: 4,
    title: "Building a Successful Career in Tech",
    excerpt: "Learn the essential skills and strategies needed to thrive in the ever-evolving technology industry.",
    coverImage: "/images/blog/tech-career.jpg",
    date: "2024-03-12",
    category: "Career Development",
    readTime: "5 min read"
  }
]

const categories = [
  "All Posts",
  "Education Technology",
  "Study Tips",
  "Career Development",
  "Student Life",
  "Industry Insights"
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Posts")
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 6
  const [mounted, setMounted] = useState(false)

  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  const filteredPosts = recentPosts.filter(post => {
    const matchesCategory = selectedCategory === "All Posts" || post.category === selectedCategory
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  )

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    setCurrentPage(1)
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setCurrentPage(1)
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-primary/5 via-background to-background">
        <div className="container relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto text-center"
          >
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6 bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
              Insights & Resources for Modern Learners
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Discover the latest trends, tips, and insights in online education and professional development.
            </p>
            <div className="flex items-center max-w-md mx-auto">
              <div className="relative flex-1">
              <Input
                placeholder="Search articles..."
                  className="rounded-l-full h-12 pl-12 pr-4 w-full focus-ring"
                value={searchQuery}
                  onChange={handleSearch}
              />
                <Icons.search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              </div>
              <Button className="rounded-r-full h-12 px-8 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary transition-all duration-300">
                Search
              </Button>
            </div>
          </motion.div>
          </div>
        <div className="absolute inset-0 bg-grid-primary/5 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      </section>

      {/* Categories */}
      <section className="py-8 border-b">
        <div className="container">
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-wrap gap-3 justify-center"
          >
            {categories.map((category) => (
              <motion.div key={category} variants={item}>
              <Button
                  variant={category === selectedCategory ? "default" : "outline"}
                className={cn(
                    "rounded-full transition-all duration-300",
                    category === selectedCategory && "bg-gradient-to-r from-primary to-primary/90"
                )}
                  onClick={() => handleCategoryChange(category)}
              >
                {category}
              </Button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold mb-8 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Featured Article
            </h2>
            <Card gradient hover className="overflow-hidden">
              <div className="grid md:grid-cols-2 gap-8 p-6">
                <div className="relative aspect-[16/9] rounded-2xl overflow-hidden">
                  <Image
                    src={featuredPost.coverImage}
                    alt={featuredPost.title}
                    fill
                    className="object-cover transition-transform hover:scale-105 duration-300"
                    priority
                  />
                </div>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                      {featuredPost.category}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{featuredPost.readTime}</span>
                  </div>
                  <h3 className="text-3xl font-bold leading-tight hover:text-primary transition-colors">
                    {featuredPost.title}
                  </h3>
                  <p className="text-lg text-muted-foreground">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center gap-4">
                    <Image
                      src={featuredPost.author.avatar}
                      alt={featuredPost.author.name}
                      width={40}
                      height={40}
                      className="rounded-full ring-2 ring-primary/20"
                    />
                    <div>
                      <p className="font-medium">{featuredPost.author.name}</p>
                      <p className="text-sm text-muted-foreground">{featuredPost.author.role}</p>
                    </div>
                  </div>
                  <Button className="rounded-full group" size="lg">
                    Read Article
                    <Icons.arrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Recent Posts Grid */}
      <section className="py-16 bg-muted/30 dark:bg-muted/5">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Recent Articles
            </h2>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                className="rounded-full hover:bg-primary/10"
              >
                {theme === "light" ? (
                  <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                ) : (
                  <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                )}
                <span className="sr-only">Toggle theme</span>
              </Button>
          </div>
        </div>

          {filteredPosts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <Icons.search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No articles found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter to find what you&apos;re looking for.
              </p>
            </motion.div>
          ) : (
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
            >
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {paginatedPosts.map((post) => (
                  <motion.div key={post.id} variants={item}>
                    <Card hover className="h-full">
                      <Link href={`/blog/${post.id}`}>
                        <div className="relative aspect-[16/9] rounded-t-lg overflow-hidden">
                          <Image
                            src={post.coverImage}
                  alt={post.title}
                            fill
                            className="object-cover transition-transform group-hover:scale-105"
                          />
                        </div>
                        <div className="p-6">
                          <div className="flex items-center gap-4 mb-4">
                            <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                              {post.category}
                            </Badge>
                            <span className="text-sm text-muted-foreground">{post.readTime}</span>
                          </div>
                          <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                            {post.title}
                          </h3>
                          <p className="text-muted-foreground line-clamp-3">
                            {post.excerpt}
                          </p>
                        </div>
                      </Link>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex justify-center mt-12 gap-2"
                >
                <Button
                  variant="outline"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="rounded-full"
                  >
                    <Icons.arrowLeft className="h-4 w-4 mr-2" />
                    Previous
                  </Button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      onClick={() => handlePageChange(page)}
                      className={cn(
                        "rounded-full w-10 h-10 p-0",
                        currentPage === page && "bg-gradient-to-r from-primary to-primary/90"
                      )}
                    >
                      {page}
                </Button>
                  ))}
                  <Button
                    variant="outline"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="rounded-full"
                  >
                    Next
                    <Icons.arrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </motion.div>
              )}
            </motion.div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-b from-background to-primary/5">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Stay Updated
            </h2>
            <p className="text-muted-foreground mb-8">
              Get our latest articles, resources, and updates delivered to your inbox.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input 
                placeholder="Enter your email" 
                type="email"
                className="rounded-full h-12 focus-ring"
                required
              />
              <Button type="submit" className="rounded-full h-12 px-8 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary transition-all duration-300">
                Subscribe
              </Button>
          </form>
          </motion.div>
        </div>
      </section>
    </div>
  )
}