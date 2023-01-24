import { Injectable } from "@nestjs/common/decorators";
import { AccountEntity } from '../entities';
import { BankInternalControl } from "./base";


@Injectable()
export class AccountRepository extends BankInternalControl <AccountEntity>  {    
    
    
}