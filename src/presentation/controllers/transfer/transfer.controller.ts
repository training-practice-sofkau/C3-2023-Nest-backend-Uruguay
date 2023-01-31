
import { Controller, Get, Param, Post, Body, Delete } from '@nestjs/common';
import { DataRangeDto } from 'src/data/dtos/datarange.dto';
import { PaginationDto } from 'src/data/dtos/pagination.dto';
import { DataRangeModel } from 'src/data/models/dataRange.model';
import { TransferService } from 'src/business/services';
import { transferDto } from '../../../data/dtos/transfer.dto';


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
    @Body('dataRange') dataRange?: DataRangeDto,
  ) {
    return this.transferService.getHistoryOut(accountId, pagination, dataRange);
  }

  @Get('/history-in/:accountId')
  getHistoryIn(
    @Param('accountId') accountId: string,
    @Body('pagination') pagination?: PaginationDto,
    @Body('dataRange') dataRange?: DataRangeDto,
  ) {
    return this.transferService.getHistoryIn(accountId, pagination, dataRange);
  }

  @Get('/history/:accountId')
  getHistory(
    @Param('accountId') accountId: string,
    @Body('pagination') pagination?: PaginationDto,
    @Body('dataRange') dataRange?: DataRangeDto,
  ) {
    return this.transferService.getHistory(accountId, pagination, dataRange);
  }

  @Delete(':transferId')
  deleteTransfer(@Param('transferId') transferId: string) {
    return this.transferService.deleteTransfer(transferId);
  }
}
