import { useState } from "react";
import { Upload, Image, Clock, MapPin, Plus, Eye, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Demo data
const sectorsData = [
  {
    id: "A-1",
    mine: "Copper Valley Mine",
    name: "North Face Sector",
    images: 24,
    lastUpload: "2024-01-15 14:30",
    blastStage: "after",
    riskLevel: "medium",
    slope: 45,
    coordinates: "34.0522°N, 118.2437°W"
  },
  {
    id: "B-2", 
    mine: "Iron Ridge Mining",
    name: "Eastern Wall",
    images: 18,
    lastUpload: "2024-01-14 09:15",
    blastStage: "before",
    riskLevel: "high",
    slope: 52,
    coordinates: "36.1627°N, 115.1179°W"
  },
  {
    id: "C-3",
    mine: "Gold Creek Operations", 
    name: "South Pit",
    images: 31,
    lastUpload: "2024-01-13 16:45",
    blastStage: "after",
    riskLevel: "low",
    slope: 28,
    coordinates: "39.7392°N, 104.9903°W"
  }
];

const recentUploads = [
  {
    id: 1,
    sectorId: "A-1",
    filename: "sector-a1-post-blast-001.jpg",
    uploadTime: "2024-01-15 14:30",
    stage: "after",
    size: "2.4 MB"
  },
  {
    id: 2,
    sectorId: "B-2", 
    filename: "sector-b2-pre-blast-012.jpg",
    uploadTime: "2024-01-14 09:15",
    stage: "before",
    size: "3.1 MB"
  },
  {
    id: 3,
    sectorId: "C-3",
    filename: "sector-c3-post-blast-045.jpg", 
    uploadTime: "2024-01-13 16:45",
    stage: "after",
    size: "2.8 MB"
  }
];

export default function Sectors() {
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);

  const getRiskBadgeVariant = (risk: string) => {
    switch (risk.toLowerCase()) {
      case "low": return "safe";
      case "medium": return "caution"; 
      case "high": return "danger";
      default: return "default";
    }
  };

  const getStageBadgeVariant = (stage: string) => {
    return stage === "before" ? "caution" : "safe";
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Sector Management</h1>
          <p className="text-muted-foreground">Monitor sectors and manage geological imagery</p>
        </div>
        <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Upload className="h-4 w-4" />
              Upload Images
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Upload Sector Images</DialogTitle>
              <DialogDescription>
                Upload geological images with metadata for analysis.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="sector">Sector ID</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select sector" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A-1">A-1 - North Face Sector</SelectItem>
                    <SelectItem value="B-2">B-2 - Eastern Wall</SelectItem>
                    <SelectItem value="C-3">C-3 - South Pit</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="stage">Blast Stage</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select stage" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="before">Before Blast</SelectItem>
                    <SelectItem value="after">After Blast</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="datetime">Date & Time</Label>
                <Input id="datetime" type="datetime-local" />
              </div>
              <div>
                <Label htmlFor="files">Images</Label>
                <Input id="files" type="file" multiple accept="image/*" />
              </div>
              <Button onClick={() => setIsUploadDialogOpen(false)} className="w-full">
                Upload Images
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sectors</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sectorsData.length}</div>
            <p className="text-xs text-muted-foreground">Monitoring zones</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Images</CardTitle>
            <Image className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sectorsData.reduce((acc, sector) => acc + sector.images, 0)}</div>
            <p className="text-xs text-muted-foreground">Geological records</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Uploads</CardTitle>
            <Upload className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recentUploads.length}</div>
            <p className="text-xs text-muted-foreground">Last 24 hours</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Risk Sectors</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sectorsData.filter(s => s.riskLevel === "high").length}</div>
            <p className="text-xs text-muted-foreground">Need attention</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sectors List */}
        <Card>
          <CardHeader>
            <CardTitle>Active Sectors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sectorsData.map((sector) => (
                <div key={sector.id} className="p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">{sector.id} - {sector.name}</h3>
                      <p className="text-sm text-muted-foreground">{sector.mine}</p>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-xs text-muted-foreground">Risk Level</span>
                        <Badge variant={getRiskBadgeVariant(sector.riskLevel) as any} className="text-xs">
                          {sector.riskLevel}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs text-muted-foreground">Blast Stage</span>
                        <Badge variant={getStageBadgeVariant(sector.blastStage) as any} className="text-xs">
                          {sector.blastStage}
                        </Badge>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-xs text-muted-foreground">Images</span>
                        <span className="text-xs font-medium">{sector.images}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-xs text-muted-foreground">Slope</span>
                        <span className="text-xs font-medium">{sector.slope}°</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-xs text-muted-foreground space-y-1">
                    <p>Last upload: {sector.lastUpload}</p>
                    <p>Coordinates: {sector.coordinates}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Uploads */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Recent Uploads
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentUploads.map((upload) => (
                <div key={upload.id} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                      <Image className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">{upload.filename}</div>
                      <div className="text-xs text-muted-foreground">
                        Sector {upload.sectorId} • {upload.uploadTime}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant={getStageBadgeVariant(upload.stage) as any} className="text-xs mb-1">
                      {upload.stage}
                    </Badge>
                    <div className="text-xs text-muted-foreground">{upload.size}</div>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All Uploads
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Image Gallery Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Image className="h-5 w-5" />
            Recent Sector Images
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Array.from({ length: 12 }, (_, i) => (
              <div key={i} className="aspect-square rounded-lg bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors cursor-pointer">
                <Image className="h-8 w-8 text-muted-foreground" />
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-4">
            View Full Gallery
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}