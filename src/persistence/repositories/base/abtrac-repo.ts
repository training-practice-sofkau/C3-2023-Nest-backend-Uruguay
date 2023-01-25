export abstract class AbstracRepo<T> {

    protected readonly database: T[];

    constructor() {
        this.database = new Array<T>();
    }
}