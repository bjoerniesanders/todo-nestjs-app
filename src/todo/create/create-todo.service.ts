import { EntityManager } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { CreateToDoDto } from '../dto/request/create-todo.dto';
import { ToDo } from '../entities/todo.entity';

@Injectable()
export class CreateToDoService {
  constructor(private readonly entityManager: EntityManager) {}

  async create(createToDoDto: CreateToDoDto): Promise<ToDo> {
    const todo = new ToDo();
    todo.title = createToDoDto.title;
    todo.description = createToDoDto.description;
    await this.entityManager.persistAndFlush(todo);
    return todo;
  }
}
