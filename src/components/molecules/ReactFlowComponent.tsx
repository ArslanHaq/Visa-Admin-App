'use client'
import { Colors } from "@/constants/constants";
import { addEdge, Background, BackgroundVariant, Controls, MiniMap, Panel, ReactFlow, SelectionMode, useEdgesState, useNodesState, ReactFlowProvider, useReactFlow } from "@xyflow/react";
import '@xyflow/react/dist/style.css';
import { useCallback, useState } from "react";
import CustomNodeComponent from "../atoms/CustomNodeComponent";
import { nanoid } from "nanoid";

export default function ReactFlowWrapper() {
    return (
        <ReactFlowProvider>
            <ReactFlowComponent />
        </ReactFlowProvider>
    );
}

function ReactFlowComponent() {
    const nodeTypes = {
        textUpdater: (props: any) => <CustomNodeComponent {...props} deleteNode={deleteNode} isMainNode={props.id === 'node-main'} />,
        stakeholder: (props: any) => <CustomNodeComponent {...props} deleteNode={deleteNode} />,
        country: (props: any) => <CustomNodeComponent {...props} deleteNode={deleteNode} />,
        visaType: (props: any) => <CustomNodeComponent {...props} deleteNode={deleteNode} />,
    };

    const stakeholders: any = [
        { id: 'stakeholder-1', label: 'Stakeholder 1' },
        { id: 'stakeholder-2', label: 'Stakeholder 2' },
        { id: 'stakeholder-3', label: 'Stakeholder 3' },
    ];
    const initialNodes = [
        {
            id: 'node-main',
            type: 'textUpdater',
            position: { x: 100, y: 100 },
            data: { label: 'Main Node', heading: 'WorkFlow 1' },
        },
    ];

    const initialEdges: any = [];

    const [nodes, setNodes, onNodesChange] = useNodesState<any>(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const { getNodes, getEdges } = useReactFlow();
    const [contextMenu, setContextMenu] = useState(null);

    const onConnect = useCallback(
        (params: any) => {
            const { source, target } = params;
            const sourceNode = nodes.find(node => node.id === source);
            const targetNode = nodes.find(node => node.id === target);

            // Allow connection only if the source or target is the main node
            if (sourceNode?.id === 'node-main' || targetNode?.id === 'node-main') {
                setEdges((eds) => addEdge(params, eds));
            } else {
                alert('Connections between child nodes are not allowed.');
            }
        },
        [nodes, setEdges]
    );

    const panOnDrag = [1, 2];
    const nodeColor = (node) => {
        switch (node.type) {
            case 'stakeholder':
                return '#6ede87';
            case 'country':
                return '#6865A5';
            case 'visaType':
                return '#ff0072';
            default:
                return '#d3d3d3';
        }
    };

    // Function to add a new node
    const addNode = (type: string, position: any, label: string) => {
        const newNode = {
            id: nanoid(),
            type: type,
            position: position,
            data: { label: label },
        };

        setNodes((nds) => nds.concat(newNode));
    };

    // Function to delete a node
    const deleteNode = (id: string) => {
        setNodes((nds) => nds.filter((node) => node.id !== id));
        setEdges((eds) => eds.filter((edge) => edge.source !== id && edge.target !== id));
    };

    // Function to delete an edge
    const deleteEdge = (id: string) => {
        setEdges((eds) => eds.filter((edge) => edge.id !== id));
    };

    // Function to handle right-click on edge
    const onEdgeContextMenu = (event, edge) => {
        event.preventDefault();
        setContextMenu({ mouseX: event.clientX, mouseY: event.clientY, edge });
    };

    const handleContextMenuClose = () => {
        setContextMenu(null);
    };

    // Function to handle adding workflow configuration
    const addWorkflowConfig = () => {
        const mainNode = nodes.find(node => node.id === 'node-main');
        if (!mainNode) {
            alert('Main node is missing.');
            return;
        }

        // Find nodes by type
        const countryNode = nodes.find(node => node.type === 'country');
        const stakeholderNodes = nodes.filter(node => node.type === 'stakeholder');
        const visaTypeNode = nodes.find(node => node.type === 'visaType');

        // Check if all required nodes exist
        if (!countryNode || stakeholderNodes.length === 0 || !visaTypeNode) {
            alert('All required nodes (country, at least one stakeholder, visaType) must be added.');
            return;
        }

        // Create workflow data
        const workflowData = {
            workflow_id: mainNode.id,
            heading: mainNode.data.heading,
            countryName: countryNode.data.label,
            stakeholderNames: stakeholderNodes.map(node => node.data.label),
            visaType: visaTypeNode.data.label,
        };

        console.log('Workflow Configuration Data:', workflowData);
    };

    const onDragStart = (event, nodeType, label) => {
        event.dataTransfer.setData('application/reactflow', JSON.stringify({ nodeType, label }));
        event.dataTransfer.effectAllowed = 'move';
    };

    const onDrop = (event) => {
        event.preventDefault();

        const reactFlowBounds = event.currentTarget.getBoundingClientRect();
        const data = JSON.parse(event.dataTransfer.getData('application/reactflow'));

        const position = {
            x: event.clientX - reactFlowBounds.left,
            y: event.clientY - reactFlowBounds.top,
        };

        addNode(data.nodeType, position, data.label);
    };

    const onDragOver = (event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    };

    return (
        <div className="flex flex-col w-full h-[85svh]">
            <div className="mb-4 text-sm flex justify-center">
                <button onClick={() => addNode('country', { x: 0, y: 0 }, 'Country Node')} className="mr-2 p-2 bg-green-500 text-white rounded-xl px-3 py-2">Add Country Node</button>
                <button onClick={() => addNode('visaType', { x: 0, y: 0 }, 'Visa Type Node')} className="p-2 bg-red-500 text-white rounded-xl px-3 py-2">Add Visa Type Node</button>
                <button onClick={addWorkflowConfig} className="ml-2 bg-purple-500 text-white rounded-xl px-4 py-2">Add Workflow Configuration</button>
            </div>
            <div className="flex flex-row w-full h-full">
                <div className="flex-grow h-full" onDrop={onDrop} onDragOver={onDragOver}>
                    <ReactFlow
                        nodes={nodes}
                        edges={edges.map((edge) => ({
                            ...edge,
                            onContextMenu: (event) => onEdgeContextMenu(event, edge),
                        }))}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        nodeTypes={nodeTypes}
                        onConnect={onConnect}
                        style={rfStyle}
                        panOnScroll
                        selectionOnDrag
                        panOnDrag={panOnDrag}
                        selectionMode={SelectionMode.Partial}
                    >
                        <Controls />
                        <MiniMap nodeColor={nodeColor} nodeStrokeWidth={3} zoomable pannable />
                        <Background variant={BackgroundVariant.Cross} gap={12} size={1} bgColor={Colors.PRIMARYSLATE} />
                        <Panel position="top-left">
                            <div>
                                <p className="text-base font-serif font-bold text-logoColorBlue">
                                    WorkFlow Panel
                                </p>
                            </div>
                        </Panel>
                    </ReactFlow>
                    {contextMenu && (
                        <div
                            style={{
                                position: 'absolute',
                                top: contextMenu.mouseY,
                                left: contextMenu.mouseX,
                                backgroundColor: 'white',
                                boxShadow: '0px 0px 5px rgba(0,0,0,0.5)',
                                borderRadius: '5px',
                                zIndex: 10,
                            }}
                            onMouseLeave={handleContextMenuClose}
                        >
                            <div
                                style={{
                                    padding: '10px',
                                    cursor: 'pointer',
                                }}
                                onClick={() => {
                                    deleteEdge(contextMenu.edge.id);
                                    handleContextMenuClose();
                                }}
                            >
                                Delete Edge
                            </div>
                        </div>
                    )}
                </div>
                <div className="w-1/6 h-full p-4 bg-[#718096] overflow-y-auto">
                    <h3 className="mb-4 text-lg font-serif text-logoColorBlue font-bold">Stakeholders List</h3>
                    {stakeholders.map((stakeholder) => (
                        <div
                            key={stakeholder.id}
                            className="p-3 bg-logoColorGreen text-sm font-sans text-white rounded-xl mb-2 cursor-pointer"
                            onDragStart={(event) => onDragStart(event, 'stakeholder', stakeholder.label)}
                            draggable
                        >
                            {stakeholder.label}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

const rfStyle = {
    backgroundColor: '#B8CEFF',
};
