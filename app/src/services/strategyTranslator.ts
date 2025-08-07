import { RelationNode, RelationEdge } from '../store/relationBuilderStore';

export const translateGraphToJSON = (nodes: RelationNode[], edges: RelationEdge[]): object => {

    if (nodes.length === 0) {
        return {};
    }

    // This is a simplified translator. A real implementation would need to handle
    // complex graphs, cycles, and multiple start/end points.
    // We assume a simple linear flow from left to right.

    const nodeMap = new Map(nodes.map(node => [node.id, node]));
    const adj = new Map<string, string[]>();
    nodes.forEach(node => adj.set(node.id, []));
    edges.forEach(edge => adj.get(edge.source)?.push(edge.target));

    // Find the root node (a node with no incoming edges)
    const targetNodes = new Set(edges.map(edge => edge.target));
    const rootNodes = nodes.filter(node => !targetNodes.has(node.id));

    if (rootNodes.length !== 1) {
        console.error("Strategy must have exactly one starting node (e.g., an indicator).");
        return { error: "Invalid strategy graph" };
    }

    const buildSubGraph = (nodeId: string): object => {
        const node = nodeMap.get(nodeId);
        if (!node) return {};

        const children = adj.get(nodeId) || [];
        const inputs = children.map(childId => buildSubGraph(childId));

        switch (node.data.type) {
            case 'indicator':
                return {
                    type: 'indicator',
                    name: node.data.indicator,
                    params: node.data.params,
                };
            case 'operator':
                return {
                    type: 'condition',
                    operator: node.data.operator,
                    inputs: inputs,
                };
            case 'value':
                 return {
                    type: 'value',
                    value: node.data.value,
                 };
            default:
                return {};
        }
    };

    // This is a placeholder for the final structure.
    // A real implementation would build a more complex condition tree.
    const entryNode = rootNodes[0];
    const operatorNodeId = adj.get(entryNode.id)?.[0];
    const operatorNode = nodeMap.get(operatorNodeId || '');
    const valueNodeId = adj.get(operatorNodeId || '')?.[0];
    const valueNode = nodeMap.get(valueNodeId || '');

    if (!operatorNode || !valueNode) {
        return { error: "Incomplete strategy" };
    }

    const strategy = {
        condition: {
            type: "operator",
            operator: operatorNode.data.operator,
            inputs: [
                { type: "indicator", name: entryNode.data.indicator, params: entryNode.data.params },
                { type: "value", value: valueNode.data.value }
            ]
        }
    };

    return strategy;
};
