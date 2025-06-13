"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Video, Clock, Users, Calendar } from "lucide-react";
import useSWR from "swr";

interface LiveClass {
  id: string;
  title: string;
  course: string;
  instructor: string;
  startTime: string;
  duration: string;
  status: "upcoming" | "live" | "completed";
  participants?: number;
  recordingUrl?: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function LiveClassesPage() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const { data: classes, error, mutate } = useSWR<LiveClass[]>("/api/student/live-classes", fetcher, {
    refreshInterval: 30000, // Refresh every 30 seconds
  });

  if (error) return <div>Failed to load live classes</div>;
  if (!classes) return <div>Loading...</div>;

  const filteredClasses = classes.filter((cls) => cls.status === activeTab);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Live Classes</h1>
        <Button>
          <Calendar className="w-4 h-4 mr-2" />
          View Schedule
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="live">Live Now</TabsTrigger>
          <TabsTrigger value="completed">Recordings</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {filteredClasses.map((cls) => (
            <Card key={cls.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg">{cls.title}</CardTitle>
                <Badge variant={
                  cls.status === "live" ? "destructive" :
                  cls.status === "upcoming" ? "default" : "secondary"
                }>
                  {cls.status === "live" ? "Live Now" :
                   cls.status === "upcoming" ? "Upcoming" : "Recording"}
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Course</p>
                    <p className="font-medium">{cls.course}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Instructor</p>
                    <p className="font-medium">{cls.instructor}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Start Time</p>
                    <p className="font-medium">{cls.startTime}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Duration</p>
                    <p className="font-medium">{cls.duration}</p>
                  </div>
                </div>
                <div className="mt-4 flex justify-end gap-2">
                  {cls.status === "live" && (
                    <Button>
                      <Video className="w-4 h-4 mr-2" />
                      Join Class
                    </Button>
                  )}
                  {cls.status === "upcoming" && (
                    <Button variant="outline">
                      <Calendar className="w-4 h-4 mr-2" />
                      Add to Calendar
                    </Button>
                  )}
                  {cls.status === "completed" && cls.recordingUrl && (
                    <Button variant="outline">
                      <Video className="w-4 h-4 mr-2" />
                      Watch Recording
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
} 