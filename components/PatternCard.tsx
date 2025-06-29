'use client'

import { Clock, BookOpen, ChevronRight, Code, Target, TrendingUp, Zap } from 'lucide-react'
import { Pattern } from '../data/problems'
import { cn } from '@/lib/utils'
import { Badge, badgeVariants } from './ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from './ui/Progress'
import React from 'react'
import { Button } from './ui/button'

interface PatternCardProps {
  pattern: Pattern
  problemCount: number
  onClick: () => void
}

export function PatternCard({ pattern, problemCount, onClick }: PatternCardProps) {
  const getDifficultyVariant = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner':
        return 'success'
      case 'intermediate':
        return 'warning'
      case 'advanced':
        return 'destructive'
      default:
        return 'outline'
    }
  }

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner':
        return Target
      case 'intermediate':
        return TrendingUp
      case 'advanced':
        return Zap
      default:
        return Code
    }
  }

  const getDifficultyAccent = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner':
        return 'border-l-green-500'
      case 'intermediate':
        return 'border-l-yellow-500'
      case 'advanced':
        return 'border-l-red-500'
      default:
        return 'border-l-gray-300'
    }
  }

  const IconComponent = getDifficultyIcon(pattern.difficulty)

  // Add per-pattern progress
  const [completed, setCompleted] = React.useState<string[]>([])
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        setCompleted(JSON.parse(localStorage.getItem('completedProblems') || '[]'))
      } catch {
        setCompleted([])
      }
    }
  }, [])
  const completedCount = pattern.problems.filter((pid) => completed.includes(pid)).length
  const percent = problemCount === 0 ? 0 : Math.round((completedCount / problemCount) * 100)

  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl group"
      tabIndex={0}
      aria-label={`View problems for ${pattern.name}`}
    >
      <Card 
        className={cn(
          "pattern-card border-l-4 group transition-shadow hover:shadow-lg cursor-pointer",
          getDifficultyAccent(pattern.difficulty)
        )}
      >
        <CardContent className="p-6">
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <IconComponent className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold group-hover:text-primary transition-colors">
                    {pattern.name}
                  </h3>
                  <Badge variant={getDifficultyVariant(pattern.difficulty)} className="mt-1 text-xs">
                    {pattern.difficulty}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
              {pattern.description}
            </p>

            {/* Progress Bar */}
            <div className="mb-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-muted-foreground">Progress</span>
                <span className="text-xs text-muted-foreground">{completedCount} / {problemCount} ({percent}%)</span>
              </div>
              <Progress value={percent} className="h-2 bg-border" />
            </div>

            {/* Stats */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1 text-muted-foreground">
                <BookOpen className="h-4 w-4" />
                <span>{problemCount}</span>
              </div>
              <div className="flex items-center space-x-1 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{pattern.estimatedHours}h</span>
              </div>
            </div>
            <div className="text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
              Start →
            </div>
          </div>
        </CardContent>
      </Card>
    </button>
  )
} 