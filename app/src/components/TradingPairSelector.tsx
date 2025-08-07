import React, { useState, useEffect } from 'react';
import { getTradingPairs } from '../services/api';
import { useUIStore } from '../store/uiStore';

const TradingPairSelector: React.FC = () => {
  const [pairs, setPairs] = useState<string[]>([]);
  const [selectedPair, setSelectedPair] = useState<string>('');
  const { addTradingPair } = useUIStore();

  useEffect(() => {
    getTradingPairs().then((p) => {
      setPairs(p);
      setSelectedPair(p[0]);
    });
  }, []);

  const handleAddPair = () => {
    if (selectedPair) {
      addTradingPair(selectedPair);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <label htmlFor="trading-pair-selector" className="text-font">Trading Pair:</label>
      <select
        id="trading-pair-selector"
        className="bg-accent p-2 rounded"
        value={selectedPair}
        onChange={(e) => setSelectedPair(e.target.value)}
      >
        {pairs.map((pair) => (
          <option key={pair} value={pair}>{pair}</option>
        ))}
      </select>
      <button
        className="bg-accent-green hover:bg-opacity-80 text-font font-bold py-2 px-4 rounded"
        onClick={handleAddPair}
      >
        Add
      </button>
    </div>
  );
};

export default TradingPairSelector;
