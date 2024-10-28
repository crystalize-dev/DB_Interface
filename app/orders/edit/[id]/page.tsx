'use client';
import Icon from '@/app/components/Icon/Icon';
import Button from '@/app/components/UI/Button';
import Input from '@/app/components/UI/Input';
import { CustomersContext } from '@/app/context/CustomersContext';
import { EmployeesContext } from '@/app/context/EmployeesContext';
import { OrdersContext } from '@/app/context/OrdersContext';
import { OrderDetailsType } from '@/app/types/DataTypes';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';

const OrderEditPage = () => {
    const [fetching, setFetching] = useState(false);

    const router = useRouter();
    const { id } = useParams();

    const { orders } = useContext(OrdersContext);
    const { employees } = useContext(EmployeesContext);
    const { customers } = useContext(CustomersContext);

    const [order, setOrder] = React.useState<null | OrderDetailsType>(null);

    useEffect(() => {
        setOrder(orders.find((o) => o.OrderDetailID === Number(id)) || null);
    }, [id, orders]);

    return (
        <div className="flex h-full w-full flex-col gap-4">
            <div className="flex items-center gap-8">
                <Button
                    onClick={() => router.back()}
                    type="button"
                    disabled={fetching}
                    variant="colored"
                    buttonClassName="flex items-center gap-1 bg-dark-bg hover:bg-primary transition-all"
                >
                    <Icon icon="arrowLeft" className="!size-5" />
                    Назад
                </Button>
                <h1 className="text-4xl font-bold text-dark-bg">
                    Заказ №{order?.OrderDetailID}
                </h1>
            </div>

            <div className="mt-8 flex h-fit w-fit flex-wrap gap-4">
                <div className="flex h-fit w-fit min-w-96 resize flex-col gap-4 overflow-hidden rounded-lg border border-solid border-black/20 bg-light-bg">
                    <h1 className="bg-gradient-to-br from-dark-bg to-dark-object p-4 px-6 text-xl font-bold text-white">
                        Данные заказа:
                    </h1>

                    <div className="flex w-full grow flex-col gap-4 p-8">
                        <Input
                            disabled
                            type="text"
                            defaultValue={order?.Quantity}
                            placeholder="Кол-во товара"
                            className="!w-full"
                            inputClassName="bg-light-object"
                        />

                        <Input
                            type="number"
                            disabled
                            defaultValue={order?.Price}
                            placeholder="Сумма заказа"
                            className="!w-full"
                            inputClassName="bg-light-object"
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <div className="flex h-fit w-fit min-w-96 flex-col gap-4 overflow-hidden rounded-lg border border-solid border-black/20 bg-light-bg">
                        <h1 className="bg-gradient-to-br from-dark-bg to-dark-object p-4 px-8 text-xl font-bold text-white">
                            Товар:
                        </h1>

                        <div className="scrollable flex w-full grow flex-col gap-4 p-4">
                            <Link href={`/products/edit/${order?.ProductID}`}
                                className={`flex items-center gap-2 rounded-md bg-primary px-4 py-2 !text-white transition-all`}
                            >
                                <Icon icon="ok" />

                                {order?.Products?.ProductName}
                            </Link>
                        </div>
                    </div>

                    <div className="flex h-fit w-fit min-w-96 flex-col gap-4 overflow-hidden rounded-lg border border-solid border-black/20 bg-light-bg">
                        <h1 className="bg-gradient-to-br from-dark-bg to-dark-object p-4 px-8 text-xl font-bold text-white">
                            Ответственный сотрудник:
                        </h1>

                        <div className="scrollable flex w-full grow flex-col gap-4 p-4">
                            <Link
                                href={`/employees/edit/${order?.Orders?.EmployeeID}`}
                                className={`flex items-center gap-2 rounded-md bg-primary px-4 py-2 !text-white transition-all`}
                            >
                                <Icon icon="ok" />

                                {order?.Orders?.Employees?.FirstName +
                                    ' ' +
                                    order?.Orders?.Employees?.LastName}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderEditPage;
