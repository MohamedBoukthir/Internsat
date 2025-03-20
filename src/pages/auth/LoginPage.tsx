import { useNavigate } from "react-router-dom";
import LoginForm from "@/components/auth/LoginForm";

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden px-4">
      <div className="absolute inset-0 backdrop-blur-3xl"></div>
      <div className="max-w-md w-full relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome to Internsat</h1>
          <p className="text-white/60">Access your account</p>
        </div>
        
        <div className="glass-effect rounded-xl p-6">
          <LoginForm />
          <p className="text-white/60 text-center mt-4">
            Don't have an account? 
            <button 
              onClick={() => navigate('/register')} 
              className="text-[#F2FF44] hover:underline ml-1"
            >
              Register here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;