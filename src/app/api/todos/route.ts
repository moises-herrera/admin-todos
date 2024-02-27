import { getUserServerSession } from '@/auth/actions';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import * as yup from 'yup';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const take = Number(searchParams.get('take') ?? '10');
  const skip = Number(searchParams.get('skip') ?? '0');

  if (isNaN(take) || isNaN(skip)) {
    return NextResponse.json(
      { message: 'Invalid parameters' },
      { status: 400 }
    );
  }

  const todos = await prisma.todo.findMany({
    take,
    skip,
  });

  return NextResponse.json(todos);
}

const postSchema = yup.object({
  description: yup.string().required(),
  completed: yup.boolean().optional().default(false),
});

export async function POST(request: Request) {
  try {
    const user = await getUserServerSession();

    if (!user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { description, completed } = await postSchema.validate(
      await request.json()
    );
    const todo = await prisma.todo.create({
      data: { description, completed, userId: user.id },
    });

    return NextResponse.json(todo);
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  const user = await getUserServerSession();

  if (!user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    await prisma.todo.deleteMany({
      where: {
        completed: true,
        userId: user.id,
      },
    });

    return NextResponse.json({ message: 'Deleted completed todos' });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
