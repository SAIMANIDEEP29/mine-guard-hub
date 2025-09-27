import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, Filter, Layers, MapPin } from "lucide-react";

// Fix for default markers in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Demo data for map markers
const riskPoints = [
  { id: 1, lat: 34.0522, lng: -118.2437, risk: "high", sector: "A-1", rainfall: 12.5, slope: 45 },
  { id: 2, lat: 34.0622, lng: -118.2337, risk: "medium", sector: "B-2", rainfall: 8.2, slope: 30 },
  { id: 3, lat: 34.0422, lng: -118.2537, risk: "low", sector: "C-3", rainfall: 3.1, slope: 15 },
  { id: 4, lat: 34.0722, lng: -118.2237, risk: "high", sector: "D-1", rainfall: 15.8, slope: 52 },
  { id: 5, lat: 34.0322, lng: -118.2637, risk: "medium", sector: "E-2", rainfall: 6.9, slope: 38 },
];

export default function RiskMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.LayerGroup | null>(null);
  
  const [filters, setFilters] = useState({
    dateFrom: "",
    dateTo: "",
    riskLevel: "all",
    rainfallMin: "",
    rainfallMax: "",
    slopeMin: "",
    slopeMax: "",
    blastStage: "all"
  });

  const [activeLayer, setActiveLayer] = useState("satellite");

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Initialize map
    const map = L.map(mapRef.current).setView([34.0522, -118.2437], 12);
    
    // Add tile layers
    const satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: '&copy; <a href="https://www.esri.com/">Esri</a> &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
    });

    const streetLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    const terrainLayer = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.opentopomap.org/copyright">OpenTopoMap</a> contributors'
    });

    // Start with satellite view
    satelliteLayer.addTo(map);

    // Store layer references
    (map as any).layers = {
      satellite: satelliteLayer,
      street: streetLayer,
      terrain: terrainLayer
    };

    mapInstanceRef.current = map;
    markersRef.current = L.layerGroup().addTo(map);

    // Add risk points
    updateMarkers();

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  const updateMarkers = () => {
    if (!markersRef.current) return;

    markersRef.current.clearLayers();

    const filteredPoints = riskPoints.filter(point => {
      if (filters.riskLevel !== "all" && point.risk !== filters.riskLevel) return false;
      if (filters.rainfallMin && point.rainfall < parseFloat(filters.rainfallMin)) return false;
      if (filters.rainfallMax && point.rainfall > parseFloat(filters.rainfallMax)) return false;
      if (filters.slopeMin && point.slope < parseFloat(filters.slopeMin)) return false;
      if (filters.slopeMax && point.slope > parseFloat(filters.slopeMax)) return false;
      return true;
    });

    filteredPoints.forEach(point => {
      const color = point.risk === "high" ? "#ef4444" : point.risk === "medium" ? "#f59e0b" : "#22c55e";
      
      const marker = L.circleMarker([point.lat, point.lng], {
        radius: 8,
        fillColor: color,
        color: "white",
        weight: 2,
        opacity: 1,
        fillOpacity: 0.8
      });

      marker.bindPopup(`
        <div class="p-2">
          <h3 class="font-semibold">Sector ${point.sector}</h3>
          <p><strong>Risk Level:</strong> ${point.risk.charAt(0).toUpperCase() + point.risk.slice(1)}</p>
          <p><strong>Rainfall:</strong> ${point.rainfall}mm</p>
          <p><strong>Slope:</strong> ${point.slope}°</p>
        </div>
      `);

      markersRef.current?.addLayer(marker);
    });
  };

  const changeMapLayer = (layerType: string) => {
    if (!mapInstanceRef.current) return;

    const map = mapInstanceRef.current;
    const layers = (map as any).layers;

    // Remove current layer
    Object.values(layers).forEach((layer: any) => {
      map.removeLayer(layer);
    });

    // Add new layer
    layers[layerType].addTo(map);
    setActiveLayer(layerType);
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    updateMarkers();
  };

  const resetFilters = () => {
    setFilters({
      dateFrom: "",
      dateTo: "",
      riskLevel: "all",
      rainfallMin: "",
      rainfallMax: "",
      slopeMin: "",
      slopeMax: "",
      blastStage: "all"
    });
    setTimeout(updateMarkers, 100);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Risk Assessment Map</h1>
        <p className="text-muted-foreground">Interactive geological risk visualization</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters Panel */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Date Range */}
            <div className="space-y-2">
              <Label>Date Range</Label>
              <div className="space-y-2">
                <Input
                  type="date"
                  value={filters.dateFrom}
                  onChange={(e) => handleFilterChange("dateFrom", e.target.value)}
                  placeholder="From"
                />
                <Input
                  type="date"
                  value={filters.dateTo}
                  onChange={(e) => handleFilterChange("dateTo", e.target.value)}
                  placeholder="To"
                />
              </div>
            </div>

            {/* Risk Level */}
            <div className="space-y-2">
              <Label>Risk Level</Label>
              <Select value={filters.riskLevel} onValueChange={(value) => handleFilterChange("riskLevel", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="low">Low Risk</SelectItem>
                  <SelectItem value="medium">Medium Risk</SelectItem>
                  <SelectItem value="high">High Risk</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Rainfall Range */}
            <div className="space-y-2">
              <Label>Rainfall (mm)</Label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  type="number"
                  placeholder="Min"
                  value={filters.rainfallMin}
                  onChange={(e) => handleFilterChange("rainfallMin", e.target.value)}
                />
                <Input
                  type="number"
                  placeholder="Max"
                  value={filters.rainfallMax}
                  onChange={(e) => handleFilterChange("rainfallMax", e.target.value)}
                />
              </div>
            </div>

            {/* Slope Range */}
            <div className="space-y-2">
              <Label>Slope (degrees)</Label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  type="number"
                  placeholder="Min"
                  value={filters.slopeMin}
                  onChange={(e) => handleFilterChange("slopeMin", e.target.value)}
                />
                <Input
                  type="number"
                  placeholder="Max"
                  value={filters.slopeMax}
                  onChange={(e) => handleFilterChange("slopeMax", e.target.value)}
                />
              </div>
            </div>

            {/* Blast Stage */}
            <div className="space-y-2">
              <Label>Blast Stage</Label>
              <Select value={filters.blastStage} onValueChange={(value) => handleFilterChange("blastStage", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Stages</SelectItem>
                  <SelectItem value="before">Before Blast</SelectItem>
                  <SelectItem value="after">After Blast</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Button onClick={applyFilters} className="w-full">
                Apply Filters
              </Button>
              <Button onClick={resetFilters} variant="outline" className="w-full">
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Map Container */}
        <div className="lg:col-span-3 space-y-4">
          {/* Map Controls */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Layers className="h-4 w-4" />
                  <span className="text-sm font-medium">Map Layer:</span>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant={activeLayer === "satellite" ? "default" : "outline"}
                    size="sm"
                    onClick={() => changeMapLayer("satellite")}
                  >
                    Satellite
                  </Button>
                  <Button
                    variant={activeLayer === "street" ? "default" : "outline"}
                    size="sm"
                    onClick={() => changeMapLayer("street")}
                  >
                    Street
                  </Button>
                  <Button
                    variant={activeLayer === "terrain" ? "default" : "outline"}
                    size="sm"
                    onClick={() => changeMapLayer("terrain")}
                  >
                    Terrain
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Map */}
          <Card className="overflow-hidden">
            <div ref={mapRef} className="h-[600px] w-full" />
          </Card>

          {/* Legend */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Risk Level Legend
                </h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-sm">Low Risk</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <span className="text-sm">Medium Risk</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <span className="text-sm">High Risk</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}