import React from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const VerifySuccess = () => {
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
          <span className="text-xl font-bold tracking-tight text-brand-text font-outfit">Perplexity AI</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-10 w-full">
        <div className="w-full max-w-[480px] text-center">
          <div className="flex items-center justify-center mb-8 mx-auto w-20 h-20 bg-brand-primary/10 rounded-2xl text-brand-primary shadow-xl shadow-brand-primary/5">
            <CheckCircle size={40} strokeWidth={1.5} />
          </div>
          
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-brand-text mb-3 tracking-tight leading-tight font-outfit">
              Email Verified!
            </h1>
            <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-[400px] mx-auto">
              Your account is now ready. You've successfully verified your email and can now access Perplexity AI.
            </p>
          </div>

          <div className="w-full max-w-[340px] mx-auto">
            <Link to="/login" className="block w-full">
              <button
                type="button"
                className="w-full bg-brand-primary hover:bg-opacity-90 text-brand-bg font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition-all active:scale-[0.98] group/btn shadow-xl shadow-brand-primary/10"
              >
                <span className="text-base md:text-lg">Get Started</span>
                <ArrowRight size={22} className="group-hover:translate-x-1.5 transition-transform" />
              </button>
            </Link>
          </div>

          <p className="text-[13px] text-gray-500 leading-relaxed mt-12">
            Need any assistance? <Link to="#" className="text-brand-text hover:text-brand-primary transition-colors font-medium underline underline-offset-4 decoration-brand-surface">Visit Support</Link>
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 py-10 w-full max-w-7xl mx-auto flex justify-between items-center opacity-60">
        <p className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase">
          © {new Date().getFullYear()} Perplexity AI
        </p>
        <div className="flex gap-6">
          <Link to="#" className="text-[10px] font-bold tracking-[0.2em] hover:text-brand-text transition-colors uppercase">Twitter</Link>
          <Link to="#" className="text-[10px] font-bold tracking-[0.2em] hover:text-brand-text transition-colors uppercase">GitHub</Link>
        </div>
      </footer>
    </div>
  );
};

export default VerifySuccess;
