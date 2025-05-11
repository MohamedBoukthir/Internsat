import { ReactNode, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  LogOut,
  Menu,
  X,
  User,
  Briefcase,
  Users,
  Home,
  LayoutDashboard,
  FileText,
  Building,
  Search
} from "lucide-react";

interface DashboardLayoutProps {
  children: ReactNode;
  role: "student" | "hr" | "admin";
}

const DashboardLayout = ({ children, role }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate("/");
  };

  // Navigation items based on role
  const getNavItems = () => {
    const baseItems = [
      {
        icon: <LayoutDashboard className="h-5 w-5" />,
        label: "Dashboard",
        path: `/${role}/dashboard`,
      }
    ];

    const studentItems = [
      {
        icon: <User className="h-5 w-5" />,
        label: "Profile",
        path: "/student/profile",
      },
      {
        icon: <Search className="h-5 w-5" />,
        label: "Find Internships",
        path: "/student/internships",
      },
      {
        icon: <FileText className="h-5 w-5" />,
        label: "My Applications",
        path: "/student/applications",
      },
    ];

    const hrItems = [
      {
        icon: <User className="h-5 w-5" />,
        label: "Profile",
        path: "/hr/profile",
      },
      {
        icon: <Briefcase className="h-5 w-5" />,
        label: "Post Internship",
        path: "/hr/post",
      },
      {
        icon: <Users className="h-5 w-5" />,
        label: "Applications",
        path: "/hr/applications",
      },
      {
        icon: <Building className="h-5 w-5" />,
        label: "Company Profile",
        path: "/hr/company",
      },
    ];

    const adminItems = [
      {
        icon: <Users className="h-5 w-5" />,
        label: "Manage Users",
        path: "/admin/users",
      },
      {
        icon: <Briefcase className="h-5 w-5" />,
        label: "Manage Internships",
        path: "/admin/internships",
      },
      {
        icon: <Building className="h-5 w-5" />,
        label: "Manage Companies",
        path: "/admin/companies",
      },
    ];

    switch (role) {
      case "student":
        return [...baseItems, ...studentItems];
      case "hr":
        return [...baseItems, ...hrItems];
      case "admin":
        return [...baseItems, ...adminItems];
      default:
        return baseItems;
    }
  };

  const navItems = getNavItems();

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="bg-background/20 backdrop-blur-lg border border-white/10"
        >
          {sidebarOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 bottom-0 w-64 bg-background/80 backdrop-blur-xl z-40 border-r border-white/10 transition-transform duration-300 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-white/10">
            <div className="text-xl font-bold text-white">Internsat</div>
            <div className="text-sm text-white/60 capitalize">{role} Portal</div>
          </div>

          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-1">
              {navItems.map((item, index) => (
                <li key={index}>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start ${
                      location.pathname === item.path 
                        ? "bg-white/10 text-white" 
                        : "text-white/70 hover:text-white hover:bg-white/10"
                    }`}
                    onClick={() => {
                      navigate(item.path);
                      if (sidebarOpen) setSidebarOpen(false);
                    }}
                  >
                    {item.icon}
                    <span className="ml-2">{item.label}</span>
                  </Button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="p-4 border-t border-white/10">
            <Button
              variant="ghost"
              className="w-full justify-start text-white/70 hover:text-white hover:bg-white/10"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5" />
              <span className="ml-2">Logout</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:ml-64 p-6">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
