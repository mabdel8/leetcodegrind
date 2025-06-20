'use client'

import { Clock, BookOpen, Target, ChevronRight } from 'lucide-react'
import { Pattern } from '../data/problems'

interface PatternCardProps {
  pattern: Pattern
  index: number
  onStart?: (patternId: string) => void
}

export function PatternCard({ pattern, index, onStart }: PatternCardProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'advanced':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner':
        return '🟢'
      case 'intermediate':
        return '🟡'
      case 'advanced':
        return '🔴'
      default:
        return '⚪'
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 hover:border-blue-300">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold">
              {index + 1}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">{pattern.name}</h3>
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getDifficultyColor(pattern.difficulty)}`}>
                {getDifficultyIcon(pattern.difficulty)} {pattern.difficulty}
              </span>
            </div>
          </div>
          
          <p className="text-gray-600 mb-4 leading-relaxed">{pattern.description}</p>
          
          <div className="flex items-center gap-6 text-sm text-gray-500 mb-4">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span>{pattern.problems.length} problems</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>~{pattern.estimatedHours} hours</span>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-xs text-gray-500 mb-1">Sample Problems:</div>
            <div className="flex flex-wrap gap-1">
              {pattern.problems.slice(0, 3).map((problemId) => (
                <span 
                  key={problemId} 
                  className="bg-white text-gray-700 px-2 py-1 rounded text-xs border"
                >
                  {problemId.replace('-', ' ')}
                </span>
              ))}
              {pattern.problems.length > 3 && (
                <span className="text-xs text-gray-500 px-2 py-1">
                  +{pattern.problems.length - 3} more
                </span>
              )}
            </div>
          </div>
        </div>
        
        <div className="ml-6">
          <button
            onClick={() => onStart?.(pattern.id)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg"
          >
            <Target className="h-4 w-4" />
            <span>Start Pattern</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
} 