import React from 'react';
import { ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell } from 'recharts';

interface CategoryMixItem {
  name: string;
  value: number;
  color: string;
}

interface CategoryDistributionProps {
  categoryMix: CategoryMixItem[];
}

export const CategoryDistribution: React.FC<CategoryDistributionProps> = ({ categoryMix }) => (
  <section className="px-6 space-y-4">
    <h3 className="meta-label opacity-60">Category Distribution</h3>
    <div className="glass p-6 rounded-3xl flex items-center gap-6">
      <div className="w-28 h-28">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsPieChart>
            <Pie
              data={categoryMix}
              innerRadius={30}
              outerRadius={45}
              paddingAngle={8}
              dataKey="value"
              strokeWidth={0}
              cornerRadius={6}
            >
              {categoryMix.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </RechartsPieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex-1 space-y-2">
        {categoryMix.slice(0, 4).map((item) => (
          <div key={item.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-[10px] font-bold text-ink/60 uppercase tracking-wider">{item.name}</span>
            </div>
            <span className="text-[10px] font-bold data-value text-ink">₹{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);
