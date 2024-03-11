import { ID, Order, OrdersList, OrderStatus } from 'phoqer';
import { asyncCache } from 'phoqer-shared';

import { privateApiClient } from 'src/http/http';

class OrdersService {
    @asyncCache
    async getOrder(params: Record<string, string | number>): Promise<OrdersList> {
        const { data } = await privateApiClient.get<OrdersList>('/orders/author', { params });

        return data;
    }

    async updateOrder(ids: ID[], status: OrderStatus): Promise<Order[]> {
        const { data } = await privateApiClient.put<Order[]>('/orders/client/status', { ids, status });

        return data;
    }

    async startRent(id: ID): Promise<OrdersList> {
        const { data } = await privateApiClient.post<OrdersList>(`/orders/${id}`);

        return data;
    }
}

export const ordersService = new OrdersService();
