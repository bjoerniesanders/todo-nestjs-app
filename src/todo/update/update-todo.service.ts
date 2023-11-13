import { EntityManager } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { UpdateToDoDto } from '../dto/request';
import { ToDo } from '../entities/todo.entity';

@Injectable()
export class UpdateToDoService {
  constructor(private readonly entityManager: EntityManager) {}

  async update(id: number, updateToDoDto: UpdateToDoDto): Promise<ToDo> {
    const todo = await this.entityManager.findOne(ToDo, { id });

    if (!todo) {
      throw new Error('ToDo not found');
    }

    todo.title = updateToDoDto.title ?? todo.title;
    todo.description = updateToDoDto.description ?? todo.description;

    await this.entityManager.flush();

    return todo;
  }
}
