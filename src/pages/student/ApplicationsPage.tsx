
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";
import { FileText, Clock, Calendar, Building, CheckCircle, XCircle, AlertCircle, Eye, MessageSquare } from "lucide-react";

// Mock application data
const MOCK_APPLICATIONS = [
  {
    id: 1,
    position: "Frontend Developer Intern",
    company: "TechCorp",
    location: "San Francisco, CA",
    appliedDate: "2024-04-10",
    status: "pending",
    statusText: "Application Under Review",
    interviews: [],
    messages: [
      {
        id: 1,
        sender: "HR Team",
        date: "2024-04-12",
        content: "Thank you for your application. We are currently reviewing your qualifications."
      }
    ]
  },
  {
    id: 2,
    position: "UX/UI Design Intern",
    company: "CreativeStudio",
    location: "New York, NY",
    appliedDate: "2024-04-05",
    status: "interview",
    statusText: "Interview Scheduled",
    interviews: [
      {
        type: "First Interview",
        date: "2024-04-20",
        time: "10:00 AM",
        location: "Zoom Meeting"
      }
    ],
    messages: [
      {
        id: 1,
        sender: "HR Team",
        date: "2024-04-07",
        content: "We've reviewed your application and would like to schedule an interview."
      },
      {
        id: 2,
        sender: "Interview Coordinator",
        date: "2024-04-08",
        content: "Your interview has been scheduled for April 20th at 10:00 AM via Zoom. Details will be sent to your email."
      }
    ]
  },
  {
    id: 3,
    position: "Data Science Intern",
    company: "AnalyticsPro",
    location: "Remote",
    appliedDate: "2024-03-25",
    status: "rejected",
    statusText: "Application Not Selected",
    interviews: [],
    messages: [
      {
        id: 1,
        sender: "HR Team",
        date: "2024-04-02",
        content: "Thank you for your interest in the Data Science Intern position. After reviewing your application, we have decided to proceed with other candidates whose qualifications better match our current needs."
      }
    ]
  },
  {
    id: 4,
    position: "Marketing Intern",
    company: "BrandBoost",
    location: "Chicago, IL",
    appliedDate: "2024-04-01",
    status: "offered",
    statusText: "Offer Extended",
    interviews: [
      {
        type: "First Interview",
        date: "2024-04-10",
        time: "2:00 PM",
        location: "Phone Interview"
      },
      {
        type: "Final Interview",
        date: "2024-04-15",
        time: "11:00 AM",
        location: "Office Visit"
      }
    ],
    messages: [
      {
        id: 1,
        sender: "HR Team",
        date: "2024-04-03",
        content: "We've reviewed your application and would like to schedule a phone interview."
      },
      {
        id: 2,
        sender: "Marketing Director",
        date: "2024-04-12",
        content: "Thank you for coming in for an interview. We were impressed with your skills and experiences."
      },
      {
        id: 3,
        sender: "HR Team",
        date: "2024-04-17",
        content: "We're pleased to offer you the Marketing Intern position! Please check your email for the offer letter and next steps."
      }
    ]
  },
  {
    id: 5,
    position: "Backend Developer Intern",
    company: "ServerTech",
    location: "Boston, MA",
    appliedDate: "2024-03-28",
    status: "pending",
    statusText: "Technical Assessment",
    interviews: [],
    messages: [
      {
        id: 1,
        sender: "Technical Team",
        date: "2024-04-01",
        content: "Thank you for your application. Please complete the attached technical assessment within the next 5 days."
      }
    ]
  }
];

