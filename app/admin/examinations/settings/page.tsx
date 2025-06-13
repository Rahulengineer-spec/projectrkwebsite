'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save } from "lucide-react";

export default function ExamSettings() {
  const [settings, setSettings] = useState({
    general: {
      enableExamScheduling: true,
      allowRescheduling: true,
      maxRescheduleAttempts: 2,
      requireProctor: true,
      allowLateSubmission: false,
      lateSubmissionPenalty: 10,
      examDuration: 180,
      breakDuration: 15,
    },
    grading: {
      passingPercentage: 40,
      gradeScale: "standard",
      enableNegativeMarking: false,
      negativeMarkingPercentage: 25,
      enablePartialMarking: true,
      enableAutoGrading: true,
      requireManualReview: true,
    },
    notifications: {
      sendExamReminders: true,
      reminderDays: [7, 3, 1],
      sendResultNotifications: true,
      notifyInstructors: true,
      notifyStudents: true,
      customNotificationMessage: "",
    },
    security: {
      requirePassword: true,
      enableBrowserLock: true,
      enableWebcamMonitoring: true,
      enableScreenRecording: false,
      allowCopyPaste: false,
      allowMultipleTabs: false,
      requireFullScreen: true,
    },
  });

  const handleSettingChange = (section, key, value) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  const handleSave = () => {
    // TODO: Implement save functionality
    console.log("Saving settings:", settings);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Exam Settings</h1>
        <p className="text-muted-foreground">
          Configure examination settings and preferences
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="grading">Grading</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Configure basic examination settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="enableExamScheduling">Enable Exam Scheduling</Label>
                    <Switch
                      id="enableExamScheduling"
                      checked={settings.general.enableExamScheduling}
                      onCheckedChange={(checked) =>
                        handleSettingChange("general", "enableExamScheduling", checked)
                      }
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="allowRescheduling">Allow Rescheduling</Label>
                    <Switch
                      id="allowRescheduling"
                      checked={settings.general.allowRescheduling}
                      onCheckedChange={(checked) =>
                        handleSettingChange("general", "allowRescheduling", checked)
                      }
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxRescheduleAttempts">Max Reschedule Attempts</Label>
                  <Input
                    id="maxRescheduleAttempts"
                    type="number"
                    value={settings.general.maxRescheduleAttempts}
                    onChange={(e) =>
                      handleSettingChange(
                        "general",
                        "maxRescheduleAttempts",
                        parseInt(e.target.value)
                      )
                    }
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="requireProctor">Require Proctor</Label>
                    <Switch
                      id="requireProctor"
                      checked={settings.general.requireProctor}
                      onCheckedChange={(checked) =>
                        handleSettingChange("general", "requireProctor", checked)
                      }
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="allowLateSubmission">Allow Late Submission</Label>
                    <Switch
                      id="allowLateSubmission"
                      checked={settings.general.allowLateSubmission}
                      onCheckedChange={(checked) =>
                        handleSettingChange("general", "allowLateSubmission", checked)
                      }
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lateSubmissionPenalty">Late Submission Penalty (%)</Label>
                  <Input
                    id="lateSubmissionPenalty"
                    type="number"
                    value={settings.general.lateSubmissionPenalty}
                    onChange={(e) =>
                      handleSettingChange(
                        "general",
                        "lateSubmissionPenalty",
                        parseInt(e.target.value)
                      )
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="examDuration">Default Exam Duration (minutes)</Label>
                  <Input
                    id="examDuration"
                    type="number"
                    value={settings.general.examDuration}
                    onChange={(e) =>
                      handleSettingChange(
                        "general",
                        "examDuration",
                        parseInt(e.target.value)
                      )
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="breakDuration">Break Duration (minutes)</Label>
                  <Input
                    id="breakDuration"
                    type="number"
                    value={settings.general.breakDuration}
                    onChange={(e) =>
                      handleSettingChange(
                        "general",
                        "breakDuration",
                        parseInt(e.target.value)
                      )
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="grading">
          <Card>
            <CardHeader>
              <CardTitle>Grading Settings</CardTitle>
              <CardDescription>
                Configure examination grading rules and policies
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="passingPercentage">Passing Percentage</Label>
                  <Input
                    id="passingPercentage"
                    type="number"
                    value={settings.grading.passingPercentage}
                    onChange={(e) =>
                      handleSettingChange(
                        "grading",
                        "passingPercentage",
                        parseInt(e.target.value)
                      )
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gradeScale">Grade Scale</Label>
                  <Select
                    value={settings.grading.gradeScale}
                    onValueChange={(value) =>
                      handleSettingChange("grading", "gradeScale", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select grade scale" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard (A-F)</SelectItem>
                      <SelectItem value="percentage">Percentage</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="enableNegativeMarking">Enable Negative Marking</Label>
                    <Switch
                      id="enableNegativeMarking"
                      checked={settings.grading.enableNegativeMarking}
                      onCheckedChange={(checked) =>
                        handleSettingChange("grading", "enableNegativeMarking", checked)
                      }
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="negativeMarkingPercentage">Negative Marking (%)</Label>
                  <Input
                    id="negativeMarkingPercentage"
                    type="number"
                    value={settings.grading.negativeMarkingPercentage}
                    onChange={(e) =>
                      handleSettingChange(
                        "grading",
                        "negativeMarkingPercentage",
                        parseInt(e.target.value)
                      )
                    }
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="enablePartialMarking">Enable Partial Marking</Label>
                    <Switch
                      id="enablePartialMarking"
                      checked={settings.grading.enablePartialMarking}
                      onCheckedChange={(checked) =>
                        handleSettingChange("grading", "enablePartialMarking", checked)
                      }
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="enableAutoGrading">Enable Auto Grading</Label>
                    <Switch
                      id="enableAutoGrading"
                      checked={settings.grading.enableAutoGrading}
                      onCheckedChange={(checked) =>
                        handleSettingChange("grading", "enableAutoGrading", checked)
                      }
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="requireManualReview">Require Manual Review</Label>
                    <Switch
                      id="requireManualReview"
                      checked={settings.grading.requireManualReview}
                      onCheckedChange={(checked) =>
                        handleSettingChange("grading", "requireManualReview", checked)
                      }
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure examination notifications and alerts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="sendExamReminders">Send Exam Reminders</Label>
                    <Switch
                      id="sendExamReminders"
                      checked={settings.notifications.sendExamReminders}
                      onCheckedChange={(checked) =>
                        handleSettingChange("notifications", "sendExamReminders", checked)
                      }
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reminderDays">Reminder Days</Label>
                  <Input
                    id="reminderDays"
                    value={settings.notifications.reminderDays.join(", ")}
                    onChange={(e) =>
                      handleSettingChange(
                        "notifications",
                        "reminderDays",
                        e.target.value.split(",").map((day) => parseInt(day.trim()))
                      )
                    }
                    placeholder="e.g., 7, 3, 1"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="sendResultNotifications">Send Result Notifications</Label>
                    <Switch
                      id="sendResultNotifications"
                      checked={settings.notifications.sendResultNotifications}
                      onCheckedChange={(checked) =>
                        handleSettingChange(
                          "notifications",
                          "sendResultNotifications",
                          checked
                        )
                      }
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="notifyInstructors">Notify Instructors</Label>
                    <Switch
                      id="notifyInstructors"
                      checked={settings.notifications.notifyInstructors}
                      onCheckedChange={(checked) =>
                        handleSettingChange("notifications", "notifyInstructors", checked)
                      }
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="notifyStudents">Notify Students</Label>
                    <Switch
                      id="notifyStudents"
                      checked={settings.notifications.notifyStudents}
                      onCheckedChange={(checked) =>
                        handleSettingChange("notifications", "notifyStudents", checked)
                      }
                    />
                  </div>
                </div>
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="customNotificationMessage">Custom Notification Message</Label>
                  <Textarea
                    id="customNotificationMessage"
                    value={settings.notifications.customNotificationMessage}
                    onChange={(e) =>
                      handleSettingChange(
                        "notifications",
                        "customNotificationMessage",
                        e.target.value
                      )
                    }
                    placeholder="Enter custom notification message template..."
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Configure examination security measures
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="requirePassword">Require Password</Label>
                    <Switch
                      id="requirePassword"
                      checked={settings.security.requirePassword}
                      onCheckedChange={(checked) =>
                        handleSettingChange("security", "requirePassword", checked)
                      }
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="enableBrowserLock">Enable Browser Lock</Label>
                    <Switch
                      id="enableBrowserLock"
                      checked={settings.security.enableBrowserLock}
                      onCheckedChange={(checked) =>
                        handleSettingChange("security", "enableBrowserLock", checked)
                      }
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="enableWebcamMonitoring">Enable Webcam Monitoring</Label>
                    <Switch
                      id="enableWebcamMonitoring"
                      checked={settings.security.enableWebcamMonitoring}
                      onCheckedChange={(checked) =>
                        handleSettingChange("security", "enableWebcamMonitoring", checked)
                      }
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="enableScreenRecording">Enable Screen Recording</Label>
                    <Switch
                      id="enableScreenRecording"
                      checked={settings.security.enableScreenRecording}
                      onCheckedChange={(checked) =>
                        handleSettingChange("security", "enableScreenRecording", checked)
                      }
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="allowCopyPaste">Allow Copy/Paste</Label>
                    <Switch
                      id="allowCopyPaste"
                      checked={settings.security.allowCopyPaste}
                      onCheckedChange={(checked) =>
                        handleSettingChange("security", "allowCopyPaste", checked)
                      }
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="allowMultipleTabs">Allow Multiple Tabs</Label>
                    <Switch
                      id="allowMultipleTabs"
                      checked={settings.security.allowMultipleTabs}
                      onCheckedChange={(checked) =>
                        handleSettingChange("security", "allowMultipleTabs", checked)
                      }
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="requireFullScreen">Require Full Screen</Label>
                    <Switch
                      id="requireFullScreen"
                      checked={settings.security.requireFullScreen}
                      onCheckedChange={(checked) =>
                        handleSettingChange("security", "requireFullScreen", checked)
                      }
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" />
          Save Settings
        </Button>
      </div>
    </div>
  );
} 