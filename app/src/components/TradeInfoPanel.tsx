import React, { useState, useEffect } from 'react';
import { getTradeInfo, closeTrade, modifyStrategy } from '../services/api';
import type { TradeInfo } from '../services/api';

interface TradeInfoPanelProps {
  pair: string;
}

const TradeInfoPanel: React.FC<TradeInfoPanelProps> = ({ pair }) => {
  const [tradeInfo, setTradeInfo] = useState<TradeInfo | null>(null);

  useEffect(() => {
    getTradeInfo(pair).then(setTradeInfo);
    // In a real app, you would use a websocket for real-time updates.
    const interval = setInterval(() => {
      getTradeInfo(pair).then(setTradeInfo);
    }, 5000);
    return () => clearInterval(interval);
  }, [pair]);

  const handleCloseTrade = (positionId: string) => {
    closeTrade(positionId);
  };

  const handleModifyStrategy = (pair: string) => {
    modifyStrategy(pair);
  };

  if (!tradeInfo) {
    return <div>Loading trade info...</div>;
  }

  return (
    <div className="p-3 sm:p-4">
      <div className="flex justify-between items-center mb-3 sm:mb-4 flex-wrap gap-2">
        <h2 className="text-lg sm:text-xl font-bold">Trade Info for {pair}</h2>
        <button
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-3 sm:px-4 rounded text-sm sm:text-base flex-shrink-0"
          onClick={() => handleModifyStrategy(pair)}
        >
          <span className="hidden sm:inline">Modify Strategy</span>
          <span className="sm:hidden">Modify</span>
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
        <div className="bg-surface p-3 rounded border border-accent">
          <h3 className="font-bold text-sm sm:text-base mb-2">Profit/Loss</h3>
          <p className={`text-base sm:text-lg font-bold ${tradeInfo.pnl >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {tradeInfo.pnl.toFixed(2)} USD
          </p>
        </div>
        <div className="bg-surface p-3 rounded border border-accent">
          <h3 className="font-bold text-sm sm:text-base mb-2">Pending Orders</h3>
          <ul className="space-y-1 text-sm">
            {tradeInfo.pendingOrders.map((order) => (
              <li key={order.id} className="break-words">
                {order.side} {order.amount} @ {order.price}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-surface p-3 rounded border border-accent">
          <h3 className="font-bold text-sm sm:text-base mb-2">Open Positions</h3>
          <ul className="space-y-2">
            {tradeInfo.openPositions.map((position) => (
              <li key={position.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <span className="text-sm break-words">
                  {position.side} {position.amount} @ {position.entryPrice}
                </span>
                <button
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-xs sm:text-sm flex-shrink-0"
                  onClick={() => handleCloseTrade(position.id)}
                >
                  Close
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TradeInfoPanel;
