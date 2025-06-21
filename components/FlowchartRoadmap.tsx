'use client'

import React, { useCallback, useMemo } from 'react';
import {
  ReactFlow,
  Node,
  Edge,
  addEdge,
  Connection,
  useNodesState,
  useEdgesState,
  Controls,
  MiniMap,
  Background,
  BackgroundVariant,
  MarkerType,
  Handle,
  Position,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { patterns } from '../data/problems';

// Custom Node Component with difficulty-based border styling and handles
const PatternNode = ({ data }: { data: any }) => {
  const { pattern, problemCount, onClick } = data;
  
  // Get border color based on difficulty
  const getBorderColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'border-green-500';
      case 'Intermediate': return 'border-yellow-500';
      case 'Advanced': return 'border-red-500';
      default: return 'border-gray-400';
    }
  };

  const borderColor = getBorderColor(pattern.difficulty);

  return (
    <>
      {/* Input Handle - Top */}
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-blue-500 border-2 border-white"
      />
      
      <div 
        className={`
          bg-white ${borderColor} border-4 rounded-xl p-6 shadow-lg hover:shadow-xl 
          transition-all duration-300 cursor-pointer transform hover:scale-105
          w-80 h-52 flex flex-col justify-between relative
        `}
        onClick={() => onClick(pattern.id)}
      >
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-2">{pattern.name}</h3>
          <p className="text-sm text-gray-600 mb-3">{pattern.description}</p>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="text-sm">
            <span className="font-semibold text-blue-600">{problemCount} problems</span>
            <div className="text-xs text-gray-500">{pattern.estimatedHours}h estimated</div>
          </div>
          <div className={`
            px-3 py-1 rounded-full text-xs font-medium
            ${pattern.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' : ''}
            ${pattern.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' : ''}
            ${pattern.difficulty === 'Advanced' ? 'bg-red-100 text-red-700' : ''}
          `}>
            {pattern.difficulty}
          </div>
        </div>
      </div>

      {/* Output Handle - Bottom */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-blue-500 border-2 border-white"
      />
    </>
  );
};

const nodeTypes = {
  patternNode: PatternNode,
};

interface FlowchartRoadmapProps {
  onPatternClick: (patternId: string) => void;
  getPatternProblemCount: (patternId: string) => number;
}

