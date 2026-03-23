import { Sparkles } from 'lucide-react';

export default function FinancialInsight() {
  return (
    <div className="bg-surface p-8 rounded-xl border border-outline-variant/15">
      <h4 className="font-headline text-lg mb-4">Financial Insight</h4>
      <p className="text-on-surface-variant font-body leading-relaxed text-sm">
        Your spending in <span className="text-primary font-bold">Dining</span> has decreased by 14% this week. You're on track to save an extra <span className="text-secondary font-bold">$400</span> by the end of the month.
      </p>
      <div className="mt-6 p-4 bg-secondary-container/30 rounded-lg flex items-start gap-3">
        <Sparkles className="text-secondary shrink-0" size={18} />
        <p className="text-xs font-medium text-on-secondary-container">
          Recommendation: Consider moving your surplus to your 'Vanguard Index' savings goal.
        </p>
      </div>
    </div>
  );
}
