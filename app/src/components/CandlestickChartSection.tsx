import React, { useState } from 'react';
import TimeframeSelector from './TimeframeSelector';

interface CandlestickChartSectionProps {
  pair: string;
}

const CandlestickChartSection: React.FC<CandlestickChartSectionProps> = ({ pair }) => {
  const [timeframe, setTimeframe] = useState('1m');

  return (
    <div className="flex-1 bg-gray-900 p-4 flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Candlestick Chart - {pair}</h2>
        <TimeframeSelector selectedTimeframe={timeframe} onTimeframeChange={setTimeframe} />
      </div>
      <div className="bg-gray-800 h-full w-full">
        {/* Placeholder for the chart */}
        <p className="text-center p-4">Chart for {pair} with timeframe {timeframe}</p>
      </div>
    </div>
  );
};

export default CandlestickChartSection;
