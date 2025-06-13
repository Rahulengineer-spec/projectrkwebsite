'use client';

import { useEffect, useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface CalendarEvent {
  id: string;
  title: string;
  type: 'CLASS' | 'ASSIGNMENT' | 'EXAM' | 'MEETING';
  start: string;
  end: string;
  course: string;
  instructor?: string;
  location?: string;
  description: string;
}

export default function CalendarPage() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/student/calendar');
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching calendar events:', error);
      }
    };

    fetchEvents();
  }, []);

  const getEventsForDate = (date: Date) => {
    return events.filter(event => {
      const eventDate = new Date(event.start);
      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear()
      );
    });
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'CLASS':
        return 'bg-blue-500';
      case 'ASSIGNMENT':
        return 'bg-yellow-500';
      case 'EXAM':
        return 'bg-red-500';
      case 'MEETING':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Calendar</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>
        </div>
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>
                Events for {selectedDate?.toLocaleDateString()}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedDate && getEventsForDate(selectedDate).length > 0 ? (
                <div className="space-y-4">
                  {getEventsForDate(selectedDate).map(event => (
                    <div
                      key={event.id}
                      className="p-4 border rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold">{event.title}</h3>
                        <Badge className={getEventTypeColor(event.type)}>
                          {event.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {event.description}
                      </p>
                      <div className="text-sm text-gray-500">
                        <p>Course: {event.course}</p>
                        {event.instructor && <p>Instructor: {event.instructor}</p>}
                        {event.location && <p>Location: {event.location}</p>}
                        <p>
                          Time:{' '}
                          {new Date(event.start).toLocaleTimeString()} -{' '}
                          {new Date(event.end).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No events scheduled for this date.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 