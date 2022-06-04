import { PrismaService } from '@/prisma.service';
import { Todo } from '@prisma/client';
import { TodoController } from '@/todo/todo.controller';
import { TodoService } from '@/todo/todo.service';
import { Response } from '@/interface';

describe('TodoController', () => {
  let todoController: TodoController;
  let prismaService: PrismaService;
  let todoService: TodoService;

  beforeEach(() => {
    prismaService = new PrismaService();
    todoService = new TodoService(prismaService);
    todoController = new TodoController(todoService);
  });

  describe('getTodos', () => {
    it('should return an array of todos', async () => {
      const result: Response<Todo[]> = {
        status: 'success',
        code: 200,
        message: 'Todos retrieved successfully',
        data: [{ completed: false, id: 'c32424234234', title: 'test' }],
      };
      jest
        .spyOn(todoService, 'getTodos')
        .mockImplementation(async () => result.data);

      expect(await todoController.getAllTodos()).toEqual(result);
    });
  });
});
