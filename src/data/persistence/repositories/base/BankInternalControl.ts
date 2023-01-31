import { RepositoryMethodsInterface } from "../interfaces";

export abstract class BankInternalControl <T>  {
    
    protected readonly database: Array<T>;

    constructor(){        
        this.database = new Array<T>();
    }       
    
}