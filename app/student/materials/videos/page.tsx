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
  BookOpen,
  ChevronRight,
  Filter,
  Bookmark,
  Play,
  Eye,
} from "lucide-react";

interface VideoMaterial {
  id: string;
  title: string;
  course: string;
  instructor: string;
  date: string;
  duration: string;
  type: 'lecture' | 'tutorial' | 'workshop';
  views: number;
  description: string;
  tags: string[];
  videoUrl: string;
  isBookmarked: boolean;
  thumbnailUrl: string;
  isWatched: boolean;
  watchProgress: number;
}

const videos: VideoMaterial[] = [
  {
    id: '1',
    title: 'Introduction to React Hooks',
    course: 'Web Development Bootcamp',
    instructor: 'John Doe',
    date: '2024-03-15',
    duration: '45:30',
    type: 'lecture',
    views: 156,
    description: 'Learn about React Hooks and their usage in modern React applications.',
    tags: ['React', 'Hooks', 'JavaScript'],
    videoUrl: 'https://example.com/video1',
    isBookmarked: true,
    thumbnailUrl: '/thumbnails/react-hooks.jpg',
    isWatched: true,
    watchProgress: 100,
  },
  {
    id: '2',
    title: 'Data Visualization with Python',
    course: 'Data Science Fundamentals',
    instructor: 'Jane Smith',
    date: '2024-03-14',
    duration: '1:15:00',
    type: 'tutorial',
    views: 98,
    description: 'Step-by-step tutorial on creating data visualizations using Python libraries.',
    tags: ['Python', 'Data Visualization', 'Matplotlib'],
    videoUrl: 'https://example.com/video2',
    isBookmarked: false,
    thumbnailUrl: '/thumbnails/data-viz.jpg',
    isWatched: false,
    watchProgress: 0,
  },
];

export default function VideosPage() {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getTypeBadge = (type: VideoMaterial['type']) => {
    switch (type) {
      case 'lecture':
        return <Badge variant="default">Lecture</Badge>;
      case 'tutorial':
        return <Badge variant="secondary">Tutorial</Badge>;
      case 'workshop':
        return <Badge variant="outline">Workshop</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Video Materials</h1>
          <p className="text-muted-foreground">
            Access and watch course video materials
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
          placeholder="Search videos..."
          className="pl-8"
        />
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Videos</CardTitle>
            <Video className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">36</div>
            <p className="text-xs text-muted-foreground">
              Available videos
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Duration</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24h</div>
            <p className="text-xs text-muted-foreground">
              Of content
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Watched</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              Videos completed
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
              Saved videos
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Videos List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Recent Videos</h2>
        {videos.map((video) => (
          <Card key={video.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{video.title}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {video.course} • {video.instructor}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {getTypeBadge(video.type)}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
                  <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button size="icon" className="h-12 w-12 rounded-full">
                      <Play className="h-6 w-6" />
                    </Button>
                  </div>
                  {video.isWatched && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-green-500" />
                  )}
                  {!video.isWatched && video.watchProgress > 0 && (
                    <div className="absolute bottom-0 left-0 h-1 bg-blue-500" style={{ width: `${video.watchProgress}%` }} />
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {video.description}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {formatDate(video.date)}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {video.duration}
                  </div>
                  <div className="flex items-center">
                    <Eye className="h-4 w-4 mr-1" />
                    {video.views} views
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {video.tags.map((tag, index) => (
                    <Badge key={index} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button>
                    <Play className="mr-2 h-4 w-4" />
                    {video.isWatched ? 'Watch Again' : 'Watch Now'}
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
                    {video.isBookmarked ? (
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