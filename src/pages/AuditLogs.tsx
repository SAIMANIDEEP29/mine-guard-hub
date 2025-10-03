import { useState } from "react";
import { FileText, Search, Filter } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function AuditLogs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterAction, setFilterAction] = useState("all");

  const auditLogs = [
    {
      id: "1",
      timestamp: "2025-09-28 14:30:22",
      user: "john@example.com",
      action: "CREATE",
      resourceType: "upload",
      description: "Uploaded new image to Sector B",
      ipAddress: "192.168.1.100",
    },
    {
      id: "2",
      timestamp: "2025-09-28 14:15:10",
      user: "jane@example.com",
      action: "UPDATE",
      resourceType: "alert_rule",
      description: "Modified alert rule for high-risk predictions",
      ipAddress: "192.168.1.101",
    },
    {
      id: "3",
      timestamp: "2025-09-28 13:45:33",
      user: "bob@example.com",
      action: "ACKNOWLEDGE",
      resourceType: "alert",
      description: "Acknowledged alert #A-2345",
      ipAddress: "192.168.1.102",
    },
    {
      id: "4",
      timestamp: "2025-09-28 12:20:15",
      user: "john@example.com",
      action: "DEPLOY",
      resourceType: "model",
      description: "Promoted model v2.1 to production",
      ipAddress: "192.168.1.100",
    },
    {
      id: "5",
      timestamp: "2025-09-28 11:05:42",
      user: "jane@example.com",
      action: "CREATE",
      resourceType: "user",
      description: "Added new employee user",
      ipAddress: "192.168.1.101",
    },
  ];

  const getActionColor = (action: string) => {
    switch (action) {
      case "CREATE": return "default";
      case "UPDATE": return "secondary";
      case "DELETE": return "destructive";
      case "ACKNOWLEDGE": return "outline";
      case "DEPLOY": return "default";
      default: return "outline";
    }
  };

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = log.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.user.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterAction === "all" || log.action === filterAction;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Audit Logs</h1>
        <p className="text-muted-foreground">
          Complete audit trail of all system activities
        </p>
      </div>

      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search logs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterAction} onValueChange={setFilterAction}>
          <SelectTrigger className="w-[180px]">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Actions</SelectItem>
            <SelectItem value="CREATE">Create</SelectItem>
            <SelectItem value="UPDATE">Update</SelectItem>
            <SelectItem value="DELETE">Delete</SelectItem>
            <SelectItem value="ACKNOWLEDGE">Acknowledge</SelectItem>
            <SelectItem value="DEPLOY">Deploy</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Activity Log
          </CardTitle>
          <CardDescription>
            {filteredLogs.length} {filteredLogs.length === 1 ? 'entry' : 'entries'} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredLogs.map((log) => (
              <div
                key={log.id}
                className="flex items-start gap-4 p-4 border rounded-lg hover:bg-accent/50 transition-colors"
              >
                <Badge variant={getActionColor(log.action)}>
                  {log.action}
                </Badge>
                <div className="flex-1 min-w-0">
                  <p className="font-medium">{log.description}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <span>{log.user}</span>
                    <span>•</span>
                    <span>{log.timestamp}</span>
                    <span>•</span>
                    <span>{log.ipAddress}</span>
                    <span>•</span>
                    <span className="capitalize">{log.resourceType}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
