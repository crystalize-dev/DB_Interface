'use client';
import Productivity from '@/app/components/proceduresTables/Productivity';
import SalesByCustomer from '@/app/components/proceduresTables/SalesByCustomer';
import SalesByMonths from '@/app/components/proceduresTables/SalesByMonths';
import Button from '@/app/components/UI/Button';
import { procedures } from '@/app/data/procedures';
import {
    procedureNameType,
    ProcedureType,
    ProductivityType,
    SalesByCustomerType,
    SalesByMonth
} from '@/app/types/ProcedureTypes';
import { customAxios } from '@/axios/customAxios';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { InfinitySpin } from 'react-loader-spinner';

const ProcedurePage = () => {
    const { procedureName }: { procedureName: procedureNameType } = useParams();

    const router = useRouter();

    type TablesType =
        | ProductivityType[]
        | SalesByCustomerType[]
        | SalesByMonth[];

    const [data, setData] = useState<TablesType>([]);
    const [fetching, setFetching] = useState(false);

    const ProcedureTable = () => {
        if (procedureName === 'productivity' && Array.isArray(data)) {
            return <Productivity data={data as ProductivityType[]} />;
        } else if (
            procedureName === 'sales-by-customer' &&
            Array.isArray(data)
        ) {
            return <SalesByCustomer data={data as SalesByCustomerType[]} />;
        } else if (procedureName === 'sales-by-month' && Array.isArray(data)) {
            return <SalesByMonths data={data as SalesByMonth[]} />;
        }
        return null;
    };

    useEffect(() => {
        customAxios('POST', 'procedures', setFetching, {
            data: { procedureName },
            actionOnSuccess: (responseData) => {
                console.log(responseData);
                setData(responseData as TablesType);
            }
        });
    }, [procedureName]);

    return (
        <div className="flex h-full w-full flex-col gap-4">
            <div className="flex items-center gap-4">
                <Button
                    type="button"
                    variant="colored"
                    onClick={() => router.back()}
                >
                    Назад
                </Button>
                <h1 className="text-4xl font-bold text-dark-bg">
                    Процедура -{' '}
                    {String(
                        (
                            procedures.find(
                                (proc) => proc.link === procedureName
                            ) as ProcedureType
                        ).label
                    )}
                </h1>
            </div>

            {fetching ? (
                <div className="flex h-full w-full items-center justify-center">
                    <InfinitySpin color="var(--primary)" />
                </div>
            ) : (
                <div className="flex h-fit w-full flex-col overflow-hidden rounded-lg border border-solid border-black/20 bg-light-bg">
                    <ProcedureTable />
                </div>
            )}
        </div>
    );
};

export default ProcedurePage;
