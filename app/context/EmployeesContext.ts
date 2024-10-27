import { createContext } from 'react';
import { EmployeeType } from '../types/DataTypes';

type EmployeesContextType = {
    employees: EmployeeType[];
    fetchingEmployees: boolean;
    addEmployee: (
        employee: EmployeeType,
        setFetching: React.Dispatch<React.SetStateAction<boolean>>
    ) => void;
    removeEmployee: (
        employeeId: number,
        setFetching: React.Dispatch<React.SetStateAction<boolean>>
    ) => void;
    updateEmployee: (
        updatedEmployee: EmployeeType,
        setFetching: React.Dispatch<React.SetStateAction<boolean>>
    ) => void;
    getPositions: () => string[];
};

export const EmployeesContext = createContext<EmployeesContextType>({
    employees: [],
    fetchingEmployees: false,
    addEmployee: () => {},
    removeEmployee: () => {},
    updateEmployee: () => {},
    getPositions: () => []
});
