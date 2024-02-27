import { getUserServerSession } from '@/auth/actions';
import prisma from '@/lib/prisma';
import { Todo } from '@prisma/client';
import { NextResponse } from 'next/server';
import * as yup from 'yup';

interface Segments {
  params: {
    id: string;
  };
}

const getTodo = async (id: string): Promise<Todo | null> => {
  const user = await getUserServerSession();

  if (!user) {
    return null;
  }

  const todo = await prisma.todo.findFirst({
    where: {
      id,
    },
  });

  if (todo?.userId !== user.id) {
    return null;
  }

  return todo;
};

export async function GET(request: Request, { params }: Segments) {
  const { id } = params;

  const todo = await getTodo(id);

  if (!todo) {
    return NextResponse.json(
      { message: `Todo with id ${id} not found` },
      { status: 404 }
    );
  }

  return NextResponse.json(todo);
}

const putSchema = yup.object({
  description: yup.string().optional(),
  completed: yup.boolean().optional(),
});

export async function PUT(request: Request, { params }: Segments) {
  const user = await getUserServerSession();

  if (!user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { id } = params;

  const todo = await getTodo(id);

  if (!todo) {
    return NextResponse.json(
      { message: `Todo with id ${id} not found` },
      { status: 404 }
    );
  }

  try {
    const { description, completed } = await putSchema.validate(
      await request.json()
    );

    const updatedTodo = await prisma.todo.update({
      where: { id, userId: user.id },
      data: {
        description,
        completed,
      },
    });

    return NextResponse.json(updatedTodo);
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}
