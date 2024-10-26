export type CustomerType = {
    CustomerID: Number;
    FirstName?: String;
    LastName?: String;
    PhoneNumber?: String;
    Email?: String;
    BirthDate?: Date;
    Address?: String;
    Orders: OrderType[];
};

export type OrderType = {
    OrderID: Number;
    CustomerID?: Number;
    EmployeeID?: Number;
    OrderDate?: Date;
    TotalAmount?: Number;
    OrderDetails: OrderDetailsType[];
    Customers?: CustomerType;
    Employees?: EmployeeType;
};

export type OrderDetailsType = {
    OrderDetailID: Number;
    OrderID?: Number;
    ProductID?: Number;
    Quantity?: Number;
    Price?: Number;
    Orders?: OrderType;
    Products?: ProductType;
};

export type EmployeeType = {
    EmployeeID: Number;
    FirstName?: String;
    LastName?: String;
    Position?: String;
    HireDate?: Date;
    Salary?: Number;
    Orders: OrderType;
};

export type ProductType = {
    ProductID: Number;
    ProductName?: String;
    Category?: String;
    Price?: Number;
    StockQuantity?: Number;
    OrderDetails: OrderDetailsType;
};
