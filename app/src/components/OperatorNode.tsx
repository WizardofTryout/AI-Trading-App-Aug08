import React from 'react';
import { Handle, Position } from 'reactflow';
import { NodeData } from '../store/relationBuilderStore';

const OperatorNode = ({ data }: { data: NodeData }) => {
  return (
    <div className="bg-accent-green p-4 rounded-full shadow-lg border-2 border-green-400 w-16 h-16 flex items-center justify-center">
      <div className="text-font font-bold text-2xl">{data.label}</div>
      <Handle type="target" position={Position.Left} className="w-3 h-3 bg-green-400" />
      <Handle type="source" position={Position.Right} className="w-3 h-3 bg-green-400" />
    </div>
  );
};

export default OperatorNode;
