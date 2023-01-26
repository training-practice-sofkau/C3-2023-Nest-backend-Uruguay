export class BaseRepository<T> {
    protected readonly database: Array<T>;

    constructor() {
        this.database = new Array<T>();
    }
    register(entity: T): T {
        this.database.push(entity);
        return this.database.at(-1) ?? entity;
      }

      
}