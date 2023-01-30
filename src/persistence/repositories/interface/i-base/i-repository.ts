import { PaginationModel } from "src/models/i-pagination-model";

export interface IRepository<T> {  //Maneja un cualquier tipo de objeto, T es un objeto generico
    
    register(entity: T): T;

    update(id: string, entity: T): T;

    delete(id: string, soft?: boolean): void;

    findAll(pagination?: PaginationModel): T[];

    findOneById(id: string): T;

    findBy(property: keyof T,
             value: string | number | boolean,
              pagination?: PaginationModel): T[]

    findIndexById(id: string): number;
}