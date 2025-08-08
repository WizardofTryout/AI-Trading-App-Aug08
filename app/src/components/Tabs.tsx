import React from 'react';

interface Tab {
  label: React.ReactNode;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: number;
  setActiveTab: (index: number) => void;
}

const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="h-full flex flex-col bg-background">
      <div className="flex border-b border-accent overflow-x-auto">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`p-3 sm:p-4 text-font text-sm sm:text-base whitespace-nowrap flex-shrink-0 ${
              activeTab === index ? 'bg-accent' : 'hover:bg-gray-700'
            }`}
            onClick={() => setActiveTab(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="flex-1 h-full overflow-hidden">{tabs[activeTab]?.content}</div>
    </div>
  );
};

export default Tabs;
