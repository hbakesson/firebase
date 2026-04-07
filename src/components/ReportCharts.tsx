"use client";

import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
  AreaChart,
  Area
} from "recharts";
import { TrendingUp } from "lucide-react";

interface ReportChartsProps {
  comparisonData: {
    name: string;
    planned: number;
    actual: number;
    teams: string[];
  }[];
  teamBreakdown: {
    name: string;
    value: number;
  }[];
  trendData: {
    period: string;
    planned: number;
    actual: number;
  }[];
}

export default function ReportCharts({ comparisonData, teamBreakdown, trendData }: ReportChartsProps) {
  return (
    <div className="space-y-12">
      {/* 1. Historical Trend Analysis (NEW) */}
      <div className="card shadow-glass" style={{ padding: '2.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
          <div>
            <h3 style={{ fontWeight: 800, fontSize: '1.5rem', letterSpacing: '-0.025em' }}>Historical Utilization Trend</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Comparison of total forecasted vs. actually logged capacity over the last 6 cycles.</p>
          </div>
          <div className="user-badge" style={{ background: 'rgba(99, 102, 241, 0.1)', borderColor: 'rgba(99, 102, 241, 0.2)' }}>
            <TrendingUp size={14} className="text-indigo-400" /> Executive Overview
          </div>
        </div>
        
        <div style={{ width: '100%', height: 350 }}>
          <ResponsiveContainer>
            <AreaChart data={trendData}>
              <defs>
                <linearGradient id="colorPlanned" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#818cf8" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis 
                dataKey="period" 
                stroke="#94a3b8" 
                fontSize={11} 
                tickLine={false}
                axisLine={false}
                dy={10}
              />
              <YAxis 
                stroke="#94a3b8" 
                fontSize={11} 
                tickLine={false}
                axisLine={false}
                tickFormatter={(val: number) => `${val}h`}
              />
              <Tooltip 
                contentStyle={{ 
                  background: 'rgba(15, 23, 42, 0.95)', 
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '0.75rem',
                  backdropFilter: 'blur(8px)',
                  boxShadow: '0 10px 15px -3px rgba(0,0,0,0.5)'
                }} 
              />
              <Legend verticalAlign="top" align="right" height={36} iconType="circle" />
              <Area 
                type="monotone" 
                dataKey="planned" 
                name="Total Forecast" 
                stroke="#6366f1" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorPlanned)" 
              />
              <Area 
                type="monotone" 
                dataKey="actual" 
                name="Total Reality" 
                stroke="#818cf8" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorActual)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 400px', gap: '2.5rem' }}>
        {/* 2. Planned vs Actual Bar Chart */}
        <div className="card shadow-glass" style={{ padding: '2rem' }}>
          <h3 style={{ marginBottom: '2rem', fontWeight: 800, fontSize: '1.25rem' }}>Period Performance by Project</h3>
          <div style={{ width: '100%', height: 400 }}>
            <ResponsiveContainer>
              <BarChart data={comparisonData} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={true} vertical={false} />
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category"
                  stroke="#94a3b8" 
                  fontSize={10} 
                  tickLine={false}
                  axisLine={false}
                  width={120}
                />
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                  contentStyle={{ 
                    background: 'rgba(15, 23, 42, 0.9)', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '0.5rem'
                  }} 
                />
                <Legend layout="horizontal" verticalAlign="bottom" align="center" />
                <Bar dataKey="planned" name="Forecast" fill="rgba(99, 102, 241, 0.3)" stroke="rgba(99, 102, 241, 0.6)" radius={[0, 4, 4, 0]} />
                <Bar dataKey="actual" name="Reality" fill="#6366f1" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 3. Team Breakdown Pie/Donut Chart */}
        <div className="card shadow-glass" style={{ padding: '2rem' }}>
          <h3 style={{ marginBottom: '1.5rem', fontWeight: 800, fontSize: '1.25rem' }}>Resource Allocation</h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Forecasted hours proportioned across reporting teams for the active cycle.</p>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={teamBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={8}
                  dataKey="value"
                  stroke="none"
                >
                  {teamBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={`rgba(99, 102, 241, ${0.4 + (index * 0.15)})`} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" wrapperStyle={{ paddingTop: '20px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 4. Variance Analysis Detail Table */}
      <div className="card shadow-glass" style={{ padding: '0' }}>
        <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid var(--card-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontWeight: 800, fontSize: '1.25rem' }}>Variance Deep-Dive</h3>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{comparisonData.length} Active Projects</span>
        </div>
        <div className="overflow-x-auto">
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--card-border)', fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <th style={{ padding: '1rem 2rem' }}>Project Name</th>
                <th style={{ padding: '1rem' }}>Teams</th>
                <th style={{ padding: '1rem', textAlign: 'right' }}>Forecast</th>
                <th style={{ padding: '1rem', textAlign: 'right' }}>Reality</th>
                <th style={{ padding: '1rem 2rem', textAlign: 'right' }}>Variance</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((item, i) => {
                const variance = item.actual - item.planned;
                const isOver = variance > 0;
                return (
                  <tr key={i} style={{ borderBottom: '1px solid var(--card-border)', transition: 'background 0.2s' }} className="hover:bg-white/2">
                    <td style={{ padding: '1rem 2rem', fontWeight: 600 }}>{item.name}</td>
                    <td style={{ padding: '1rem' }}>
                      <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                        {item.teams.map((t, idx) => (
                          <span key={idx} style={{ fontSize: '0.6rem', background: 'rgba(255,255,255,0.05)', padding: '1px 6px', borderRadius: '4px', color: 'var(--text-muted)', border: '1px solid rgba(255,255,255,0.05)' }}>
                            {t}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'right', fontSize: '0.875rem' }}>{item.planned}h</td>
                    <td style={{ padding: '1rem', textAlign: 'right', fontSize: '0.875rem' }}>{item.actual}h</td>
                    <td style={{ padding: '1rem 2rem', textAlign: 'right' }}>
                      <span className={`role-tag ${isOver ? 'role-admin' : 'role-staff'}`} style={{ fontSize: '0.75rem', minWidth: '60px', textAlign: 'center' }}>
                        {isOver ? '+' : ''}{variance}h
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
