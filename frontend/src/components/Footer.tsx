import { Github, Twitter, Linkedin } from "lucide-react";
import { Button } from "./ui/button";

const Footer = () => {
  return (
    <footer className="py-20 px-4 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-accent/5 backdrop-blur-3xl"></div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white">Internsat</h3>
            <p className="text-white/60">
              Connecting students with their dream internships and helping them build successful careers.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="hover:bg-white/10">
                <Twitter className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-white/10">
                <Github className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-white/10">
                <Linkedin className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Product Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Platform</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/60 hover:text-white transition-colors">Features</a></li>
              <li><a href="#" className="text-white/60 hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#" className="text-white/60 hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="text-white/60 hover:text-white transition-colors">FAQs</a></li>
            </ul>
          </div>

          {/* Company Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/60 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-white/60 hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="text-white/60 hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="text-white/60 hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>

          {/* Legal Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/60 hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-white/60 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-white/60 hover:text-white transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="text-white/60 hover:text-white transition-colors">Licenses</a></li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-center text-white/60">
            © 2025 Internsat. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;