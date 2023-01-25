import { Injectable } from '@nestjs/common';
import { AccountEntity } from '../entities';
import { BaseRepo } from '../';

@Injectable()
export class AccountRepository extends BaseRepo<AccountEntity> {}
