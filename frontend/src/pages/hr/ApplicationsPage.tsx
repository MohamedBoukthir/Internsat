
import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Calendar, 
  User, 
  FileText, 
  GraduationCap,
  Mail,
  Phone
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";

// Mock data for applications
const applications = [
  {
    id: 1,
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    phone: "+1 (555) 123-4567",
    university: "MIT",
    major: "Computer Science",
    position: "Frontend Developer Intern",
    date: "2023-06-15",
    status: "pending",
    resume: "/resume.pdf",
    coverLetter: "I am excited about the opportunity to work at your company...",
    skills: ["React", "JavaScript", "CSS", "HTML", "Git"],
  },
  {
    id: 2,
    name: "Sarah Williams",
    email: "sarah.williams@example.com",
    phone: "+1 (555) 987-6543",
    university: "Stanford",
    major: "Data Science",
    position: "Data Analyst Intern",
    date: "2023-06-14",
    status: "approved",
    resume: "/resume.pdf",
    coverLetter: "With my strong background in data analysis and statistics...",
    skills: ["Python", "R", "SQL", "Tableau", "Excel"],
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "michael.brown@example.com",
    phone: "+1 (555) 456-7890",
    university: "NYU",
    major: "Design",
    position: "UX/UI Design Intern",
    date: "2023-06-12",
    status: "rejected",
    resume: "/resume.pdf",
    coverLetter: "I believe my creative skills and eye for detail make me a perfect fit...",
    skills: ["Figma", "Adobe XD", "Sketch", "Photoshop", "Illustrator"],
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.davis@example.com",
    phone: "+1 (555) 789-0123",
    university: "UC Berkeley",
    major: "Computer Engineering",
    position: "Backend Developer Intern",
    date: "2023-06-10",
    status: "pending",
    resume: "/resume.pdf",
    coverLetter: "I am passionate about building scalable backend systems...",
    skills: ["Node.js", "Express", "MongoDB", "AWS", "Docker"],
  },
];

const ApplicationsPage = () => {
  const [selectedApplication, setSelectedApplication] = useState<number | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredApplications = applications.filter((app) => {
    if (statusFilter === "all") return true;
    return app.status === statusFilter;
  });

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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-green-500 hover:bg-green-600">Approved</Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-red-500 hover:bg-red-600">Rejected</Badge>
        );
      default:
        return (
          <Badge className="bg-yellow-500 hover:bg-yellow-600">Pending</Badge>
        );
    }
  };

  const handleStatusChange = (applicationId: number, newStatus: string) => {
    // In a real app, this would update the database
    console.log(`Changing application ${applicationId} status to ${newStatus}`);
    
    // Show success toast
    toast({
      title: "Status Updated",
      description: `Application status has been changed to ${newStatus}.`,
    });
    
    // Reset selected application
    setSelectedApplication(null);
  };

  return (
    <DashboardLayout role="hr">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Applications Management</h1>
          <p className="text-lg text-white/60 mt-2">Review and manage internship applications</p>
        </div>

        <Card className="glass-effect">
          <CardHeader>
            <CardTitle className="text-white">Application Filters</CardTitle>
            <Tabs defaultValue="all" value={statusFilter} onValueChange={setStatusFilter}>
              <TabsList>
                <TabsTrigger value="all">All Applications</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="approved">Approved</TabsTrigger>
                <TabsTrigger value="rejected">Rejected</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredApplications.length === 0 ? (
                <p className="text-center text-white/60 py-8">No applications found with the selected filter.</p>
              ) : (
                filteredApplications.map((application) => (
                  <Card 
                    key={application.id} 
                    className={`bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer ${
                      selectedApplication === application.id ? "ring-2 ring-[#F2FF44]" : ""
                    }`}
                    onClick={() => setSelectedApplication(
                      selectedApplication === application.id ? null : application.id
                    )}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-lg font-medium text-white">{application.name}</h3>
                          <div className="flex items-center gap-2 text-white/70">
                            <span>{application.position}</span>
                            {getStatusBadge(application.status)}
                          </div>
                          <div className="text-white/50 text-sm mt-1 flex items-center gap-1">
                            <GraduationCap className="h-4 w-4" />
                            <span>{application.university}, {application.major}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {getStatusIcon(application.status)}
                        </div>
                      </div>

                      {selectedApplication === application.id && (
                        <div className="mt-4 border-t border-white/10 pt-4 space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <h4 className="text-white/90 font-medium">Contact Information</h4>
                              <div className="text-white/70 flex items-center gap-2">
                                <Mail className="h-4 w-4" />
                                <span>{application.email}</span>
                              </div>
                              <div className="text-white/70 flex items-center gap-2">
                                <Phone className="h-4 w-4" />
                                <span>{application.phone}</span>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <h4 className="text-white/90 font-medium">Application Details</h4>
                              <div className="text-white/70 flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                <span>Applied on {application.date}</span>
                              </div>
                              <div className="text-white/70 flex items-center gap-2">
                                <FileText className="h-4 w-4" />
                                <Button variant="link" className="p-0 h-auto text-white/70 hover:text-white">
                                  View Resume
                                </Button>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <h4 className="text-white/90 font-medium">Skills</h4>
                            <div className="flex flex-wrap gap-2">
                              {application.skills.map((skill, index) => (
                                <Badge key={index} variant="outline" className="text-white/80">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-2">
                            <h4 className="text-white/90 font-medium">Cover Letter</h4>
                            <div className="text-white/70 bg-black/20 p-4 rounded-md">
                              {application.coverLetter}
                            </div>
                          </div>

                          <div className="flex justify-end gap-3">
                            {application.status !== "rejected" && (
                              <Button
                                className="bg-red-500 hover:bg-red-600"
                                onClick={() => handleStatusChange(application.id, "rejected")}
                              >
                                <XCircle className="h-4 w-4 mr-2" />
                                Reject
                              </Button>
                            )}
                            {application.status !== "approved" && (
                              <Button
                                className="bg-green-500 hover:bg-green-600"
                                onClick={() => handleStatusChange(application.id, "approved")}
                              >
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Approve
                              </Button>
                            )}
                            {application.status !== "pending" && (
                              <Button
                                className="bg-yellow-500 hover:bg-yellow-600"
                                onClick={() => handleStatusChange(application.id, "pending")}
                              >
                                <Clock className="h-4 w-4 mr-2" />
                                Mark as Pending
                              </Button>
                            )}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ApplicationsPage;
