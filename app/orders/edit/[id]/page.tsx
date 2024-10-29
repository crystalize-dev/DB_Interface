'use client';
import Icon from '@/app/components/Icon/Icon';
import Button from '@/app/components/UI/Button';
import Input from '@/app/components/UI/Input';
import { OrdersContext } from '@/app/context/OrdersContext';
import { OrderType } from '@/app/types/DataTypes';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import React, { useContext, useEffect } from 'react';

const OrderEditPage = () => {
    const router = useRouter();
    const { id } = useParams();

    const { orders } = useContext(OrdersContext);

    const [order, setOrder] = React.useState<null | OrderType>(null);

    const calcAddSumm = () => {
        if (!order || !order.TotalAmount || !order.OrderDetails) return;

        return (
            order.TotalAmount -
            order.OrderDetails.reduce(
                (acc, curr) => acc + Number(curr.Price),
                0
            )
        );
    };

    useEffect(() => {
        setOrder(orders.find((o) => o.OrderID === Number(id)) || null);
    }, [id, orders]);

    return (
        <div className="flex h-full w-full flex-col gap-4">
            <div className="flex items-center gap-8">
                <Button
                    onClick={() => router.back()}
                    type="button"
                    variant="colored"
                    buttonClassName="flex items-center gap-1 bg-dark-bg hover:bg-primary transition-all"
                >
                    <Icon icon="arrowLeft" className="!size-5" />
                    Назад
                </Button>
                <h1 className="text-4xl font-bold text-dark-bg">
                    Заказ №{order?.OrderID}
                </h1>
            </div>

            <div className="mt-8 flex h-fit w-fit flex-wrap gap-4">
                <div className="flex h-fit w-fit min-w-96 resize flex-col gap-4 overflow-hidden rounded-lg border border-solid border-black/20 bg-light-bg">
                    <h1 className="bg-gradient-to-br from-dark-bg to-dark-object p-4 px-6 text-xl font-bold text-white">
                        Данные заказа:
                    </h1>

                    <div className="scrollable flex w-full grow flex-col gap-4 p-8">
                        <div className="flex flex-col gap-1">
                            <p className="font-bold">Клиент</p>
                            <Link
                                href={`/customers/edit/${order?.CustomerID}`}
                                className={`flex items-center justify-between gap-2 rounded-md bg-primary px-4 py-2 !text-white transition-all`}
                            >
                                <h2>
                                    {order?.Customers?.FirstName +
                                        ' ' +
                                        order?.Customers?.LastName}
                                </h2>
                            </Link>
                        </div>

                        <div className="flex flex-col gap-1">
                            <p className="font-bold">Сотрудник</p>
                            <Link
                                href={`/employees/edit/${order?.EmployeeID}`}
                                className={`flex items-center justify-between gap-2 rounded-md bg-primary px-4 py-2 !text-white transition-all`}
                            >
                                <h2>
                                    {order?.Employees?.FirstName +
                                        ' ' +
                                        order?.Employees?.LastName}
                                </h2>
                            </Link>
                        </div>

                        <Input
                            type="number"
                            disabled
                            defaultValue={calcAddSumm()}
                            placeholder="Стоимость доп. услуг"
                            className="!w-full"
                            inputClassName="bg-light-object"
                        />

                        <Input
                            type="number"
                            disabled
                            defaultValue={order?.TotalAmount}
                            placeholder="Сумма заказа"
                            className="!w-full"
                            inputClassName="bg-light-object"
                        />
                    </div>
                </div>

                <div className="flex h-fit w-fit min-w-96 resize flex-col gap-4 overflow-hidden rounded-lg border border-solid border-black/20 bg-light-bg">
                    <h1 className="bg-gradient-to-br from-dark-bg to-dark-object p-4 px-8 text-xl font-bold text-white">
                        Корзина:
                    </h1>

                    <div className="scrollable flex w-full grow flex-col gap-4 p-4">
                        {order?.OrderDetails?.map((orderDetail) => (
                            <Link
                                key={orderDetail?.Products?.ProductID}
                                href={`/products/edit/${orderDetail?.Products?.ProductID}`}
                                className={`flex items-center justify-between gap-2 rounded-md bg-primary px-4 py-2 !text-white transition-all`}
                            >
                                <p>{orderDetail.Quantity}</p>
                                <p>{orderDetail.Products?.ProductName}</p>
                                <p>{orderDetail.Products?.Price} Руб.</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderEditPage;
