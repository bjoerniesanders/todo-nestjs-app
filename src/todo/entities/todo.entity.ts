import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class ToDo {
  @PrimaryKey()
  id!: number;

  @Property()
  title!: string;

  @Property({ length: 128 })
  description!: string;

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();
}
