import { TodoCreateDto } from './dto/todo.dto';
import { Injectable } from '@nestjs/common';
import { Todo } from '@prisma/client';
import { PrismaService } from '@/prisma.service';
import { isCuid } from 'cuid';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}

  async getTodos(): Promise<Todo[]> {
    return await this.prisma.todo.findMany({});
  }

  async getTodo(id: string): Promise<Todo> {
    return await this.prisma.todo.findFirst({ where: { id } });
  }

  async createTodo(data: TodoCreateDto): Promise<Todo> {
    return await this.prisma.todo.create({
      data,
    });
  }

  async deleteTodo(id: string): Promise<Todo> {
    return await this.prisma.todo.delete({ where: { id } });
  }

  async updateTodo(data: Todo): Promise<Todo> {
    return await this.prisma.todo.update({
      where: {
        id: data.id,
      },
      data: {
        title: data.title,
        completed: data.completed,
      },
    });
  }

  async isValidId(id: string): Promise<boolean> {
    return isCuid(id);
  }
}
