'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Search,
  Video,
  Download,
  Share2,
  Clock,
  Calendar,
  Users,
  BookOpen,
  ChevronRight,
  Filter,
  Play,
  Bookmark,
} from "lucide-react";

interface Recording {
  id: string;
  title: string;
  course: string;
  instructor: string;
  date: string;
  duration: string;
  type: 'lecture' | 'workshop' | 'q&a';
  views: number;
  description: string;
  topics: string[];
  videoUrl: string;
  isBookmarked: boolean;
  thumbnailUrl: string;
}

const recordings: Recording[] = [
  {
    id: '1',
    title: 'Introduction to React Hooks',
    course: 'Web Development Bootcamp',
    instructor: 'John Doe',
    date: '2024-03-15T10:00:00',
    duration: '1:45:30',
    type: 'lecture',
    views: 156,
    description: 'Learn about React Hooks and their usage in modern React applications.',
    topics: ['useState', 'useEffect', 'Custom Hooks'],
    videoUrl: 'https://example.com/video1',
    isBookmarked: true,
    thumbnailUrl: '/thumbnails/lecture1.jpg',
  },
  {
    id: '2',
    title: 'Data Analysis with Python',
    course: 'Data Science Fundamentals',
    instructor: 'Jane Smith',
    date: '2024-03-14T14:00:00',
    duration: '2:15:00',
    type: 'workshop',
    views: 98,
    description: 'Hands-on workshop on data analysis using Python libraries.',
    topics: ['Pandas', 'NumPy', 'Data Visualization'],
    videoUrl: 'https://example.com/video2',
    isBookmarked: false,
    thumbnailUrl: '/thumbnails/workshop1.jpg',
  },
];

export default function RecordingsPage() {
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getTypeBadge = (type: Recording['type']) => {
    switch (type) {
      case 'lecture':
        return <Badge variant="default">Lecture</Badge>;
      case 'workshop':
        return <Badge variant="secondary">Workshop</Badge>;
      case 'q&a':
        return <Badge variant="outline">Q&A Session</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Class Recordings</h1>
          <p className="text-muted-foreground">
            Access recordings of past live classes
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
          placeholder="Search recordings..."
          className="pl-8"
        />
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Recordings</CardTitle>
            <Video className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              Available recordings
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Duration</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">48h</div>
            <p className="text-xs text-muted-foreground">
              Of content
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.2k</div>
            <p className="text-xs text-muted-foreground">
              Across all recordings
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
              Saved recordings
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recordings List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Recent Recordings</h2>
        {recordings.map((recording) => (
          <Card key={recording.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{recording.title}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {recording.course} • {recording.instructor}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {getTypeBadge(recording.type)}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
                  <img
                    src={recording.thumbnailUrl}
                    alt={recording.title}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button size="icon" className="h-12 w-12 rounded-full">
                      <Play className="h-6 w-6" />
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  {recording.description}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {formatDateTime(recording.date)}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {recording.duration}
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {recording.views} views
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recording.topics.map((topic, index) => (
                    <Badge key={index} variant="outline">
                      {topic}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button>
                    <Play className="mr-2 h-4 w-4" />
                    Watch Recording
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
                    {recording.isBookmarked ? (
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