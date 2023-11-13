import { MikroOrmModuleOptions } from '@mikro-orm/nestjs';

const config: MikroOrmModuleOptions = {
  entities: ['./dist/todo/entities'],
  entitiesTs: ['./src/todo/entities'],
  dbName: process.env.DB_NAME,
  type: 'postgresql',
  clientUrl: process.env.DATABASE_URL,
};

export default config;
