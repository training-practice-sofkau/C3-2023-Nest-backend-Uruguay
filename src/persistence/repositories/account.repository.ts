import { Injectable } from '@nestjs/common';
import { AccountEntity } from '../entities/account.entity';
import { Repository } from './base/repository.base';

@Injectable()
export class AccountRepository extends Repository<AccountEntity>{

}