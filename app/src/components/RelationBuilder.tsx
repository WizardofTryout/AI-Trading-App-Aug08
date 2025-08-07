import React, { useState, useRef, useCallback, useMemo } from 'react';
import ReactFlow, { MiniMap, Controls, Background, OnConnect, ReactFlowProvider } from 'reactflow';
import 'reactflow/dist/style.css';
import { useRelationBuilderStore } from '../store/relationBuilderStore';
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
                type,
                position,
                data: { label: data.operator || data.indicator || data.value.toString(), ...data },
            });
        },
        [reactFlowInstance, addNode],
    );

import { translateGraphToJSON } from '../services/strategyTranslator';

// ... (rest of the component is the same)

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
                type,
                position,
                data: { label: data.operator || data.indicator || data.value.toString(), ...data },
            });
        },
        [reactFlowInstance, addNode],
    );

    const onSave = () => {
        const strategyJSON = translateGraphToJSON(nodes, edges);
        console.log("Saved Strategy:", JSON.stringify(strategyJSON, null, 2));
        // Here you would call an API to save the strategy
    };

    return (
        <div className="flex flex-col h-full w-full">
            <div className="p-2 bg-background border-b border-accent flex justify-end">
                <button
                    onClick={onSave}
                    className="bg-accent-blue hover:bg-opacity-80 text-font font-bold py-2 px-4 rounded-lg"
                >
                    Save Strategy
                </button>
            </div>
            <div className="flex flex-grow">
                <ReactFlowProvider>
                    <Palette />
                    <div className="flex-1" ref={reactFlowWrapper}>
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
};

export default RelationBuilder;
