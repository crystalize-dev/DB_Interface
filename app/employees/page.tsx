'use client';
import Link from 'next/link';
import React, { useContext, useState } from 'react';
import Button from '../components/UI/Button';
import Icon from '../components/Icon/Icon';
import { EmployeesContext } from '../context/EmployeesContext';
import ConfirmWindow from '../components/ConfirmWindow';

const EmployessPage = () => {
    const [fetching, setFetching] = useState(false);

    const { employees, removeEmployee } = useContext(EmployeesContext);

    const [confirmWindowsVisible, setConfirmWindowsVisible] = useState(false);
    const [employeeIDToDelete, setEmployeeToDelete] = useState<null | number>(
        null
    );

    const handleConfirmWindow = (
        e: React.MouseEvent<SVGSVGElement, MouseEvent>,
        employeeID: number
    ) => {
        e.stopPropagation();

        if (!employeeID) return;

        setEmployeeToDelete(employeeID);
        setConfirmWindowsVisible(true);
    };

    return (
        <div className="flex h-full w-full flex-col gap-4">
            <ConfirmWindow
                visible={confirmWindowsVisible}
                setVisible={setConfirmWindowsVisible}
                funcOnSuccess={
                    employeeIDToDelete
                        ? () => removeEmployee(employeeIDToDelete, setFetching)
                        : undefined
                }
                funcOnFailure={() => setEmployeeToDelete(null)}
            />

            <div className="flex items-center justify-between">
                <h1 className="text-4xl font-bold text-dark-bg">Сотрудники</h1>
                <Link href="/employees/add">
                    <Button
                        type="button"
                        disabled={fetching}
                        variant="colored"
                        buttonClassName="flex items-center gap-1 transition-all"
                    >
                        <Icon icon="plus" className="!size-5" />
                        Добавить сотрудника
                    </Button>
                </Link>
            </div>

            <div className="flex w-full flex-wrap gap-4">
                <div className="flex flex-col gap-2 rounded-md border border-solid border-black/20 bg-light-bg p-4">
                    <h1 className="text-xl text-zinc-500">Всего сотрудников</h1>
                    <p className="text-2xl">{employees.length}</p>
                </div>
                <div className="flex flex-col gap-2 rounded-md border border-solid border-black/20 bg-light-bg p-4">
                    <h1 className="text-xl text-zinc-500">
                        Расходы на зарплату
                    </h1>
                    <p className="text-2xl">
                        {employees.reduce(
                            (acc, cur) => (acc += Number(cur.Salary)),
                            0
                        )}{' '}
                        руб.
                    </p>
                </div>
            </div>

            <div className="mt-8 flex h-fit w-full flex-col overflow-hidden rounded-lg border border-solid border-black/20 bg-light-bg">
                <div className="flex w-full items-center bg-gradient-to-b from-dark-bg to-dark-object p-8 text-xl font-bold text-white">
                    <p className="w-1/4">ФИО</p>
                    <p className="w-1/4">Должность</p>
                    <p className="w-1/4">Зарплата</p>
                    <p className="w-1/4">Дата найма</p>
                </div>

                <div className="scrollable flex w-full grow flex-col">
                    {employees.length > 0 ? (
                        employees.map(
                            (employee) =>
                                employee && (
                                    <Link
                                        href={`/employees/edit/${employee.EmployeeID}`}
                                        key={String(employee.EmployeeID)}
                                        className="relative flex w-full items-center border-b border-solid border-black/10 p-8 transition-all last:border-none hover:bg-white hover:shadow-sm"
                                    >
                                        <p className="w-1/4">
                                            {employee.FirstName +
                                                ' ' +
                                                employee.LastName}
                                        </p>
                                        <p className="w-1/4">
                                            {employee.Position}
                                        </p>
                                        <p className="w-1/4">
                                            {employee.Salary}
                                        </p>
                                        <p className="w-1/4">
                                            {new Date(
                                                employee.HireDate as Date
                                            ).toLocaleDateString('ru-RU')}
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
                                                              employee.EmployeeID as number
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

export default EmployessPage;
