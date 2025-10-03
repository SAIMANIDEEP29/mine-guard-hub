import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, TrendingUp, MapPin } from "lucide-react";

export default function Explainability() {
  const featureImportance = [
    { feature: "Crack Density", importance: 0.35, description: "Number and severity of detected cracks" },
    { feature: "Slope Angle", importance: 0.25, description: "Steepness of terrain from DEM data" },
    { feature: "Rainfall (7-day)", importance: 0.20, description: "Cumulative rainfall over past week" },
    { feature: "Rock Type", importance: 0.12, description: "Geological composition of sector" },
    { feature: "Vegetation Cover", importance: 0.08, description: "Extent of vegetation stabilization" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Model Explainability</h1>
        <p className="text-muted-foreground">
          Understand how AI predictions are made
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5" />
              Feature Importance
            </CardTitle>
            <CardDescription>
              Factors that contribute most to risk predictions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {featureImportance.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{item.feature}</span>
                  <span className="text-sm text-muted-foreground">
                    {(item.importance * 100).toFixed(0)}%
                  </span>
                </div>
                <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all"
                    style={{ width: `${item.importance * 100}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Prediction Breakdown
            </CardTitle>
            <CardDescription>
              How different factors combine for final risk score
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">Image Analysis (40%)</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• CNN crack detection and segmentation</li>
                  <li>• Surface texture analysis</li>
                  <li>• Historical image comparison</li>
                </ul>
              </div>

              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">Geotechnical Data (35%)</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• DEM-derived slope and aspect</li>
                  <li>• Rock type and stability metrics</li>
                  <li>• Geological fault proximity</li>
                </ul>
              </div>

              <div className="p-4 border rounded-lg">
                <h4 className="font-medium mb-2">Weather Patterns (25%)</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• LSTM time-series analysis</li>
                  <li>• Rainfall accumulation</li>
                  <li>• Temperature variations</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Example Prediction Explanation
          </CardTitle>
          <CardDescription>
            Detailed breakdown of a recent high-risk prediction
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-destructive/10 border-destructive/20 border rounded-lg">
              <div>
                <p className="font-medium">Sector B - High Risk (0.87)</p>
                <p className="text-sm text-muted-foreground">Predicted on 2025-09-28 14:30</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-destructive">87%</p>
                <p className="text-xs text-muted-foreground">Risk Score</p>
              </div>
            </div>

            <div className="grid gap-3">
              <div className="flex items-center justify-between p-3 border rounded">
                <span className="text-sm">High crack density detected (15 major cracks)</span>
                <span className="text-sm font-medium text-destructive">+35%</span>
              </div>
              <div className="flex items-center justify-between p-3 border rounded">
                <span className="text-sm">Steep slope angle (68°)</span>
                <span className="text-sm font-medium text-destructive">+22%</span>
              </div>
              <div className="flex items-center justify-between p-3 border rounded">
                <span className="text-sm">Heavy rainfall in past 7 days (145mm)</span>
                <span className="text-sm font-medium text-destructive">+18%</span>
              </div>
              <div className="flex items-center justify-between p-3 border rounded">
                <span className="text-sm">Friable rock type (sandstone)</span>
                <span className="text-sm font-medium text-destructive">+12%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
