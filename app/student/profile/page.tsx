'use client';

import React from 'react';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Edit2, Save, X, Plus, Trash2, Upload } from 'lucide-react';
import { FileUpload } from '@/components/ui/file-upload';
import { toast } from 'sonner';

interface Profile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  bio: string;
  education: {
    id: string;
    degree: string;
    institution: string;
    year: string;
  }[];
  skills: string[];
  courses: {
    id: string;
    name: string;
    progress: number;
  }[];
  achievements: {
    id: string;
    title: string;
    description: string;
    date: string;
  }[];
}

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<Partial<Profile>>({});
  const [newSkill, setNewSkill] = useState('');
  const [newEducation, setNewEducation] = useState({
    degree: '',
    institution: '',
    year: '',
  });
  const [newAchievement, setNewAchievement] = useState({
    title: '',
    description: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/student/profile');
        const data = await response.json();
        setProfile(data);
        setEditedProfile(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleSave = async () => {
    try {
      const response = await fetch('/api/student/profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedProfile),
      });

      if (response.ok) {
        const updatedProfile = await response.json();
        setProfile(updatedProfile);
        setIsEditing(false);
        toast.success('Profile updated successfully');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    }
  };

  const handlePhotoUpload = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('photo', file);

      const response = await fetch('/api/student/profile/photo', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setProfile((prev) => prev ? { ...prev, avatar: data.avatarUrl } : null);
        setEditedProfile((prev) => ({ ...prev, avatar: data.avatarUrl }));
        toast.success('Photo uploaded successfully');
      }
    } catch (error) {
      console.error('Error uploading photo:', error);
      toast.error('Failed to upload photo');
    }
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !editedProfile.skills?.includes(newSkill.trim())) {
      setEditedProfile((prev) => ({
        ...prev,
        skills: [...(prev.skills || []), newSkill.trim()],
      }));
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setEditedProfile((prev) => ({
      ...prev,
      skills: prev.skills?.filter((skill) => skill !== skillToRemove) || [],
    }));
  };

  const handleAddEducation = () => {
    if (newEducation.degree && newEducation.institution && newEducation.year) {
      setEditedProfile((prev) => ({
        ...prev,
        education: [
          ...(prev.education || []),
          { id: Date.now().toString(), ...newEducation },
        ],
      }));
      setNewEducation({ degree: '', institution: '', year: '' });
    }
  };

  const handleRemoveEducation = (id: string) => {
    setEditedProfile((prev) => ({
      ...prev,
      education: prev.education?.filter((edu) => edu.id !== id) || [],
    }));
  };

  const handleAddAchievement = () => {
    if (newAchievement.title && newAchievement.description) {
      setEditedProfile((prev) => ({
        ...prev,
        achievements: [
          ...(prev.achievements || []),
          {
            id: Date.now().toString(),
            ...newAchievement,
            date: new Date().toISOString(),
          },
        ],
      }));
      setNewAchievement({ title: '', description: '' });
    }
  };

  const handleRemoveAchievement = (id: string) => {
    setEditedProfile((prev) => ({
      ...prev,
      achievements: prev.achievements?.filter((achievement) => achievement.id !== id) || [],
    }));
  };

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Profile</h1>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)}>
            <Edit2 className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
        ) : (
          <div className="space-x-2">
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="w-32 h-32 rounded-full object-cover"
                  />
                  {isEditing && (
                    <div className="absolute bottom-0 right-0">
                      <FileUpload
                        onUpload={handlePhotoUpload}
                        accept={{ 'image/*': ['.png', '.jpg', '.jpeg', '.gif'] }}
                        maxSize={5 * 1024 * 1024}
                        className="w-10 h-10"
                      />
                    </div>
                  )}
                </div>
                {isEditing ? (
                  <>
                    <Input
                      value={editedProfile.name || ''}
                      onChange={(e) =>
                        setEditedProfile({ ...editedProfile, name: e.target.value })
                      }
                      placeholder="Name"
                    />
                    <Input
                      value={editedProfile.email || ''}
                      onChange={(e) =>
                        setEditedProfile({ ...editedProfile, email: e.target.value })
                      }
                      placeholder="Email"
                    />
                    <Input
                      value={editedProfile.phone || ''}
                      onChange={(e) =>
                        setEditedProfile({ ...editedProfile, phone: e.target.value })
                      }
                      placeholder="Phone"
                    />
                  </>
                ) : (
                  <>
                    <h2 className="text-xl font-semibold">{profile.name}</h2>
                    <p className="text-gray-500">{profile.email}</p>
                    <p className="text-gray-500">{profile.phone}</p>
                  </>
                )}
              </div>
              <div>
                <h3 className="font-medium mb-2">Bio</h3>
                {isEditing ? (
                  <Textarea
                    value={editedProfile.bio || ''}
                    onChange={(e) =>
                      setEditedProfile({ ...editedProfile, bio: e.target.value })
                    }
                    placeholder="Write something about yourself..."
                  />
                ) : (
                  <p className="text-gray-600">{profile.bio}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Education</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {(isEditing ? editedProfile.education : profile.education)?.map((edu) => (
                  <div key={edu.id} className="border-b pb-4 last:border-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{edu.degree}</h3>
                        <p className="text-gray-600">{edu.institution}</p>
                        <p className="text-gray-500">{edu.year}</p>
                      </div>
                      {isEditing && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveEducation(edu.id)}
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
                {isEditing && (
                  <div className="space-y-2 pt-4">
                    <Input
                      value={newEducation.degree}
                      onChange={(e) =>
                        setNewEducation({ ...newEducation, degree: e.target.value })
                      }
                      placeholder="Degree"
                    />
                    <Input
                      value={newEducation.institution}
                      onChange={(e) =>
                        setNewEducation({ ...newEducation, institution: e.target.value })
                      }
                      placeholder="Institution"
                    />
                    <Input
                      value={newEducation.year}
                      onChange={(e) =>
                        setNewEducation({ ...newEducation, year: e.target.value })
                      }
                      placeholder="Year"
                    />
                    <Button onClick={handleAddEducation} className="w-full">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Education
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {(isEditing ? editedProfile.skills : profile.skills)?.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center gap-2">
                      {skill}
                      {isEditing && (
                        <button
                          onClick={() => handleRemoveSkill(skill)}
                          className="hover:text-red-500"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </Badge>
                  ))}
                </div>
                {isEditing && (
                  <div className="flex gap-2">
                    <Input
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      placeholder="Add a skill"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleAddSkill();
                        }
                      }}
                    />
                    <Button onClick={handleAddSkill}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Current Courses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {profile.courses.map((course) => (
                  <div key={course.id} className="border-b pb-4 last:border-0">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold">{course.name}</h3>
                      <span className="text-sm text-gray-500">
                        {course.progress}% Complete
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {(isEditing ? editedProfile.achievements : profile.achievements)?.map((achievement) => (
                  <div key={achievement.id} className="border-b pb-4 last:border-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{achievement.title}</h3>
                        <p className="text-gray-600">{achievement.description}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(achievement.date).toLocaleDateString()}
                        </p>
                      </div>
                      {isEditing && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveAchievement(achievement.id)}
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
                {isEditing && (
                  <div className="space-y-2 pt-4">
                    <Input
                      value={newAchievement.title}
                      onChange={(e) =>
                        setNewAchievement({ ...newAchievement, title: e.target.value })
                      }
                      placeholder="Achievement Title"
                    />
                    <Textarea
                      value={newAchievement.description}
                      onChange={(e) =>
                        setNewAchievement({ ...newAchievement, description: e.target.value })
                      }
                      placeholder="Achievement Description"
                    />
                    <Button onClick={handleAddAchievement} className="w-full">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Achievement
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 