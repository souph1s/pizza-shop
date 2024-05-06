import { ArrowRight, Search, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'

export function OrderTableRow() {
  return (
    <TableRow>
      <TableCell>
        <Button variant="outline" size="xs">
          <Search className="h-3 w-3" />
          <span className="sr-only">Order`s details</span>
        </Button>
      </TableCell>

      <TableCell className="font-mono text-sm font-medium">1029kd019</TableCell>

      <TableCell className="text-muted-foreground ">15 minutes ago</TableCell>

      <TableCell>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-slate-400"></span>
          <span className="font-medium text-muted-foreground">Pending</span>
        </div>
      </TableCell>

      <TableCell className="font-medium">Sophia Muraro</TableCell>

      <TableCell className="font-medium ">$32,87</TableCell>

      <TableCell>
        <Button variant="outline" size="xs">
          <ArrowRight className="h3- mr-2 w-3" />
          Approve
        </Button>
      </TableCell>

      <TableCell>
        <Button variant="ghost" size="xs">
          <X className="h3- mr-2 w-3" />
          Cancel
        </Button>
      </TableCell>
    </TableRow>
  )
}
