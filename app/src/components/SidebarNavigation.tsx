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

const SidebarNavigation: React.FC = () => {
  const [strategies, setStrategies] = useState<{ id: string; name: string }[]>([]);
  const [indicators, setIndicators] = useState<{ id: string; name: string }[]>([]);
  const [templates, setTemplates] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    getStrategies().then(setStrategies);
    getIndicators().then(setIndicators);
    getTemplates().then(setTemplates);
  }, []);

  return (
    <div className="bg-background w-64 border-r border-accent">
      <AccordionSection title="Strategies">
        {strategies.map((strategy) => (
          <p key={strategy.id} className="text-font">{strategy.name}</p>
        ))}
      </AccordionSection>
      <AccordionSection title="Indicators">
        {indicators.map((indicator) => (
          <p key={indicator.id} className="text-font">{indicator.name}</p>
        ))}
      </AccordionSection>
      <AccordionSection title="Templates">
        {templates.map((template) => (
          <p key={template.id} className="text-font">{template.name}</p>
        ))}
      </AccordionSection>
    </div>
  );
};

export default SidebarNavigation;
