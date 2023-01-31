import { Controller, Get, Delete, Post, Body, ParseUUIDPipe, Param, Put } from '@nestjs/common';
import { DepositDto } from 'src/dtos/deposit.dto';
import { DepositService } from 'src/services';
import { depositEntity } from '../../persistence';

@Controller('deposit')
export class DepositController {
  constructor(private readonly depositService: DepositService) {}

  @Post('newRepo')
  createDeposit(@Body() deposit: DepositDto): depositEntity {
    return this.depositService.createDeposit(deposit);
  }

  @Put("delete/:depositId")
  deleteDeposit(@Param("depositId") depositId: string): void {
    this.depositService.deleteDeposit(depositId);
  }

  @Get("/:id")
  getHistory(@Param('id', ParseUUIDPipe)depositId: string): depositEntity[] {
    return this.depositService.getHistory(depositId);
  }
}





