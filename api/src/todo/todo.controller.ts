import { TodoCreateDto } from './dto/todo.dto';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { Response } from '@/interface';
import { Todo } from '@prisma/client';
import { ParseCuidPipe } from './pipes/parsecuid.pipe';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async getAllTodos(): Promise<Response<Todo[]>> {
    try {
      const todos = await this.todoService.getTodos();

      if (todos)
        return {
          status: 'success',
          code: 200,
          message: 'Todos retrieved successfully',
          data: todos,
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
        message: 'Sorry something went wrong!',
        error: err,
      };
    }
  }

  @Get('/:id')
  async getTodo(@Param('id') id: string): Promise<Response<Todo>> {
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

  @Post()
  @HttpCode(204)
  async createTodo(@Body() todo: TodoCreateDto): Promise<Response<Todo>> {
    try {
      const newTodo = await this.todoService.createTodo(todo);
      if (newTodo)
        return {
          status: 'success',
          code: 201,
          message: 'Todo created successfully',
          data: newTodo,
        };

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

  @Get('/delete/:id')
  async deleteTodo(@Param('id') id: string): Promise<Response<Todo>> {
    try {
      const deletedTodo = await this.todoService.deleteTodo(id);

      if (deletedTodo)
        return {
          status: 'success',
          code: 200,
          message: 'Todo deleted successfully',
          data: deletedTodo,
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

  @Put('/update/:id')
  async updateTodo(
    @Body() todo: TodoCreateDto,
    @Param('id') id: string,
  ): Promise<Response<Todo>> {
    try {
      const updatedTodo = await this.todoService.updateTodo({ ...todo, id });
      if (updatedTodo)
        return {
          status: 'success',
          code: 200,
          message: 'Todo updated successfully',
          data: updatedTodo,
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
}
