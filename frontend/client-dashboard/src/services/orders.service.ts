import { ID, Order, OrdersList, OrderStatus } from 'phoqer';
import { asyncCache } from 'phoqer-shared';

import { privateApiClient } from 'src/http/http';

class OrdersService {
    @asyncCache
    async getOrders(params: Record<string, string | number>): Promise<OrdersList> {
        const { data } = await privateApiClient.get<OrdersList>('/orders/client', { params });

        return data;
    }

    async updateOrders(ids: ID[], status: OrderStatus): Promise<Order[]> {
        const { data } = await privateApiClient.put<Order[]>('/orders/client/status', { ids, status });

        return data;
    }

    async updateOrderById(id: ID, body: Record<string, unknown>): Promise<Order> {
        const { data } = await privateApiClient.put<Order>(`/orders/client/${id}`, body);

        return data;
    }
}

export const ordersService = new OrdersService();
