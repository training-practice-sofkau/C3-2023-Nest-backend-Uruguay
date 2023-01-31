import { CustomerEntity } from "src/data-access/entities/customer-entity";
import { IRepository } from "./i-base/i-repository";


export interface CustomerRepositoryInterface extends IRepository<CustomerEntity> {

}