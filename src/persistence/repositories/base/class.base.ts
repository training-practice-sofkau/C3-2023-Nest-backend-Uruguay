export abstract class BaseRepositories<tipo> {
    abstract findAll(): tipo[];
    abstract findOneById(id: string): tipo;
    abstract create(entity: tipo): tipo;
    abstract update(id: string, entity: tipo): tipo;
    abstract delete(id: string): void;
  }