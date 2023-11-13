import { EntityManager } from '@mikro-orm/core';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ToDo } from '../entities/todo.entity';

@Injectable()
export class DeleteToDoService {
  constructor(private readonly entityManager: EntityManager) {}

  async delete(id: number): Promise<void> {
    const toDo = await this.entityManager.findOne(ToDo, { id });
    if (!toDo) {
      throw new NotFoundException(`ToDo with ID ${id} not found.`);
    }
    await this.entityManager.removeAndFlush(toDo);
  }
}
