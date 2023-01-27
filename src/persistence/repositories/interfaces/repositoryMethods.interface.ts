import { PaginationModel } from '../../../models/pagination.model';
export interface RepositoryMethodsInterface<T> {

    register(entity: T): T;

    update(id: string, entity: T): T;

    delete(id: string, soft?: boolean): void;

    findAll(paginator: PaginationModel): T[];
    
    findOneById(id: string): T;

    findBy(property: keyof T, value: string | number | boolean): T[]

    findIndexById(id: string): number;

}