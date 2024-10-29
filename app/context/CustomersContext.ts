import { createContext } from 'react';
import { CustomerType } from '../types/DataTypes';

type CustomersContextType = {
    customers: CustomerType[];
    fetchingCustomers: boolean;
    addCustomer: (
        customer: CustomerType,
        setFetching: React.Dispatch<React.SetStateAction<boolean>>,
        redirect: boolean
    ) => void;
    removeCustomer: (
        customerID: number,
        setFetching: React.Dispatch<React.SetStateAction<boolean>>
    ) => void;
    updateCustomer: (
        updatedCustomer: CustomerType,
        setFetching: React.Dispatch<React.SetStateAction<boolean>>
    ) => void;
};

export const CustomersContext = createContext<CustomersContextType>({
    customers: [],
    fetchingCustomers: false,
    addCustomer: () => {},
    removeCustomer: () => {},
    updateCustomer: () => {}
});
