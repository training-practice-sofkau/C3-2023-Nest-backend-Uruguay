import { PaginationModel, DataRangeModel } from '../../../../business/models';

export interface RepositoryMethodsInterface<T> {

    register(entity: T): T;

    update(id: string, entity: T): T;

    delete(id: string, soft?: boolean): void;

    findAll(pagination?: PaginationModel<T>): T[];
    
    findOneById(id: string): T;

    findBy(property: keyof T, value: string | number | boolean, pagination?: PaginationModel<T>, dataRange?: DataRangeModel): T[]

    findIndexById(id: string): number;

} 