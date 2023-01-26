export abstract class AMetodosAbstract<T>{
    protected readonly database: T[];

    constructor() {
        this.database = new Array<T>();
    }
}