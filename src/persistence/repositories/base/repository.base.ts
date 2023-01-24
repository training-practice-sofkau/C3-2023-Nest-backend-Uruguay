import { IRepository } from "../interfaces/repository.interface";

export abstract class Repository<T> implements IRepository<T>{

    private readonly database: Array<T>;

    constructor() {
      this.database = new Array<T>();
    }

    register(entity: T): T {
        throw new Error("Method not implemented.");
    }
    update(id: string, entity: T): T {
        throw new Error("Method not implemented.");
    }
    delete(id: string, soft?: boolean | undefined): void {
        throw new Error("Method not implemented.");
    }
    findAll(): T[] {
        throw new Error("Method not implemented.");
    }
    findOneById(id: string): T {
        throw new Error("Method not implemented.");
    }
}