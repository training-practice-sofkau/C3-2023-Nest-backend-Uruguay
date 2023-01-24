export interface BaseRepositories<tipo> {
  findAll(): tipo[];
  findOneById(id: string): tipo;
  register(entity: tipo): tipo;
  update(id: string, entity: tipo): tipo;
  delete(id: string): void;
}
