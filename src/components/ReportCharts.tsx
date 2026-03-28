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
  Pie
} from "recharts";

interface ReportChartsProps {
  comparisonData: {
    name: string;
    planned: number;
    actual: number;
  }[];
  teamBreakdown: {
    name: string;
    value: number;
  }[];
}

export default function ReportCharts({ comparisonData, teamBreakdown }: ReportChartsProps) {
  return (
    <div className="space-y-12">
      {/* 1. Planned vs Actual Bar Chart */}
      <div className="card" style={{ padding: '2rem' }}>
        <h3 style={{ marginBottom: '2rem', fontWeight: 700, fontSize: '1.25rem' }}>Plan vs. Actual Utilization</h3>
        <div style={{ width: '100%', height: 400 }}>
          <ResponsiveContainer>
            <BarChart data={comparisonData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis 
                dataKey="name" 
                stroke="#94a3b8" 
                fontSize={12} 
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="#94a3b8" 
                fontSize={12} 
                tickLine={false}
                axisLine={false}
                tickFormatter={(val) => `${val}h`}
              />
              <Tooltip 
                contentStyle={{ 
                  background: 'rgba(15, 23, 42, 0.9)', 
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '0.5rem',
                  color: 'white'
                }} 
              />
              <Legend verticalAlign="top" height={36} />
              <Bar dataKey="planned" name="Forecast" fill="rgba(99, 102, 241, 0.3)" stroke="rgba(99, 102, 241, 0.8)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="actual" name="Real Reality" fill="rgba(99, 102, 241, 1)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        {/* 2. Variance Analysis Table/List */}
        <div className="card" style={{ padding: '2rem' }}>
          <h3 style={{ marginBottom: '1.5rem', fontWeight: 700 }}>Variance Analysis</h3>
          <div className="space-y-4">
            {comparisonData.map((item, i) => {
              const variance = item.actual - item.planned;
              const isOver = variance > 0;
              return (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', borderBottom: '1px solid var(--card-border)' }}>
                  <div>
                    <div style={{ fontWeight: 600 }}>{item.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Difference: {Math.abs(variance)}h</div>
                  </div>
                  <div className={`role-tag ${isOver ? 'role-admin' : 'role-staff'}`}>
                    {isOver ? '+' : ''}{variance}h
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. Team Breakdown Pie/Donut Chart */}
        <div className="card" style={{ padding: '2rem' }}>
          <h3 style={{ marginBottom: '1.5rem', fontWeight: 700 }}>Allocation by Team</h3>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={teamBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {teamBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={`rgba(99, 102, 241, ${0.4 + (index * 0.2)})`} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
