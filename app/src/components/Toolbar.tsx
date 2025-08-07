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
    <div className="bg-background border-b border-accent p-2 flex items-center space-x-4">
      <h1 className="text-xl font-bold text-font">AI Trading App</h1>
      <TradingPairSelector />
      <div className="flex-1" />
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
  );
};

export default Toolbar;
