import { IMetodosInterface } from '../interfaces/i-metodos.interface';
export abstract class AMetodosAbstract<T> implements IMetodosInterface<T> {
    private readonly database: T[];

    constructor() {
        this.database = new Array<T>();
    }

    register(entity: T): T{
        throw new Error('This method is not implemented');
    }

    update(id: string, entity: T): T{
        throw new Error('This method is not implemented');
    }

    delete(id: string, soft?: boolean | undefined): void{
        throw new Error('This method is not implemented');
    }

    findAll(): T[]{
        throw new Error('This method is not implemented');
    }

    findOneById(id: string): T{
        throw new Error('This method is not implemented');
    }
}