import { useEffect, useState } from 'react';
import { OrderDetailsType } from '../types/DataTypes';
import { customAxios } from '@/axios/customAxios';
import toast from 'react-hot-toast';

export const useOrders = () => {
    const [orders, setOrders] = useState<OrderDetailsType[]>([]);
    const [fetchingOrders, setFetchingOrders] = useState(false);

    const API = 'orders';

    const addOrder = async (
        order: OrderDetailsType,
        setFetching: React.Dispatch<React.SetStateAction<boolean>>
    ) => {
        await customAxios('POST', API, setFetching, {
            data: order,
            loadingString: 'Добавляем продажу...',
            successString: 'Продажа добавлена!',
            actionOnSuccess: (data) => {
                setOrders([...orders, data as OrderDetailsType]);
            }
        });
    };

    const getSumm = () => {
        return orders.reduce((sum, order) => sum + Number(order.Price), 0);
    };

    useEffect(() => {
        setFetchingOrders(true);

        customAxios('GET', API, setFetchingOrders, {
            actionOnSuccess: (data) => {
                setOrders(data as OrderDetailsType[]);
            },
            actionOnFailure: () => {
                toast.error('Ошибка подключения к БД!');
            }
        }).then(() => setFetchingOrders(false));
    }, []);

    return { orders, fetchingOrders, addOrder, getSumm };
};
