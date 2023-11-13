import { EntityManager } from '@mikro-orm/core';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ToDo } from '../entities/todo.entity';
import { DeleteToDoService } from './delete-todo.service';

const mockEntityManager = {
  findOne: jest.fn(),
  removeAndFlush: jest.fn(),
};

describe('DeleteToDoService', () => {
  let service: DeleteToDoService;
  let entityManager: EntityManager;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteToDoService,
        { provide: EntityManager, useValue: mockEntityManager },
      ],
    }).compile();

    service = module.get<DeleteToDoService>(DeleteToDoService);
    entityManager = module.get<EntityManager>(EntityManager);
  });

  it('should delete a ToDo if it is found', async () => {
    const toDoId = 1;
    const mockToDo = new ToDo();
    mockEntityManager.findOne.mockResolvedValue(mockToDo);

    await service.delete(toDoId);

    expect(entityManager.findOne).toHaveBeenCalledWith(ToDo, { id: toDoId });
    expect(entityManager.removeAndFlush).toHaveBeenCalledWith(mockToDo);
  });

  it('should throw a NotFoundException if the ToDo is not found', async () => {
    mockEntityManager.findOne.mockResolvedValue(null);

    await expect(service.delete(1)).rejects.toThrow(NotFoundException);
  });
});
