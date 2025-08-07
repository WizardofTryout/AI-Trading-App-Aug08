import React from 'react';
import { useUIStore } from '../store/uiStore';

interface Tab {
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
}

const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const { activeTab, setActiveTab } = useUIStore();

  return (
    <div className="h-full flex flex-col bg-background">
      <div className="flex border-b border-accent">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`p-4 text-font ${
              activeTab === index ? 'bg-accent' : 'hover:bg-accent'
            }`}
            onClick={() => setActiveTab(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="flex-1 p-4">{tabs[activeTab].content}</div>
    </div>
  );
};

export default Tabs;
