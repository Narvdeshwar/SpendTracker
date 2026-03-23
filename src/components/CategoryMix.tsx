import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { CategoryData } from '../types';

const data = [
  { name: 'Housing', value: 40, color: '#6366F1' },
  { name: 'Dining', value: 30, color: '#10B981' },
  { name: 'Leisure', value: 20, color: '#F59E0B' },
  { name: 'Other', value: 10, color: '#6B7280' },
];

export default function CategoryMix() {
  return (
    <div className="glass p-8 rounded-2xl card-hover">
      <h3 className="text-xl font-semibold mb-8">Category Mix</h3>
      <div className="h-48 w-full mb-8 relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={65}
              outerRadius={85}
              paddingAngle={8}
              dataKey="value"
              stroke="none"
              cornerRadius={4}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color} 
                  className="outline-none focus:outline-none"
                  style={{ filter: `drop-shadow(0 0 8px ${entry.color}44)` }}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-sm meta-label">Budget</span>
          <span className="text-xl font-bold data-value">100%</span>
        </div>
      </div>
      <div className="space-y-4">
        {data.map((item) => (
          <div key={item.name} className="flex justify-between items-center group/item hover:bg-white/5 p-1 rounded-lg transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color, boxShadow: `0 0 8px ${item.color}` }}></div>
              <span className="text-sm text-white/70 group-hover/item:text-white transition-colors">{item.name}</span>
            </div>
            <span className="text-sm font-bold data-value">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
