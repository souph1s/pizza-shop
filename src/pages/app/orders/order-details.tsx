import { formatDistanceToNow } from 'date-fns'
import { enUS } from 'date-fns/locale'
import { useQuery } from 'react-query'

import { getOrderDetails } from '@/api/get-order-details'
import { OrderStatus } from '@/components/order-status'
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

export interface OrderDetailsProps {
  orderId: string
  open: boolean
}

export function OrderDetails({ orderId, open }: OrderDetailsProps) {
  const { data: order } = useQuery({
    queryKey: ['order', orderId],
    queryFn: () => getOrderDetails({ orderId }),
    enabled: open,
  })

  if (!order) {
    return null
  }
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="mb-2">Order {orderId}</DialogTitle>
        <Separator />
        <DialogDescription> Order`s details</DialogDescription>
      </DialogHeader>

      {order && (
        <div>
          <Table>
            <TableBody>
              <TableRow className="rounded-lg hover:rounded-lg">
                <TableCell className="text-muted-foreground">Status</TableCell>
                <TableCell className="flex justify-end">
                  <OrderStatus status={order.status} />
                </TableCell>
              </TableRow>

              <TableRow className="rounded-lg hover:rounded-lg">
                <TableCell className="text-muted-foreground">
                  Customer
                </TableCell>
                <TableCell className="flex justify-end">
                  {order.customer.name}
                </TableCell>
              </TableRow>

              <TableRow className="rounded-lg hover:rounded-lg">
                <TableCell className="text-muted-foreground">Phone</TableCell>
                <TableCell className="flex justify-end">
                  {order.customer.phone ?? 'Phone number was not informed.'}
                </TableCell>
              </TableRow>

              <TableRow className="rounded-lg hover:rounded-lg">
                <TableCell className="text-muted-foreground">E-mail</TableCell>
                <TableCell className="flex justify-end">
                  {order.customer.email}
                </TableCell>
              </TableRow>

              <TableRow className="rounded-lg hover:rounded-lg">
                <TableCell className="text-muted-foreground">Ordered</TableCell>
                <TableCell className="flex justify-end">
                  {formatDistanceToNow(order.createdAt, {
                    locale: enUS,
                    addSuffix: true,
                  })}
                </TableCell>
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
              {order.orderItems.map((item) => {
                return (
                  <TableRow key={item.id}>
                    <TableCell>{item.product.name}</TableCell>
                    <TableCell className="text-right">
                      {item.quantity}
                    </TableCell>
                    <TableCell className="text-right">
                      {(item.priceInCents / 100).toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'USD',
                      })}
                    </TableCell>
                    <TableCell className="text-right">
                      {(
                        (item.priceInCents * item.quantity) /
                        100
                      ).toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'USD',
                      })}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>

            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total:</TableCell>
                <TableCell className="text-right font-medium">
                  {(order.totalInCents / 100).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'USD',
                  })}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      )}
    </DialogContent>
  )
}
