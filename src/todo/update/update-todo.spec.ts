import { EntityManager } from '@mikro-orm/core';
import { ToDo } from '../entities/todo.entity';
import { UpdateToDoService } from './update-todo.service';

describe('UpdateToDoService', () => {
  let updateToDoService: UpdateToDoService;
  let entityManager: EntityManager;
  let mockToDo: ToDo;

  beforeEach(() => {
    entityManager = {
      findOne: jest.fn().mockResolvedValue(mockToDo),
      flush: jest.fn(),
    } as unknown as EntityManager;

    updateToDoService = new UpdateToDoService(entityManager);
    mockToDo = {
      id: 1,
      title: 'Original Title',
      description: 'Original Description',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  });

  it('should update a todo item if it exists', async () => {
    jest.spyOn(entityManager, 'findOne').mockResolvedValue(mockToDo);
    jest.spyOn(entityManager, 'flush').mockResolvedValue();

    const updateToDoDto = {
      title: 'Updated Title',
      description: 'Updated Description',
    };
    const updatedToDo = await updateToDoService.update(1, updateToDoDto);

    expect(updatedToDo.title).toBe(updateToDoDto.title);
    expect(updatedToDo.description).toBe(updateToDoDto.description);
    expect(entityManager.flush).toHaveBeenCalled();
  });

  it('should throw an error if todo item does not exist', async () => {
    jest.spyOn(entityManager, 'findOne').mockResolvedValue(null);

    const updateToDoDto = {
      title: 'New Title',
      description: 'New Description',
    };

    await expect(updateToDoService.update(99, updateToDoDto)).rejects.toThrow(
      'ToDo not found',
    );
  });
});
