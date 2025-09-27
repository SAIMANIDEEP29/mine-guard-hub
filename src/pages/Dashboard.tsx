import { 
  TrendingUp, 
  Shield, 
  AlertTriangle, 
  Cloud, 
  Thermometer,
  Droplets,
  Wind,
  Activity
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import heroImage from "@/assets/hero-mining.jpg";

// Demo data
const riskMetrics = [
  { title: "Overall Risk Status", value: "Medium", status: "caution", icon: Shield },
  { title: "Active Alerts", value: "3", status: "danger", icon: AlertTriangle },
  { title: "Monitoring Stations", value: "12", status: "safe", icon: Activity },
  { title: "Weather Status", value: "Clear", status: "safe", icon: Cloud },
];

const weatherData = {
  temperature: "24°C",
  humidity: "65%",
  rainfall: "0.2mm",
  windSpeed: "15 km/h",
  forecast: "Partly cloudy with light rain expected"
};

const recentAlerts = [
  { id: 1, type: "High Risk", sector: "Sector A-1", time: "10:30 AM", status: "danger" },
  { id: 2, type: "Weather Alert", sector: "All Sectors", time: "09:15 AM", status: "caution" },
  { id: 3, type: "Equipment Check", sector: "Sector B-3", time: "08:45 AM", status: "safe" },
];

const blastLogs = [
  { id: 1, sector: "Sector A-2", time: "14:30", date: "Today", impact: "Low" },
  { id: 2, sector: "Sector C-1", time: "11:15", date: "Today", impact: "Medium" },
  { id: 3, sector: "Sector B-1", time: "16:45", date: "Yesterday", impact: "Low" },
];

export default function Dashboard() {
  const getRiskStatusColor = (status: string) => {
    switch (status) {
      case "safe": return "safe";
      case "caution": return "caution";
      case "danger": return "danger";
      default: return "default";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Hero Section */}
      <div 
        className="relative rounded-lg overflow-hidden h-48 bg-gradient-primary"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Mining Safety Dashboard</h2>
            <p className="text-white/90 text-lg">Real-time monitoring and risk assessment</p>
          </div>
        </div>
      </div>

      {/* Risk Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {riskMetrics.map((metric, index) => (
          <Card key={index} className="hover:shadow-elegant transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <metric.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <div className="text-2xl font-bold">{metric.value}</div>
                <Badge variant={getRiskStatusColor(metric.status) as any}>
                  {metric.status}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weather Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Cloud className="h-5 w-5" />
              Weather Conditions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Thermometer className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Temperature: {weatherData.temperature}</span>
              </div>
              <div className="flex items-center gap-2">
                <Droplets className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Humidity: {weatherData.humidity}</span>
              </div>
              <div className="flex items-center gap-2">
                <Cloud className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Rainfall: {weatherData.rainfall}</span>
              </div>
              <div className="flex items-center gap-2">
                <Wind className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Wind: {weatherData.windSpeed}</span>
              </div>
            </div>
            <div className="pt-2 border-t">
              <p className="text-sm text-muted-foreground">{weatherData.forecast}</p>
            </div>
          </CardContent>
        </Card>

        {/* Recent Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Recent Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentAlerts.map((alert) => (
                <div key={alert.id} className="flex items-center justify-between p-2 rounded border">
                  <div>
                    <div className="font-medium text-sm">{alert.type}</div>
                    <div className="text-xs text-muted-foreground">{alert.sector} • {alert.time}</div>
                  </div>
                  <Badge variant={getRiskStatusColor(alert.status) as any} className="text-xs">
                    {alert.status}
                  </Badge>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All Alerts
            </Button>
          </CardContent>
        </Card>

        {/* Blast Logs */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Recent Blast Logs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {blastLogs.map((log) => (
                <div key={log.id} className="flex items-center justify-between p-3 rounded border hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="font-medium">{log.sector}</div>
                    <div className="text-sm text-muted-foreground">{log.date} at {log.time}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">Impact: {log.impact}</span>
                    <Badge variant={log.impact === "Low" ? "safe" : "caution"} className="text-xs">
                      {log.impact}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}