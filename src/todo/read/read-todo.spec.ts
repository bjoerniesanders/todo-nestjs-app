import { EntityManager } from '@mikro-orm/postgresql';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ToDo } from '../entities/todo.entity';
import { ReadToDoService } from './read-todo.service';

describe('ReadToDoService', () => {
  let service: ReadToDoService;
  let entityManager: EntityManager;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReadToDoService,
        {
          provide: EntityManager,
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ReadToDoService>(ReadToDoService);
    entityManager = module.get<EntityManager>(EntityManager);
  });

  describe('findAll', () => {
    it('should return an array of to-dos', async () => {
      const mockToDos = [{ id: 1, title: 'Test ToDo' }];
      jest.spyOn(entityManager, 'find').mockResolvedValue(mockToDos);

      const result = await service.findAll();
      expect(result).toEqual(mockToDos);
      expect(entityManager.find).toHaveBeenCalledWith(ToDo, {});
    });
  });

  describe('findOne', () => {
    it('should return a single to-do item', async () => {
      const mockToDo = { id: 1, title: 'Test ToDo' };
      jest.spyOn(entityManager, 'findOne').mockResolvedValue(mockToDo);

      const result = await service.findOne(1);
      expect(result).toEqual(mockToDo);
      expect(entityManager.findOne).toHaveBeenCalledWith(ToDo, { id: 1 });
    });

    it('should throw a NotFoundException if no to-do is found', async () => {
      jest.spyOn(entityManager, 'findOne').mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });
});
