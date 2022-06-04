import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsBoolean, IsString } from "class-validator"

export class CreateTodoDto {
  @ApiProperty({
    name: 'title',
    description: 'Title of the todo',
    example: 'Buy milk',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    name: 'completed',
    description: 'Whether the todo is completed',
    example: false,
  })
  @IsNotEmpty()
  @IsBoolean()
  completed: boolean;
}
