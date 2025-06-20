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
  Panel,
  MarkerType,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { patterns } from '../data/problems';

// Custom Node Component
const PatternNode = ({ data }: { data: any }) => {
  const { pattern, problemCount, onClick } = data;
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return {
          bg: 'bg-gradient-to-br from-green-400 to-green-600',
          border: 'border-green-300',
          text: 'text-white',
          badge: 'bg-green-200 text-green-800'
        };
      case 'Intermediate':
        return {
          bg: 'bg-gradient-to-br from-yellow-400 to-orange-500',
          border: 'border-yellow-300',
          text: 'text-white',
          badge: 'bg-yellow-200 text-yellow-800'
        };
      case 'Advanced':
        return {
          bg: 'bg-gradient-to-br from-red-500 to-pink-600',
          border: 'border-red-300',
          text: 'text-white',
          badge: 'bg-red-200 text-red-800'
        };
      default:
        return {
          bg: 'bg-gradient-to-br from-gray-400 to-gray-600',
          border: 'border-gray-300',
          text: 'text-white',
          badge: 'bg-gray-200 text-gray-800'
        };
    }
  };

  const colors = getDifficultyColor(pattern.difficulty);

  return (
    <div 
      className={`
        ${colors.bg} ${colors.border} ${colors.text}
        border-2 rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300
        w-[280px] h-[180px] cursor-pointer transform hover:scale-105 flex flex-col justify-between
      `}
      onClick={() => onClick(pattern.id)}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${colors.badge}`}>
          {pattern.difficulty}
        </span>
        <div className="text-right">
          <div className="text-sm font-medium opacity-90">{problemCount} problems</div>
          <div className="text-xs opacity-75">{pattern.estimatedHours}h</div>
        </div>
      </div>

      {/* Title */}
      <h3 className="font-bold text-lg mb-2 leading-tight">
        {pattern.name}
      </h3>

      {/* Description */}
      <p className="text-sm opacity-90 leading-relaxed">
        {pattern.description}
      </p>

      {/* Progress indicator (placeholder for future) */}
      <div className="mt-3 bg-white bg-opacity-20 rounded-full h-2">
        <div className="bg-white rounded-full h-2 w-0 transition-all duration-300"></div>
      </div>
    </div>
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
  // Create nodes and edges based on logical progression (like NeetCode)
  const { nodes: initialNodes, edges: initialEdges } = useMemo(() => {
    const nodes: Node[] = [];
    const edges: Edge[] = [];

    // Define learning progression path (similar to NeetCode's roadmap)
    const progressionLevels = [
      // Level 1: Foundation
      {
        level: 1,
        patterns: ['arrays-hashing'],
        y: 100,
        description: 'Foundation'
      },
      // Level 2: Basic Techniques
      {
        level: 2,
        patterns: ['two-pointers', 'sliding-window'],
        y: 300,
        description: 'Basic Techniques'
      },
      // Level 3: Data Structures
      {
        level: 3,
        patterns: ['stack', 'binary-search', 'linked-list'],
        y: 500,
        description: 'Core Data Structures'
      },
      // Level 4: Tree Fundamentals
      {
        level: 4,
        patterns: ['trees'],
        y: 700,
        description: 'Tree Fundamentals'
      },
      // Level 5: Advanced Data Structures
      {
        level: 5,
        patterns: ['tries', 'heap-priority-queue'],
        y: 900,
        description: 'Advanced Data Structures'
      },
      // Level 6: Algorithm Techniques
      {
        level: 6,
        patterns: ['backtracking', 'graphs'],
        y: 1100,
        description: 'Algorithm Techniques'
      },
      // Level 7: Dynamic Programming Foundation
      {
        level: 7,
        patterns: ['1d-dynamic-programming'],
        y: 1300,
        description: 'DP Foundation'
      },
      // Level 8: Advanced Algorithms
      {
        level: 8,
        patterns: ['2d-dynamic-programming', 'greedy', 'intervals'],
        y: 1500,
        description: 'Advanced Algorithms'
      },
      // Level 9: Specialized Topics
      {
        level: 9,
        patterns: ['math-geometry', 'bit-manipulation'],
        y: 1700,
        description: 'Specialized Topics'
      }
    ];

    // Add start node
    nodes.push({
      id: 'start',
      type: 'input',
      position: { x: 400, y: 0 },
      data: { 
        label: (
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-lg text-center font-bold">
            🚀 Start Your Journey
            <div className="text-sm font-normal mt-1">LeetCode Mastery Roadmap</div>
          </div>
        )
      },
      style: { border: 'none', background: 'transparent' }
    });

    // Create nodes for each level
    progressionLevels.forEach((level) => {
      const nodeSpacing = 320;
      const startX = 400 - ((level.patterns.length - 1) * nodeSpacing) / 2;

      level.patterns.forEach((patternId, index) => {
        const pattern = patterns.find(p => p.id === patternId);
        if (!pattern) return;

        const xPosition = startX + (index * nodeSpacing);
        
        nodes.push({
          id: pattern.id,
          type: 'patternNode',
          position: { x: xPosition, y: level.y },
          data: { 
            pattern, 
            problemCount: getPatternProblemCount(pattern.id),
            onClick: onPatternClick 
          },
        });
      });
    });

    // Define progression dependencies (what should be learned before what)
    const dependencies = [
      // Start connects to foundation
      { from: 'start', to: 'arrays-hashing' },
      
      // Foundation to basic techniques
      { from: 'arrays-hashing', to: 'two-pointers' },
      { from: 'arrays-hashing', to: 'sliding-window' },
      
      // Basic techniques to data structures
      { from: 'two-pointers', to: 'stack' },
      { from: 'two-pointers', to: 'binary-search' },
      { from: 'sliding-window', to: 'linked-list' },
      
      // Data structures to trees
      { from: 'stack', to: 'trees' },
      { from: 'binary-search', to: 'trees' },
      { from: 'linked-list', to: 'trees' },
      
      // Trees to advanced data structures
      { from: 'trees', to: 'tries' },
      { from: 'trees', to: 'heap-priority-queue' },
      
      // Advanced data structures to algorithms
      { from: 'tries', to: 'backtracking' },
      { from: 'heap-priority-queue', to: 'graphs' },
      { from: 'trees', to: 'backtracking' }, // Alternative path
      
      // Algorithm techniques to DP
      { from: 'backtracking', to: '1d-dynamic-programming' },
      { from: 'graphs', to: '1d-dynamic-programming' },
      
      // DP foundation to advanced algorithms
      { from: '1d-dynamic-programming', to: '2d-dynamic-programming' },
      { from: '1d-dynamic-programming', to: 'greedy' },
      { from: '1d-dynamic-programming', to: 'intervals' },
      
      // Advanced algorithms to specialized
      { from: '2d-dynamic-programming', to: 'math-geometry' },
      { from: 'greedy', to: 'bit-manipulation' },
      { from: 'intervals', to: 'math-geometry' },
    ];

    // Create edges based on dependencies
    dependencies.forEach(({ from, to }) => {
      edges.push({
        id: `${from}-${to}`,
        source: from,
        target: to,
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

    // Add completion node
    nodes.push({
      id: 'complete',
      type: 'output',
      position: { x: 400, y: 1900 },
      data: { 
        label: (
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4 rounded-lg text-center font-bold">
            🎉 Interview Ready!
            <div className="text-sm font-normal mt-1">Master of Technical Interviews</div>
          </div>
        )
      },
      style: { border: 'none', background: 'transparent' }
    });

    // Connect final patterns to completion
    ['math-geometry', 'bit-manipulation'].forEach(patternId => {
      edges.push({
        id: `${patternId}-complete`,
        source: patternId,
        target: 'complete',
        animated: true,
        style: { 
          stroke: '#10b981', 
          strokeWidth: 2,
        },
                 markerEnd: {
           type: MarkerType.ArrowClosed,
           color: '#10b981',
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
    <div className="w-full h-[800px] bg-gradient-to-br from-slate-50 to-blue-50">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        minZoom={0.3}
        maxZoom={1.5}
        defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
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
              return difficulty === 'Beginner' ? '#10b981' : 
                     difficulty === 'Intermediate' ? '#f59e0b' : '#ef4444';
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
        <Panel position="bottom-center" className="bg-white shadow-lg rounded-lg p-4 border border-gray-200">
          <div className="flex items-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>Progression Flow</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Completion Path</span>
            </div>
            <div className="text-gray-600">
              Follow the arrows for optimal learning progression • Click any pattern to start!
            </div>
          </div>
        </Panel>
      </ReactFlow>
    </div>
  );
} 