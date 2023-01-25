import { Injectable } from '@nestjs/common';
import { AccountEntity } from '../entities';
import { BaseRepo } from './base/base-abstract-Repos';

@Injectable()
export class AccountRepository   extends BaseRepo<AccountEntity> {
 


}