
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PortfolioDetail from "./pages/portfolio/PortfolioDetail";
import ServiceDetail from "./pages/services/ServiceDetail";
import Dashboard from "./pages/admin/Dashboard";
import AdminMessages from "./pages/admin/Messages";
import AdminEditor from "./pages/admin/Editor";
import AdminSettings from "./pages/admin/Settings";
import AdminLogin from "./pages/admin/Login";
import AdminLayout from "./components/layout/AdminLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* <Route path="/portfolio/:id" element={<PortfolioDetail />} /> */}
          <Route path="/services/:slug" element={<ServiceDetail />} />
          
          {/* Admin routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/messages" element={<AdminMessages />} />
          <Route path="/admin/editor" element={<AdminEditor />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
      <Sonner />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
