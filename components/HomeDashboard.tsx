
import React from 'react';
import { DASHBOARD_STATS, ACTIVITY_CHART, CATEGORY_CHART } from '../constants';

const HomeDashboard: React.FC = () => {
  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      {/* Welcome Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl md:text-4xl font-black text-text-main tracking-tight">System Status</h1>
        <p className="text-text-secondary">ArXivPulse is monitoring and indexing the global research pulse.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {DASHBOARD_STATS.map((stat) => (
          <div key={stat.label} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-xl ${stat.color}`}>
                <span className="material-symbols-outlined">{stat.icon}</span>
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${stat.trend.startsWith('+') ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'}`}>
                {stat.trend}
              </span>
            </div>
            <p className="text-text-secondary text-xs font-semibold uppercase tracking-wider">{stat.label}</p>
            <p className="text-2xl font-black text-text-main mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activity Area Chart (SVG) */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-text-main">Weekly Indexing Pulse</h3>
            <span className="text-xs text-text-secondary font-medium">Daily average: 512 papers</span>
          </div>
          <div className="h-48 w-full relative group">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 700 200">
              <defs>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#7f13ec" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#7f13ec" stopOpacity="0" />
                </linearGradient>
              </defs>
              {/* Grid Lines */}
              {[0, 50, 100, 150].map(y => (
                <line key={y} x1="0" y1={y} x2="700" y2={y} stroke="#f1f1f1" strokeWidth="1" />
              ))}
              {/* The Area Path */}
              <path 
                d={`M 0 200 ${ACTIVITY_CHART.map((d, i) => `L ${i * 100} ${200 - (d.value / 800) * 180}`).join(' ')} L 600 200 Z`} 
                fill="url(#areaGradient)"
              />
              {/* The Line Path */}
              <path 
                d={`M 0 ${200 - (ACTIVITY_CHART[0].value / 800) * 180} ${ACTIVITY_CHART.map((d, i) => `L ${i * 100} ${200 - (d.value / 800) * 180}`).join(' ')}`} 
                fill="none" 
                stroke="#7f13ec" 
                strokeWidth="3" 
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Points */}
              {ACTIVITY_CHART.map((d, i) => (
                <circle 
                  key={i} 
                  cx={i * 100} 
                  cy={200 - (d.value / 800) * 180} 
                  r="4" 
                  fill="#fff" 
                  stroke="#7f13ec" 
                  strokeWidth="2" 
                  className="hover:r-6 cursor-pointer transition-all"
                />
              ))}
            </svg>
            {/* Labels */}
            <div className="flex justify-between mt-4">
              {ACTIVITY_CHART.map(d => (
                <span key={d.day} className="text-[10px] font-bold text-text-secondary uppercase">{d.day}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Category Bar Chart */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-text-main">Category Distribution</h3>
            <span className="text-xs text-text-secondary font-medium">Top active fields</span>
          </div>
          <div className="flex flex-col gap-4">
            {CATEGORY_CHART.map((item) => (
              <div key={item.day} className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-tight">
                  <span className="text-text-main">{item.day}</span>
                  <span className="text-text-secondary">{item.value}%</span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full transition-all duration-1000 ease-out" 
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
        <h3 className="font-bold text-text-main mb-6">Recent Platform Events</h3>
        <div className="flex flex-col gap-6">
          {[
            { time: '2m ago', event: '24 new papers indexed in cs.LG', icon: 'sync', color: 'text-primary' },
            { time: '1h ago', event: 'Gemini AI generated 45 research summaries', icon: 'auto_awesome', color: 'text-amber-500' },
            { time: '3h ago', event: 'Weekly trend analysis completed for Physics', icon: 'trending_up', color: 'text-blue-500' },
          ].map((item, idx) => (
            <div key={idx} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full ${item.color.replace('text', 'bg')}/10 flex items-center justify-center`}>
                  <span className={`material-symbols-outlined ${item.color}`} style={{ fontSize: '18px' }}>{item.icon}</span>
                </div>
                {idx !== 2 && <div className="w-px h-full bg-gray-100 mt-2"></div>}
              </div>
              <div className="flex flex-col gap-0.5 pb-2">
                <p className="text-sm font-medium text-text-main">{item.event}</p>
                <p className="text-xs text-text-secondary">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeDashboard;
