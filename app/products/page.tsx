'use client';
import React, { useContext, useEffect, useState } from 'react';
import Button from '../components/UI/Button';
import Icon from '../components/Icon/Icon';
import Link from 'next/link';
import ConfirmWindow from '../components/ConfirmWindow';
import { ProductsContext } from '../context/ProductsContext';
import Input from '../components/UI/Input';

const ProductsPage = () => {
    const { products, removeProduct } = useContext(ProductsContext);

    const [fetching, setFetching] = useState(false);
    const [confirmWindowsVisible, setConfirmWindowsVisible] = useState(false);
    const [productIDToDelete, setProductToDelete] = useState<null | number>(
        null
    );

    const [productsToView, setProductsToView] = useState(products);
    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        if (!searchInput) setProductsToView(products);
        else {
            setProductsToView(
                products.filter((product) =>
                    (product.ProductName as string)
                        .toLowerCase()
                        .includes(searchInput.toLowerCase())
                )
            );
        }
    }, [searchInput, products]);

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
                <h1 className="text-4xl font-bold text-dark-bg">Товары</h1>
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
                    <h1 className="text-xl text-zinc-500">
                        Всего позиций на складе
                    </h1>
                    <p className="text-2xl">{products.length}</p>
                </div>
                <div className="flex flex-col gap-2 rounded-md border border-solid border-black/20 bg-light-bg p-4">
                    <h1 className="text-xl text-zinc-500">
                        Всего единиц на складе
                    </h1>
                    <p className="text-2xl">
                        {products.reduce(
                            (acc, curr) => acc + Number(curr.StockQuantity),
                            0
                        )}
                    </p>
                </div>
            </div>

            <Input
                type="text"
                onType={setSearchInput}
                defaultValue={searchInput}
                placeholder="Найти товар по наименованию"
                placeholderType="classic"
                inputClassName="bg-white"
            />

            <div className="flex h-fit w-full flex-col overflow-hidden rounded-lg border border-solid border-black/20 bg-light-bg">
                <div className="flex w-full items-center bg-gradient-to-b from-dark-bg to-dark-object p-8 text-xl font-bold text-white">
                    <h3 className="w-1/4">Наименование</h3>
                    <h2 className="w-1/4">Категория</h2>
                    <h2 className="w-1/4">Кол-во</h2>
                    <p className="w-1/4">Цена</p>
                </div>

                <div className="scrollable flex w-full grow flex-col">
                    {productsToView.length > 0 ? (
                        productsToView.map(
                            (product) =>
                                product && (
                                    <Link
                                        href={`/products/edit/${product.ProductID}`}
                                        key={String(product.ProductID)}
                                        className="relative flex w-full items-center border-b border-solid border-black/10 p-8 transition-all last:border-none hover:bg-white hover:shadow-sm"
                                    >
                                        <p className="w-1/4">
                                            {product.ProductName}
                                        </p>
                                        <p className="w-1/4">
                                            {product.Category}
                                        </p>
                                        <p className="w-1/4">
                                            {product.StockQuantity
                                                ? product.StockQuantity
                                                : '0'}
                                        </p>
                                        <p className="w-1/4">
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
                        <div className="flex h-screen w-full items-center justify-center">
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
