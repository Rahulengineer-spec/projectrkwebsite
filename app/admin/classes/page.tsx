'use client';

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Search, Edit, Trash } from "lucide-react";
import { fetchWithCsrf, post, put, del } from "@/lib/api";
import { useCsrf } from "@/hooks/useCsrf";

interface Class {
  id: string;
  name: string;
  code: string;
  description: string;
  level: string;
  students: any[];
  courses: any[];
}

export default function ClassesPage() {
  const [classes, setClasses] = useState<Class[]>([]);
  const [isAddingClass, setIsAddingClass] = useState(false);
  const [isEditingClass, setIsEditingClass] = useState<Class | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [form, setForm] = useState({
    name: "",
    code: "",
    level: "",
    description: "",
  });
  const { csrfToken } = useCsrf();

  useEffect(() => {
    console.log("ClassesPage mounted, fetching classes...");
    fetchClasses();
  }, []);

  async function fetchClasses() {
    try {
      const data = await fetchWithCsrf<Class[]>("/api/classes");
      setClasses(data);
    } catch (err) {
      // handle error
    }
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.id]: e.target.value });
  }

  function handleLevelChange(value: string) {
    setForm({ ...form, level: value });
  }

  function openAddForm() {
    console.log("Opening add form");
    setForm({ name: "", code: "", level: "", description: "" });
    setIsAddingClass(true);
    setIsEditingClass(null);
  }

  function openEditForm(classItem: Class) {
    console.log("Opening edit form for class:", classItem);
    setForm({
      name: classItem.name,
      code: classItem.code,
      level: classItem.level,
      description: classItem.description,
    });
    setIsEditingClass(classItem);
    setIsAddingClass(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Submitting form:", form);
    if (!csrfToken) {
      console.error("CSRF token missing");
      return;
    }
    try {
      if (isEditingClass) {
        await put(`/api/classes`, { ...form, id: isEditingClass.id }, csrfToken);
      } else {
        await post(`/api/classes`, form, csrfToken);
      }
      setIsAddingClass(false);
      setIsEditingClass(null);
      setForm({ name: "", code: "", level: "", description: "" });
      fetchClasses();
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  }

  async function handleDelete(classId: string) {
    console.log("Deleting class:", classId);
    if (!csrfToken) {
      console.error("CSRF token missing");
      return;
    }
    try {
      await del(`/api/classes`, csrfToken, { id: classId });
      fetchClasses();
    } catch (err) {
      console.error("Error deleting class:", err);
    }
  }

  const filteredClasses = classes.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Class Management</h1>
          <p className="text-muted-foreground">
            Manage classes and their associated courses
          </p>
        </div>
        <Button onClick={openAddForm}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Class
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Classes</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search classes..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Class Name</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Level</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Courses</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClasses.map((classItem) => (
                <TableRow key={classItem.id}>
                  <TableCell>{classItem.name}</TableCell>
                  <TableCell>{classItem.code}</TableCell>
                  <TableCell>{classItem.level}</TableCell>
                  <TableCell>{classItem.students.length}</TableCell>
                  <TableCell>{classItem.courses.length}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => openEditForm(classItem)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(classItem.id)}>
                      <Trash className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {(isAddingClass || isEditingClass) && (
        <Card>
          <CardHeader>
            <CardTitle>{isEditingClass ? "Edit Class" : "Add New Class"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="name">Class Name</Label>
                <Input id="name" value={form.name} onChange={handleInputChange} placeholder="Enter class name" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="code">Class Code</Label>
                <Input id="code" value={form.code} onChange={handleInputChange} placeholder="Enter class code" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="level">Level</Label>
                <Select value={form.level} onValueChange={handleLevelChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={form.description}
                  onChange={handleInputChange}
                  placeholder="Enter class description"
                  className="resize-none"
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsAddingClass(false);
                    setIsEditingClass(null);
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit">{isEditingClass ? "Update Class" : "Create Class"}</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 