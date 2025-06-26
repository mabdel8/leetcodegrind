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

interface ProblemTableProps {
  problems: Problem[]
  pageSize?: number
}

export function ProblemTable({ problems, pageSize = 20 }: ProblemTableProps) {
  const [page, setPage] = React.useState(0)
  const totalPages = Math.ceil(problems.length / pageSize)

  const paginatedProblems = React.useMemo(() => {
    const start = page * pageSize
    return problems.slice(start, start + pageSize)
  }, [problems, page, pageSize])

  React.useEffect(() => {
    if (page > 0 && page >= totalPages) setPage(0)
  }, [problems, totalPages, page])

  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
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
              <TableCell colSpan={5} className="text-center text-muted-foreground">
                No problems found.
              </TableCell>
            </TableRow>
          )}
          {paginatedProblems.map((problem) => (
            <TableRow key={problem.id}>
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