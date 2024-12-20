'use client';
import Button from '@/app/components/UI/Button';
import Input from '@/app/components/UI/Input';
import { CustomersContext } from '@/app/context/CustomersContext';
import { CustomerType } from '@/app/types/DataTypes';
import React, { FormEvent, useContext, useState } from 'react';

interface AddCustomerFormProps {
    onSubmitFunc?: () => void;
    redirect?: boolean;
}

const AddCustomerForm = ({
    onSubmitFunc,
    redirect = true
}: AddCustomerFormProps) => {
    const [fetching, setFetching] = useState(false);

    const { addCustomer } = useContext(CustomersContext);

    const submit = async (e: FormEvent) => {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);
        const fullName = formData.get('customerName') as string;
        const email = formData.get('email') as string;
        const phone = formData.get('phone') as string;
        const address = formData.get('address') as string;
        const birthDate = formData.get('birthDate') as string;

        const fullNameParts = fullName.split(' ');

        const newCustomer: CustomerType = {
            FirstName: fullNameParts[0],
            LastName: fullNameParts[1],
            PhoneNumber: phone,
            Email: email,
            Address: address,
            BirthDate: new Date(birthDate)
        };

        await addCustomer(newCustomer, setFetching, redirect);

        onSubmitFunc && onSubmitFunc();
    };

    return (
        <form
            onSubmit={submit}
            className="flex h-fit w-fit min-w-96 resize flex-col gap-4 overflow-hidden rounded-lg border border-solid border-black/20 bg-light-bg"
        >
            <h1 className="bg-gradient-to-br from-dark-bg to-dark-object p-4 px-6 text-xl font-bold text-white">
                Новый клиент:
            </h1>

            <div className="scrollable flex w-full grow flex-col gap-4 p-8">
                <Input
                    disabled={fetching}
                    name="customerName"
                    type="text"
                    required
                    placeholder="* ФИО (через пробел)"
                    className="!w-full"
                    inputClassName="bg-light-object"
                />

                <Input
                    disabled={fetching}
                    type="email"
                    name="email"
                    placeholder="E-mail"
                    className="!w-full"
                    inputClassName="bg-light-object"
                />

                <Input
                    disabled={fetching}
                    type="phone"
                    name="phone"
                    placeholder="Телефон"
                    className="!w-full"
                    inputClassName="bg-light-object"
                />

                <Input
                    disabled={fetching}
                    type="text"
                    name="address"
                    placeholder="Адрес"
                    className="!w-full"
                    inputClassName="bg-light-object"
                />

                <Input
                    disabled={fetching}
                    type="date"
                    name="birthDate"
                    placeholder="Дата рождения"
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
    );
};

export default AddCustomerForm;
