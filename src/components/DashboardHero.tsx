import { TrendingDown } from 'lucide-react';
import { motion } from 'motion/react';

export default function DashboardHero() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden glass p-10 rounded-2xl text-ink group"
    >
      <div className="relative z-10">
        <p className="meta-label mb-4">
          Portfolio Value • Q1 2026
        </p>
        <div className="flex items-baseline gap-2">
          <span className="text-6xl font-bold tracking-tight data-value text-primary">$124,482</span>
          <span className="text-xl opacity-40 data-value">.50</span>
        </div>
        <div className="mt-8 flex gap-4">
          <div className="bg-primary/5 border border-primary/10 px-4 py-2 rounded-full flex items-center gap-2">
            <TrendingDown size={16} className="text-primary" />
            <span className="text-sm font-semibold text-primary">12.4% yield</span>
          </div>
        </div>
      </div>
      <div className="absolute -right-16 -top-16 w-64 h-64 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-all duration-700"></div>
      <div className="absolute -left-16 -bottom-16 w-48 h-48 bg-accent/5 rounded-full blur-3xl opacity-50"></div>
    </motion.div>
  );
}
