
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import StudentDashboard from "./pages/student/StudentDashboard";
import ProfilePage from "./pages/student/ProfilePage";
import InternshipListPage from "./pages/student/InternshipListPage";
import ApplicationsPage from "./pages/student/ApplicationsPage";
import HRDashboard from "./pages/hr/HRDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import RegisterPage from "./pages/auth/RegisterPage";
import LoginPage from "./pages/auth/LoginPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* Student routes */}
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/profile" element={<ProfilePage />} />
          <Route path="/student/internships" element={<InternshipListPage />} />
          <Route path="/student/applications" element={<ApplicationsPage />} />
          
          {/* HR routes */}
          <Route path="/hr/dashboard" element={<HRDashboard />} />
          
          {/* Admin routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          
          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
