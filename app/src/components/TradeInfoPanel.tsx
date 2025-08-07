import React, { useState, useEffect } from 'react';
import { getTradeInfo, TradeInfo, closeTrade, modifyStrategy } from '../services/api';

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
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Trade Info for {pair}</h2>
        <button
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
          onClick={() => handleModifyStrategy(pair)}
        >
          Modify Strategy
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h3 className="font-bold">Profit/Loss</h3>
          <p className={tradeInfo.pnl >= 0 ? 'text-green-500' : 'text-red-500'}>
            {tradeInfo.pnl.toFixed(2)} USD
          </p>
        </div>
        <div>
          <h3 className="font-bold">Pending Orders</h3>
          <ul>
            {tradeInfo.pendingOrders.map((order) => (
              <li key={order.id}>{order.side} {order.amount} @ {order.price}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-bold">Open Positions</h3>
          <ul>
            {tradeInfo.openPositions.map((position) => (
              <li key={position.id} className="flex justify-between items-center">
                <span>{position.side} {position.amount} @ {position.entryPrice}</span>
                <button
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
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
