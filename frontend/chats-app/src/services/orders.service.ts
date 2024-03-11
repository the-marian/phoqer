import { ID, OrdersList } from 'phoqer';
import { asyncCache } from 'phoqer-shared';

import { privateApiClient } from 'src/http/http';

class OrdersService {
    @asyncCache
    async getOrders(id: ID, params: Record<string, string | number> = {}): Promise<OrdersList> {
        console.log(id);
        const { data } = await privateApiClient.get<OrdersList>('/orders/chats/' + id, { params });

        return data;
    }
}

export const ordersService = new OrdersService();
