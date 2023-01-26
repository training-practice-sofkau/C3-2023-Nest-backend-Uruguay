//Clase abstracta nos permite definir un concepto abstracto, una clase abstracta por si misma no identifica algo concreto
//No puede ser instanciada directamente
//Definimos una clase Base en la jerarquía de clases 

import { InterfaceRepo } from "../interfaces/InterfaceRepo";

export abstract class Base<T> implements InterfaceRepo<T>{
    
       protected readonly database: Array<T>;
    
       constructor() {
         this.database = new Array<T>();
       }
    register(entity: T): T {
        throw new Error("Method not implemented.");
    }
    update(entity: T, id: string): T {
        
        throw new Error("Method not implemented.");
    }
    delete(id: string, soft?: boolean | undefined): void {
        throw new Error("Method not implemented.");
    }
    findAll():Array<T> {
        throw new Error("Method not implemented.");
    }
    findOneById(id: string): T {
        throw new Error("Method not implemented.");
    }
}