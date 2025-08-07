import React from 'react';
import { Handle, Position } from 'reactflow';
import { NodeData } from '../store/relationBuilderStore';

const IndicatorNode = ({ data }: { data: NodeData }) => {
  return (
    <div className="bg-accent-blue p-3 rounded-lg shadow-lg border-2 border-blue-400">
      <div className="text-font font-bold">{data.label}</div>
      <Handle type="source" position={Position.Right} className="w-3 h-3 bg-blue-400" />
      <Handle type="target" position={Position.Left} className="w-3 h-3 bg-blue-400" />
    </div>
  );
};

export default IndicatorNode;
