import { ProductivityType } from '@/app/types/ProcedureTypes';
import Link from 'next/link';
import React from 'react';

const Productivity = ({ data }: { data: ProductivityType[] }) => {
    return (
        <>
            <div className="flex w-full items-center bg-gradient-to-b from-dark-bg to-dark-object p-8 text-xl font-bold text-white">
                <h3 className="w-1/3">Сотрудник</h3>
                <h2 className="w-1/3">Заказов</h2>
                <h2 className="w-1/3">Доходность</h2>
            </div>

            <div className="scrollable flex w-full grow flex-col">
                {data.length > 0 ? (
                    data.map(
                        (row) =>
                            row && (
                                <Link
                                    key={String(row.EmployeeID)}
                                    href={`/emplyees/edit/${row.EmployeeID}`}
                                    className="relative flex w-full items-center border-b border-solid border-black/10 p-8 transition-all last:border-none hover:bg-white hover:shadow-sm"
                                >
                                    <p className="w-1/3">
                                        {row.FirstName + ' ' + row.LastName}
                                    </p>
                                    <p className="w-1/3">{row.TotalOrders}</p>
                                    <p className="w-1/3">{row.TotalSales}</p>
                                </Link>
                            )
                    )
                ) : (
                    <div className="flex h-screen w-full items-center justify-center">
                        <p className="text-4xl text-zinc-500">Ничего нет!</p>
                    </div>
                )}
            </div>
        </>
    );
};

export default Productivity;
