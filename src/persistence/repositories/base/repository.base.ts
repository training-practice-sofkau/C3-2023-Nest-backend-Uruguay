export abstract class Repository<T>{
    private readonly database: T[];

    constructor() {
        this.database = new Array<T>();
    }
}