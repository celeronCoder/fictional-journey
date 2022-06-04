import { ApiProperty } from '@nestjs/swagger';

export class CreateTodoDto {
  @ApiProperty({
    name: 'title',
    description: 'Title of the todo',
    example: 'Buy milk',
  })
  title: string;
  @ApiProperty({
    name: 'completed',
    description: 'Whether the todo is completed',
    example: false,
  })
  completed: boolean;
}
