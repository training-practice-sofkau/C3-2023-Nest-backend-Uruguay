import { CustomerEntity } from "src/persistence/entities";
import { BaseIRepository } from "./base/base.irepository";

export interface CustomerRepositoryInterface extends BaseIRepository<CustomerEntity>{}