import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { TransferEntity } from 'src/persistence';
import { TransferService } from '../../services/transfer/transfer.service';
import { TransferDto } from '../../dtos/transferDto';
import { DataRangeModel } from 'src/models/DataRange.Model';
import { PaginationModel } from 'src/models/pagination.model';

@Controller('transfer')
export class TransferController {
  constructor(private readonly TransferService: TransferService) {}

  @Post('newTramsfer')
  creatDeposit(@Body() transfer: TransferDto): TransferEntity {
    return this.TransferService.createTransfer(transfer);
  }
  @Put('delete/:id')
  deleteTransfer(transferId: string): void {
    return this.TransferService.deleteTransfer(transferId);
  }
  @Get('getHistory/:id')
  getHistory(
    accountId: string,
    pagination: PaginationModel,
    dataRange?: DataRangeModel,
  ): TransferEntity[] {
    return this.TransferService.getHistory(accountId, pagination, dataRange);
  }
  @Get('getHistoryIn')
  getHistoryIn(
    accountId: string,
    pagination: PaginationModel,
    dataRange?: DataRangeModel,
  ): TransferEntity[] {
    return this.TransferService.getHistoryIn(accountId, pagination, dataRange);
  }

  @Get('getHistoryOut')
  getHistoryOut(
    accountId: string,
    pagination: PaginationModel,
    dataRange?: DataRangeModel,
  ): TransferEntity[] {
    return this.TransferService.getHistoryOut(accountId, pagination, dataRange);
  }
}
