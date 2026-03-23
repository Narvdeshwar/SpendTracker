export default function BudgetCard() {
  return (
    <div className="glass p-8 rounded-2xl card-hover">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">Monthly Budget</h3>
        <span className="text-accent font-bold data-value">72%</span>
      </div>
      <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden mb-6">
        <div className="h-full bg-accent w-[72%] rounded-full shadow-[0_0_12px_rgba(16,185,129,0.3)] transition-all duration-1000"></div>
      </div>
      <div className="flex justify-between text-sm meta-label">
        <span className="text-white/60">Spent <span className="text-white data-value">$7,200</span></span>
        <span className="text-white/60">Limit <span className="text-white data-value">$10,000</span></span>
      </div>
    </div>
  );
}
