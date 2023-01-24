export abstract class BaseRepositories<type> {
    abstract findAll(): type[];
    abstract findOneById(id: string): type;
    abstract register(entity: type): type;
    abstract update(id: string, entity: type): type;
    abstract delete(id: string): void;
  }