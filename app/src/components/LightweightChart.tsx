import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import * as d3 from 'd3';

interface CandlestickData {
    time: string | number;
    open: number;
    high: number;
    low: number;
    close: number;
    volume?: number;
}

interface LightweightChartProps {
    data: CandlestickData[];
}

interface ChartData {
    date: Date;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
}

const LightweightChart: React.FC<LightweightChartProps> = ({ data }) => {
    const [chartData, setChartData] = useState<ChartData[]>([]);
    const [dimensions, setDimensions] = useState({ width: 800, height: 400 });
    const containerRef = useRef<HTMLDivElement>(null);

    // Konvertiere und bereite Daten auf
    useEffect(() => {
        if (data.length === 0) return;

        const parseDate = d3.timeParse('%Y-%m-%d');
        const formattedData: ChartData[] = data.map((item) => {
            let date: Date;
            
            if (typeof item.time === 'string') {
                date = parseDate(item.time) || new Date(item.time) || new Date();
            } else {
                date = new Date(item.time * 1000);
            }

            return {
                date,
                open: item.open,
                high: item.high,
                low: item.low,
                close: item.close,
                volume: item.volume || Math.floor(Math.random() * 1000000) + 100000,
            };
        }).sort((a, b) => a.date.getTime() - b.date.getTime());

        setChartData(formattedData);
    }, [data]);

    // Dimensionen basierend auf Container-Größe
    useEffect(() => {
        const updateDimensions = () => {
            if (containerRef.current) {
                const { width, height } = containerRef.current.getBoundingClientRect();
                setDimensions({ 
                    width: Math.max(width || 800, 400), 
                    height: Math.max(height || 400, 300)
                });
            }
        };

        updateDimensions();
        window.addEventListener('resize', updateDimensions);
        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    // Basic chart rendering fallback
    if (chartData.length === 0) {
        return (
            <div 
                ref={containerRef}
                className="w-full h-full bg-gray-900 flex items-center justify-center text-white"
            >
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
                    <p>Loading chart data...</p>
                </div>
            </div>
        );
    }

    const currentData = chartData[chartData.length - 1];
    const prevData = chartData[chartData.length - 2];
    const priceChange = currentData && prevData ? currentData.close - prevData.close : 0;
    const priceChangePercent = prevData ? (priceChange / prevData.close) * 100 : 0;

    return (
        <div 
            ref={containerRef}
            className="w-full h-full bg-gray-900 relative min-h-[400px]"
        >
            <div className="absolute inset-0 p-4">
                <div className="w-full h-full bg-gray-800 rounded-lg border border-gray-700 p-4">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-white text-lg font-semibold">Basic Chart View</h3>
                        <div className="text-sm text-gray-400">
                            Data Points: {chartData.length}
                        </div>
                    </div>
                    
                    {/* Current Price Panel */}
                    {currentData && (
                        <div className="mb-6 p-4 bg-gray-700 rounded-lg">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-2xl font-bold text-white">
                                        ${currentData.close.toFixed(2)}
                                    </div>
                                    <div className={`text-sm ${priceChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                        {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)} 
                                        ({priceChangePercent >= 0 ? '+' : ''}{priceChangePercent.toFixed(2)}%)
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm text-gray-400">24h Volume</div>
                                    <div className="text-white font-mono">
                                        {(currentData.volume / 1000000).toFixed(2)}M
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* OHLC Info Panel */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        {currentData && (
                            <>
                                <div className="bg-gray-700 p-3 rounded">
                                    <div className="text-xs text-gray-400 mb-1">Open</div>
                                    <div className="text-white font-mono text-lg">
                                        ${currentData.open.toFixed(2)}
                                    </div>
                                </div>
                                <div className="bg-gray-700 p-3 rounded">
                                    <div className="text-xs text-gray-400 mb-1">High</div>
                                    <div className="text-green-400 font-mono text-lg">
                                        ${currentData.high.toFixed(2)}
                                    </div>
                                </div>
                                <div className="bg-gray-700 p-3 rounded">
                                    <div className="text-xs text-gray-400 mb-1">Low</div>
                                    <div className="text-red-400 font-mono text-lg">
                                        ${currentData.low.toFixed(2)}
                                    </div>
                                </div>
                                <div className="bg-gray-700 p-3 rounded">
                                    <div className="text-xs text-gray-400 mb-1">Close</div>
                                    <div className={`font-mono text-lg ${
                                        currentData.close > currentData.open 
                                            ? 'text-green-400' : 'text-red-400'
                                    }`}>
                                        ${currentData.close.toFixed(2)}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Simple chart visualization placeholder */}
                    <div className="bg-gray-900 rounded-lg p-6 text-center">
                        <div className="text-gray-400 mb-4">
                            📊 Basic Chart Display
                        </div>
                        <div className="text-sm text-gray-500">
                            Switch to "Advanced" for full D3-powered candlestick visualization
                        </div>
                        
                        {/* Simple price trend visualization */}
                        <div className="mt-4 h-32 bg-gray-800 rounded flex items-end justify-center space-x-1 px-4">
                            {chartData.slice(-20).map((item, index) => {
                                const height = Math.max(5, (item.close - Math.min(...chartData.slice(-20).map(d => d.close))) / 
                                    (Math.max(...chartData.slice(-20).map(d => d.close)) - Math.min(...chartData.slice(-20).map(d => d.close))) * 100);
                                return (
                                    <div
                                        key={index}
                                        className={`w-2 rounded-t ${item.close > item.open ? 'bg-green-500' : 'bg-red-500'}`}
                                        style={{ height: `${height}%` }}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LightweightChart;
