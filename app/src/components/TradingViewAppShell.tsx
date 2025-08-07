import React from 'react';
import SidebarNavigation from './SidebarNavigation';
import Toolbar from './Toolbar';
import CandlestickChartSection from './CandlestickChartSection';
import Tabs from './Tabs';
import SettingsPage from './SettingsPage';
import TradeHistoryPage from './TradeHistoryPage';
import TradeInfoPanel from './TradeInfoPanel';
import { useUIStore } from '../store/uiStore';

const TradingPairDashboard: React.FC<{ pair: string }> = ({ pair }) => {
  return (
    <div className="flex-1 flex flex-col">
      <CandlestickChartSection pair={pair} />
      <div className="h-1/3 border-t border-accent">
        <TradeInfoPanel pair={pair} />
      </div>
    </div>
  );
};

const TradingViewAppShell: React.FC = () => {
  const { isDarkMode, isSidebarOpen, isSettingsOpen, toggleSettings, isTradeHistoryOpen, toggleTradeHistory, activeTradingPairs, removeTradingPair } = useUIStore();

  const tabs = activeTradingPairs.map((pair) => ({
    label: (
      <div className="flex items-center">
        <span>{pair}</span>
        <button
          className="ml-2 text-red-500 hover:text-red-700"
          onClick={() => removeTradingPair(pair)}
        >
          x
        </button>
      </div>
    ),
    content: <TradingPairDashboard pair={pair} />,
  }));

  return (
    <div className={`${isDarkMode ? 'dark' : ''} bg-background text-font h-screen flex flex-col`}>
      <Toolbar />
      <div className="flex flex-1 overflow-hidden">
        {isSidebarOpen && <SidebarNavigation />}
        <main className="flex-1 flex flex-col">
          <Tabs tabs={tabs} />
        </main>
      </div>
      {isSettingsOpen && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-background rounded-2xl shadow-xl p-8 w-1/2">
            <SettingsPage />
            <button
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
              onClick={toggleSettings}
            >
              Close
            </button>
          </div>
        </div>
      )}
      {isTradeHistoryOpen && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-background rounded-2xl shadow-xl p-8 w-3/4 h-3/4 overflow-auto">
            <TradeHistoryPage />
            <button
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
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
