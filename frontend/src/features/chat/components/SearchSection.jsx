import { Search, Globe, Image as ImageIcon, Code, Layers, Paperclip, ArrowRight, Zap } from 'lucide-react';

const SearchSection = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-start px-4 pt-32 min-h-screen">
      <div className="w-full max-w-2xl text-center mb-8">
        <h1 className="text-4xl font-medium mb-12 tracking-tight">What do you want to know?</h1>
        
        {/* Search Input Container */}
        <div className="relative group">
          <div className="w-full bg-brand-surface/20 border border-brand-surface rounded-2xl p-4 focus-within:border-brand-primary/50 transition-all shadow-2xl backdrop-blur-sm">
            <textarea 
              placeholder="Ask anything..."
              className="w-full bg-transparent border-none focus:ring-0 resize-none h-24 text-lg placeholder:text-gray-500"
            />
            
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-3">
                <SearchAction icon={<Globe size={16} />} label="Focus" />
                <SearchAction icon={<Paperclip size={16} />} label="Attach" />
              </div>
              
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-brand-surface/40 cursor-pointer transition-colors border border-transparent hover:border-brand-surface">
                  <Zap size={16} className="text-yellow-500" />
                  <span className="text-sm font-medium">Pro</span>
                </div>
                <button className="bg-brand-primary p-2 rounded-full text-brand-bg hover:opacity-90 transition-opacity">
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Suggestion Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-4xl">
        <SuggestionCard icon={<Globe size={18} />} label="Search the web" />
        <SuggestionCard icon={<ImageIcon size={18} />} label="Analyze images" />
        <SuggestionCard icon={<Code size={18} />} label="Write code" />
        <SuggestionCard icon={<Layers size={18} />} label="Explore files" />
      </div>
    </div>
  );
};

const SearchAction = ({ icon, label }) => (
  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-brand-surface/40 cursor-pointer transition-colors border border-transparent hover:border-brand-surface">
    <div className="text-gray-400 group-hover:text-brand-text transition-colors">{icon}</div>
    <span className="text-sm font-medium text-gray-400 group-hover:text-brand-text transition-colors">{label}</span>
  </div>
);

const SuggestionCard = ({ icon, label }) => (
  <div className="p-4 rounded-xl border border-brand-surface bg-brand-surface/10 hover:bg-brand-surface/30 cursor-pointer transition-all hover:scale-[1.02] group">
    <div className="text-brand-primary mb-2 opacity-70 group-hover:opacity-100 transition-opacity">{icon}</div>
    <p className="text-sm font-medium leading-tight">{label}</p>
  </div>
);

export default SearchSection;
