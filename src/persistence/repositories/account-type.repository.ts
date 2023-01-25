import { Injectable } from "@nestjs/common";
import { AccountTypeEntity } from "../entities/account-type.entity";
import { Repository } from "./base/repository.base";

@Injectable()
export class AccountTypeRepository extends Repository<AccountTypeEntity>{

}