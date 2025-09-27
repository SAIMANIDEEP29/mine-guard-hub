import { useState } from "react";
import { 
  User, 
  Bell, 
  Monitor, 
  Shield, 
  Database, 
  Download,
  Save,
  Camera,
  Edit
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

export default function Settings() {
  const { toast } = useToast();
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Smith",
    email: "john.smith@company.com",
    phone: "+1 (555) 123-4567",
    jobTitle: "Mining Safety Engineer",
    department: "Safety & Risk Management",
    bio: "Experienced mining safety engineer with 15 years in geological risk assessment and rockfall prediction systems."
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailAlerts: true,
    smsAlerts: false,
    pushNotifications: true,
    weeklyReports: true,
    systemMaintenance: true,
    highRiskAlerts: true,
    weatherUpdates: true
  });

  const [systemSettings, setSystemSettings] = useState({
    language: "en",
    timezone: "UTC-8",
    dateFormat: "MM/DD/YYYY",
    theme: "system",
    autoSave: true,
    dataRetention: "1year"
  });

  const handleSaveProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
    });
  };

  const handleSaveNotifications = () => {
    toast({
      title: "Notification Settings Updated", 
      description: "Your notification preferences have been saved.",
    });
  };

  const handleSaveSystem = () => {
    toast({
      title: "System Settings Updated",
      description: "Your system preferences have been applied.",
    });
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your account and system preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Settings */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Avatar Section */}
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src="" alt="Profile" />
                <AvatarFallback className="text-lg">JS</AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <Button variant="outline" className="gap-2">
                  <Camera className="h-4 w-4" />
                  Change Photo
                </Button>
                <p className="text-xs text-muted-foreground">
                  JPG, PNG or GIF. Max size 2MB.
                </p>
              </div>
            </div>

            <Separator />

            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input 
                  id="firstName"
                  value={profileData.firstName}
                  onChange={(e) => setProfileData(prev => ({...prev, firstName: e.target.value}))}
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input 
                  id="lastName"
                  value={profileData.lastName}
                  onChange={(e) => setProfileData(prev => ({...prev, lastName: e.target.value}))}
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email"
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData(prev => ({...prev, email: e.target.value}))}
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input 
                  id="phone"
                  value={profileData.phone}
                  onChange={(e) => setProfileData(prev => ({...prev, phone: e.target.value}))}
                />
              </div>
              <div>
                <Label htmlFor="jobTitle">Job Title</Label>
                <Input 
                  id="jobTitle"
                  value={profileData.jobTitle}
                  onChange={(e) => setProfileData(prev => ({...prev, jobTitle: e.target.value}))}
                />
              </div>
              <div>
                <Label htmlFor="department">Department</Label>
                <Input 
                  id="department"
                  value={profileData.department}
                  onChange={(e) => setProfileData(prev => ({...prev, department: e.target.value}))}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea 
                id="bio"
                value={profileData.bio}
                onChange={(e) => setProfileData(prev => ({...prev, bio: e.target.value}))}
                rows={3}
              />
            </div>

            <Button onClick={handleSaveProfile} className="gap-2">
              <Save className="h-4 w-4" />
              Save Profile
            </Button>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full gap-2">
              <Download className="h-4 w-4" />
              Export Data
            </Button>
            <Button variant="outline" className="w-full gap-2">
              <Database className="h-4 w-4" />
              Backup Settings
            </Button>
            <Button variant="outline" className="w-full gap-2">
              <Shield className="h-4 w-4" />
              Security Log
            </Button>
            <Separator />
            <div className="space-y-2">
              <h3 className="font-semibold text-sm">Account Status</h3>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>✓ Email verified</p>
                <p>✓ Phone verified</p>
                <p>✓ 2FA enabled</p>
                <p>✓ Last login: Today</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="emailAlerts">Email Alerts</Label>
                <Switch 
                  id="emailAlerts"
                  checked={notificationSettings.emailAlerts}
                  onCheckedChange={(checked) => setNotificationSettings(prev => ({...prev, emailAlerts: checked}))}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="smsAlerts">SMS Alerts</Label>
                <Switch 
                  id="smsAlerts"
                  checked={notificationSettings.smsAlerts}
                  onCheckedChange={(checked) => setNotificationSettings(prev => ({...prev, smsAlerts: checked}))}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="pushNotifications">Push Notifications</Label>
                <Switch 
                  id="pushNotifications"
                  checked={notificationSettings.pushNotifications}
                  onCheckedChange={(checked) => setNotificationSettings(prev => ({...prev, pushNotifications: checked}))}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="highRiskAlerts">High Risk Alerts</Label>
                <Switch 
                  id="highRiskAlerts"
                  checked={notificationSettings.highRiskAlerts}
                  onCheckedChange={(checked) => setNotificationSettings(prev => ({...prev, highRiskAlerts: checked}))}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="weeklyReports">Weekly Reports</Label>
                <Switch 
                  id="weeklyReports"
                  checked={notificationSettings.weeklyReports}
                  onCheckedChange={(checked) => setNotificationSettings(prev => ({...prev, weeklyReports: checked}))}
                />
              </div>
            </div>
            <Button onClick={handleSaveNotifications} variant="outline" className="w-full">
              Save Notifications
            </Button>
          </CardContent>
        </Card>

        {/* System Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Monitor className="h-5 w-5" />
              System Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="language">Language</Label>
              <Select value={systemSettings.language} onValueChange={(value) => setSystemSettings(prev => ({...prev, language: value}))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="timezone">Timezone</Label>
              <Select value={systemSettings.timezone} onValueChange={(value) => setSystemSettings(prev => ({...prev, timezone: value}))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="UTC-8">Pacific Time (UTC-8)</SelectItem>
                  <SelectItem value="UTC-5">Eastern Time (UTC-5)</SelectItem>
                  <SelectItem value="UTC">UTC</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="dateFormat">Date Format</Label>
              <Select value={systemSettings.dateFormat} onValueChange={(value) => setSystemSettings(prev => ({...prev, dateFormat: value}))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                  <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                  <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="darkMode">Dark Mode</Label>
              <Switch 
                id="darkMode"
                checked={isDarkMode}
                onCheckedChange={toggleTheme}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="autoSave">Auto-save</Label>
              <Switch 
                id="autoSave"
                checked={systemSettings.autoSave}
                onCheckedChange={(checked) => setSystemSettings(prev => ({...prev, autoSave: checked}))}
              />
            </div>
            <Button onClick={handleSaveSystem} variant="outline" className="w-full">
              Save System Settings
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}