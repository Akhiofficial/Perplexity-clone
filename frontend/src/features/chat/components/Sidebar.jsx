import { Home, Compass, Library, Plus, Settings, User } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-brand-bg border-r border-brand-surface flex flex-col p-4">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-8 px-2">
        <div className="w-8 h-8 bg-brand-primary rounded flex items-center justify-center">
          <span className="text-brand-bg font-bold">P</span>
        </div>
        <span className="text-xl font-bold tracking-tight">Perplexity</span>
      </div>

      {/* New Thread Button */}
      <button className="flex items-center justify-between w-full p-2 mb-6 rounded-full border border-brand-surface hover:bg-brand-surface/30 transition-all group overflow-hidden">
        <span className="text-sm font-medium ml-2">New Thread</span>
        <div className="flex items-center gap-2">
          <span className="text-[10px] bg-brand-surface px-1.5 py-0.5 rounded opacity-50">Ctrl I</span>
          <Plus size={18} className="mr-1" />
        </div>
      </button>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-1">
        <NavItem icon={<Home size={20} />} label="Home" active />
        <NavItem icon={<Compass size={20} />} label="Discover" />
        <NavItem icon={<Library size={20} />} label="Library" />
      </nav>

      {/* Footer / User Profile */}
      <div className="mt-auto pt-4 space-y-1 border-t border-brand-surface">
        <NavItem icon={<Settings size={20} />} label="Settings" />
        <div className="flex items-center gap-3 p-2 mt-2 rounded-lg hover:bg-brand-surface/30 cursor-pointer transition-colors">
          <div className="w-8 h-8 rounded-full bg-brand-primary/20 flex items-center justify-center text-brand-primary">
            <User size={18} />
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-medium truncate">Guest User</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const NavItem = ({ icon, label, active = false }) => (
  <div
    className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors ${
      active ? 'bg-brand-surface/50 text-brand-primary' : 'hover:bg-brand-surface/30 text-gray-400 hover:text-brand-text'
    }`}
  >
    {icon}
    <span className="text-sm font-medium">{label}</span>
  </div>
);

export default Sidebar;
