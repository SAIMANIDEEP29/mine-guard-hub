import { Bell, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Header() {
  return (
    <header className="border-b bg-card">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center space-x-4">
          <Shield className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-xl font-semibold">Rockfall Alert System</h1>
            <p className="text-sm text-muted-foreground">Mining Safety Dashboard</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-4 w-4" />
            <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs">
              3
            </Badge>
          </Button>
        </div>
      </div>
    </header>
  );
}