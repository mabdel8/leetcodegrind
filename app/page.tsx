'use client'

import { useState } from 'react'
import { patterns, problems } from '../data/problems'
import { PatternCard } from '../components/PatternCard'
import { ProblemCard } from '../components/ProblemCard'
import FlowchartRoadmap from '../components/FlowchartRoadmap'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import Link from 'next/link'
import { BookOpen, Code, Target, TrendingUp, ArrowLeft } from 'lucide-react'
import { ProblemTable } from '../components/ProblemTable'
import { Progress } from '@/components/ui/Progress'
import React from 'react'
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select'

export default function Home() {
  const [selectedPattern, setSelectedPattern] = useState<string | null>(null)
  const [currentView, setCurrentView] = useState<'overview' | 'patterns' | 'roadmap' | 'problems'>('overview')
  const [patternFilter, setPatternFilter] = useState<'all' | 'Beginner' | 'Intermediate' | 'Advanced'>('all')

  // Calculate statistics
  const totalProblems = problems.length
  const totalPatterns = patterns.length
  const totalHours = patterns.reduce((acc, pattern) => acc + pattern.estimatedHours, 0)
  
  const difficultyCount = {
    Easy: problems.filter(p => p.difficulty === 'Easy').length,
    Medium: problems.filter(p => p.difficulty === 'Medium').length,
    Hard: problems.filter(p => p.difficulty === 'Hard').length,
  }

  const getPatternProblemCount = (patternId: string) => {
    return problems.filter(problem => problem.patterns.includes(patternId)).length
  }

  const handlePatternClick = (patternId: string) => {
    setSelectedPattern(patternId)
    setCurrentView('problems')
  }

  const filteredProblems = selectedPattern 
    ? problems.filter(problem => problem.patterns.includes(selectedPattern))
    : problems

  const selectedPatternData = selectedPattern 
    ? patterns.find(p => p.id === selectedPattern)
    : null

  const handleNavigation = (view: 'overview' | 'patterns' | 'roadmap' | 'problems') => {
    setCurrentView(view)
    if (view !== 'problems') {
      setSelectedPattern(null)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">LC</span>
            </div>
            <div>
              <h1 className="text-lg font-semibold">LeetCode Grind</h1>
              <p className="text-xs text-muted-foreground">Master technical interviews</p>
            </div>
          </div>
          
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Learn</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <button
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md text-left"
                          onClick={() => handleNavigation('overview')}
                        >
                          <div className="mb-2 mt-4 text-lg font-medium">
                            LeetCode Grind
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Master technical interviews with curated problems and patterns.
                          </p>
                        </button>
                      </NavigationMenuLink>
                    </li>
                    <ListItem onClick={() => handleNavigation('overview')} title="Overview">
                      Dashboard with stats and featured patterns
                    </ListItem>
                    <ListItem onClick={() => handleNavigation('patterns')} title="Patterns">
                      All learning patterns and techniques
                    </ListItem>
                    <ListItem onClick={() => handleNavigation('roadmap')} title="Roadmap">
                      Structured learning path
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Practice</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    <ListItem onClick={() => handleNavigation('problems')} title="All Problems">
                      Browse all {totalProblems} curated problems
                    </ListItem>
                    <ListItem onClick={() => handleNavigation('problems')} title="Easy Problems">
                      Start with {difficultyCount.Easy} beginner-friendly problems
                    </ListItem>
                    <ListItem onClick={() => handleNavigation('problems')} title="Medium Problems">
                      Challenge yourself with {difficultyCount.Medium} intermediate problems
                    </ListItem>
                    <ListItem onClick={() => handleNavigation('problems')} title="Hard Problems">
                      Master {difficultyCount.Hard} advanced problems
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
                  <button onClick={() => handleNavigation('roadmap')}>Roadmap</button>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">Sign In</Button>
            <Button size="sm">Get Started</Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8">
        {currentView === 'overview' && (
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="text-center space-y-4 py-8">
              <h1 className="text-4xl font-bold tracking-tight">Master Technical Interviews</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Curated problems and patterns from top tech companies. Build confidence through structured practice.
              </p>
              <div className="flex items-center justify-center space-x-4 pt-4">
                <Button size="lg" onClick={() => handleNavigation('patterns')}>Start Learning</Button>
                <Button variant="outline" size="lg" onClick={() => handleNavigation('roadmap')}>View Roadmap</Button>
              </div>
            </div>

            {/* Pattern Filter Select */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-muted-foreground">Filter by difficulty:</span>
                <Select onValueChange={(value: 'all' | 'Beginner' | 'Intermediate' | 'Advanced') => setPatternFilter(value)}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* All Patterns */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-semibold">All Patterns</h2>
                  <p className="text-muted-foreground">Master all {totalPatterns} essential patterns for technical interviews</p>
                </div>
                <Button variant="outline" onClick={() => handleNavigation('roadmap')}>View Roadmap</Button>
              </div>
              
              {/* Overall Progress Bar */}
              <OverallProblemsProgress totalProblems={totalProblems} />
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {patterns
                  .filter(p => patternFilter === 'all' || p.difficulty === patternFilter)
                  .map((pattern) => (
                  <PatternCard
                    key={pattern.id}
                    pattern={pattern}
                    problemCount={getPatternProblemCount(pattern.id)}
                    onClick={() => handlePatternClick(pattern.id)}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {currentView === 'patterns' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold">Learning Patterns</h2>
                <p className="text-muted-foreground">Master these {totalPatterns} essential patterns</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {patterns.map((pattern) => (
                <PatternCard
                  key={pattern.id}
                  pattern={pattern}
                  problemCount={getPatternProblemCount(pattern.id)}
                  onClick={() => handlePatternClick(pattern.id)}
                />
              ))}
            </div>
          </div>
        )}

        {currentView === 'roadmap' && (
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-semibold">Learning Roadmap</h2>
              <p className="text-muted-foreground">Follow this structured path to master algorithmic problem solving</p>
            </div>
            
            <FlowchartRoadmap 
              onPatternClick={handlePatternClick}
              getPatternProblemCount={getPatternProblemCount}
            />
          </div>
        )}

        {currentView === 'problems' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {selectedPattern && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => {
                      setSelectedPattern(null)
                      setCurrentView('patterns')
                    }}
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Patterns
                  </Button>
                )}
                <div>
                  <h2 className="text-2xl font-semibold">
                    {selectedPatternData ? selectedPatternData.name : 'All Problems'}
                  </h2>
                  <p className="text-muted-foreground">
                    {selectedPatternData 
                      ? `${filteredProblems.length} problems in this pattern`
                      : `${totalProblems} total problems`
                    }
                  </p>
                </div>
              </div>
              {selectedPattern && (
                <Badge variant="secondary">{selectedPatternData?.name}</Badge>
              )}
            </div>
            <ProblemTable problems={filteredProblems} pageSize={20} />
          </div>
        )}
      </main>
    </div>
  )
}

function ListItem({
  title,
  children,
  onClick,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { title: string; onClick: () => void }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <button
          onClick={onClick}
          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground text-left w-full"
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </button>
      </NavigationMenuLink>
    </li>
  )
}

function OverallProblemsProgress({ totalProblems }: { totalProblems: number }) {
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
  const percent = totalProblems === 0 ? 0 : Math.round((completed.length / totalProblems) * 100)
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-medium text-muted-foreground">Overall Progress</span>
        <span className="text-xs text-muted-foreground">{completed.length} / {totalProblems} ({percent}%)</span>
      </div>
      <Progress value={percent} />
    </div>
  )
} 