'use server';

import { getUserServerSession } from '@/auth/actions';
import prisma from '@/lib/prisma';
import { Todo } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export const sleep = (seconds: number) =>
  new Promise((resolve) => setTimeout(resolve, seconds * 1000));

export const toggleTodo = async (
  id: string,
  completed: boolean
): Promise<Todo> => {
  await sleep(3);

  const user = await getUserServerSession();

  if (!user) {
    throw new Error('Unauthorized');
  }

  const todo = await prisma.todo.findFirst({ where: { id, userId: user.id } });

  if (!todo) {
    throw new Error(`Todo with ID ${id} does not exist`);
  }

  const updatedTodo = await prisma.todo.update({
    where: { id },
    data: { completed },
  });

  revalidatePath('/dashboard/server-todos');

  return updatedTodo;
};

export const addTodo = async (description: string) => {
  try {
    const user = await getUserServerSession();

    if (!user) {
      throw new Error('User not found');
    }

    const todo = await prisma.todo.create({
      data: { description, userId: user.id },
    });
    revalidatePath('/dashboard/server-todos');

    return todo;
  } catch (error) {
    return {
      message: 'Error creating todo',
    };
  }
};

export const deleteCompleted = async () => {
  const user = await getUserServerSession();

  if (!user) {
    throw new Error('Unauthorized');
  }

  try {
    await prisma.todo.deleteMany({
      where: {
        completed: true,
        userId: user.id,
      },
    });

    revalidatePath('/dashboard/server-todos');
  } catch (error) {
    return {
      message: 'Error deleting todos',
    };
  }
};
