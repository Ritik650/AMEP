import React from 'react';
import { 
  Building2, Users, ShieldCheck, TrendingUp, Cpu, Globe, ChevronRight, Zap, CheckCircle2, 
  Database, Lock, Clock, Activity, HardDrive, BarChart3, AlertTriangle, Search, Filter,
  Layers, MapPin, Plus
} from 'lucide-react';
import DashboardCard from '../components/DashboardCard';
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area
} from 'recharts';

const institutionalHealth = [
  { month: 'Jan', health: 78 }, { month: 'Feb', health: 82 }, { month: 'Mar', health: 85 },
  { month: 'Apr', health: 89 }, { month: 'May', health: 91 }, { month: 'Jun', health: 94 },
];

const AdminDashboard: React.FC<{ activeTab: string; setActiveTab: (tab: string) => void }> = ({ activeTab, setActiveTab }) => {
  const renderOverview = () => (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <DashboardCard title="Institutional Health" value="94.2%" trend="up" icon={<Building2 size={22} />} color="emerald" />
        <DashboardCard title="Veda Active Nodes" value="12,402" trend="neutral" icon={<Users size={22} />} color="blue" />
        <DashboardCard title="Neural Precision" value="99.1%" trend="up" icon={<Cpu size={22} />} color="purple" />
        <DashboardCard title="Security Alerts" value="00" trend="down" icon={<ShieldCheck size={22} />} color="rose" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 bg-white/80 backdrop-blur-xl p-10 rounded-[3rem] shadow-sm border border-slate-100 transition-soft hover:shadow-xl">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">Institutional Progression</h3>
            <div className="px-4 py-2 bg-emerald-50 rounded-xl text-emerald-700 text-[10px] font-black uppercase tracking-widest border border-emerald-100">H1 2024 Audit</div>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={institutionalHealth}>
                <defs>
                  <linearGradient id="adminGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#059669" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#059669" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8', fontWeight: 700}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8', fontWeight: 700}} />
                <Tooltip contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 20px 50px rgba(0,0,0,0.1)' }} />
                <Area type="monotone" dataKey="health" stroke="#059669" strokeWidth={5} fill="url(#adminGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-[#09090b] p-10 rounded-[3rem] text-white relative overflow-hidden group shadow-2xl">
             <div className="relative z-10">
                <div className="flex items-center gap-4 mb-8">
                   <div className="p-3 bg-emerald-500 rounded-2xl text-white shadow-lg"><Globe size={24} /></div>
                   <h4 className="font-bold text-xl tracking-tight">Global Network</h4>
                </div>
                <div className="space-y-8">
                   {[
                     { label: 'Mumbai Hub', val: 92 },
                     { label: 'Delhi Core', val: 84 },
                     { label: 'Bengaluru Node', val: 78 }
                   ].map((loc, i) => (
                     <div key={i} className="group/item cursor-pointer">
                        <div className="flex justify-between text-[11px] font-black text-emerald-500 uppercase tracking-widest mb-3 group-hover/item:text-white transition-colors">
                           <span>{loc.label}</span>
                           <span>{loc.val}% Capacity</span>
                        </div>
                        <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                           <div className="mastery-gradient h-full rounded-full transition-all duration-1000 group-hover/item:shadow-[0_0_12px_rgba(16,185,129,0.8)]" style={{ width: `${loc.val}%` }} />
                        </div>
                     </div>
                   ))}
                </div>
             </div>
             <div className="absolute top-0 right-0 w-64 h-64 mastery-gradient opacity-10 rounded-full blur-[80px]" />
          </div>
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm transition-soft hover:shadow-xl">
             <h4 className="font-black text-slate-900 uppercase tracking-wider text-sm flex items-center gap-2 mb-8"><Lock size={16} className="text-emerald-500" /> Infrastructure</h4>
             <div className="space-y-5">
                {['Firewall Secure', 'AI Clusters Active', 'Links Encrypted'].map((audit, i) => (
                  <div key={i} className="flex items-center gap-4 group">
                     <CheckCircle2 size={18} className="text-emerald-500 group-hover:scale-110 transition-transform" />
                     <span className="text-sm font-bold text-slate-500 group-hover:text-slate-800 transition-colors">{audit}</span>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderFaculty = () => (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100">
         <div className="flex justify-between items-center mb-12">
            <div>
               <h3 className="text-3xl font-black text-slate-900 tracking-tighter">Staff Oversight</h3>
               <p className="text-lg text-slate-500 font-medium">Monitoring curriculum deployment & institutional efficiency.</p>
            </div>
            <button className="px-8 py-4 mastery-gradient text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-emerald-500/20 hover:scale-105 transition-all">Add Staff</button>
         </div>
         <div className="overflow-x-auto rounded-[2rem] border border-slate-100 bg-slate-50/20">
            <table className="w-full text-left">
               <thead className="bg-white/50 text-slate-400 text-[10px] uppercase font-black tracking-[0.2em] border-b border-slate-100">
                  <tr>
                     <th className="px-10 py-6">Staff Profile</th>
                     <th className="px-10 py-6">Academic Load</th>
                     <th className="px-10 py-6">Veda Link Score</th>
                     <th className="px-10 py-6">Closure Rate</th>
                     <th className="px-10 py-6 text-right">Intel</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-100 bg-white">
                  {[
                    { name: 'Prof. Priya Iyer', load: '82%', efficiency: '98%', closure: '92%' },
                    { name: 'Dr. Vikram Mehta', load: '65%', efficiency: '94%', closure: '88%' },
                    { name: 'Marcus Flint', load: '94%', efficiency: '72%', closure: '65%' },
                  ].map((staff, i) => (
                    <tr key={i} className="hover:bg-emerald-50/30 transition-all group">
                       <td className="px-10 py-8">
                          <div className="flex items-center gap-5">
                             <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center font-black group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-sm">{staff.name[0]}</div>
                             <span className="font-black text-slate-900 text-lg">{staff.name}</span>
                          </div>
                       </td>
                       <td className="px-10 py-8 font-bold text-slate-500">{staff.load}</td>
                       <td className="px-10 py-8 font-black text-emerald-600">{staff.efficiency}</td>
                       <td className="px-10 py-8 font-bold text-slate-800">{staff.closure}</td>
                       <td className="px-10 py-8 text-right">
                          <button className="p-3 text-slate-300 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all"><ChevronRight size={22} /></button>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );

  const renderHealth = () => (
    <div className="space-y-10 animate-in fade-in duration-700">
       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { label: 'System Uptime', value: '99.98%', icon: <Zap size={24} />, color: 'emerald' },
            { label: 'Data Latency', value: '0.42ms', icon: <Activity size={24} />, color: 'blue' },
            { label: 'Active Sessions', value: '45.2k', icon: <Users size={24} />, color: 'purple' },
          ].map((item, i) => (
            <div key={i} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex items-center gap-6">
               <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center ${item.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' : item.color === 'blue' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'}`}>{item.icon}</div>
               <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.label}</p>
                  <p className="text-3xl font-black text-slate-900">{item.value}</p>
               </div>
            </div>
          ))}
       </div>
       <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100">
          <h3 className="text-2xl font-black text-slate-900 mb-10 tracking-tight">Regional Node Capacity</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
             <div className="space-y-8">
                {['Mumbai District', 'Delhi NCR Hub', 'Bengaluru R&D', 'Chennai Regional'].map((region, i) => (
                  <div key={i} className="group cursor-pointer">
                     <div className="flex justify-between items-center mb-3">
                        <span className="font-bold text-slate-700">{region} Node</span>
                        <span className="text-xs font-black text-slate-900">82% Load</span>
                     </div>
                     <div className="w-full bg-slate-50 h-3 rounded-full overflow-hidden shadow-inner border border-slate-100">
                        <div className="mastery-gradient h-full rounded-full transition-all duration-1000" style={{ width: '82%' }} />
                     </div>
                  </div>
                ))}
             </div>
             <div className="bg-[#09090b] rounded-[2.5rem] p-10 text-white relative overflow-hidden flex flex-col justify-center">
                <div className="relative z-10 text-center space-y-4">
                   <div className="w-20 h-20 mastery-gradient rounded-full mx-auto flex items-center justify-center mb-6 animate-pulse"><ShieldCheck size={40} /></div>
                   <h4 className="text-2xl font-black tracking-tight">Governance Status: Elite</h4>
                   <button className="mt-6 px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">Download Audit PDF</button>
                </div>
                <div className="absolute -right-20 -bottom-20 w-80 h-80 mastery-gradient opacity-5 rounded-full blur-[100px]" />
             </div>
          </div>
       </div>
    </div>
  );

  const renderCurriculum = () => (
    <div className="space-y-10 animate-in fade-in duration-700">
       <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
             <h3 className="text-3xl font-black text-slate-900 tracking-tighter">Global Standards</h3>
             <div className="flex gap-4">
                <div className="relative"><Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} /><input className="bg-slate-50 border-2 border-slate-50 rounded-2xl p-3 pl-12 text-sm outline-none" placeholder="Search..." /></div>
                <button className="p-3 bg-slate-900 text-white rounded-2xl hover:bg-emerald-600 transition-all shadow-xl"><Plus size={24} /></button>
             </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {['MA-042: Advanced Math', 'PH-109: Quantum Physics', 'CS-502: AI Ethics', 'EC-202: Economics'].map((title, i) => (
               <div key={i} className="p-8 bg-[#fbfcfa] rounded-[2.5rem] border border-slate-100 hover:border-emerald-500 hover:shadow-2xl transition-all group cursor-pointer">
                  <div className="flex justify-between items-start mb-8">
                     <div className="p-4 rounded-2xl bg-white shadow-sm text-slate-400 group-hover:bg-emerald-600 group-hover:text-white transition-all"><Layers size={24} /></div>
                  </div>
                  <h4 className="text-xl font-black text-slate-900 mb-6 leading-tight group-hover:text-emerald-700 transition-colors">{title}</h4>
                  <div className="space-y-4">
                     <div className="w-full bg-white h-2 rounded-full overflow-hidden shadow-inner border border-slate-100"><div className="mastery-gradient h-full" style={{ width: '90%' }} /></div>
                     <div className="flex justify-between items-center pt-2"><span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">90% Adoption</span><button className="text-[10px] font-black text-emerald-600 uppercase tracking-widest hover:underline">Deploy</button></div>
                  </div>
               </div>
             ))}
          </div>
       </div>
    </div>
  );

  const renderInfrastructure = () => (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         <div className="p-8 bg-white rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-6">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center"><Database size={32} /></div>
            <div><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Storage</p><p className="text-2xl font-black text-slate-800">1.2 TB / 5TB</p></div>
         </div>
         <div className="p-8 bg-white rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-6">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center"><Cpu size={32} /></div>
            <div><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Latency</p><p className="text-2xl font-black text-slate-800">0.42 ms</p></div>
         </div>
         <div className="p-8 bg-white rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-6">
            <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-3xl flex items-center justify-center"><Lock size={32} /></div>
            <div><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">AES-256</p><p className="text-2xl font-black text-slate-800">Secure</p></div>
         </div>
      </div>
      <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100">
         <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-2">System Audit Logs <Clock size={18} className="text-slate-400" /></h3>
         <div className="space-y-4">
            {['AI Generation Triggered', 'Firewall Patch Applied', 'Directory Exported'].map((log, i) => (
              <div key={i} className="flex items-center justify-between p-5 bg-[#fbfcfa] rounded-2xl border border-slate-50 hover:border-emerald-200 transition-all group">
                 <div className="flex gap-4 items-start">
                    <div className={`w-2 h-2 rounded-full mt-2 bg-emerald-500`} />
                    <div><p className="text-sm font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">{log}</p><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Admin • 5m ago</p></div>
                 </div>
                 <ChevronRight size={18} className="text-slate-300" />
              </div>
            ))}
         </div>
      </div>
    </div>
  );

  const tabs: Record<string, () => React.ReactElement> = {
    overview: renderOverview,
    faculty: renderFaculty,
    institutional: renderHealth,
    curriculum: renderCurriculum,
    system: renderInfrastructure,
  };

  return (
    <div className="animate-in fade-in duration-700 pb-10">
      {tabs[activeTab] ? tabs[activeTab]() : tabs.overview()}
    </div>
  );
};

export default AdminDashboard;