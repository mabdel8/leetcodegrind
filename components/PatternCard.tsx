'use client'

import { Clock, BookOpen, ChevronRight, Code, Target, TrendingUp, Zap } from 'lucide-react'
import { Pattern } from '../data/problems'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'

interface PatternCardProps {
  pattern: Pattern
  problemCount: number
  onClick: () => void
}

export function PatternCard({ pattern, problemCount, onClick }: PatternCardProps) {
  const getDifficultyVariant = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner':
        return 'default' as const
      case 'intermediate':
        return 'secondary' as const
      case 'advanced':
        return 'destructive' as const
      default:
        return 'outline' as const
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

  return (
    <Card 
      className={cn(
        "pattern-card border-l-4 group",
        getDifficultyAccent(pattern.difficulty)
      )}
      onClick={onClick}
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
            
            <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {pattern.description}
          </p>

          {/* Stats */}
          <div className="flex items-center justify-between text-sm">
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
        </div>
      </CardContent>
    </Card>
  )
} 