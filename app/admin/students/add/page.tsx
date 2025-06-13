"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface Class {
  id: string;
  name: string;
}

export default function AddStudentPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [classId, setClassId] = useState("");
  const [status, setStatus] = useState("active");
  const [enrollmentDate, setEnrollmentDate] = useState("");
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/classes")
      .then((res) => res.json())
      .then((data) => setClasses(data))
      .catch(() => setClasses([]));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          classId,
          status,
          enrollmentDate,
        }),
      });
      if (!res.ok) throw new Error("Failed to add student");
      // Optionally, trigger SWR mutate here if you have a global mutate
      router.push("/admin/students");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Add New Student</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={name} onChange={e => setName(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="class">Class</Label>
              <Select value={classId} onValueChange={setClassId} required>
                <SelectTrigger id="class">
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  {classes.map((cls) => (
                    <SelectItem key={cls.id} value={cls.id}>{cls.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={status} onValueChange={setStatus} required>
                <SelectTrigger id="status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="enrollmentDate">Enrollment Date</Label>
              <Input id="enrollmentDate" type="date" value={enrollmentDate} onChange={e => setEnrollmentDate(e.target.value)} required />
            </div>
            {error && <div className="text-red-600 text-sm">{error}</div>}
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => router.push("/admin/students")}>Cancel</Button>
              <Button type="submit" disabled={loading}>{loading ? "Adding..." : "Add Student"}</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 