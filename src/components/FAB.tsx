import { Plus } from 'lucide-react';

export default function FAB() {
  return (
    <div className="fixed bottom-32 right-8 z-50 md:bottom-12">
      <button className="bg-gradient-to-br from-primary to-primary-container text-white w-14 h-14 rounded-xl shadow-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all">
        <Plus size={32} />
      </button>
    </div>
  );
}
