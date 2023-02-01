import { PaginationModel } from '../../../../models/';
export interface ICRUD<T> {
  register(entity: T): T;

  update(id: string, entity: T): T;

  delete(id: string, soft?: boolean): void;

  findAll(pagination: PaginationModel): Array<T>;
  
  findOneById(id: string): T;
}
