import { CRUD } from "../interfaces/crud.interface";
import { DocumentTypeEntity } from '../../entities/document-type.entity';
import { CustomerEntity } from "src/persistence/entities";

export abstract class Base<T>{
 
  protected readonly database: Array<T>;
  constructor() {
    this.database = new Array<T>();
 }
    
}