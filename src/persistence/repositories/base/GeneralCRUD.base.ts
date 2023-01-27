import { PaginationModel } from '../../../models';
import { IGeneral } from '../interfaces';

export abstract class GeneralCRUD<T> implements IGeneral<T> {
    protected readonly database: Array<T>;

    constructor(){
      this.database = new Array<T>();
    }

    register(entity: T): T {
        throw new Error('Method not implemented.');
    }
    update(id: string, entity: T): T {
        throw new Error('Method not implemented.');
    }
    delete(id: string, soft?: boolean | undefined): void {
        throw new Error('Method not implemented.');
    }
    findAll(paginator: PaginationModel): T[] {
        throw new Error('Method not implemented.');
    }
    findOneById(id: string): T {
        throw new Error('Method not implemented.');
    }
}