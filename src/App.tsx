import React, { lazy, Suspense } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

/**
 * Root Application Entry.
 * Optimized via code splitting (lazy loading) and logic extraction.
 */

import { AuthScreen } from './components/features/AuthScreen';

/**
 * Dynamic Page Imports.
 * These are only downloaded when the user switches tabs, reducing the initial load time.
 */
const Dashboard = lazy(() => import('./pages/Dashboard/index'));
const History = lazy(() => import('./pages/History/index'));
const BudgetPage = lazy(() => import('./pages/Budget/index'));
const Assets = lazy(() => import('./pages/Assets/index'));
const ExportPage = lazy(() => import('./pages/Export/index'));

// Core Feature Modals & Drawers
import { QuickAddDrawer } from './components/features/QuickAddDrawer';
import { AddTransaction } from './components/features/AddTransaction';
import { AddAccount } from './components/features/AddAccount';
import { UserManagement } from './components/features/UserManagement';

// UI Layout Components
import { BottomNav } from './components/ui/BottomNav';

// Master State Management Hook
import { useApp } from './hooks/useApp';

export default function App() {
  const {
    session,
    isLoading,
    activeTab,
    handleTabChange,
    showAdd,
    setShowAdd,
    showAddAccount,
    setShowAddAccount,
    showUser,
    setShowUser,
    showExport,
    setShowExport,
    activeQuickCat,
    setActiveQuickCat,
    transactions,
    accounts,
    handleSaveTransaction,
    handleSaveAccount,
    handleSaveBulk,
    handleQuickAdd,
    deleteTransaction,

    handleEditTransaction,
    updateProfile,
    selectedTxForEdit,
    categories
  } = useApp();

  if (!session) {
    return <AuthScreen />;
  }

  if (isLoading && accounts.length === 0) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 size={40} className="animate-spin text-purple-600 mx-auto" />
          <p className="meta-label opacity-40 uppercase tracking-widest">Hydrating Session...</p>
        </div>
      </div>
    );
  }

  const showingSubPage = showAdd || showAddAccount || showUser || showExport;

  return (
    <div className="h-dvh bg-bg text-ink selection:bg-purple-600/10 font-sans overflow-hidden">
      <main className="max-w-md mx-auto h-full relative shadow-2xl shadow-black/5 bg-bg border-x border-black/5 flex flex-col overflow-hidden">
        <AnimatePresence mode="popLayout">
          {!showingSubPage && (
            <motion.div 
              key="main-shell"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex-1 flex flex-col h-full overflow-hidden"
            >
              <div className="flex-1 flex flex-col overflow-hidden relative">
                <Suspense fallback={
                  <div className="flex items-center justify-center flex-1">
                    <Loader2 className="animate-spin text-purple-600" />
                  </div>
                }>
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.02 }}
                      transition={{ duration: 0.15, ease: 'easeOut' }}
                      className="flex-1 flex flex-col overflow-y-auto no-scrollbar"
                    >
                      {activeTab === 'dashboard' && (
                        <Dashboard 
                          transactions={transactions} 
                          accounts={accounts} 
                          onOpenUser={() => setShowUser(true)} 
                        />
                      )}
                      {activeTab === 'history' && (
                        <History 
                          transactions={transactions} 
                          onEdit={handleEditTransaction}
                          onDelete={deleteTransaction}
                        />
                      )}
                      {activeTab === 'budgets' && <BudgetPage />}
                      {activeTab === 'assets' && (
                        <Assets 
                          accounts={accounts} 
                          onAddAccount={() => setShowAddAccount(true)} 
                        />
                      )}
                    </motion.div>
                  </AnimatePresence>
                </Suspense>
              </div>

              <QuickAddDrawer 
                categories={categories} 
                onAdd={handleQuickAdd} 
              />
              <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
            </motion.div>
          )}

          {showAdd && (
            <motion.div 
              key="modal-add" 
              initial={{ y: '100%' }} 
              animate={{ y: 0 }} 
              exit={{ y: '100%' }} 
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-0 z-50 bg-bg overflow-hidden"
            >
              <AddTransaction 
                editData={selectedTxForEdit}
                initialCategory={activeQuickCat}
                accounts={accounts}
                onBack={() => {
                  setShowAdd(false);
                  setActiveQuickCat(null);
                }} 
                onSave={handleSaveTransaction}
              />

            </motion.div>
          )}

          {showAddAccount && (
            <motion.div 
              key="modal-add-acc" 
              initial={{ y: '100%' }} 
              animate={{ y: 0 }} 
              exit={{ y: '100%' }} 
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-0 z-50 bg-bg overflow-hidden"
            >
              <AddAccount 
                onBack={() => setShowAddAccount(false)} 
                onSave={handleSaveAccount}
              />
            </motion.div>
          )}

          {(showUser || showExport) && (
            <motion.div 
              key="modal-user-export" 
              initial={{ x: '100%' }} 
              animate={{ x: 0 }} 
              exit={{ x: '100%' }} 
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-0 z-50 bg-bg overflow-hidden"
            >
              {showExport ? (
                <ExportPage 
                  transactions={transactions} 
                  accounts={accounts} 
                  onBack={() => setShowExport(false)} 
                />
              ) : (
                <UserManagement 
                  session={session}
                  updateProfile={updateProfile}
                  onBack={() => setShowUser(false)} 
                  onExport={() => setShowExport(true)}
                  onImport={handleSaveBulk}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
