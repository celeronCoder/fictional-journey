import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { TodoService } from './todo.service';
import type { Response } from '@/interface';
import { Todo } from '@prisma/client';
import { Server } from 'socket.io';
import { CreateTodoDto } from './dto/todo.dto';
import { ValidationPipe } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origon: '*',
  },
})
export class TodoGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly todoService: TodoService) {}

  @SubscribeMessage('getAllTodos')
  async getAllTodos(): Promise<Response<Todo[]>> {
    try {
      const todos = await this.todoService.getTodos();
      if (todos)
        return {
          status: 'success',
          code: 200,
          data: todos,
          message: 'Todos fetched successfully',
        };

      return {
        status: 'error',
        code: 404,
        message: 'Todos not found',
      };
    } catch (err) {
      return {
        status: 'error',
        code: 500,
        message: 'Something went wrong',
        error: err,
      };
    }
  }

  @SubscribeMessage('getTodo')
  async getTodo(@MessageBody() id: string): Promise<Response<Todo>> {
    try {
      const todo = await this.todoService.getTodo(id);
      if (todo)
        return {
          status: 'success',
          code: 200,
          message: 'Todo retrieved successfully',
          data: todo,
        };

      return {
        status: 'error',
        code: 404,
        message: 'Todo not found',
      };
    } catch (err) {
      return {
        status: 'error',
        code: 500,
        message: 'Sorry something went wrong!',
        error: err,
      };
    }
  }

  @SubscribeMessage('createTodo')
  async createTodo(
    @MessageBody(new ValidationPipe({ whitelist: true })) todo: CreateTodoDto,
  ): Promise<Response<Todo>> {
    try {
      const newTodo = await this.todoService.createTodo(todo);
      if (newTodo) {
        this.server.emit('newMessage', newTodo);
        return {
          status: 'success',
          code: 201,
          message: 'Todo created successfully',
          data: newTodo,
        };
      }

      return {
        status: 'error',
        code: 404,
        message: 'Todo not created',
      };
    } catch (err) {
      return {
        status: 'error',
        code: 500,
        message: 'Sorry something went wrong!',
        error: err,
      };
    }
  }

  @SubscribeMessage('deleteTodo')
  async deleteTodo(@MessageBody() id: string): Promise<Response<Todo>> {
    try {
      const deletedTodo = await this.todoService.deleteTodo(id);

      if (deletedTodo) {
        this.server.emit('deleteMessage', deletedTodo.id);
        return {
          status: 'success',
          code: 200,
          message: 'Todo deleted successfully',
          data: deletedTodo,
        };
      }

      return {
        status: 'error',
        code: 404,
        message: 'Todo not found',
      };
    } catch (err) {
      return {
        status: 'error',
        code: 500,
        message: 'Sorry something went wrong!',
        error: err,
      };
    }
  }

  @SubscribeMessage('updateTodo')
  async updateTodo(
    @MessageBody(new ValidationPipe({ whitelist: true })) todo: Todo,
  ): Promise<Response<Todo>> {
    try {
      const updatedTodo = await this.todoService.updateTodo({ ...todo });
      if (updatedTodo) {
        this.server.emit('updatedMessage', updatedTodo);
        return {
          status: 'success',
          code: 200,
          message: 'Todo updated successfully',
          data: updatedTodo,
        };
      }

      return {
        status: 'error',
        code: 404,
        message: 'Todo not found',
      };
    } catch (err) {
      return {
        status: 'error',
        code: 500,
        message: 'Sorry something went wrong!',
        error: err,
      };
    }
  }
}
