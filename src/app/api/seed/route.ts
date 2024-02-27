import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function GET(request: Request) {
  await prisma.todo.deleteMany();
  await prisma.user.deleteMany();

  await prisma.user.create({
    data: {
      email: 'test1@google.com',
      password: bcrypt.hashSync('123456', 10),
      roles: ['ADMIN', 'USER'],
      todos: {
        create: [
          {
            description: 'Piedra del alma',
            completed: true,
          },
          {
            description: 'Piedra del poder',
          },
          {
            description: 'Piedra del tiempo',
          },
          {
            description: 'Piedra del espacio',
          },
          {
            description: 'Piedra de la realidad',
          },
        ],
      },
    },
  });

  return NextResponse.json({ message: 'Seed executed' });
}
