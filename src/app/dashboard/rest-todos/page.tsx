export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { getUserServerSession } from '@/auth/actions';
import prisma from '@/lib/prisma';
import { NewTodo, TodosGrid } from '@/todos/components';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {};

export default async function RestTodosPage() {
  const user = await getUserServerSession();
  if (!user) redirect('/api/auth/signin');

  const todos = await prisma.todo.findMany({
    where: { userId: user?.id },
    orderBy: { description: 'asc' },
  });

  return (
    <div>
      <div className="w-full px-3 mx-7 mb-5">
        <NewTodo />
      </div>
      <TodosGrid todos={todos} />
    </div>
  );
}
