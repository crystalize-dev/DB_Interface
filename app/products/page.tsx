'use client';
import React, { useContext, useState } from 'react';
import Button from '../components/UI/Button';
import Icon from '../components/Icon/Icon';
import Link from 'next/link';
import ConfirmWindow from '../components/ConfirmWindow';
import { ProductsContext } from '../context/ProductsContext';

const ProductsPage = () => {
    const { products, removeProduct, getCategories } =
        useContext(ProductsContext);

    const [fetching, setFetching] = useState(false);
    const [confirmWindowsVisible, setConfirmWindowsVisible] = useState(false);
    const [productIDToDelete, setProductToDelete] = useState<null | number>(
        null
    );

    const handleConfirmWindow = (
        e: React.MouseEvent<SVGSVGElement, MouseEvent>,
        productID: number
    ) => {
        e.stopPropagation();

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
                    productIDToDelete
                        ? () => removeProduct(productIDToDelete, setFetching)
                        : undefined
                }
                funcOnFailure={() => setProductToDelete(null)}
            />

            <div className="flex items-center justify-between">
                <h1 className="text-dark-bg text-4xl font-bold">Товары</h1>
                <Link href="/products/add">
                    <Button
                        type="button"
                        disabled={fetching}
                        variant="colored"
                        buttonClassName="flex items-center gap-1 bg-dark-bg hover:bg-primary transition-all"
                    >
                        <Icon icon="plus" className="!size-5" />
                        Добавить товар
                    </Button>
                </Link>
            </div>

            <div className="flex w-full flex-wrap gap-4">
                <div className="flex flex-col gap-2 rounded-md border border-solid border-black/20 bg-light-bg p-4">
                    <h1 className="text-xl text-zinc-500">Всего товаров</h1>
                    <p className="text-2xl">{products.length}</p>
                </div>
                <div className="flex flex-col gap-2 rounded-md border border-solid border-black/20 bg-light-bg p-4">
                    <h1 className="text-xl text-zinc-500">Всего категорий</h1>
                    <p className="text-2xl">{getCategories().length}</p>
                </div>
            </div>

            <div className="mt-8 flex h-fit w-full flex-col overflow-hidden rounded-lg border border-solid border-black/20 bg-light-bg">
                <div className="from-dark-bg to-dark-object flex w-full items-center bg-gradient-to-br p-4 text-white">
                    <h3 className="w-1/3">Наименование</h3>
                    <h2 className="w-1/3">Категория</h2>
                    <p className="w-1/3">Цена</p>
                </div>

                <div className="scrollable flex w-full grow flex-col">
                    {products.length > 0 ? (
                        products.map(
                            (product) =>
                                product && (
                                    <Link
                                        href={`/products/edit/${product.ProductID}`}
                                        key={String(product.ProductID)}
                                        className="relative flex w-full items-center border-b border-solid border-black/10 p-8 transition-all last:border-none hover:bg-white hover:shadow-sm"
                                    >
                                        <h2 className="w-1/3">
                                            {product.ProductName}
                                        </h2>
                                        <h3 className="w-1/3">
                                            {product.Category}
                                        </h3>
                                        <p className="w-1/3">
                                            {String(product.Price)} руб.
                                        </p>

                                        <Icon
                                            className="absolute right-4 !size-10 rounded-md p-2 text-red-500"
                                            icon="close"
                                            disabled={fetching}
                                            onMouseDown={
                                                fetching
                                                    ? undefined
                                                    : (e) =>
                                                          handleConfirmWindow(
                                                              e,
                                                              product.ProductID as number
                                                          )
                                            }
                                        />
                                    </Link>
                                )
                        )
                    ) : (
                        <div className="flex h-full w-full items-center justify-center">
                            <p className="text-4xl text-zinc-500">
                                Ничего нет!
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductsPage;
