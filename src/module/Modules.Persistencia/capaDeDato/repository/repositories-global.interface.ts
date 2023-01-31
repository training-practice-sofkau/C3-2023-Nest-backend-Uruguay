
export interface IRepositoriesGlobal<T> {
    register(entity: T):T;
    update(id: string, entity: T): T;
    delete(id: string, soft?: boolean | undefined): void ;
    findAll(): T;
    findOneById(id: string): T;
}
