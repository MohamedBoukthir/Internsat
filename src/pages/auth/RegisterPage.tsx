import { useNavigate } from "react-router-dom";
import RegisterForm from "@/components/auth/RegisterForm";

const RegisterPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden px-4">
      <div className="absolute inset-0 backdrop-blur-3xl"></div>
      {/* Back to Home Button */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 flex items-center gap-2 bg-[#F2FF44] text-black hover:bg-[#E2EF34] px-3 py-2 rounded-lg shadow-md transition-all"
      >
        <span className="text-lg">←</span>
        <span className="font-medium hidden sm:inline">Back to Home</span>
      </button>
      <div className="max-w-md w-full relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome to Internsat</h1>
          <p className="text-white/60">Create a new account</p>
        </div>

        <div className="glass-effect rounded-xl p-6">
          <RegisterForm />
          <p className="text-white/60 text-center mt-4">
            Already have an account? 
            <button 
              onClick={() => navigate('/login')} 
              className="text-[#F2FF44] hover:underline ml-1"
            >
              Login here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;