'use client'

import { ExternalLink, Clock, Users, Target } from 'lucide-react'
import { Problem } from '../data/problems'

interface ProblemCardProps {
  problem: Problem
  onSolve?: (problemId: string) => void
}

export function ProblemCard({ problem, onSolve }: ProblemCardProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'bg-green-100 text-green-800'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'hard':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 hover:border-blue-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-lg font-semibold text-gray-900">{problem.title}</h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(problem.difficulty)}`}>
              {problem.difficulty}
            </span>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Target className="h-4 w-4" />
              <span>{problem.frequency}%</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-3">
            {problem.patterns.map((pattern) => (
              <span 
                key={pattern} 
                className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium"
              >
                {pattern.replace('-', ' ')}
              </span>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-2 mb-3">
            {problem.companies.slice(0, 4).map((company) => (
              <span 
                key={company} 
                className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs flex items-center gap-1"
              >
                <Users className="h-3 w-3" />
                {company}
              </span>
            ))}
            {problem.companies.length > 4 && (
              <span className="text-xs text-gray-500 px-2 py-1">
                +{problem.companies.length - 4} more
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>Time: {problem.timeComplexity}</span>
            </div>
            <span>Space: {problem.spaceComplexity}</span>
          </div>
          
          <div className="flex flex-wrap gap-1">
            {problem.sources.map((source) => (
              <span 
                key={source} 
                className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs font-medium"
              >
                {source}
              </span>
            ))}
          </div>
        </div>
        
        <div className="flex flex-col gap-2 ml-4">
          <a
            href={problem.leetcodeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center gap-2 text-sm"
          >
            <ExternalLink className="h-4 w-4" />
            Solve
          </a>
          {onSolve && (
            <button
              onClick={() => onSolve(problem.id)}
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 text-sm"
            >
              Mark Done
            </button>
          )}
        </div>
      </div>
    </div>
  )
} 