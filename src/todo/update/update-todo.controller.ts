import { Body, Controller, Param, Put } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { UpdateToDoDto } from '../dto/request';
import { ToDoResponseDto } from '../dto/response';
import { UpdateToDoService } from './update-todo.service';

@ApiTags('update')
@Controller('update')
export class UpdateToDoController {
  constructor(private readonly updateToDoService: UpdateToDoService) {}

  /**
   * @method update
   * Updates a specific ToDo item based on the provided ID and data.
   *
   * @param {number} id - The ID of the ToDo item to update.
   * @param {UpdateToDoDto} updateToDoDto - Data transfer object containing updated values for the ToDo item.
   *
   * @returns {Promise<ToDoResponseDto>} A response DTO containing the updated ToDo item.
   *
   * @HttpCode 200 OK
   * Indicates successful update of the ToDo item.
   *
   * @throws {NotFoundException} When the ToDo item with the specified ID is not found.
   * @throws {BadRequestException} When the provided data is invalid.
   */
  @Put(':id')
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'The ID of the ToDo item to update',
  })
  @ApiBody({
    type: UpdateToDoDto,
    description: 'The data to update the ToDo item with',
  })
  @ApiOkResponse({
    type: ToDoResponseDto,
    description: 'The updated ToDo item',
  })
  async update(
    @Param('id') id: number,
    @Body() updateToDoDto: UpdateToDoDto,
  ): Promise<ToDoResponseDto> {
    return this.updateToDoService.update(id, updateToDoDto);
  }
}
