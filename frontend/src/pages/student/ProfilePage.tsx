import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { User, Mail, Phone, MapPin, Briefcase, GraduationCap, Calendar, Save } from "lucide-react";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("personal");

  // Mock student data
  const studentData = {
    name: "Mohamed Boukthir",
    email: "mohamed.boukthir@issatgafsa.tn",
    avatar: "https://avatars.githubusercontent.com/u/124532428?v=4",
    phone: "+216 20 123 456",
    location: "Gafsa, Tunisia",
    university: "ISSAT Gafsa",
    major: "Cybersecurity (Master)",
    graduationYear: "2025",
    skills: ["Cybersecurity", "Network Security", "Python", "Linux", "Penetration Testing"],
    about: "Master's student in Cybersecurity at ISSAT Gafsa, passionate about information security, ethical hacking, and protecting digital assets. Looking for opportunities to apply my skills in real-world security projects.",
    experience: [
      {
        title: "Cybersecurity Intern",
        company: "Tunisie Telecom",
        period: "Summer 2024",
        description: "Worked on vulnerability assessments and implemented security best practices for internal systems."
      }
    ],
    education: [
      {
        degree: "Master's in Cybersecurity",
        institution: "ISSAT Gafsa",
        period: "2023 - 2025",
        gpa: "16.2/20"
      }
    ]
  };

  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white">My Profile</h1>
          <p className="text-lg text-white/60 mt-2">Manage your personal information and preferences</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Summary Card */}
          <Card className="glass-effect md:col-span-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-white">Profile Summary</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center text-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={studentData.avatar} alt={studentData.name} />
                <AvatarFallback className="text-2xl">{studentData.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-semibold text-white">{studentData.name}</h3>
              <p className="text-white/60">{studentData.major} Student</p>
              <p className="text-white/60">{studentData.university}</p>
              
              <div className="w-full mt-4 space-y-2">
                <div className="flex items-center text-white/70">
                  <Mail className="h-4 w-4 mr-2" />
                  <span>{studentData.email}</span>
                </div>
                <div className="flex items-center text-white/70">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>{studentData.phone}</span>
                </div>
                <div className="flex items-center text-white/70">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{studentData.location}</span>
                </div>
              </div>
              
              <div className="mt-6 flex flex-wrap gap-2">
                {studentData.skills.map((skill, index) => (
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
                  <TabsTrigger value="education" className="text-white data-[state=active]:bg-[#F2FF44] data-[state=active]:text-black">
                    Education
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
                        <Input defaultValue={studentData.name} className="pl-10 bg-white/5 border-white/10 text-white" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-white/70">Email</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-2.5 h-5 w-5 text-white/40" />
                        <Input defaultValue={studentData.email} className="pl-10 bg-white/5 border-white/10 text-white" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-white/70">Phone</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-2.5 h-5 w-5 text-white/40" />
                        <Input defaultValue={studentData.phone} className="pl-10 bg-white/5 border-white/10 text-white" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-white/70">Location</label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-white/40" />
                        <Input defaultValue={studentData.location} className="pl-10 bg-white/5 border-white/10 text-white" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm text-white/70">About Me</label>
                    <textarea 
                      defaultValue={studentData.about}
                      className="w-full rounded-md p-3 bg-white/5 border border-white/10 text-white min-h-[100px]"
                    />
                  </div>
                  
                  <Button className="bg-[#F2FF44] text-black hover:bg-[#E2EF34]">
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </Button>
                </TabsContent>
                
                <TabsContent value="education" className="mt-4 space-y-4">
                  <div className="space-y-4">
                    {studentData.education.map((edu, index) => (
                      <div key={index} className="p-4 bg-white/5 border border-white/10 rounded-lg">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="font-medium text-white">{edu.degree}</h3>
                            <p className="text-white/70">{edu.institution}</p>
                          </div>
                          <div className="flex items-center space-x-2 text-white/60">
                            <Calendar className="h-4 w-4" />
                            <span>{edu.period}</span>
                          </div>
                        </div>
                        <div className="mt-2 flex items-center text-white/70">
                          <GraduationCap className="h-4 w-4 mr-2" />
                          <span>GPA: {edu.gpa}</span>
                        </div>
                      </div>
                    ))}
                    
                    <Button variant="outline" className="w-full border-dashed border-white/20 text-white hover:bg-white/10">
                      + Add Education
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="experience" className="mt-4 space-y-4">
                  <div className="space-y-4">
                    {studentData.experience.map((exp, index) => (
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
