import { useEffect, useState } from 'react';
import { OrderType } from '../types/DataTypes';
import { customAxios } from '@/axios/customAxios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export const useOrders = () => {
    const [orders, setOrders] = useState<OrderType[]>([]);
    const [fetchingOrders, setFetchingOrders] = useState(false);

    const router = useRouter();

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
                router.push(`/${API}`);
            }
        });
    };

    const getSumm = () => {
        return orders.reduce(
            (sum, order) => sum + Number(order.TotalAmount),
            0
        );
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

    return { orders, fetchingOrders, addOrder, getSumm };
};
