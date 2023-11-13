import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ToDoModule } from './todo/todo.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MikroOrmModule.forRoot({
      entities: ['./dist/todo/entities'],
      entitiesTs: ['./src/todo/entities'],
      dbName: process.env.DB_NAME,
      type: 'postgresql',
      clientUrl: process.env.DATABASE_URL,
    }),
    ToDoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
