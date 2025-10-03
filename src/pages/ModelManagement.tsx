import { useState } from "react";
import { Brain, TrendingUp, Settings, Archive } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ModelManagement() {
  const [activeTab, setActiveTab] = useState("registry");

  const models = [
    {
      id: "1",
      name: "Rockfall CNN v2.1",
      version: "2.1.0",
      status: "production",
      accuracy: 0.94,
      deployedDate: "2025-09-15",
      description: "CNN model for crack segmentation and rockfall prediction",
    },
    {
      id: "2",
      name: "Rockfall CNN v2.2",
      version: "2.2.0",
      status: "staging",
      accuracy: 0.96,
      trainedDate: "2025-09-28",
      description: "Improved accuracy with additional training data",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "production": return "default";
      case "staging": return "secondary";
      case "training": return "outline";
      case "archived": return "destructive";
      default: return "outline";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Model Management</h1>
        <p className="text-muted-foreground">
          Train, deploy, and manage AI models for rockfall prediction
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="registry">Model Registry</TabsTrigger>
          <TabsTrigger value="training">Training</TabsTrigger>
          <TabsTrigger value="metrics">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="registry" className="space-y-4">
          <div className="grid gap-4">
            {models.map((model) => (
              <Card key={model.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Brain className="h-5 w-5" />
                        {model.name}
                      </CardTitle>
                      <CardDescription>{model.description}</CardDescription>
                    </div>
                    <Badge variant={getStatusColor(model.status)}>
                      {model.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Version</p>
                      <p className="font-medium">{model.version}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Accuracy</p>
                      <p className="font-medium">{(model.accuracy * 100).toFixed(1)}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Date</p>
                      <p className="font-medium">
                        {model.deployedDate || model.trainedDate}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      {model.status === "staging" && (
                        <Button size="sm">Promote to Production</Button>
                      )}
                      {model.status === "production" && (
                        <Button size="sm" variant="outline">Rollback</Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Button className="w-full">
            <Settings className="mr-2 h-4 w-4" />
            Train New Model
          </Button>
        </TabsContent>

        <TabsContent value="training" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Model Training Configuration</CardTitle>
              <CardDescription>
                Configure and start training a new model version
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Training interface will be implemented here
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="metrics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Accuracy</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">94.0%</div>
                <p className="text-xs text-muted-foreground">
                  +2.1% from previous version
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Precision</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">92.5%</div>
                <p className="text-xs text-muted-foreground">
                  +1.8% from previous version
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Recall</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">95.2%</div>
                <p className="text-xs text-muted-foreground">
                  +2.4% from previous version
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
