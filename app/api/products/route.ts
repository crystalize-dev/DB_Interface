import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
    try {
        return NextResponse.json(await prisma.products.findMany(), {
            status: 200
        });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    const { productId } = await req.json();

    try {
        return NextResponse.json(
            await prisma.products.delete({ where: { ProductID: productId } }),
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    const { ProductName, Category, Price } = await req.json();

    if (!ProductName || !Category || !Price) {
        return NextResponse.json(
            { error: 'Missing required fields' },
            { status: 400 }
        );
    }

    try {
        const newProduct = await prisma.products.create({
            data: {
                ProductName,
                Category,
                Price
            }
        });

        return NextResponse.json(newProduct, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    const newProduct = await req.json();

    try {
        return NextResponse.json(
            await prisma.products.update({
                data: {
                    ProductName: newProduct.ProductName,
                    Category: newProduct.Category,
                    Price: newProduct.Price,
                    StockQuantity: newProduct.StockQuantity
                },
                where: { ProductID: newProduct.ProductID }
            }),
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}
