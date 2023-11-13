import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { CreateToDoController } from './create/create-todo.controller';
import { CreateToDoService } from './create/create-todo.service';
import { DeleteToDoController } from './delete/delete-todo.controller';
import { DeleteToDoService } from './delete/delete-todo.service';
import { ToDo } from './entities/todo.entity';
import { ReadToDoController } from './read/read-todo.controller';
import { ReadToDoService } from './read/read-todo.service';
import { UpdateToDoController } from './update/update-todo.controller';
import { UpdateToDoService } from './update/update-todo.service';

@Module({
  imports: [MikroOrmModule.forFeature([ToDo])],
  controllers: [
    CreateToDoController,
    ReadToDoController,
    UpdateToDoController,
    DeleteToDoController,
  ],
  providers: [
    CreateToDoService,
    ReadToDoService,
    UpdateToDoService,
    DeleteToDoService,
  ],
})
export class ToDoModule {}
