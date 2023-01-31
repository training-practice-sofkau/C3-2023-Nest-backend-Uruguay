import { Controller, Post, Body, Delete, Param, Get, Query } from '@nestjs/common';
import { DataRangeModel } from 'src/data/models/dataRange.model';
import { PaginationModel } from 'src/data/models/pagination.model';
import { DepositEntity } from 'src/data/persistence';
import { DepositService } from 'src/business/services';
import { depositDto } from 'src/data/dtos/deposit.dto';
import { PaginationDto } from 'src/data/dtos/pagination.dto';
import { DataRangeDto } from 'src/data/dtos/datarange.dto';



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
    @Query('pagination') pagination?: PaginationDto,
    @Query('dataRange') dataRange?: DataRangeDto,
  ): DepositEntity[] {
    return this.depositService.getHistory(depositId, pagination, dataRange);
  }
}