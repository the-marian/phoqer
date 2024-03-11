import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react';

import { Order } from 'phoqer';

import { UpdateOrderModal } from '../pages/orders/desktop/update-order-modal/update-order-modal';

type ResendOrderContextType = Dispatch<SetStateAction<Order | null>>;

export const ResendOrderContext = createContext<ResendOrderContextType>(() => undefined);

interface Props {
    children: ReactNode;
}

export const ResendOrderContextProvider = ({ children }: Props): JSX.Element => {
    const [order, setOrder] = useState<Order | null>(null);

    const handleClose = (): void => setOrder(null);

    return (
        <ResendOrderContext.Provider value={setOrder}>
            <UpdateOrderModal order={order} open={!!order} onClose={handleClose} />
            {children}
        </ResendOrderContext.Provider>
    );
};

export const useResendOrderContext = (): ResendOrderContextType => {
    return useContext(ResendOrderContext);
};
