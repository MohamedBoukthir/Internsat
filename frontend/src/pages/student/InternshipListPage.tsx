import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Search, MapPin, Briefcase, Clock, Calendar, Building, Filter, Bookmark, BookmarkCheck, Send, X } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

// Mock data for internships
const MOCK_INTERNSHIPS = [
  {
    id: 1,
    title: "Frontend Developer Intern",
    company: "Vermeg",
    location: "Tunis, Tunisia",
    type: "Full-time",
    duration: "3 months",
    postedDate: "2 days ago",
    description: "Join Vermeg's frontend team to work on innovative financial software solutions. You will collaborate with experienced engineers, contribute to real projects, and learn best practices in React and TypeScript.",
    requirements: ["React", "JavaScript", "CSS", "Responsive Design"],
    salary: "800 TND/month",
    applicationDeadline: "June 30, 2024",
    saved: false
  },
  {
    id: 2,
    title: "Data Science Intern",
    company: "Sofrecom Tunisia",
    location: "El Ghazala, Tunisia",
    type: "Part-time",
    duration: "6 months",
    postedDate: "1 week ago",
    description: "Join Sofrecom's data science team to work on real-world projects involving machine learning, data visualization, and predictive analytics.",
    requirements: ["Python", "Machine Learning", "SQL", "Data Visualization"],
    salary: "1000 TND/month",
    applicationDeadline: "July 15, 2024",
    saved: true
  },
  {
    id: 3,
    title: "UX/UI Design Intern",
    company: "Telnet",
    location: "Ariana, Tunisia",
    type: "Full-time",
    duration: "4 months",
    postedDate: "3 days ago",
    description: "Exciting opportunity to work with Telnet's design team on creating user-centric designs for web and mobile applications.",
    requirements: ["Figma", "UI Design", "Prototyping", "User Research"],
    salary: "700 TND/month",
    applicationDeadline: "June 15, 2024",
    saved: false
  },
  {
    id: 4,
    title: "Backend Developer Intern",
    company: "Wevioo",
    location: "Lac 2, Tunis, Tunisia",
    type: "Full-time",
    duration: "3 months",
    postedDate: "5 days ago",
    description: "Join Wevioo's backend team to work on scalable APIs, database optimization, and server-side applications.",
    requirements: ["Node.js", "Express", "MongoDB", "RESTful APIs"],
    salary: "900 TND/month",
    applicationDeadline: "July 10, 2024",
    saved: false
  },
  {
    id: 5,
    title: "Marketing Intern",
    company: "OneTech Group",
    location: "La Marsa, Tunisia",
    type: "Part-time",
    duration: "6 months",
    postedDate: "1 day ago",
    description: "Assist OneTech Group's marketing team with social media campaigns, content creation, and market research.",
    requirements: ["Social Media", "Content Writing", "Market Research", "Analytics"],
    salary: "600 TND/month",
    applicationDeadline: "June 25, 2024",
    saved: true
  }
];

const InternshipListPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [internships, setInternships] = useState(MOCK_INTERNSHIPS);
  const [selectedInternship, setSelectedInternship] = useState<number | null>(null);
  const [isApplyDialogOpen, setIsApplyDialogOpen] = useState(false);
  const [applicationForm, setApplicationForm] = useState({
    coverLetter: "",
    resume: "",
    phoneNumber: ""
  });
  
  // Toggle saved state
  const toggleSaved = (id: number) => {
    setInternships(internships.map(internship => 
      internship.id === id ? {...internship, saved: !internship.saved} : internship
    ));
  };
  
  // Filter internships based on search term
  const filteredInternships = internships.filter(internship => 
    internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    internship.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    internship.location.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Handle application form changes
  const handleApplicationChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setApplicationForm(prev => ({ ...prev, [name]: value }));
  };

  // Submit application
  const handleApplySubmit = () => {
    // In a real app, this would send the application to an API
    console.log("Submitting application for internship ID:", selectedInternship);
    console.log("Application data:", applicationForm);
    
    // Close the dialog
    setIsApplyDialogOpen(false);
    
    // Reset the form
    setApplicationForm({
      coverLetter: "",
      resume: "",
      phoneNumber: ""
    });
    
    // Show success toast
    toast({
      title: "Application Submitted",
      description: "Your application has been successfully submitted.",
    });
  };
  
  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Find Internships</h1>
          <p className="text-lg text-white/60 mt-2">Discover internship opportunities that match your skills and interests</p>
        </div>

        {/* Search and Filters */}
        <Card className="glass-effect">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search by title, company, or location..."
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-white placeholder:text-white/40"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" className="text-white border-white/20 hover:bg-white/10">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Internship Listings */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Results List */}
          <div className="lg:col-span-1 space-y-4">
            <h2 className="text-xl font-semibold text-white mb-4">Results ({filteredInternships.length})</h2>
            
            {filteredInternships.length === 0 ? (
              <Card className="glass-effect p-6 text-center">
                <p className="text-white/70">No internships found matching your search criteria.</p>
              </Card>
            ) : (
              <div className="space-y-3 max-h-[calc(100vh-250px)] overflow-y-auto pr-2">
                {filteredInternships.map((internship) => (
                  <Card 
                    key={internship.id} 
                    className={`glass-effect cursor-pointer transition-all hover:bg-white/10 ${selectedInternship === internship.id ? 'ring-2 ring-[#F2FF44]' : ''}`}
                    onClick={() => setSelectedInternship(internship.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-white">{internship.title}</h3>
                          <p className="text-white/70 flex items-center mt-1">
                            <Building className="h-4 w-4 mr-1" />
                            {internship.company}
                          </p>
                          <p className="text-white/60 flex items-center text-sm mt-1">
                            <MapPin className="h-3 w-3 mr-1" />
                            {internship.location}
                          </p>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-white/70 hover:text-white hover:bg-white/10"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSaved(internship.id);
                          }}
                        >
                          {internship.saved ? (
                            <BookmarkCheck className="h-5 w-5 text-[#F2FF44]" />
                          ) : (
                            <Bookmark className="h-5 w-5" />
                          )}
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-3">
                        <Badge variant="outline" className="text-white/80 border-white/20 bg-white/5">
                          {internship.type}
                        </Badge>
                        <Badge variant="outline" className="text-white/80 border-white/20 bg-white/5">
                          {internship.duration}
                        </Badge>
                        <Badge variant="outline" className="text-white/80 border-white/20 bg-white/5">
                          {internship.salary}
                        </Badge>
                      </div>
                      <p className="text-white/50 text-xs mt-3 flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        Posted {internship.postedDate}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
          
          {/* Internship Details */}
          <div className="lg:col-span-2">
            {selectedInternship ? (
              <Card className="glass-effect h-full">
                <CardContent className="p-6">
                  {(() => {
                    const internship = internships.find(i => i.id === selectedInternship);
                    if (!internship) return null;
                    
                    return (
                      <div>
                        <div className="flex justify-between items-start">
                          <div>
                            <h2 className="text-2xl font-bold text-white">{internship.title}</h2>
                            <p className="text-white/70 text-lg">{internship.company}</p>
                          </div>
                          <Button 
                            variant="outline" 
                            className={`${
                              internship.saved 
                                ? 'bg-[#F2FF44] text-black border-[#F2FF44] hover:bg-[#E2EF34]' 
                                : 'text-white border-white/20 hover:bg-white/10'
                            }`}
                            onClick={() => toggleSaved(internship.id)}
                          >
                            {internship.saved ? (
                              <>
                                <BookmarkCheck className="mr-2 h-4 w-4" />
                                Saved
                              </>
                            ) : (
                              <>
                                <Bookmark className="mr-2 h-4 w-4" />
                                Save
                              </>
                            )}
                          </Button>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                          <div className="bg-white/5 rounded-lg p-3">
                            <p className="text-white/50 text-sm flex items-center">
                              <MapPin className="h-4 w-4 mr-1" />
                              Location
                            </p>
                            <p className="text-white font-medium mt-1">{internship.location}</p>
                          </div>
                          <div className="bg-white/5 rounded-lg p-3">
                            <p className="text-white/50 text-sm flex items-center">
                              <Briefcase className="h-4 w-4 mr-1" />
                              Type
                            </p>
                            <p className="text-white font-medium mt-1">{internship.type}</p>
                          </div>
                          <div className="bg-white/5 rounded-lg p-3">
                            <p className="text-white/50 text-sm flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              Duration
                            </p>
                            <p className="text-white font-medium mt-1">{internship.duration}</p>
                          </div>
                          <div className="bg-white/5 rounded-lg p-3">
                            <p className="text-white/50 text-sm flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              Deadline
                            </p>
                            <p className="text-white font-medium mt-1">{internship.applicationDeadline}</p>
                          </div>
                        </div>
                        
                        <div className="mt-6">
                          <h3 className="text-xl font-semibold text-white mb-3">Description</h3>
                          <p className="text-white/80 leading-relaxed">
                            {internship.description}
                          </p>
                        </div>
                        
                        <div className="mt-6">
                          <h3 className="text-xl font-semibold text-white mb-3">Requirements</h3>
                          <ul className="list-disc list-inside text-white/80 space-y-1">
                            {internship.requirements.map((req, index) => (
                              <li key={index}>{req}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="mt-8 flex gap-4">
                          <Button 
                            className="bg-[#F2FF44] text-black hover:bg-[#E2EF34] flex-1"
                            onClick={() => setIsApplyDialogOpen(true)}
                          >
                            <Send className="mr-2 h-4 w-4" />
                            Apply Now
                          </Button>
                          <Button variant="outline" className="text-white border-white/20 hover:bg-white/10">
                            Contact Company
                          </Button>
                        </div>
                      </div>
                    );
                  })()}
                </CardContent>
              </Card>
            ) : (
              <Card className="glass-effect h-full flex items-center justify-center p-10">
                <div className="text-center">
                  <Briefcase className="h-16 w-16 text-white/20 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-white">Select an internship</h3>
                  <p className="text-white/60 mt-2">
                    Choose an internship from the list to view its details
                  </p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Application Dialog */}
      <Dialog open={isApplyDialogOpen} onOpenChange={setIsApplyDialogOpen}>
        <DialogContent className="bg-background border-white/10">
          <DialogHeader>
            <DialogTitle className="text-white">Apply for Internship</DialogTitle>
            <DialogDescription className="text-white/60">
              Fill out the application form below to apply for this internship.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="coverLetter" className="text-white">Cover Letter</Label>
              <Textarea
                id="coverLetter"
                name="coverLetter"
                placeholder="Tell us why you're a good fit for this position..."
                value={applicationForm.coverLetter}
                onChange={handleApplicationChange}
                className="min-h-[150px] bg-white/5 border-white/10 text-white"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="resume" className="text-white">Resume Link</Label>
              <Input
                id="resume"
                name="resume"
                placeholder="Paste a link to your resume (Google Drive, Dropbox, etc.)"
                value={applicationForm.resume}
                onChange={handleApplicationChange}
                className="bg-white/5 border-white/10 text-white"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phoneNumber" className="text-white">Phone Number</Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Your contact phone number"
                value={applicationForm.phoneNumber}
                onChange={handleApplicationChange}
                className="bg-white/5 border-white/10 text-white"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsApplyDialogOpen(false)} className="text-white border-white/20 hover:bg-white/10">
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
            <Button className="bg-[#F2FF44] text-black hover:bg-[#E2EF34]" onClick={handleApplySubmit}>
              <Send className="mr-2 h-4 w-4" />
              Submit Application
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default InternshipListPage;
