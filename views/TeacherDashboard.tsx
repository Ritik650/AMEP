
import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, Users, Zap, AlertCircle, CheckCircle2, ChevronRight, BrainCircuit, Plus, 
  FileText, BarChart3, BookOpen, Download, Sparkles, Search, Filter, Mail, MoreHorizontal,
  PieChart as PieIcon, Library, Upload, Layout
} from 'lucide-react';
import DashboardCard from '../components/DashboardCard';
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar,
  Cell, PieChart, Pie
} from 'recharts';
import { generatePredictiveInsight, generateProjectBrief } from '../services/geminiService';

const TeacherDashboard: React.FC<{ activeTab: string; setActiveTab: (tab: string) => void }> = ({ activeTab, setActiveTab }) => {
  const [insight, setInsight] = useState<{ message: string; action: string } | null>(null);
  const [loadingInsight, setLoadingInsight] = useState(false);
  const [pblBrief, setPblBrief] = useState<any>(null);
  const [creatingPbl, setCreatingPbl] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const masteryData = [
    { name: 'Mon', rate: 72 }, { name: 'Tue', rate: 75 }, { name: 'Wed', rate: 74 },
    { name: 'Thu', rate: 78 }, { name: 'Fri', rate: 82 }, { name: 'Sat', rate: 81 }, { name: 'Sun', rate: 85 },
  ];

  const gapData = [
    { name: 'Calculus', count: 12 },
    { name: 'Thermodynamics', count: 8 },
    { name: 'Linear Algebra', count: 5 },
    { name: 'Organic Chem', count: 14 },
    { name: 'Macroeconomics', count: 4 },
  ];

  const students = [
    { id: '1', name: 'Aarav Sharma', mastery: 88, engagement: 92, risk: 'low', avatar: '1' },
    { id: '2', name: 'Ishita Gupta', mastery: 45, engagement: 30, risk: 'high', avatar: '2' },
    { id: '3', name: 'Rohan Varma', mastery: 72, engagement: 85, risk: 'low', avatar: '3' },
    { id: '4', name: 'Kavya Nair', mastery: 64, engagement: 55, risk: 'medium', avatar: '4' },
    { id: '5', name: 'Sameer Khan', mastery: 95, engagement: 98, risk: 'low', avatar: '5' },
  ];

  useEffect(() => {
    const fetchInsight = async () => {
      setLoadingInsight(true);
      try {
        const res = await generatePredictiveInsight({ class: 'Grade 10-A', averageMastery: 82, lowEngagementStudents: 3 });
        setInsight(res);
      } catch (e) {
        console.error(e);
      } finally {
        setLoadingInsight(false);
      }
    };
    if (activeTab === 'overview') fetchInsight();
  }, [activeTab]);

  const handleGeneratePBL = async () => {
    setCreatingPbl(true);
    try {
      const res = await generateProjectBrief("Hyper-Personalized AI Education Interfaces");
      setPblBrief(res);
    } catch (e) {
      console.error(e);
    } finally {
      setCreatingPbl(false);
    }
  };

  const renderOverview = () => (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <DashboardCard title="Avg. Mastery Rate" value="82.4%" subValue="+4.2% week" icon={<TrendingUp size={22} />} trend="up" color="emerald" />
        <DashboardCard title="Engagement Index" value="78.1" subValue="Live Pulse" icon={<Zap size={22} />} trend="up" color="amber" />
        <DashboardCard title="Teacher Adoption" value="94%" subValue="Institutional" icon={<Users size={22} />} trend="neutral" color="blue" />
        <DashboardCard title="At-Risk Alerts" value="03" subValue="High Priority" icon={<AlertCircle size={22} />} trend="down" color="rose" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          <div className="bg-white/80 backdrop-blur-xl p-10 rounded-[3rem] shadow-sm border border-slate-100 transition-soft hover:shadow-xl">
            <div className="flex justify-between items-center mb-10">
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">Class Mastery Index</h3>
              <div className="flex gap-2">
                <button className="p-2.5 bg-slate-50 rounded-xl text-slate-400 hover:text-emerald-600 transition-colors"><Download size={18} /></button>
                <button className="p-2.5 bg-slate-50 rounded-xl text-slate-400 hover:text-emerald-600 transition-colors"><MoreHorizontal size={18} /></button>
              </div>
            </div>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={masteryData}>
                  <defs>
                    <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8', fontWeight: 700}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8', fontWeight: 700}} />
                  <Tooltip contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 20px 50px rgba(0,0,0,0.1)' }} />
                  <Area type="monotone" dataKey="rate" stroke="#10b981" strokeWidth={5} fillOpacity={1} fill="url(#colorRate)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-[#09090b] text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden group">
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-4 mastery-gradient rounded-2xl text-white shadow-lg group-hover:scale-110 transition-transform"><BrainCircuit size={28} /></div>
                <div>
                   <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Veda Predictive AI Engine</span>
                   <h4 className="text-xl font-bold">Actionable Intelligence</h4>
                </div>
              </div>
              {loadingInsight ? (
                <div className="space-y-4 py-4">
                  <div className="h-4 bg-white/10 rounded-full w-full animate-pulse" />
                  <div className="h-4 bg-white/10 rounded-full w-3/4 animate-pulse" />
                </div>
              ) : insight ? (
                <div className="space-y-8 animate-in fade-in duration-1000">
                  <p className="text-2xl font-bold leading-tight">{insight.message}</p>
                  <div className="bg-emerald-900/40 p-6 rounded-[2rem] border border-emerald-500/20 backdrop-blur-md">
                    <p className="text-[10px] font-black text-emerald-400 mb-2.5 uppercase tracking-widest flex items-center gap-2">
                       <Sparkles size={12} /> Priority Intervention
                    </p>
                    <p className="text-lg text-emerald-50/90 font-medium leading-relaxed">{insight.action}</p>
                  </div>
                </div>
              ) : <p className="text-lg opacity-50 italic">Synchronizing neural classroom data...</p>}
            </div>
            <div className="absolute -right-20 -bottom-20 w-[30rem] h-[30rem] mastery-gradient opacity-10 rounded-full blur-[120px]" />
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-xl p-8 rounded-[3rem] shadow-sm border border-slate-100 transition-soft hover:shadow-xl">
           <div className="flex items-center justify-between mb-10">
              <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                 Live Feed <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              </h3>
              <button className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-emerald-600 transition-colors">Clear</button>
           </div>
           <div className="space-y-6">
              {[
                { name: 'Ishita G.', action: 'Critical Gap: Thermodynamics', time: '2m ago', color: 'rose' },
                { name: 'Rohan V.', action: 'Mastery Peak: Calculus', time: '12m ago', color: 'emerald' },
                { name: 'Aarav S.', action: 'Workspace Update: Eco-City', time: '45m ago', color: 'blue' },
                { name: 'System', action: 'Class Avg Mastery +5%', time: '1h ago', color: 'purple' },
              ].map((item, i) => (
                <div key={i} className="flex gap-5 group cursor-pointer animate-in fade-in slide-in-from-right-4 duration-500" style={{ animationDelay: `${i*100}ms` }}>
                   <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110 duration-300 ${
                     item.color === 'rose' ? 'bg-rose-50 text-rose-600' : 
                     item.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' :
                     item.color === 'blue' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'
                   }`}>
                      <Zap size={22} />
                   </div>
                   <div className="flex-1 overflow-hidden">
                      <p className="text-sm font-black text-slate-900 leading-none mb-1 group-hover:text-emerald-600 transition-colors">{item.name}</p>
                      <p className="text-xs text-slate-500 font-medium truncate">{item.action}</p>
                      <p className="text-[9px] font-black text-slate-300 uppercase mt-1.5 tracking-tighter">{item.time}</p>
                   </div>
                </div>
              ))}
           </div>
           <button className="w-full mt-10 py-4 bg-slate-50 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:bg-emerald-50 hover:text-emerald-600 transition-all">Expand Activity History</button>
        </div>
      </div>
    </div>
  );

  const renderClasses = () => (
    <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 animate-in fade-in duration-700">
       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
          <div>
             <h3 className="text-3xl font-black text-slate-900 tracking-tighter">Student Directory</h3>
             <p className="text-slate-500 font-medium">Monitoring Grade 10-A Mastery & Risk Performance.</p>
          </div>
          <div className="flex flex-wrap gap-4 w-full md:w-auto">
             <div className="relative flex-1 min-w-[240px]">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl p-3.5 pl-12 text-sm font-medium outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all shadow-inner" 
                  placeholder="Search by identity..." 
                />
             </div>
             <button className="p-4 bg-emerald-600 text-white rounded-2xl shadow-xl shadow-emerald-500/20 hover:bg-emerald-500 transition-all"><Plus size={24} /></button>
          </div>
       </div>

       <div className="overflow-x-auto rounded-[2rem] border border-slate-100 shadow-inner bg-slate-50/30">
          <table className="w-full text-left border-collapse">
             <thead>
                <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                   <th className="px-8 py-6 border-b border-slate-100">Student Profile</th>
                   <th className="px-8 py-6 border-b border-slate-100">Neural Mastery</th>
                   <th className="px-8 py-6 border-b border-slate-100">Engagement Index</th>
                   <th className="px-8 py-6 border-b border-slate-100">Risk Assessment</th>
                   <th className="px-8 py-6 border-b border-slate-100 text-right">Intervention</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-slate-100 bg-white">
                {students.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase())).map(s => (
                  <tr key={s.id} className="hover:bg-emerald-50/30 transition-all group">
                     <td className="px-8 py-6">
                        <div className="flex items-center gap-5">
                           <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${s.name}`} className="w-12 h-12 rounded-2xl bg-slate-100 group-hover:scale-110 transition-transform duration-300 shadow-sm" />
                           <div>
                              <p className="font-black text-slate-900 text-lg group-hover:text-emerald-700 transition-colors">{s.name}</p>
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">ID: VEDA-{s.id}002</p>
                           </div>
                        </div>
                     </td>
                     <td className="px-8 py-6">
                        <div className="flex items-center gap-3">
                           <span className="text-xl font-black text-emerald-600">{s.mastery}%</span>
                           <div className="flex-1 max-w-[80px] h-1.5 bg-slate-100 rounded-full overflow-hidden">
                              <div className="mastery-gradient h-full rounded-full" style={{ width: `${s.mastery}%` }} />
                           </div>
                        </div>
                     </td>
                     <td className="px-8 py-6 font-bold text-slate-500 text-lg">{s.engagement}/100</td>
                     <td className="px-8 py-6">
                        <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                           s.risk === 'low' ? 'bg-emerald-50 text-emerald-700 border-emerald-100 group-hover:bg-emerald-100' :
                           s.risk === 'medium' ? 'bg-amber-50 text-amber-700 border-amber-100 group-hover:bg-amber-100' : 'bg-rose-50 text-rose-700 border-rose-100 group-hover:bg-rose-100'
                        }`}>
                           {s.risk} Priority
                        </span>
                     </td>
                     <td className="px-8 py-6 text-right space-x-2 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                        <button className="p-3 bg-slate-900 text-white rounded-xl hover:bg-emerald-600 transition-colors"><Mail size={18} /></button>
                        <button className="p-3 bg-white border border-slate-200 text-slate-400 rounded-xl hover:text-emerald-600 hover:border-emerald-600 transition-all"><BarChart3 size={18} /></button>
                     </td>
                  </tr>
                ))}
             </tbody>
          </table>
       </div>
    </div>
  );

  const renderProjects = () => (
    <div className="space-y-10 animate-in fade-in zoom-in-95 duration-700">
       <div className="bg-white p-12 rounded-[3.5rem] shadow-sm border border-slate-100">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10 mb-16">
             <div>
                <h3 className="text-4xl font-black text-slate-900 tracking-tighter mb-2.5">PBL Architect</h3>
                <p className="text-xl text-slate-500 font-medium">Generating high-impact multi-disciplinary briefs powered by Gemini 3.</p>
             </div>
             <button 
                onClick={handleGeneratePBL}
                disabled={creatingPbl}
                className="px-10 py-5 bg-[#09090b] text-white rounded-[1.5rem] font-black shadow-2xl hover:scale-105 transition-all flex items-center gap-4 disabled:opacity-50"
             >
                {creatingPbl ? 'Synthesizing Neural Brief...' : 'Draft New Project'}
                <Sparkles size={24} className="text-emerald-400" />
             </button>
          </div>

          {pblBrief ? (
            <div className="p-12 mastery-gradient rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
               <div className="relative z-10">
                  <div className="flex justify-between items-start mb-10">
                     <h4 className="text-4xl font-black tracking-tight max-w-2xl group-hover:translate-x-2 transition-transform duration-500">{pblBrief.title}</h4>
                     <div className="px-4 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl text-[10px] font-black uppercase tracking-widest">AI Generated • Grade 10-A</div>
                  </div>
                  <p className="text-2xl text-emerald-50/90 font-medium leading-relaxed mb-14 max-w-4xl">{pblBrief.objective}</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {pblBrief.milestones.map((m: string, i: number) => (
                      <div key={i} className="p-8 bg-white/10 backdrop-blur-xl rounded-[2.5rem] border border-white/20 shadow-lg group/item hover:bg-white/20 transition-all">
                         <span className="text-[12px] font-black text-emerald-300 uppercase tracking-[0.2em] block mb-4">Phase 0{i+1}</span>
                         <p className="text-lg font-bold leading-snug">{m}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-16 flex gap-6">
                     <button className="px-10 py-5 bg-white text-emerald-700 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-white/10">Deploy to Classroom</button>
                     <button className="px-10 py-5 bg-emerald-900/40 border border-white/20 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-emerald-900/60 transition-all">Save as Template</button>
                  </div>
               </div>
               <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/2 blur-[60px]" />
            </div>
          ) : (
            <div className="p-20 bg-slate-50/50 rounded-[3rem] border-4 border-dashed border-slate-100 text-center flex flex-col items-center justify-center">
               <div className="w-24 h-24 bg-white rounded-[2rem] flex items-center justify-center text-slate-300 mb-8 shadow-xl"><FileText size={48} /></div>
               <h4 className="text-2xl font-black text-slate-800">No Active Briefs Found</h4>
               <p className="text-lg text-slate-400 font-medium max-w-md mt-3 mb-10">Use our AI engine to generate unique, curriculum-aligned project briefs in seconds.</p>
               <button onClick={handleGeneratePBL} className="px-8 py-4 bg-emerald-100 text-emerald-700 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-600 hover:text-white transition-all">Initiate AI Synthesis</button>
            </div>
          )}
       </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100">
             <div className="flex justify-between items-center mb-10">
                <h3 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-3">Neural Gap Distribution <BarChart3 size={24} className="text-emerald-500" /></h3>
                <button className="p-3 bg-slate-50 rounded-xl text-slate-400 hover:text-emerald-600 transition-all"><Download size={20} /></button>
             </div>
             <div className="h-80 w-full mb-10">
                <ResponsiveContainer width="100%" height="100%">
                   <BarChart data={gapData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 11, fontWeight: 700, fill: '#64748b'}} />
                      <YAxis axisLine={false} tickLine={false} tick={{fontSize: 11, fontWeight: 700, fill: '#64748b'}} />
                      <Tooltip cursor={{fill: '#fbfcfa'}} contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 40px rgba(0,0,0,0.08)' }} />
                      <Bar dataKey="count" fill="#10b981" radius={[8, 8, 0, 0]} barSize={45} />
                   </BarChart>
                </ResponsiveContainer>
             </div>
          </div>
          <div className="space-y-8">
             <div className="bg-[#09090b] p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden group">
                <div className="relative z-10">
                   <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                      <BrainCircuit size={12} /> Mastery Prediction
                   </p>
                   <p className="text-xl font-bold leading-snug">Average class mastery will likely reach <span className="text-white font-black">92%</span> by next Friday if Calculus focus remains high.</p>
                </div>
                <div className="absolute -right-10 -bottom-10 opacity-5 group-hover:scale-110 transition-transform"><Sparkles size={120} /></div>
             </div>
             <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm transition-soft hover:shadow-xl">
                <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6">Engagement Cluster</h4>
                <div className="flex items-center gap-8">
                   <div className="w-24 h-24">
                      <ResponsiveContainer width="100%" height="100%">
                         <PieChart>
                            <Pie data={[{v:78},{v:22}]} innerRadius={30} outerRadius={40} dataKey="v">
                               <Cell fill="#10b981" />
                               <Cell fill="#f1f5f9" />
                            </Pie>
                         </PieChart>
                      </ResponsiveContainer>
                   </div>
                   <div>
                      <p className="text-3xl font-black text-slate-900 leading-none mb-1">78.1</p>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Index</p>
                   </div>
                </div>
             </div>
          </div>
       </div>
    </div>
  );

  const renderContent = () => (
    <div className="space-y-10 animate-in fade-in duration-700">
       <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
          <div className="relative flex-1 w-full md:max-w-xl group">
             <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={20} />
             <input 
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="w-full bg-white border-2 border-slate-100 rounded-[2rem] p-4 pl-14 text-sm font-medium outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all shadow-sm" 
               placeholder="Search Veda curriculum resources..." 
             />
          </div>
          <div className="flex items-center gap-4">
             <button className="px-6 py-3 bg-white border border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:border-emerald-500 transition-all"><Filter size={14} /></button>
             <button className="px-8 py-4 bg-emerald-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-emerald-500/20 hover:bg-emerald-500 transition-all flex items-center gap-3">
                <Upload size={18} /> Upload Resource
             </button>
          </div>
       </div>

       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: 'Advanced Thermodynamics', type: 'Lab Guide', count: 12, level: 'Advanced', color: 'rose' },
            { title: 'Calculus Visualization', type: 'Interactive', count: 8, level: 'Intermediate', color: 'blue' },
            { title: 'Smart Grid Briefing', type: 'PBL Brief', count: 4, level: 'Beginner', color: 'emerald' },
            { title: 'Organic Synthesis', type: 'Worksheet', count: 22, level: 'Advanced', color: 'rose' },
            { title: 'Indian Economy Dataset', type: 'Case Study', count: 1, level: 'Beginner', color: 'amber' },
            { title: 'Wave Dynamics 3D', type: 'Module', count: 6, level: 'Intermediate', color: 'blue' }
          ].map((item, i) => (
            <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all group cursor-pointer overflow-hidden relative">
               <div className="flex justify-between items-start mb-10">
                  <div className={`p-4 rounded-2xl bg-slate-50 text-slate-400 group-hover:bg-emerald-600 group-hover:text-white transition-all`}><BookOpen size={28} /></div>
                  <span className={`px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded-lg border ${
                    item.level === 'Advanced' ? 'bg-rose-50 text-rose-600 border-rose-100' :
                    item.level === 'Intermediate' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'
                  }`}>{item.level}</span>
               </div>
               <h4 className="text-xl font-black text-slate-900 mb-2 leading-tight group-hover:text-emerald-700 transition-colors">{item.title}</h4>
               <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-8">{item.type}</p>
               <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.count} Assets</span>
                  <button className="text-[10px] font-black text-emerald-600 uppercase tracking-widest hover:underline">Review Library</button>
               </div>
               <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            </div>
          ))}
       </div>
    </div>
  );

  const tabs: Record<string, () => React.ReactElement> = {
    overview: renderOverview,
    classes: renderClasses,
    projects: renderProjects,
    analytics: renderAnalytics,
    content: renderContent,
  };

  return (
    <div className="animate-in fade-in duration-700 pb-10 h-full">
      {tabs[activeTab] ? tabs[activeTab]() : tabs.overview()}
    </div>
  );
};

export default TeacherDashboard;
