'use client';
import AddCustomerWindow from '@/app/components/AddCustomerWindow';
import Icon from '@/app/components/Icon/Icon';
import Button from '@/app/components/UI/Button';
import Input from '@/app/components/UI/Input';
import { CustomersContext } from '@/app/context/CustomersContext';
import { EmployeesContext } from '@/app/context/EmployeesContext';
import { OrdersContext } from '@/app/context/OrdersContext';
import { ProductsContext } from '@/app/context/ProductsContext';
import {
    CustomerType,
    EmployeeType,
    OrderDetailsType,
    OrderType,
    ProductType
} from '@/app/types/DataTypes';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useContext, useState } from 'react';
import toast from 'react-hot-toast';

const OrdersAddPage = () => {
    const [fetching, setFetching] = useState(false);
    const [isVisibleModal, setVisibleModal] = useState(false);

    const router = useRouter();

    const { addOrder } = useContext(OrdersContext);
    const { employees } = useContext(EmployeesContext);
    const { products, updateProduct } = useContext(ProductsContext);
    const { customers } = useContext(CustomersContext);

    const [selectedEmployee, setSelectedEmployee] =
        useState<EmployeeType | null>(null);

    const [selectedCustomer, setSelectedCustomer] =
        useState<CustomerType | null>(null);

    const [orderDetails, setOrderDetails] = useState<OrderDetailsType[]>([]);

    const [orderAddPrice, setOrderAddPrice] = useState<string>('0');

    const submit = async (e: FormEvent) => {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);
        const orderDate = formData.get('orderDate') as string;

        if (
            !selectedEmployee ||
            !selectedCustomer ||
            orderDetails.length === 0
        ) {
            toast.error('Заполните все поля!');
            return;
        }

        if (Number(orderAddPrice) < 0) {
            toast.error('Недопустимое значение цены доп. услуг!');
            return;
        }

        const TotalPrice =
            orderAddPrice && Number(orderAddPrice) > 0
                ? orderDetails.reduce(
                      (acc, curr) => acc + Number(curr.Price),
                      0
                  ) + Number(orderAddPrice)
                : orderDetails.reduce(
                      (acc, curr) => acc + Number(curr.Price),
                      0
                  );

        const newOrder: OrderType = {
            Customers: selectedCustomer,
            Employees: selectedEmployee,
            TotalAmount: TotalPrice,
            OrderDate: new Date(orderDate),
            OrderDetails: orderDetails
        };
        if (newOrder?.OrderDetails)
            for (const detail of newOrder.OrderDetails) {
                if (
                    Number(detail.Products?.StockQuantity) -
                        Number(detail.Quantity) <
                    0
                ) {
                    toast.error('Недостаточное количество товара на складе!');
                    return;
                }
            }

        await addOrder(newOrder, setFetching);

        if (newOrder?.OrderDetails)
            for (const detail of newOrder.OrderDetails) {
                const updatedProduct: ProductType = {
                    ...detail.Products,
                    StockQuantity:
                        Number(detail.Products?.StockQuantity) -
                        Number(detail.Quantity)
                };

                await updateProduct(updatedProduct, setFetching, false);
            }
    };

    const handleProductInput = (product: ProductType, quantity: string) => {
        const quantityNum = Number(quantity);

        if (
            orderDetails.find(
                (p) =>
                    (p.Products as ProductType).ProductID === product.ProductID
            )
        ) {
            setOrderDetails(
                orderDetails.map((detail) =>
                    (detail.Products as ProductType).ProductID ===
                    product.ProductID
                        ? {
                              ...detail,
                              Quantity: quantityNum,
                              Price:
                                  quantityNum * Number(detail.Products?.Price)
                          }
                        : detail
                )
            );
        } else {
            if (quantityNum <= 0) return;

            setOrderDetails([
                ...orderDetails,
                {
                    Products: product,
                    Quantity: quantityNum,
                    Price: quantityNum * Number(product?.Price)
                }
            ]);
        }
    };

    return (
        <div className="scrollable flex h-full w-full flex-col gap-4">
            <AddCustomerWindow
                visible={isVisibleModal}
                setVisible={setVisibleModal}
            />

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

            <div className="mt-8 flex h-fit w-fit gap-4">
                <div className="flex flex-col gap-2">
                    <div className="flex h-fit w-fit min-w-96 resize flex-col gap-4 overflow-hidden rounded-lg border border-solid border-black/20 bg-light-bg">
                        <h1 className="bg-gradient-to-br from-dark-bg to-dark-object p-4 px-8 text-xl font-bold text-white">
                            * Сотрудник:
                        </h1>

                        <div className="scrollable flex w-full grow flex-col gap-4 p-4">
                            {employees.map((employee) => (
                                <div
                                    key={employee.EmployeeID}
                                    className={`flex cursor-pointer items-center gap-2 rounded-md px-4 py-2 transition-all hover:bg-primary hover:!text-white ${selectedEmployee?.EmployeeID === employee.EmployeeID && 'bg-primary !text-white'} ${fetching && 'cursor-not-allowed opacity-50'}`}
                                    onClick={
                                        fetching
                                            ? undefined
                                            : () =>
                                                  setSelectedEmployee(employee)
                                    }
                                >
                                    {selectedEmployee?.EmployeeID ===
                                        employee.EmployeeID && (
                                        <Icon icon="ok" />
                                    )}

                                    {employee.FirstName +
                                        ' ' +
                                        employee.LastName}
                                </div>
                            ))}
                        </div>
                    </div>
                    <form
                        onSubmit={submit}
                        className="scrollable flex h-fit w-fit min-w-96 resize flex-col gap-4 overflow-hidden rounded-lg border border-solid border-black/20 bg-light-bg"
                    >
                        <h1 className="bg-gradient-to-br from-dark-bg to-dark-object p-4 px-6 text-xl font-bold text-white">
                            Новый товар:
                        </h1>

                        <div className="scrollable flex w-full grow flex-col gap-4 p-8">
                            <Input
                                disabled={fetching}
                                type="number"
                                defaultValue={orderAddPrice}
                                onType={setOrderAddPrice}
                                placeholder="Сумма доп. услуг"
                                className="!w-full"
                                inputClassName="bg-light-object"
                            />

                            <Input
                                name="orderDate"
                                disabled={fetching}
                                type="date"
                                required
                                placeholder="* Дата оформления"
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
                </div>

                <div className="flex h-fit w-fit min-w-96 resize flex-col gap-4 overflow-hidden rounded-lg border border-solid border-black/20 bg-light-bg">
                    <h1 className="bg-gradient-to-br from-dark-bg to-dark-object p-4 px-8 text-xl font-bold text-white">
                        * Клиент:
                    </h1>

                    <div className="scrollable flex w-full grow flex-col gap-4 p-4">
                        {customers.map((customer) => (
                            <div
                                key={customer.CustomerID}
                                className={`flex cursor-pointer items-center gap-2 rounded-md px-4 py-2 transition-all hover:bg-primary hover:!text-white ${selectedCustomer?.CustomerID === customer.CustomerID && 'bg-primary !text-white'} ${fetching && 'cursor-not-allowed opacity-50'}`}
                                onClick={
                                    fetching
                                        ? undefined
                                        : () => setSelectedCustomer(customer)
                                }
                            >
                                {selectedCustomer?.CustomerID ===
                                    customer.CustomerID && <Icon icon="ok" />}

                                {customer.FirstName + ' ' + customer.LastName}
                            </div>
                        ))}

                        <div
                            onClick={
                                fetching
                                    ? undefined
                                    : () => setVisibleModal(true)
                            }
                            className={`flex cursor-pointer items-center gap-2 rounded-md px-4 py-2 transition-all hover:bg-primary hover:!text-white ${fetching && 'cursor-not-allowed opacity-50'}`}
                        >
                            <Icon icon="plus" />
                            Добавить
                        </div>
                    </div>
                </div>

                <div className="flex h-fit w-fit min-w-96 resize flex-col gap-4 overflow-hidden rounded-lg border border-solid border-black/20 bg-light-bg">
                    <h1 className="bg-gradient-to-br from-dark-bg to-dark-object p-4 px-8 text-xl font-bold text-white">
                        * Продукт:
                    </h1>

                    <div className="scrollable flex w-full grow flex-col gap-4 p-4">
                        {products
                            .filter(
                                (product) => Number(product.StockQuantity) > 0
                            )
                            .map((product) => (
                                <div
                                    key={product.ProductID}
                                    className="flex items-center justify-between gap-4"
                                >
                                    <div>
                                        <p>{product.ProductName}</p>
                                        <p className="text-xs text-zinc-500">
                                            (На складе - {product.StockQuantity}
                                            )
                                        </p>
                                    </div>
                                    <Input
                                        type="number"
                                        onType={(value) =>
                                            handleProductInput(product, value)
                                        }
                                        className="!w-16"
                                        placeholderType="classic"
                                    />
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrdersAddPage;
