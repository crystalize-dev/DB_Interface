import { createContext } from 'react';
import { OrderType } from '../types/DataTypes';

type OrdersContextType = {
    orders: OrderType[];
    fetchingOrders: boolean;
    addOrder: (
        order: OrderType,
        setFetching: React.Dispatch<React.SetStateAction<boolean>>
    ) => void;
};

export const OrdersContext = createContext<OrdersContextType>({
    orders: [],
    fetchingOrders: false,
    addOrder: () => {}
});
