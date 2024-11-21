'use client';
import React, { useContext, useEffect, useState } from 'react';
import { CustomersContext } from '../context/CustomersContext';
import ConfirmWindow from '../components/ConfirmWindow';
import Link from 'next/link';
import Button from '../components/UI/Button';
import Icon from '../components/Icon/Icon';
import Input from '../components/UI/Input';

const CustomersPage = () => {
    const [fetching, setFetching] = useState(false);

    const { customers, removeCustomer } = useContext(CustomersContext);

    const [confirmWindowsVisible, setConfirmWindowsVisible] = useState(false);
    const [customerIDToDelete, setCustomerToDelete] = useState<null | number>(
        null
    );

    console.log(customers);

    const [customersToView, setCustomersToView] = useState(customers);
    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        if (!searchInput) setCustomersToView(customers);
        else {
            setCustomersToView(
                customers.filter((customer) =>
                    (customer.FirstName + ' ' + customer.LastName)
                        .toLowerCase()
                        .includes(searchInput.toLowerCase())
                )
            );
        }
    }, [searchInput, customers]);

    const handleConfirmWindow = (
        e: React.MouseEvent<SVGSVGElement, MouseEvent>,
        customerID: number
    ) => {
        e.stopPropagation();

        if (!customerID) return;

        setCustomerToDelete(customerID);
        setConfirmWindowsVisible(true);
    };

    return (
        <div className="flex h-full w-full flex-col gap-4">
            <ConfirmWindow
                visible={confirmWindowsVisible}
                setVisible={setConfirmWindowsVisible}
                funcOnSuccess={
                    customerIDToDelete
                        ? () => removeCustomer(customerIDToDelete, setFetching)
                        : undefined
                }
                funcOnFailure={() => setCustomerToDelete(null)}
            />

            <div className="flex items-center justify-between">
                <h1 className="text-4xl font-bold text-dark-bg">Клиенты</h1>
                <Link href="/customers/add">
                    <Button
                        type="button"
                        disabled={fetching}
                        variant="colored"
                        buttonClassName="flex items-center gap-1 transition-all"
                    >
                        <Icon icon="plus" className="!size-5" />
                        Добавить клиента
                    </Button>
                </Link>
            </div>

            <div className="flex w-full flex-wrap gap-4">
                <div className="flex flex-col gap-2 rounded-md border border-solid border-black/20 bg-light-bg p-4">
                    <h1 className="text-xl text-zinc-500">Всего клиентов</h1>
                    <p className="text-2xl">{customers.length}</p>
                </div>
            </div>

            <Input
                type="text"
                onType={setSearchInput}
                defaultValue={searchInput}
                placeholder="Найти клинета по ФИО"
                placeholderType="classic"
                inputClassName="bg-white"
            />

            <div className="flex h-fit w-full flex-col overflow-hidden rounded-lg border border-solid border-black/20 bg-light-bg">
                <div className="flex w-full items-center bg-gradient-to-b from-dark-bg to-dark-object p-8 text-xl font-bold text-white">
                    <p className="w-1/5">ФИО</p>
                    <p className="w-1/5">E-mail</p>
                    <p className="w-1/5">Телефон</p>
                    <p className="w-1/5">Адрес</p>
                    <p className="w-1/5">Дата рождения</p>
                </div>

                <div className="scrollable flex w-full grow flex-col">
                    {customersToView.length > 0 ? (
                        customersToView.map(
                            (customer) =>
                                customer && (
                                    <Link
                                        href={`/customers/edit/${customer.CustomerID}`}
                                        key={String(customer.CustomerID)}
                                        className="relative flex w-full items-center border-b border-solid border-black/10 p-8 transition-all last:border-none hover:bg-white hover:shadow-sm"
                                    >
                                        <p className="w-1/5">
                                            {customer.FirstName +
                                                ' ' +
                                                customer.LastName}
                                        </p>
                                        <p className="w-1/5">
                                            {customer.Email}
                                        </p>
                                        <p className="w-1/5">
                                            {customer.PhoneNumber
                                                ? String(customer.PhoneNumber)
                                                : undefined}
                                        </p>
                                        <p className="w-1/5">
                                            {customer.Address}
                                        </p>
                                        <p className="w-1/5">
                                            {customer.BirthDate
                                                ? new Date(
                                                      customer.BirthDate as Date
                                                  ).toLocaleDateString('ru-RU')
                                                : undefined}
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
                                                              customer.CustomerID as number
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

export default CustomersPage;
