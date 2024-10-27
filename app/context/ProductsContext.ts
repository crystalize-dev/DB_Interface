import { createContext } from 'react';
import { ProductType } from '../types/DataTypes';

type ProductsContextType = {
    products: ProductType[];
    fetchingProducts: boolean;
    addProduct: (
        product: ProductType,
        setFetching: React.Dispatch<React.SetStateAction<boolean>>
    ) => void;
    removeProduct: (
        productId: number,
        setFetching: React.Dispatch<React.SetStateAction<boolean>>
    ) => void;
    updateProduct: (
        product: ProductType,
        setFetching: React.Dispatch<React.SetStateAction<boolean>>
    ) => void;
    getCategories: () => string[];
};

export const ProductsContext = createContext<ProductsContextType>({
    products: [],
    fetchingProducts: false,
    addProduct: () => {},
    removeProduct: () => {},
    updateProduct: () => {},
    getCategories: () => []
});
