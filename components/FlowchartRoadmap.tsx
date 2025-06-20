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
        min-w-[250px] max-w-[300px] cursor-pointer transform hover:scale-105
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
  // Create nodes and edges based on patterns
  const { nodes: initialNodes, edges: initialEdges } = useMemo(() => {
    const nodes: Node[] = [];
    const edges: Edge[] = [];

    // Group patterns by difficulty
    const beginnerPatterns = patterns.filter(p => p.difficulty === 'Beginner');
    const intermediatePatterns = patterns.filter(p => p.difficulty === 'Intermediate');
    const advancedPatterns = patterns.filter(p => p.difficulty === 'Advanced');

    let yOffset = 0;
    const levelSpacing = 400;
    const nodeSpacing = 350;

    // Add start node
    nodes.push({
      id: 'start',
      type: 'input',
      position: { x: 400, y: yOffset },
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

    yOffset += levelSpacing;

    // Beginner level
    beginnerPatterns.forEach((pattern, index) => {
      const xOffset = (index - (beginnerPatterns.length - 1) / 2) * nodeSpacing;
      nodes.push({
        id: pattern.id,
        type: 'patternNode',
        position: { x: 400 + xOffset, y: yOffset },
        data: { 
          pattern, 
          problemCount: getPatternProblemCount(pattern.id),
          onClick: onPatternClick 
        },
      });

      // Connect start to beginner patterns
      edges.push({
        id: `start-${pattern.id}`,
        source: 'start',
        target: pattern.id,
        animated: true,
        style: { stroke: '#10b981', strokeWidth: 2 },
      });
    });

    yOffset += levelSpacing;

    // Intermediate level
    intermediatePatterns.forEach((pattern, index) => {
      const xOffset = (index - (intermediatePatterns.length - 1) / 2) * nodeSpacing;
      nodes.push({
        id: pattern.id,
        type: 'patternNode',
        position: { x: 400 + xOffset, y: yOffset },
        data: { 
          pattern, 
          problemCount: getPatternProblemCount(pattern.id),
          onClick: onPatternClick 
        },
      });

      // Connect some beginner patterns to intermediate
      if (index < beginnerPatterns.length) {
        edges.push({
          id: `${beginnerPatterns[index]?.id}-${pattern.id}`,
          source: beginnerPatterns[index]?.id || beginnerPatterns[0].id,
          target: pattern.id,
          animated: true,
          style: { stroke: '#f59e0b', strokeWidth: 2 },
        });
      }
    });

    yOffset += levelSpacing;

    // Advanced level
    advancedPatterns.forEach((pattern, index) => {
      const xOffset = (index - (advancedPatterns.length - 1) / 2) * nodeSpacing;
      nodes.push({
        id: pattern.id,
        type: 'patternNode',
        position: { x: 400 + xOffset, y: yOffset },
        data: { 
          pattern, 
          problemCount: getPatternProblemCount(pattern.id),
          onClick: onPatternClick 
        },
      });

      // Connect intermediate patterns to advanced
      if (index < intermediatePatterns.length) {
        edges.push({
          id: `${intermediatePatterns[index]?.id}-${pattern.id}`,
          source: intermediatePatterns[index]?.id || intermediatePatterns[0].id,
          target: pattern.id,
          animated: true,
          style: { stroke: '#ef4444', strokeWidth: 2 },
        });
      }
    });

    // Add completion node
    yOffset += levelSpacing;
    nodes.push({
      id: 'complete',
      type: 'output',
      position: { x: 400, y: yOffset },
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

    // Connect some advanced patterns to completion
    advancedPatterns.slice(0, 3).forEach(pattern => {
      edges.push({
        id: `${pattern.id}-complete`,
        source: pattern.id,
        target: 'complete',
        animated: true,
        style: { stroke: '#10b981', strokeWidth: 2 },
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
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Beginner</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span>Intermediate</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span>Advanced</span>
            </div>
            <div className="text-gray-600">
              Click any pattern to start practicing!
            </div>
          </div>
        </Panel>
      </ReactFlow>
    </div>
  );
} 