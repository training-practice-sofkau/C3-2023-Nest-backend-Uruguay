import { BaseRepositories } from '../interfaces';

export abstract class BaseRepo<Type> implements BaseRepositories<Type> {
  protected readonly database: Array<Type>;
  constructor() {
    this.database = new Array<Type>();
  }
  findAll(): Type[] {
    throw new Error('Method not implemented.');
  }
  findOneById(id: string): Type {
    throw new Error('Method not implemented.');
  }
  register(entity: Type): Type {
    throw new Error('Method not implemented.');
  }
  update(id: string, entity: Type): Type {
    throw new Error('Method not implemented.');
  }
  delete(id: string): void {
    throw new Error('Method not implemented.');
  }
}
