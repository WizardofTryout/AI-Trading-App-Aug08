import React from 'react';

const DraggableNode = ({ nodeType, label, nodeData }: { nodeType: string; label: string, nodeData: object }) => {
  const onDragStart = (event: React.DragEvent<HTMLDivElement>, type: string) => {
    const data = JSON.stringify({ type, data: nodeData });
    event.dataTransfer.setData('application/reactflow', data);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className="p-2 sm:p-4 border border-accent rounded-lg cursor-move bg-gray-800 hover:bg-gray-700 text-center text-font text-sm sm:text-base"
      onDragStart={(event) => onDragStart(event, nodeType)}
      draggable
    >
      {label}
    </div>
  );
};

const Palette: React.FC = () => {
  return (
    <aside className="w-48 lg:w-64 bg-background p-2 sm:p-4 space-y-2 sm:space-y-4 border-r border-accent flex-shrink-0 overflow-y-auto">
      <h2 className="text-lg sm:text-xl font-bold text-font">Nodes</h2>
      <DraggableNode nodeType="indicator" label="RSI" nodeData={{ indicator: 'rsi', params: { period: 14 } }} />
      <DraggableNode nodeType="indicator" label="MACD" nodeData={{ indicator: 'macd', params: { fast: 12, slow: 26, signal: 9 } }} />
      <DraggableNode nodeType="operator" label=">" nodeData={{ operator: '>' }} />
      <DraggableNode nodeType="operator" label="<" nodeData={{ operator: '<' }} />
      <DraggableNode nodeType="value" label="Number Value" nodeData={{ value: 70 }} />
    </aside>
  );
};

export default Palette;
