import { EventEmitter } from 'events';

class OrdersUtils extends EventEmitter {
    private EVENT_NAME = 'mutate-orders';

    submit = (): void => {
        this.emit(this.EVENT_NAME);
    };

    listen = (callback: () => void): void => {
        this.on(this.EVENT_NAME, callback);
    };

    clear = (callback: () => void): void => {
        this.off(this.EVENT_NAME, callback);
    };
}

export const ordersEvent = new OrdersUtils();
