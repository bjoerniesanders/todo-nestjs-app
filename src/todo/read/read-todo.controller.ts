import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ToDo } from '../entities/todo.entity';
import { ReadToDoService } from './read-todo.service';

@ApiTags('read')
@Controller('get')
export class ReadToDoController {
  constructor(private readonly readToDoService: ReadToDoService) {}

  /**
   * @method findAll
   * Retrieves all ToDo items.
   *
   * @returns {Promise<ToDo[]>} An array of ToDo items.
   *
   * @HttpCode 200 OK
   * Indicates successful retrieval of all ToDo items.
   */
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: [ToDo] })
  async findAll(): Promise<ToDo[]> {
    return this.readToDoService.findAll();
  }

  /**
   * @method findOne
   * Retrieves a single ToDo item by its ID.
   *
   * @param {number} id - The ID of the ToDo item to retrieve.
   *
   * @returns {Promise<ToDo>} The requested ToDo item.
   *
   * @HttpCode 200 OK
   * Indicates successful retrieval of the specified ToDo item.
   *
   * @throws {NotFoundException} When the ToDo item with the specified ID is not found.
   */
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: ToDo })
  async findOne(@Param('id') id: number): Promise<ToDo> {
    return this.readToDoService.findOne(id);
  }
}
