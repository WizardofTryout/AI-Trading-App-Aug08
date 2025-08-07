import React, { useState, useEffect, useMemo } from 'react';
import { getTradeHistory, Trade } from '../services/api';

const TradeHistoryPage: React.FC = () => {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [filterPair, setFilterPair] = useState('');
  const [sortKey, setSortKey] = useState<keyof Trade>('startTime');

  useEffect(() => {
    getTradeHistory().then(setTrades);
  }, []);

  const filteredAndSortedTrades = useMemo(() => {
    return trades
      .filter((trade) => trade.pair.toLowerCase().includes(filterPair.toLowerCase()))
      .sort((a, b) => {
        if (a[sortKey] < b[sortKey]) return 1;
        if (a[sortKey] > b[sortKey]) return -1;
        return 0;
      });
  }, [trades, filterPair, sortKey]);

  const totalPnl = useMemo(() => {
    return filteredAndSortedTrades.reduce((acc, trade) => acc + (trade.pnl || 0), 0);
  }, [filteredAndSortedTrades]);

  const totalFees = useMemo(() => {
    return filteredAndSortedTrades.reduce((acc, trade) => acc + (trade.fees || 0), 0);
  }, [filteredAndSortedTrades]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-font">Trade History</h1>

      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <label htmlFor="filter-pair" className="text-font">Filter by Pair:</label>
          <input
            id="filter-pair"
            type="text"
            className="bg-accent p-2 rounded"
            value={filterPair}
            onChange={(e) => setFilterPair(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2">
          <label htmlFor="sort-key" className="text-font">Sort by:</label>
          <select
            id="sort-key"
            className="bg-accent p-2 rounded"
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value as keyof Trade)}
          >
            <option value="startTime">Start Time</option>
            <option value="pnl">P/L</option>
            <option value="pair">Pair</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-accent p-4 rounded-lg">
          <h3 className="font-bold text-font">Total P/L</h3>
          <p className={totalPnl >= 0 ? 'text-green-500' : 'text-red-500'}>
            {totalPnl.toFixed(2)} USD
          </p>
        </div>
        <div className="bg-accent p-4 rounded-lg">
          <h3 className="font-bold text-font">Total Fees</h3>
          <p>{totalFees.toFixed(2)} USD</p>
        </div>
      </div>

      <table className="w-full text-left text-font">
        <thead>
          <tr>
            <th className="p-2">Pair</th>
            <th className="p-2">Side</th>
            <th className="p-2">Amount</th>
            <th className="p-2">Entry Price</th>
            <th className="p-2">Exit Price</th>
            <th className="p-2">P/L</th>
            <th className="p-2">Start Time</th>
            <th className="p-2">End Time</th>
            <th className="p-2">Leverage</th>
            <th className="p-2">Fees</th>
          </tr>
        </thead>
        <tbody>
          {filteredAndSortedTrades.map((trade) => (
            <tr key={trade.id} className="border-b border-accent">
              <td className="p-2">{trade.pair}</td>
              <td className="p-2">{trade.side}</td>
              <td className="p-2">{trade.amount}</td>
              <td className="p-2">{trade.entryPrice}</td>
              <td className="p-2">{trade.exitPrice}</td>
              <td className={`p-2 ${trade.pnl && trade.pnl >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {trade.pnl?.toFixed(2)}
              </td>
              <td className="p-2">{new Date(trade.startTime).toLocaleString()}</td>
              <td className="p-2">{trade.endTime && new Date(trade.endTime).toLocaleString()}</td>
              <td className="p-2">{trade.leverage}x</td>
              <td className="p-2">{trade.fees}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TradeHistoryPage;
