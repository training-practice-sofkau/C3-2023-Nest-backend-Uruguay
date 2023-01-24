import { Injectable } from "@nestjs/common/decorators";
import { TransferEntity } from '../entities/transfer.entity';
import { RepositoryMethodsInterface } from "./interfaces";
import { BankInternalControl } from './base/BankInternalControl';

@Injectable()
export class TransferRepository extends BankInternalControl<TransferEntity> {
     
}