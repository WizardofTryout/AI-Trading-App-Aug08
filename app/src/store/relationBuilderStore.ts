import { create } from 'zustand';
import type { 
  Node, 
  Edge, 
  NodeChange as ReactFlowNodeChange, 
  EdgeChange as ReactFlowEdgeChange, 
  Connection 
} from 'reactflow';

// Define our own interfaces to avoid ReactFlow dependency issues
export interface NodeData {
  label: string;
  type?: string;
  indicator?: string;
  operator?: string;
  value?: any;
  params?: any;
  [key: string]: any;
}

export interface RelationNode extends Node {
  data: NodeData;
}

export interface RelationEdge extends Edge {
}

export interface NodeChange {
  id: string;
  type: string;
  [key: string]: any;
}

export interface EdgeChange {
  id: string;
  type: string;
  [key: string]: any;
}

type RelationBuilderState = {
  nodes: RelationNode[];
  edges: RelationEdge[];
  onNodesChange: (changes: ReactFlowNodeChange[]) => void;
  onEdgesChange: (changes: ReactFlowEdgeChange[]) => void;
  onConnect: (params: Connection) => void;
  addNode: (node: RelationNode) => void;
};

let id = 1;
const getId = () => `node_${id++}`;

export const useRelationBuilderStore = create<RelationBuilderState>((set: any, get: any) => ({
  nodes: [],
  edges: [],
  onNodesChange: (_changes: ReactFlowNodeChange[]) => {
    // Simplified node change handling
    set({ nodes: get().nodes });
  },
  onEdgesChange: (_changes: ReactFlowEdgeChange[]) => {
    // Simplified edge change handling  
    set({ edges: get().edges });
  },
  onConnect: (params: Connection) => {
    const newEdge: RelationEdge = {
      id: `edge_${Date.now()}`,
      source: params.source!,
      target: params.target!,
      type: 'default'
    };
    set({
      edges: [...get().edges, newEdge],
    });
  },
  addNode: (node: RelationNode) => {
    const newNode = { ...node, id: getId() };
    set({
      nodes: [...get().nodes, newNode],
    });
  }
}));
