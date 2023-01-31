import { PaginationModel } from '../../../../data/models/pagination.model';
export interface IGeneral<T> {

    register(entity: T): T;

    update(id: string, entity: T): T;

    delete(id: string, soft?: boolean): void;

    findAll(paginator: PaginationModel): T[];

    findOneById(id: string): T;

}