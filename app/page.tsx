'use client'

import { useState } from 'react'
import { BookOpen, Target, TrendingUp, Users, Filter, Search, Star } from 'lucide-react'
import { problems, patterns } from '../data/problems'

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedPattern, setSelectedPattern] = useState<string>('all')

  const filteredProblems = problems.filter(problem => {
    const matchesDifficulty = selectedDifficulty === 'all' || problem.difficulty.toLowerCase() === selectedDifficulty
    const matchesPattern = selectedPattern === 'all' || problem.patterns.includes(selectedPattern)
    const matchesSearch = problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         problem.patterns.some(pattern => pattern.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesDifficulty && matchesPattern && matchesSearch
  })

  const handleStartPattern = (patternId: string) => {
    setSelectedPattern(patternId)
    setActiveTab('problems')
    setSearchQuery('')
    setSelectedDifficulty('all')
  }

  const stats = {
    totalProblems: problems.length,
    completedProblems: 0,
    easyProblems: problems.filter(p => p.difficulty === 'Easy').length,
    mediumProblems: problems.filter(p => p.difficulty === 'Medium').length,
    hardProblems: problems.filter(p => p.difficulty === 'Hard').length,
    totalPatterns: patterns.length
  }

  return (
    <div className="min-h-screen">
      {/* Navigation Header */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">LeetCode Grind Ultimate</h1>
                <p className="text-xs text-gray-500">Master Technical Interviews</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'dashboard' 
                    ? 'bg-primary-100 text-primary-700' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab('roadmap')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'roadmap' 
                    ? 'bg-primary-100 text-primary-700' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Roadmap
              </button>
              <button
                onClick={() => setActiveTab('problems')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'problems' 
                    ? 'bg-primary-100 text-primary-700' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Problems
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="text-center py-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Master Technical Interviews with
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Ultimate Preparation</span>
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Combining the best problems from LeetCode Wizard, NeetCode, and LeetCode 75 into one comprehensive platform
              </p>
              <div className="flex justify-center space-x-4">
                <button 
                  onClick={() => setActiveTab('roadmap')}
                  className="btn-primary flex items-center space-x-2"
                >
                  <Target className="h-5 w-5" />
                  <span>Start Learning Path</span>
                </button>
                <button 
                  onClick={() => setActiveTab('problems')}
                  className="btn-secondary flex items-center space-x-2"
                >
                  <BookOpen className="h-5 w-5" />
                  <span>Browse Problems</span>
                </button>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Problems</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalProblems}</p>
                  </div>
                  <BookOpen className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              
              <div className="card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Learning Patterns</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalPatterns}</p>
                  </div>
                  <Target className="h-8 w-8 text-purple-600" />
                </div>
              </div>
              
              <div className="card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Progress</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.completedProblems}%</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
              </div>
              
              <div className="card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Companies Covered</p>
                    <p className="text-3xl font-bold text-gray-900">100+</p>
                  </div>
                  <Users className="h-8 w-8 text-orange-600" />
                </div>
              </div>
            </div>

            {/* Difficulty Breakdown */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Problems by Difficulty</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{stats.easyProblems}</div>
                  <div className="text-sm text-gray-600">Easy</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">{stats.mediumProblems}</div>
                  <div className="text-sm text-gray-600">Medium</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">{stats.hardProblems}</div>
                  <div className="text-sm text-gray-600">Hard</div>
                </div>
              </div>
            </div>

            {/* Interactive Learning Roadmap */}
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">🗺️ Interactive Learning Roadmap</h3>
                <button
                  onClick={() => setActiveTab('roadmap')}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  View Full Roadmap →
                </button>
              </div>
              
              <div className="space-y-4">
                {/* Beginner Patterns */}
                <div>
                  <h4 className="text-sm font-semibold text-green-700 mb-3 flex items-center">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs mr-2">🔰 BEGINNER</span>
                    Start Here
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {patterns.filter(p => p.difficulty === 'Beginner').map((pattern) => (
                      <button
                        key={pattern.id}
                        onClick={() => handleStartPattern(pattern.id)}
                        className="text-left p-3 bg-green-50 hover:bg-green-100 rounded-lg border border-green-200 transition-all duration-200 group"
                      >
                        <div className="font-medium text-green-900 text-sm group-hover:text-green-700">
                          {pattern.name}
                        </div>
                        <div className="text-xs text-green-600 mt-1">
                          {pattern.problems.length} problems • {pattern.estimatedHours}h
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Intermediate Patterns */}
                <div>
                  <h4 className="text-sm font-semibold text-yellow-700 mb-3 flex items-center">
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs mr-2">🔶 INTERMEDIATE</span>
                    Build Skills
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {patterns.filter(p => p.difficulty === 'Intermediate').map((pattern) => (
                      <button
                        key={pattern.id}
                        onClick={() => handleStartPattern(pattern.id)}
                        className="text-left p-3 bg-yellow-50 hover:bg-yellow-100 rounded-lg border border-yellow-200 transition-all duration-200 group"
                      >
                        <div className="font-medium text-yellow-900 text-sm group-hover:text-yellow-700">
                          {pattern.name}
                        </div>
                        <div className="text-xs text-yellow-600 mt-1">
                          {pattern.problems.length} problems • {pattern.estimatedHours}h
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Advanced Patterns */}
                <div>
                  <h4 className="text-sm font-semibold text-red-700 mb-3 flex items-center">
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs mr-2">🔴 ADVANCED</span>
                    Master Level
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {patterns.filter(p => p.difficulty === 'Advanced').map((pattern) => (
                      <button
                        key={pattern.id}
                        onClick={() => handleStartPattern(pattern.id)}
                        className="text-left p-3 bg-red-50 hover:bg-red-100 rounded-lg border border-red-200 transition-all duration-200 group"
                      >
                        <div className="font-medium text-red-900 text-sm group-hover:text-red-700">
                          {pattern.name}
                        </div>
                        <div className="text-xs text-red-600 mt-1">
                          {pattern.problems.length} problems • {pattern.estimatedHours}h
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Sources */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Problem Sources</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
                  <Star className="h-6 w-6 text-blue-600" />
                  <div>
                    <div className="font-medium text-blue-900">LeetCode Wizard</div>
                    <div className="text-sm text-blue-700">Company-tagged problems</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg">
                  <Star className="h-6 w-6 text-purple-600" />
                  <div>
                    <div className="font-medium text-purple-900">NeetCode</div>
                    <div className="text-sm text-purple-700">Pattern-based learning</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
                  <Star className="h-6 w-6 text-green-600" />
                  <div>
                    <div className="font-medium text-green-900">LeetCode 75</div>
                    <div className="text-sm text-green-700">Essential problems</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Roadmap Tab */}
        {activeTab === 'roadmap' && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Learning Roadmap</h2>
              <p className="text-lg text-gray-600">Follow our structured path to master coding interviews</p>
            </div>
            
            <div className="grid gap-6">
              {patterns.map((pattern, index) => (
                <div key={pattern.id} className="card hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="bg-primary-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900">{pattern.name}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          pattern.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                          pattern.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {pattern.difficulty}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-4">{pattern.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>{pattern.problems.length} problems</span>
                        <span>~{pattern.estimatedHours} hours</span>
                      </div>
                    </div>
                    <button 
                      className="btn-primary"
                      onClick={() => handleStartPattern(pattern.id)}
                    >
                      Start Pattern
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Problems Tab */}
        {activeTab === 'problems' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
              <div>
                <h2 className="text-3xl font-bold text-gray-900">
                  {selectedPattern === 'all' ? 'All Problems' : 
                   patterns.find(p => p.id === selectedPattern)?.name + ' Problems'}
                </h2>
                {selectedPattern !== 'all' && (
                  <p className="text-gray-600 mt-1">
                    {patterns.find(p => p.id === selectedPattern)?.description}
                  </p>
                )}
              </div>
              
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search problems..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                
                <select
                  value={selectedPattern}
                  onChange={(e) => setSelectedPattern(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="all">All Patterns</option>
                  {patterns.map((pattern) => (
                    <option key={pattern.id} value={pattern.id}>
                      {pattern.name}
                    </option>
                  ))}
                </select>
                
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="all">All Difficulties</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
            </div>

            {selectedPattern !== 'all' && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Showing problems for:</span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {patterns.find(p => p.id === selectedPattern)?.name}
                </span>
                <button
                  onClick={() => setSelectedPattern('all')}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Clear filter
                </button>
              </div>
            )}

            <div className="grid gap-4">
              {filteredProblems.map((problem) => (
                <div key={problem.id} className="card hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{problem.title}</h3>
                        <span className={`difficulty-${problem.difficulty.toLowerCase()}`}>
                          {problem.difficulty}
                        </span>
                        <span className="text-sm text-gray-500">#{problem.frequency}% frequency</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        {problem.patterns.map((pattern) => (
                          <span key={pattern} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                            {pattern}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        {problem.companies.slice(0, 5).map((company) => (
                          <span key={company} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                            {company}
                          </span>
                        ))}
                        {problem.companies.length > 5 && (
                          <span className="text-xs text-gray-500">+{problem.companies.length - 5} more</span>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span>Time: {problem.timeComplexity}</span>
                        <span>Space: {problem.spaceComplexity}</span>
                        <div className="flex space-x-1">
                          {problem.sources.map((source) => (
                            <span key={source} className="bg-green-100 text-green-700 px-1 py-0.5 rounded">
                              {source}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <a
                        href={problem.leetcodeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary text-sm"
                      >
                        Solve
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 