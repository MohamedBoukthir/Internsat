// src/App.tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "./services/ProtectedRoute";

import Index from "./pages/Index";
import StudentDashboard from "./pages/student/StudentDashboard";
import ProfilePage from "./pages/student/ProfilePage";
import InternshipListPage from "./pages/student/InternshipListPage";
import ApplicationsPage from "./pages/student/ApplicationsPage";

import HRDashboard from "./pages/hr/HRDashboard";
import HRProfilePage from "./pages/hr/ProfilePage";
import PostInternshipPage from "./pages/hr/PostInternshipPage";
import HRApplicationsPage from "./pages/hr/ApplicationsPage";
import CompanyProfilePage from "./pages/hr/CompanyProfilePage";

import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageUsersPage from "./pages/admin/ManageUsersPage";
import ManageInternshipsPage from "./pages/admin/ManageInternshipsPage";
import ManageCompaniesPage from "./pages/admin/ManageCompaniesPage";

import RegisterPage from "./pages/auth/RegisterPage";
import LoginPage from "./pages/auth/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";


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
          <Route
            path="/student/dashboard"
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <StudentDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/profile"
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/internships"
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <InternshipListPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/applications"
            element={
              <ProtectedRoute allowedRoles={["student"]}>
                <ApplicationsPage />
              </ProtectedRoute>
            }
          />

          {/* HR routes */}
          <Route
            path="/hr/dashboard"
            element={
              <ProtectedRoute allowedRoles={["hr"]}>
                <HRDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/hr/profile"
            element={
              <ProtectedRoute allowedRoles={["hr"]}>
                <HRProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/hr/post"
            element={
              <ProtectedRoute allowedRoles={["hr"]}>
                <PostInternshipPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/hr/applications"
            element={
              <ProtectedRoute allowedRoles={["hr"]}>
                <HRApplicationsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/hr/company"
            element={
              <ProtectedRoute allowedRoles={["hr"]}>
                <CompanyProfilePage />
              </ProtectedRoute>
            }
          />

          {/* Admin routes */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <ManageUsersPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/internships"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <ManageInternshipsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/companies"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <ManageCompaniesPage />
              </ProtectedRoute>
            }
          />

          {/* Not Found page */}
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
