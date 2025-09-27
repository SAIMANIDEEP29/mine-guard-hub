import { useState } from "react";
import { 
  Bell, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Settings, 
  Mail, 
  MessageSquare,
  Smartphone,
  Filter,
  Search
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Demo data
const alertsData = [
  {
    id: 1,
    type: "High Risk Warning",
    message: "Sector A-1 showing elevated risk levels due to heavy rainfall",
    severity: "high",
    status: "active",
    sector: "A-1",
    timestamp: "2024-01-15 14:30",
    acknowledged: false
  },
  {
    id: 2,
    type: "Weather Alert",
    message: "Heavy rain forecast for next 24 hours across all sectors",
    severity: "medium",
    status: "active", 
    sector: "All Sectors",
    timestamp: "2024-01-15 09:15",
    acknowledged: true
  },
  {
    id: 3,
    type: "Equipment Check",
    message: "Monitoring station B-2 requires maintenance",
    severity: "low",
    status: "resolved",
    sector: "B-2",
    timestamp: "2024-01-14 16:45",
    acknowledged: true
  },
  {
    id: 4,
    type: "Blast Notification",
    message: "Scheduled blast in Sector C-3 completed successfully",
    severity: "info",
    status: "resolved",
    sector: "C-3", 
    timestamp: "2024-01-14 11:20",
    acknowledged: true
  },
  {
    id: 5,
    type: "Risk Threshold",
    message: "Sector B-1 approaching risk threshold - monitoring recommended",
    severity: "medium",
    status: "active",
    sector: "B-1",
    timestamp: "2024-01-13 08:30",
    acknowledged: false
  }
];

const notificationPreferences = {
  email: true,
  sms: false,
  push: true,
  highRisk: true,
  mediumRisk: true,
  lowRisk: false,
  weather: true,
  equipment: true,
  blasts: false
};

export default function Alerts() {
  const [alerts, setAlerts] = useState(alertsData);
  const [preferences, setPreferences] = useState(notificationPreferences);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const getSeverityBadgeVariant = (severity: string) => {
    switch (severity) {
      case "high": return "danger";
      case "medium": return "caution";
      case "low": return "safe";
      case "info": return "default";
      default: return "default";
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "active": return "danger";
      case "resolved": return "safe";
      default: return "default";
    }
  };

  const filteredAlerts = alerts.filter(alert => {
    const matchesFilter = filter === "all" || alert.status === filter || alert.severity === filter;
    const matchesSearch = alert.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.sector.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const acknowledgeAlert = (id: number) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === id ? { ...alert, acknowledged: true } : alert
    ));
  };

  const resolveAlert = (id: number) => {
    setAlerts(prev => prev.map(alert =>
      alert.id === id ? { ...alert, status: "resolved" } : alert
    ));
  };

  const updatePreference = (key: string, value: boolean) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Alert Management</h1>
          <p className="text-muted-foreground">Monitor notifications and configure preferences</p>
        </div>
        <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Settings className="h-4 w-4" />
              Notification Settings
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Notification Preferences</DialogTitle>
              <DialogDescription>
                Configure how you want to receive alerts and notifications.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-6">
              {/* Delivery Methods */}
              <div className="space-y-4">
                <h3 className="font-semibold">Delivery Methods</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email Notifications
                    </Label>
                    <Switch 
                      id="email"
                      checked={preferences.email}
                      onCheckedChange={(checked) => updatePreference("email", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="sms" className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" />
                      SMS Alerts
                    </Label>
                    <Switch 
                      id="sms"
                      checked={preferences.sms}
                      onCheckedChange={(checked) => updatePreference("sms", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="push" className="flex items-center gap-2">
                      <Smartphone className="h-4 w-4" />
                      Push Notifications
                    </Label>
                    <Switch 
                      id="push"
                      checked={preferences.push}
                      onCheckedChange={(checked) => updatePreference("push", checked)}
                    />
                  </div>
                </div>
              </div>

              {/* Alert Types */}
              <div className="space-y-4">
                <h3 className="font-semibold">Alert Types</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="high-risk">High Risk Alerts</Label>
                    <Switch 
                      id="high-risk"
                      checked={preferences.highRisk}
                      onCheckedChange={(checked) => updatePreference("highRisk", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="medium-risk">Medium Risk Alerts</Label>
                    <Switch 
                      id="medium-risk"
                      checked={preferences.mediumRisk}
                      onCheckedChange={(checked) => updatePreference("mediumRisk", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="weather">Weather Alerts</Label>
                    <Switch 
                      id="weather"
                      checked={preferences.weather}
                      onCheckedChange={(checked) => updatePreference("weather", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="equipment">Equipment Alerts</Label>
                    <Switch 
                      id="equipment"
                      checked={preferences.equipment}
                      onCheckedChange={(checked) => updatePreference("equipment", checked)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filter & Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search alerts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[180px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Alerts</SelectItem>
            <SelectItem value="active">Active Only</SelectItem>
            <SelectItem value="resolved">Resolved Only</SelectItem>
            <SelectItem value="high">High Priority</SelectItem>
            <SelectItem value="medium">Medium Priority</SelectItem>
            <SelectItem value="low">Low Priority</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Alert Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-danger">
              {alerts.filter(a => a.status === "active").length}
            </div>
            <p className="text-xs text-muted-foreground">Require attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Priority</CardTitle>
            <XCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-danger">
              {alerts.filter(a => a.severity === "high").length}
            </div>
            <p className="text-xs text-muted-foreground">Critical alerts</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved Today</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-safe">
              {alerts.filter(a => a.status === "resolved").length}
            </div>
            <p className="text-xs text-muted-foreground">Completed actions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Acknowledgments</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {alerts.filter(a => a.acknowledged).length}
            </div>
            <p className="text-xs text-muted-foreground">Out of {alerts.length} total</p>
          </CardContent>
        </Card>
      </div>

      {/* Alerts List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Alert History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredAlerts.map((alert) => (
              <div key={alert.id} className="flex items-start justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold">{alert.type}</h3>
                    <Badge variant={getSeverityBadgeVariant(alert.severity) as any}>
                      {alert.severity}
                    </Badge>
                    <Badge variant={getStatusBadgeVariant(alert.status) as any}>
                      {alert.status}
                    </Badge>
                    {alert.acknowledged && (
                      <Badge variant="safe" className="text-xs">
                        Acknowledged
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{alert.message}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>Sector: {alert.sector}</span>
                    <span>Time: {alert.timestamp}</span>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  {!alert.acknowledged && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => acknowledgeAlert(alert.id)}
                    >
                      Acknowledge
                    </Button>
                  )}
                  {alert.status === "active" && (
                    <Button 
                      variant="safe" 
                      size="sm"
                      onClick={() => resolveAlert(alert.id)}
                    >
                      Resolve
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}