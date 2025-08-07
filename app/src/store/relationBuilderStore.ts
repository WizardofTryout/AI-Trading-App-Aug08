import { create } from 'zustand';
import { Edge, Node, OnNodesChange, OnEdgesChange, applyNodeChanges, applyEdgeChanges, addEdge, Connection } from 'reactflow';

export interface IndicatorNodeData {
  name: string;
  type: string;
  value: any;
}

export interface OperatorNodeData {
  operation: string;
  inputs: string[];
}

export type NodeData = IndicatorNodeData | OperatorNodeData;

export type RelationNode = Node<NodeData>;
export type RelationEdge = Edge;

type RelationBuilderState = {
  nodes: RelationNode[];
  edges: RelationEdge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: (params: Connection | Edge) => void;
  addNode: (node: RelationNode) => void;
};

export const useRelationBuilderStore = create<RelationBuilderState>((set, get) => ({
  nodes: [
    { id: '1', position: { x: 0, y: 0 }, data: { name: 'RSI', type: 'indicator', value: 14 } },
    { id: '2', position: { x: 0, y: 100 }, data: { operation: '>', inputs: [] } },
  ],
  edges: [{ id: 'e1-2', source: '1', target: '2' }],
  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (params) => {
    set({
      edges: addEdge(params, get().edges),
    });
  },
  addNode: (node) => {
    set({
      nodes: [...get().nodes, node],
    });
  }
}));
