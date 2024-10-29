'use client';
import Icon from '@/app/components/Icon/Icon';
import Button from '@/app/components/UI/Button';
import { useRouter } from 'next/navigation';
import React from 'react';
import AddCustomerForm from './AddCustomerForm';

const AddCustomerPage = () => {
    const router = useRouter();
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
                    Добавление клиента
                </h1>
            </div>

            <AddCustomerForm />
        </div>
    );
};

export default AddCustomerPage;
