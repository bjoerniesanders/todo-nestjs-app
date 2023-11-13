// src/todo/controllers/todo.controller.ts
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateToDoDto } from '../dto/request';
import { ToDo } from '../entities/todo.entity';
import { CreateToDoService } from './create-todo.service';

@ApiTags('create')
@Controller('create')
export class CreateToDoController {
  constructor(private readonly createToDoService: CreateToDoService) {}

  /**
   * @method create
   * Creates a new ToDo item based on the provided data.
   *
   * @param {CreateToDoDto} createToDoDto - Data Transfer Object containing information for creating a new ToDo item.
   *
   * @returns {Promise<ToDo>} A promise that resolves with the newly created ToDo item.
   *
   * @HttpCode 201 Created
   * Indicates that the ToDo item has been successfully created.
   *
   * @ApiCreatedResponse Describes the ToDo item that has been successfully created.
   * @ApiBadRequestResponse Indicates invalid input for creating the ToDo item.
   *
   * @throws {BadRequestException} When the input data is invalid or incomplete.
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    description: 'The ToDo has been successfully created.',
    type: ToDo,
  })
  @ApiBadRequestResponse({ description: 'Invalid input.' })
  async create(@Body() createToDoDto: CreateToDoDto): Promise<ToDo> {
    console.log(createToDoDto);
    return this.createToDoService.create(createToDoDto);
  }
}
