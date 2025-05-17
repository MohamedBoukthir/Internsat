import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  Building, 
  Calendar, 
  Save,
  Globe,
  Users
} from "lucide-react";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("personal");

  // Mock HR data
  const hrData = {
    name: "Sana Ben Ahmed",
    email: "sana.benahmed@vermeg.com",
    avatar: "/vermeg-hr-avatar.jpg",
    phone: "+216 71 123 456",
    location: "Tunis, Tunisia",
    company: "Vermeg",
    role: "HR Manager",
    department: "Human Resources",
    joinDate: "January 2019",
    skills: ["Recruitment", "Employee Relations", "Talent Acquisition", "Onboarding", "HR Policy"],
    about: "Experienced HR professional at Vermeg, passionate about building strong teams and supporting employee growth in the Tunisian tech sector.",
    experience: [
      {
        title: "HR Manager",
        company: "Vermeg",
        period: "2019 - Present",
        description: "Leading recruitment and HR operations for Vermeg's Tunis office. Implemented new onboarding processes and employee engagement programs."
      },
      {
        title: "HR Specialist",
        company: "Tunisie Telecom",
        period: "2016 - 2019",
        description: "Managed recruitment and employee relations for technical teams. Organized training and development workshops."
      }
    ],
    education: [
      {
        degree: "Master's in Human Resource Management",
        institution: "IHEC Carthage",
        period: "2013 - 2015"
      },
      {
        degree: "Bachelor's in Business Administration",
        institution: "ISG Tunis",
        period: "2010 - 2013"
      }
    ]
  };

  return (
    <DashboardLayout role="hr">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white">My Profile</h1>
          <p className="text-lg text-white/60 mt-2">Manage your professional information and company details</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Summary Card */}
          <Card className="glass-effect md:col-span-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-white">Profile Summary</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center text-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={hrData.avatar} alt={hrData.name} />
                <AvatarFallback className="text-2xl">{hrData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-semibold text-white">{hrData.name}</h3>
              <p className="text-white/60">{hrData.role}</p>
              <p className="text-white/60">{hrData.company}</p>
              
              <div className="w-full mt-4 space-y-2">
                <div className="flex items-center text-white/70">
                  <Mail className="h-4 w-4 mr-2" />
                  <span>{hrData.email}</span>
                </div>
                <div className="flex items-center text-white/70">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>{hrData.phone}</span>
                </div>
                <div className="flex items-center text-white/70">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{hrData.location}</span>
                </div>
                <div className="flex items-center text-white/70">
                  <Building className="h-4 w-4 mr-2" />
                  <span>{hrData.department}</span>
                </div>
              </div>
              
              <div className="mt-6 flex flex-wrap gap-2">
                {hrData.skills.map((skill, index) => (
                  <span 
                    key={index} 
                    className="bg-white/10 text-white px-2 py-1 rounded-full text-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Main Profile Content */}
          <Card className="glass-effect md:col-span-2">
            <CardContent className="pt-6">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-white/10">
                  <TabsTrigger value="personal" className="text-white data-[state=active]:bg-[#F2FF44] data-[state=active]:text-black">
                    Personal Info
                  </TabsTrigger>
                  <TabsTrigger value="company" className="text-white data-[state=active]:bg-[#F2FF44] data-[state=active]:text-black">
                    Company Details
                  </TabsTrigger>
                  <TabsTrigger value="experience" className="text-white data-[state=active]:bg-[#F2FF44] data-[state=active]:text-black">
                    Experience
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="personal" className="mt-4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm text-white/70">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-2.5 h-5 w-5 text-white/40" />
                        <Input defaultValue={hrData.name} className="pl-10 bg-white/5 border-white/10 text-white" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-white/70">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-2.5 h-5 w-5 text-white/40" />
                        <Input defaultValue={hrData.email} className="pl-10 bg-white/5 border-white/10 text-white" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-white/70">Phone</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-2.5 h-5 w-5 text-white/40" />
                        <Input defaultValue={hrData.phone} className="pl-10 bg-white/5 border-white/10 text-white" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-white/70">Location</label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-white/40" />
                        <Input defaultValue={hrData.location} className="pl-10 bg-white/5 border-white/10 text-white" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-white/70">Role/Position</label>
                      <div className="relative">
                        <Briefcase className="absolute left-3 top-2.5 h-5 w-5 text-white/40" />
                        <Input defaultValue={hrData.role} className="pl-10 bg-white/5 border-white/10 text-white" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-white/70">Department</label>
                      <div className="relative">
                        <Users className="absolute left-3 top-2.5 h-5 w-5 text-white/40" />
                        <Input defaultValue={hrData.department} className="pl-10 bg-white/5 border-white/10 text-white" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm text-white/70">About Me</label>
                    <textarea 
                      defaultValue={hrData.about}
                      className="w-full rounded-md p-3 bg-white/5 border border-white/10 text-white min-h-[100px]"
                    />
                  </div>
                  
                  <Button className="bg-[#F2FF44] text-black hover:bg-[#E2EF34]">
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </TabsContent>
                
                <TabsContent value="company" className="mt-4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm text-white/70">Company Name</label>
                      <div className="relative">
                        <Building className="absolute left-3 top-2.5 h-5 w-5 text-white/40" />
                        <Input defaultValue={hrData.company} className="pl-10 bg-white/5 border-white/10 text-white" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-white/70">Company Website</label>
                      <div className="relative">
                        <Globe className="absolute left-3 top-2.5 h-5 w-5 text-white/40" />
                        <Input defaultValue="www.techinnovate.com" className="pl-10 bg-white/5 border-white/10 text-white" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-white/70">Industry</label>
                      <div className="relative">
                        <Briefcase className="absolute left-3 top-2.5 h-5 w-5 text-white/40" />
                        <Input defaultValue="Technology" className="pl-10 bg-white/5 border-white/10 text-white" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-white/70">Company Size</label>
                      <div className="relative">
                        <Users className="absolute left-3 top-2.5 h-5 w-5 text-white/40" />
                        <Input defaultValue="50-200 employees" className="pl-10 bg-white/5 border-white/10 text-white" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm text-white/70">Company Description</label>
                    <textarea 
                      defaultValue="Tech Innovate Inc. is a forward-thinking technology company specializing in AI-powered solutions for businesses. We're dedicated to creating innovative products that solve real-world problems while fostering a collaborative and inclusive workplace."
                      className="w-full rounded-md p-3 bg-white/5 border border-white/10 text-white min-h-[100px]"
                    />
                  </div>
                  
                  <Button className="bg-[#F2FF44] text-black hover:bg-[#E2EF34]">
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </TabsContent>
                
                <TabsContent value="experience" className="mt-4 space-y-4">
                  <div className="space-y-4">
                    {hrData.experience.map((exp, index) => (
                      <div key={index} className="p-4 bg-white/5 border border-white/10 rounded-lg">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="font-medium text-white">{exp.title}</h3>
                            <p className="text-white/70">{exp.company}</p>
                          </div>
                          <div className="flex items-center space-x-2 text-white/60">
                            <Calendar className="h-4 w-4" />
                            <span>{exp.period}</span>
                          </div>
                        </div>
                        <p className="mt-2 text-white/70">{exp.description}</p>
                      </div>
                    ))}
                    
                    <Button variant="outline" className="w-full border-dashed border-white/20 text-white hover:bg-white/10">
                      + Add Experience
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProfilePage;
