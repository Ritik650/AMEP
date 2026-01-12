
import React from 'react';

interface DashboardCardProps {
  title: string;
  value: string | number;
  subValue?: string;
  icon: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  color?: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, subValue, icon, trend, color = 'emerald' }) => {
  const colorMap: Record<string, string> = {
    emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    blue: 'bg-sky-50 text-sky-600 border-sky-100',
    purple: 'bg-purple-50 text-purple-600 border-purple-100',
    orange: 'bg-orange-50 text-orange-600 border-orange-100',
    rose: 'bg-rose-50 text-rose-600 border-rose-100',
    amber: 'bg-amber-50 text-amber-600 border-amber-100'
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-8 shadow-sm border border-slate-100 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl group">
      <div className="flex items-center justify-between mb-8">
        <div className={`p-4 rounded-[1.5rem] border ${colorMap[color] || colorMap.emerald} transition-transform group-hover:scale-110 duration-500`}>
          {icon}
        </div>
        {trend && (
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${
            trend === 'up' ? 'bg-emerald-50 text-emerald-700' : 
            trend === 'down' ? 'bg-rose-50 text-rose-700' : 'bg-slate-50 text-slate-700'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${trend === 'up' ? 'bg-emerald-500' : trend === 'down' ? 'bg-rose-500' : 'bg-slate-400'}`} />
            {trend === 'up' ? 'Growth' : trend === 'down' ? 'Alert' : 'Stable'}
          </div>
        )}
      </div>
      <h3 className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-2">{title}</h3>
      <div className="flex items-baseline gap-3">
        <span className="text-4xl font-black text-slate-900 tracking-tighter leading-none">{value}</span>
        {subValue && <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">{subValue}</span>}
      </div>
    </div>
  );
};

export default DashboardCard;
