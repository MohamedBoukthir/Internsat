import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Users, Clock, CheckCircle, XCircle, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HRDashboard = () => {
  const navigate = useNavigate();

  // Mock data
  const stats = [
    { label: "Active Internships", value: 5, icon: <Clock className="h-5 w-5" /> },
    { label: "Total Applicants", value: 43, icon: <Users className="h-5 w-5" /> },
    { label: "Interviews Scheduled", value: 12, icon: <TrendingUp className="h-5 w-5" /> },
  ];

  // Mock applicants
  const recentApplicants = [
    { 
      id: 1, 
      name: "Yasmine Ben Romdhane", 
      position: "Frontend Developer Intern", 
      university: "INSAT",
      status: "pending" 
    },
    { 
      id: 2, 
      name: "Oussama Trabelsi", 
      position: "Security Analyst Intern", 
      university: "ENSI",
      status: "approved" 
    },
    { 
      id: 3, 
      name: "Amira Gharbi", 
      position: "Data Analyst Intern", 
      university: "FST Tunis",
      status: "rejected" 
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "rejected":
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-yellow-500" />;
    }
  };

  return (
    <DashboardLayout role="hr">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white">HR Dashboard</h1>
          <p className="text-lg text-white/60 mt-2">Manage your internship postings and applicants.</p>
        </div>

        {/* Action buttons */}
        <Card className="glass-effect">
          <CardContent className="p-6">
            <div className="flex flex-wrap gap-4">
              <Button 
                className="bg-[#F2FF44] text-black hover:bg-[#E2EF34]"
                onClick={() => navigate("/hr/post")}
              >
                <Plus className="mr-2 h-4 w-4" />
                Post New Internship
              </Button>
              <Button 
                className="bg-[#F2FF44] text-black hover:bg-[#E2EF34]"
                onClick={() => navigate("/hr/applications")}
              >
                <Users className="mr-2 h-4 w-4" />
                Review Applications
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

        {/* Recent Applicants */}
        <Card className="glass-effect">
          <CardHeader>
            <CardTitle className="text-white">Recent Applicants</CardTitle>
            <CardDescription>Review and manage recent internship applications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentApplicants.map((applicant) => (
                <Card key={applicant.id} className="bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-medium text-white">{applicant.name}</h3>
                        <p className="text-white/70">{applicant.position}</p>
                        <div className="text-white/50 text-sm mt-1">
                          {applicant.university}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {getStatusIcon(applicant.status)}
                        <Button size="sm" className="bg-[#F2FF44] text-black hover:bg-[#E2EF34]">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default HRDashboard;
