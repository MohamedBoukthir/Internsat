
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  User, 
  Users, 
  Briefcase, 
  ShieldCheck, 
  AlertTriangle,
  ChevronRight,
  Building,
  Settings
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  // Mock data
  const stats = [
    { label: "Total Students", value: 1250, icon: <User className="h-5 w-5" /> },
    { label: "HR Managers", value: 76, icon: <Users className="h-5 w-5" /> },
    { label: "Active Internships", value: 128, icon: <Briefcase className="h-5 w-5" /> },
    { label: "System Alerts", value: 3, icon: <AlertTriangle className="h-5 w-5" /> },
  ];

  // Mock recent activities
  const recentActivities = [
    { 
      id: 1, 
      action: "New HR account created", 
      user: "Rebecca Jones", 
      time: "10 minutes ago" 
    },
    { 
      id: 2, 
      action: "Internship posting removed", 
      user: "Admin System", 
      time: "2 hours ago" 
    },
    { 
      id: 3, 
      action: "User reported internship spam", 
      user: "Alex Johnson", 
      time: "5 hours ago" 
    },
  ];

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
          <p className="text-lg text-white/60 mt-2">System overview and management controls.</p>
        </div>

        {/* Quick Actions */}
        <Card className="glass-effect">
          <CardContent className="p-6">
            <div className="flex flex-wrap gap-4">
              <Button 
                onClick={() => navigate("/admin/users")}
                className="bg-[#F2FF44] text-black hover:bg-[#E2EF34]"
              >
                <Users className="mr-2 h-4 w-4" />
                Manage Users
              </Button>
              <Button 
                className="bg-[#F2FF44] text-black hover:bg-[#E2EF34]"
                onClick={() => navigate("/admin/internships")}
              >
                <Briefcase className="mr-2 h-4 w-4" />
                Manage Internships
              </Button>
              <Button 
                className="bg-[#F2FF44] text-black hover:bg-[#E2EF34]"
                onClick={() => navigate("/admin/companies")}
              >
                <Building className="mr-2 h-4 w-4" />
                Manage Companies
              </Button>
              <Button 
                className="bg-[#F2FF44] text-black hover:bg-[#E2EF34]"
                onClick={() => navigate("/admin/settings")}
              >
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <Card key={i} className="glass-effect">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-lg text-white/60">{stat.label}</p>
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                </div>
                <div className="bg-white rounded-full p-3">
                  {stat.icon}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Activities */}
        <Card className="glass-effect">
          <CardHeader>
            <CardTitle className="text-white">Recent System Activities</CardTitle>
            <CardDescription>Latest actions and events on the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <Card key={activity.id} className="bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-medium text-white">{activity.action}</h3>
                        <div className="flex items-center text-white/50 text-sm mt-1">
                          <span>By {activity.user}</span>
                          <span className="mx-2">•</span>
                          <span>{activity.time}</span>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-white/50" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Button 
                variant="link" 
                className="text-white/70"
                onClick={() => navigate("/admin/users")}
              >
                View All Activity Logs
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
