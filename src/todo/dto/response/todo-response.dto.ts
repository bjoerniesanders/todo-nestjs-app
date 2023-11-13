import { ApiProperty } from '@nestjs/swagger';

export class ToDoResponseDto {
  @ApiProperty({
    description: 'The unique identifier of the ToDo item',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'The title of the ToDo item',
    example: 'Buy groceries',
  })
  title: string;

  @ApiProperty({
    description: 'The description of the ToDo item',
    maxLength: 128,
    example: 'Milk, Bread, Eggs, and Butter',
  })
  description: string;

  @ApiProperty({
    description: 'The date and time when the ToDo item was created',
    example: '2023-11-09T12:00:00Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'The date and time when the ToDo item was last updated',
    example: '2023-11-10T15:00:00Z',
  })
  updatedAt: Date;
}
