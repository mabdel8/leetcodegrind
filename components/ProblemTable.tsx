import * as React from 'react'
import { Problem } from '../data/problems'
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from './ui/table'
import { Button } from './ui/button'
import { Checkbox } from './ui/checkbox'

interface ProblemTableProps {
  problems: Problem[]
  pageSize?: number
}

const STORAGE_KEY = 'completedProblems'

function getCompletedFromStorage(): string[] {
  if (typeof window === 'undefined') return []
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  } catch {
    return []
  }
}

function setCompletedToStorage(ids: string[]) {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
}

export function ProblemTable({ problems, pageSize = 20 }: ProblemTableProps) {
  const [page, setPage] = React.useState(0)
  const [completed, setCompleted] = React.useState<string[]>(getCompletedFromStorage())
  const totalPages = Math.ceil(problems.length / pageSize)

  React.useEffect(() => {
    setCompleted(getCompletedFromStorage())
  }, [])

  React.useEffect(() => {
    setCompletedToStorage(completed)
  }, [completed])

  const paginatedProblems = React.useMemo(() => {
    const start = page * pageSize
    return problems.slice(start, start + pageSize)
  }, [problems, page, pageSize])

  React.useEffect(() => {
    if (page > 0 && page >= totalPages) setPage(0)
  }, [problems, totalPages, page])

  const toggleCompleted = (id: string) => {
    setCompleted((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    )
  }

  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-10 text-center">Done</TableHead>
            <TableHead className="w-1/3">Title</TableHead>
            <TableHead className="w-1/6">Difficulty</TableHead>
            <TableHead className="w-1/6">Companies</TableHead>
            <TableHead className="w-1/6">Patterns</TableHead>
            <TableHead className="w-1/6 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedProblems.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-muted-foreground">
                No problems found.
              </TableCell>
            </TableRow>
          )}
          {paginatedProblems.map((problem) => (
            <TableRow key={problem.id} className={completed.includes(problem.id) ? 'opacity-60' : ''}>
              <TableCell className="text-center">
                <Checkbox
                  checked={completed.includes(problem.id)}
                  onCheckedChange={() => toggleCompleted(problem.id)}
                  aria-label="Mark as completed"
                />
              </TableCell>
              <TableCell className="font-medium">{problem.title}</TableCell>
              <TableCell>
                <span className={
                  problem.difficulty === 'Easy' ? 'text-green-500' :
                  problem.difficulty === 'Medium' ? 'text-yellow-500' :
                  'text-red-500'
                }>
                  {problem.difficulty}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {problem.companies.slice(0, 3).map((c) => (
                    <span key={c} className="bg-muted px-2 py-0.5 rounded text-xs text-muted-foreground">{c}</span>
                  ))}
                  {problem.companies.length > 3 && (
                    <span className="text-xs text-muted-foreground">+{problem.companies.length - 3} more</span>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {problem.patterns.map((p) => (
                    <span key={p} className="bg-accent px-2 py-0.5 rounded text-xs text-accent-foreground">{p.replace('-', ' ')}</span>
                  ))}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <Button asChild size="sm" variant="outline">
                  <a href={problem.leetcodeUrl} target="_blank" rel="noopener noreferrer">
                    Solve
                  </a>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableCaption>
          {problems.length} problems total
        </TableCaption>
      </Table>
      {/* Pagination Controls */}
      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-muted-foreground">
          Page {page + 1} of {totalPages}
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="ghost" onClick={() => setPage(0)} disabled={page === 0}>
            First
          </Button>
          <Button size="sm" variant="ghost" onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={page === 0}>
            Prev
          </Button>
          <Button size="sm" variant="ghost" onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))} disabled={page >= totalPages - 1}>
            Next
          </Button>
          <Button size="sm" variant="ghost" onClick={() => setPage(totalPages - 1)} disabled={page >= totalPages - 1}>
            Last
          </Button>
        </div>
      </div>
    </div>
  )
} 