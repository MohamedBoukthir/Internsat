import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Camera } from "lucide-react";
import FaceCapture from "@/components/auth/FaceCapture";
import { login } from "@/services/api";

const LoginForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [faceData, setFaceData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Handle credential submission
  const handleCredentialSubmit = (e) => {
    e.preventDefault();
    setStep(2);  // Move to face capture step
  };

  // Handle face capture
  const handleFaceCapture = (imageData) => {
    console.log("Captured face data:", imageData);
    setFaceData(imageData);
    setStep(3);  // Move to final submission step
  };

  // Handle login submission
  const handleLogin = async () => {
    if (!faceData) {
      toast({
        variant: "destructive",
        title: "Face capture required",
        description: "Please capture your face to proceed.",
      });
      return;
    }
    console.log("Login payload:", { email, password, faceData });  // Log the payload
    setIsLoading(true);
    try {
      const response = await login(email, password, faceData);
      console.log("Login response:", response);  // Log the response
      localStorage.setItem('token', response.access_token);
  
      // Redirect based on the role returned by the backend
      const role = response.role;
      if (role === "admin") {
        navigate("/admin/dashboard");
      } else if (role === "hr") {
        navigate("/hr/dashboard");
      } else {
        navigate("/student/dashboard");
      }
  
      toast({
        title: "Login successful",
        description: "Welcome back!",
      });
      console.log(email); // debugging
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

  return (
    <div>
      {step === 1 && (
        <form onSubmit={handleCredentialSubmit} className="space-y-4">
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
          <Button type="submit" className="w-full bg-[#F2FF44] text-black hover:bg-[#E2EF34]">
            Next: Capture Face
          </Button>
        </form>
      )}

      {step === 2 && (
        <Card className="p-4 border border-white/10 bg-background/20">
          <div className="text-center mb-4">
            <h3 className="text-lg font-medium text-white">Capture Your Face</h3>
            <p className="text-white/80">Center your face in the frame and take a photo</p>
          </div>
          <FaceCapture onCapture={handleFaceCapture} isVerifying={false} />
          <Button
            className="w-full mt-4"
            onClick={() => setStep(1)}
          >
            Back to Credentials
          </Button>
        </Card>
      )}

      {step === 3 && faceData && (
        <Card className="p-4 border border-white/10 bg-background/20">
          <div className="text-center mb-4">
            <h3 className="text-lg font-medium text-white">Confirm Login</h3>
            <p className="text-white/80">Your face has been captured successfully</p>
          </div>

          <div className="flex justify-center mb-4">
            <img
              src={faceData}
              alt="Captured face"
              className="w-32 h-32 object-cover rounded-full border-2 border-white/20"
            />
          </div>

          <div className="flex flex-col gap-3">
            <Button
              onClick={handleLogin}
              disabled={isLoading}
              className="w-full bg-[#F2FF44] text-black hover:bg-[#E2EF34]"
            >
              {isLoading ? "Logging in..." : "Complete Login"}
            </Button>
            <Button
              onClick={() => setStep(2)}
              disabled={isLoading}
              className="w-full"
            >
              Retake Photo
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default LoginForm;