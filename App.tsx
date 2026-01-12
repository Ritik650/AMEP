
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import { UserRole, UserSession } from './types';
import TeacherDashboard from './views/TeacherDashboard';
import StudentDashboard from './views/StudentDashboard';
import AdminDashboard from './views/AdminDashboard';
import { Bell, ArrowRight, Sparkles, ShieldCheck, GraduationCap, Users, Settings, Search } from 'lucide-react';

const App: React.FC = () => {
  const [user, setUser] = useState<UserSession | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = (role: UserRole) => {
    setIsLoggingIn(true);
    setTimeout(() => {
      const mockUsers: Record<UserRole, UserSession> = {
        [UserRole.STUDENT]: {
          id: 's1',
          name: 'Aarav Sharma',
          role: UserRole.STUDENT,
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aarav',
          institution: 'Veda International Institute'
        },
        [UserRole.TEACHER]: {
          id: 't1',
          name: 'Prof. Priya Iyer',
          role: UserRole.TEACHER,
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
          institution: 'Veda International Institute'
        },
        [UserRole.ADMIN]: {
          id: 'a1',
          name: 'Dr. Vikram Mehta',
          role: UserRole.ADMIN,
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram',
          institution: 'Veda District HQ'
        }
      };
      setUser(mockUsers[role]);
      setActiveTab('overview');
      setIsLoggingIn(false);
    }, 1000);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-[#f8fafc]">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-10 animate-in slide-in-from-left-12 duration-1000">
            <div className="flex items-center gap-5 mb-6">
              <div className="w-16 h-16 mastery-gradient rounded-[1.5rem] flex items-center justify-center font-black text-white text-4xl shadow-2xl shadow-emerald-500/30">V</div>
              <h1 className="text-6xl font-black text-slate-900 tracking-tighter">VEDA</h1>
            </div>
            <h2 className="text-6xl md:text-7xl font-black text-slate-900 leading-[1.05] tracking-tight">
              Empowering the <span className="text-emerald-600">Future</span> of Learning.
            </h2>
            <p className="text-2xl text-slate-500 font-medium leading-relaxed max-w-xl">
              An intelligent institutional ecosystem for neural-driven mastery, personalized AI paths, and global oversight.
            </p>
            <div className="flex items-center gap-5 p-5 bg-white/50 backdrop-blur-xl rounded-[2rem] border border-white shadow-xl shadow-emerald-500/5 w-fit">
              <div className="p-3 mastery-gradient rounded-xl text-white"><Sparkles size={24} /></div>
              <p className="text-sm font-bold text-slate-800 tracking-tight">Neural Link v4.2 Active & Optimized</p>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-2xl rounded-[3.5rem] p-10 md:p-14 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] border border-white space-y-10 animate-in zoom-in-95 duration-1000">
            <div className="text-center">
              <h3 className="text-4xl font-black text-slate-900 mb-3 tracking-tighter leading-none">Access Portal</h3>
              <p className="text-slate-400 font-black uppercase tracking-[0.3em] text-[10px]">Authenticate Operational Identity</p>
            </div>

            <div className="space-y-5">
              {[
                { role: UserRole.STUDENT, label: 'Student Nexus', desc: 'Mastery path & AI tutoring', icon: <GraduationCap size={28} />, color: 'emerald' },
                { role: UserRole.TEACHER, label: 'Faculty Command', desc: 'Analytics & PBL management', icon: <Users size={28} />, color: 'blue' },
                { role: UserRole.ADMIN, label: 'Institutional OS', desc: 'Global Governance & Infrastructure', icon: <ShieldCheck size={28} />, color: 'slate' }
              ].map((portal) => (
                <button
                  key={portal.role}
                  disabled={isLoggingIn}
                  onClick={() => handleLogin(portal.role)}
                  className="w-full flex items-center justify-between p-7 bg-slate-50/50 rounded-[2rem] border-2 border-slate-50 hover:border-emerald-500 hover:bg-white hover:shadow-2xl transition-all duration-500 group active:scale-[0.98] disabled:opacity-50"
                >
                  <div className="flex items-center gap-6 text-left">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                      portal.role === UserRole.STUDENT ? 'bg-emerald-100 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-emerald-500/40' :
                      portal.role === UserRole.TEACHER ? 'bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-blue-500/40' :
                      'bg-slate-800 text-white group-hover:bg-slate-950'
                    }`}>
                      {portal.icon}
                    </div>
                    <div>
                      <p className="font-black text-slate-900 text-xl group-hover:text-emerald-700 transition-colors">{portal.label}</p>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter mt-1">{portal.desc}</p>
                    </div>
                  </div>
                  <ArrowRight size={24} className="text-slate-200 group-hover:text-emerald-600 group-hover:translate-x-1.5 transition-all duration-500" />
                </button>
              ))}
            </div>

            {isLoggingIn && (
              <div className="flex flex-col items-center justify-center gap-4 py-6 animate-in fade-in duration-500">
                <div className="w-8 h-8 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin" />
                <span className="font-black text-xs uppercase tracking-[0.2em] text-emerald-600">Validating Institutional Credentials...</span>
              </div>
            )}
            
            <p className="text-center text-[10px] font-black text-slate-300 uppercase tracking-[0.4em] pt-4">Veda OS Enterprise • V4.2.1 Stable</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex selection:bg-emerald-100">
      <Sidebar user={user} activeTab={activeTab} setActiveTab={setActiveTab} onLogout={() => setUser(null)} />
      
      <main className="flex-1 lg:ml-72 p-6 md:p-12 pt-28 lg:pt-14">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8 animate-in slide-in-from-top-4 duration-1000">
          <div>
            <h2 className="text-5xl font-black text-slate-900 tracking-tighter leading-none mb-4">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1).replace(/([A-Z])/g, ' $1')}
            </h2>
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.8)]" />
              <p className="text-slate-400 text-sm font-bold uppercase tracking-[0.2em]">{user.institution} • {new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}</p>
            </div>
          </div>
          <div className="flex items-center gap-6 w-full md:w-auto">
            <div className="relative flex-1 md:w-80 group">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={20} />
               <input className="w-full bg-white border border-slate-100 rounded-2xl p-3.5 pl-12 text-sm font-medium outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all shadow-sm" placeholder="Search Global Knowledge..." />
            </div>
            <div className="flex items-center gap-3">
               <button className="w-12 h-12 bg-white rounded-2xl border border-slate-100 shadow-sm flex items-center justify-center text-slate-400 hover:text-emerald-600 hover:border-emerald-600 transition-all duration-300 relative">
                  <Bell size={22} />
                  <div className="absolute top-0 right-0 w-3 h-3 bg-rose-500 border-2 border-white rounded-full shadow-lg shadow-rose-500/40" />
               </button>
               <button className="w-12 h-12 bg-white rounded-2xl border border-slate-100 shadow-sm flex items-center justify-center text-slate-400 hover:text-emerald-600 hover:border-emerald-600 transition-all duration-300">
                  <Settings size={22} />
               </button>
            </div>
          </div>
        </header>

        <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
          {user.role === UserRole.TEACHER && <TeacherDashboard activeTab={activeTab} setActiveTab={setActiveTab} />}
          {user.role === UserRole.STUDENT && <StudentDashboard activeTab={activeTab} setActiveTab={setActiveTab} />}
          {user.role === UserRole.ADMIN && <AdminDashboard activeTab={activeTab} setActiveTab={setActiveTab} />}
        </div>
      </main>
    </div>
  );
};

export default App;
