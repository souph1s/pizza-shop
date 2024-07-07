import { formatDistanceToNow } from 'date-fns'
import { enUS } from 'date-fns/locale'
import { ArrowRight, Search, X } from 'lucide-react'
import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'

import { approveOrder } from '@/api/approve-order'
import { cancelOrder } from '@/api/cancel-order'
import { deliverOrder } from '@/api/deliver-order'
import { dispatchOrder } from '@/api/dispatch-order'
import { GetOrdersResponse } from '@/api/get-orders'
import { OrderStatus } from '@/components/order-status'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'

import { OrderDetails } from './order-details'

export interface OrderTableRowProps {
  order: {
    orderId: string
    createdAt: string
    status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'
    customerName: string
    total: number
  }
}

export function OrderTableRow({ order }: OrderTableRowProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const queryClient = useQueryClient()

  function updatedOrderStatusOnCache(orderId: string, status: OrderStatus) {
    const ordersListCache = queryClient.getQueriesData<GetOrdersResponse>({
      queryKey: ['orders'],
    })
    ordersListCache.forEach(([cacheKey, cacheData]) => {
      if (!cacheData) {
        return
      }
      queryClient.setQueryData<GetOrdersResponse>(cacheKey, {
        ...cacheData,
        orders: cacheData.orders.map((order) => {
          if (order.orderId === orderId) {
            return { ...order, status }
          }
          return order
        }),
      })
    })
  }

  const { mutateAsync: cancelOrderFn, isLoading: isCancellingOrder } =
    useMutation({
      mutationFn: cancelOrder,
      async onSuccess(_, { orderId }) {
        updatedOrderStatusOnCache(orderId, 'canceled')
      },
    })

  const { mutateAsync: approveOrderFn, isLoading: isApprovingOrder } =
    useMutation({
      mutationFn: approveOrder,
      async onSuccess(_, { orderId }) {
        updatedOrderStatusOnCache(orderId, 'processing')
      },
    })

  const { mutateAsync: dispatchOrderFn, isLoading: isDispatchingOrder } =
    useMutation({
      mutationFn: dispatchOrder,
      async onSuccess(_, { orderId }) {
        updatedOrderStatusOnCache(orderId, 'delivering')
      },
    })

  const { mutateAsync: deliverOrderFn, isLoading: isDeliveringOrder } =
    useMutation({
      mutationFn: deliverOrder,
      async onSuccess(_, { orderId }) {
        updatedOrderStatusOnCache(orderId, 'delivered')
      },
    })

  return (
    <TableRow>
      <TableCell>
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="xs">
              <Search className="h-3 w-3" />
              <span className="sr-only">Order`s details</span>
            </Button>
          </DialogTrigger>
          <OrderDetails open={isDetailsOpen} orderId={order.orderId} />
        </Dialog>
      </TableCell>

      <TableCell className="font-mono text-sm font-medium">
        {order.orderId}
      </TableCell>

      <TableCell className="text-muted-foreground ">
        {formatDistanceToNow(order.createdAt, {
          locale: enUS,
          addSuffix: true,
        })}
      </TableCell>

      <TableCell>
        <OrderStatus status={order.status} />
      </TableCell>

      <TableCell className="font-medium">{order.customerName}</TableCell>

      <TableCell className="font-medium ">
        {(order.total / 100).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'USD',
        })}
      </TableCell>

      <TableCell>
        {order.status === 'pending' && (
          <Button
            disabled={isApprovingOrder}
            onClick={() => approveOrderFn({ orderId: order.orderId })}
            variant="outline"
            size="xs"
          >
            <ArrowRight className="h3- mr-2 w-3" />
            Approve
          </Button>
        )}

        {order.status === 'processing' && (
          <Button
            disabled={isDispatchingOrder}
            onClick={() => dispatchOrderFn({ orderId: order.orderId })}
            variant="outline"
            size="xs"
          >
            <ArrowRight className="h3- mr-2 w-3" />
            Delivering
          </Button>
        )}

        {order.status === 'delivering' && (
          <Button
            disabled={isDeliveringOrder}
            onClick={() => deliverOrderFn({ orderId: order.orderId })}
            variant="outline"
            size="xs"
          >
            <ArrowRight className="h3- mr-2 w-3" />
            Delivered
          </Button>
        )}
      </TableCell>

      <TableCell>
        <Button
          disabled={
            !['pending', 'processing'].includes(order.status) ||
            isCancellingOrder
          }
          onClick={() => cancelOrderFn({ orderId: order.orderId })}
          variant="ghost"
          size="xs"
        >
          <X className="h3- mr-2 w-3" />
          Cancel
        </Button>
      </TableCell>
    </TableRow>
  )
}
