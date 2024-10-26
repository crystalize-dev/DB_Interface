import { useEffect, useState } from 'react';
import { OrderDetailsType, ProductType } from '../types/DataTypes';
import { customAxios } from '@/axios/customAxios';

export const useData = () => {
    const [data, setData] = useState<OrderDetailsType[]>([]);

    const [fetching, setFetching] = useState(false);

    const getProducts: () => (ProductType | undefined)[] = () => {
        return data.map((order) => order.Products);
    };

    const addProduct = async (productData: ProductType) => {
        await customAxios('POST', 'products', setFetching, {
            data: productData,
            loadingString: 'Добавляем...',
            successString: 'Продукт добавлен!',
            actionOnSuccess: () => {
                fetchData();
            }
        });
    };

    const deleteProduct = async (productID: Number) => {
        await customAxios('POST', 'products', setFetching, {
            data: productID,
            loadingString: 'Удаляем...',
            successString: 'Продукт удален!',
            actionOnSuccess: () => {
                fetchData();
            }
        });
    };

    const fetchData = async () => {
        setFetching(true);
        customAxios('GET', 'order-details', setFetching, {
            actionOnSuccess: (data) => {
                console.log(data);
                setData(data as OrderDetailsType[]);
            },
            actionOnFailure: (err) => console.error(err)
        });
        setFetching(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return { data, fetching, getProducts, addProduct, deleteProduct };
};
