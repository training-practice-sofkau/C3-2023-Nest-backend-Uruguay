export abstract class BaseRepo<Type>  {
  protected readonly database: Array<Type>;
  constructor() {
    this.database = new Array<Type>();
  }
 
}
