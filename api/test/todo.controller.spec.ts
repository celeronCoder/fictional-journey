import { Test } from '@nestjs/testing';
import { Todo } from '@prisma/client';
import { TodoController } from '@/todo/todo.controller';
import { TodoService } from '@/todo/todo.service';
import { Response } from '@/interface';
import { TodoModuleMetaData } from '@/todo/todo.module';

describe('TodoController', () => {
  let todoController: TodoController;
  let todoService: TodoService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule(
      TodoModuleMetaData,
    ).compile();

    todoService = moduleRef.get<TodoService>(TodoService);
    todoController = moduleRef.get<TodoController>(TodoController);
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

  describe('getTodoById', () => {
    it('should return a todo', async () => {
      const result: Response<Todo> = {
        status: 'success',
        code: 200,
        message: 'Todo retrieved successfully',
        data: { completed: false, id: 'c32424234234', title: 'test' },
      };

      jest
        .spyOn(todoService, 'getTodo')
        .mockImplementation(async () => result.data);

      expect(await todoController.getTodo('c32424234234')).toEqual(result);
    });
  });

  describe('createTodo', () => {
    it('should create a todo', async () => {
      const result: Response<Todo> = {
        status: 'success',
        code: 201,
        message: 'Todo created successfully',
        data: { completed: false, id: 'c32424234234', title: 'test' },
      };

      jest
        .spyOn(todoService, 'createTodo')
        .mockImplementation(async () => result.data);

      expect(
        await todoController.createTodo({
          completed: false,
          title: 'test',
        }),
      ).toEqual(result);
    });
  });

  describe('deleteTodo', () => {
    it('should delete a todo', async () => {
      const result: Response<Todo> = {
        status: 'success',
        code: 200,
        message: 'Todo deleted successfully',
        data: { completed: false, id: 'c32424234234', title: 'test' },
      };

      jest
        .spyOn(todoService, 'deleteTodo')
        .mockImplementation(async () => result.data);

      expect(await todoController.deleteTodo('c32424234234')).toEqual(result);
    });
  });

  describe('updateTodo', () => {
    it('should update a todo', async () => {
      const result: Response<Todo> = {
        status: 'success',
        code: 200,
        message: 'Todo updated successfully',
        data: { completed: false, id: 'c32424234234', title: 'test' },
      };

      jest
        .spyOn(todoService, 'updateTodo')
        .mockImplementation(async () => result.data);

      expect(
        await todoController.updateTodo(
          {
            completed: false,
            title: 'test',
          },
          'c32424234234',
        ),
      ).toEqual(result);
    });
  });
});
