import React from 'react';
import { TrendingDown, AlertCircle, Zap } from 'lucide-react';
import { Suggestion } from '../../types';
import { cn } from '../../utils/cn';

interface SuggestionCardProps {
  suggestion: Suggestion;
}

export const SuggestionCard: React.FC<SuggestionCardProps> = ({ suggestion }) => (
  <div className="glass p-5 rounded-3xl space-y-3 relative overflow-hidden group">
    <div className="flex items-start gap-4">
      <div className={cn(
        "w-10 h-10 rounded-2xl flex items-center justify-center shrink-0",
        suggestion.type === 'saving' ? "bg-emerald-500/10 text-emerald-500" : 
        suggestion.type === 'alert' ? "bg-rose-500/10 text-rose-500" : "bg-blue-500/10 text-blue-500"
      )}>
        {suggestion.type === 'saving' ? <TrendingDown size={20} /> : 
         suggestion.type === 'alert' ? <AlertCircle size={20} /> : <Zap size={20} />}
      </div>
      <div className="space-y-1">
        <h4 className="text-sm font-bold text-ink">{suggestion.title}</h4>
        <p className="text-xs text-ink/60 leading-relaxed">{suggestion.description}</p>
      </div>
    </div>
  </div>
);
