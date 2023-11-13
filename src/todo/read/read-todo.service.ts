import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ToDo } from '../entities/todo.entity';

@Injectable()
export class ReadToDoService {
  constructor(private readonly entityManager: EntityManager) {}

  async findAll(): Promise<ToDo[]> {
    return this.entityManager.find(ToDo, {});
  }

  async findOne(id: number): Promise<ToDo> {
    const todo = await this.entityManager.findOne(ToDo, { id });
    if (!todo) {
      throw new NotFoundException(`ToDo with ID ${id} not found`);
    }
    return todo;
  }
}
