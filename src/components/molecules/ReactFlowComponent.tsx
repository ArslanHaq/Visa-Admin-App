'use client'
import { Colors, WorkflowTypes } from "@/constants/constants";
import { addEdge, Background, BackgroundVariant, Controls, MiniMap, Panel, ReactFlow, SelectionMode, useEdgesState, useNodesState, ReactFlowProvider, useReactFlow } from "@xyflow/react";
import '@xyflow/react/dist/style.css';
import { use, useCallback, useEffect, useState } from "react";
import CustomNodeComponent from "../atoms/CustomNodeComponent";
import { nanoid } from "nanoid";
import ReactFlowButtonComponent from "../atoms/ReactFlowButtonComponent";
import { toast } from "react-toastify";
import { capitalizeFirstLetter } from "@/constants/functions";

interface Props {
    workFlowData: {
        name: string;
        type: string;
        value: string;
    };
    countries: any;
    visaTypes: any;
}

export default function ReactFlowWrapper({ workFlowData, countries, visaTypes }: Props) {
    return (
        <ReactFlowProvider>
            <ReactFlowComponent workFlowData={
                {
                    name: workFlowData.name,
                    type: workFlowData.type,
                    value: workFlowData.value
                }
            }
                countries={countries}
                visaTypes={visaTypes}
            />
        </ReactFlowProvider>
    );
}

