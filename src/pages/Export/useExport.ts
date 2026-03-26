import { useState, useMemo } from 'react';
import { Transaction, Format } from '../../types';
import { getDayName } from '../../utils/formatters';

export const useExport = (transactions: Transaction[]) => {
  const [format, setFormat] = useState<Format>('CSV');
  const [selectedAccount, setSelectedAccount] = useState<string>('all');
  const [dateRange, setDateRange] = useState({ start: '2026-03-01', end: '2026-03-31' });

  const filteredTransactions = useMemo(() => {
    return transactions.filter(t => {
      const dateMatch = t.date >= dateRange.start && t.date <= dateRange.end;
      const accountMatch = selectedAccount === 'all';
      return dateMatch && accountMatch;
    });
  }, [transactions, dateRange, selectedAccount]);

  const handleDownload = () => {
    if (format === 'JSON') {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(filteredTransactions, null, 2));
      const downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute("href", dataStr);
      downloadAnchorNode.setAttribute("download", `pennytrack_export_${dateRange.start}.json`);
      document.body.appendChild(downloadAnchorNode);
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
    } else {
      const headers = ['Date', 'Day', 'Description', 'Category', 'Credit', 'Debit'];
      const rows = filteredTransactions.map(t => [
        t.date,
        getDayName(t.date),
        t.merchant,
        t.category,
        t.type === 'credit' ? t.amount.toFixed(2) : '',
        t.type === 'debit' ? t.amount.toFixed(2) : ''
      ]);
      const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `pennytrack_export_${dateRange.start}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  };

  return {
    format,
    setFormat,
    selectedAccount,
    setSelectedAccount,
    dateRange,
    setDateRange,
    filteredTransactions,
    handleDownload
  };
};
