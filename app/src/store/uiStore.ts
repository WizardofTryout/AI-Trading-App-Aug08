import { create } from 'zustand';

type UIState = {
  activeTab: number;
  isSidebarOpen: boolean;
  isDarkMode: boolean;
  isSettingsOpen: boolean;
  isTradeHistoryOpen: boolean;
  isAgentRunning: boolean;
  activeStrategyId: string | null;
  activeTradingPairs: string[];
  setActiveTab: (tab: number) => void;
  toggleSidebar: () => void;
  toggleDarkMode: () => void;
  toggleSettings: () => void;
  toggleTradeHistory: () => void;
  toggleAgent: () => void;
  setActiveStrategyId: (id: string | null) => void;
  addTradingPair: (pair: string) => void;
  removeTradingPair: (pair: string) => void;
};

export const useUIStore = create<UIState>((set) => ({
  activeTab: 0,
  isSidebarOpen: true,
  isDarkMode: true,
  isSettingsOpen: false,
  isTradeHistoryOpen: false,
  isAgentRunning: false,
  activeStrategyId: null,
  activeTradingPairs: ['BTC/USDT'],
  setActiveTab: (tab) => set({ activeTab: tab }),
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  toggleSettings: () => set((state) => ({ isSettingsOpen: !state.isSettingsOpen })),
  toggleTradeHistory: () => set((state) => ({ isTradeHistoryOpen: !state.isTradeHistoryOpen })),
  toggleAgent: () => set((state) => ({ isAgentRunning: !state.isAgentRunning })),
  setActiveStrategyId: (id) => set({ activeStrategyId: id }),
  addTradingPair: (pair) => set((state) => ({ activeTradingPairs: [...state.activeTradingPairs, pair] })),
  removeTradingPair: (pair) => set((state) => ({ activeTradingPairs: state.activeTradingPairs.filter((p) => p !== pair) })),
}));
