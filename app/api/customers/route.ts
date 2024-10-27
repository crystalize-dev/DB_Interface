import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
    try {
        return NextResponse.json(await prisma.customers.findMany(), {
            status: 200
        });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    const { customerID } = await req.json();

    try {
        return NextResponse.json(
            await prisma.customers.delete({
                where: { CustomerID: customerID }
            }),
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    const { FirstName, LastName, PhoneNumber, Email, BirthDate, Address } =
        await req.json();

    if (
        !FirstName ||
        !LastName ||
        !PhoneNumber ||
        !Email ||
        !BirthDate ||
        !Address
    ) {
        return NextResponse.json(
            { error: 'Missing required fields' },
            { status: 400 }
        );
    }

    try {
        const newCustomer = await prisma.customers.create({
            data: {
                FirstName,
                LastName,
                PhoneNumber,
                Email,
                BirthDate,
                Address
            }
        });

        return NextResponse.json(newCustomer, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    const newCustomer = await req.json();

    try {
        return NextResponse.json(
            await prisma.customers.update({
                data: {
                    FirstName: newCustomer.FirstName,
                    LastName: newCustomer.LastName,
                    PhoneNumber: newCustomer.PhoneNumber,
                    BirthDate: newCustomer.BirthDate,
                    Address: newCustomer.Address,
                    Email: newCustomer.Email
                },
                where: { CustomerID: newCustomer.CustomerID }
            }),
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}
