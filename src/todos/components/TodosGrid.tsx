'use client';

import { FC } from 'react';
import { Todo } from '@prisma/client';
import { TodoItem } from '.';
import { useRouter } from 'next/navigation';
import { toggleTodo } from '@/todos/actions';

interface TodosGridProps {
  todos?: Todo[];
}

export const TodosGrid: FC<TodosGridProps> = ({ todos = [] }) => {
  const router = useRouter();

  // const toggleTodo = async (id: string, completed: boolean): Promise<Todo> => {
  //   const updatedTodo = await updateTodo(id, completed);
  //   router.refresh();
  //   return updatedTodo;
  // };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} />
      ))}
    </div>
  );
};
