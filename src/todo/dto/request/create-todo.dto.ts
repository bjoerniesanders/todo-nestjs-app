import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateToDoDto {
  @ApiProperty({
    description: 'The title of the ToDo item',
    example: 'Buy groceries',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'The description of the ToDo item',
    maxLength: 128,
    example: 'Milk, Bread, Eggs, and Butter',
  })
  @IsString()
  @MaxLength(128)
  @IsDefined()
  description: string;
}
