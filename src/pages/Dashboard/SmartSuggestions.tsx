import React from 'react';
import { Suggestion } from '../../types';
import { SuggestionCard } from '../../components/ui/SuggestionCard';

interface SmartSuggestionsProps {
  suggestions: Suggestion[];
}

export const SmartSuggestions: React.FC<SmartSuggestionsProps> = ({ suggestions }) => (
  <section className="px-6 space-y-4">
    <h3 className="meta-label opacity-60">Smart Suggestions</h3>
    <div className="space-y-3">
      {suggestions.map(s => <SuggestionCard key={s.id} suggestion={s} />)}
    </div>
  </section>
);
