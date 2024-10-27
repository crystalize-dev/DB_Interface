'use client';
import React from 'react';
import { InfinitySpin } from 'react-loader-spinner';
import Aside from './components/Aside';
import { Toaster } from 'react-hot-toast';
import { useProducts } from './hooks/useProducts';
import { ProductsContext } from './context/ProductsContext';
import { useOrders } from './hooks/useOrders';
import { useEmployees } from './hooks/useEmployees';
import { EmployeesContext } from './context/EmployeesContext';
import { OrdersContext } from './context/OrdersContext';
import { useCustomers } from './hooks/useCustomers';
import { CustomersContext } from './context/CustomersContext';

export const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Toaster />

            <DataProvider>
                <main className="flex h-screen w-full">
                    <Aside />

                    <div className="flex h-full grow flex-col bg-light-object p-8">
                        {children}
                    </div>
                </main>
            </DataProvider>
        </>
    );
};

const DataProvider = ({ children }: { children: React.ReactNode }) => {
    const {
        products,
        addProduct,
        fetchingProducts,
        getCategories,
        removeProduct,
        updateProduct
    } = useProducts();

    const { orders, addOrder, fetchingOrders } = useOrders();

    const {
        employees,
        addEmployee,
        fetchingEmployees,
        removeEmployee,
        updateEmployee
    } = useEmployees();

    const {
        customers,
        fetchingCustomers,
        addCustomer,
        removeCustomer,
        updateCustomer
    } = useCustomers();

    return (
        <CustomersContext.Provider
            value={{
                customers,
                fetchingCustomers,
                addCustomer,
                removeCustomer,
                updateCustomer
            }}
        >
            <OrdersContext.Provider
                value={{ orders, addOrder, fetchingOrders }}
            >
                <EmployeesContext.Provider
                    value={{
                        employees,
                        addEmployee,
                        fetchingEmployees,
                        removeEmployee,
                        updateEmployee
                    }}
                >
                    <ProductsContext.Provider
                        value={{
                            products,
                            addProduct,
                            fetchingProducts,
                            getCategories,
                            removeProduct,
                            updateProduct
                        }}
                    >
                        {fetchingProducts ||
                        fetchingOrders ||
                        fetchingEmployees ||
                        fetchingCustomers ? (
                            <div className="flex h-screen w-screen items-center justify-center">
                                <InfinitySpin color="var(--primary)" />
                            </div>
                        ) : (
                            children
                        )}
                    </ProductsContext.Provider>
                </EmployeesContext.Provider>
            </OrdersContext.Provider>
        </CustomersContext.Provider>
    );
};