function ReactFlowComponent({ workFlowData, countries, visaTypes }: Props) {
    const [type, setType] = useState<string>('');

    useEffect(() => {
        if (workFlowData.type === WorkflowTypes.GENERAL) {
            setType(capitalizeFirstLetter(WorkflowTypes.GENERAL));
            return;
        }
        setType(
            capitalizeFirstLetter(workFlowData.type === WorkflowTypes.COUNTRY
                ? countries.find((country: any) => country.alpha3 === workFlowData.value)?.countryName
                : visaTypes.find((visa: any) => visa.visaType === parseInt(workFlowData.value)).description
            )
        )
    }, [workFlowData]);

    const nodeTypes = {
        textUpdater: (props: any) => <CustomNodeComponent {...props} deleteNode={deleteNode} isMainNode={props.id === 'node-main'} />,
        stakeholder: (props: any) => <CustomNodeComponent {...props} deleteNode={deleteNode} />,
        country: (props: any) => <CustomNodeComponent {...props} deleteNode={deleteNode} />,
        visaType: (props: any) => <CustomNodeComponent {...props} deleteNode={deleteNode} />,
    };

    const [stakeholders, setStakeholders] = useState<any[]>([
        { id: 'stakeholder-1', label: 'Stakeholder 1' },
        { id: 'stakeholder-2', label: 'Stakeholder 2' },
        { id: 'stakeholder-3', label: 'Stakeholder 3' },
    ]);
    const initialNodes = [
        {
            id: 'node-main',
            type: 'stakeholder',
            position: { x: 700, y: 200 },
            data: { label: stakeholders[0].label, previous: [] },
        },
    ];

    const initialEdges: any = [];

    const [nodes, setNodes, onNodesChange] = useNodesState<any>(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [contextMenu, setContextMenu] = useState<any>(null);

    const onConnect = useCallback(
        (params: any) => {
            const { source, target } = params;
            setEdges((eds) => addEdge(params, eds));

        },
        [nodes, setEdges]
    );

    const panOnDrag = [1, 2];

    const addNode = (type: string, position: any, label: string) => {
        setNodes((nds: any) => {
            // Check if a node of the same type already exists, except for stakeholder nodes
            const existingNode = nds.find((node: any) => node.type === type && type !== 'stakeholder');
            if (existingNode) {
                toast.error(`A node of type "${type}" already exists. Only one node of this type is allowed.`);
                return nds; // Return the existing nodes without adding a new one
            }

            const newNode = {
                id: nanoid(),
                type: type,
                position: position,
                data: { label: label },
            };
            const updatedNodes = nds.concat(newNode);

            return updatedNodes;
        });
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
    const onEdgeContextMenu = (event: any, edge: any) => {
        event.preventDefault();
        setContextMenu({ mouseX: event.clientX, mouseY: event.clientY, edge });
    };

    const handleContextMenuClose = () => {
        setContextMenu(null);
    };

    // const verifyNodes = (nodes: any) => {
    //     const initiatorNodes = nodes.filter(node => node.data.previous.length === 0);

    //     if (initiatorNodes.length !== 1) {
    //         throw new Error("There must be exactly one InitiatorNode.");
    //     }

    //     const visitedNodes = new Set();
    //     const nodeStack: any = [];
    //     const visiting = new Set();

    //     const DFS = (nodeId: any) => {
    //         if (visiting.has(nodeId)) return true; // Cycle detected
    //         if (visitedNodes.has(nodeId)) return false; // Already processed

    //         visiting.add(nodeId);
    //         nodeStack.push(nodeId);

    //         const node = nodes.find(n => n.id === nodeId);
    //         for (const prevNodeId of node.data.previous) {
    //             if (!nodes.find(n => n.id === prevNodeId)) {
    //                 throw new Error(`Invalid reference to previous node: ${prevNodeId}`);
    //             }
    //             if (DFS(prevNodeId)) return true; // Cycle detected in recursion
    //         }

    //         visiting.delete(nodeId);
    //         visitedNodes.add(nodeId);
    //         nodeStack.pop();
    //         return false;
    //     };

    //     for (const node of nodes) {
    //         if (DFS(node.id)) {
    //             throw new Error("Cycle detected or invalid node reference.");
    //         }
    //     }

    //     if (nodeStack.length !== 0) {
    //         throw new Error(`Isolated nodes detected: ${nodeStack.join(", ")}`);
    //     }

    //     const finalNodes = nodes.filter(node =>
    //         nodes.every(n => !n.data.previous.includes(node.id))
    //     );

    //     if (finalNodes.length === 0) {
    //         throw new Error("No valid final node detected.");
    //     }

    //     return true;
    // };


    // const logPaths = () => {
    //     const edgeMap = buildEdgeMap();

    //     nodes.forEach(node => {
    //         const paths = [];
    //         findPaths(node.id, edgeMap, [node.id], paths);

    //         paths.forEach(path => console.log('Path:', path.map(id => nodes.find(n => n.id === id)?.data.label).join(' -> ')));
    //     });
    // };
    // const buildEdgeMap = () => {
    //     const edgeMap = new Map();
    //     edges.forEach(edge => {
    //         if (!edgeMap.has(edge.source)) {
    //             edgeMap.set(edge.source, []);
    //         }
    //         edgeMap.get(edge.source).push(edge.target);
    //     });
    //     return edgeMap;
    // };

    // // Recursively find all paths starting from a given node
    // const findPaths = (nodeId, edgeMap, currentPath, paths) => {
    //     if (!edgeMap.has(nodeId)) {
    //         paths.push([...currentPath]);
    //         return;
    //     }

    //     edgeMap.get(nodeId).forEach(targetNodeId => {
    //         currentPath.push(targetNodeId);
    //         findPaths(targetNodeId, edgeMap, currentPath, paths);
    //         currentPath.pop();
    //     });
    // };
    // Function to handle adding workflow configuration
    // const addWorkflowConfig = () => {
    //     const mainNode = nodes.find(node => node.id === 'node-main');
    //     if (!mainNode) {
    //         alert('Main node is missing.');
    //         return;
    //     }

    //     // Find nodes by type
    //     const countryNode = nodes.find(node => node.type === 'country');
    //     const stakeholderNodes = nodes.filter(node => node.type === 'stakeholder');
    //     const visaTypeNode = nodes.find(node => node.type === 'visaType');

    //     // Check if all required nodes exist
    //     if (!countryNode || stakeholderNodes.length === 0 || !visaTypeNode) {
    //         toast.error('All required nodes (country, at least one stakeholder, visaType) must be added.');
    //         return;
    //     }

    //     // Create workflow data
    //     const workflowData = {
    //         workflow_id: mainNode.id,
    //         heading: mainNode.data.heading,
    //         countryName: countryNode.data.label,
    //         stakeholderNames: stakeholderNodes.map(node => node.data.label),
    //         visaType: visaTypeNode.data.label,
    //     };

    //     console.log('Workflow Configuration Data:', workflowData);
    //     toast.success('Workflow configuration submitted successfully.');
    //     // Reset nodes and edges to their initial state
    //     setNodes(initialNodes);
    //     setEdges(initialEdges);
    // };
    const addWorkflowConfig = () => {
        const mainNode = nodes.find(node => node.id === 'node-main');
        if (!mainNode) {
            alert('Main node is missing.');
            return;
        }

        // logPaths();

        // Collect previous nodes for each node to simulate the previous node references
        // const nodesWithPrevious = nodes.map(node => ({
        //     ...node,
        //     data: {
        //         ...node.data,
        //         previous: edges.filter(edge => edge.target === node.id).map(edge => edge.source)
        //     }
        // }));

        // try {
        //     // Perform node validation
        //     if (!verifyNodes(nodesWithPrevious)) return
        //     verifyNodes(nodesWithPrevious);

        //     // Find nodes by type
        //     const countryNode = nodes.find(node => node.type === 'country');
        //     const stakeholderNodes = nodes.filter(node => node.type === 'stakeholder');
        //     const visaTypeNode = nodes.find(node => node.type === 'visaType');

        //     // Check if all required nodes exist
        //     if (!countryNode || stakeholderNodes.length === 0 || !visaTypeNode) {
        //         toast.error('All required nodes (country, at least one stakeholder, visaType) must be added.');
        //         return;
        //     }

        //     // Create workflow data
        //     const workflowData = {
        //         workflow_id: mainNode.id,
        //         heading: mainNode.data.heading,
        //         countryName: countryNode.data.label,
        //         stakeholderNames: stakeholderNodes.map(node => node.data.label),
        //         visaType: visaTypeNode.data.label,
        //     };

        //     console.log('Workflow Configuration Data:', workflowData);
        //     toast.success('Workflow configuration submitted successfully.');
        //     // Reset nodes and edges to their initial state
        //     setNodes(initialNodes);
        //     setEdges(initialEdges);
        // } catch (error: any) {
        //     // Handle validation errors
        //     toast.error(error.message);
        // }
    };


    const onDragStart = (event: any, nodeType: any, label: any) => {
        event.dataTransfer.setData('application/reactflow', JSON.stringify({ nodeType, label }));
        event.dataTransfer.effectAllowed = 'move';
    };

    const onDrop = (event: any) => {
        event.preventDefault();

        const reactFlowBounds = event.currentTarget.getBoundingClientRect();
        const data = JSON.parse(event.dataTransfer.getData('application/reactflow'));

        const position = {
            x: event.clientX - reactFlowBounds.left,
            y: event.clientY - reactFlowBounds.top,
        };

        // addNode(data.nodeType, position, data.label);
        const stakeholderExists = nodes.some(node => node.data.label === data.label);

        if (stakeholderExists) {
            toast.error('This stakeholder is already added.');
        } else {
            addNode(data.nodeType, position, data.label);
        }

    };

    const onDragOver = (event: any) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    };

    return (
        <div className="flex flex-col w-full h-[85svh] relative">
            <div className="absolute z-10 w-[85svw] py-16">
                <div className="mb-4 text-sm flex justify-center gap-x-3">
                    <button
                        className="w-60 flex justify-center py-3 bg-logoColorGreen text-white rounded-lg">
                        <ReactFlowButtonComponent text={type} />
                    </button>
                    <button
                        className="w-60 flex justify-center py-3 bg-logoColorGreen text-white rounded-lg">
                        <ReactFlowButtonComponent text={workFlowData.name} />
                    </button>
                    <button onClick={addWorkflowConfig}
                        className="w-60 flex justify-center py-3 bg-logoColorGreen text-white rounded-lg">
                        <ReactFlowButtonComponent text="Submit Workflow Configuration" />
                    </button>
                </div>
            </div>
            <div className="flex flex-row w-full h-full">
                <div className="flex-grow h-full" onDrop={onDrop} onDragOver={onDragOver}>
                    <ReactFlow
                        nodes={nodes}
                        edges={edges.map((edge) => ({
                            ...edge,
                            onContextMenu: (event: any) => onEdgeContextMenu(event, edge),
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
                        {/* <MiniMap nodeColor={nodeColor} nodeStrokeWidth={3} zoomable pannable /> */}
                        <Background variant={BackgroundVariant.Dots} gap={20} size={2} bgColor={Colors.PRIMARYBLUE} />
                        <Panel position="top-center">
                            <div>
                                <p className="text-base font-serif font-bold text-white">
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
                <div className="w-1/6 h-full p-4 bg-logoColorBlue overflow-y-auto">
                    <h3 className="mb-4 text-lg font-serif text-white font-bold">Stakeholders List</h3>
                    {stakeholders.map((stakeholder: any) => (
                        <div
                            key={stakeholder.id}
                            className="p-3 bg-logoColorGreen text-sm font-sans text-white rounded-xl mb-2 cursor-pointer"
                            onDragStart={(event) => onDragStart(event, 'stakeholder', stakeholder.label)}
                            draggable
                        >
                            <p className="text-sm font-semibold flex items-center gap-x-2">
                                {stakeholder.label}
                            </p>

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
