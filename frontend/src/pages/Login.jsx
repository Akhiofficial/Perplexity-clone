import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col min-h-screen w-full bg-[#050608] text-gray-400 selection:bg-blue-500/30 font-sans antialiased">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-8 w-full max-w-7xl mx-auto z-10">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 shadow-lg shadow-blue-600/20">
            <svg
              className="w-5 h-5 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="text-2xl font-bold tracking-tight text-white">AI Insights</span>
        </div>
        <div className="text-[14px]">
          <span className="text-gray-500">Don't have an account? </span>
          <Link to="/signup" className="text-white hover:text-blue-400 font-semibold transition-colors ml-1">
            Sign up
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-start justify-start pt-24 pb-20 px-8 md:px-20 lg:px-32 max-w-7xl mx-auto w-full">
        <div className="w-full max-w-[480px]">
          <div className="text-left mb-16">
            <h1 className="text-[48px] md:text-[64px] font-bold text-white mb-6 tracking-tight leading-[1.05]">
              Welcome back
            </h1>
            <p className="text-gray-500 text-[20px] leading-relaxed max-w-[400px]">
              Enter your credentials to access your AI Insights account and continue your journey.
            </p>
          </div>

          <form className="space-y-12 w-full text-left" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-10">
              {/* Email Address */}
              <div className="space-y-4">
                <label className="text-[13px] font-bold text-gray-500 uppercase tracking-[0.25em]">
                  Email Address
                </label>
                <div className="relative group">
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-700 group-focus-within:text-blue-500 transition-colors">
                    <Mail size={22} />
                  </div>
                  <input
                    type="email"
                    placeholder="name@company.com"
                    className="w-full bg-transparent border-b border-gray-800 py-4 pl-10 pr-4 text-white placeholder:text-gray-800 focus:outline-none focus:border-blue-500 transition-all text-[18px]"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-[13px] font-bold text-gray-500 uppercase tracking-[0.25em]">
                    Password
                  </label>
                  <Link to="/forgot-password" size="sm" className="text-gray-500 hover:text-blue-500 text-[12px] font-semibold transition-colors">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative group">
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-700 group-focus-within:text-blue-500 transition-colors">
                    <Lock size={22} />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="w-full bg-transparent border-b border-gray-800 py-4 pl-10 pr-12 text-white placeholder:text-gray-800 focus:outline-none focus:border-blue-500 transition-all text-[18px]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-600 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#1e40af] hover:bg-blue-700 text-white font-bold py-5 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-[0.98] mt-16 group/btn shadow-xl shadow-blue-600/10"
            >
              <span className="text-[18px]">Log In</span>
              <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
            </button>
          </form>

          <p className="text-[14px] text-gray-600 leading-relaxed text-left mt-12">
            By logging in, you agree to our{' '}
            <Link to="/terms" className="text-gray-400 hover:text-white underline underline-offset-4 decoration-gray-800 transition-all">Terms of Service</Link>
            {' '}and{' '}
            <Link to="/privacy" className="text-gray-400 hover:text-white underline underline-offset-4 decoration-gray-800 transition-all">Privacy Policy</Link>.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-8 py-12 w-full max-w-7xl mx-auto flex justify-between items-center opacity-30 hover:opacity-100 transition-opacity">
        <p className="text-[11px] font-bold tracking-[0.3em] text-gray-500">
          © {new Date().getFullYear()} AI INSIGHTS INC.
        </p>
        <div className="flex gap-8">
          <Link to="#" className="text-[11px] font-bold tracking-[0.3em] hover:text-white transition-colors">TWITTER</Link>
          <Link to="#" className="text-[11px] font-bold tracking-[0.3em] hover:text-white transition-colors">GITHUB</Link>
        </div>
      </footer>
    </div>
  );
};

export default Login;
