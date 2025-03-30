
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ScanAnalysis from "./pages/ScanAnalysis";
import ScanHistory from "./pages/ScanHistory";
import Consultation from "./pages/Consultation";
import Consultations from "./pages/Consultations";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import HealthDashboard from './pages/HealthDashboard';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/scan-analysis" element={<ScanAnalysis />} />
            <Route path="/scan-history" element={<ScanHistory />} />
            <Route path="/consultation" element={<Consultation />} />
            <Route path="/consultations" element={<Consultations />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/health-dashboard" element={<HealthDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
