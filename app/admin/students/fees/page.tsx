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
import { MoreHorizontal, Search, Plus, Filter, Download } from "lucide-react";

interface FeeRecord {
  id: string;
  studentName: string;
  feeType: string;
  amount: number;
  dueDate: string;
  status: "paid" | "pending" | "overdue";
  paymentDate?: string;
}

export default function StudentFeesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [feeRecords] = useState<FeeRecord[]>([
    {
      id: "1",
      studentName: "John Doe",
      feeType: "Tuition Fee",
      amount: 5000,
      dueDate: "2024-02-15",
      status: "paid",
      paymentDate: "2024-02-10",
    },
    {
      id: "2",
      studentName: "Jane Smith",
      feeType: "Library Fee",
      amount: 1000,
      dueDate: "2024-02-20",
      status: "pending",
    },
    // Add more mock data as needed
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Student Fees</h1>
          <p className="text-sm text-muted-foreground">
            Manage and track student fee payments
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Fee Record
          </Button>
        </div>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search fee records..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Fee Records Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Fee Records</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student Name</TableHead>
                <TableHead>Fee Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment Date</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {feeRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="font-medium">{record.studentName}</TableCell>
                  <TableCell>{record.feeType}</TableCell>
                  <TableCell>${record.amount.toFixed(2)}</TableCell>
                  <TableCell>{record.dueDate}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        record.status === "paid"
                          ? "default"
                          : record.status === "pending"
                          ? "secondary"
                          : "destructive"
                      }
                    >
                      {record.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{record.paymentDate || "-"}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Record Payment</DropdownMenuItem>
                        <DropdownMenuItem>Generate Receipt</DropdownMenuItem>
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