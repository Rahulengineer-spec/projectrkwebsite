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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Clock,
  Bell,
  AlertCircle,
  Save,
  Calendar,
  Building2,
} from "lucide-react";

export default function AttendanceSettings() {
  const [settings, setSettings] = useState({
    // General Settings
    enableAttendance: true,
    requireCheckIn: true,
    requireCheckOut: false,
    allowLateCheckIn: true,
    lateCheckInThreshold: "15",
    autoMarkAbsent: true,
    autoMarkAbsentTime: "09:30",

    // Notification Settings
    sendAbsenceNotifications: true,
    sendLateNotifications: true,
    notifyBeforeClass: true,
    notificationTime: "30",

    // Policy Settings
    minimumAttendance: "75",
    warningThreshold: "70",
    allowExcusedAbsences: true,
    maxExcusedAbsences: "3",
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSaveSettings = () => {
    // TODO: Implement save functionality
    console.log("Saving settings:", settings);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Attendance Settings</h1>
          <p className="text-muted-foreground">
            Configure attendance rules and policies
          </p>
        </div>
        <Button onClick={handleSaveSettings}>
          <Save className="mr-2 h-4 w-4" />
          Save Settings
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General Settings</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="policy">Policy Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Configure basic attendance tracking settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="enableAttendance">Enable Attendance Tracking</Label>
                  <Switch
                    id="enableAttendance"
                    checked={settings.enableAttendance}
                    onCheckedChange={(checked) =>
                      handleSettingChange("enableAttendance", checked)
                    }
                  />
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="requireCheckIn">Require Check-in</Label>
                  <Switch
                    id="requireCheckIn"
                    checked={settings.requireCheckIn}
                    onCheckedChange={(checked) =>
                      handleSettingChange("requireCheckIn", checked)
                    }
                  />
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="requireCheckOut">Require Check-out</Label>
                  <Switch
                    id="requireCheckOut"
                    checked={settings.requireCheckOut}
                    onCheckedChange={(checked) =>
                      handleSettingChange("requireCheckOut", checked)
                    }
                  />
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="allowLateCheckIn">Allow Late Check-in</Label>
                  <Switch
                    id="allowLateCheckIn"
                    checked={settings.allowLateCheckIn}
                    onCheckedChange={(checked) =>
                      handleSettingChange("allowLateCheckIn", checked)
                    }
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="lateCheckInThreshold">Late Check-in Threshold (minutes)</Label>
                  <Input
                    id="lateCheckInThreshold"
                    type="number"
                    value={settings.lateCheckInThreshold}
                    onChange={(e) =>
                      handleSettingChange("lateCheckInThreshold", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="autoMarkAbsentTime">Auto Mark Absent Time</Label>
                  <Input
                    id="autoMarkAbsentTime"
                    type="time"
                    value={settings.autoMarkAbsentTime}
                    onChange={(e) =>
                      handleSettingChange("autoMarkAbsentTime", e.target.value)
                    }
                  />
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
                Configure attendance-related notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="sendAbsenceNotifications">Send Absence Notifications</Label>
                  <Switch
                    id="sendAbsenceNotifications"
                    checked={settings.sendAbsenceNotifications}
                    onCheckedChange={(checked) =>
                      handleSettingChange("sendAbsenceNotifications", checked)
                    }
                  />
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="sendLateNotifications">Send Late Notifications</Label>
                  <Switch
                    id="sendLateNotifications"
                    checked={settings.sendLateNotifications}
                    onCheckedChange={(checked) =>
                      handleSettingChange("sendLateNotifications", checked)
                    }
                  />
                </div>
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="notifyBeforeClass">Notify Before Class</Label>
                  <Switch
                    id="notifyBeforeClass"
                    checked={settings.notifyBeforeClass}
                    onCheckedChange={(checked) =>
                      handleSettingChange("notifyBeforeClass", checked)
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notificationTime">Notification Time (minutes before class)</Label>
                <Input
                  id="notificationTime"
                  type="number"
                  value={settings.notificationTime}
                  onChange={(e) =>
                    handleSettingChange("notificationTime", e.target.value)
                  }
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="policy">
          <Card>
            <CardHeader>
              <CardTitle>Policy Settings</CardTitle>
              <CardDescription>
                Configure attendance policies and thresholds
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="minimumAttendance">Minimum Attendance Required (%)</Label>
                  <Input
                    id="minimumAttendance"
                    type="number"
                    value={settings.minimumAttendance}
                    onChange={(e) =>
                      handleSettingChange("minimumAttendance", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="warningThreshold">Warning Threshold (%)</Label>
                  <Input
                    id="warningThreshold"
                    type="number"
                    value={settings.warningThreshold}
                    onChange={(e) =>
                      handleSettingChange("warningThreshold", e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="allowExcusedAbsences">Allow Excused Absences</Label>
                  <Switch
                    id="allowExcusedAbsences"
                    checked={settings.allowExcusedAbsences}
                    onCheckedChange={(checked) =>
                      handleSettingChange("allowExcusedAbsences", checked)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxExcusedAbsences">Maximum Excused Absences</Label>
                  <Input
                    id="maxExcusedAbsences"
                    type="number"
                    value={settings.maxExcusedAbsences}
                    onChange={(e) =>
                      handleSettingChange("maxExcusedAbsences", e.target.value)
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 