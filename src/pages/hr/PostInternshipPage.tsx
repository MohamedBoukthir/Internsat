
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";

const PostInternshipPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    company: "YourCompany Inc.", // In a real app, this would come from the HR's company profile
    location: "",
    type: "full-time",
    duration: "",
    description: "",
    requirements: "",
    stipend: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the data to an API
    console.log("Submitting internship:", formData);
    
    // Show success toast
    toast({
      title: "Internship Posted",
      description: "Your internship has been successfully posted.",
    });
    
    // Redirect to HR dashboard
    navigate("/hr/dashboard");
  };

  return (
    <DashboardLayout role="hr">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Post New Internship</h1>
          <p className="text-lg text-white/60 mt-2">Create a new internship opportunity for students</p>
        </div>

        <Card className="glass-effect border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Internship Details</CardTitle>
            <CardDescription className="text-white/60">Fill in the details of the internship position</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-white">Position Title</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="e.g. Frontend Developer Intern"
                    value={formData.title}
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
                    placeholder="e.g. New York, NY or Remote"
                    value={formData.location}
                    onChange={handleChange}
                    className="bg-white/5 border-white/10 text-white"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type" className="text-white">Internship Type</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => handleSelectChange("type", value)}
                  >
                    <SelectTrigger className="bg-white/5 border-white/10 text-white">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border-white/10">
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="part-time">Part-time</SelectItem>
                      <SelectItem value="remote">Remote</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration" className="text-white">Duration</Label>
                  <Input
                    id="duration"
                    name="duration"
                    placeholder="e.g. 3 months"
                    value={formData.duration}
                    onChange={handleChange}
                    className="bg-white/5 border-white/10 text-white"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stipend" className="text-white">Stipend/Compensation</Label>
                  <Input
                    id="stipend"
                    name="stipend"
                    placeholder="e.g. $1000/month or Unpaid"
                    value={formData.stipend}
                    onChange={handleChange}
                    className="bg-white/5 border-white/10 text-white"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-white">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe the internship role, responsibilities, and what the intern will be working on"
                  value={formData.description}
                  onChange={handleChange}
                  className="min-h-[100px] bg-white/5 border-white/10 text-white"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="requirements" className="text-white">Requirements</Label>
                <Textarea
                  id="requirements"
                  name="requirements"
                  placeholder="List the skills, qualifications, or experience required for this internship"
                  value={formData.requirements}
                  onChange={handleChange}
                  className="min-h-[100px] bg-white/5 border-white/10 text-white"
                  required
                />
              </div>

              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => navigate("/hr/dashboard")}
                  className="text-white hover:bg-white/10"
                >
                  Cancel
                </Button>
                <Button type="submit" className="bg-[#F2FF44] text-black hover:bg-[#E2EF34]">
                  Post Internship
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default PostInternshipPage;
