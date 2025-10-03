import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Mines from "./pages/Mines";
import Sectors from "./pages/Sectors";
import RiskMap from "./pages/RiskMap";
import Analytics from "./pages/Analytics";
import Alerts from "./pages/Alerts";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import DataUpload from "./pages/DataUpload";
import ModelManagement from "./pages/ModelManagement";
import Explainability from "./pages/Explainability";
import UserManagement from "./pages/UserManagement";
import AuditLogs from "./pages/AuditLogs";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="mines" element={<Mines />} />
            <Route path="sectors" element={<Sectors />} />
            <Route path="risk-map" element={<RiskMap />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="alerts" element={<Alerts />} />
            <Route path="data-upload" element={<DataUpload />} />
            <Route path="model-management" element={<ModelManagement />} />
            <Route path="explainability" element={<Explainability />} />
            <Route path="user-management" element={<UserManagement />} />
            <Route path="audit-logs" element={<AuditLogs />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
