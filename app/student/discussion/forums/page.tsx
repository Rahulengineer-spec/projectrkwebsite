'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Search,
  MessageSquare,
  Users,
  Clock,
  Calendar,
  ChevronRight,
  Filter,
  Plus,
  ThumbsUp,
  MessageCircle,
  Eye,
  TrendingUp,
} from "lucide-react";

interface ForumPost {
  id: string;
  title: string;
  course: string;
  author: string;
  date: string;
  lastActivity: string;
  type: 'discussion' | 'question' | 'announcement';
  status: 'active' | 'solved' | 'closed';
  views: number;
  likes: number;
  replies: number;
  content: string;
  tags: string[];
  isPinned: boolean;
}

const forumPosts: ForumPost[] = [
  {
    id: '1',
    title: 'Understanding React Hooks',
    course: 'Web Development Bootcamp',
    author: 'John Doe',
    date: '2024-03-15',
    lastActivity: '2024-03-16',
    type: 'discussion',
    status: 'active',
    views: 156,
    likes: 23,
    replies: 12,
    content: 'Let\'s discuss the best practices for using React Hooks in our projects...',
    tags: ['React', 'Hooks', 'JavaScript'],
    isPinned: true,
  },
  {
    id: '2',
    title: 'Data Visualization Help',
    course: 'Data Science Fundamentals',
    author: 'Jane Smith',
    date: '2024-03-14',
    lastActivity: '2024-03-15',
    type: 'question',
    status: 'solved',
    views: 98,
    likes: 15,
    replies: 8,
    content: 'I need help with creating interactive visualizations using Python...',
    tags: ['Python', 'Data Visualization', 'Matplotlib'],
    isPinned: false,
  },
];

export default function ForumsPage() {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getTypeBadge = (type: ForumPost['type']) => {
    switch (type) {
      case 'discussion':
        return <Badge variant="default">Discussion</Badge>;
      case 'question':
        return <Badge variant="secondary">Question</Badge>;
      case 'announcement':
        return <Badge variant="outline">Announcement</Badge>;
    }
  };

  const getStatusBadge = (status: ForumPost['status']) => {
    switch (status) {
      case 'active':
        return <Badge variant="default">Active</Badge>;
      case 'solved':
        return <Badge variant="secondary">Solved</Badge>;
      case 'closed':
        return <Badge variant="destructive">Closed</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Discussion Forums</h1>
          <p className="text-muted-foreground">
            Engage in course discussions and get help
          </p>
        </div>
        <div className="flex gap-2">
          <Button>
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Post
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search discussions..."
          className="pl-8"
        />
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">
              Active discussions
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">
              Online now
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Solved</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">
              Questions resolved
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Replies</CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">423</div>
            <p className="text-xs text-muted-foreground">
              Across all posts
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Forum Posts List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Recent Discussions</h2>
        {forumPosts.map((post) => (
          <Card key={post.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <CardTitle>{post.title}</CardTitle>
                    {post.isPinned && (
                      <Badge variant="outline" className="text-xs">
                        Pinned
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {post.course} • Posted by {post.author}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {getTypeBadge(post.type)}
                  {getStatusBadge(post.status)}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  {post.content}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    Posted: {formatDate(post.date)}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    Last activity: {formatDate(post.lastActivity)}
                  </div>
                  <div className="flex items-center">
                    <Eye className="h-4 w-4 mr-1" />
                    {post.views} views
                  </div>
                  <div className="flex items-center">
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    {post.likes} likes
                  </div>
                  <div className="flex items-center">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    {post.replies} replies
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <Badge key={index} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    View Discussion
                  </Button>
                  <Button variant="outline">
                    <ThumbsUp className="mr-2 h-4 w-4" />
                    Like
                  </Button>
                  <Button variant="ghost">
                    <ChevronRight className="h-4 w-4 mr-2" />
                    Reply
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