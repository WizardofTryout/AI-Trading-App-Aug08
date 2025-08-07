import React from 'react';
import { Handle, Position } from 'reactflow';

const IndicatorNode = ({ data }: { data: { name: string, value: any } }) => {
  return (
    <div className="bg-accent-blue p-4 rounded-2xl shadow-xl border-2 border-accent-blue">
      <div className="text-font font-bold">{data.name}</div>
      <div className="text-font">{data.value}</div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
};

export default IndicatorNode;