export default function FlowchartRoadmap({ onPatternClick, getPatternProblemCount }: FlowchartRoadmapProps) {
  
  // Define the learning progression with proper positioning
  const { nodes: initialNodes, edges: initialEdges } = useMemo(() => {
    const nodes: Node[] = [];
    const edges: Edge[] = [];

    // Learning progression levels with proper spacing (400px between levels, 500px between nodes)
    const learningPath = [
      // Foundation - Start here
      { 
        id: 'arrays-hashing', 
        position: { x: 600, y: 100 },
        level: 1
      },
      
      // Basic Techniques - Branch from foundation
      { 
        id: 'two-pointers', 
        position: { x: 300, y: 400 },
        level: 2
      },
      { 
        id: 'sliding-window', 
        position: { x: 900, y: 400 },
        level: 2
      },
      
      // Data Structures - Build from basics
      { 
        id: 'stack', 
        position: { x: 100, y: 800 },
        level: 3
      },
      { 
        id: 'binary-search', 
        position: { x: 600, y: 800 },
        level: 3
      },
      { 
        id: 'linked-list', 
        position: { x: 1100, y: 800 },
        level: 3
      },
      
      // Trees - Central concept
      { 
        id: 'trees', 
        position: { x: 600, y: 1200 },
        level: 4
      },
      
      // Advanced Data Structures
      { 
        id: 'tries', 
        position: { x: 350, y: 1600 },
        level: 5
      },
      { 
        id: 'heap-priority-queue', 
        position: { x: 850, y: 1600 },
        level: 5
      },
      
      // Algorithm Techniques
      { 
        id: 'backtracking', 
        position: { x: 300, y: 2000 },
        level: 6
      },
      { 
        id: 'graphs', 
        position: { x: 900, y: 2000 },
        level: 6
      },
      
      // Advanced Graphs
      { 
        id: 'advanced-graphs', 
        position: { x: 900, y: 2400 },
        level: 7
      },
      
      // Dynamic Programming
      { 
        id: '1d-dynamic-programming', 
        position: { x: 600, y: 2800 },
        level: 8
      },
      
      // Advanced Algorithms
      { 
        id: '2d-dynamic-programming', 
        position: { x: 200, y: 3200 },
        level: 9
      },
      { 
        id: 'greedy', 
        position: { x: 600, y: 3200 },
        level: 9
      },
      { 
        id: 'intervals', 
        position: { x: 1000, y: 3200 },
        level: 9
      },
      
      // Specialized Topics
      { 
        id: 'math-geometry', 
        position: { x: 400, y: 3600 },
        level: 10
      },
      { 
        id: 'bit-manipulation', 
        position: { x: 800, y: 3600 },
        level: 10
      },
    ];

    // Create nodes
    learningPath.forEach((item) => {
      const pattern = patterns.find(p => p.id === item.id);
      if (pattern) {
        nodes.push({
          id: pattern.id,
          type: 'patternNode',
          position: item.position,
          data: {
            pattern,
            problemCount: getPatternProblemCount(pattern.id),
            onClick: onPatternClick,
          },
        });
      }
    });

    // Define learning dependencies (prerequisites)
    const dependencies = [
      // Foundation to basics
      { from: 'arrays-hashing', to: 'two-pointers' },
      { from: 'arrays-hashing', to: 'sliding-window' },
      
      // Basics to data structures
      { from: 'two-pointers', to: 'stack' },
      { from: 'two-pointers', to: 'binary-search' },
      { from: 'sliding-window', to: 'linked-list' },
      { from: 'sliding-window', to: 'binary-search' },
      
      // Data structures to trees
      { from: 'stack', to: 'trees' },
      { from: 'binary-search', to: 'trees' },
      { from: 'linked-list', to: 'trees' },
      
      // Trees to advanced structures
      { from: 'trees', to: 'tries' },
      { from: 'trees', to: 'heap-priority-queue' },
      
      // Advanced structures to algorithms
      { from: 'tries', to: 'backtracking' },
      { from: 'heap-priority-queue', to: 'graphs' },
      { from: 'trees', to: 'backtracking' },
      
      // Graphs progression
      { from: 'graphs', to: 'advanced-graphs' },
      
      // To dynamic programming
      { from: 'backtracking', to: '1d-dynamic-programming' },
      { from: 'advanced-graphs', to: '1d-dynamic-programming' },
      
      // DP to advanced algorithms
      { from: '1d-dynamic-programming', to: '2d-dynamic-programming' },
      { from: '1d-dynamic-programming', to: 'greedy' },
      { from: '1d-dynamic-programming', to: 'intervals' },
      
      // Advanced to specialized
      { from: '2d-dynamic-programming', to: 'math-geometry' },
      { from: 'greedy', to: 'bit-manipulation' },
      { from: 'intervals', to: 'math-geometry' },
    ];

    // Create edges with proper styling
    dependencies.forEach(({ from, to }) => {
      edges.push({
        id: `${from}-${to}`,
        source: from,
        target: to,
        type: 'smoothstep',
        animated: true,
        style: {
          stroke: '#3b82f6',
          strokeWidth: 2,
        },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: '#3b82f6',
        },
      });
    });

    return { nodes, edges };
  }, [getPatternProblemCount, onPatternClick]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div className="w-full h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{
          padding: 0.05,
        }}
        minZoom={0.1}
        maxZoom={1.2}
        defaultViewport={{ x: 0, y: 0, zoom: 0.3 }}
      >
        <Controls 
          position="top-left"
          className="bg-white shadow-lg border border-gray-200 rounded-lg"
        />
        <MiniMap 
          position="top-right"
          className="bg-white shadow-lg border border-gray-200 rounded-lg"
          nodeColor={(node) => {
            if (node.type === 'patternNode' && node.data?.pattern) {
              const difficulty = (node.data as any).pattern.difficulty;
              return difficulty === 'Beginner' ? '#22c55e' : 
                     difficulty === 'Intermediate' ? '#eab308' : '#ef4444';
            }
            return '#6366f1';
          }}
        />
        <Background 
          variant={BackgroundVariant.Dots} 
          gap={20} 
          size={1}
          color="#e2e8f0"
        />
      </ReactFlow>
    </div>
  );
} 