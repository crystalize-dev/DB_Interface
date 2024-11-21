import { procedureNameType } from '@/app/types/ProcedureTypes';
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const response = await fetch('http://localhost:3000/api/procedures', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                procedureName: 'decrypt-data'
            } as {
                procedureName: procedureNameType;
            })
        });

        return NextResponse.json(await response.json(), {
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

    if (!FirstName || !LastName) {
        return NextResponse.json(
            { error: 'Missing required fields: ФИО' },
            { status: 400 }
        );
    }

    try {
        const newCustomer = await prisma.customers.create({
            data: {
                FirstName,
                LastName,
                PhoneNumber:
                    PhoneNumber === '+7(___)___-__-__' ? null : PhoneNumber,
                Email,
                BirthDate,
                Address
            }
        });

        await fetch('http://localhost:3000/api/procedures', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                procedureName: 'encrypt-data',
                customerID: newCustomer.CustomerID
            } as { procedureName: procedureNameType })
        });

        return NextResponse.json(newCustomer, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    const newCustomer = await req.json();

    const updatedCustomer = await prisma.customers.update({
        data: {
            FirstName: newCustomer.FirstName,
            LastName: newCustomer.LastName,
            PhoneNumber: newCustomer.PhoneNumber,
            BirthDate: newCustomer.BirthDate,
            Address: newCustomer.Address,
            Email: newCustomer.Email
        },
        where: { CustomerID: newCustomer.CustomerID }
    });

    await fetch('http://localhost:3000/api/procedures', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            procedureName: 'encrypt-data',
            customerID: updatedCustomer.CustomerID
        } as { procedureName: procedureNameType })
    });

    try {
        return NextResponse.json(updatedCustomer, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}
