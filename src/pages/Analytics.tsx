import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  TrendingUp, 
  Activity, 
  AlertTriangle, 
  Cloud, 
  Calendar,
  Download
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Demo data for charts
const rainfallVsRiskData = [
  { month: "Jan", rainfall: 45, risk: 2, incidents: 1 },
  { month: "Feb", rainfall: 38, risk: 3, incidents: 2 },
  { month: "Mar", rainfall: 62, risk: 5, incidents: 4 },
  { month: "Apr", rainfall: 78, risk: 7, incidents: 6 },
  { month: "May", rainfall: 95, risk: 9, incidents: 8 },
  { month: "Jun", rainfall: 120, risk: 12, incidents: 11 },
];

const blastVsRockfallData = [
  { sector: "A-1", blasts: 8, rockfalls: 3 },
  { sector: "A-2", blasts: 12, rockfalls: 7 },
  { sector: "B-1", blasts: 6, rockfalls: 2 },
  { sector: "B-2", blasts: 15, rockfalls: 9 },
  { sector: "C-1", blasts: 10, rockfalls: 4 },
  { sector: "C-2", blasts: 7, rockfalls: 1 },
];

const riskDistributionData = [
  { name: "Low Risk", value: 45, color: "#22c55e" },
  { name: "Medium Risk", value: 35, color: "#f59e0b" },
  { name: "High Risk", value: 20, color: "#ef4444" },
];

const weeklyTrendsData = [
  { day: "Mon", alerts: 3, inspections: 5, incidents: 1 },
  { day: "Tue", alerts: 7, inspections: 3, incidents: 2 },
  { day: "Wed", alerts: 5, inspections: 8, incidents: 0 },
  { day: "Thu", alerts: 9, inspections: 6, incidents: 3 },
  { day: "Fri", alerts: 4, inspections: 4, incidents: 1 },
  { day: "Sat", alerts: 2, inspections: 2, incidents: 0 },
  { day: "Sun", alerts: 1, inspections: 1, incidents: 0 },
];

export default function Analytics() {
  const stats = [
    {
      title: "Total Risk Events",
      value: "247",
      change: "+12%",
      icon: AlertTriangle,
      trend: "up"
    },
    {
      title: "Average Risk Level",
      value: "6.2",
      change: "-5%",
      icon: Activity,
      trend: "down"
    },
    {
      title: "Weather Alerts",
      value: "23",
      change: "+8%",
      icon: Cloud,
      trend: "up"
    },
    {
      title: "Inspections",
      value: "156",
      change: "+23%",
      icon: Calendar,
      trend: "up"
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Comprehensive risk analysis and trends</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="30days">
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="1year">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-elegant transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={`text-xs ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {stat.change} from last period
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Rainfall vs Risk Correlation */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Rainfall vs Risk Correlation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={rainfallVsRiskData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="rainfall" 
                  stroke="hsl(var(--primary))" 
                  fill="hsl(var(--primary) / 0.2)" 
                  strokeWidth={2}
                />
                <Area 
                  type="monotone" 
                  dataKey="risk" 
                  stroke="hsl(var(--danger))" 
                  fill="hsl(var(--danger) / 0.2)" 
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Blasts vs Rockfalls */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Blasts vs Rockfall Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={blastVsRockfallData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="sector" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }} 
                />
                <Bar dataKey="blasts" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="rockfalls" fill="hsl(var(--danger))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Risk Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Risk Level Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={riskDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {riskDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-4">
              {riskDistributionData.map((entry, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: entry.color }}
                  />
                  <span className="text-sm">{entry.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Weekly Activity Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Weekly Activity Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyTrendsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="alerts" 
                  stroke="hsl(var(--danger))" 
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--danger))", strokeWidth: 2, r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="inspections" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="incidents" 
                  stroke="hsl(var(--caution))" 
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--caution))", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Insights Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Key Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-gradient-earth">
              <h3 className="font-semibold text-sm mb-2">Rainfall Correlation</h3>
              <p className="text-sm text-muted-foreground">
                Strong positive correlation (0.87) between rainfall and risk incidents. 
                Consider enhanced monitoring during high precipitation periods.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-gradient-earth">
              <h3 className="font-semibold text-sm mb-2">Peak Risk Times</h3>
              <p className="text-sm text-muted-foreground">
                Thursday shows highest alert frequency. Review staffing and 
                monitoring protocols for mid-week operations.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-gradient-earth">
              <h3 className="font-semibold text-sm mb-2">Sector Performance</h3>
              <p className="text-sm text-muted-foreground">
                Sector B-2 shows highest blast-to-rockfall ratio. 
                Recommend geological assessment and blast optimization.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}