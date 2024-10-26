'use client';
import React from 'react';
import { DataContext } from './context/DataContext';
import { useData } from './hooks/useData';
import { InfinitySpin } from 'react-loader-spinner';
import Aside from './components/Aside';
import { Toaster } from 'react-hot-toast';

export const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
    const { data, fetching, getProducts, addProduct, deleteProduct } =
        useData();

    return (
        <DataContext.Provider
            value={{ data, getProducts, addProduct, deleteProduct }}
        >
            <main className="">
                <Toaster />

                {fetching ? (
                    <div className="flex h-screen w-screen items-center justify-center">
                        <InfinitySpin color="var(--primary)" />
                    </div>
                ) : (
                    <main className="flex h-screen w-full">
                        <Aside />

                        <div className="flex h-full grow flex-col p-4">
                            {children}
                        </div>
                    </main>
                )}
            </main>
        </DataContext.Provider>
    );
};
