'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, Clock } from "lucide-react";

export function UpcomingEvents() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const events = [
    {
      title: "Web Development Exam",
      date: "2024-03-25",
      time: "10:00 AM",
      type: "exam",
    },
    {
      title: "New Batch Orientation",
      date: "2024-03-26",
      time: "2:00 PM",
      type: "event",
    },
    {
      title: "Faculty Meeting",
      date: "2024-03-27",
      time: "11:00 AM",
      type: "meeting",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Events</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
          <div className="space-y-4">
            {events.map((event, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">{event.title}</p>
                  <div className="flex items-center space-x-2">
                    <CalendarIcon className="h-3 w-3 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">{event.date}</p>
                    <Clock className="h-3 w-3 text-muted-foreground ml-2" />
                    <p className="text-xs text-muted-foreground">{event.time}</p>
                  </div>
                </div>
                <Badge variant={
                  event.type === 'exam' ? 'destructive' :
                  event.type === 'meeting' ? 'secondary' :
                  'default'
                }>
                  {event.type}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 