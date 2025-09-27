import { useState } from "react";
import { Plus, MapPin, Users, Activity, Edit, Trash2, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

// Demo data
const minesData = [
  {
    id: 1,
    name: "Copper Valley Mine",
    location: "Northern District",
    coordinates: "34.0522°N, 118.2437°W",
    status: "Active",
    sectors: 12,
    staff: 45,
    riskLevel: "Low",
    lastInspection: "2024-01-15"
  },
  {
    id: 2,
    name: "Iron Ridge Mining",
    location: "Eastern Hills",
    coordinates: "36.1627°N, 115.1179°W",
    status: "Active",
    sectors: 8,
    staff: 32,
    riskLevel: "Medium",
    lastInspection: "2024-01-12"
  },
  {
    id: 3,
    name: "Gold Creek Operations",
    location: "Western Valley",
    coordinates: "39.7392°N, 104.9903°W",
    status: "Maintenance",
    sectors: 15,
    staff: 28,
    riskLevel: "High",
    lastInspection: "2024-01-10"
  },
];

export default function Mines() {
  const [mines, setMines] = useState(minesData);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredMines = mines.filter(mine =>
    mine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mine.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRiskBadgeVariant = (risk: string) => {
    switch (risk.toLowerCase()) {
      case "low": return "safe";
      case "medium": return "caution";
      case "high": return "danger";
      default: return "default";
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case "active": return "safe";
      case "maintenance": return "caution";
      case "inactive": return "danger";
      default: return "default";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Mine Management</h1>
          <p className="text-muted-foreground">Monitor and manage mining operations</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add New Mine
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Mine</DialogTitle>
              <DialogDescription>
                Enter the details for the new mining operation.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Mine Name</Label>
                <Input id="name" placeholder="Enter mine name" />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input id="location" placeholder="Enter location" />
              </div>
              <div>
                <Label htmlFor="coordinates">Coordinates</Label>
                <Input id="coordinates" placeholder="Latitude, Longitude" />
              </div>
              <Button onClick={() => setIsAddDialogOpen(false)} className="w-full">
                Add Mine
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search mines..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Mines</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mines.length}</div>
            <p className="text-xs text-muted-foreground">Active operations</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Staff</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mines.reduce((acc, mine) => acc + mine.staff, 0)}</div>
            <p className="text-xs text-muted-foreground">Across all mines</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sectors</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mines.reduce((acc, mine) => acc + mine.sectors, 0)}</div>
            <p className="text-xs text-muted-foreground">Monitoring zones</p>
          </CardContent>
        </Card>
      </div>

      {/* Mines Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMines.map((mine) => (
          <Card key={mine.id} className="hover:shadow-elegant transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{mine.name}</CardTitle>
                  <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                    <MapPin className="h-3 w-3" />
                    {mine.location}
                  </p>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <Badge variant={getStatusBadgeVariant(mine.status) as any}>
                    {mine.status}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Risk Level</span>
                  <Badge variant={getRiskBadgeVariant(mine.riskLevel) as any}>
                    {mine.riskLevel}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Sectors</span>
                  <span className="text-sm font-medium">{mine.sectors}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Staff</span>
                  <span className="text-sm font-medium">{mine.staff}</span>
                </div>
              </div>
              <div className="pt-2 border-t">
                <p className="text-xs text-muted-foreground">
                  Coordinates: {mine.coordinates}
                </p>
                <p className="text-xs text-muted-foreground">
                  Last inspection: {mine.lastInspection}
                </p>
              </div>
              <Button variant="outline" className="w-full">
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}