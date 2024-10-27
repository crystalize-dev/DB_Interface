import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
    try {
        return NextResponse.json(await prisma.employees.findMany(), {
            status: 200
        });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    const { employeeID } = await req.json();

    try {
        return NextResponse.json(
            await prisma.employees.delete({
                where: { EmployeeID: employeeID }
            }),
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    const { FirstName, LastName, Salary, Position, HireDate } =
        await req.json();

    if (!FirstName || !LastName || !Salary || !Position || !HireDate) {
        return NextResponse.json(
            { error: 'Missing required fields' },
            { status: 400 }
        );
    }

    try {
        const newEmployee = await prisma.employees.create({
            data: {
                FirstName,
                LastName,
                Salary,
                Position,
                HireDate
            }
        });

        return NextResponse.json(newEmployee, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    const newEmployee = await req.json();

    try {
        return NextResponse.json(
            await prisma.employees.update({
                data: {
                    FirstName: newEmployee.FirstName,
                    LastName: newEmployee.LastName,
                    Salary: newEmployee.Salary,
                    Position: newEmployee.Position
                },
                where: { EmployeeID: newEmployee.EmployeeID }
            }),
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}
