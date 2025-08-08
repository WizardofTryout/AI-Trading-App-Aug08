import React, { useEffect } from 'react';
import { Save, TestTube, Power, Bot, Settings, History, Play, StopCircle } from 'lucide-react';
import { useUIStore } from '../store/uiStore';
import TradingPairSelector from './TradingPairSelector';
import { startTradingEngine } from '../trading-engine/engine';

const Toolbar: React.FC = () => {
  const { toggleSettings, toggleTradeHistory, isAgentRunning, toggleAgent } = useUIStore();

  useEffect(() => {
    if (isAgentRunning) {
      startTradingEngine();
    }
  }, [isAgentRunning]);

  return (
    <div className="bg-background border-b border-accent p-2 flex items-center space-x-2 sm:space-x-4 flex-wrap gap-2 min-h-[60px]">
      <h1 className="text-lg sm:text-xl font-bold text-font">AI Trading App</h1>
      <TradingPairSelector />
      <div className="flex-1 min-w-[20px]" />
      
      {/* Desktop: All buttons visible */}
      <div className="hidden lg:flex items-center space-x-4">
        <button className="bg-accent-blue hover:bg-opacity-80 text-font font-bold py-2 px-4 rounded-2xl shadow-xl flex items-center space-x-2">
          <Save size={16} />
          <span>Save</span>
        </button>
        <button className="bg-accent-green hover:bg-opacity-80 text-font font-bold py-2 px-4 rounded-2xl shadow-xl flex items-center space-x-2">
          <TestTube size={16} />
          <span>Backtest</span>
        </button>
        <button
          className={`text-font font-bold py-2 px-4 rounded-2xl shadow-xl flex items-center space-x-2 ${
            isAgentRunning ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
          }`}
          onClick={toggleAgent}
        >
          {isAgentRunning ? <StopCircle size={16} /> : <Play size={16} />}
          <span>{isAgentRunning ? 'Stop Agent' : 'Start Agent'}</span>
        </button>
        <button className="bg-purple-600 hover:bg-purple-700 text-font font-bold py-2 px-4 rounded-2xl shadow-xl flex items-center space-x-2">
          <Bot size={16} />
          <span>AI Assistant</span>
        </button>
        <button
          className="bg-gray-600 hover:bg-gray-700 text-font font-bold py-2 px-4 rounded-2xl shadow-xl flex items-center space-x-2"
          onClick={toggleSettings}
        >
          <Settings size={16} />
          <span>Settings</span>
        </button>
        <button
          className="bg-gray-600 hover:bg-gray-700 text-font font-bold py-2 px-4 rounded-2xl shadow-xl flex items-center space-x-2"
          onClick={toggleTradeHistory}
        >
          <History size={16} />
          <span>History</span>
        </button>
      </div>

      {/* Mobile/Tablet: Compact buttons */}
      <div className="flex lg:hidden items-center space-x-2">
        <button
          className={`text-font font-bold py-2 px-3 rounded-2xl shadow-xl flex items-center space-x-1 ${
            isAgentRunning ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
          }`}
          onClick={toggleAgent}
        >
          {isAgentRunning ? <StopCircle size={16} /> : <Play size={16} />}
          <span className="hidden sm:inline">{isAgentRunning ? 'Stop' : 'Start'}</span>
        </button>
        <button
          className="bg-gray-600 hover:bg-gray-700 text-font font-bold py-2 px-3 rounded-2xl shadow-xl"
          onClick={toggleSettings}
          title="Settings"
        >
          <Settings size={16} />
        </button>
        <button
          className="bg-gray-600 hover:bg-gray-700 text-font font-bold py-2 px-3 rounded-2xl shadow-xl"
          onClick={toggleTradeHistory}
          title="Trade History"
        >
          <History size={16} />
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
