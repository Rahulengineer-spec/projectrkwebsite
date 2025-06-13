'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Send,
  Paperclip,
  Smile,
  MoreVertical,
  Phone,
  Video,
  Info,
  Users,
  MessageSquare,
  Clock,
  Check,
  CheckCheck,
  FileText,
} from "lucide-react";

interface ChatMessage {
  id: string;
  sender: {
    id: string;
    name: string;
    avatar: string;
    role: 'student' | 'instructor' | 'admin';
    isOnline: boolean;
  };
  content: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
  attachments?: {
    type: 'image' | 'file' | 'link';
    url: string;
    name: string;
  }[];
}

interface ChatParticipant {
  id: string;
  name: string;
  avatar: string;
  role: 'student' | 'instructor' | 'admin';
  isOnline: boolean;
  lastSeen?: string;
  status?: string;
}

const participants: ChatParticipant[] = [
  {
    id: '1',
    name: 'John Doe',
    avatar: '/avatars/john.jpg',
    role: 'instructor',
    isOnline: true,
    status: 'Available',
  },
  {
    id: '2',
    name: 'Jane Smith',
    avatar: '/avatars/jane.jpg',
    role: 'student',
    isOnline: true,
    lastSeen: '2 min ago',
  },
  {
    id: '3',
    name: 'Mike Johnson',
    avatar: '/avatars/mike.jpg',
    role: 'student',
    isOnline: false,
    lastSeen: '1 hour ago',
  },
];

const messages: ChatMessage[] = [
  {
    id: '1',
    sender: participants[0],
    content: 'Hello everyone! How are you doing with the React assignments?',
    timestamp: '10:30 AM',
    status: 'read',
  },
  {
    id: '2',
    sender: participants[1],
    content: 'Hi John! I\'m working on the hooks implementation. Having some trouble with useEffect.',
    timestamp: '10:32 AM',
    status: 'read',
  },
  {
    id: '3',
    sender: participants[0],
    content: 'Feel free to share your code, and I\'ll help you debug it.',
    timestamp: '10:33 AM',
    status: 'read',
  },
  {
    id: '4',
    sender: participants[1],
    content: 'Here\'s what I have so far...',
    timestamp: '10:35 AM',
    status: 'delivered',
    attachments: [
      {
        type: 'file',
        url: '/files/code.js',
        name: 'useEffectExample.js',
      },
    ],
  },
];

export default function ChatPage() {
  const formatTime = (timeString: string) => {
    return timeString;
  };

  const getStatusIcon = (status: ChatMessage['status']) => {
    switch (status) {
      case 'sent':
        return <Check className="h-4 w-4 text-muted-foreground" />;
      case 'delivered':
        return <CheckCheck className="h-4 w-4 text-muted-foreground" />;
      case 'read':
        return <CheckCheck className="h-4 w-4 text-blue-500" />;
    }
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex">
      {/* Sidebar */}
      <div className="w-80 border-r p-4 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Chats</h2>
          <Button variant="ghost" size="icon">
            <Users className="h-4 w-4" />
          </Button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search chats..."
            className="pl-8"
          />
        </div>

        {/* Participants List */}
        <div className="space-y-2">
          {participants.map((participant) => (
            <div
              key={participant.id}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted cursor-pointer"
            >
              <div className="relative">
                <Avatar>
                  <AvatarImage src={participant.avatar} alt={participant.name} />
                  <AvatarFallback>
                    {participant.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                {participant.isOnline && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="font-medium truncate">{participant.name}</p>
                  {participant.lastSeen && (
                    <span className="text-xs text-muted-foreground">
                      {participant.lastSeen}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {participant.role}
                  </Badge>
                  {participant.status && (
                    <span className="text-xs text-muted-foreground">
                      {participant.status}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="border-b p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={participants[0].avatar} alt={participants[0].name} />
                <AvatarFallback>
                  {participants[0].name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">{participants[0].name}</h3>
                <p className="text-sm text-muted-foreground">
                  {participants[0].role} • {participants[0].status}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Phone className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Video className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Info className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${
                message.sender.role === 'instructor' ? 'justify-start' : 'justify-end'
              }`}
            >
              {message.sender.role === 'instructor' && (
                <Avatar>
                  <AvatarImage src={message.sender.avatar} alt={message.sender.name} />
                  <AvatarFallback>
                    {message.sender.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              )}
              <div
                className={`max-w-[70%] space-y-2 ${
                  message.sender.role === 'instructor'
                    ? 'bg-muted rounded-lg p-3'
                    : 'bg-primary text-primary-foreground rounded-lg p-3'
                }`}
              >
                {message.sender.role === 'instructor' && (
                  <p className="text-sm font-medium">{message.sender.name}</p>
                )}
                <p>{message.content}</p>
                {message.attachments?.map((attachment, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-2 bg-background/50 rounded"
                  >
                    <FileText className="h-4 w-4" />
                    <span className="text-sm">{attachment.name}</span>
                  </div>
                ))}
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <span>{formatTime(message.timestamp)}</span>
                  {message.sender.role !== 'instructor' && getStatusIcon(message.status)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="border-t p-4">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Paperclip className="h-4 w-4" />
            </Button>
            <Input
              placeholder="Type a message..."
              className="flex-1"
            />
            <Button variant="ghost" size="icon">
              <Smile className="h-4 w-4" />
            </Button>
            <Button>
              <Send className="h-4 w-4 mr-2" />
              Send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 