'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Plus, User } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';

interface Discussion {
  id: string;
  title: string;
  course: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  content: string;
  createdAt: string;
  replies: {
    id: string;
    author: {
      id: string;
      name: string;
      avatar: string;
    };
    content: string;
    createdAt: string;
  }[];
  tags: string[];
}

export default function DiscussionsPage() {
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    course: '',
    tags: '',
  });
  const [showNewPostForm, setShowNewPostForm] = useState(false);

  useEffect(() => {
    const fetchDiscussions = async () => {
      try {
        const response = await fetch('/api/student/discussions');
        const data = await response.json();
        setDiscussions(data);
      } catch (error) {
        console.error('Error fetching discussions:', error);
      }
    };

    fetchDiscussions();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/student/discussions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newPost,
          tags: newPost.tags.split(',').map(tag => tag.trim()),
        }),
      });

      if (response.ok) {
        setShowNewPostForm(false);
        setNewPost({ title: '', content: '', course: '', tags: '' });
        // Refresh discussions
        const updatedResponse = await fetch('/api/student/discussions');
        const updatedData = await updatedResponse.json();
        setDiscussions(updatedData);
      }
    } catch (error) {
      console.error('Error creating discussion:', error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Discussions</h1>
        <Button onClick={() => setShowNewPostForm(!showNewPostForm)}>
          <Plus className="w-4 h-4 mr-2" />
          New Discussion
        </Button>
      </div>

      {showNewPostForm && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Create New Discussion</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <Input
                  value={newPost.title}
                  onChange={e => setNewPost({ ...newPost, title: e.target.value })}
                  placeholder="Enter discussion title"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Course</label>
                <Input
                  value={newPost.course}
                  onChange={e => setNewPost({ ...newPost, course: e.target.value })}
                  placeholder="Enter course name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Content</label>
                <Textarea
                  value={newPost.content}
                  onChange={e => setNewPost({ ...newPost, content: e.target.value })}
                  placeholder="Enter your discussion content"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Tags</label>
                <Input
                  value={newPost.tags}
                  onChange={e => setNewPost({ ...newPost, tags: e.target.value })}
                  placeholder="Enter tags (comma-separated)"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowNewPostForm(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Post Discussion</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="space-y-6">
        {discussions.map(discussion => (
          <Card key={discussion.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">{discussion.title}</CardTitle>
                  <div className="flex items-center mt-2 space-x-2">
                    <Badge variant="secondary">{discussion.course}</Badge>
                    <span className="text-sm text-gray-500">
                      Posted by {discussion.author.name}
                    </span>
                    <span className="text-sm text-gray-500">
                      {new Date(discussion.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <MessageSquare className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-500">
                    {discussion.replies.length} replies
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-700">{discussion.content}</p>
                <div className="flex flex-wrap gap-2">
                  {discussion.tags.map(tag => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="border-t pt-4">
                  <h3 className="font-semibold mb-2">Replies</h3>
                  <div className="space-y-4">
                    {discussion.replies.map(reply => (
                      <div key={reply.id} className="flex space-x-4">
                        <div className="flex-shrink-0">
                          <User className="w-8 h-8 text-gray-400" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{reply.author.name}</span>
                            <span className="text-sm text-gray-500">
                              {new Date(reply.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-gray-700 mt-1">{reply.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 