import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateToDoDto {
  @ApiPropertyOptional({
    description: 'The updated title of the ToDo item',
    example: 'Complete project report',
    required: false,
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({
    description: 'The updated description of the ToDo item',
    maxLength: 128,
    example: 'Include all recent project updates and financial data',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(128)
  description?: string;
}
