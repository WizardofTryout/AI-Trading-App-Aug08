import React from 'react';
import { Handle, Position } from 'reactflow';
import { NodeData } from '../store/relationBuilderStore';

const ValueNode = ({ data }: { data: NodeData }) => {
  return (
    <div className="bg-accent-yellow p-3 rounded-lg shadow-lg border-2 border-yellow-400">
      <div className="text-gray-900 font-bold">{data.label}</div>
      <Handle type="source" position={Position.Right} className="w-3 h-3 bg-yellow-400" />
    </div>
  );
};

export default ValueNode;
