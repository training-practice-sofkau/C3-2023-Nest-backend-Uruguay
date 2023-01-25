
export abstract class AbstracRepo<T> {

    protected readonly database: T[]; //solo lectura https://www.tutorialsteacher.com/typescript/typescript-readonly

    constructor() {
        this.database = new Array<T>();
    }
}