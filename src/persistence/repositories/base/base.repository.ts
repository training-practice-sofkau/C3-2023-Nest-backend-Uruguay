export abstract class BaseRepository<T> {
  protected database: Array<T>;
  constructor() {
    this.database = new Array<T>();
  }
}
