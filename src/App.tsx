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
  /**
   * The application logic is decoupled from this JSX file for maximum maintainability.
   * All state transitions and authentication flows occur within useApp().
   */
  const {
    session,
    activeTab,
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
    isLoading,
    handleTabChange,
    handleSaveTransaction,
    handleSaveAccount,
    handleSaveBulk,
    handleQuickAdd,
    categories
  } = useApp();

  /**
   * Conditional layout for authentication.
   */
  if (!session) {
    return <AuthScreen />;
  }

  /**
   * Application-wide 'Hydration' skeleton.
   */
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

  return (
    <div className="min-h-screen bg-bg text-ink selection:bg-purple-600/10 font-sans">
      <main className="max-w-md mx-auto min-h-screen relative shadow-2xl shadow-black/5 bg-bg border-x border-black/5 overflow-hidden">
        
        {/**
         * Suspense manages the loading state of any lazily imported components.
         */}
        <Suspense fallback={
          <div className="flex items-center justify-center h-screen">
            <Loader2 className="animate-spin text-purple-600" />
          </div>
        }>
          <AnimatePresence mode="wait">
            {!showExport ? (
              /**
               * Animated tab transitions for an 'App-like' mobile experience.
               */
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              >
                {activeTab === 'dashboard' && (
                  <Dashboard 
                    transactions={transactions} 
                    accounts={accounts} 
                    onOpenUser={() => setShowUser(true)} 
                  />
                )}
                {activeTab === 'history' && <History transactions={transactions} />}
                {activeTab === 'budgets' && <BudgetPage />}
                {activeTab === 'assets' && (
                  <Assets 
                    accounts={accounts} 
                    onAddAccount={() => setShowAddAccount(true)} 
                  />
                )}
              </motion.div>
            ) : (
              /** 
               * Special 'Export' mode - replaces the main view while active.
               */
              <ExportPage 
                transactions={transactions} 
                accounts={accounts} 
                onBack={() => {
                  setShowExport(false);
                  setShowUser(false);
                }} 
              />
            )}
          </AnimatePresence>
        </Suspense>

        {/**
         * Global Floating UI Elements.
         */}
        <QuickAddDrawer 
          categories={categories} 
          onAdd={handleQuickAdd} 
        />

        <AnimatePresence>
          {showAdd && (
            <AddTransaction 
              initialCategory={activeQuickCat}
              accounts={accounts}
              onBack={() => {
                setShowAdd(false);
                setActiveQuickCat(null);
              }} 
              onSave={handleSaveTransaction}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showAddAccount && (
            <AddAccount 
              onBack={() => setShowAddAccount(false)} 
              onSave={handleSaveAccount}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showUser && (
            <UserManagement 
              onBack={() => setShowUser(false)} 
              onExport={() => {
                setShowExport(true);
                setShowUser(false);
              }}
              onImport={handleSaveBulk}
            />
          )}
        </AnimatePresence>

        {/**
         * Persistent Mobile Navigation.
         */}
        <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
      </main>
    </div>
  );
}
