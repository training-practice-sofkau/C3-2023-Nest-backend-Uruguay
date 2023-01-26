export abstract class CRUD<T> {
  
  protected readonly database: Array<T>;

  constructor() {
    this.database = new Array<T>();
  }
}
