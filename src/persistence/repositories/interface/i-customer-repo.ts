import { CustomerEntity } from "src/persistence/entities/customer-entity";
import { IRepository } from "./i-base/i-repository";


export interface CustomerRepositoryInterface extends IRepository<CustomerEntity> {

}