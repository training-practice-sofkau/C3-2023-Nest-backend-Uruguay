export abstract class BASE<T> {
  
  protected readonly database: Array<T>;

  constructor() {
    this.database = new Array<T>();
  }
}
