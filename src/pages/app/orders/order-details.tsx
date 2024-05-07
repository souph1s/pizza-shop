import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export function OrderDetails() {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="mb-2">Order 12345</DialogTitle>
        <Separator />
        <DialogDescription> Order`s details</DialogDescription>
      </DialogHeader>

      <div>
        <Table>
          <TableBody>
            <TableRow className="rounded-lg hover:rounded-lg">
              <TableCell className="text-muted-foreground">Status</TableCell>
              <TableCell className="flex justify-end">
                <div className="flex items-center gap-2 ">
                  <span className="h-2 w-2 rounded-full bg-slate-400"></span>
                  <span className="font-medium text-muted-foreground">
                    Pending
                  </span>
                </div>
              </TableCell>
            </TableRow>

            <TableRow className="rounded-lg hover:rounded-lg">
              <TableCell className="text-muted-foreground">Customer</TableCell>
              <TableCell className="flex justify-end">Sophia Muraro</TableCell>
            </TableRow>

            <TableRow className="rounded-lg hover:rounded-lg">
              <TableCell className="text-muted-foreground">Phone</TableCell>
              <TableCell className="flex justify-end">
                (41) 00000-0000
              </TableCell>
            </TableRow>

            <TableRow className="rounded-lg hover:rounded-lg">
              <TableCell className="text-muted-foreground">E-mail</TableCell>
              <TableCell className="flex justify-end">
                sophia@email.com
              </TableCell>
            </TableRow>

            <TableRow className="rounded-lg hover:rounded-lg">
              <TableCell className="text-muted-foreground">Ordered</TableCell>
              <TableCell className="flex justify-end">3 minutes ago</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead className="text-right">Quantity</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Subtotal</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <TableRow>
              <TableCell>Margherita</TableCell>
              <TableCell className="text-right">2</TableCell>
              <TableCell className="text-right">$29,90</TableCell>
              <TableCell className="text-right">$59,80</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Pepperoni</TableCell>
              <TableCell className="text-right">2</TableCell>
              <TableCell className="text-right">$19,90</TableCell>
              <TableCell className="text-right">$39,80</TableCell>
            </TableRow>
          </TableBody>

          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total:</TableCell>
              <TableCell className="text-right font-medium">$99,60</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </DialogContent>
  )
}
