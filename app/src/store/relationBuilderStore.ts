import { create } from 'zustand';
import { Edge, Node, OnNodesChange, OnEdgesChange, applyNodeChanges, applyEdgeChanges, addEdge, Connection } from 'reactflow';

export interface NodeData {
  label: string;
  [key: string]: any;
}

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

let id = 1;
const getId = () => `node_${id++}`;

export const useRelationBuilderStore = create<RelationBuilderState>((set, get) => ({
  nodes: [],
  edges: [],
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
    const newNode = { ...node, id: getId() };
    set({
      nodes: [...get().nodes, newNode],
    });
  }
}));
