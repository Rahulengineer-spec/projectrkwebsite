'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Search,
  BookOpen,
  Download,
  Share2,
  Clock,
  Calendar,
  ChevronRight,
  Filter,
  Bookmark,
  FileText,
  Eye,
  BookOpenCheck,
} from "lucide-react";

interface Ebook {
  id: string;
  title: string;
  course: string;
  instructor: string;
  date: string;
  pages: number;
  type: 'textbook' | 'reference' | 'guide';
  format: 'PDF' | 'EPUB' | 'MOBI';
  size: string;
  description: string;
  tags: string[];
  fileUrl: string;
  isBookmarked: boolean;
  coverUrl: string;
  isRead: boolean;
  readProgress: number;
}

const ebooks: Ebook[] = [
  {
    id: '1',
    title: 'React Development Guide',
    course: 'Web Development Bootcamp',
    instructor: 'John Doe',
    date: '2024-03-15',
    pages: 245,
    type: 'textbook',
    format: 'PDF',
    size: '15.2 MB',
    description: 'Comprehensive guide to React development covering modern practices and patterns.',
    tags: ['React', 'JavaScript', 'Web Development'],
    fileUrl: '/ebooks/react-guide.pdf',
    isBookmarked: true,
    coverUrl: '/covers/react-guide.jpg',
    isRead: true,
    readProgress: 100,
  },
  {
    id: '2',
    title: 'Data Science Fundamentals',
    course: 'Data Science Fundamentals',
    instructor: 'Jane Smith',
    date: '2024-03-14',
    pages: 320,
    type: 'reference',
    format: 'EPUB',
    size: '22.5 MB',
    description: 'Essential reference guide for data science concepts and techniques.',
    tags: ['Data Science', 'Python', 'Statistics'],
    fileUrl: '/ebooks/data-science.epub',
    isBookmarked: false,
    coverUrl: '/covers/data-science.jpg',
    isRead: false,
    readProgress: 35,
  },
];

export default function EbooksPage() {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getTypeBadge = (type: Ebook['type']) => {
    switch (type) {
      case 'textbook':
        return <Badge variant="default">Textbook</Badge>;
      case 'reference':
        return <Badge variant="secondary">Reference</Badge>;
      case 'guide':
        return <Badge variant="outline">Guide</Badge>;
    }
  };

  const getFormatBadge = (format: Ebook['format']) => {
    return <Badge variant="outline">{format}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">E-Books</h1>
          <p className="text-muted-foreground">
            Access and read course e-books and materials
          </p>
        </div>
        <Button>
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search e-books..."
          className="pl-8"
        />
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Books</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">
              Available books
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pages</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.5k</div>
            <p className="text-xs text-muted-foreground">
              Of content
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Read</CardTitle>
            <BookOpenCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              Books completed
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bookmarked</CardTitle>
            <Bookmark className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">
              Saved books
            </p>
          </CardContent>
        </Card>
      </div>

      {/* E-Books List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Recent Books</h2>
        {ebooks.map((book) => (
          <Card key={book.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{book.title}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {book.course} • {book.instructor}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {getTypeBadge(book.type)}
                  {getFormatBadge(book.format)}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="relative w-32 h-48 rounded-lg overflow-hidden bg-muted">
                    <img
                      src={book.coverUrl}
                      alt={book.title}
                      className="object-cover w-full h-full"
                    />
                    {book.isRead && (
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-green-500" />
                    )}
                    {!book.isRead && book.readProgress > 0 && (
                      <div className="absolute bottom-0 left-0 h-1 bg-blue-500" style={{ width: `${book.readProgress}%` }} />
                    )}
                  </div>
                  <div className="flex-1 space-y-4">
                    <p className="text-sm text-muted-foreground">
                      {book.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDate(book.date)}
                      </div>
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-1" />
                        {book.pages} pages
                      </div>
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        {book.readProgress}% read
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {book.tags.map((tag, index) => (
                        <Badge key={index} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button>
                    <BookOpen className="mr-2 h-4 w-4" />
                    {book.isRead ? 'Read Again' : 'Read Now'}
                  </Button>
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                  <Button variant="outline">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                  <Button variant="ghost">
                    {book.isBookmarked ? (
                      <>
                        <Bookmark className="mr-2 h-4 w-4" />
                        Remove Bookmark
                      </>
                    ) : (
                      <>
                        <Bookmark className="mr-2 h-4 w-4" />
                        Bookmark
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 