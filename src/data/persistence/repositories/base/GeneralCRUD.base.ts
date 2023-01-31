export abstract class GeneralCRUD<T> {
    protected readonly database: Array<T>;

    constructor(){
      this.database = new Array<T>();
    }

}