const ApplicationsPage = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedApplication, setSelectedApplication] = useState<number | null>(null);
  
  // Filter applications based on active tab
  const filteredApplications = activeTab === "all" 
    ? MOCK_APPLICATIONS 
    : MOCK_APPLICATIONS.filter(app => app.status === activeTab);
  
  // Get status badge color
  const getStatusBadge = (status: string) => {
    switch(status) {
      case "pending":
        return <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">In Progress</Badge>;
      case "interview":
        return <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">Interview</Badge>;
      case "offered":
        return <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">Offered</Badge>;
      case "rejected":
        return <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20">Rejected</Badge>;
      default:
        return <Badge variant="outline" className="bg-gray-500/10 text-gray-400 border-gray-500/20">Unknown</Badge>;
    }
  };
  
  // Get status icon
  const getStatusIcon = (status: string) => {
    switch(status) {
      case "pending":
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case "interview":
        return <Calendar className="h-5 w-5 text-blue-500" />;
      case "offered":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "rejected":
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-400" />;
    }
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white">My Applications</h1>
          <p className="text-lg text-white/60 mt-2">Track and manage your internship applications</p>
        </div>

        {/* Application Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="glass-effect">
            <CardContent className="p-5 flex justify-between items-center">
              <div>
                <p className="text-white/60">Total</p>
                <p className="text-2xl font-bold text-white">{MOCK_APPLICATIONS.length}</p>
              </div>
              <div className="bg-white/10 rounded-full p-3">
                <FileText className="h-5 w-5 text-white" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-effect">
            <CardContent className="p-5 flex justify-between items-center">
              <div>
                <p className="text-white/60">In Progress</p>
                <p className="text-2xl font-bold text-white">
                  {MOCK_APPLICATIONS.filter(app => app.status === "pending").length}
                </p>
              </div>
              <div className="bg-yellow-500/20 rounded-full p-3">
                <Clock className="h-5 w-5 text-yellow-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-effect">
            <CardContent className="p-5 flex justify-between items-center">
              <div>
                <p className="text-white/60">Interviews</p>
                <p className="text-2xl font-bold text-white">
                  {MOCK_APPLICATIONS.filter(app => app.status === "interview").length}
                </p>
              </div>
              <div className="bg-blue-500/20 rounded-full p-3">
                <Calendar className="h-5 w-5 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-effect">
            <CardContent className="p-5 flex justify-between items-center">
              <div>
                <p className="text-white/60">Offers</p>
                <p className="text-2xl font-bold text-white">
                  {MOCK_APPLICATIONS.filter(app => app.status === "offered").length}
                </p>
              </div>
              <div className="bg-green-500/20 rounded-full p-3">
                <CheckCircle className="h-5 w-5 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Applications List and Details */}
        <Card className="glass-effect">
          <CardHeader>
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="bg-white/10">
                <TabsTrigger 
                  value="all" 
                  className="text-white data-[state=active]:bg-[#F2FF44] data-[state=active]:text-black"
                >
                  All Applications
                </TabsTrigger>
                <TabsTrigger 
                  value="pending" 
                  className="text-white data-[state=active]:bg-[#F2FF44] data-[state=active]:text-black"
                >
                  In Progress
                </TabsTrigger>
                <TabsTrigger 
                  value="interview" 
                  className="text-white data-[state=active]:bg-[#F2FF44] data-[state=active]:text-black"
                >
                  Interviews
                </TabsTrigger>
                <TabsTrigger 
                  value="offered" 
                  className="text-white data-[state=active]:bg-[#F2FF44] data-[state=active]:text-black"
                >
                  Offers
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              {/* Applications Table */}
              <div className="lg:col-span-2">
                <ScrollArea className="h-[calc(100vh-400px)]">
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-transparent">
                        <TableHead className="text-white/70">Position</TableHead>
                        <TableHead className="text-white/70">Status</TableHead>
                        <TableHead className="text-white/70 text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredApplications.map((application) => (
                        <TableRow 
                          key={application.id}
                          className={`border-b border-white/10 hover:bg-white/5 cursor-pointer ${
                            selectedApplication === application.id ? 'bg-white/10' : ''
                          }`}
                          onClick={() => setSelectedApplication(application.id)}
                        >
                          <TableCell>
                            <div>
                              <p className="font-medium text-white">{application.position}</p>
                              <p className="text-white/60 text-sm">{application.company}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            {getStatusBadge(application.status)}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-white/70 hover:text-white hover:bg-white/10"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedApplication(application.id);
                              }}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                      
                      {filteredApplications.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={3} className="text-center py-6 text-white/60">
                            No applications found in this category
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </div>
              
              {/* Application Details */}
              <div className="lg:col-span-3">
                {selectedApplication ? (
                  (() => {
                    const application = MOCK_APPLICATIONS.find(app => app.id === selectedApplication);
                    if (!application) return null;
                    
                    return (
                      <div className="space-y-6">
                        <div className="flex items-start justify-between">
                          <div>
                            <h2 className="text-xl font-bold text-white">{application.position}</h2>
                            <p className="text-white/70 flex items-center mt-1">
                              <Building className="h-4 w-4 mr-1" />
                              {application.company}
                            </p>
                            <p className="text-white/60 text-sm mt-1">
                              Applied on {formatDate(application.appliedDate)}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(application.status)}
                            <span className="text-white font-medium">{application.statusText}</span>
                          </div>
                        </div>
                        
                        {/* Interview Schedule */}
                        {application.interviews.length > 0 && (
                          <div>
                            <h3 className="text-lg font-medium text-white mb-3">Interview Schedule</h3>
                            <div className="space-y-3">
                              {application.interviews.map((interview, index) => (
                                <div key={index} className="bg-white/5 rounded-lg p-4 border border-white/10">
                                  <div className="flex justify-between items-center">
                                    <h4 className="font-medium text-white">{interview.type}</h4>
                                    <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">Upcoming</Badge>
                                  </div>
                                  <div className="mt-2 space-y-1 text-white/70">
                                    <p className="flex items-center">
                                      <Calendar className="h-4 w-4 mr-2" />
                                      {interview.date} at {interview.time}
                                    </p>
                                    <p className="flex items-center">
                                      <MapPin className="h-4 w-4 mr-2" />
                                      {interview.location}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {/* Communication History */}
                        <div>
                          <h3 className="text-lg font-medium text-white mb-3">Communication History</h3>
                          <div className="space-y-3">
                            {application.messages.map((message) => (
                              <div key={message.id} className="bg-white/5 rounded-lg p-4 border border-white/10">
                                <div className="flex justify-between items-center">
                                  <h4 className="font-medium text-white">{message.sender}</h4>
                                  <span className="text-white/50 text-sm">{message.date}</span>
                                </div>
                                <p className="mt-2 text-white/80">{message.content}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        {/* Actions */}
                        <div className="flex gap-3 pt-2">
                          <Button className="bg-[#F2FF44] text-black hover:bg-[#E2EF34]">
                            <MessageSquare className="mr-2 h-4 w-4" />
                            Contact Employer
                          </Button>
                          <Button variant="outline" className="text-white border-white/20 hover:bg-white/10">
                            View Application
                          </Button>
                        </div>
                      </div>
                    );
                  })()
                ) : (
                  <div className="h-[calc(100vh-400px)] flex items-center justify-center">
                    <div className="text-center">
                      <FileText className="h-16 w-16 text-white/20 mx-auto mb-4" />
                      <h3 className="text-xl font-medium text-white">Select an application</h3>
                      <p className="text-white/60 mt-2">
                        Choose an application from the list to view details
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ApplicationsPage;
