import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Camera } from "lucide-react";
import FaceCapture from "@/components/auth/FaceCapture";
import { register } from "@/services/api";

const RegisterForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "student",
  });
  const [faceData, setFaceData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Validation errors
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  // Helper functions for validation
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isStrongPassword = (password: string) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // Clear errors on input change
  };

  // Handle role selection
  const handleRoleChange = (value: string) => {
    setUserData((prev) => ({ ...prev, role: value }));
  };

  // Validate inputs before proceeding to the next step
  const validateInputs = () => {
    const newErrors: any = {};

    if (!userData.firstName.trim()) newErrors.firstName = "First name is required.";
    if (!userData.lastName.trim()) newErrors.lastName = "Last name is required.";
    if (!userData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!isValidEmail(userData.email)) {
      newErrors.email = "Invalid email format.";
    }
    if (!userData.password.trim()) {
      newErrors.password = "Password is required.";
    } else if (!isStrongPassword(userData.password)) {
      newErrors.password =
        "Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, a number, and a special character.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // Handle next step
  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateInputs()) {
      setStep(2);
    }
  };

  // Handle face capture
  const handleCapture = (imageData: string) => {
    setFaceData(imageData);
    setStep(3);
  };

  // Handle registration submission
  const handleRegister = async () => {
    if (!faceData) return;

    setIsLoading(true);
    try {
      const userDataToSend = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: userData.password,
        role: userData.role,
        image: faceData,
      };

      // Send user data to the backend
      const response = await register(userDataToSend);

      toast({
        title: "Registration successful",
        description: "Your account has been created successfully.",
      });

      // Redirect to login tab
      navigate("/login");
    } catch (error) {
      // Check for specific error messages
      if (error.response?.data?.error === "Email already exists") {
        toast({
          variant: "destructive",
          title: "Registration failed",
          description: "The email you entered is already registered. Please use a different email.",
        });
      } else if (error.response?.data?.error === "Face already registered") {
        toast({
          variant: "destructive",
          title: "Registration failed",
          description: "The face you used is already registered. Please use a different face.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Registration failed",
          description: "Something went wrong. Please try again.",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {step === 1 && (
        <form onSubmit={handleNext} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                value={userData.firstName}
                onChange={handleInputChange}
                required
              />
              {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                value={userData.lastName}
                onChange={handleInputChange}
                required
              />
              {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={userData.email}
              onChange={handleInputChange}
              required
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={userData.password}
              onChange={handleInputChange}
              required
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select value={userData.role} onValueChange={handleRoleChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="student">Student</SelectItem>
                <SelectItem value="hr">HR Manager</SelectItem>
              </SelectContent>
            </Select>
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
          <FaceCapture onCapture={handleCapture} isVerifying={false} />
          <Button
            className="w-full mt-4"
            onClick={() => setStep(1)}
          >
            Back to Details
          </Button>
        </Card>
      )}

      {step === 3 && faceData && (
        <Card className="p-4 border border-white/10 bg-background/20">
          <div className="text-center mb-4">
            <h3 className="text-lg font-medium text-white">Confirm Registration</h3>
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
              onClick={handleRegister}
              disabled={isLoading}
              className="w-full bg-[#F2FF44] text-black hover:bg-[#E2EF34]"
            >
              {isLoading ? "Creating Account..." : "Complete Registration"}
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

export default RegisterForm;