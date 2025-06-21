'use client'

import { useState } from 'react'
import { patterns, problems } from '../data/problems'
import { PatternCard } from '../components/PatternCard'
import { ProblemCard } from '../components/ProblemCard'
import FlowchartRoadmap from '../components/FlowchartRoadmap'
import { cn } from '@/lib/utils'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
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
import { BookOpen, Code, Target, TrendingUp } from 'lucide-react'

export default function Home() {
  const [selectedPattern, setSelectedPattern] = useState<string | null>(null)

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
  }

  const filteredProblems = selectedPattern 
    ? problems.filter(problem => problem.patterns.includes(selectedPattern))
    : problems

  const selectedPatternData = selectedPattern 
    ? patterns.find(p => p.id === selectedPattern)
    : null

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
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          href="/"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium">
                            LeetCode Grind
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Master technical interviews with curated problems and patterns.
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <ListItem href="/" title="Overview">
                      Dashboard with stats and featured patterns
                    </ListItem>
                    <ListItem href="/patterns" title="Patterns">
                      All learning patterns and techniques
                    </ListItem>
                    <ListItem href="/roadmap" title="Roadmap">
                      Structured learning path
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Practice</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    <ListItem href="/problems" title="All Problems">
                      Browse all {totalProblems} curated problems
                    </ListItem>
                    <ListItem href="/problems?difficulty=easy" title="Easy Problems">
                      Start with {difficultyCount.Easy} beginner-friendly problems
                    </ListItem>
                    <ListItem href="/problems?difficulty=medium" title="Medium Problems">
                      Challenge yourself with {difficultyCount.Medium} intermediate problems
                    </ListItem>
                    <ListItem href="/problems?difficulty=hard" title="Hard Problems">
                      Master {difficultyCount.Hard} advanced problems
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
                  <Link href="/roadmap">Roadmap</Link>
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
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8 bg-muted">
            <TabsTrigger value="overview" className="data-[state=active]:bg-background">
              Overview
            </TabsTrigger>
            <TabsTrigger value="patterns" className="data-[state=active]:bg-background">
              Patterns
            </TabsTrigger>
            <TabsTrigger value="roadmap" className="data-[state=active]:bg-background">
              Roadmap
            </TabsTrigger>
            <TabsTrigger value="problems" className="data-[state=active]:bg-background">
              Problems
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            {/* Hero Section */}
            <div className="text-center space-y-4 py-8">
              <h1 className="text-4xl font-bold tracking-tight">Master Technical Interviews</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Curated problems and patterns from top tech companies. Build confidence through structured practice.
              </p>
              <div className="flex items-center justify-center space-x-4 pt-4">
                <Button size="lg">Start Learning</Button>
                <Button variant="outline" size="lg">View Roadmap</Button>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="stats-card">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{totalProblems}</p>
                      <p className="text-sm text-muted-foreground">Problems</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="stats-card">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                      <Target className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-green-600">{difficultyCount.Easy}</p>
                      <p className="text-sm text-muted-foreground">Easy</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="stats-card">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                      <TrendingUp className="h-5 w-5 text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-yellow-600">{difficultyCount.Medium}</p>
                      <p className="text-sm text-muted-foreground">Medium</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="stats-card">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                      <Code className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-red-600">{difficultyCount.Hard}</p>
                      <p className="text-sm text-muted-foreground">Hard</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Featured Patterns */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-semibold">All Patterns</h2>
                  <p className="text-muted-foreground">Master all {totalPatterns} essential patterns for technical interviews</p>
                </div>
                <Button variant="outline">View Roadmap</Button>
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
          </TabsContent>

          <TabsContent value="patterns" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold">Learning Patterns</h2>
                <p className="text-muted-foreground">Master these {totalPatterns} essential patterns</p>
              </div>
              {selectedPattern && (
                <Button variant="outline" onClick={() => setSelectedPattern(null)}>
                  Clear Filter
                </Button>
              )}
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
          </TabsContent>

          <TabsContent value="roadmap" className="space-y-6">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-semibold">Learning Roadmap</h2>
              <p className="text-muted-foreground">Follow this structured path to master algorithmic problem solving</p>
            </div>
            
            <FlowchartRoadmap 
              onPatternClick={handlePatternClick}
              getPatternProblemCount={getPatternProblemCount}
            />
          </TabsContent>

          <TabsContent value="problems" className="space-y-6">
            <div className="flex items-center justify-between">
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
              {selectedPattern && (
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">{selectedPatternData?.name}</Badge>
                  <Button variant="outline" size="sm" onClick={() => setSelectedPattern(null)}>
                    Clear Filter
                  </Button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filteredProblems.map((problem) => (
                <ProblemCard key={problem.id} problem={problem} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { title: string; href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
} 