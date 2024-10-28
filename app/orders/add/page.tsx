'use client';
import Icon from '@/app/components/Icon/Icon';
import Button from '@/app/components/UI/Button';
import Input from '@/app/components/UI/Input';
import { EmployeesContext } from '@/app/context/EmployeesContext';
import { OrdersContext } from '@/app/context/OrdersContext';
import { ProductsContext } from '@/app/context/ProductsContext';
import {
    EmployeeType,
    OrderDetailsType,
    ProductType
} from '@/app/types/DataTypes';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useContext, useState } from 'react';

const OrdersAddPage = () => {
    const [fetching, setFetching] = useState(false);

    const router = useRouter();

    const { orders, addOrder } = useContext(OrdersContext);
    const { employees } = useContext(EmployeesContext);
    const { products } = useContext(ProductsContext);

    const [selectedEmployee, setSelectedEmployee] =
        useState<EmployeeType | null>(null);
    const [employeeInput, setEmployeeInput] = useState<string | null>('');

    const [selectedProducts, setSelectedProducts] =
        useState<ProductType | null>(null);
    const [productInput, setProductInput] = useState<string | null>('');

    const submit = async (e: FormEvent) => {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);

        const newOrder: OrderDetailsType = {};

        await addOrder(newOrder, setFetching);
    };

    const handleSelectEmployee = (employee: EmployeeType) => {
        setEmployeeInput(employee.FirstName + ' ' + employee.LastName);
        setSelectedEmployee(employee);
    };

    const handleEmployeeType = (employee: EmployeeType) => {
        if (employees.find((e) => e.EmployeeID === employee.EmployeeID)) {
            setSelectedEmployee(employee);
        } else {
            setSelectedEmployee(null);
        }

        setEmployeeInput(employee.FirstName + ' ' + employee.LastName);
    };

    const handleSelectProduct = (product: ProductType) => {
        setProductInput(String(product.ProductName));
        setSelectedProducts(product);
    };

    const handleProdcutType = (product: ProductType) => {
        if (products.find((p) => p.ProductID === product.ProductID)) {
            setSelectedProducts(product);
        } else {
            setSelectedProducts(null);
        }

        setEmployeeInput(String(product.ProductName));
    };

    return (
        <div className="flex h-full w-full flex-col gap-4">
            <div className="flex items-center gap-8">
                <Button
                    onClick={() => router.back()}
                    type="button"
                    variant="colored"
                    disabled={fetching}
                    buttonClassName="flex items-center gap-1 bg-dark-bg hover:bg-primary transition-all"
                >
                    <Icon icon="arrowLeft" className="!size-5" />
                    Назад
                </Button>
                <h1 className="text-4xl font-bold text-dark-bg">
                    Добавление заказа
                </h1>
            </div>

            <div className="mt-8 flex h-fit w-fit flex-wrap gap-4">
                <form
                    onSubmit={submit}
                    className="flex h-fit w-fit min-w-96 resize flex-col gap-4 overflow-hidden rounded-lg border border-solid border-black/20 bg-light-bg"
                >
                    <h1 className="bg-gradient-to-br from-dark-bg to-dark-object p-4 px-6 text-xl font-bold text-white">
                        Новый товар:
                    </h1>

                    <div className="flex w-full grow flex-col gap-4 p-8">
                        <Input
                            disabled={fetching}
                            name="productName"
                            type="text"
                            required
                            placeholder="Наименование товара"
                            className="!w-full"
                            inputClassName="bg-light-object"
                        />

                        <Input
                            disabled={fetching}
                            type="number"
                            name="productPrice"
                            required
                            placeholder="Цена"
                            className="!w-full"
                            inputClassName="bg-light-object"
                        />

                        <Input
                            disabled={fetching}
                            type="text"
                            required
                            placeholder="Категория"
                            className="!w-full"
                            inputClassName="bg-light-object"
                        />

                        <Button
                            disabled={fetching}
                            type="submit"
                            variant="colored"
                            className="mt-auto w-full"
                            buttonClassName="bg-dark-object hover:bg-primary transition-all"
                        >
                            Добавить
                        </Button>
                    </div>
                </form>

                <div className="flex h-fit w-fit min-w-96 resize flex-col gap-4 overflow-hidden rounded-lg border border-solid border-black/20 bg-light-bg">
                    <h1 className="bg-gradient-to-br from-dark-bg to-dark-object p-4 px-8 text-xl font-bold text-white">
                        Сотрудник:
                    </h1>

                    <div className="scrollable flex w-full grow flex-col gap-4 p-4">
                        {employees.map((employee) => (
                            <div
                                key={employee.EmployeeID}
                                className={`flex cursor-pointer items-center gap-2 rounded-md px-4 py-2 transition-all hover:bg-primary hover:!text-white ${selectedEmployee?.EmployeeID === employee.EmployeeID && 'bg-primary !text-white'} ${fetching && 'cursor-not-allowed opacity-50'}`}
                                onClick={
                                    fetching
                                        ? undefined
                                        : () => handleSelectEmployee(employee)
                                }
                            >
                                {selectedEmployee?.EmployeeID ===
                                    employee.EmployeeID && <Icon icon="ok" />}

                                {employee.FirstName + ' ' + employee.LastName}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrdersAddPage;
