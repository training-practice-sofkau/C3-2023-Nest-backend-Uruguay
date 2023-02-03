import { Controller, Post, Body, Delete, Param, Get, Query } from '@nestjs/common';
import { DataRangeModel } from 'src/data/models/dataRange.model';
import { PaginationModel } from 'src/data/models/pagination.model';
import { DepositEntity } from 'src/data/persistence';
import { DepositService } from 'src/business/services';
import { depositDto } from 'src/business/dtos/deposit.dto';
import { HistoryDto } from '../../../business/dtos/history.dto';



@Controller('deposit')
export class DepositController {
  constructor(private readonly depositService: DepositService) {}

  @Post('register')
  createDeposit(@Body() deposit: depositDto): DepositEntity {
    return this.depositService.createDeposit(deposit);
  }

  @Delete(':id')
  deleteDeposit(@Param('id') depositId: string): void {
    this.depositService.deleteDeposit(depositId);
  }

  @Post('/history')
  getHistory(
  @Body()
  historyDto: HistoryDto
  ): DepositEntity[] {
    return this.depositService.getHistory(historyDto.id, historyDto?.pagination, historyDto?.dataRange);
  }


  
}