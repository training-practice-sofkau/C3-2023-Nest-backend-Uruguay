import { PaginationModel } from '../../../models/pagination.model';
import { DataRangeModel } from '../../../models/data-range.model';
export interface RepositoryMethodsInterface<T> {

    register(entity: T): T;

    update(id: string, entity: T): T;

    delete(id: string, soft?: boolean): void;

    findAll(pagination?: PaginationModel): T[];
    
    findOneById(id: string): T;

    findBy(property: keyof T, value: string | number | boolean, pagination?: PaginationModel, dataRange?: DataRangeModel): T[]

    findIndexById(id: string): number;

}