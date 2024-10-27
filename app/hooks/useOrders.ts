import { useEffect, useState } from 'react';
import { OrderType } from '../types/DataTypes';
import { customAxios } from '@/axios/customAxios';
import toast from 'react-hot-toast';

export const useOrders = () => {
    const [orders, setOrders] = useState<OrderType[]>([]);
    const [fetchingOrders, setFetchingOrders] = useState(false);

    const API = 'orders';

    const addOrder = async (
        order: OrderType,
        setFetching: React.Dispatch<React.SetStateAction<boolean>>
    ) => {
        await customAxios('POST', API, setFetching, {
            data: order,
            loadingString: 'Добавляем продажу...',
            successString: 'Продажа добавлена!',
            actionOnSuccess: (data) => {
                setOrders([...orders, data as OrderType]);
            }
        });
    };

    useEffect(() => {
        setFetchingOrders(true);

        customAxios('GET', API, setFetchingOrders, {
            actionOnSuccess: (data) => {
                setOrders(data as OrderType[]);
            },
            actionOnFailure: () => {
                toast.error('Ошибка подключения к БД!');
            }
        }).then(() => setFetchingOrders(false));
    }, []);

    return { orders, fetchingOrders, addOrder };
};
