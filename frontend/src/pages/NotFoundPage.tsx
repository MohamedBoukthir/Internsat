
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full px-4">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <AlertTriangle className="h-24 w-24 text-[#F2FF44]" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-white mb-4">Page Not Found</h2>
          <p className="text-white/60 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="space-y-4">
            <Button
               onClick={() => {
                const role = localStorage.getItem("role");
                if (role === "admin") {
                  navigate("/admin/dashboard");
                } else if (role === "student") {
                  navigate("/student/dashboard");
                } else if (role === "hr") {
                  navigate("/hr/dashboard");
                } else {
                  navigate("/"); 
                }
              }}
              className="w-full bg-[#F2FF44] text-black hover:bg-[#E2EF34]"
            >
              Go to Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
