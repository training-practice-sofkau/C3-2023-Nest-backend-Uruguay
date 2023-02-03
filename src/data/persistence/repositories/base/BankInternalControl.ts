import { RepositoryMethodsInterface } from "../interfaces";
import { EventManager } from '../../../../common/patterns/observer/eventManager';

export abstract class BankInternalControl <T> extends EventManager {
    
    protected readonly database: Array<T>;

    constructor(){ 
        super(),        
        this.database = new Array<T>();
    }       
    
}