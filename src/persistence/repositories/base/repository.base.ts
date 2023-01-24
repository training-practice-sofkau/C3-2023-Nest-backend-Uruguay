import { IRepository } from '../interfaces';

export abstract class Repository<T> implements IRepository<T>{
    private readonly database: T[];

    constructor() {
        this.database = new Array<T>();
    }

    abstract register(entity: T): T;
    
    abstract update(id: string, entity: T): T;

    abstract delete(id: string, soft?: boolean | undefined): void;

    abstract findAll(): T[];

    abstract findOneById(id: string): T;

}