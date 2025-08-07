import React from 'react';

interface TimeframeSelectorProps {
  selectedTimeframe: string;
  onTimeframeChange: (timeframe: string) => void;
}

const timeframes = ['30s', '1m', '2m', '3m', '30m', '1h', '2h', '4h', '1d'];

const TimeframeSelector: React.FC<TimeframeSelectorProps> = ({ selectedTimeframe, onTimeframeChange }) => {
  return (
    <div className="flex items-center space-x-2">
      <label htmlFor="timeframe-selector" className="text-font">Timeframe:</label>
      <select
        id="timeframe-selector"
        className="bg-accent p-2 rounded"
        value={selectedTimeframe}
        onChange={(e) => onTimeframeChange(e.target.value)}
      >
        {timeframes.map((timeframe) => (
          <option key={timeframe} value={timeframe}>{timeframe}</option>
        ))}
      </select>
    </div>
  );
};

export default TimeframeSelector;
