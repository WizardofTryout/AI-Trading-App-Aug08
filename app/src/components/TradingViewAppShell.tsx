import React from 'react';
import SidebarNavigation from './SidebarNavigation';
import Toolbar from './Toolbar';
import CandlestickChartSection from './CandlestickChartSection';
import Tabs from './Tabs';
import SettingsPage from './SettingsPage';
import TradeHistoryPage from './TradeHistoryPage';
import TradeInfoPanel from './TradeInfoPanel';
import RelationBuilder from './RelationBuilder';
import PineScriptPanel from './PineScriptPanel';
import { useUIStore } from '../store/uiStore';

const TradingPairDashboard: React.FC<{ pair: string }> = ({ pair }) => {
  return (
    <div className="flex-1 flex flex-col h-full min-h-0">
      <CandlestickChartSection pair={pair} />
      <div className="h-1/3 min-h-[200px] border-t border-accent">
        <TradeInfoPanel pair={pair} />
      </div>
    </div>
  );
};

const Dashboard: React.FC = () => {
    const { activeTradingPairs, removeTradingPair, activeDashboardTab, setActiveDashboardTab } = useUIStore();

    const tabs = activeTradingPairs.map((pair) => ({
        label: (
            <div className="flex items-center">
                <span>{pair}</span>
                <span
                    className="ml-2 text-red-500 hover:text-red-700 cursor-pointer"
                    onClick={(e) => {
                        e.stopPropagation(); // Prevent tab selection when closing
                        removeTradingPair(pair);
                    }}
                >
                    ×
                </span>
            </div>
        ),
        content: <TradingPairDashboard pair={pair} />,
    }));

    return <Tabs tabs={tabs} activeTab={activeDashboardTab} setActiveTab={setActiveDashboardTab} />;
};

const TradingViewAppShell: React.FC = () => {
  const { isDarkMode, isSidebarOpen, isSettingsOpen, toggleSettings, isTradeHistoryOpen, toggleTradeHistory, activeView } = useUIStore();

  return (
    <div className={`${isDarkMode ? 'dark' : ''} bg-background text-font h-screen flex flex-col overflow-hidden`}>
      <Toolbar />
      <div className="flex flex-1 overflow-hidden min-h-0">
        {isSidebarOpen && <SidebarNavigation />}
        <main className="flex-1 flex flex-col min-h-0 overflow-hidden">
          {activeView === 'dashboard' && <Dashboard />}
          {activeView === 'relation-builder' && <RelationBuilder />}
          {activeView === 'pine-script' && (
            <div className="h-full overflow-hidden">
              <PineScriptPanel />
            </div>
          )}
        </main>
      </div>
      {isSettingsOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-2xl shadow-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-auto">
            <SettingsPage />
            <button
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4 w-full sm:w-auto"
              onClick={toggleSettings}
            >
              Close
            </button>
          </div>
        </div>
      )}
      {isTradeHistoryOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-2xl shadow-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-auto">
            <TradeHistoryPage />
            <button
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4 w-full sm:w-auto"
              onClick={toggleTradeHistory}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TradingViewAppShell;
