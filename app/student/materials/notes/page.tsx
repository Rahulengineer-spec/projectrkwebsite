'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Search,
  FileText,
  Download,
  Share2,
  Clock,
  Calendar,
  BookOpen,
  ChevronRight,
  Filter,
  Bookmark,
  Plus,
  FileEdit,
} from "lucide-react";

interface Note {
  id: string;
  title: string;
  course: string;
  instructor: string;
  date: string;
  lastModified: string;
  type: 'lecture' | 'summary' | 'assignment';
  tags: string[];
  content: string;
  isBookmarked: boolean;
  fileUrl: string;
}

const notes: Note[] = [
  {
    id: '1',
    title: 'React Hooks Overview',
    course: 'Web Development Bootcamp',
    instructor: 'John Doe',
    date: '2024-03-15',
    lastModified: '2024-03-16',
    type: 'lecture',
    tags: ['React', 'Hooks', 'JavaScript'],
    content: 'Comprehensive notes on React Hooks including useState, useEffect, and custom hooks...',
    isBookmarked: true,
    fileUrl: '/notes/react-hooks.pdf',
  },
  {
    id: '2',
    title: 'Data Analysis Methods',
    course: 'Data Science Fundamentals',
    instructor: 'Jane Smith',
    date: '2024-03-14',
    lastModified: '2024-03-15',
    type: 'summary',
    tags: ['Data Science', 'Analysis', 'Python'],
    content: 'Summary of key data analysis methods and techniques...',
    isBookmarked: false,
    fileUrl: '/notes/data-analysis.pdf',
  },
];

export default function NotesPage() {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getTypeBadge = (type: Note['type']) => {
    switch (type) {
      case 'lecture':
        return <Badge variant="default">Lecture Notes</Badge>;
      case 'summary':
        return <Badge variant="secondary">Summary</Badge>;
      case 'assignment':
        return <Badge variant="outline">Assignment</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Study Notes</h1>
          <p className="text-muted-foreground">
            Access and manage your course notes
          </p>
        </div>
        <div className="flex gap-2">
          <Button>
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Note
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search notes..."
          className="pl-8"
        />
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Notes</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              Available notes
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Updates</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">
              In last 7 days
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bookmarked</CardTitle>
            <Bookmark className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              Saved notes
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              With notes
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Notes List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Recent Notes</h2>
        {notes.map((note) => (
          <Card key={note.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{note.title}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {note.course} • {note.instructor}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {getTypeBadge(note.type)}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {note.content}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    Created: {formatDate(note.date)}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    Modified: {formatDate(note.lastModified)}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {note.tags.map((tag, index) => (
                    <Badge key={index} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button>
                    <FileText className="mr-2 h-4 w-4" />
                    View Note
                  </Button>
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                  <Button variant="outline">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                  <Button variant="outline">
                    <FileEdit className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                  <Button variant="ghost">
                    {note.isBookmarked ? (
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