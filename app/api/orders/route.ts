import {
    OrderDetailsType,
    OrderType,
    ProductType
} from '@/app/types/DataTypes';
import { procedureNameType } from '@/app/types/ProcedureTypes';
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
    const decryptCustomerData = async (
        CustomerID: number | undefined | null
    ) => {
        if (!CustomerID) return;

        const response = await fetch('http://localhost:3000/api/procedures', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                procedureName: 'decrypt-one-customer',
                customerID: CustomerID
            } as { procedureName: procedureNameType })
        });

        const res = await response.json();

        return res[0];
    };

    try {
        const data = await prisma.orders.findMany({
            include: {
                OrderDetails: {
                    include: {
                        Products: true
                    }
                },
                Employees: true
            }
        });

        // Используем Promise.all, чтобы дождаться всех асинхронных операций
        const resData = await Promise.all(
            data.map(async (order) => {
                const Order = await prisma.orders.findUnique({
                    where: {
                        OrderID: order.OrderID
                    },
                    select: {
                        CustomerID: true
                    }
                });

                if (!Order) return;

                return {
                    ...order,
                    CustomerID: Order.CustomerID,
                    Customers: await decryptCustomerData(Order.CustomerID)
                };
            })
        );

        return NextResponse.json(resData, { status: 200 });
    } catch (err) {
        return NextResponse.json({ error: err }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    const order: OrderType = await req.json();

    try {
        const newOrder = await prisma.orders.create({
            data: {
                TotalAmount: order.TotalAmount,
                OrderDate: order.OrderDate,
                Customers: {
                    connect: { CustomerID: order.Customers?.CustomerID }
                },
                Employees: {
                    connect: { EmployeeID: order.Employees?.EmployeeID }
                },
                OrderDetails: {
                    createMany: {
                        data: (order.OrderDetails as OrderDetailsType[]).map(
                            (detail) => ({
                                Price: detail.Price,
                                Quantity: detail.Quantity,
                                ProductID: (detail.Products as ProductType)
                                    .ProductID
                            })
                        )
                    }
                }
            },
            include: {
                Customers: true,
                Employees: true,
                OrderDetails: {
                    include: {
                        Products: true
                    }
                }
            }
        });

        return NextResponse.json(newOrder, { status: 201 });
    } catch (err) {
        return NextResponse.json({ error: err }, { status: 500 });
    }
}
