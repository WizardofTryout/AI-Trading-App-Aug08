import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { getStrategies, getIndicators, getTemplates } from '../services/api';

const AccordionSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-accent">
      <button
        className="w-full text-left p-4 hover:bg-accent flex items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-bold text-font">{title}</span>
        {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
      </button>
      {isOpen && <div className="p-4 space-y-2">{children}</div>}
    </div>
  );
};

import { useUIStore } from '../store/uiStore';
import { LayoutDashboard, Waypoints } from 'lucide-react';

const SidebarNavigation: React.FC = () => {
  const { activeView, setView } = useUIStore();

  const navItems = [
    { name: 'Dashboard', view: 'dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Relation Builder', view: 'relation-builder', icon: <Waypoints size={20} /> },
  ];

  return (
    <nav className="bg-background w-64 border-r border-accent p-4 space-y-2">
      {navItems.map((item) => (
        <button
          key={item.name}
          onClick={() => setView(item.view as any)}
          className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left text-font hover:bg-accent ${
            activeView === item.view ? 'bg-accent' : ''
          }`}
        >
          {item.icon}
          <span className="font-semibold">{item.name}</span>
        </button>
      ))}
    </nav>
  );
};

export default SidebarNavigation;
