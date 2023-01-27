import { AccountEntity } from "src/persistence/entities/account-entity";
import { IRepository } from "./i-base/i-repository";

export interface AccountRepositoryInterface extends IRepository<AccountEntity> {

}