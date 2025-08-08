// API service - all data through backend
import { parse } from '../pine-script-engine/parser';
import { interpret } from '../pine-script-engine/interpreter';

// Backend API base URL
const API_BASE = 'http://localhost:8000';

export interface Settings {
  bitgetApiKey: string;
  binanceApiKey: string;
  aiApiKey: string;
  ollamaUrl: string;
  investmentPerTrade: number;
  riskRewardRatio: string;
  stopLoss: number;
  takeProfit: number;
  tradeDirection: 'Long' | 'Short' | 'Both';
  leverage: number;
}

export interface Trade {
  id: number;
  pair: string;
  side: 'long' | 'short';
  amount: number;
  entryPrice: number;
  exitPrice?: number;
  pnl?: number;
  startTime: number;
  endTime?: number;
  leverage: number;
  fees?: number;
}

export interface TradeInfo {
  pnl: number;
  pendingOrders: { id: string; side: 'buy' | 'sell'; amount: number; price: number }[];
  openPositions: { id: string; side: 'long' | 'short'; amount: number; entryPrice: number }[];
}

export const getStrategies = async () => {
  return [
    { id: '1', name: 'RSI Momentum' },
    { id: '2', name: 'MACD Crossover' },
  ];
};

export const getIndicators = async () => {
  return [
    { id: '1', name: 'RSI' },
    { id: '2', name: 'MACD' },
  ];
};

export const getTemplates = async () => {
  return [
    { id: '1', name: 'Basic Template' },
    { id: '2', 'name': 'Advanced Template' },
  ];
};

export const uploadPineScript = async (file: File) => {
  const code = await file.text();
  const ast = parse(code);
  // In a real app, you would store the parsed AST or the compiled code.
  console.log('Uploaded and parsed Pine Script:', ast);
  return { success: true };
};

const API_URL = "http://localhost:8000";

export const getSettings = async (): Promise<Settings> => {
    const response = await fetch(`${API_URL}/settings`);
    if (!response.ok) {
        throw new Error("Failed to fetch settings");
    }
    return response.json();
};

export const saveSettings = async (settings: Settings) => {
    const response = await fetch(`${API_URL}/settings`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
    });
    if (!response.ok) {
        throw new Error("Failed to save settings");
    }
    return response.json();
};

export const getTradingPairs = async () => {
  return ['BTC/USDT', 'ETH/USDT', 'SOL/USDT'];
};

export const getTradeInfo = async (pair: string): Promise<TradeInfo> => {
  // Mock data
  return {
    pnl: Math.random() * 200 - 100,
    pendingOrders: [
      { id: '1', side: 'buy', amount: 0.1, price: 60000 },
    ],
    openPositions: [
      { id: '1', side: 'long', amount: 0.2, entryPrice: 59000 },
    ],
  };
};

export const closeTrade = async (positionId: string) => {
  console.log('Closing trade:', positionId);
  return { success: true };
};

export const modifyStrategy = async (pair: string) => {
  console.log('Modifying strategy for:', pair);
  return { success: true };
};

export const getTradeHistory = async (): Promise<Trade[]> => {
  try {
    const response = await fetch(`${API_BASE}/trades/`);
    if (!response.ok) throw new Error('Failed to fetch trades');
    return await response.json();
  } catch (error) {
    console.error('Error fetching trade history:', error);
    return [];
  }
};

export const addTrade = async (trade: Omit<Trade, 'id'>) => {
  try {
    const response = await fetch(`${API_BASE}/trades/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(trade)
    });
    if (!response.ok) throw new Error('Failed to add trade');
    return await response.json();
  } catch (error) {
    console.error('Error adding trade:', error);
    throw error;
  }
};

export const runStrategy = async (strategy: string, data: any) => {
  const ast = parse(strategy);
  const result = interpret(ast, data);
  return result;
};
