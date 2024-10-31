export type ProcedureType = {
    link: procedureNameType;
    label: string;
};

export type procedureNameType =
    | 'productivity'
    | 'sales-by-customer'
    | 'sales-by-month';

export type ProductivityType = {
    EmployeeID: string;
    FirstName: string;
    LastName: string;
    TotalOrders: String;
    TotalSales: string;
};

export type SalesByCustomerType = {
    CustomerID: string;
    FirstName: string;
    LastName: string;
    TotalOrders: string;
    TotalSales: string;
};

export type SalesByMonth = {
    SalesYear: string;
    SalesMonth: string;
    TotalOrders: string;
    TotalSalesAmount: string;
};
