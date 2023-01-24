import { Injectable } from '@nestjs/common/decorators';
import { DepositEntity } from '../entities';
import { BankInternalControl } from './base';

@Injectable()
export class DepositRepository extends BankInternalControl <DepositEntity> {
    
}