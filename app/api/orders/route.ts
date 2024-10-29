import {
    OrderDetailsType,
    OrderType,
    ProductType
} from '@/app/types/DataTypes';
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
    try {
        return NextResponse.json(
            await prisma.orders.findMany({
                include: {
                    OrderDetails: {
                        include: {
                            Products: true
                        }
                    },
                    Customers: true,
                    Employees: true
                }
            }),
            { status: 200 }
        );
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
