export type CustomerType = {
    CustomerID?: number;
    FirstName?: string;
    LastName?: string;
    PhoneNumber?: string;
    Email?: string;
    BirthDate?: Date;
    Address?: string;
    Orders?: OrderType[];
};

export type OrderType = {
    OrderID?: number;
    CustomerID?: number;
    EmployeeID?: number;
    OrderDate?: Date;
    TotalAmount?: number;
    OrderDetails?: OrderDetailsType[];
    Customers?: CustomerType;
    Employees?: EmployeeType;
};

export type OrderDetailsType = {
    OrderDetailID?: number;
    OrderID?: number;
    ProductID?: number;
    Quantity?: number;
    Price?: number;
    Orders?: OrderType;
    Products?: ProductType;
};

export type EmployeeType = {
    EmployeeID?: number;
    FirstName?: string;
    LastName?: string;
    Position?: string;
    HireDate?: Date;
    Salary?: number;
    Orders?: OrderType;
};

export type ProductType = {
    ProductID?: number;
    ProductName?: string;
    Category?: string;
    Price?: number;
    StockQuantity?: number;
    OrderDetails?: OrderDetailsType;
};
