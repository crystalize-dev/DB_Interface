import { useEffect, useState } from 'react';
import { CustomerType } from '../types/DataTypes';
import { customAxios } from '@/axios/customAxios';
import toast from 'react-hot-toast';

export const useCustomers = () => {
    const [customers, setCustomers] = useState<CustomerType[]>([]);
    const [fetchingCustomers, setFetchingCustomers] = useState(false);

    const API = 'customers';

    const addCustomer = async (
        customer: CustomerType,
        setFetching: React.Dispatch<React.SetStateAction<boolean>>
    ) => {
        await customAxios('POST', API, setFetching, {
            data: customer,
            loadingString: 'Добавляем клиента...',
            successString: 'Клиент добавлен!',
            actionOnSuccess: (data) => {
                setCustomers([...customers, data as CustomerType]);
            }
        });
    };

    const removeCustomer = async (
        customerID: number,
        setFetching: React.Dispatch<React.SetStateAction<boolean>>
    ) => {
        await customAxios('DELETE', API, setFetching, {
            data: { customerID },
            loadingString: 'Удаляем клиента...',
            successString: 'Клиент удален!',
            actionOnSuccess: () => {
                setCustomers(
                    customers.filter((c) => c.CustomerID !== customerID)
                );
            }
        });
    };

    const updateCustomer = async (
        updatedCustomer: CustomerType,
        setFetching: React.Dispatch<React.SetStateAction<boolean>>
    ) => {
        await customAxios('PUT', API, setFetching, {
            data: updatedCustomer,
            loadingString: 'Обновляем данные...',
            successString: 'Изменения сохранены!',
            actionOnSuccess: (data) => {
                setCustomers(
                    customers.map((c) =>
                        c.CustomerID === updatedCustomer.CustomerID
                            ? (data as CustomerType)
                            : c
                    )
                );
            }
        });
    };

    useEffect(() => {
        setFetchingCustomers(true);

        customAxios('GET', API, setFetchingCustomers, {
            actionOnSuccess: (data) => {
                setCustomers(data as CustomerType[]);
            },
            actionOnFailure: () => {
                toast.error('Ошибка подключения к БД!');
            }
        }).then(() => setFetchingCustomers(false));
    }, []);

    return {
        customers,
        fetchingCustomers,
        addCustomer,
        removeCustomer,
        updateCustomer
    };
};
