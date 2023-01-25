export interface IRepository<T> {  //Maneja un cualquier tipo de objeto, T es un objeto generico
    
    register(entity: T): T;

    update(id: string, entity: T): T;

    delete(id: string, soft?: boolean): void;

    findAll(): T[];

    findOneById(id: string): T;
}