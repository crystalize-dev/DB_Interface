import { createContext } from 'react';
import { OrderDetailsType } from '../types/DataTypes';

type OrdersContextType = {
    orders: OrderDetailsType[];
    fetchingOrders: boolean;
    addOrder: (
        order: OrderDetailsType,
        setFetching: React.Dispatch<React.SetStateAction<boolean>>
    ) => void;
    getSumm: () => void;
};

export const OrdersContext = createContext<OrdersContextType>({
    orders: [],
    fetchingOrders: false,
    addOrder: () => {},
    getSumm: () => {}
});
