import { Injectable } from "@nestjs/common/decorators";
import { TransferEntity } from '../entities';
import { BankInternalControl } from './base';

@Injectable()
export class TransferRepository extends BankInternalControl<TransferEntity> {
     
}