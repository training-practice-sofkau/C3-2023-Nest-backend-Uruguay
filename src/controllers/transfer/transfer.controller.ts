
import { Controller, Get, Param, Post, Body, Delete } from '@nestjs/common';
import { PaginationDto } from 'src/dtos/pagination.dto';
import { DataRangeModel } from 'src/models/dataRange.model';
import { PaginationModel } from 'src/models/pagination.model';
import { TransferService } from 'src/services';
import { transferDto } from '../../dtos/transfer';


@Controller('transfer')
export class TransferController {
  constructor(private readonly transferService: TransferService) {}

  @Post()
  createTransfer(@Body() transfer: transferDto) {
    return this.transferService.createTransfer(transfer);
  }

  @Get('/history-out/:accountId')
  getHistoryOut(
    @Param('accountId') accountId: string,
    @Body('pagination') pagination?: PaginationDto,
    @Body('dataRange') dataRange?: DataRangeModel,
  ) {
    return this.transferService.getHistoryOut(accountId, pagination, dataRange);
  }

  @Get('/history-in/:accountId')
  getHistoryIn(
    @Param('accountId') accountId: string,
    @Body('pagination') pagination?: PaginationDto,
    @Body('dataRange') dataRange?: DataRangeModel,
  ) {
    return this.transferService.getHistoryIn(accountId, pagination, dataRange);
  }

  @Get('/history/:accountId')
  getHistory(
    @Param('accountId') accountId: string,
    @Body('pagination') pagination?: PaginationDto,
    @Body('dataRange') dataRange?: DataRangeModel,
  ) {
    return this.transferService.getHistory(accountId, pagination, dataRange);
  }

  @Delete(':transferId')
  deleteTransfer(@Param('transferId') transferId: string) {
    return this.transferService.deleteTransfer(transferId);
  }
}
