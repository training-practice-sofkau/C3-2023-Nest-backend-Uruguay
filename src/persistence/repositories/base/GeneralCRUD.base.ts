import { IGeneral } from '../interfaces/IGeneral.interface';

export abstract class GeneralCRUD<T> implements IGeneral<T> {
    protected readonly database: Array<T>;

    constructor(){
      this.database = new Array<T>();
    }

    register(entity: T): T {
        throw new Error('This method is not implemented');
    }
    
    update(id: string, entity: T): T {
        throw new Error('This method is not implemented');
    }
    
    delete(id: string, soft?: boolean): void {
        throw new Error('This method is not implemented');
    }
    
    findAll(): T[] {
        throw new Error('This method is not implemented');
    }
    
    findOneById(id: string): T {
        throw new Error('This method is not implemented');
    }
}