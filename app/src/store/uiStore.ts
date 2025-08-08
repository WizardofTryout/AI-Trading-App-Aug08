import { create } from 'zustand';

type View = 'dashboard' | 'relation-builder' | 'pine-script';

type UIState = {
  activeView: View;
  isSidebarOpen: boolean;
  isDarkMode: boolean;
  isSettingsOpen: boolean;
  isTradeHistoryOpen: boolean;
  isAgentRunning: boolean;
  activeStrategyId: string | null;
  activeTradingPairs: string[];
  activeDashboardTab: number;
  setView: (view: View) => void;
  toggleSidebar: () => void;
  toggleDarkMode: () => void;
  toggleSettings: () => void;
  toggleTradeHistory: () => void;
  toggleAgent: () => void;
  setActiveStrategyId: (id: string | null) => void;
  addTradingPair: (pair: string) => void;
  removeTradingPair: (pair: string) => void;
  setActiveDashboardTab: (tab: number) => void;
};

export const useUIStore = create<UIState>((set) => ({
  activeView: 'dashboard',
  isSidebarOpen: true,
  isDarkMode: true,
  isSettingsOpen: false,
  isTradeHistoryOpen: false,
  isAgentRunning: false,
  activeStrategyId: null,
  activeTradingPairs: ['BTC/USDT'],
  activeDashboardTab: 0,
  setView: (view) => set({ activeView: view }),
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  toggleSettings: () => set((state) => ({ isSettingsOpen: !state.isSettingsOpen })),
  toggleTradeHistory: () => set((state) => ({ isTradeHistoryOpen: !state.isTradeHistoryOpen })),
  toggleAgent: () => set((state) => ({ isAgentRunning: !state.isAgentRunning })),
  setActiveStrategyId: (id) => set({ activeStrategyId: id }),
  addTradingPair: (pair) => set((state) => ({ activeTradingPairs: [...state.activeTradingPairs, pair] })),
  removeTradingPair: (pair) => set((state) => ({ activeTradingPairs: state.activeTradingPairs.filter((p) => p !== pair) })),
  setActiveDashboardTab: (tab) => set({ activeDashboardTab: tab }),
}));
