import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // selecting the user and loading from the auth slice
  const user = useSelector(state => state.auth.user)
  const loading = useSelector(state => state.auth.loading)

  const { handleLogin } = useAuth();
  const navigate = useNavigate();

  const submitForm = async (e) => {

    e.preventDefault();
    await handleLogin(email, password);
    navigate('/');
  };

  // if user is already logged in then redirect to dashboard
  if(!loading && user) return <Navigate to="/" />

  return (
    <div className="flex flex-col min-h-screen w-full bg-brand-bg text-brand-text selection:bg-brand-primary/30 font-sans antialiased">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-6 w-full max-w-7xl mx-auto z-10">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center transition-transform group-hover:scale-105 shadow-lg shadow-brand-primary/20">
            <svg
              className="w-5 h-5 text-brand-bg"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight text-brand-text">AI Insights</span>
        </div>
        <div className="text-[13px]">
          <span className="text-gray-400">New here? </span>
          <Link to="/register" className="text-brand-text hover:text-brand-primary font-semibold transition-colors ml-1">
            Create account
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-10 w-full">
        <div className="w-full max-w-[420px] text-center">
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-brand-text mb-3 tracking-tight leading-tight">
              Welcome back
            </h1>
            <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-[340px] mx-auto">
              Sign in to continue your journey with AI Insights.
            </p>
          </div>

          <form className="space-y-8 w-full text-left" onSubmit={submitForm}>
            <div className="space-y-6">
              {/* Email Address */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                  Email Address
                </label>
                <div className="relative group">
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-brand-primary transition-colors">
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    required
                    className="w-full bg-transparent border-b border-brand-surface py-3 pl-8 pr-4 text-brand-text placeholder:text-gray-600 focus:outline-none focus:border-brand-primary transition-all text-base md:text-lg"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                  Password
                </label>
                <div className="relative group">
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-brand-primary transition-colors">
                    <Lock size={18} />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Your password"
                    required
                    className="w-full bg-transparent border-b border-brand-surface py-3 pl-8 pr-12 text-brand-text placeholder:text-gray-600 focus:outline-none focus:border-brand-primary transition-all text-base md:text-lg"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-600 hover:text-brand-text transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-brand-primary hover:bg-opacity-90 text-brand-bg font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition-all active:scale-[0.98] mt-10 group/btn shadow-xl shadow-brand-primary/10"
            >
              <span className="text-base md:text-lg">Login</span>
              <ArrowRight size={20} className="group-hover:translate-x-1.5 transition-transform" />
            </button>
          </form>

          <div className="mt-8 flex items-center justify-center text-[13px]">
            <Link to="#" className="text-gray-500 hover:text-brand-text transition-colors">Forgot password?</Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-10 w-full max-w-7xl mx-auto flex justify-between items-center opacity-60">
        <p className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase">
          © {new Date().getFullYear()} AI Insights
        </p>
        <div className="flex gap-6">
          <Link to="#" className="text-[10px] font-bold tracking-[0.2em] hover:text-brand-text transition-colors uppercase">Twitter</Link>
          <Link to="#" className="text-[10px] font-bold tracking-[0.2em] hover:text-brand-text transition-colors uppercase">GitHub</Link>
        </div>
      </footer>
    </div>
  );
};

export default Login;
