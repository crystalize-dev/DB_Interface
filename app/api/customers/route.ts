import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

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
