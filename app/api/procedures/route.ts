import { procedureNameType } from '@/app/types/ProcedureTypes';
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    const { procedureName }: { procedureName: procedureNameType } =
        await req.json();

    try {
        switch (procedureName) {
            case 'productivity':
                var data =
                    await prisma.$queryRaw`EXEC GetEmployeeProductivityReport`;

                return NextResponse.json(data, { status: 200 });
            case 'sales-by-customer':
                var data =
                    await prisma.$queryRaw`EXEC GetSalesByCustomerReport`;

                return NextResponse.json(data, { status: 200 });
            case 'sales-by-month':
                var data = await prisma.$queryRaw`EXEC ReportMonthlySales`;

                return NextResponse.json(data, { status: 200 });
            default:
                return NextResponse.json(
                    { error: 'Процедура не найдена!' },
                    { status: 404 }
                );
        }
    } catch (err) {
        return NextResponse.json({ error: err }, { status: 500 });
    }
}
