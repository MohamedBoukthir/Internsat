import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-background/80 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="text-2xl font-bold text-white">Internsat</div>
        {/* Make buttons visible on all screen sizes */}
        <div className="flex items-center space-x-4">
          <Link to="/register">
            <Button variant="outline" className="text-white border-white/20 hover:bg-white/10">
              Create Account
            </Button>
          </Link>
          <Link to="/login">
            <Button className="bg-[#F2FF44] text-black hover:bg-[#E2EF34]">
              Login
              <LogIn className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
