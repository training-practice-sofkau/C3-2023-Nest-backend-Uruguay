import { Controller, Post, Body, Delete, Param, Get, Query } from '@nestjs/common';
import { DataRangeModel } from 'src/models/dataRange.model';
import { PaginationModel } from 'src/models/pagination.model';
import { DepositEntity } from 'src/persistence';
import { DepositService } from 'src/services';
import { depositDto } from '../../data/dtos/deposit';



@Controller('deposit')
export class DepositController {
  constructor(private readonly depositService: DepositService) {}

  @Post()
  createDeposit(@Body() deposit: depositDto): DepositEntity {
    return this.depositService.createDeposit(deposit);
  }

  @Delete(':id')
  deleteDeposit(@Param('id') depositId: string): void {
    this.depositService.deleteDeposit(depositId);
  }

  @Get('history')
  getHistory(
    @Query('depositId') depositId: string,
    @Query('pagination') pagination?: PaginationModel,
    @Query('dataRange') dataRange?: DataRangeModel,
  ): DepositEntity[] {
    return this.depositService.getHistory(depositId, pagination, dataRange);
  }
}