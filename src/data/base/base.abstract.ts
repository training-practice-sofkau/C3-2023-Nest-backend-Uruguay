import { CRUD } from "../persistence/interfaces/crud.interface";
import { CustomerEntity } from "src/data/persistence/entities";

export abstract class Base<T>{
 
  protected readonly database: Array<T>;
  constructor() {
    this.database = new Array<T>();
 }
    
}