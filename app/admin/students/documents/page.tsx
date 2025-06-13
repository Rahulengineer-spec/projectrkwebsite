"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Search, Upload, FileText, Download } from "lucide-react";

interface Document {
  id: string;
  studentName: string;
  documentType: string;
  fileName: string;
  uploadDate: string;
  status: "verified" | "pending" | "rejected";
}

export default function StudentDocumentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [documents] = useState<Document[]>([
    {
      id: "1",
      studentName: "John Doe",
      documentType: "ID Proof",
      fileName: "passport.pdf",
      uploadDate: "2024-01-15",
      status: "verified",
    },
    {
      id: "2",
      studentName: "Jane Smith",
      documentType: "Academic Records",
      fileName: "transcript.pdf",
      uploadDate: "2024-01-20",
      status: "pending",
    },
    // Add more mock data as needed
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Student Documents</h1>
          <p className="text-sm text-muted-foreground">
            Manage and verify student documents
          </p>
        </div>
        <Button>
          <Upload className="w-4 h-4 mr-2" />
          Upload Document
        </Button>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
            <Button variant="outline">
              <FileText className="w-4 h-4 mr-2" />
              Filter by Type
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Documents Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Documents</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student Name</TableHead>
                <TableHead>Document Type</TableHead>
                <TableHead>File Name</TableHead>
                <TableHead>Upload Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell className="font-medium">{doc.studentName}</TableCell>
                  <TableCell>{doc.documentType}</TableCell>
                  <TableCell>{doc.fileName}</TableCell>
                  <TableCell>{doc.uploadDate}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        doc.status === "verified"
                          ? "default"
                          : doc.status === "pending"
                          ? "secondary"
                          : "destructive"
                      }
                    >
                      {doc.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Verify Document</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
} 