import { Card } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      quote: "Internsat helped me land my dream internship at a top tech company. Highly recommended!",
      author: "Sarah Johnson",
      role: "Software Engineering Intern"
    },
    {
      quote: "Thanks to Internsat, I gained valuable experience and built connections in my industry.",
      author: "Michael Chen",
      role: "Marketing Intern"
    },
    {
      quote: "The platform made it so easy to find and apply for internships. A game-changer for students!",
      author: "Emma Davis",
      role: "Business Analyst Intern"
    }
  ];

  return (
    <div className="py-20 px-4 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-accent/5 backdrop-blur-3xl"></div>
      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-4xl font-bold text-white text-center mb-4">
          What Our Users Say
        </h2>
        <p className="text-xl text-white/60 text-center mb-12 max-w-2xl mx-auto">
          Hear from students and professionals who have kickstarted their careers with Internsat.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6 hover-lift glass-effect">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <p className="text-white/80 mb-4 italic">"{testimonial.quote}"</p>
              <div className="text-white font-semibold">{testimonial.author}</div>
              <div className="text-white/60 text-sm">{testimonial.role}</div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;