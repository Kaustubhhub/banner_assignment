import prisma from "@/app/db";
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
    const data = await prisma.banner.findFirst();
    return Response.json({ data })
}

export async function POST(req: NextRequest) {
    const body = await req.json();
    console.log('body', body);

    const existingBanner = await prisma.banner.findFirst();

    let data;
    if (existingBanner) {
        // Update the existing banner
        data = await prisma.banner.update({
            where: { id: existingBanner.id },
            data: {
                title: body.title,
                description: body.description,
                link: body.link,
                isVisible: body.isVisible,
                endTime: body.endTime,
            },
        });
    } else {
        // Create a new banner entry
        data = await prisma.banner.create({
            data: {
                title: body.title,
                description: body.description,
                link: body.link,
                isVisible: body.isVisible,
                endTime: body.endTime,
            },
        });
    }

    return NextResponse.json({ data })
}