
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Camera, User, KeyRound } from "lucide-react";
import FaceCapture from "@/components/auth/FaceCapture";

const LoginForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loginMethod, setLoginMethod] = useState("credentials");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const handleCredentialLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate authentication
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, hardcoded roles
      if (email.includes("admin")) {
        navigate("/admin/dashboard");
      } else if (email.includes("hr")) {
        navigate("/hr/dashboard");
      } else {
        navigate("/student/dashboard");
      }
      
      toast({
        title: "Login successful",
        description: "Welcome back!",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "Please check your credentials and try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleFaceLogin = async (faceData: string) => {
    setIsLoading(true);
    
    try {
      // In a real app, would send face data to server for verification
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, always succeed and redirect to student dashboard
      navigate("/student/dashboard");
      
      toast({
        title: "Face recognition successful",
        description: "Welcome back!",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Face recognition failed",
        description: "We couldn't verify your identity. Please try again or use credentials.",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div>
      <Tabs value={loginMethod} onValueChange={setLoginMethod}>
        <TabsList className="grid grid-cols-2 mb-6 bg-background/20">
          <TabsTrigger value="credentials" className="flex items-center gap-2">
            <KeyRound className="h-4 w-4" />
            <span>Credentials</span>
          </TabsTrigger>
          <TabsTrigger value="face" className="flex items-center gap-2">
            <Camera className="h-4 w-4" />
            <span>Face ID</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="credentials">
          <form onSubmit={handleCredentialLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="text-sm text-primary hover:underline">
                  Forgot password?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </TabsContent>
        
        <TabsContent value="face">
          <Card className="p-4 border border-white/10 bg-background/20">
            <div className="text-center mb-4">
              <p className="text-white/80">Look at the camera to verify your identity</p>
            </div>
            <FaceCapture onCapture={handleFaceLogin} isVerifying={isLoading} />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LoginForm;
