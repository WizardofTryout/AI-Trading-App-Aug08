import React from 'react';
import { Handle, Position } from 'reactflow';

const OperatorNode = ({ data }: { data: { operation: string } }) => {
  return (
    <div className="bg-accent-green p-4 rounded-2xl shadow-xl border-2 border-accent-green">
      <div className="text-font font-bold text-center">{data.operation}</div>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
};

export default OperatorNode;
