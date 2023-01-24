export abstract class Repository<T>{
    protected readonly database: T[];

    constructor() {
        this.database = new Array<T>();
    }
}