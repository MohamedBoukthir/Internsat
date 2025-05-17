import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Briefcase, FileCheck, Bookmark, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  const navigate = useNavigate();

  // Mock data
  const stats = [
    { label: "Applications", value: 12, icon: <FileCheck className="h-5 w-5" /> },
    { label: "Saved", value: 5, icon: <Bookmark className="h-5 w-5" /> },
    { label: "Interviews", value: 2, icon: <TrendingUp className="h-5 w-5" /> },
  ];

  // Mock internships
  const recommendedInternships = [
    { 
      id: 1, 
      title: "Frontend Developer Intern", 
      company: "Vermeg", 
      location: "Tunis, Tunisia",
      postedDate: "2 days ago" 
    },
    { 
      id: 2, 
      title: "Data Science Intern", 
      company: "Sofrecom Tunisia", 
      location: "El Ghazala, Tunisia",
      postedDate: "1 week ago" 
    },
    { 
      id: 3, 
      title: "UX/UI Design Intern", 
      company: "Telnet", 
      location: "Ariana, Tunisia",
      postedDate: "3 days ago" 
    },
  ];

  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Student Dashboard</h1>
          <p className="text-lg text-white/60 mt-2">Welcome back! Here's an overview of your internship search.</p>
        </div>

        {/* Search */}
        <Card className="glass-effect">
          <CardContent className="p-6">
            <div className="flex gap-2 items-center">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search for internships..."
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-white placeholder:text-white/40"
                />
              </div>
              <Button 
                className="bg-[#F2FF44] text-black hover:bg-[#E2EF34]"
                onClick={() => navigate("/student/internships")}
              >
                <Briefcase className="mr-2 h-4 w-4" />
                Find Internships
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

        {/* Recommended Internships */}
        <Card className="glass-effect">
          <CardHeader>
            <CardTitle className="text-white">Recommended Internships</CardTitle>
            <CardDescription>Based on your profile and preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recommendedInternships.map((internship) => (
                <Card key={internship.id} className="bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-medium text-white">{internship.title}</h3>
                        <p className="text-white/70">{internship.company}</p>
                        <div className="flex items-center text-white/50 text-sm mt-1">
                          <span>{internship.location}</span>
                          <span className="mx-2">•</span>
                          <span>{internship.postedDate}</span>
                        </div>
                      </div>
                      <Button size="sm" className="bg-[#F2FF44] text-black hover:bg-[#E2EF34]">
                        View Details
                      </Button>
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

export default StudentDashboard;
