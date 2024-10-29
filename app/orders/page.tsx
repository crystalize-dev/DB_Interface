'use client';
import React, { useContext } from 'react';
import { OrdersContext } from '../context/OrdersContext';
import Link from 'next/link';
import Button from '../components/UI/Button';
import Icon from '../components/Icon/Icon';

const OrdersPage = () => {
    const { orders, getSumm } = useContext(OrdersContext);

    return (
        <div className="flex h-full w-full flex-col gap-4">
            <div className="flex items-center justify-between">
                <h1 className="text-4xl font-bold text-dark-bg">Продажи</h1>
                <Link href="/orders/add">
                    <Button
                        type="button"
                        variant="colored"
                        buttonClassName="flex items-center gap-1 bg-dark-bg hover:bg-primary transition-all"
                    >
                        <Icon icon="plus" className="!size-5" />
                        Создать заказ
                    </Button>
                </Link>
            </div>

            <div className="flex w-full flex-wrap gap-4">
                <div className="flex flex-col gap-2 rounded-md border border-solid border-black/20 bg-light-bg p-4">
                    <h1 className="text-xl text-zinc-500">Всего продаж</h1>
                    <p className="text-2xl">{orders.length}</p>
                </div>
                <div className="flex flex-col gap-2 rounded-md border border-solid border-black/20 bg-light-bg p-4">
                    <h1 className="text-xl text-zinc-500">Суммарный доход</h1>
                    <p className="text-2xl">{String(getSumm())}</p>
                </div>
            </div>

            <div className="mt-8 flex h-fit w-full flex-col overflow-hidden rounded-lg border border-solid border-black/20 bg-light-bg">
                <div className="flex w-full items-center bg-gradient-to-b from-dark-bg to-dark-object p-8 text-xl font-bold text-white">
                    <h3 className="w-1/4">ID</h3>
                    <h2 className="w-1/4">Клиент</h2>
                    <p className="w-1/4">Сумма</p>
                    <p className="w-1/4">Дата</p>
                </div>

                <div className="scrollable flex w-full grow flex-col">
                    {orders.length > 0 ? (
                        orders.map(
                            (order) =>
                                order && (
                                    <Link
                                        href={`/orders/edit/${order.OrderID}`}
                                        key={String(order.OrderID)}
                                        className="relative flex w-full items-center border-b border-solid border-black/10 p-8 transition-all last:border-none hover:bg-white hover:shadow-sm"
                                    >
                                        <h2 className="w-1/3">
                                            # {order.OrderID}
                                        </h2>
                                        <h3 className="w-1/3">
                                            {order.Customers?.FirstName +
                                                ' ' +
                                                order.Customers?.LastName}
                                        </h3>
                                        <p className="w-1/3">
                                            {order.TotalAmount} руб.
                                        </p>
                                        <p className="w-1/3">
                                            {order.OrderDate
                                                ? new Date(
                                                      order.OrderDate as Date
                                                  ).toLocaleDateString('ru-RU')
                                                : undefined}
                                        </p>
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

export default OrdersPage;
