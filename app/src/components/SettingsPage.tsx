import React, { useState, useEffect } from 'react';
import { getSettings, saveSettings } from '../services/api';
import type { Settings } from '../services/api';

const SettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<Settings | null>(null);

  useEffect(() => {
    getSettings().then(setSettings);
  }, []);

  const handleSave = () => {
    if (settings) {
      saveSettings(settings);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (settings) {
      const { id, value, type } = event.target;
      setSettings({
        ...settings,
        [id]: type === 'number' ? parseFloat(value) : value,
      });
    }
  };

  if (!settings) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 text-font">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>

      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-bold mb-4">API Keys</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="bitgetApiKey" className="block font-bold">Bitget API Key</label>
              <input id="bitgetApiKey" type="password" className="w-full bg-accent p-2 rounded" value={settings.bitgetApiKey || ''} onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <label htmlFor="binanceApiKey" className="block font-bold">Binance API Key</label>
              <input id="binanceApiKey" type="password" className="w-full bg-accent p-2 rounded" value={settings.binanceApiKey || ''} onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <label htmlFor="aiApiKey" className="block font-bold">AI Provider API Key</label>
              <input id="aiApiKey" type="password" className="w-full bg-accent p-2 rounded" value={settings.aiApiKey || ''} onChange={handleChange} />
              <p className="text-sm text-gray-400">For OpenAI, Claude, or other providers.</p>
            </div>

            <div className="space-y-2">
              <label htmlFor="ollamaUrl" className="block font-bold">Ollama URL</label>
              <input id="ollamaUrl" type="text" className="w-full bg-accent p-2 rounded" value={settings.ollamaUrl || ''} onChange={handleChange} />
              <p className="text-sm text-gray-400">For local Ollama instance.</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">Trading Parameters</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="investmentPerTrade" className="block font-bold">Investment per Trade ($)</label>
              <input id="investmentPerTrade" type="number" className="w-full bg-accent p-2 rounded" value={settings.investmentPerTrade || ''} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <label htmlFor="riskRewardRatio" className="block font-bold">Risk/Reward Ratio</label>
              <input id="riskRewardRatio" type="text" className="w-full bg-accent p-2 rounded" value={settings.riskRewardRatio || ''} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <label htmlFor="stopLoss" className="block font-bold">Stop Loss (%)</label>
              <input id="stopLoss" type="number" className="w-full bg-accent p-2 rounded" value={settings.stopLoss || ''} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <label htmlFor="takeProfit" className="block font-bold">Take Profit (%)</label>
              <input id="takeProfit" type="number" className="w-full bg-accent p-2 rounded" value={settings.takeProfit || ''} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <label htmlFor="tradeDirection" className="block font-bold">Trade Direction</label>
              <select id="tradeDirection" className="w-full bg-accent p-2 rounded" value={settings.tradeDirection || 'Long'} onChange={handleChange}>
                <option>Long</option>
                <option>Short</option>
                <option>Both</option>
              </select>
            </div>
            <div className="space-y-2">
              <label htmlFor="leverage" className="block font-bold">Leverage</label>
              <input id="leverage" type="number" className="w-full bg-accent p-2 rounded" value={settings.leverage || ''} onChange={handleChange} />
            </div>
          </div>
        </div>
      </div>

      <button
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-8"
        onClick={handleSave}
      >
        Save Settings
      </button>
    </div>
  );
};

export default SettingsPage;
