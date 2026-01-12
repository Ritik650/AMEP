import React, { useState, useEffect, useRef } from 'react';
import { 
  Target, Award, Clock, Sparkles, ArrowRight, Lightbulb, CheckCircle2, 
  MessageSquare, Send, Trophy, Star, User, Bot, ChevronRight, Circle, 
  RefreshCcw, Users, Layout, FileText, Bell, Flame, Settings, Search,
  Share2, Paperclip, MoreVertical, Plus, ShieldCheck
} from 'lucide-react';
import DashboardCard from '../components/DashboardCard';
import { generateAdaptiveQuiz, chatWithTutor } from '../services/geminiService';
import { Milestone } from '../types';

const StudentDashboard: React.FC<{ activeTab: string; setActiveTab: (tab: string) => void }> = ({ activeTab, setActiveTab }) => {
  // --- Mastery Hub State ---
  const [quiz, setQuiz] = useState<any[]>([]);
  const [loadingQuiz, setLoadingQuiz] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [selectedTopic, setSelectedTopic] = useState<{name: string, gaps: string[]} | null>(null);

  // --- Project State ---
  const [milestones, setMilestones] = useState<Milestone[]>([
    { id: '1', title: 'Research: Smart Urban Mobility', completed: true },
    { id: '2', title: 'Sensor Integration Logic', completed: false },
    { id: '3', title: 'Final Prototype Assembly', completed: false },
    { id: '4', title: 'System Validation Report', completed: false },
  ]);

  const toggleMilestone = (id: string) => {
    setMilestones(prev => prev.map(m => 
      m.id === id ? { ...m, completed: !m.completed } : m
    ));
  };

  const projectProgress = Math.round((milestones.filter(m => m.completed).length / milestones.length) * 100);

  // --- AI Tutor State ---
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState<{role: 'user' | 'model', text: string}[]>([
    { role: 'model', text: 'Namaste Aarav! I am your Veda AI Tutor. How can I help you master your subjects today?' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const availableTopics = [
    { name: 'Computer Science', icon: <Bot size={20} />, mastery: 68, gaps: ['Algorithms', 'Data Structures'] },
    { name: 'Mathematics', icon: <Target size={20} />, mastery: 75, gaps: ['Calculus', 'Complex Variables'] },
    { name: 'Physics', icon: <Flame size={20} />, mastery: 52, gaps: ['Quantum Mechanics', 'Relativity'] },
    { name: 'Economics', icon: <Award size={20} />, mastery: 91, gaps: ['Market Equilibrium'] },
  ];

  const startPractice = async () => {
    if (!selectedTopic) return;
    setLoadingQuiz(true);
    try {
      const questions = await generateAdaptiveQuiz(selectedTopic.name, selectedTopic.gaps);
      setQuiz(questions);
      setQuizStarted(true);
      setQuizCompleted(false);
      setScore(0);
      setActiveQuestion(0);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingQuiz(false);
    }
  };

  const handleQuizAnswer = (idx: number) => {
    const isCorrect = idx === quiz[activeQuestion].correctIndex;
    if (isCorrect) setScore(prev => prev + 1);

    if (activeQuestion < quiz.length - 1) {
      setActiveQuestion(prev => prev + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!chatInput.trim() || isTyping) return;
    const userMsg = chatInput.trim();
    setChatInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);
    try {
      const response = await chatWithTutor(userMsg, messages);
      setMessages(prev => [...prev, { role: 'model', text: response || 'Something went wrong. Let me try again.' }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: 'I am experiencing connection issues. Please try again later.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  const renderOverview = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="relative overflow-hidden mastery-gradient rounded-[3rem] p-10 md:p-14 text-white shadow-2xl shadow-emerald-500/20">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-wider">Top 5% Student</div>
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
            </div>
            <h2 className="text-5xl md:text-6xl font-black mb-6 tracking-tighter leading-none">Namaste, Aarav.</h2>
            <p className="text-xl text-emerald-50/80 font-medium leading-relaxed max-w-lg mb-8">
              Your mastery level in <span className="text-white font-bold underline underline-offset-4 decoration-white/40">Mathematics</span> has increased by 15% this week. Keep up the momentum!
            </p>
            <div className="flex gap-4">
              <button onClick={() => setActiveTab('practice')} className="px-8 py-4 bg-white text-emerald-700 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-all">Start Practice</button>
              <button onClick={() => setActiveTab('ai-tutor')} className="px-8 py-4 bg-emerald-900/40 backdrop-blur-md text-white rounded-2xl font-black text-sm uppercase tracking-widest border border-white/10 hover:bg-emerald-900/60 transition-all">Ask Veda AI</button>
            </div>
          </div>
          <div className="hidden lg:grid grid-cols-2 gap-6">
            {[
              { val: '2,450', label: 'XP Points', delay: '0s' },
              { val: '12', label: 'Active Badges', delay: '1s' },
              { val: '82%', label: 'Avg. Mastery', delay: '0.5s' },
              { val: '5d', label: 'Daily Streak', delay: '1.5s' }
            ].map((stat, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2rem] p-8 text-center animate-float" style={{ animationDelay: stat.delay }}>
                <p className="text-4xl font-black mb-1">{stat.val}</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-emerald-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
              <div className="flex justify-between items-start mb-6">
                <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl group-hover:bg-emerald-600 group-hover:text-white transition-all"><Target size={24} /></div>
                <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Active Path</span>
              </div>
              <h4 className="text-2xl font-black text-slate-900 mb-2">Calculus Hub</h4>
              <p className="text-sm text-slate-500 mb-8">Recalibrating Taylor Series mastery gaps.</p>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-8">
                <div className="mastery-gradient h-full w-[75%]" />
              </div>
              <button onClick={() => setActiveTab('practice')} className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-emerald-600 transition-all">Resume Session</button>
            </div>
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
              <div className="flex justify-between items-start mb-6">
                <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-all"><Users size={24} /></div>
                <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Project Sync</span>
              </div>
              <h4 className="text-2xl font-black text-slate-900 mb-2">Eco-Sanjivani</h4>
              <p className="text-sm text-slate-500 mb-8">Phase 2: Sensor Integration active.</p>
              <div className="flex -space-x-2 mb-8">
                {[1,2,3].map(i => <img key={i} src={`https://api.dicebear.com/7.x/avataaars/svg?seed=p${i}`} className="w-8 h-8 rounded-full border-2 border-white bg-slate-100" />)}
              </div>
              <button onClick={() => setActiveTab('projects')} className="w-full py-4 bg-white border border-slate-200 text-slate-900 rounded-2xl font-bold text-xs uppercase tracking-widest hover:border-emerald-500 transition-all">Enter Workspace</button>
            </div>
          </div>

          <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
             <div className="flex justify-between items-center mb-10">
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Veda Inbox</h3>
                <button onClick={() => setActiveTab('messages')} className="text-[10px] font-black uppercase tracking-widest text-emerald-600 hover:underline">View All</button>
             </div>
             <div className="space-y-4">
                {[
                  { from: 'Prof. Priya Iyer', msg: 'Aarav, your latest submission shows 94% mastery.', unread: true },
                  { from: 'Veda AI Tutor', msg: 'Neural gap detected in Thermodynamics.', unread: true }
                ].map((msg, i) => (
                  <div key={i} className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl border border-slate-100">
                    <div className="flex gap-4 items-center">
                       <div className={`w-2 h-2 rounded-full ${msg.unread ? 'bg-emerald-500' : 'bg-slate-200'}`} />
                       <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{msg.from}</p>
                          <p className="text-sm font-bold text-slate-800">{msg.msg}</p>
                       </div>
                    </div>
                    <ChevronRight size={18} className="text-slate-300" />
                  </div>
                ))}
             </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-[#09090b] p-8 rounded-[2.5rem] text-white shadow-xl">
             <h4 className="text-lg font-black mb-8 flex items-center gap-2">Vault <Trophy size={18} className="text-emerald-500" /></h4>
             <div className="space-y-6">
                {['Logic Lord', 'Data Dynamo', 'Early Bird'].map((ach, i) => (
                  <div key={i} className="flex items-center gap-4">
                     <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400"><Star size={20} fill="currentColor" /></div>
                     <div>
                        <p className="font-bold text-sm leading-none mb-1">{ach}</p>
                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Mastery Level 0{i+1}</p>
                     </div>
                  </div>
                ))}
             </div>
             <button onClick={() => setActiveTab('achievements')} className="w-full mt-10 py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-emerald-400 hover:bg-white/10 transition-all">Open Vault</button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPractice = () => (
    <div className="max-w-4xl mx-auto space-y-10 animate-in zoom-in-95 duration-500">
      {!quizStarted ? (
        <div className="bg-white p-12 rounded-[3rem] shadow-sm border border-slate-100">
          <h2 className="text-4xl font-black text-slate-900 mb-8 tracking-tighter">Adaptive Path Hub</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {availableTopics.map((topic, idx) => (
              <button key={idx} onClick={() => setSelectedTopic(topic)} className={`p-10 rounded-[2.5rem] border-2 text-left transition-all ${selectedTopic?.name === topic.name ? 'border-emerald-600 bg-emerald-50/50 shadow-xl' : 'border-slate-50 hover:border-emerald-200'}`}>
                <div className="flex justify-between items-start mb-8">
                  <div className={`p-4 rounded-2xl ${selectedTopic?.name === topic.name ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-400'}`}>{topic.icon}</div>
                  <p className="text-3xl font-black text-slate-900">{topic.mastery}%</p>
                </div>
                <h4 className="text-2xl font-black text-slate-900 mb-4">{topic.name}</h4>
              </button>
            ))}
          </div>
          {selectedTopic && (
            <button onClick={startPractice} disabled={loadingQuiz} className="w-full mt-12 py-6 bg-[#09090b] text-white rounded-[2rem] font-black text-xl hover:bg-emerald-600 transition-all flex items-center justify-center gap-3 disabled:opacity-50">
              {loadingQuiz ? 'Calibrating Neural Gaps...' : `Initiate ${selectedTopic.name}`}
              <ArrowRight size={24} />
            </button>
          )}
        </div>
      ) : quizCompleted ? (
        <div className="bg-white p-16 text-center rounded-[3.5rem] shadow-2xl border border-slate-100">
          <div className="w-32 h-32 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-10 shadow-inner"><Trophy size={64} /></div>
          <h3 className="text-5xl font-black text-slate-900 mb-6 tracking-tighter">Gap Closed!</h3>
          <p className="text-2xl text-slate-500 mb-12 max-w-lg mx-auto">Score: <span className="text-emerald-600 font-black">{score}/{quiz.length}</span></p>
          <button onClick={() => setQuizStarted(false)} className="px-12 py-5 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-sm">Return to Hub</button>
        </div>
      ) : (
        <div className="bg-white p-12 rounded-[3.5rem] shadow-2xl border border-slate-100">
          <div className="flex justify-between items-center mb-12">
            <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Question {activeQuestion + 1} of {quiz.length}</span>
            <div className="px-4 py-2 bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase tracking-widest rounded-xl">Veda Adaptive Mode</div>
          </div>
          <h3 className="text-3xl font-black text-slate-900 mb-12 leading-tight">{quiz[activeQuestion].question}</h3>
          <div className="grid grid-cols-1 gap-4">
            {quiz[activeQuestion].options.map((opt: string, idx: number) => (
              <button key={idx} onClick={() => handleQuizAnswer(idx)} className="w-full text-left p-8 rounded-3xl border-2 border-slate-50 hover:border-emerald-500 hover:bg-emerald-50 transition-all font-bold text-slate-700 flex justify-between items-center group">
                {opt}
                <ChevronRight size={20} className="text-slate-300 group-hover:text-emerald-500" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderAITutor = () => (
    <div className="max-w-5xl mx-auto h-[calc(100vh-16rem)] flex flex-col bg-white rounded-[3rem] shadow-2xl border border-slate-100 overflow-hidden">
      <div className="p-8 bg-[#09090b] text-white flex items-center justify-between">
        <div className="flex items-center gap-5">
          <div className="p-4 mastery-gradient rounded-2xl"><Sparkles size={28} /></div>
          <div>
             <h3 className="font-extrabold text-2xl tracking-tighter">Veda AI Tutor</h3>
             <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">Neural Link v4.2</p>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-8 space-y-10 bg-[#f8fafc] custom-scrollbar">
        {messages.map((m, idx) => (
          <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[75%] p-7 rounded-[2rem] text-lg font-medium shadow-sm ${m.role === 'user' ? 'bg-emerald-600 text-white rounded-tr-none' : 'bg-white text-slate-800 border border-slate-100 rounded-tl-none'}`}>
              {m.text}
            </div>
          </div>
        ))}
        {isTyping && <div className="text-emerald-500 font-black text-xs uppercase animate-pulse">Veda is synthesizing logic...</div>}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-8 bg-white border-t border-slate-100">
        <form onSubmit={handleSendMessage} className="flex gap-4">
          <input value={chatInput} onChange={(e) => setChatInput(e.target.value)} className="flex-1 bg-slate-50 border border-slate-200 rounded-[2rem] p-6 text-lg outline-none focus:border-emerald-500" placeholder="Ask anything..." />
          <button type="submit" disabled={!chatInput.trim() || isTyping} className="w-20 h-20 bg-emerald-600 text-white rounded-full flex items-center justify-center hover:bg-emerald-700 transition-all shadow-xl"><Send size={32} /></button>
        </form>
      </div>
    </div>
  );

  const renderProjects = () => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full animate-in fade-in duration-700">
       <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100">
             <div className="flex justify-between items-center mb-10">
                <h3 className="text-3xl font-black text-slate-900 tracking-tight">Eco-Sanjivani</h3>
                <div className="px-4 py-2 bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase tracking-widest rounded-xl">Team Alpha Syncing</div>
             </div>
             <div className="space-y-6">
                {milestones.map(m => (
                  <div key={m.id} className="flex items-center gap-4 p-6 bg-slate-50 rounded-3xl group cursor-pointer hover:bg-white hover:border-emerald-100 border border-transparent transition-all">
                    <button onClick={() => toggleMilestone(m.id)} className={`w-8 h-8 rounded-xl border-2 flex items-center justify-center ${m.completed ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-200'}`}>
                      {m.completed && <CheckCircle2 size={16} />}
                    </button>
                    <span className={`text-lg font-bold ${m.completed ? 'text-slate-400 line-through' : 'text-slate-800'}`}>{m.title}</span>
                  </div>
                ))}
             </div>
          </div>
       </div>
       <div className="bg-[#09090b] p-8 rounded-[3rem] text-white">
          <h4 className="font-bold text-lg mb-8">Team Artifacts</h4>
          <div className="space-y-4">
             {['site_analysis.pdf', 'sensor_data.xlsx', 'blueprint_v4.cad'].map((f, i) => (
               <div key={i} className="flex items-center justify-between p-5 bg-white/5 rounded-2xl hover:bg-white/10 transition-all cursor-pointer">
                  <span className="text-sm font-bold opacity-80">{f}</span>
                  <FileText size={18} className="text-emerald-500" />
               </div>
             ))}
          </div>
       </div>
    </div>
  );

  const renderAchievements = () => (
    <div className="space-y-10 animate-in fade-in duration-700">
       <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          <DashboardCard title="XP Pulse" value="12,450" icon={<Flame size={20} />} color="rose" />
          <DashboardCard title="Badges" value="08" icon={<Trophy size={20} />} color="amber" />
          <DashboardCard title="Rank" value="#04" icon={<Star size={20} />} color="emerald" />
          <DashboardCard title="Verify" value="Elite" icon={<ShieldCheck size={20} />} color="blue" />
       </div>
       <div className="bg-white p-12 rounded-[3.5rem] shadow-sm border border-slate-100">
          <h3 className="text-3xl font-black text-slate-900 mb-12 tracking-tighter">Achievement Gallery</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-10">
             {['Logic Lord', 'Data Dynamo', 'Early Bird', 'Deep Diver', 'Veda Core', 'Team Titan'].map((ach, i) => (
               <div key={i} className="flex flex-col items-center group cursor-pointer">
                  <div className="w-24 h-24 bg-slate-50 border border-slate-100 rounded-3xl flex items-center justify-center text-slate-300 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500 shadow-sm"><Trophy size={40} /></div>
                  <span className="mt-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">{ach}</span>
               </div>
             ))}
          </div>
       </div>
    </div>
  );

  const renderMessages = () => (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-700">
       <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-10">
             <h3 className="text-3xl font-black text-slate-900 tracking-tighter">Veda Inbox</h3>
             <button className="p-3 bg-slate-50 rounded-xl text-slate-400 hover:text-emerald-600 transition-colors"><Search size={20} /></button>
          </div>
          <div className="space-y-4">
             {[
               { from: 'System HQ', msg: 'Neural model recalibrated for Grade 10-A.', time: '1h ago', unread: true },
               { from: 'Ishita Gupta', msg: 'Aarav, checked the CAD file, looks good!', time: '3h ago', unread: false }
             ].map((msg, i) => (
               <div key={i} className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 flex items-center justify-between group cursor-pointer hover:bg-white hover:border-emerald-300 transition-all">
                  <div className="flex gap-6 items-center">
                     <div className={`w-3 h-3 rounded-full ${msg.unread ? 'bg-emerald-500' : 'bg-slate-200'}`} />
                     <div>
                        <p className="text-[11px] font-black text-emerald-600 uppercase tracking-widest mb-1">{msg.from}</p>
                        <p className="text-lg font-bold text-slate-800">{msg.msg}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter mt-2">{msg.time}</p>
                     </div>
                  </div>
                  <ChevronRight size={22} className="text-slate-300 group-hover:text-emerald-600 transition-all" />
               </div>
             ))}
          </div>
       </div>
    </div>
  );

  const tabs: Record<string, () => React.ReactElement> = {
    overview: renderOverview,
    practice: renderPractice,
    'ai-tutor': renderAITutor,
    projects: renderProjects,
    achievements: renderAchievements,
    messages: renderMessages,
  };

  return (
    <div className="animate-in fade-in duration-700 pb-10 h-full">
      {tabs[activeTab] ? tabs[activeTab]() : tabs.overview()}
    </div>
  );
};

export default StudentDashboard;