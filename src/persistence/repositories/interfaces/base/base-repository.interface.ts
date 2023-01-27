export interface BaseRepositoryInterface<T> {
    register(entity: T): T;
    update(id: string, entity: T): T;
    delete(id: string, soft?: boolean): void;
    findAll(): Array<T>;
    searchByAttributes(attributes: keyof T, dataToSearch: string): T[];

  }

  