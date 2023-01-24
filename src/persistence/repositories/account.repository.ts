import { Injectable } from "@nestjs/common/decorators";
import { AccountEntity } from '../entities';
import { BankInternalControl } from "./base/BankInternalControl";
import { RepositoryMethodsInterface } from "./interfaces";

@Injectable()
export class AccountRepository extends BankInternalControl <AccountEntity>  {    
    
    
}