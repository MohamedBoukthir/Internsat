import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Building, Globe, MapPin, Users, Briefcase } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const CompanyProfilePage = () => {
  const [formData, setFormData] = useState({
    name: "Vermeg",
    website: "https://www.vermeg.com",
    location: "Tunis, Tunisia",
    industry: "Financial Software",
    size: "500-1000",
    founded: "2002",
    about:
      "Vermeg is a leading Tunisian software company providing solutions for the financial services industry, including banking, insurance, and capital markets. With a global presence, Vermeg is recognized for its innovation and expertise.",
    logoUrl: "https://media.licdn.com/dms/image/v2/D4E0BAQFPJ4arGSb5Tg/company-logo_200_200/company-logo_200_200/0/1696589536789/vermeg_logo?e=2147483647&v=beta&t=ay-XwJD7C1Wyd9M_mRJurYk6Lw3YPcZAx70l9G0vAbw"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would update the company profile in the database
    console.log("Updating company profile:", formData);
    
    // Show success toast
    toast({
      title: "Profile Updated",
      description: "Your company profile has been successfully updated.",
    });
  };

  return (
    <DashboardLayout role="hr">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Company Profile</h1>
          <p className="text-lg text-white/60 mt-2">Manage your company information</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="glass-effect border-white/10 lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-white">Company Overview</CardTitle>
              <CardDescription className="text-white/60">Your company's public profile</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-center">
                <div className="relative w-32 h-32 bg-white/10 rounded-lg overflow-hidden">
                  <img 
                    src={formData.logoUrl}
                    alt="Company logo"
                    className="w-full h-full object-cover"
                  />
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs py-1 hover:bg-black/70"
                  >
                    Change Logo
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-white">
                  <Building className="h-5 w-5 text-white/60" />
                  <span>{formData.name}</span>
                </div>
                <div className="flex items-center gap-2 text-white/70">
                  <Globe className="h-5 w-5 text-white/60" />
                  <span>{formData.website}</span>
                </div>
                <div className="flex items-center gap-2 text-white/70">
                  <MapPin className="h-5 w-5 text-white/60" />
                  <span>{formData.location}</span>
                </div>
                <div className="flex items-center gap-2 text-white/70">
                  <Briefcase className="h-5 w-5 text-white/60" />
                  <span>{formData.industry}</span>
                </div>
                <div className="flex items-center gap-2 text-white/70">
                  <Users className="h-5 w-5 text-white/60" />
                  <span>{formData.size} employees</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-effect border-white/10 lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-white">Edit Company Information</CardTitle>
              <CardDescription className="text-white/60">Update your company's details</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white">Company Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="bg-white/5 border-white/10 text-white"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="website" className="text-white">Website</Label>
                    <Input
                      id="website"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      className="bg-white/5 border-white/10 text-white"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-white">Location</Label>
                    <Input
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="bg-white/5 border-white/10 text-white"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="industry" className="text-white">Industry</Label>
                    <Input
                      id="industry"
                      name="industry"
                      value={formData.industry}
                      onChange={handleChange}
                      className="bg-white/5 border-white/10 text-white"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="size" className="text-white">Company Size</Label>
                    <Input
                      id="size"
                      name="size"
                      value={formData.size}
                      onChange={handleChange}
                      className="bg-white/5 border-white/10 text-white"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="founded" className="text-white">Founded Year</Label>
                    <Input
                      id="founded"
                      name="founded"
                      value={formData.founded}
                      onChange={handleChange}
                      className="bg-white/5 border-white/10 text-white"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="about" className="text-white">About Company</Label>
                  <Textarea
                    id="about"
                    name="about"
                    value={formData.about}
                    onChange={handleChange}
                    className="min-h-[150px] bg-white/5 border-white/10 text-white"
                    required
                  />
                </div>

                <div className="flex justify-end">
                  <Button type="submit" className="bg-[#F2FF44] text-black hover:bg-[#E2EF34]">
                    Save Changes
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CompanyProfilePage;
