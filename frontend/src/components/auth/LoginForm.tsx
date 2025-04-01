import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
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

  // Validation errors
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  // Helper function for email validation
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Helper function for password strength validation
  const isStrongPassword = (password: string) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  // Validate inputs before proceeding to the next step
  const validateInputs = () => {
    const newErrors: any = {};

    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!isValidEmail(email)) {
      newErrors.email = "Invalid email format.";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required.";
    } else if (!isStrongPassword(password)) {
      newErrors.password =
        "Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, a number, and a special character.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // Handle credential submission
  const handleCredentialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateInputs()) {
      setStep(2); // Move to face capture step
    }
  };

  // Handle face capture
  const handleFaceCapture = (imageData: string) => {
    setFaceData(imageData);
    setStep(3); // Move to final submission step
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

    setIsLoading(true);
    try {
      const response = await login(email, password, faceData);
      localStorage.setItem("token", response.access_token);

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
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors((prev) => ({ ...prev, email: "" })); // Clear email error
              }}
              required
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
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
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors((prev) => ({ ...prev, password: "" })); // Clear password error
              }}
              required
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
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
          <Button className="w-full mt-4" onClick={() => setStep(1)}>
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