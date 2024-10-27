import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
    try {
        return NextResponse.json(
            await prisma.orderDetails.findMany({
                include: {
                    Orders: {
                        include: {
                            Customers: true,
                            Employees: true
                        }
                    },
                    Products: true
                }
            }),
            { status: 200 }
        );
    } catch (err) {
        return NextResponse.json({ error: err }, { status: 500 });
    }
}
