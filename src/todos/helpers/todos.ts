import { Todo } from '@prisma/client';

const sleep = (seconds = 0): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, seconds);
  });
}

export const createTodo = async (description: string): Promise<Todo> => {
  const body = { description };
  const todo = await fetch(`/api/todos`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());

  return todo;
};

export const updateTodo = async (
  id: string,
  completed: boolean
): Promise<Todo> => {
  await sleep(2000);
  const body = { completed };
  const todo = await fetch(`/api/todos/${id}`, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());

  return todo;
};

export const deleteCompletedTodos = async (): Promise<boolean> => {
  await fetch(`/api/todos`, {
    method: 'DELETE',
  });

  return true;
}