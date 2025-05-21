import type { ReactNode } from "react"
import { SearchX } from "lucide-react"

interface EmptyStateProps {
  title: string
  description: string
  icon?: ReactNode
  action?: ReactNode
}

export function EmptyState({
  title,
  description,
  icon = <SearchX className="h-12 w-12 text-muted-foreground" />,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 border rounded-lg bg-muted/10">
      <div className="mb-4">{icon}</div>
      <h3 className="text-lg font-medium">{title}</h3>
      <p className="text-sm text-muted-foreground mt-2 max-w-md">{description}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}
