'use client'

import { ExternalLink, Clock, Building2, Tag, Target } from 'lucide-react'
import { Problem } from '../data/problems'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface ProblemCardProps {
  problem: Problem
  onSolve?: (problemId: string) => void
}

export function ProblemCard({ problem, onSolve }: ProblemCardProps) {
  const getDifficultyVariant = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'default' as const
      case 'medium':
        return 'secondary' as const
      case 'hard':
        return 'destructive' as const
      default:
        return 'outline' as const
    }
  }

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return '🟢'
      case 'medium':
        return '🟡'
      case 'hard':
        return '🔴'
      default:
        return '⚪'
    }
  }

  return (
    <Card className="problem-card group">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1 space-y-4">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                    {problem.title}
                  </h3>
                  <Badge variant={getDifficultyVariant(problem.difficulty)} className="flex items-center space-x-1 text-xs">
                    <span>{getDifficultyIcon(problem.difficulty)}</span>
                    <span>{problem.difficulty}</span>
                  </Badge>
                </div>
                
                <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                  <Target className="h-4 w-4" />
                  <span>{problem.frequency}% frequency</span>
                </div>
              </div>
            </div>
            
            {/* Patterns */}
            <div>
              <p className="text-xs text-muted-foreground mb-2">Patterns</p>
              <div className="flex flex-wrap gap-2">
                {problem.patterns.map((pattern) => (
                  <Badge key={pattern} variant="outline" className="text-xs">
                    {pattern.replace('-', ' ')}
                  </Badge>
                ))}
              </div>
            </div>
            
            {/* Companies */}
            <div>
              <p className="text-xs text-muted-foreground mb-2">Companies</p>
              <div className="flex flex-wrap gap-2">
                {problem.companies.slice(0, 4).map((company) => (
                  <div 
                    key={company} 
                    className="flex items-center space-x-1 bg-muted text-muted-foreground px-2 py-1 rounded-md text-xs"
                  >
                    <Building2 className="h-3 w-3" />
                    <span>{company}</span>
                  </div>
                ))}
                {problem.companies.length > 4 && (
                  <span className="text-xs text-muted-foreground px-2 py-1">
                    +{problem.companies.length - 4} more
                  </span>
                )}
              </div>
            </div>
            
            {/* Complexity */}
            <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>O({problem.timeComplexity})</span>
                </div>
                <span>Space: O({problem.spaceComplexity})</span>
              </div>
              
              <div className="flex space-x-1">
                {problem.sources.map((source) => (
                  <Badge key={source} variant="secondary" className="text-xs">
                    {source}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex flex-col space-y-2 ml-6">
            <Button size="sm" asChild>
              <a
                href={problem.leetcodeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2"
              >
                <ExternalLink className="h-4 w-4" />
                <span>Solve</span>
              </a>
            </Button>
            {onSolve && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onSolve(problem.id)}
              >
                Mark Done
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 