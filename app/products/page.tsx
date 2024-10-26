'use client';
import React, { useContext, useState } from 'react';
import { DataContext } from '../context/DataContext';
import Button from '../components/UI/Button';
import Icon from '../components/Icon/Icon';
import Link from 'next/link';
import ConfirmWindow from '../components/ConfirmWindow';

const ProductsPage = () => {
    const { getProducts, deleteProduct } = useContext(DataContext);
    const products = getProducts();

    const [confirmWindowsVisible, setConfirmWindowsVisible] = useState(false);
    const [productToDelete, setProductToDelete] = useState<null | Number>(null);

    const handleConfirmWindow = (productID: Number) => {
        if (!productID) return;

        setProductToDelete(productID);
        setConfirmWindowsVisible(true);
    };

    return (
        <div className="flex h-full w-full flex-col gap-4">
            <ConfirmWindow
                visible={confirmWindowsVisible}
                setVisible={setConfirmWindowsVisible}
                funcOnSuccess={
                    productToDelete
                        ? () => deleteProduct(productToDelete)
                        : undefined
                }
                funcOnFailure={() => setProductToDelete(null)}
            />

            <h1 className="text-2xl font-bold text-primary">Товары:</h1>

            <hr className="w-full border border-solid border-primary" />

            {products.length > 0 && (
                <div className="flex w-full rounded-md bg-primary p-4 text-lg font-bold text-white">
                    <h3 className="w-1/3">Категория</h3>
                    <h2 className="w-1/3">Название</h2>
                    <p className="w-1/3">Цена</p>
                </div>
            )}

            <div className="scrollable mt-4 flex w-full grow flex-col gap-8">
                {products.length > 0 ? (
                    products.map(
                        (product) =>
                            product && (
                                <div
                                    key={String(product.ProductID)}
                                    className="flex items-center rounded-md border border-solid border-black/30 p-4"
                                >
                                    <h3 className="w-1/3">
                                        {product.Category}
                                    </h3>
                                    <h2 className="w-1/3">
                                        {product.ProductName}
                                    </h2>
                                    <p className="w-1/3">
                                        {String(product.Price)} руб.
                                    </p>

                                    <Icon
                                        className="!size-8 rounded-md bg-red-500 p-2 text-white"
                                        icon="close"
                                        onClick={() =>
                                            handleConfirmWindow(
                                                product.ProductID
                                            )
                                        }
                                    />
                                </div>
                            )
                    )
                ) : (
                    <div className="flex h-full w-full items-center justify-center">
                        <p className="text-4xl text-zinc-500">Ничего нет!</p>
                    </div>
                )}
            </div>

            <div className="mt-auto flex w-full gap-4">
                <Link href="/products/add">
                    <Button type="button" variant="colored">
                        Добавить товар
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default ProductsPage;
