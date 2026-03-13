import React from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const VerifySuccess = () => {
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
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-start justify-start pt-32 pb-20 px-8 md:px-20 lg:px-32 max-w-7xl mx-auto w-full">
        <div className="w-full max-w-[520px]">
          <div className="text-left mb-12">
            <div className="mb-10 flex items-center justify-center w-20 h-20 bg-green-500/10 rounded-2xl text-green-500">
              <CheckCircle size={40} />
            </div>
            <h1 className="text-[48px] md:text-[64px] font-bold text-white mb-6 tracking-tight leading-[1.05]">
              Email Verified!
            </h1>
            <p className="text-gray-500 text-[20px] leading-relaxed max-w-[440px]">
              Your email has been successfully verified. You now have full access to all features and services of AI Insights.
            </p>
          </div>

          <div className="space-y-6 w-full text-left">
            <Link to="/login" className="block w-full">
              <button
                type="button"
                className="w-full bg-[#1e40af] hover:bg-blue-700 text-white font-bold py-5 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-[0.98] group/btn shadow-xl shadow-blue-600/10"
              >
                <span className="text-[18px]">Go to Login</span>
                <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
              </button>
            </Link>
          </div>

          <p className="text-[14px] text-gray-600 leading-relaxed text-left mt-16 font-medium">
            Need help? <Link to="/support" className="text-gray-400 hover:text-white transition-colors">Contact our support team</Link>.
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

export default VerifySuccess;
