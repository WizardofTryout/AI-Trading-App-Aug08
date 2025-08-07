import React, { useState } from 'react';
import TimeframeSelector from './TimeframeSelector';
import LightweightChart from './LightweightChart';
import { CandlestickData } from 'lightweight-charts';

// Mock initial data
const initialChartData: CandlestickData[] = [
    { time: '2023-11-20', open: 189.98, high: 191.91, low: 189.98, close: 191.45 },
    { time: '2023-11-21', open: 191.41, high: 191.50, low: 189.74, close: 190.64 },
    { time: '2023-11-22', open: 191.49, high: 192.93, low: 190.89, close: 191.31 },
    { time: '2023-11-24', open: 190.89, high: 190.90, low: 189.25, close: 189.97 },
    { time: '2023-11-27', open: 189.92, high: 190.67, low: 188.90, close: 189.79 },
];

interface CandlestickChartSectionProps {
  pair: string;
}

const CandlestickChartSection: React.FC<CandlestickChartSectionProps> = ({ pair }) => {
  const [timeframe, setTimeframe] = useState('1d'); // Default to daily
  const [chartData, setChartData] = useState(initialChartData);

  // In a real app, this would fetch data based on the pair and timeframe
  const handleTimeframeChange = (newTimeframe: string) => {
    setTimeframe(newTimeframe);
    console.log(`Fetching data for ${pair} with timeframe ${newTimeframe}`);
    // Here you would fetch new data and update chartData state
  };

  return (
    <div className="flex-1 bg-background p-4 flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-font">
          {pair}
        </h2>
        <TimeframeSelector selectedTimeframe={timeframe} onTimeframeChange={handleTimeframeChange} />
      </div>
      <div className="flex-1 w-full h-full">
        <LightweightChart data={chartData} />
      </div>
    </div>
  );
};

export default CandlestickChartSection;
