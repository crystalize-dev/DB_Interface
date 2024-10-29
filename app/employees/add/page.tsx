'use client';
import Icon from '@/app/components/Icon/Icon';
import Button from '@/app/components/UI/Button';
import Input from '@/app/components/UI/Input';
import { EmployeesContext } from '@/app/context/EmployeesContext';
import { EmployeeType } from '@/app/types/DataTypes';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useContext, useState } from 'react';

const AddEmployeePage = () => {
    const [fetching, setFetching] = useState(false);

    const router = useRouter();

    const { addEmployee, getPositions } = useContext(EmployeesContext);

    const positions = getPositions();
    const [selectedPosition, setSelectedPosition] = useState<string>();
    const [positionInput, setPositionInput] = useState('');

    const submit = async (e: FormEvent) => {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);
        const fullName = formData.get('employeeName') as string;
        const salary = formData.get('salary') as string;
        const hireDate = formData.get('hireDate') as string;

        const fullNameParts = fullName.split(' ');

        const newEmployee: EmployeeType = {
            FirstName: fullNameParts[0],
            LastName: fullNameParts[1],
            Position: positionInput,
            HireDate: new Date(hireDate),
            Salary: Number(salary)
        };

        await addEmployee(newEmployee, setFetching);
    };

    const handleSelectPosition = (position: string) => {
        setPositionInput(position);
        setSelectedPosition(position);
    };

    const handlePositionType = (value: string) => {
        if (positions.includes(value)) {
            setSelectedPosition(value);
        } else {
            setSelectedPosition(undefined);
        }

        setPositionInput(value);
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
                    Добавление сотрудника
                </h1>
            </div>

            <div className="mt-8 flex h-fit w-fit flex-wrap gap-4">
                <form
                    onSubmit={submit}
                    className="scrollable flex h-fit w-fit min-w-96 resize flex-col gap-4 overflow-hidden rounded-lg border border-solid border-black/20 bg-light-bg"
                >
                    <h1 className="bg-gradient-to-br from-dark-bg to-dark-object p-4 px-6 text-xl font-bold text-white">
                        Новый сотрудник:
                    </h1>

                    <div className="flex w-full grow flex-col gap-4 p-8">
                        <Input
                            disabled={fetching}
                            name="employeeName"
                            type="text"
                            required
                            placeholder="ФИО (через пробел)"
                            className="!w-full"
                            inputClassName="bg-light-object"
                        />

                        <Input
                            disabled={fetching}
                            type="text"
                            required
                            placeholder="Должность"
                            defaultValue={positionInput}
                            className="!w-full"
                            onType={handlePositionType}
                            inputClassName="bg-light-object"
                        />

                        <Input
                            disabled={fetching}
                            type="number"
                            name="salary"
                            required
                            placeholder="Зарплата"
                            className="!w-full"
                            inputClassName="bg-light-object"
                        />

                        <Input
                            disabled={fetching}
                            type="date"
                            name="hireDate"
                            required
                            placeholder="Дата найма"
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
                        Существующие должности:
                    </h1>

                    <div className="scrollable flex w-full grow flex-col gap-4 p-4">
                        {positions.map((position) => (
                            <div
                                key={position}
                                className={`flex cursor-pointer items-center gap-2 rounded-md px-4 py-2 transition-all hover:bg-primary hover:!text-white ${selectedPosition === position && 'bg-primary !text-white'} ${fetching && 'cursor-not-allowed opacity-50'}`}
                                onClick={
                                    fetching
                                        ? undefined
                                        : () => handleSelectPosition(position)
                                }
                            >
                                {selectedPosition === position && (
                                    <Icon icon="ok" />
                                )}

                                {position}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddEmployeePage;
