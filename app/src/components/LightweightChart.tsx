import { createChart, IChartApi, ISeriesApi, CandlestickData } from 'lightweight-charts';
import React, { useEffect, useRef } from 'react';

interface LightweightChartProps {
    data: CandlestickData[];
}

const LightweightChart: React.FC<LightweightChartProps> = ({ data }) => {
    const chartContainerRef = useRef<HTMLDivElement>(null);
    const chartRef = useRef<IChartApi | null>(null);
    const seriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null);

    useEffect(() => {
        if (!chartContainerRef.current) return;

        chartRef.current = createChart(chartContainerRef.current, {
            width: chartContainerRef.current.clientWidth,
            height: chartContainerRef.current.clientHeight,
            layout: {
                background: { color: '#1E1E1E' },
                textColor: '#F3F4F6',
            },
            grid: {
                vertLines: { color: '#3C3C3C' },
                horzLines: { color: '#3C3C3C' },
            },
        });

        seriesRef.current = chartRef.current.addCandlestickSeries({
            upColor: '#4ADE80',
            downColor: '#F87171',
            borderDownColor: '#F87171',
            borderUpColor: '#4ADE80',
            wickDownColor: '#F87171',
            wickUpColor: '#4ADE80',
        });

        seriesRef.current.setData(data);

        const handleResize = () => {
            if (chartRef.current && chartContainerRef.current) {
                chartRef.current.resize(chartContainerRef.current.clientWidth, chartContainerRef.current.clientHeight);
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (chartRef.current) {
                chartRef.current.remove();
            }
        };
    }, []); // Initial setup only

    useEffect(() => {
        if (seriesRef.current) {
            seriesRef.current.setData(data);
        }
    }, [data]); // Update data when it changes

    // Simulate real-time data
    useEffect(() => {
        const interval = setInterval(() => {
            if (seriesRef.current) {
                const last = data[data.length - 1];
                const next = {
                    ...last,
                    time: (new Date(last.time).getTime() / 1000 + 86400) as any, // Add one day
                    open: last.close,
                    high: last.close * (1 + (Math.random() * 0.02)), // +0-2%
                    low: last.close * (1 - (Math.random() * 0.02)), // -0-2%
                    close: last.close * (1 + (Math.random() * 0.02 - 0.01)), // -1% to +1%
                };
                seriesRef.current.update(next);
                // This is a bit of a hack for the mock data, you'd update your state here
                data.push(next);
            }
        }, 2000); // every 2 seconds

        return () => clearInterval(interval);
    }, [data]);

    return <div ref={chartContainerRef} className="w-full h-full" />;
};

export default LightweightChart;
