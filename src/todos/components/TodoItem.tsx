'use client';

import { FC, startTransition, useOptimistic } from 'react';
import { Todo } from '@prisma/client';
import styles from './TodoItem.module.css';
import { IoCheckboxOutline, IoSquareOutline } from 'react-icons/io5';

interface TodoItemProps {
  todo: Todo;
  toggleTodo: (id: string, completed: boolean) => Promise<Todo>;
}

export const TodoItem: FC<TodoItemProps> = ({ todo, toggleTodo }) => {
  const [optimisticTodo, toggleOptimisticTodo] = useOptimistic(
    todo,
    (state, newCompletedValue: boolean) => ({
      ...state,
      completed: newCompletedValue,
    })
  );

  const onToggleTodo = async () => {
    try {
      startTransition(() => toggleOptimisticTodo(!optimisticTodo.completed));
      await toggleTodo(optimisticTodo.id, !optimisticTodo.completed);
    } catch (error) {
      startTransition(() => toggleOptimisticTodo(!optimisticTodo.completed));
    }
  };

  return (
    <div
      className={
        optimisticTodo.completed ? styles['todo-done'] : styles['todo-pending']
      }
    >
      <div className="flex flex-col sm:flex-row justify-start items-center gap-4">
        <div
          onClick={onToggleTodo}
          className={`flex p-2 rounded-md cursor-pointer hover:bg-opacity-60 ${
            optimisticTodo.completed ? 'bg-blue-100' : 'bg-red-100'
          }`}
        >
          {optimisticTodo.completed ? (
            <IoCheckboxOutline size={30} />
          ) : (
            <IoSquareOutline size={30} />
          )}
        </div>

        <div className="text-center sm:text-left">
          {optimisticTodo.description}
        </div>
      </div>
    </div>
  );
};
