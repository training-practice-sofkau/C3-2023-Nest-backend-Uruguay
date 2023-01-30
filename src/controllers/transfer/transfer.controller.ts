import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
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
  deleteTransfer(@Param('id') id: string): void {
    return this.TransferService.deleteTransfer(id);
  }
  @Get('getHistory/:id')
  getHistory(
    @Param('id')
    id: string,
    pagination: PaginationModel,
    dataRange?: DataRangeModel,
  ): TransferEntity[] {
    return this.TransferService.getHistory(id, pagination, dataRange);
  }
  @Get('getHistoryIn/:id')
  getHistoryIn(
    @Param('id')
    id: string,
    pagination: PaginationModel,
    dataRange?: DataRangeModel,
  ): TransferEntity[] {
    return this.TransferService.getHistoryIn(id, pagination, dataRange);
  }

  @Get('getHistoryOut/:id')
  getHistoryOut(
    @Param('id')
    id: string,
    pagination: PaginationModel,
    dataRange?: DataRangeModel,
  ): TransferEntity[] {
    return this.TransferService.getHistoryOut(id, pagination, dataRange);
  }
}
