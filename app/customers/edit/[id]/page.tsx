'use client';
import Icon from '@/app/components/Icon/Icon';
import Button from '@/app/components/UI/Button';
import Input from '@/app/components/UI/Input';
import { CustomersContext } from '@/app/context/CustomersContext';
import { CustomerType } from '@/app/types/DataTypes';
import { useParams, useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';

const EditCustomerPage = () => {
    const [fetching, setFetching] = useState(false);

    const router = useRouter();
    const { id } = useParams();

    const { customers, updateCustomer } = useContext(CustomersContext);

    const [customer, setCustomer] = React.useState<null | CustomerType>(null);

    console.log(customer)

    const submit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);
        const fullName = formData.get('newCustomerName') as string;
        const phone = formData.get('newCustomerPhone') as string;
        const email = formData.get('newCustomerEmail') as string;
        const address = formData.get('newCustomerAddress') as string;
        const birthDate = formData.get('newCustomerBirthDate') as string;

        const fullNameParts = fullName.split(' ');

        const updatedCustomer: CustomerType = {
            ...customer,
            FirstName: fullNameParts[0],
            LastName: fullNameParts[1],
            Address: address,
            PhoneNumber: phone,
            Email: email,
            BirthDate: birthDate ? new Date(birthDate) : undefined
        };

        await updateCustomer(updatedCustomer, setFetching);
    };

    useEffect(() => {
        setCustomer(customers.find((e) => e.CustomerID === Number(id)) || null);
    }, [id, customers]);

    return (
        <div className="flex h-full w-full flex-col gap-4">
            {' '}
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
                    {customer?.FirstName + ' ' + customer?.LastName}
                </h1>
            </div>
            <form
                onSubmit={submit}
                className="flex h-fit w-fit min-w-96 resize flex-col gap-4 overflow-hidden rounded-lg border border-solid border-black/20 bg-light-bg"
            >
                <h1 className="bg-gradient-to-br from-dark-bg to-dark-object p-4 px-6 text-xl font-bold text-white">
                    Изменить товар:
                </h1>

                <div className="scrollable flex w-full grow flex-col gap-4 p-8">
                    <Input
                        disabled={fetching}
                        name="newCustomerName"
                        type="text"
                        required
                        defaultValue={
                            customer?.FirstName + ' ' + customer?.LastName
                        }
                        placeholder="ФИО (через пробел)"
                        className="!w-full"
                        inputClassName="bg-light-object"
                    />

                    <Input
                        disabled={fetching}
                        name="newCustomerEmail"
                        type="email"
                        placeholder="E-mail"
                        defaultValue={customer?.Email}
                        className="!w-full"
                        inputClassName="bg-light-object"
                    />

                    <Input
                        disabled={fetching}
                        type="phone"
                        name="newCustomerPhone"
                        defaultValue={customer?.PhoneNumber}
                        placeholder="Телефон"
                        className="!w-full"
                        inputClassName="bg-light-object"
                    />

                    <Input
                        disabled={fetching}
                        type="text"
                        name="newCustomerAddress"
                        placeholder="Адрес"
                        defaultValue={customer?.Address}
                        className="!w-full"
                        inputClassName="bg-light-object"
                    />

                    <Input
                        disabled={fetching}
                        type="date"
                        name="newCustomerBirthDate"
                        required
                        defaultValue={
                            customer?.BirthDate
                                ? new Date(customer.BirthDate)
                                      .toISOString()
                                      .split('T')[0]
                                : undefined
                        }
                        placeholder="Дата рождения"
                        className="!w-full"
                        inputClassName="bg-light-object"
                    />

                    <Button
                        type="submit"
                        variant="colored"
                        disabled={fetching}
                        className="mt-auto w-full"
                        buttonClassName="bg-dark-object hover:bg-primary transition-all"
                    >
                        Изменить
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default EditCustomerPage;
