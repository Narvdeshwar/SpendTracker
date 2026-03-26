import React from 'react';
import { Transaction } from '../../types';
import { cn } from '../../utils/cn';
import { formatDate } from '../../utils/formatters';

interface ExportPreviewProps {
  transactions: Transaction[];
}

export const ExportPreview: React.FC<ExportPreviewProps> = ({ transactions }) => (
  <div className="space-y-4">
    <div className="flex justify-between items-center px-1">
      <h3 className="meta-label">Preview ({transactions.length} rows)</h3>
    </div>
    <div className="glass rounded-3xl overflow-hidden">
      <div className="max-h-60 overflow-y-auto no-scrollbar">
        <table className="w-full text-left border-collapse">
          <thead className="sticky top-0 glass backdrop-blur-md">
            <tr>
              <th className="px-4 py-3 text-[8px] font-bold uppercase tracking-widest text-ink/40">Date</th>
              <th className="px-4 py-3 text-[8px] font-bold uppercase tracking-widest text-ink/40">Item</th>
              <th className="px-4 py-3 text-[8px] font-bold uppercase tracking-widest text-ink/40 text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5">
            {transactions.map(t => (
              <tr key={t.id} className="text-[10px] font-medium">
                <td className="px-4 py-3 text-ink/60">{formatDate(t.date)}</td>
                <td className="px-4 py-3 text-ink truncate max-w-[120px]">{t.merchant}</td>
                <td className={cn(
                  "px-4 py-3 text-right data-value",
                  t.type === 'credit' ? "text-emerald-600" : "text-ink"
                )}>
                  {t.type === 'credit' ? '+' : '-'}₹{t.amount.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);
