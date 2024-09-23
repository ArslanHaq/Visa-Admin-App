"use client"
import React, { useState, useEffect } from 'react';
import { Handle, Position } from '@xyflow/react';

const CustomNodeComponent = ({ id, data, deleteNode, isMainNode }: any) => {
    const [label, setLabel] = useState(data.label);
    const [heading, setHeading] = useState(data.heading || '');

    useEffect(() => {
        data.label = label;
        if (isMainNode) {
            data.heading = heading;
        }
    }, [label, heading, data, isMainNode]);

    return (
        <div className="px-2 py-4 border border-gray-300 rounded-md bg-logoColorGreen relative flex flex-col items-center text-center">
            {isMainNode && (
                <input
                    type="text"
                    value={heading}
                    onChange={(e) => setHeading(e.target.value)}
                    placeholder="WorkFlow No"
                    className="w-full border-none outline-none font-bold mb-2 text-center bg-transparent text-white"
                />
            )}
            <input
                type="text"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                className="w-full border-none outline-none text-center bg-transparent text-white"
            />
            <button
                onClick={() => deleteNode(id)}
                className="absolute -top-0 right-3  text-white rounded-full text-base font-bold font-sans  flex items-center justify-center cursor-pointer"
            >
                x
            </button>
            <Handle type="target" position={Position.Top} />
            <Handle type="source" position={Position.Bottom} />
        </div>
    );
};

export default CustomNodeComponent;
