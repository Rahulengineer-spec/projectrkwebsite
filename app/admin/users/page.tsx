'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Plus, Pencil, Trash2, Search, UserCog, Mail, Ban } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'INSTRUCTOR' | 'USER';
  status: 'active' | 'inactive';
  enrolledCourses: number;
  lastLogin: string;
}

export default function AdminUsers() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'USER',
    password: '',
  });

  // This would normally come from an API
  const [users] = useState<User[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'USER',
      status: 'active',
      enrolledCourses: 3,
      lastLogin: '2024-03-15 14:30',
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      role: 'INSTRUCTOR',
      status: 'active',
      enrolledCourses: 0,
      lastLogin: '2024-03-14 09:15',
    },
  ]);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // This would normally be an API call
      toast({
        title: selectedUser ? 'User updated' : 'User created',
        description: `Successfully ${selectedUser ? 'updated' : 'created'} the user.`,
      });
      setIsAddDialogOpen(false);
      resetForm();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save the user. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      password: '',
    });
    setIsAddDialogOpen(true);
  };

  const handleDelete = async (userId: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      try {
        // This would normally be an API call
        toast({
          title: 'User deleted',
          description: 'The user has been successfully deleted.',
        });
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to delete the user. Please try again.',
          variant: 'destructive',
        });
      }
    }
  };

  const handleToggleStatus = async (userId: string, currentStatus: string) => {
    try {
      // This would normally be an API call
      toast({
        title: 'Status updated',
        description: `User has been ${currentStatus === 'active' ? 'deactivated' : 'activated'}.`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update user status. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleSendPasswordReset = async (email: string) => {
    try {
      // This would normally be an API call
      toast({
        title: 'Password reset email sent',
        description: 'A password reset link has been sent to the user\'s email.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to send password reset email. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const resetForm = () => {
    setSelectedUser(null);
    setFormData({
      name: '',
      email: '',
      role: 'USER',
      password: '',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight dark:text-gray-100">Users</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {selectedUser ? 'Edit User' : 'Add New User'}
              </DialogTitle>
              <DialogDescription>
                Fill in the details below to {selectedUser ? 'update' : 'create'} a user.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="role">Role</Label>
                  <Select
                    value={formData.role}
                    onValueChange={(value) =>
                      setFormData({ ...formData, role: value as 'ADMIN' | 'INSTRUCTOR' | 'USER' })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ADMIN">Admin</SelectItem>
                      <SelectItem value="INSTRUCTOR">Instructor</SelectItem>
                      <SelectItem value="USER">User</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {!selectedUser && (
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      required={!selectedUser}
                    />
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button type="submit">
                  {selectedUser ? 'Update User' : 'Create User'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center space-x-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <div className="rounded-md border dark:border-gray-700">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Enrolled Courses</TableHead>
              <TableHead>Last Login</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium dark:text-gray-100">
                  {user.name}
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                      user.role === 'ADMIN'
                        ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
                        : user.role === 'INSTRUCTOR'
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                        : 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400'
                    }`}
                  >
                    {user.role}
                  </span>
                </TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                      user.status === 'active'
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                    }`}
                  >
                    {user.status}
                  </span>
                </TableCell>
                <TableCell>{user.enrolledCourses}</TableCell>
                <TableCell>{user.lastLogin}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(user)}
                    title="Edit user"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleSendPasswordReset(user.email)}
                    title="Send password reset"
                  >
                    <Mail className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleToggleStatus(user.id, user.status)}
                    title={user.status === 'active' ? 'Deactivate user' : 'Activate user'}
                  >
                    <Ban className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(user.id)}
                    title="Delete user"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
} 