
import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  Trophy, 
  Settings, 
  Target,
  MessageSquare,
  BarChart3,
  Sparkles,
  Building2,
  HardDrive,
  LogOut,
  Menu,
  X,
  ChevronRight
} from 'lucide-react';
import { UserRole, UserSession } from '../types';

interface SidebarProps {
  user: UserSession;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ user, activeTab, setActiveTab, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  const getMenuItems = () => {
    switch(user.role) {
      case UserRole.ADMIN:
        return [
          { id: 'overview', label: 'Command Center', icon: LayoutDashboard },
          { id: 'faculty', label: 'Faculty Oversight', icon: Users },
          { id: 'institutional', label: 'Campus Health', icon: Building2 },
          { id: 'curriculum', label: 'Global Curriculum', icon: BookOpen },
          { id: 'system', label: 'Infrastructure', icon: HardDrive },
        ];
      case UserRole.TEACHER:
        return [
          { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
          { id: 'classes', label: 'Student Directory', icon: Users },
          { id: 'projects', label: 'PBL Workspace', icon: Target },
          { id: 'analytics', label: 'Mastery Reports', icon: BarChart3 },
          { id: 'content', label: 'Resource Library', icon: BookOpen },
        ];
      default:
        return [
          { id: 'overview', label: 'My Progress', icon: LayoutDashboard },
          { id: 'practice', label: 'Adaptive Path', icon: BookOpen },
          { id: 'ai-tutor', label: 'AI Tutor', icon: Sparkles },
          { id: 'projects', label: 'Team Workspace', icon: Target },
          { id: 'achievements', label: 'Mastery & Badges', icon: Trophy },
          { id: 'messages', label: 'Inbox', icon: MessageSquare },
        ];
    }
  };

  const handleTabClick = (id: string) => {
    setActiveTab(id);
    setIsOpen(false);
  };

  return (
    <>
      <div className="lg:hidden fixed top-5 left-5 z-50">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-3 bg-white/80 backdrop-blur-lg text-emerald-600 rounded-2xl shadow-xl border border-white/50"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-slate-900/40 backdrop-blur-md z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div className={`
        fixed left-0 top-0 h-screen w-72 bg-[#09090b] text-slate-400 flex flex-col z-40 transition-transform duration-500 lg:translate-x-0 border-r border-white/5
        ${isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}
      `}>
        <div className="p-8">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-12 h-12 mastery-gradient rounded-2xl flex items-center justify-center font-black text-white text-2xl shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform duration-500">
              V
            </div>
            <div>
              <h1 className="text-2xl font-black text-white tracking-tighter leading-none">VEDA</h1>
              <p className="text-[9px] font-bold text-emerald-500/60 uppercase tracking-widest mt-1.5">Intelligent OS</p>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 px-4 space-y-1.5 mt-4 overflow-y-auto">
          {getMenuItems().map((item) => (
            <button
              key={item.id}
              onClick={() => handleTabClick(item.id)}
              className={`w-full flex items-center justify-between px-4 py-4 rounded-2xl text-sm font-semibold transition-all duration-300 group ${
                activeTab === item.id 
                  ? 'bg-emerald-600/10 text-emerald-400' 
                  : 'hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-4">
                <item.icon size={20} className={activeTab === item.id ? 'text-emerald-400' : 'text-slate-500 group-hover:text-emerald-400 transition-colors'} />
                {item.label}
              </div>
              {activeTab === item.id && <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-white/5 space-y-6 bg-white/5">
          <div className="flex items-center gap-3 p-3 rounded-2xl border border-white/5 bg-white/[0.02]">
            <img src={user.avatar} className="rounded-xl w-11 h-11 bg-emerald-500/20 border border-emerald-500/20" alt="user" />
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-white truncate">{user.name}</p>
              <p className="text-[10px] font-bold text-emerald-500/80 uppercase tracking-wider">{user.role}</p>
            </div>
          </div>
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-bold text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-all duration-300"
          >
            <LogOut size={18} />
            Logout Securely
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
