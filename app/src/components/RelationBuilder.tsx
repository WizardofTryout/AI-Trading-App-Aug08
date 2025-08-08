import React, { useState, useRef, useCallback, useMemo } from 'react';
import ReactFlow, { 
  MiniMap, 
  Controls, 
  Background, 
  ReactFlowProvider,
  type OnNodesChange,
  type OnEdgesChange,
  type OnConnect
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useRelationBuilderStore, type RelationNode } from '../store/relationBuilderStore';
import { translateGraphToJSON } from '../services/strategyTranslator';
import Palette from './Palette';
import IndicatorNode from './IndicatorNode';
import OperatorNode from './OperatorNode';
import ValueNode from './ValueNode';

const RelationBuilder: React.FC = () => {
    const { nodes, edges, onNodesChange, onEdgesChange, onConnect, addNode } = useRelationBuilderStore();
    const reactFlowWrapper = useRef<HTMLDivElement>(null);
    const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);

    const nodeTypes = useMemo(() => ({
        indicator: IndicatorNode,
        operator: OperatorNode,
        value: ValueNode,
    }), []);

    const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback(
        (event: React.DragEvent<HTMLDivElement>) => {
            event.preventDefault();

            if (!reactFlowInstance || !reactFlowWrapper.current) return;

            const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
            const a = event.dataTransfer.getData('application/reactflow');
            const { type, data } = JSON.parse(a);

            if (typeof type === 'undefined' || !type) return;

            const position = reactFlowInstance.project({
                x: event.clientX - reactFlowBounds.left,
                y: event.clientY - reactFlowBounds.top,
            });

            addNode({
                id: '',  // Will be set by the store
                type,
                position,
                data: { label: data.operator || data.indicator || data.value.toString(), ...data },
            } as RelationNode);
        },
        [reactFlowInstance, addNode],
    );

    const onSave = () => {
        const strategyJSON = translateGraphToJSON(nodes, edges);
        console.log("Saved Strategy:", JSON.stringify(strategyJSON, null, 2));
        // Here you would call an API to save the strategy
    };

    return (
        <div className="flex flex-col h-full w-full min-h-0">
            <div className="p-2 bg-background border-b border-accent flex justify-end flex-shrink-0">
                <button
                    onClick={onSave}
                    className="bg-accent-blue hover:bg-opacity-80 text-font font-bold py-2 px-3 sm:px-4 rounded-lg text-sm sm:text-base"
                >
                    <span className="hidden sm:inline">Save Strategy</span>
                    <span className="sm:hidden">Save</span>
                </button>
            </div>
            <div className="flex flex-grow min-h-0 overflow-hidden">
                <ReactFlowProvider>
                    <Palette />
                    <div className="flex-1 min-h-0" ref={reactFlowWrapper}>
                        <ReactFlow
                            nodes={nodes}
                            edges={edges}
                            onNodesChange={onNodesChange}
                            onEdgesChange={onEdgesChange}
                            onConnect={onConnect}
                            onInit={setReactFlowInstance}
                            onDrop={onDrop}
                            onDragOver={onDragOver}
                            nodeTypes={nodeTypes}
                            fitView
                        >
                            <Controls />
                            <MiniMap />
                            <Background />
                        </ReactFlow>
                    </div>
                </ReactFlowProvider>
            </div>
        </div>
    );
};

export default RelationBuilder;
