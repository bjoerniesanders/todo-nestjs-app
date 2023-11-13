import { EntityManager } from '@mikro-orm/core';
import { Test, TestingModule } from '@nestjs/testing';
import { ToDo } from '../entities/todo.entity';
import { CreateToDoService } from './create-todo.service';

describe('CreateToDoService', () => {
  let service: CreateToDoService;
  let entityManagerMock: Partial<EntityManager>;

  beforeEach(async () => {
    entityManagerMock = {
      persistAndFlush: jest.fn().mockImplementation((todo: ToDo) => {
        todo.id = 1;
        todo.createdAt = new Date();
        todo.updatedAt = new Date();
        return Promise.resolve();
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateToDoService,
        { provide: EntityManager, useValue: entityManagerMock },
      ],
    }).compile();

    service = module.get<CreateToDoService>(CreateToDoService);
  });

  it('should create a new todo', async () => {
    const todoDto = { title: 'Test ToDo', description: 'Test Description' };

    const result = await service.create(todoDto);

    expect(result).toMatchObject(todoDto);
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('createdAt');
    expect(result).toHaveProperty('updatedAt');
    expect(entityManagerMock.persistAndFlush).toHaveBeenCalledWith(
      expect.any(ToDo),
    );
  });
});
