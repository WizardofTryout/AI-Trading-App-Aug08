import React, { useState, useEffect } from 'react';
import TimeframeSelector from './TimeframeSelector';
import LightweightChart from './LightweightChart';
import AdvancedFinancialChart from './AdvancedFinancialChart';

interface CandlestickData {
    time: string | number;
    open: number;
    high: number;
    low: number;
    close: number;
}

// Generate realistic live demo data with current timestamps
const generateLiveChartData = (): CandlestickData[] => {
  const data: CandlestickData[] = [];
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 30); // 30 days ago
  
  let currentPrice = 42850; // BTC-like price
  
  for (let i = 0; i < 30; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    
    // Simulate realistic price movement
    const volatility = 0.03; // 3% daily volatility
    const direction = Math.random() > 0.5 ? 1 : -1;
    const change = currentPrice * volatility * Math.random() * direction;
    
    const open = currentPrice;
    const close = currentPrice + change;
    const high = Math.max(open, close) + (Math.random() * currentPrice * 0.01);
    const low = Math.min(open, close) - (Math.random() * currentPrice * 0.01);
    
    data.push({
      time: date.toISOString().split('T')[0], // YYYY-MM-DD format
      open: Number(open.toFixed(2)),
      high: Number(high.toFixed(2)),
      low: Number(low.toFixed(2)),
      close: Number(close.toFixed(2))
    });
    
    currentPrice = close; // Update for next candle
  }
  
  return data;
};

const initialChartData = generateLiveChartData();

interface CandlestickChartSectionProps {
  pair: string;
}

const CandlestickChartSection: React.FC<CandlestickChartSectionProps> = ({ pair }) => {
  const [timeframe, setTimeframe] = useState('1d'); // Default to daily
  const [chartData, setChartData] = useState(initialChartData);
  const [useAdvancedChart, setUseAdvancedChart] = useState(true); // Toggle between charts
  const [isLiveMode, setIsLiveMode] = useState(false);

  // Simulate live data updates
  useEffect(() => {
    if (!isLiveMode) return;

    const interval = setInterval(() => {
      setChartData(prevData => {
        const newData = [...prevData];
        const lastCandle = newData[newData.length - 1];
        
        // Update last candle with new close price
        const volatility = 0.002; // 0.2% per update
        const direction = Math.random() > 0.5 ? 1 : -1;
        const priceChange = lastCandle.close * volatility * Math.random() * direction;
        
        const newClose = lastCandle.close + priceChange;
        newData[newData.length - 1] = {
          ...lastCandle,
          close: Number(newClose.toFixed(2)),
          high: Math.max(lastCandle.high, newClose),
          low: Math.min(lastCandle.low, newClose)
        };
        
        return newData;
      });
    }, 2000); // Update every 2 seconds

    return () => clearInterval(interval);
  }, [isLiveMode]);

  // In a real app, this would fetch data based on the pair and timeframe
  const handleTimeframeChange = (newTimeframe: string) => {
    setTimeframe(newTimeframe);
    console.log(`Fetching data for ${pair} with timeframe ${newTimeframe}`);
    // Here you would fetch new data and update chartData state
    // For demo: regenerate data
    setChartData(generateLiveChartData());
  };

  return (
    <div className="flex-1 bg-background p-2 sm:p-4 flex flex-col min-h-0">
      <div className="flex justify-between items-center mb-2 sm:mb-4 flex-wrap gap-2">
        <div className="flex items-center space-x-4">
          <h2 className="text-lg sm:text-xl font-bold text-font flex-shrink-0">
            {pair}
          </h2>
          <button
            onClick={() => setUseAdvancedChart(!useAdvancedChart)}
            className={`px-3 py-1 text-xs rounded-md transition-colors ${
              useAdvancedChart 
                ? 'bg-green-600 text-white hover:bg-green-700' 
                : 'bg-gray-600 text-gray-200 hover:bg-gray-500'
            }`}
          >
            {useAdvancedChart ? '📊 Advanced' : '📈 Basic'}
          </button>
          <button
            onClick={() => setIsLiveMode(!isLiveMode)}
            className={`px-3 py-1 text-xs rounded-md transition-colors ${
              isLiveMode 
                ? 'bg-red-600 text-white hover:bg-red-700 animate-pulse' 
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {isLiveMode ? '🔴 LIVE' : '▶️ Start Live'}
          </button>
        </div>
        <div className="flex-shrink-0">
          <TimeframeSelector selectedTimeframe={timeframe} onTimeframeChange={handleTimeframeChange} />
        </div>
      </div>
      
      {/* Chart status notification - more realistic */}
      {useAdvancedChart && (
        <div className="mb-3 p-3 bg-green-900 bg-opacity-50 rounded-lg border border-green-700">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <span className="text-green-300 mr-2">✅</span>
              <span className="text-green-200">
                Chart system active with <strong>D3-powered candlesticks</strong> and OHLC data display
              </span>
            </div>
            {isLiveMode && (
              <div className="flex items-center text-red-400 animate-pulse">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                <span className="text-xs font-semibold">LIVE DEMO</span>
              </div>
            )}
          </div>
        </div>
      )}
      
      <div className="flex-1 w-full min-h-[300px] sm:min-h-[400px]">
        {useAdvancedChart ? (
          <AdvancedFinancialChart 
            data={chartData} 
            height={400}
            showIndicators={true}
            showVolume={true}
          />
        ) : (
          <LightweightChart data={chartData} />
        )}
      </div>
    </div>
  );
};

export default CandlestickChartSection;
