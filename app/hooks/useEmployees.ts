import { useEffect, useState } from 'react';
import { EmployeeType } from '../types/DataTypes';
import { customAxios } from '@/axios/customAxios';
import toast from 'react-hot-toast';

export const useEmployees = () => {
    const [employees, setEmployees] = useState<EmployeeType[]>([]);
    const [fetchingEmployees, setFetchingEmployees] = useState(false);

    const API = 'employees';

    const addEmployee = async (
        employee: EmployeeType,
        setFetching: React.Dispatch<React.SetStateAction<boolean>>
    ) => {
        await customAxios('POST', API, setFetching, {
            data: employee,
            loadingString: 'Добавляем сотрудника...',
            successString: 'Сотрудник добавлен!',
            actionOnSuccess: (data) => {
                setEmployees([...employees, data as EmployeeType]);
            }
        });
    };

    const removeEmployee = async (
        employeeID: number,
        setFetching: React.Dispatch<React.SetStateAction<boolean>>
    ) => {
        await customAxios('DELETE', API, setFetching, {
            data: { employeeID },
            loadingString: 'Удаляем сотрудника...',
            successString: 'Сотрудник удален!',
            actionOnSuccess: () => {
                setEmployees(
                    employees.filter((e) => e.EmployeeID !== employeeID)
                );
            }
        });
    };

    const updateEmployee = async (
        updatedEmployee: EmployeeType,
        setFetching: React.Dispatch<React.SetStateAction<boolean>>
    ) => {
        await customAxios('PUT', API, setFetching, {
            data: updatedEmployee,
            loadingString: 'Обновляем данные сотрудника...',
            successString: 'Изменения сохранены!',
            actionOnSuccess: () => {
                setEmployees(
                    employees.map((e) =>
                        e.EmployeeID === updatedEmployee.EmployeeID
                            ? updatedEmployee
                            : e
                    )
                );
            }
        });
    };

    useEffect(() => {
        setFetchingEmployees(true);

        customAxios('GET', 'employees', setFetchingEmployees, {
            actionOnSuccess: (data) => {
                setEmployees(data as EmployeeType[]);
            },
            actionOnFailure: () => {
                toast.error('Ошибка подключения к БД!');
            }
        }).then(() => setFetchingEmployees(false));
    }, []);

    return {
        employees,
        fetchingEmployees,
        addEmployee,
        removeEmployee,
        updateEmployee
    };
};
