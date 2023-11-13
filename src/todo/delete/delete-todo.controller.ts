import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { DeleteToDoService } from './delete-todo.service';

@ApiTags('delete')
@Controller('delete')
export class DeleteToDoController {
  constructor(private readonly deleteToDoService: DeleteToDoService) {}

  /**
   * @method delete
   * Deletes a specific ToDo item based on the provided ID.
   *
   * @param {number} id - The ID of the ToDo item to be deleted.
   *
   * @returns {Promise<void>} An empty promise indicating successful deletion.
   *
   * @HttpCode 204 No Content
   * Indicates successful deletion of the ToDo item without returning any content.
   *
   * @ApiOkResponse Describes the successful deletion of the ToDo item.
   * @ApiNotFoundResponse Indicates that the ToDo item with the specified ID was not found.
   * @ApiBadRequestResponse Indicates an invalid format of the provided ID.
   *
   * @throws {NotFoundException} When the ToDo item with the specified ID is not found.
   * @throws {BadRequestException} When the ID format is invalid.
   */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOkResponse({ description: 'The ToDo has been successfully deleted.' })
  @ApiNotFoundResponse({ description: 'ToDo not found.' })
  @ApiBadRequestResponse({ description: 'Invalid ID format.' })
  async delete(@Param('id') id: number): Promise<void> {
    return this.deleteToDoService.delete(id);
  }
}
