import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const Hero = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-20 bg-background">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
          Find Your Dream Internship
          </h1>
          <p className="text-lg text-white/80 max-w-xl">
          Explore thousands of internship opportunities tailored to your skills and interests. Start building your career today with Internsat.          </p>
          <Button className="px-8 py-6 text-lg bg-white text-black hover:bg-white/90 flex items-center gap-2">
            <Download className="w-5 h-5" />
            Download Application
          </Button>
          <div className="grid grid-cols-3 gap-8 pt-8">
            <div>
              <div className="text-3xl font-bold text-white">500+</div>
              <div className="text-white/60">Internships Available</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">30</div>
              <div className="text-white/60">Applications Submitted</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">120+</div>
              <div className="text-white/60">Companies Partnered</div>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1573496547376-81418527a728?q=80&w=1588&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Internsat"
              className="w-full h-auto"
            />
          </div>
          <div className="absolute -bottom-4 -right-4 w-72 h-72 bg-accent/20 rounded-full blur-3xl"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;