import { Injectable } from '@nestjs/common';

import { DepositModel, PaginationModel, DataRangeModel } from '../models';
import { DepositEntity, DepositRepository } from '../persistence';

@Injectable()
export class DepositService {

  constructor(private readonly depositRepository: DepositRepository) {}

  createDeposit(deposit: DepositModel): DepositEntity {
    return this.depositRepository.register(deposit);
  }

  deleteDeposit(depositId: string): void {
    this.depositRepository.delete(depositId);
  }

  getHistory(
    depositId: string,
    pagination?: PaginationModel,
    dataRange?: DataRangeModel,
  ): DepositEntity[] {
    throw new Error('This method is not implemented');
  }
}