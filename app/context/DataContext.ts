import { createContext } from 'react';
import { OrderDetailsType, ProductType } from '../types/DataTypes';

type DataContextType = {
    data: OrderDetailsType[];
    getProducts: () => (ProductType | undefined)[];
    addProduct: (product: ProductType) => void;
    deleteProduct: (productID: Number) => void;
};

export const DataContext = createContext<DataContextType>({
    data: [],
    getProducts: () => [],
    addProduct: () => {},
    deleteProduct: () => {}
});
